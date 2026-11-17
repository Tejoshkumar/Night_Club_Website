import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Bell,
  Clock,
  Shield,
  Check,
  ExternalLink,
  Sliders,
  Moon,
  Sparkles,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { NotificationItem } from '../../types';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [matchAlerts, setMatchAlerts] = useState(true);
  const [sessionReminders, setSessionReminders] = useState(true);
  const [dmAlerts, setDmAlerts] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await apiClient.getNotifications();
      setNotifications(data);
    }
    load();
  }, []);

  const handleMarkRead = async (id: string) => {
    await apiClient.markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleSavePreferences = () => {
    setToastMsg('Notification preferences updated. Quiet hours & frequency limits active.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-nc-border pb-6 space-y-2">
        <Badge variant="violet">Personal Relevance Engine</Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">
          Notifications & Frequency Tuning
        </h1>
        <p className="text-xs text-nc-text-muted max-w-xl">
          We notify you only when there is a meaningful next action. Never generic "We miss you" guilt triggers.
        </p>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-4 rounded-xl bg-nc-success/15 border border-nc-success/40 text-nc-success text-xs flex items-center justify-between">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Preferences & Quiet Hours Card */}
      <Card variant="featured" className="p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-nc-border">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-nc-violet" />
            <h3 className="font-display font-semibold text-sm text-nc-text">Relevance & Quiet Hours Settings</h3>
          </div>
          <Badge variant="violet">Default Cap: 2 Non-essential Push / Day</Badge>
        </div>

        <div className="space-y-4 text-xs">
          {/* Quiet Hours */}
          <div className="p-4 rounded-xl bg-nc-surface-1 border border-nc-border flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-semibold text-nc-text flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-nc-violet" />
                <span>Respect Nocturnal Quiet Hours (11:00 PM – 08:00 AM IST)</span>
              </span>
              <p className="text-nc-text-muted text-[11px]">
                Holds non-critical notifications in a digest until daytime.
              </p>
            </div>
            <input
              type="checkbox"
              checked={quietHoursEnabled}
              onChange={(e) => setQuietHoursEnabled(e.target.checked)}
              className="w-4 h-4 rounded border-nc-border bg-nc-surface-2 accent-nc-violet"
            />
          </div>

          {/* Category Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-nc-surface-1 border border-nc-border flex items-center justify-between">
              <div>
                <span className="font-semibold text-nc-text block">Direct Messages</span>
                <span className="text-[10px] text-nc-text-subtle">High Priority</span>
              </div>
              <input
                type="checkbox"
                checked={dmAlerts}
                onChange={(e) => setDmAlerts(e.target.checked)}
                className="w-4 h-4 rounded accent-nc-violet"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-nc-surface-1 border border-nc-border flex items-center justify-between">
              <div>
                <span className="font-semibold text-nc-text block">Squad Matching</span>
                <span className="text-[10px] text-nc-text-subtle">Medium Priority</span>
              </div>
              <input
                type="checkbox"
                checked={matchAlerts}
                onChange={(e) => setMatchAlerts(e.target.checked)}
                className="w-4 h-4 rounded accent-nc-violet"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-nc-surface-1 border border-nc-border flex items-center justify-between">
              <div>
                <span className="font-semibold text-nc-text block">Session Reminders</span>
                <span className="text-[10px] text-nc-text-subtle">2h Prior Notice</span>
              </div>
              <input
                type="checkbox"
                checked={sessionReminders}
                onChange={(e) => setSessionReminders(e.target.checked)}
                className="w-4 h-4 rounded accent-nc-violet"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button size="sm" onClick={handleSavePreferences}>
            Save Preferences
          </Button>
        </div>
      </Card>

      {/* Notifications History List */}
      <Card variant="solid" className="p-6 space-y-4">
        <h3 className="font-display font-semibold text-sm text-nc-text flex items-center gap-2 pb-3 border-b border-nc-border">
          <Bell className="w-4 h-4 text-nc-violet" />
          <span>Notification Activity</span>
        </h3>

        <div className="space-y-3">
          {notifications.map(n => (
            <div
              key={n.id}
              onClick={() => handleMarkRead(n.id)}
              className={`p-4 rounded-xl border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer ${
                n.isRead ? 'bg-nc-surface-2/40 border-nc-border' : 'bg-nc-surface-2 border-nc-violet/40 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-nc-text">{n.title}</span>
                  <Badge variant={n.priority === 'high' ? 'violet' : n.priority === 'transactional' ? 'success' : 'subtle'} className="text-[9px] py-0">
                    {n.priority}
                  </Badge>
                  <span className="text-[10px] text-nc-text-subtle">{n.createdAt}</span>
                </div>
                <p className="text-xs text-nc-text-muted mt-1">{n.message}</p>
              </div>

              <Link to={n.deepLink} className="shrink-0">
                <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3 h-3" />}>
                  Open Action
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
