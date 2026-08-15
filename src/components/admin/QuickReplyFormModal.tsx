import { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal';
import { toast } from '../ui/Toast';
import type { QuickReply } from '../../hooks/useQuickReplies';

interface QuickReplyFormModalProps {
  open: boolean;
  onClose: () => void;
  reply: QuickReply | null;
  onCreate: (label: string, message: string) => void;
  onUpdate: (id: string, label: string, message: string) => void;
}

export function QuickReplyFormModal({ open, onClose, reply, onCreate, onUpdate }: QuickReplyFormModalProps) {
  const [label, setLabel] = useState('');
  const [message, setMessage] = useState('');
  const isEditing = Boolean(reply);

  useEffect(() => {
    if (!open) return;
    setLabel(reply?.label ?? '');
    setMessage(reply?.message ?? '');
  }, [open, reply]);

  const handleSave = () => {
    if (!label.trim() || !message.trim()) {
      toast('error', 'Título y mensaje son obligatorios');
      return;
    }
    if (isEditing && reply) {
      onUpdate(reply.id, label.trim(), message.trim());
    } else {
      onCreate(label.trim(), message.trim());
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Editar respuesta rápida' : 'Nueva respuesta rápida'}
      size="sm"
      footer={
        <>
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-white/60 transition hover:text-white">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary px-4 py-2 text-sm font-medium text-white transition hover:opacity-95"
          >
            {isEditing ? 'Guardar cambios' : 'Crear respuesta'}
          </button>
        </>
      }
    >
      <div className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/40">Título</span>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-primary"
            placeholder="Ej. Saludo"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/40">Mensaje</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-primary resize-none"
            placeholder="Texto que se enviará al cliente"
          />
        </label>
      </div>
    </Modal>
  );
}
