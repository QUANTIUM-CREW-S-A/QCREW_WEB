import { motion } from 'framer-motion';
import { MessageCircle, Inbox, CheckCircle, Clock, ArrowRight, User } from 'lucide-react';
import type { Conversation, ConversationStats } from '../../hooks/useConversations';

interface AdminDashboardProps {
  stats: ConversationStats;
  conversations: Conversation[];
  onSelectConversation: (id: string) => void;
  onSwitchToChats: () => void;
}

const statCards = [
  { key: 'total', label: 'Total', icon: MessageCircle, color: 'from-blue-500 to-cyan-400', bg: 'bg-blue-500/10', text: 'text-blue-400' },
  { key: 'unread', label: 'Sin leer', icon: Inbox, color: 'from-red-500 to-orange-400', bg: 'bg-red-500/10', text: 'text-red-400' },
  { key: 'respondedToday', label: 'Respondidas hoy', icon: CheckCircle, color: 'from-green-500 to-emerald-400', bg: 'bg-green-500/10', text: 'text-green-400' },
  { key: 'avgResponseMinutes', label: 'Tiempo resp. (min)', icon: Clock, color: 'from-violet-500 to-purple-400', bg: 'bg-violet-500/10', text: 'text-violet-400' },
] as const;

export function AdminDashboard({ stats, conversations, onSelectConversation, onSwitchToChats }: AdminDashboardProps) {
  const recentConversations = conversations.slice(0, 5);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayEnd = new Date(dayStart.getTime() + 86400000);
    const count = conversations.filter(
      c => c.updatedAt >= dayStart && c.updatedAt < dayEnd
    ).length;
    return {
      label: date.toLocaleDateString('es-ES', { weekday: 'short' }),
      count
    };
  });

  const maxActivity = Math.max(...last7Days.map(d => d.count), 1);

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'unread': return 'text-red-400';
      case 'read': return 'text-yellow-400';
      case 'responded': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-brand-gray border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.text}`} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats[card.key]}
            </div>
            <div className="text-white/50 text-sm">{card.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-brand-gray border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-white font-semibold mb-4">Actividad - Últimos 7 días</h3>
          <div className="flex items-end gap-3 h-40">
            {last7Days.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="text-white/50 text-xs">{day.count}</div>
                <div className="w-full relative" style={{ height: '100px' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.count / maxActivity) * 100}%` }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                    className="absolute bottom-0 w-full bg-gradient-to-t from-brand-primary to-brand-secondary rounded-t-md min-h-[4px]"
                  />
                </div>
                <div className="text-white/40 text-xs capitalize">{day.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Conversations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-brand-gray border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Conversaciones recientes</h3>
            <button
              onClick={onSwitchToChats}
              className="text-brand-primary text-sm flex items-center gap-1 hover:underline"
            >
              Ver todas <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {recentConversations.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-10 h-10 text-white/20 mx-auto mb-2" />
              <p className="text-white/40 text-sm">Sin conversaciones aún</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    onSwitchToChats();
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium truncate">{conv.clientName}</span>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${getPriorityColor(conv.priority)}`} />
                    </div>
                    <p className="text-white/50 text-xs truncate">{conv.lastMessage}</p>
                  </div>
                  <span className={`text-xs flex-shrink-0 ${getStatusColor(conv.status)}`}>
                    {conv.status === 'unread' ? 'Nuevo' : conv.status === 'read' ? 'Leído' : 'Resp.'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
