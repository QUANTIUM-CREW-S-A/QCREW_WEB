import { useState, useCallback } from 'react';
import { company } from '../lib/company';

export interface QuickReply {
  id: string;
  label: string;
  message: string;
}

const STORAGE_KEY = 'qcrew-admin-quick-replies';

const defaultReplies: QuickReply[] = [
  { id: '1', label: 'Saludo', message: '¡Hola! Gracias por contactarnos. ¿En qué podemos ayudarte?' },
  { id: '2', label: 'Horario', message: `Nuestro horario de atención es ${company.hours.weekdays}.` },
  { id: '3', label: 'Contacto', message: `Puedes contactarnos por email a ${company.email} o llamarnos al ${company.phone.display}` },
];

/** Lee del localStorage del navegador; si no hay nada guardado usa los valores por defecto. */
function loadReplies(): QuickReply[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultReplies;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultReplies;
  } catch {
    return defaultReplies;
  }
}

function persistReplies(replies: QuickReply[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(replies));
  } catch {
    // Almacenamiento no disponible (modo privado, cuota llena, etc.): no bloquea la UI.
  }
}

export function useQuickReplies() {
  const [replies, setReplies] = useState<QuickReply[]>(loadReplies);

  const addReply = useCallback((label: string, message: string) => {
    const newReply: QuickReply = {
      id: Date.now().toString(),
      label,
      message,
    };
    setReplies(prev => {
      const next = [...prev, newReply];
      persistReplies(next);
      return next;
    });
  }, []);

  const updateReply = useCallback((id: string, label: string, message: string) => {
    setReplies(prev => {
      const next = prev.map(reply =>
        reply.id === id ? { ...reply, label, message } : reply
      );
      persistReplies(next);
      return next;
    });
  }, []);

  const deleteReply = useCallback((id: string) => {
    setReplies(prev => {
      const next = prev.filter(reply => reply.id !== id);
      persistReplies(next);
      return next;
    });
  }, []);

  return { replies, addReply, updateReply, deleteReply };
}

