import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Clock, Trash2, Download, Info, MessageCircle } from 'lucide-react';
import type { Conversation, Message } from '../../hooks/useConversations';
import { QuickReplies } from './QuickReplies';

interface ChatViewProps {
  conversation: Conversation;
  messages: Message[];
  messagesLoading: boolean;
  onSendResponse: (text: string) => Promise<void>;
  onDelete: () => void;
  onToggleInfo: () => void;
  showInfo: boolean;
}

export function ChatView({ conversation, messages, messagesLoading, onSendResponse, onDelete, onToggleInfo, showInfo }: ChatViewProps) {
  const [responseText, setResponseText] = useState('');
  const [sending, setSending] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!responseText.trim() || sending) return;
    setSending(true);
    const text = responseText;
    setResponseText('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    try {
      await onSendResponse(text);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponseText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const exportChat = () => {
    const lines = messages.map(m => {
      const time = m.timestamp.toLocaleString('es-ES');
      const sender = m.sender === 'admin' ? 'Admin' : conversation.clientName;
      return `[${time}] ${sender}: ${m.text}`;
    });
    const header = `Conversación con ${conversation.clientName} (${conversation.clientEmail})\n${'='.repeat(50)}\n\n`;
    const blob = new Blob([header + lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${conversation.clientName.replace(/\s/g, '-').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-500/15 text-red-400';
      case 'read': return 'bg-yellow-500/15 text-yellow-400';
      case 'responded': return 'bg-green-500/15 text-green-400';
      default: return 'bg-gray-500/15 text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'unread': return 'Sin leer';
      case 'read': return 'Leído';
      case 'responded': return 'Respondido';
      default: return status;
    }
  };

  // Group messages by date
  const groupedMessages: { date: string; messages: Message[] }[] = [];
  messages.forEach(msg => {
    const dateStr = msg.timestamp.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    const lastGroup = groupedMessages[groupedMessages.length - 1];
    if (lastGroup && lastGroup.date === dateStr) {
      lastGroup.messages.push(msg);
    } else {
      groupedMessages.push({ date: dateStr, messages: [msg] });
    }
  });

  return (
    <div className="bg-brand-gray border border-white/10 rounded-xl h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
            {conversation.clientName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="text-white font-medium">{conversation.clientName}</div>
            <div className="text-white/40 text-xs">{conversation.clientEmail}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-[11px] ${getStatusBadge(conversation.status)}`}>
            {getStatusText(conversation.status)}
          </span>
          <button
            onClick={exportChat}
            className="p-1.5 text-white/30 hover:text-white/60 transition-colors rounded-lg hover:bg-white/5"
            title="Exportar chat"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleInfo}
            className={`p-1.5 transition-colors rounded-lg ${showInfo ? 'text-brand-primary bg-brand-primary/10' : 'text-white/30 hover:text-white/60 hover:bg-white/5'}`}
            title="Info del cliente"
          >
            <Info className="w-4 h-4" />
          </button>
          {confirmDelete ? (
            <div className="flex items-center gap-1">
              <button
                onClick={onDelete}
                className="text-[11px] bg-red-500/15 text-red-400 px-2 py-1 rounded-md hover:bg-red-500/25 transition-colors"
              >
                Eliminar
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-[11px] bg-white/5 text-white/40 px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-1.5 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messagesLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageCircle className="w-10 h-10 text-white/10 mb-3" />
            <p className="text-white/30 text-sm">Sin mensajes en esta conversación</p>
          </div>
        ) : (
          <div className="space-y-4">
            {groupedMessages.map((group) => (
              <div key={group.date}>
                {/* Date separator */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-white/20 text-[11px] capitalize">{group.date}</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                {group.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2.5 mb-3 ${msg.sender === 'admin' ? 'justify-end' : ''}`}
                  >
                    {msg.sender === 'client' && (
                      <div className="w-7 h-7 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[75%] ${msg.sender === 'admin' ? 'text-right' : ''}`}>
                      <div className={`inline-block rounded-2xl px-3.5 py-2.5 text-sm text-left ${
                        msg.sender === 'admin'
                          ? 'bg-gradient-to-r from-brand-primary to-brand-secondary text-white rounded-br-md'
                          : 'bg-white/[0.06] text-white/90 border border-white/[0.06] rounded-bl-md'
                      }`}>
                        {msg.text}
                      </div>
                      <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'admin' ? 'justify-end' : ''}`}>
                        <Clock className="w-2.5 h-2.5 text-white/20" />
                        <span className="text-white/20 text-[10px]">{formatTime(msg.timestamp)}</span>
                      </div>
                    </div>
                    {msg.sender === 'admin' && (
                      <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-3 h-3 bg-brand-primary rounded-full" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Quick Replies + Input */}
      <div className="p-4 border-t border-white/[0.06]">
        <QuickReplies onSelect={(text) => {
          setResponseText(text);
          textareaRef.current?.focus();
        }} />
        <div className="flex gap-2 items-end mt-2">
          <textarea
            ref={textareaRef}
            value={responseText}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu respuesta... (Enter enviar, Shift+Enter nueva línea)"
            rows={1}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/25 focus:outline-none focus:border-brand-primary transition-colors resize-none max-h-[120px]"
          />
          <button
            onClick={handleSend}
            disabled={!responseText.trim() || sending}
            className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-4 py-2.5 rounded-xl hover:shadow-lg hover:shadow-brand-primary/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {sending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
