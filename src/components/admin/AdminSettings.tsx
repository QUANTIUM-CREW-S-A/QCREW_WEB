import { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import {
  KeyRound,
  Volume2,
  VolumeX,
  Zap,
  Building2,
  Plus,
  Pencil,
  Trash2,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import { toast } from '../ui/Toast';
import { supabase } from '../../lib/supabase';
import { company } from '../../lib/company';
import { useQuickReplies, type QuickReply } from '../../hooks/useQuickReplies';
import { ChangePasswordModal } from './ChangePasswordModal';
import { QuickReplyFormModal } from './QuickReplyFormModal';

interface AdminSettingsProps {
  user: User | null;
  muted: boolean;
  onToggleMute: () => void;
  onLogout: () => void;
}

function SettingsCard({ title, description, icon: Icon, children }: { title: string; description?: string; icon: typeof KeyRound; children: React.ReactNode }) {
  return (
    <div className="bg-brand-gray border border-white/10 rounded-xl p-5">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-white font-semibold">{title}</h3>
          {description && <p className="text-xs text-white/40">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

export function AdminSettings({ user, muted, onToggleMute, onLogout }: AdminSettingsProps) {
  const { replies, addReply, updateReply, deleteReply } = useQuickReplies();
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [editingReply, setEditingReply] = useState<QuickReply | null>(null);

  const openNewReply = () => {
    setEditingReply(null);
    setReplyModalOpen(true);
  };

  const openEditReply = (reply: QuickReply) => {
    setEditingReply(reply);
    setReplyModalOpen(true);
  };

  const handleSignOutEverywhere = async () => {
    try {
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      toast('success', 'Se cerraron todas las sesiones');
    } catch {
      toast('error', 'No se pudieron cerrar las demás sesiones');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <SettingsCard title="Cuenta" description={user?.email ?? ''} icon={KeyRound}>
        <button
          onClick={() => setPasswordModalOpen(true)}
          className="w-full rounded-lg bg-white/5 px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10"
        >
          Cambiar contraseña
        </button>
      </SettingsCard>

      <SettingsCard title="Notificaciones" description="Sonido al recibir mensajes nuevos" icon={muted ? VolumeX : Volume2}>
        <button
          onClick={onToggleMute}
          className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10"
        >
          <span>{muted ? 'Sonido desactivado' : 'Sonido activado'}</span>
          <span className={`rounded-full px-2 py-0.5 text-[10px] ${muted ? 'bg-white/10 text-white/50' : 'bg-brand-primary/20 text-brand-primary'}`}>
            {muted ? 'OFF' : 'ON'}
          </span>
        </button>
      </SettingsCard>

      <SettingsCard title="Respuestas rápidas" description={`${replies.length} guardadas · se usan en el chat`} icon={Zap}>
        <div className="space-y-2">
          {replies.map((reply) => (
            <div key={reply.id} className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-sm text-white/80">{reply.label}</p>
                <p className="truncate text-xs text-white/40">{reply.message}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => openEditReply(reply)}
                  aria-label="Editar respuesta"
                  className="rounded-lg bg-white/5 p-1.5 text-white/60 hover:bg-white/10"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => deleteReply(reply.id)}
                  aria-label="Eliminar respuesta"
                  className="rounded-lg bg-white/5 p-1.5 text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
          {replies.length === 0 && (
            <p className="py-4 text-center text-sm text-white/40">Todavía no hay respuestas guardadas.</p>
          )}
          <button
            onClick={openNewReply}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10"
          >
            <Plus className="h-4 w-4" />
            Nueva respuesta
          </button>
        </div>
      </SettingsCard>

      <SettingsCard title="Datos de la empresa" description="Fuente única: src/lib/company.ts" icon={Building2}>
        <dl className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-white/40">Teléfono</dt>
            <dd className="text-white/80">{company.phone.display}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-white/40">Email</dt>
            <dd className="text-white/80">{company.email}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-white/40">Ubicación</dt>
            <dd className="text-right text-white/80">{company.address.locality}, {company.address.countryName}</dd>
          </div>
        </dl>
        <p className="mt-3 text-[11px] text-white/30">
          Estos datos alimentan el sitio público y el JSON-LD. Para editarlos hay que actualizar el código, no se guardan en la base de datos.
        </p>
      </SettingsCard>

      <SettingsCard title="Sesión" description="Cerrar el acceso de este panel" icon={ShieldCheck}>
        <div className="space-y-2">
          <button
            onClick={handleSignOutEverywhere}
            className="w-full rounded-lg bg-white/5 px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10"
          >
            Cerrar sesión en todos los dispositivos
          </button>
          <button
            onClick={onLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2.5 text-sm text-red-300 transition hover:bg-red-500/10"
          >
            <LogOut className="h-3.5 w-3.5" />
            Cerrar sesión aquí
          </button>
        </div>
      </SettingsCard>

      <ChangePasswordModal open={passwordModalOpen} onClose={() => setPasswordModalOpen(false)} />
      <QuickReplyFormModal
        open={replyModalOpen}
        onClose={() => setReplyModalOpen(false)}
        reply={editingReply}
        onCreate={addReply}
        onUpdate={updateReply}
      />
    </div>
  );
}
