import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { DesktopSidebar } from '../../components/navigation/DesktopSidebar';
import { TopBar } from '../../components/navigation/TopBar';
import { MobileBottomNav } from '../../components/navigation/MobileBottomNav';
import { Logo } from '../../components/ui/Logo';
import { apiClient } from '../../lib/api/client';
import { User, NotificationItem, Conversation } from '../../types';

export const AppLayout: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [u, n, c] = await Promise.all([
          apiClient.getCurrentUser(),
          apiClient.getNotifications(),
          apiClient.getConversations(),
        ]);
        setUser(u);
        setNotifications(n);
        setConversations(c);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleMarkRead = async (id: string) => {
    await apiClient.markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllRead = async () => {
    await apiClient.markAllNotificationsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadMsgCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const unreadNotifCount = notifications.filter(n => !n.isRead).length;

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-nc-bg text-nc-text">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-nc-violet border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-display text-sm tracking-wider uppercase text-nc-text-muted">Loading Nightclub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-nc-bg text-nc-text antialiased">
      {/* Desktop Fixed Left Sidebar */}
      <DesktopSidebar
        unreadMessagesCount={unreadMsgCount}
        unreadNotificationsCount={unreadNotifCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <TopBar
          user={user}
          notifications={notifications}
          onMarkNotificationRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Mobile Fixed Bottom Navigation */}
        <MobileBottomNav unreadMessagesCount={unreadMsgCount} />
      </div>
    </div>
  );
};
