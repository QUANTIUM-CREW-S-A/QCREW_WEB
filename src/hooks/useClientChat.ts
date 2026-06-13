import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  Timestamp,
  serverTimestamp,
  limit
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'client' | 'admin';
  timestamp: Date;
}

export function useClientChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [clientInfo, setClientInfo] = useState<{ name: string; email: string } | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore session from localStorage and validate it still exists
  useEffect(() => {
    const restore = async () => {
      const savedId = localStorage.getItem('qcrew_conversationId');
      const savedInfo = localStorage.getItem('qcrew_clientInfo');

      if (savedId && savedInfo) {
        try {
          // Verify the conversation still exists in Firestore
          const convDoc = await getDoc(doc(db, 'conversations', savedId));
          if (convDoc.exists()) {
            setConversationId(savedId);
            setClientInfo(JSON.parse(savedInfo));
          } else {
            // Conversation was deleted, clean up
            localStorage.removeItem('qcrew_conversationId');
            localStorage.removeItem('qcrew_clientInfo');
          }
        } catch (err) {
          console.error('Error restoring chat session:', err);
          // Clean up corrupt session
          localStorage.removeItem('qcrew_conversationId');
          localStorage.removeItem('qcrew_clientInfo');
        }
      }
      setInitialized(true);
    };

    restore();
  }, []);

  // Listen to messages in real time
  useEffect(() => {
    if (!conversationId) return;

    const q = query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const msgs = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            text: data.text,
            sender: data.sender,
            timestamp: data.timestamp?.toDate() || new Date()
          } as ChatMessage;
        });
        setMessages(msgs);
        setError(null);
      },
      (err) => {
        console.error('Error listening to messages:', err);
        setError('Error al cargar mensajes');
      }
    );

    return unsubscribe;
  }, [conversationId]);

  const initConversation = async (name: string, email: string) => {
    try {
      setError(null);

      // Check if a conversation already exists for this email
      const q = query(
        collection(db, 'conversations'),
        where('clientEmail', '==', email),
        limit(1)
      );
      const snapshot = await getDocs(q);

      let convId: string;

      if (!snapshot.empty) {
        convId = snapshot.docs[0].id;
        await updateDoc(doc(db, 'conversations', convId), {
          clientName: name,
          status: 'unread',
          updatedAt: Timestamp.now()
        });
      } else {
        const convDoc = await addDoc(collection(db, 'conversations'), {
          clientName: name,
          clientEmail: email,
          status: 'unread',
          priority: 'medium',
          tags: [],
          notes: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastMessage: ''
        });
        convId = convDoc.id;
      }

      // Add welcome message
      await addDoc(collection(db, 'conversations', convId, 'messages'), {
        text: `¡Hola ${name}! Soy el asistente de Quantium Crew. ¿En qué puedo ayudarte hoy?`,
        sender: 'admin',
        timestamp: serverTimestamp()
      });

      // Persist session
      localStorage.setItem('qcrew_conversationId', convId);
      localStorage.setItem('qcrew_clientInfo', JSON.stringify({ name, email }));

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

      await addDoc(collection(db, 'conversations', conversationId, 'messages'), {
        text,
        sender: 'client',
        timestamp: serverTimestamp()
      });

      await updateDoc(doc(db, 'conversations', conversationId), {
        status: 'unread',
        lastMessage: text,
        updatedAt: Timestamp.now()
      });
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Error al enviar mensaje. Intenta de nuevo.');
    }
  };

  const resetSession = () => {
    localStorage.removeItem('qcrew_conversationId');
    localStorage.removeItem('qcrew_clientInfo');
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
    resetSession
  };
}
