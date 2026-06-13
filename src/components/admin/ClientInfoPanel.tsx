import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, MessageSquare, Tag, X, Plus, Copy, Check, StickyNote, AlertCircle } from 'lucide-react';
import type { Conversation, Priority } from '../../hooks/useConversations';

interface ClientInfoPanelProps {
  conversation: Conversation;
  messageCount: number;
  onSetPriority: (priority: Priority) => Promise<void>;
  onAddTag: (tag: string) => Promise<void>;
  onRemoveTag: (tag: string) => Promise<void>;
  onUpdateNotes: (notes: string) => Promise<void>;
}

const PRIORITIES: { value: Priority; label: string; color: string; bg: string }[] = [
  { value: 'low', label: 'Baja', color: 'text-gray-400', bg: 'bg-gray-500/20' },
  { value: 'medium', label: 'Media', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { value: 'high', label: 'Alta', color: 'text-orange-400', bg: 'bg-orange-500/20' },
  { value: 'urgent', label: 'Urgente', color: 'text-red-400', bg: 'bg-red-500/20' },
];

const PRESET_TAGS = ['Ventas', 'Soporte', 'Consultoría', 'Bug', 'Facturación', 'Urgente', 'VIP', 'Seguimiento'];

export function ClientInfoPanel({ conversation, messageCount, onSetPriority, onAddTag, onRemoveTag, onUpdateNotes }: ClientInfoPanelProps) {
  const [notes, setNotes] = useState(conversation.notes);
  const [notesSaved, setNotesSaved] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setNotes(conversation.notes);
  }, [conversation.id, conversation.notes]);

  const saveNotes = async () => {
    await onUpdateNotes(notes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(conversation.clientEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddTag = async (tag: string) => {
    if (!tag.trim() || conversation.tags.includes(tag.trim())) return;
    await onAddTag(tag.trim());
    setNewTag('');
    setShowTagInput(false);
  };

  const availableTags = PRESET_TAGS.filter(t => !conversation.tags.includes(t));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-brand-gray border border-white/10 rounded-xl p-5 space-y-5"
    >
      {/* Client avatar and name */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-3 text-white text-xl font-bold">
          {conversation.clientName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <h3 className="text-white font-semibold">{conversation.clientName}</h3>
        <button
          onClick={copyEmail}
          className="flex items-center gap-1.5 mx-auto mt-1 text-white/40 text-xs hover:text-white/60 transition-colors"
        >
          <Mail className="w-3 h-3" />
          {conversation.clientEmail}
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/[0.03] rounded-lg p-3 text-center">
          <Calendar className="w-4 h-4 text-white/30 mx-auto mb-1" />
          <div className="text-white text-sm font-medium">
            {conversation.createdAt.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
          </div>
          <div className="text-white/30 text-[10px]">Creado</div>
        </div>
        <div className="bg-white/[0.03] rounded-lg p-3 text-center">
          <MessageSquare className="w-4 h-4 text-white/30 mx-auto mb-1" />
          <div className="text-white text-sm font-medium">{messageCount}</div>
          <div className="text-white/30 text-[10px]">Mensajes</div>
        </div>
      </div>

      {/* Priority */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <AlertCircle className="w-3.5 h-3.5 text-white/30" />
          <span className="text-white/50 text-xs font-medium">Prioridad</span>
        </div>
        <div className="flex gap-1.5">
          {PRIORITIES.map(p => (
            <button
              key={p.value}
              onClick={() => onSetPriority(p.value)}
              className={`flex-1 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                conversation.priority === p.value
                  ? `${p.bg} ${p.color} ring-1 ring-current`
                  : 'bg-white/[0.03] text-white/30 hover:bg-white/[0.06]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Tag className="w-3.5 h-3.5 text-white/30" />
          <span className="text-white/50 text-xs font-medium">Etiquetas</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {conversation.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs rounded-md"
            >
              {tag}
              <button onClick={() => onRemoveTag(tag)} className="hover:text-red-400 transition-colors">
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}

          {showTagInput ? (
            <div className="flex items-center gap-1">
              <input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag(newTag)}
                placeholder="Tag..."
                autoFocus
                className="w-20 bg-white/5 border border-white/20 rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-primary"
              />
              <button onClick={() => handleAddTag(newTag)} className="text-green-400">
                <Check className="w-3 h-3" />
              </button>
              <button onClick={() => { setShowTagInput(false); setNewTag(''); }} className="text-white/30">
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowTagInput(true)}
              className="px-2 py-1 border border-dashed border-white/15 rounded-md text-xs text-white/30 hover:text-white/50 hover:border-white/25 transition-colors flex items-center gap-1"
            >
              <Plus className="w-2.5 h-2.5" />
            </button>
          )}
        </div>

        {/* Preset tags */}
        {availableTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {availableTags.slice(0, 4).map(tag => (
              <button
                key={tag}
                onClick={() => onAddTag(tag)}
                className="px-1.5 py-0.5 text-[10px] text-white/20 hover:text-white/40 bg-white/[0.02] hover:bg-white/[0.05] rounded transition-colors"
              >
                + {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Notes */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <StickyNote className="w-3.5 h-3.5 text-white/30" />
          <span className="text-white/50 text-xs font-medium">Notas privadas</span>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Agrega notas sobre este cliente..."
          rows={3}
          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3 py-2 text-white/70 text-xs placeholder-white/20 focus:outline-none focus:border-brand-primary transition-colors resize-none"
        />
        <button
          onClick={saveNotes}
          disabled={notes === conversation.notes}
          className="mt-1.5 text-xs text-brand-primary hover:text-brand-primary/80 disabled:text-white/15 disabled:cursor-default transition-colors flex items-center gap-1"
        >
          {notesSaved ? (
            <><Check className="w-3 h-3" /> Guardado</>
          ) : (
            'Guardar notas'
          )}
        </button>
      </div>
    </motion.div>
  );
}
