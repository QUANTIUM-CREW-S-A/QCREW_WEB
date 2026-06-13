import { useState, useCallback } from 'react';

export interface QuickReply {
  id: string;
  label: string;
  message: string;
}

const defaultReplies: QuickReply[] = [
  { id: '1', label: 'Saludo', message: '¡Hola! Gracias por contactarnos. ¿En qué podemos ayudarte?' },
  { id: '2', label: 'Horario', message: 'Nuestro horario de atención es de Lunes a Viernes, 9:00 AM - 6:00 PM.' },
  { id: '3', label: 'Contacto', message: 'Puedes contactarnos por email a info@quantiumcrew.com o llamarnos al +1 (555) 123-4567' },
];

export function useQuickReplies() {
  const [replies, setReplies] = useState<QuickReply[]>(defaultReplies);

  const addReply = useCallback((label: string, message: string) => {
    const newReply: QuickReply = {
      id: Date.now().toString(),
      label,
      message,
    };
    setReplies(prev => [...prev, newReply]);
  }, []);

  const updateReply = useCallback((id: string, label: string, message: string) => {
    setReplies(prev =>
      prev.map(reply =>
        reply.id === id ? { ...reply, label, message } : reply
      )
    );
  }, []);

  const deleteReply = useCallback((id: string) => {
    setReplies(prev => prev.filter(reply => reply.id !== id));
  }, []);

  return { replies, addReply, updateReply, deleteReply };
}
