import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, MessageCircle, LogOut, Volume2, VolumeX, Star } from 'lucide-react';
import { useConversations, useConversationMessages } from '../hooks/useConversations';
import { useAdminTestimonials } from '../hooks/useAdminTestimonials';
import { useAuth } from '../hooks/useAuth';
import { useNotificationSound } from '../hooks/useNotificationSound';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { ConversationList } from '../components/admin/ConversationList';
import { ChatView } from '../components/admin/ChatView';
import { ClientInfoPanel } from '../components/admin/ClientInfoPanel';
import { TestimonialManager } from '../components/admin/TestimonialManager';

type Tab = 'dashboard' | 'chats' | 'testimonials';

export function AdminPanel() {
  const {
    conversations, loading, getStats,
    markAsRead, deleteConversation, sendResponse,
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
    { id: 'testimonials', label: 'Testimonios', icon: Star, badge: testimonialStats.pending > 0 ? testimonialStats.pending : undefined, badgeColor: 'bg-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      {/* Header */}
      <header className="bg-brand-gray/80 backdrop-blur-xl border-b border-white/[0.06] px-6 py-3 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold text-sm hidden sm:block">QCREW Admin</span>
            </div>

            {/* Tabs */}
            <nav className="flex gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.badge && (
                    <span className={`${tab.badgeColor} text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Notification toggle */}
            <button
              onClick={toggleMute}
              className="p-2 text-white/30 hover:text-white/60 transition-colors rounded-lg hover:bg-white/5"
              title={muted ? 'Activar sonido' : 'Silenciar'}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Admin profile */}
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

            {/* Logout */}
            <button
              onClick={logout}
              className="p-2 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-[1600px] mx-auto p-4 h-full">
          <AnimatePresence mode="wait">
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
                  {/* Conversation list */}
                  <div className="col-span-12 md:col-span-4 lg:col-span-3 h-full overflow-hidden">
                    <ConversationList
                      conversations={conversations}
                      selectedId={selectedConvId}
                      onSelect={handleSelectConversation}
                    />
                  </div>

                  {/* Chat view */}
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

                  {/* Client info panel */}
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
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
