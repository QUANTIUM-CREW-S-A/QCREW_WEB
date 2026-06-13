import { useState, useEffect, useRef } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  getDocs,
  Timestamp,
  serverTimestamp,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { db } from '../lib/firebase';

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

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'conversations'),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convos = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          clientName: data.clientName || '',
          clientEmail: data.clientEmail || '',
          clientPhone: data.clientPhone || '',
          status: data.status || 'unread',
          priority: data.priority || 'medium',
          tags: data.tags || [],
          notes: data.notes || '',
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastMessage: data.lastMessage || ''
        } as Conversation;
      });
      setConversations(convos);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const getStats = (): ConversationStats => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const respondedToday = conversations.filter(
      c => c.status === 'responded' && c.updatedAt >= todayStart
    ).length;

    return {
      total: conversations.length,
      unread: conversations.filter(c => c.status === 'unread').length,
      respondedToday,
      avgResponseMinutes: conversations.length > 0
        ? Math.round(
            conversations
              .filter(c => c.status === 'responded')
              .reduce((sum, c) => {
                const diff = c.updatedAt.getTime() - c.createdAt.getTime();
                return sum + diff / 60000;
              }, 0) / Math.max(conversations.filter(c => c.status === 'responded').length, 1)
          )
        : 0
    };
  };

  const markAsRead = async (conversationId: string) => {
    const ref = doc(db, 'conversations', conversationId);
    await updateDoc(ref, { status: 'read' });
  };

  const deleteConversation = async (conversationId: string) => {
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const messagesSnapshot = await getDocs(messagesRef);
    const deletePromises = messagesSnapshot.docs.map((msgDoc) =>
      deleteDoc(msgDoc.ref)
    );
    await Promise.all(deletePromises);
    await deleteDoc(doc(db, 'conversations', conversationId));
  };

  const sendResponse = async (conversationId: string, text: string) => {
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    await addDoc(messagesRef, {
      text,
      sender: 'admin',
      timestamp: serverTimestamp()
    });

    const convRef = doc(db, 'conversations', conversationId);
    await updateDoc(convRef, {
      status: 'responded',
      lastMessage: text,
      updatedAt: Timestamp.now()
    });
  };

  const setPriority = async (conversationId: string, priority: Priority) => {
    const ref = doc(db, 'conversations', conversationId);
    await updateDoc(ref, { priority });
  };

  const addTag = async (conversationId: string, tag: string) => {
    const ref = doc(db, 'conversations', conversationId);
    await updateDoc(ref, { tags: arrayUnion(tag) });
  };

  const removeTag = async (conversationId: string, tag: string) => {
    const ref = doc(db, 'conversations', conversationId);
    await updateDoc(ref, { tags: arrayRemove(tag) });
  };

  const updateNotes = async (conversationId: string, notes: string) => {
    const ref = doc(db, 'conversations', conversationId);
    await updateDoc(ref, { notes });
  };

  return {
    conversations,
    loading,
    getStats,
    markAsRead,
    deleteConversation,
    sendResponse,
    setPriority,
    addTag,
    removeTag,
    updateNotes
  };
}

export function useConversationMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const activeIdRef = useRef<string | null>(null);

  useEffect(() => {
    activeIdRef.current = conversationId;

    if (!conversationId) {
      setMessages([]);
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Guard against stale subscription
      if (activeIdRef.current !== conversationId) return;

      // Deduplicate by ID to prevent double-render from serverTimestamp
      const seen = new Set<string>();
      const msgs: Message[] = [];
      for (const d of snapshot.docs) {
        if (seen.has(d.id)) continue;
        seen.add(d.id);
        const data = d.data();
        msgs.push({
          id: d.id,
          text: data.text,
          sender: data.sender,
          timestamp: data.timestamp?.toDate() || new Date()
        });
      }
      setMessages(msgs);
      setLoading(false);
    });

    return unsubscribe;
  }, [conversationId]);

  return { messages, loading };
}
