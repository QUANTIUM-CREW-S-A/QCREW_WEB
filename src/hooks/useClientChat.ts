import { useState, useEffect } from 'react';
import { supabase, ensureAnonSession } from '../lib/supabase';
import type { MessageRow } from '../types/database';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'client' | 'admin';
  timestamp: Date;
}

const CONV_KEY = 'qcrew_conversationId';
const INFO_KEY = 'qcrew_clientInfo';

const mapRow = (row: MessageRow): ChatMessage => ({
  id: row.id,
  text: row.text,
  sender: row.sender,
  timestamp: new Date(row.created_at),
});

export function useClientChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [clientInfo, setClientInfo] = useState<{ name: string; email: string } | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restaura la sesion guardada y valida que la conversacion siga existiendo
  useEffect(() => {
    const restore = async () => {
      const savedId = localStorage.getItem(CONV_KEY);
      const savedInfo = localStorage.getItem(INFO_KEY);

      if (savedId && savedInfo) {
        try {
          // Sin sesion de Supabase, RLS no dejaria leer la conversacion
          await ensureAnonSession();

          const { data, error: queryError } = await supabase
            .from('conversations')
            .select('id')
            .eq('id', savedId)
            .maybeSingle();

          if (queryError) throw queryError;

          if (data) {
            setConversationId(data.id);
            setClientInfo(JSON.parse(savedInfo));
          } else {
            // La conversacion ya no existe (o no es de este visitante)
            localStorage.removeItem(CONV_KEY);
            localStorage.removeItem(INFO_KEY);
          }
        } catch (err) {
          console.error('Error restoring chat session:', err);
          localStorage.removeItem(CONV_KEY);
          localStorage.removeItem(INFO_KEY);
        }
      }
      setInitialized(true);
    };

    restore();
  }, []);

  // Mensajes en tiempo real
  useEffect(() => {
    if (!conversationId) return;

    let active = true;

    const fetchMessages = async () => {
      const { data, error: queryError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (!active) return;

      if (queryError) {
        console.error('Error listening to messages:', queryError);
        setError('Error al cargar mensajes');
        return;
      }

      setMessages((data ?? []).map(mapRow));
      setError(null);
    };

    fetchMessages();

    const channel = supabase
      .channel(`client-messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        () => { fetchMessages(); }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const initConversation = async (name: string, email: string) => {
    try {
      setError(null);

      const session = await ensureAnonSession();
      if (!session) throw new Error('No se pudo iniciar la sesion del chat');

      // RLS solo expone las conversaciones de este visitante, asi que esta
      // busqueda ya esta acotada a el.
      const { data: existing, error: findError } = await supabase
        .from('conversations')
        .select('id')
        .eq('user_id', session.user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (findError) throw findError;

      let convId: string;

      if (existing) {
        convId = existing.id;
        const { error: updateError } = await supabase
          .from('conversations')
          .update({ client_name: name, client_email: email, status: 'unread' })
          .eq('id', convId);
        if (updateError) throw updateError;
      } else {
        // El mensaje de bienvenida lo inserta un trigger en la base de datos:
        // el cliente no puede escribir mensajes con sender='admin'.
        const { data: created, error: insertError } = await supabase
          .from('conversations')
          .insert({
            user_id: session.user.id,
            client_name: name,
            client_email: email,
            status: 'unread',
            priority: 'medium',
          })
          .select('id')
          .single();

        if (insertError) throw insertError;
        convId = created.id;
      }

      localStorage.setItem(CONV_KEY, convId);
      localStorage.setItem(INFO_KEY, JSON.stringify({ name, email }));

      setConversationId(convId);
      setClientInfo({ name, email });
    } catch (err) {
      console.error('Error creating conversation:', err);
      setError('Error al iniciar conversación. Verifica tu conexión.');
    }
  };

  const sendMessage = async (text: string) => {
    if (!conversationId) return;

    try {
      setError(null);

      // Un trigger actualiza last_message / updated_at / status
      const { error: insertError } = await supabase.from('messages').insert({
        conversation_id: conversationId,
        text,
        sender: 'client',
      });

      if (insertError) throw insertError;
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Error al enviar mensaje. Intenta de nuevo.');
    }
  };

  const resetSession = () => {
    localStorage.removeItem(CONV_KEY);
    localStorage.removeItem(INFO_KEY);
    setConversationId(null);
    setClientInfo(null);
    setMessages([]);
  };

  const hasSession = initialized && conversationId !== null;

  return {
    messages,
    clientInfo,
    hasSession,
    initialized,
    error,
    initConversation,
    sendMessage,
    resetSession,
  };
}
