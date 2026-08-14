import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { ConversationRow, MessageRow } from '../types/database';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type ConversationStatus = 'unread' | 'read' | 'responded';

export interface Conversation {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status: ConversationStatus;
  priority: Priority;
  tags: string[];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'client' | 'admin';
  timestamp: Date;
}

export interface ConversationStats {
  total: number;
  unread: number;
  respondedToday: number;
  avgResponseMinutes: number;
}

const mapConversation = (row: ConversationRow): Conversation => ({
  id: row.id,
  clientName: row.client_name || '',
  clientEmail: row.client_email || '',
  clientPhone: row.client_phone || '',
  status: row.status || 'unread',
  priority: row.priority || 'medium',
  tags: row.tags || [],
  notes: row.notes || '',
  createdAt: new Date(row.created_at),
  updatedAt: new Date(row.updated_at),
  lastMessage: row.last_message || '',
});

const mapMessage = (row: MessageRow): Message => ({
  id: row.id,
  text: row.text,
  sender: row.sender,
  timestamp: new Date(row.created_at),
});

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConversations = useCallback(async () => {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('[useConversations] Error al cargar:', error);
      setLoading(false);
      return;
    }

    setConversations((data ?? []).map(mapConversation));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchConversations();

    const channel = supabase
      .channel('conversations-admin')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'conversations' },
        () => { fetchConversations(); }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchConversations]);

  const getStats = (): ConversationStats => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const responded = conversations.filter((c) => c.status === 'responded');
    const respondedToday = responded.filter((c) => c.updatedAt >= todayStart).length;

    return {
      total: conversations.length,
      unread: conversations.filter((c) => c.status === 'unread').length,
      respondedToday,
      avgResponseMinutes: responded.length > 0
        ? Math.round(
            responded.reduce(
              (sum, c) => sum + (c.updatedAt.getTime() - c.createdAt.getTime()) / 60000,
              0
            ) / responded.length
          )
        : 0,
    };
  };

  const markAsRead = async (conversationId: string) => {
    const { error } = await supabase
      .from('conversations')
      .update({ status: 'read' })
      .eq('id', conversationId);
    if (error) throw error;
  };

  const markAllAsRead = async () => {
    const { error } = await supabase
      .from('conversations')
      .update({ status: 'read' })
      .eq('status', 'unread');
    if (error) throw error;
  };

  const deleteConversation = async (conversationId: string) => {
    // Los mensajes se borran en cascada (FK on delete cascade)
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId);
    if (error) throw error;
  };

  const sendResponse = async (conversationId: string, text: string) => {
    // Un trigger actualiza last_message / updated_at / status='responded'
    const { error } = await supabase.from('messages').insert({
      conversation_id: conversationId,
      text,
      sender: 'admin',
    });
    if (error) throw error;
  };

  const setPriority = async (conversationId: string, priority: Priority) => {
    const { error } = await supabase
      .from('conversations')
      .update({ priority })
      .eq('id', conversationId);
    if (error) throw error;
  };

  const addTag = async (conversationId: string, tag: string) => {
    const current = conversations.find((c) => c.id === conversationId);
    if (!current || current.tags.includes(tag)) return;

    const { error } = await supabase
      .from('conversations')
      .update({ tags: [...current.tags, tag] })
      .eq('id', conversationId);
    if (error) throw error;
  };

  const removeTag = async (conversationId: string, tag: string) => {
    const current = conversations.find((c) => c.id === conversationId);
    if (!current) return;

    const { error } = await supabase
      .from('conversations')
      .update({ tags: current.tags.filter((t) => t !== tag) })
      .eq('id', conversationId);
    if (error) throw error;
  };

  const updateNotes = async (conversationId: string, notes: string) => {
    const { error } = await supabase
      .from('conversations')
      .update({ notes })
      .eq('id', conversationId);
    if (error) throw error;
  };

  return {
    conversations,
    loading,
    getStats,
    markAsRead,
    markAllAsRead,
    deleteConversation,
    sendResponse,
    setPriority,
    addTag,
    removeTag,
    updateNotes,
  };
}

export function useConversationMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    let active = true;
    setLoading(true);

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      // Evita que una respuesta vieja pise la conversacion actual
      if (!active) return;

      if (error) {
        console.error('[useConversationMessages] Error al cargar:', error);
        setLoading(false);
        return;
      }

      setMessages((data ?? []).map(mapMessage));
      setLoading(false);
    };

    fetchMessages();

    const channel = supabase
      .channel(`admin-messages-${conversationId}`)
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

  return { messages, loading };
}
