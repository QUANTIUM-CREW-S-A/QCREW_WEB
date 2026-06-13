import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Plus, X, Edit2, Trash2, Check } from 'lucide-react';
import { useQuickReplies } from '../../hooks/useQuickReplies';

interface QuickRepliesProps {
  onSelect: (text: string) => void;
}

export function QuickReplies({ onSelect }: QuickRepliesProps) {
  const { replies, addReply, updateReply, deleteReply } = useQuickReplies();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formText, setFormText] = useState('');

  const startEdit = (id: string, title: string, text: string) => {
    setEditing(id);
    setFormTitle(title);
    setFormText(text);
  };

  const saveEdit = async () => {
    if (!formTitle.trim() || !formText.trim()) return;
    if (editing) {
      await updateReply(editing, formTitle, formText);
    }
    setEditing(null);
    setFormTitle('');
    setFormText('');
  };

  const saveNew = async () => {
    if (!formTitle.trim() || !formText.trim()) return;
    await addReply(formTitle, formText);
    setAdding(false);
    setFormTitle('');
    setFormText('');
  };

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-xs text-white/40 hover:text-brand-primary transition-colors mb-2"
      >
        <Zap className="w-3.5 h-3.5" />
        Respuestas rápidas
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5 mb-2">
              {replies.map((reply) => (
                <div key={reply.id} className="group relative">
                  {editing === reply.id ? (
                    <div className="bg-white/10 border border-white/20 rounded-lg p-2 min-w-[200px]">
                      <input
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="Título"
                        className="w-full bg-transparent border-b border-white/20 text-white text-xs mb-1 pb-1 focus:outline-none focus:border-brand-primary"
                      />
                      <textarea
                        value={formText}
                        onChange={(e) => setFormText(e.target.value)}
                        placeholder="Texto..."
                        rows={2}
                        className="w-full bg-transparent text-white/70 text-xs resize-none focus:outline-none"
                      />
                      <div className="flex gap-1 mt-1">
                        <button onClick={saveEdit} className="text-green-400 hover:text-green-300">
                          <Check className="w-3 h-3" />
                        </button>
                        <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white/60">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => onSelect(reply.message)}
                      className="px-2.5 py-1.5 bg-white/[0.06] border border-white/[0.08] rounded-lg text-xs text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      {reply.label}
                      <span className="hidden group-hover:inline-flex absolute -top-1 -right-1 gap-0.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); startEdit(reply.id, reply.label, reply.message); }}
                          className="w-4 h-4 bg-brand-gray border border-white/20 rounded-full flex items-center justify-center"
                        >
                          <Edit2 className="w-2 h-2 text-white/60" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteReply(reply.id); }}
                          className="w-4 h-4 bg-brand-gray border border-white/20 rounded-full flex items-center justify-center"
                        >
                          <Trash2 className="w-2 h-2 text-red-400" />
                        </button>
                      </span>
                    </button>
                  )}
                </div>
              ))}

              {adding ? (
                <div className="bg-white/10 border border-white/20 rounded-lg p-2 min-w-[200px]">
                  <input
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Título"
                    className="w-full bg-transparent border-b border-white/20 text-white text-xs mb-1 pb-1 focus:outline-none focus:border-brand-primary"
                    autoFocus
                  />
                  <textarea
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    placeholder="Texto de respuesta..."
                    rows={2}
                    className="w-full bg-transparent text-white/70 text-xs resize-none focus:outline-none"
                  />
                  <div className="flex gap-1 mt-1">
                    <button onClick={saveNew} className="text-green-400 hover:text-green-300">
                      <Check className="w-3 h-3" />
                    </button>
                    <button onClick={() => { setAdding(false); setFormTitle(''); setFormText(''); }} className="text-white/40 hover:text-white/60">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAdding(true)}
                  className="px-2.5 py-1.5 border border-dashed border-white/20 rounded-lg text-xs text-white/30 hover:text-white/50 hover:border-white/30 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Agregar
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
