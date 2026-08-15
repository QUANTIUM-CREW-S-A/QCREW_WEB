import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, MessageCircle, LogOut, Volume2, VolumeX, Star, Settings } from 'lucide-react';
import { useConversations, useConversationMessages } from '../hooks/useConversations';
import { useAdminTestimonials } from '../hooks/useAdminTestimonials';
import { useAuth } from '../hooks/useAuth';
import { useNotificationSound } from '../hooks/useNotificationSound';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { ConversationList } from '../components/admin/ConversationList';
import { ChatView } from '../components/admin/ChatView';
import { ClientInfoPanel } from '../components/admin/ClientInfoPanel';
import { TestimonialManager } from '../components/admin/TestimonialManager';
import { StoreManager } from '../components/admin/StoreManager';
import { AdminSettings } from '../components/admin/AdminSettings';

type Tab = 'dashboard' | 'chats' | 'testimonials' | 'store' | 'settings';

export function AdminPanel() {
  const {
    conversations, loading, getStats,
    markAsRead, markAllAsRead, deleteConversation, sendResponse,
    setPriority, addTag, removeTag, updateNotes
  } = useConversations();
  const {
    testimonials: adminTestimonials,
    loading: testimonialsLoading,
    getStats: getTestimonialStats,
    approveTestimonial,
    rejectTestimonial,
    toggleFeatured,
    updateTestimonial,
    updateAdminNotes,
    deleteTestimonial,
  } = useAdminTestimonials();
  const { user, logout } = useAuth();
  const { muted, toggleMute, play } = useNotificationSound();

  const [activeTab, setActiveTab] = useState<Tab>('chats');
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [showClientInfo, setShowClientInfo] = useState(false);
  const prevUnreadRef = useRef<number>(0);

  const { messages: conversationMessages, loading: messagesLoading } = useConversationMessages(selectedConvId);
  const selectedConversation = conversations.find(c => c.id === selectedConvId) || null;
  const stats = getStats();
  const testimonialStats = getTestimonialStats();

  // Notification sound on new unread
  useEffect(() => {
    const currentUnread = conversations.filter(c => c.status === 'unread').length;
    if (currentUnread > prevUnreadRef.current && prevUnreadRef.current !== 0) {
      play();
    }
    prevUnreadRef.current = currentUnread;
  }, [conversations, play]);

  // Deselect if conversation deleted
  useEffect(() => {
    if (selectedConvId && !conversations.find(c => c.id === selectedConvId)) {
      setSelectedConvId(null);
    }
  }, [conversations, selectedConvId]);

  const handleSelectConversation = async (convId: string) => {
    setSelectedConvId(convId);
    const conv = conversations.find(c => c.id === convId);
    if (conv && conv.status === 'unread') {
      await markAsRead(convId);
    }
  };

  const handleDeleteConversation = async () => {
    if (!selectedConvId) return;
    await deleteConversation(selectedConvId);
    setSelectedConvId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-white/40 text-sm">Cargando panel...</p>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard; badge?: number; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chats', label: 'Conversaciones', icon: MessageCircle, badge: stats.unread > 0 ? stats.unread : undefined, badgeColor: 'bg-red-500' },
    { id: 'store', label: 'Tienda', icon: Star },
    { id: 'testimonials', label: 'Testimonios', icon: Star, badge: testimonialStats.pending > 0 ? testimonialStats.pending : undefined, badgeColor: 'bg-yellow-500' },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-brand-dark flex">
      <aside className="w-full max-w-[260px] border-r border-white/[0.06] bg-brand-gray/80 backdrop-blur-xl p-4 flex flex-col">
        <div className="flex items-center gap-3 px-2 pb-5 border-b border-white/[0.06] mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-xl flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">QCREW Admin</p>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.18em]">Control</p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white shadow-inner shadow-brand-primary/10'
                  : 'text-white/40 hover:text-white/60 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-3">
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </span>
              {tab.badge && (
                <span className={`${tab.badgeColor} text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-3 border-t border-white/[0.06] pt-4">
          <button
            onClick={() => markAllAsRead()}
            disabled={stats.unread === 0}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70 transition hover:border-brand-primary/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Marcar todo como leído
          </button>

          <button
            onClick={toggleMute}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/70 transition hover:border-white/20 hover:text-white"
            title={muted ? 'Activar sonido' : 'Silenciar'}
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            {muted ? 'Sonido off' : 'Sonido on'}
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-300 transition hover:bg-red-500/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-brand-gray/80 backdrop-blur-xl border-b border-white/[0.06] px-5 py-3 flex-shrink-0">
          <div className="max-w-[1600px] mx-auto flex items-center justify-end">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03]">
                <div className="w-6 h-6 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">
                    {user?.email?.[0]?.toUpperCase() || 'A'}
                  </span>
                </div>
                <span className="text-white/50 text-xs hidden md:block max-w-[140px] truncate">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <div className="max-w-[1600px] mx-auto p-4 h-full">
            {/* Sin mode="wait": con "wait" el contenido nuevo no se monta hasta que
                termine la animacion de salida del anterior, y esa animacion
                depende de requestAnimationFrame. Si la pestana del navegador
                pierde visibilidad un instante (cambio de ventana, foco), rAF se
                pausa y el panel queda congelado en la vista vieja. */}
            <AnimatePresence>
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AdminDashboard
                    stats={stats}
                    conversations={conversations}
                    onSelectConversation={handleSelectConversation}
                    onSwitchToChats={() => setActiveTab('chats')}
                  />
                </motion.div>
              )}

              {activeTab === 'chats' && (
                <motion.div
                  key="chats"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-[calc(100vh-120px)]"
                >
                  <div className="grid grid-cols-12 gap-4 h-full">
                    <div className="col-span-12 md:col-span-4 lg:col-span-3 h-full overflow-hidden">
                      <ConversationList
                        conversations={conversations}
                        selectedId={selectedConvId}
                        onSelect={handleSelectConversation}
                      />
                    </div>

                    <div className={`col-span-12 h-full ${
                      showClientInfo && selectedConversation
                        ? 'md:col-span-8 lg:col-span-6'
                        : 'md:col-span-8 lg:col-span-9'
                    } ${!selectedConvId ? 'hidden md:block' : ''}`}>
                      {selectedConversation ? (
                        <ChatView
                          conversation={selectedConversation}
                          messages={conversationMessages}
                          messagesLoading={messagesLoading}
                          onSendResponse={(text) => sendResponse(selectedConvId!, text)}
                          onDelete={handleDeleteConversation}
                          onToggleInfo={() => setShowClientInfo(!showClientInfo)}
                          showInfo={showClientInfo}
                        />
                      ) : (
                        <div className="bg-brand-gray border border-white/[0.06] rounded-xl h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-white/[0.03] rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <MessageCircle className="w-8 h-8 text-white/10" />
                            </div>
                            <h3 className="text-white/50 text-lg font-medium mb-1">Selecciona una conversación</h3>
                            <p className="text-white/20 text-sm">Elige un chat para comenzar a responder</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <AnimatePresence>
                      {showClientInfo && selectedConversation && (
                        <div className="hidden lg:block lg:col-span-3 h-full overflow-y-auto">
                          <ClientInfoPanel
                            conversation={selectedConversation}
                            messageCount={conversationMessages.length}
                            onSetPriority={(p) => setPriority(selectedConvId!, p)}
                            onAddTag={(t) => addTag(selectedConvId!, t)}
                            onRemoveTag={(t) => removeTag(selectedConvId!, t)}
                            onUpdateNotes={(n) => updateNotes(selectedConvId!, n)}
                          />
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {activeTab === 'store' && (
                <motion.div
                  key="store"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <StoreManager />
                </motion.div>
              )}

              {activeTab === 'testimonials' && (
                <motion.div
                  key="testimonials"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <TestimonialManager
                    testimonials={adminTestimonials}
                    loading={testimonialsLoading}
                    stats={testimonialStats}
                    adminEmail={user?.email || ''}
                    onApprove={approveTestimonial}
                    onReject={rejectTestimonial}
                    onToggleFeatured={toggleFeatured}
                    onUpdate={updateTestimonial}
                    onUpdateNotes={updateAdminNotes}
                    onDelete={deleteTestimonial}
                  />
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AdminSettings
                    user={user}
                    muted={muted}
                    onToggleMute={toggleMute}
                    onLogout={logout}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
