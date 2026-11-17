import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Video, User as UserIcon, Check, ExternalLink } from 'lucide-react';
import { User, NotificationItem } from '../../types';
import { Button } from '../ui/Button';

export interface TopBarProps {
  user: User;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onMarkAllRead: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  user,
  notifications,
  onMarkNotificationRead,
  onMarkAllRead,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Format breadcrumb title based on path
  const getPageTitle = (pathname: string) => {
    if (pathname === '/app') return 'Home Dashboard';
    if (pathname.includes('/find-your-four')) return 'Find Your Four';
    if (pathname.includes('/discover')) return 'Discover Network';
    if (pathname.includes('/circles')) return 'Builder Circles';
    if (pathname.includes('/missions')) return 'Build Missions';
    if (pathname.includes('/sessions')) return 'Live Sessions';
    if (pathname.includes('/messages')) return 'Messages & Conversations';
    if (pathname.includes('/opportunities')) return 'Opportunities';
    if (pathname.includes('/passport')) return 'Builder Passport';
    if (pathname.includes('/profile')) return 'Builder Profile & Goals';
    if (pathname.includes('/membership')) return 'Membership & AutoPay';
    if (pathname.includes('/notifications')) return 'Notification Engine';
    if (pathname.includes('/settings')) return 'Settings & Privacy';
    return 'Nightclub';
  };

  return (
    <header className="h-16 sticky top-0 z-20 bg-nc-surface-1/90 backdrop-blur-md border-b border-nc-border px-4 sm:px-8 flex items-center justify-between">
      {/* Page Breadcrumb / Title */}
      <div className="flex items-center gap-3">
        <h1 className="font-display text-base sm:text-lg font-semibold text-nc-text">
          {getPageTitle(location.pathname)}
        </h1>
        <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-nc-violet/60" />
        <span className="hidden sm:inline-block text-xs text-nc-text-muted">
          Execution Network
        </span>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Next Session Quick RSVP / Join indicator */}
        <Link
          to="/app/sessions"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nc-violet/10 border border-nc-violet/30 text-nc-violet-soft text-xs font-medium hover:bg-nc-violet/20 transition-colors"
        >
          <Video className="w-3.5 h-3.5 text-nc-violet" />
          <span>Next Session: Wed 9:30 PM</span>
        </Link>

        {/* Global Search Bar */}
        <Link
          to="/app/discover"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nc-surface-2 border border-nc-border text-xs text-nc-text-muted hover:text-nc-text hover:border-nc-violet/40 transition-colors"
          title="Search people, skills, missions"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search network...</span>
        </Link>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-nc-surface-2 hover:bg-nc-surface-3 text-nc-text-muted hover:text-nc-text border border-nc-border transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-nc-violet shadow-glow-subtle animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-nc-surface-1 border border-nc-border shadow-glass z-50 p-4">
              <div className="flex items-center justify-between pb-3 border-b border-nc-border">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-nc-text">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-nc-violet/20 text-nc-violet-soft font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllRead}
                    className="text-[11px] text-nc-violet hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-nc-border/60 max-h-72 overflow-y-auto py-1">
                {notifications.length === 0 ? (
                  <p className="text-xs text-nc-text-subtle py-4 text-center">No notifications right now.</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => onMarkNotificationRead(notif.id)}
                      className={`p-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                        notif.isRead ? 'opacity-70 hover:opacity-100' : 'bg-nc-surface-2/60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-nc-text">{notif.title}</span>
                        <span className="text-[10px] text-nc-text-subtle">{notif.createdAt}</span>
                      </div>
                      <p className="text-xs text-nc-text-muted mt-1">{notif.message}</p>
                      <Link
                        to={notif.deepLink}
                        onClick={() => setShowNotifications(false)}
                        className="inline-flex items-center gap-1 text-[11px] text-nc-violet-soft hover:underline mt-1.5"
                      >
                        <span>Open action</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t border-nc-border text-center">
                <Link
                  to="/app/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-nc-text-muted hover:text-nc-text font-medium"
                >
                  Notification Preferences & Tuning →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar & Link */}
        <Link to="/app/profile" className="flex items-center gap-2 group">
          <img
            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96'}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border border-nc-border group-hover:border-nc-violet transition-colors"
          />
          <div className="hidden xl:block text-left">
            <div className="text-xs font-medium text-nc-text group-hover:text-nc-violet-soft transition-colors">
              {user.name}
            </div>
            <div className="text-[10px] text-nc-text-subtle">
              ₹189/mo Active
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};
