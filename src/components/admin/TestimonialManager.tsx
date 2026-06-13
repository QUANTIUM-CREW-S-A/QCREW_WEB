import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Star, CheckCircle, XCircle, Edit2, Trash2,
  Save, X, MessageSquareQuote, StickyNote
} from 'lucide-react';
import { toast } from '../ui/Toast';
import type { AdminTestimonial, TestimonialStats, TestimonialStatus } from '../../hooks/useAdminTestimonials';

interface TestimonialManagerProps {
  testimonials: AdminTestimonial[];
  loading: boolean;
  stats: TestimonialStats;
  adminEmail: string;
  onApprove: (id: string, adminEmail: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  onToggleFeatured: (id: string, featured: boolean) => Promise<void>;
  onUpdate: (id: string, data: Partial<AdminTestimonial>) => Promise<void>;
  onUpdateNotes: (id: string, notes: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

type StatusFilter = 'all' | TestimonialStatus;

const statusConfig: Record<TestimonialStatus, { label: string; bg: string; text: string }> = {
  pending: { label: 'Pendiente', bg: 'bg-yellow-500/15', text: 'text-yellow-400' },
  approved: { label: 'Aprobado', bg: 'bg-green-500/15', text: 'text-green-400' },
  rejected: { label: 'Rechazado', bg: 'bg-red-500/15', text: 'text-red-400' },
};

export function TestimonialManager({
  testimonials, loading, stats, adminEmail,
  onApprove, onReject, onToggleFeatured, onUpdate, onUpdateNotes, onDelete
}: TestimonialManagerProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ content: '', rating: 5, category: '' });
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notesId, setNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');

  const filtered = testimonials
    .filter(t => statusFilter === 'all' || t.status === statusFilter)
    .filter(t => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.company.toLowerCase().includes(q) ||
        t.content.toLowerCase().includes(q)
      );
    });

  const startEdit = (t: AdminTestimonial) => {
    setEditingId(t.id);
    setEditData({ content: t.content, rating: t.rating, category: t.category });
  };

  const saveEdit = async (id: string) => {
    try {
      await onUpdate(id, editData);
      setEditingId(null);
      toast('success', 'Testimonio actualizado');
    } catch {
      toast('error', 'Error al actualizar');
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await onApprove(id, adminEmail);
      toast('success', 'Testimonio aprobado');
    } catch {
      toast('error', 'Error al aprobar');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await onReject(id);
      toast('info', 'Testimonio rechazado');
    } catch {
      toast('error', 'Error al rechazar');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
      setDeletingId(null);
      toast('success', 'Testimonio eliminado');
    } catch {
      toast('error', 'Error al eliminar');
    }
  };

  const handleToggleFeatured = async (t: AdminTestimonial) => {
    try {
      await onToggleFeatured(t.id, !t.featured);
      toast('success', t.featured ? 'Removido de destacados' : 'Marcado como destacado');
    } catch {
      toast('error', 'Error al cambiar estado');
    }
  };

  const openNotes = (t: AdminTestimonial) => {
    setNotesId(t.id);
    setNotesText(t.adminNotes);
  };

  const saveNotes = async () => {
    if (!notesId) return;
    try {
      await onUpdateNotes(notesId, notesText);
      setNotesId(null);
      toast('success', 'Notas guardadas');
    } catch {
      toast('error', 'Error al guardar notas');
    }
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] pr-1">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'text-white' },
          { label: 'Pendientes', value: stats.pending, color: 'text-yellow-400' },
          { label: 'Aprobados', value: stats.approved, color: 'text-green-400' },
          { label: 'Rechazados', value: stats.rejected, color: 'text-red-400' },
        ].map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-gray border border-white/[0.06] rounded-xl p-4 text-center"
          >
            <div className={`text-2xl font-bold ${s.color} mb-1`}>{s.value}</div>
            <div className="text-white/40 text-xs">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Buscar por nombre, email, empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-primary/50"
          />
        </div>
        <div className="flex gap-1">
          {([
            { key: 'all' as StatusFilter, label: 'Todos' },
            { key: 'pending' as StatusFilter, label: 'Pendientes' },
            { key: 'approved' as StatusFilter, label: 'Aprobados' },
            { key: 'rejected' as StatusFilter, label: 'Rechazados' },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                statusFilter === f.key
                  ? 'bg-white/10 text-white'
                  : 'text-white/40 hover:text-white/60 hover:bg-white/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonial Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquareQuote className="w-12 h-12 text-white/10 mx-auto mb-3" />
          <p className="text-white/40 text-sm">
            {search ? 'No se encontraron resultados' : 'No hay testimonios'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-brand-gray border border-white/[0.06] rounded-xl p-5"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    {t.imageUrl ? (
                      <img
                        src={t.imageUrl}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border border-white/10"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center">
                        <span className="text-white font-bold text-xs">
                          {t.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-sm">{t.name}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusConfig[t.status].bg} ${statusConfig[t.status].text}`}>
                          {statusConfig[t.status].label}
                        </span>
                        {t.featured && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-brand-primary/15 text-brand-primary">
                            Destacado
                          </span>
                        )}
                      </div>
                      <div className="text-white/40 text-xs">
                        {t.role} en {t.company} &middot; {t.email}
                      </div>
                    </div>
                  </div>
                  <div className="text-white/30 text-xs whitespace-nowrap">
                    {formatDate(t.createdAt)}
                  </div>
                </div>

                {/* Content */}
                {editingId === t.id ? (
                  <div className="space-y-3 mb-4">
                    <textarea
                      value={editData.content}
                      onChange={(e) => setEditData(prev => ({ ...prev, content: e.target.value }))}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-brand-primary/50"
                    />
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setEditData(prev => ({ ...prev, rating: star }))}
                            className={`w-5 h-5 ${star <= editData.rating ? 'text-brand-primary' : 'text-white/20'}`}
                          >
                            <Star className="w-full h-full fill-current" />
                          </button>
                        ))}
                      </div>
                      <select
                        value={editData.category}
                        onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
                        className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-white text-xs focus:outline-none"
                      >
                        {["Infraestructura", "Soporte Técnico", "Desarrollo", "Cloud", "Monitoreo", "Seguridad"].map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(t.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/15 text-green-400 rounded-lg text-xs hover:bg-green-500/25 transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" /> Guardar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-white/50 rounded-lg text-xs hover:bg-white/10 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" /> Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-3">
                    <p className="text-white/80 text-sm leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex gap-0.5">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-brand-primary text-brand-primary" />
                        ))}
                        {[...Array(5 - t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-white/10" />
                        ))}
                      </div>
                      <span className="px-2 py-0.5 bg-white/5 text-white/40 text-[10px] rounded-full">
                        {t.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {editingId !== t.id && (
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06]">
                    {t.status !== 'approved' && (
                      <button
                        onClick={() => handleApprove(t.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg text-xs hover:bg-green-500/20 transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Aprobar
                      </button>
                    )}
                    {t.status !== 'rejected' && (
                      <button
                        onClick={() => handleReject(t.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Rechazar
                      </button>
                    )}
                    <button
                      onClick={() => startEdit(t)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-white/50 rounded-lg text-xs hover:bg-white/10 hover:text-white/70 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Editar
                    </button>
                    <button
                      onClick={() => handleToggleFeatured(t)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        t.featured
                          ? 'bg-brand-primary/15 text-brand-primary hover:bg-brand-primary/25'
                          : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${t.featured ? 'fill-current' : ''}`} />
                      {t.featured ? 'Destacado' : 'Destacar'}
                    </button>
                    <button
                      onClick={() => openNotes(t)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-white/50 rounded-lg text-xs hover:bg-white/10 hover:text-white/70 transition-colors"
                    >
                      <StickyNote className="w-3.5 h-3.5" /> Notas
                    </button>

                    {deletingId === t.id ? (
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-red-400 text-xs">Confirmar:</span>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30 transition-colors"
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="px-3 py-1.5 bg-white/5 text-white/50 rounded-lg text-xs hover:bg-white/10 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingId(t.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-white/30 rounded-lg text-xs hover:bg-red-500/10 hover:text-red-400 transition-colors ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Notes Modal */}
      <AnimatePresence>
        {notesId && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-brand-gray border border-white/10 rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-medium">Notas privadas</h4>
                <button onClick={() => setNotesId(null)} className="text-white/30 hover:text-white/60">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                rows={4}
                placeholder="Notas internas sobre este testimonio..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-brand-primary/50 placeholder:text-white/20 mb-4"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setNotesId(null)}
                  className="px-4 py-2 bg-white/5 text-white/50 rounded-lg text-sm hover:bg-white/10 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveNotes}
                  className="px-4 py-2 bg-brand-primary/20 text-brand-primary rounded-lg text-sm hover:bg-brand-primary/30 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
