import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Layers, MessageSquare, User } from 'lucide-react';
import { cn } from '../../lib/utils';

export const MobileBottomNav: React.FC<{ unreadMessagesCount?: number }> = ({
  unreadMessagesCount = 0,
}) => {
  const navItems = [
    { name: 'Home', href: '/app', icon: Home },
    { name: 'Discover', href: '/app/discover', icon: Compass },
    { name: 'Build', href: '/app/missions', icon: Layers },
    { name: 'Inbox', href: '/app/messages', icon: MessageSquare, count: unreadMessagesCount },
    { name: 'Profile', href: '/app/profile', icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-nc-surface-1/95 backdrop-blur-lg border-t border-nc-border px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/app'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center w-14 h-full relative transition-colors',
                  isActive ? 'text-nc-violet' : 'text-nc-text-muted hover:text-nc-text'
                )
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.count && item.count > 0 ? (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-nc-violet text-nc-bg text-[9px] font-bold flex items-center justify-center">
                    {item.count}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium mt-1">{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
