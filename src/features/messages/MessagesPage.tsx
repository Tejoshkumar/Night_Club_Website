import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Send,
  Shield,
  MessageSquare,
  Sparkles,
  CheckCheck,
  Check,
  Slash,
  Flag,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { Conversation, Message, User } from '../../types';

export const MessagesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadConversations() {
      const [u, convs] = await Promise.all([
        apiClient.getCurrentUser(),
        apiClient.getConversations(),
      ]);
      setCurrentUser(u);
      setConversations(convs);

      const targetId = id || (convs[0]?.id ?? null);
      if (targetId) {
        setActiveConversationId(targetId);
        const msgs = await apiClient.getMessages(targetId);
        setMessages(msgs);
      }
    }
    loadConversations();
  }, [id]);

  const handleSelectConversation = async (convId: string) => {
    setActiveConversationId(convId);
    navigate(`/app/messages/${convId}`);
    const msgs = await apiClient.getMessages(convId);
    setMessages(msgs);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversationId) return;

    setIsSending(true);
    try {
      const msg = await apiClient.sendMessage(activeConversationId, newMessage.trim());
      setMessages(prev => [...prev, msg]);
      setNewMessage('');
    } finally {
      setIsSending(false);
    }
  };

  const activeConv = conversations.find(c => c.id === activeConversationId);

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col md:flex-row rounded-2xl bg-nc-surface-1 border border-nc-border overflow-hidden">
      {/* Left List of Conversations */}
      <div className={`w-full md:w-80 border-r border-nc-border flex flex-col ${id && 'hidden md:flex'}`}>
        <div className="p-4 border-b border-nc-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-nc-violet" />
            <h2 className="font-display font-semibold text-sm text-nc-text">Direct Messages</h2>
          </div>
          <span className="text-[10px] text-nc-text-subtle font-mono">{conversations.length} Threads</span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-nc-border/60">
          {conversations.length === 0 ? (
            <div className="p-6 text-center text-xs text-nc-text-muted">
              No active conversations yet. Introductions accepted via Find Your Four will appear here.
            </div>
          ) : (
            conversations.map(conv => {
              const isSelected = conv.id === activeConversationId;
              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected ? 'bg-nc-surface-2' : 'hover:bg-nc-surface-2/50'
                  }`}
                >
                  <img
                    src={conv.participant.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96'}
                    alt={conv.participant.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-nc-border"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-nc-text truncate">
                        {conv.participant.name}
                      </span>
                      <span className="text-[10px] text-nc-text-subtle shrink-0">
                        {conv.updatedAt}
                      </span>
                    </div>
                    <p className="text-[11px] text-nc-text-muted truncate mt-0.5">
                      {conv.lastMessage?.content || 'No messages yet'}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right Chat Thread & Composer */}
      {activeConv ? (
        <div className="flex-1 flex flex-col min-w-0 bg-nc-bg/40">
          {/* Thread Header */}
          <div className="p-4 border-b border-nc-border bg-nc-surface-1/90 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeConv.participant.avatar}
                alt={activeConv.participant.name}
                className="w-9 h-9 rounded-full object-cover border border-nc-border"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-nc-text">{activeConv.participant.name}</span>
                  <Badge variant="violet" className="text-[9px] py-0">{activeConv.participant.headline || 'Builder'}</Badge>
                </div>
                <div className="text-[10px] text-nc-text-subtle flex items-center gap-1.5 mt-0.5">
                  <Shield className="w-3 h-3 text-nc-success" /> Personal contact concealed · End-to-end authorized
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-nc-text-subtle">
              <button
                onClick={() => apiClient.blockUser(activeConv.id)}
                className="p-1.5 hover:text-nc-danger rounded hover:bg-nc-surface-2 transition-colors"
                title="Block member"
              >
                <Slash className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Context Banner */}
          <div className="px-4 py-2 bg-nc-surface-2/60 border-b border-nc-border/80 text-[11px] text-nc-text-muted flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-nc-violet" />
              <span>Discuss milestones, deliverable requirements, and meeting cadence.</span>
            </span>
          </div>

          {/* Messages Bubble History */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((m) => {
              const isMe = m.senderId === currentUser?.id;
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1 text-[10px] text-nc-text-subtle mb-1">
                    <span>{isMe ? 'You' : m.senderName}</span>
                    <span>·</span>
                    <span>{m.createdAt}</span>
                  </div>
                  <div
                    className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      isMe
                        ? 'bg-nc-violet text-nc-bg font-medium rounded-br-sm'
                        : 'bg-nc-surface-2 text-nc-text rounded-bl-sm border border-nc-border'
                    }`}
                  >
                    {m.content}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-nc-text-subtle">
                    {isMe && (m.isRead ? <CheckCheck className="w-3 h-3 text-nc-violet" /> : <Check className="w-3 h-3" />)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Composer */}
          <form onSubmit={handleSendMessage} className="p-3 bg-nc-surface-1 border-t border-nc-border flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message ${activeConv.participant.name.split(' ')[0]}...`}
              className="flex-1 px-3.5 py-2.5 bg-nc-surface-2 border border-nc-border rounded-xl text-xs text-nc-text placeholder:text-nc-text-subtle focus:outline-none focus:border-nc-violet"
            />
            <Button
              type="submit"
              size="sm"
              disabled={!newMessage.trim()}
              isLoading={isSending}
              rightIcon={<Send className="w-3.5 h-3.5" />}
            >
              Send
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center p-8 text-center text-xs text-nc-text-muted">
          Select a conversation from the sidebar to start collaborating.
        </div>
      )}
    </div>
  );
};
