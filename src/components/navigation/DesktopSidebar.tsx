import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Home,
  Users,
  Compass,
  Layers,
  CheckSquare,
  Calendar,
  MessageSquare,
  Briefcase,
  Award,
  User,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { Logo } from '../ui/Logo';

export const DesktopSidebar: React.FC<{ unreadMessagesCount?: number; unreadNotificationsCount?: number }> = ({
  unreadMessagesCount = 1,
  unreadNotificationsCount = 2,
}) => {
  const primaryNav = [
    { name: 'Home', href: '/app', icon: Home },
    { name: 'Find Your Four', href: '/app/find-your-four', icon: Users, badge: '4' },
    { name: 'Discover', href: '/app/discover', icon: Compass },
    { name: 'Circles', href: '/app/circles', icon: Layers },
    { name: 'Build Missions', href: '/app/missions', icon: CheckSquare },
    { name: 'Sessions', href: '/app/sessions', icon: Calendar, badge: 'Live' },
    { name: 'Messages', href: '/app/messages', icon: MessageSquare, count: unreadMessagesCount },
    { name: 'Opportunities', href: '/app/opportunities', icon: Briefcase },
    { name: 'Builder Passport', href: '/app/passport', icon: Award },
  ];

  const secondaryNav = [
    { name: 'Profile & Persona', href: '/app/profile', icon: User },
    { name: 'Membership', href: '/app/membership', icon: CreditCard },
    { name: 'Notifications', href: '/app/notifications', icon: Bell, count: unreadNotificationsCount },
    { name: 'Settings', href: '/app/settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-nc-surface-1 border-r border-nc-border z-30 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-nc-border/70">
        <Link to="/app" className="flex items-center gap-2.5 group">
          <Logo size="md" className="group-hover:scale-105 transition-transform" />
          <div>
            <span className="font-display font-bold tracking-wider text-nc-text text-sm block">NIGHTCLUB</span>
            <span className="text-[10px] tracking-widest text-nc-text-subtle uppercase block font-medium">BUILD · CONNECT · GROW</span>
          </div>
        </Link>
      </div>

      {/* Nav List Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Primary Workspace Nav */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-nc-text-subtle uppercase">
            Workspace
          </div>
          <nav className="space-y-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === '/app'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group',
                      isActive
                        ? 'bg-nc-surface-2 text-nc-text border-l-2 border-nc-violet shadow-sm'
                        : 'text-nc-text-muted hover:text-nc-text hover:bg-nc-surface-2/60'
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-nc-text-muted group-hover:text-nc-violet transition-colors" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="violet" className="text-[10px] py-0 px-1.5 h-4">
                      {item.badge}
                    </Badge>
                  )}
                  {item.count && item.count > 0 ? (
                    <span className="w-4 h-4 rounded-full bg-nc-violet text-nc-bg text-[10px] font-bold flex items-center justify-center">
                      {item.count}
                    </span>
                  ) : null}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Secondary Account Nav */}
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-nc-text-subtle uppercase">
            Account & Preferences
          </div>
          <nav className="space-y-1">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group',
                      isActive
                        ? 'bg-nc-surface-2 text-nc-text border-l-2 border-nc-violet shadow-sm'
                        : 'text-nc-text-muted hover:text-nc-text hover:bg-nc-surface-2/60'
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-nc-text-muted group-hover:text-nc-violet transition-colors" />
                    <span>{item.name}</span>
                  </div>
                  {item.count && item.count > 0 ? (
                    <span className="w-4 h-4 rounded-full bg-nc-violet text-nc-bg text-[10px] font-bold flex items-center justify-center">
                      {item.count}
                    </span>
                  ) : null}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info & WhatsApp / Meet Badge */}
      <div className="p-4 border-t border-nc-border/70 space-y-2">
        <div className="p-3 rounded-lg bg-nc-surface-2/80 border border-nc-border">
          <div className="flex items-center justify-between text-xs font-semibold text-nc-text">
            <span>Monthly Builder</span>
            <span className="text-nc-violet">₹189/mo</span>
          </div>
          <p className="text-[11px] text-nc-text-subtle mt-0.5">8 Live Sessions · Meet Access</p>
        </div>

        <div className="flex items-center justify-between text-[11px] text-nc-text-subtle px-1">
          <Link to="/about" className="hover:text-nc-text transition-colors flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> Product Ethos
          </Link>
          <span>v1.0 Baseline</span>
        </div>
      </div>
    </aside>
  );
};
