import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { toast } from '../ui/Toast';
import { supabase } from '../../lib/supabase';

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({ open, onClose }: ChangePasswordModalProps) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [saving, setSaving] = useState(false);

  const handleClose = () => {
    setPassword('');
    setConfirm('');
    onClose();
  };

  const handleSave = async () => {
    if (password.length < 8) {
      toast('error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (password !== confirm) {
      toast('error', 'Las contraseñas no coinciden');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast('success', 'Contraseña actualizada');
      handleClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar la contraseña';
      toast('error', message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Cambiar contraseña"
      description="Se aplica de inmediato a esta cuenta"
      size="sm"
      footer={
        <>
          <button onClick={handleClose} className="rounded-lg px-4 py-2 text-sm text-white/60 transition hover:text-white">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary px-4 py-2 text-sm font-medium text-white transition hover:opacity-95 disabled:opacity-50"
          >
            {saving ? 'Guardando…' : 'Actualizar contraseña'}
          </button>
        </>
      }
    >
      <div className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/40">Nueva contraseña</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-primary"
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] uppercase tracking-wide text-white/40">Confirmar contraseña</span>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-primary"
            placeholder="Repite la contraseña"
            autoComplete="new-password"
          />
        </label>
      </div>
    </Modal>
  );
}
