import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MessageCircle, ChevronDown } from 'lucide-react';
import type { Conversation, ConversationStatus, Priority } from '../../hooks/useConversations';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const STATUS_LABELS: Record<'all' | ConversationStatus, string> = {
  all: 'Todos',
  unread: 'Sin leer',
  read: 'Leído',
  responded: 'Respondido'
};

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; dot: string }> = {
  low: { label: 'Baja', color: 'text-gray-400', dot: 'bg-gray-400' },
  medium: { label: 'Media', color: 'text-blue-400', dot: 'bg-blue-400' },
  high: { label: 'Alta', color: 'text-orange-400', dot: 'bg-orange-400' },
  urgent: { label: 'Urgente', color: 'text-red-400', dot: 'bg-red-400' },
};

type SortMode = 'recent' | 'priority' | 'unread';

export function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | ConversationStatus>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | Priority>('all');
  const [showPriorityFilter, setShowPriorityFilter] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>('recent');

  const filtered = conversations.filter(conv => {
    const matchesSearch = conv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || conv.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || conv.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const sortedConversations = [...filtered].sort((a, b) => {
    if (sortMode === 'priority') {
      const priorityValue: Record<Priority, number> = { low: 1, medium: 2, high: 3, urgent: 4 };
      const diff = priorityValue[b.priority] - priorityValue[a.priority];
      if (diff !== 0) return diff;
    }

    if (sortMode === 'unread') {
      const unreadDiff = Number(b.status === 'unread') - Number(a.status === 'unread');
      if (unreadDiff !== 0) return unreadDiff;
    }

    return b.updatedAt.getTime() - a.updatedAt.getTime();
  });

  const statusCounts = {
    all: conversations.length,
    unread: conversations.filter(c => c.status === 'unread').length,
    read: conversations.filter(c => c.status === 'read').length,
    responded: conversations.filter(c => c.status === 'responded').length,
  };

  const getStatusDot = (status: ConversationStatus) => {
    switch (status) {
      case 'unread': return 'bg-red-500';
      case 'read': return 'bg-yellow-500';
      case 'responded': return 'bg-green-500';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="bg-brand-gray border border-white/10 rounded-xl p-4 mb-3">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-brand-primary transition-colors"
          />
        </div>

        {/* Status filters */}
        <div className="flex gap-1.5 mb-2 flex-wrap">
          {(Object.keys(STATUS_LABELS) as Array<'all' | ConversationStatus>).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-2.5 py-1 rounded-full text-xs transition-colors flex items-center gap-1.5 ${
                filterStatus === status
                  ? 'bg-brand-primary text-white'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {STATUS_LABELS[status]}
              <span className={`text-[10px] ${filterStatus === status ? 'text-white/70' : 'text-white/30'}`}>
                {statusCounts[status]}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Orden</span>
            <select
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="bg-white/[0.04] border border-white/10 rounded-md px-2 py-1 text-[11px] text-white/70 focus:outline-none"
            >
              <option value="recent">Recientes</option>
              <option value="priority">Prioridad</option>
              <option value="unread">Sin leer</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterPriority('all');
            }}
            className="text-[11px] text-white/40 hover:text-white/70 transition-colors"
          >
            Limpiar
          </button>
        </div>

        <div className="relative mt-3">
          <button
            onClick={() => setShowPriorityFilter(!showPriorityFilter)}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/70 transition-colors"
          >
            <span>Prioridad: {filterPriority === 'all' ? 'Todas' : PRIORITY_CONFIG[filterPriority].label}</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${showPriorityFilter ? 'rotate-180' : ''}`} />
          </button>
          {showPriorityFilter && (
            <div className="absolute top-full left-0 mt-1 bg-brand-gray border border-white/20 rounded-lg shadow-xl z-10 py-1 min-w-[120px]">
              <button
                onClick={() => { setFilterPriority('all'); setShowPriorityFilter(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-white/10 transition-colors ${filterPriority === 'all' ? 'text-brand-primary' : 'text-white/60'}`}
              >
                Todas
              </button>
              {(Object.keys(PRIORITY_CONFIG) as Priority[]).map(p => (
                <button
                  key={p}
                  onClick={() => { setFilterPriority(p); setShowPriorityFilter(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs hover:bg-white/10 transition-colors flex items-center gap-2 ${filterPriority === p ? 'text-brand-primary' : 'text-white/60'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_CONFIG[p].dot}`} />
                  {PRIORITY_CONFIG[p].label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        <AnimatePresence>
          {sortedConversations.map((conv) => (
            <motion.button
              key={conv.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => onSelect(conv.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                selectedId === conv.id
                  ? 'bg-brand-primary/15 border-brand-primary/50'
                  : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.07]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                  {conv.clientName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white text-sm font-medium truncate">{conv.clientName}</span>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${PRIORITY_CONFIG[conv.priority].dot}`} />
                    </div>
                    <span className="text-white/30 text-[11px] flex-shrink-0">{formatTime(conv.updatedAt)}</span>
                  </div>
                  <p className="text-white/40 text-xs truncate mb-1.5">{conv.lastMessage || 'Sin mensajes'}</p>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(conv.status)}`} />
                    {conv.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-white/[0.06] rounded text-[10px] text-white/40">
                        {tag}
                      </span>
                    ))}
                    {conv.tags.length > 2 && (
                      <span className="text-[10px] text-white/30">+{conv.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-10 h-10 text-white/15 mx-auto mb-3" />
            <p className="text-white/30 text-sm">
              {conversations.length === 0 ? 'Sin conversaciones' : 'Sin resultados'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
