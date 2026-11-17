import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Calendar,
  Clock,
  Video,
  FileText,
  Download,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Lock,
  Sparkles,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { Session, User } from '../../types';

export const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const [u, s] = await Promise.all([
        apiClient.getCurrentUser(),
        apiClient.getSessions(),
      ]);
      setCurrentUser(u);
      setSessions(s);
    }
    load();
  }, []);

  const handleToggleRsvp = async (sessionId: string) => {
    const updated = await apiClient.toggleSessionRsvp(sessionId);
    setSessions(prev => prev.map(s => s.id === sessionId ? updated : s));
    setToastMsg(updated.rsvpStatus === 'attending' ? 'RSVP confirmed! Added to your schedule.' : 'RSVP updated.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-nc-border pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="violet">Live Learning & Co-building</Badge>
          <span className="text-xs text-nc-text-subtle">8 Monthly Included Sessions</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">
          Sessions Hub & Resource Archive
        </h1>
        <p className="text-xs text-nc-text-muted max-w-2xl">
          Alternate-night practical build workshops, code teardowns, and architecture reviews led by Nitish and guest mentors. Every session concludes with a verifiable next build step.
        </p>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-4 rounded-xl bg-nc-success/15 border border-nc-success/40 text-nc-success text-xs flex items-center justify-between">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Session Schedule Cards */}
      <div className="space-y-6">
        {sessions.map(session => {
          const isAttending = session.rsvpStatus === 'attending';
          return (
            <Card key={session.id} variant="solid" className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-nc-border">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-nc-violet uppercase tracking-wider">{session.sessionType}</span>
                    <span className="text-nc-border">·</span>
                    <span className="text-xs text-nc-text-subtle font-medium">8/Mo Included</span>
                  </div>
                  <h2 className="font-display text-lg font-bold text-nc-text mt-1">{session.title}</h2>
                  <p className="text-xs text-nc-text-muted mt-1">Host: {session.host}</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    variant={isAttending ? 'outline' : 'secondary'}
                    size="sm"
                    onClick={() => handleToggleRsvp(session.id)}
                  >
                    {isAttending ? '✓ Attending' : 'RSVP for Session'}
                  </Button>

                  {/* Google Meet Authorized Link Gate */}
                  {currentUser?.isPaidMember && session.googleMeetUrl ? (
                    <a href={session.googleMeetUrl} target="_blank" rel="noreferrer">
                      <Button variant="primary" size="sm" leftIcon={<Video className="w-3.5 h-3.5" />}>
                        Join Google Meet
                      </Button>
                    </a>
                  ) : (
                    <Button variant="outline" size="sm" disabled leftIcon={<Lock className="w-3.5 h-3.5" />}>
                      Meet Locked (Members Only)
                    </Button>
                  )}
                </div>
              </div>

              {/* Timing & Description */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-nc-surface-2 border border-nc-border space-y-1">
                  <div className="flex items-center gap-1.5 text-nc-text-subtle">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Date</span>
                  </div>
                  <span className="font-semibold text-nc-text">{session.date}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-nc-surface-2 border border-nc-border space-y-1">
                  <div className="flex items-center gap-1.5 text-nc-text-subtle">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Time</span>
                  </div>
                  <span className="font-semibold text-nc-text">{session.timeIST}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-nc-surface-2 border border-nc-border space-y-1">
                  <div className="flex items-center gap-1.5 text-nc-success">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="font-semibold uppercase tracking-wider text-[10px]">Access State</span>
                  </div>
                  <span className="font-semibold text-nc-text">₹189/mo Active Pass</span>
                </div>
              </div>

              <p className="text-xs text-nc-text-muted leading-relaxed">
                {session.description}
              </p>

              {/* Actionable Next Build Step */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-nc-surface-2 to-nc-surface-1 border border-nc-violet/30 text-xs space-y-1">
                <span className="text-nc-violet font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Post-Session Build Step:
                </span>
                <p className="text-nc-text-muted leading-relaxed">{session.nextBuildStep}</p>
              </div>

              {/* Session Resources & Files */}
              {session.resources.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-nc-border">
                  <span className="text-xs font-semibold text-nc-text block">Session Code & Resources:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    {session.resources.map(res => (
                      <div
                        key={res.id}
                        className="p-3 rounded-lg bg-nc-surface-2 border border-nc-border flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-3.5 h-3.5 text-nc-violet shrink-0" />
                          <span className="truncate text-nc-text font-medium">{res.title}</span>
                        </div>
                        <button
                          onClick={() => setToastMsg(`Downloading ${res.title}...`)}
                          className="p-1 text-nc-text-subtle hover:text-nc-violet"
                          title="Download resource"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
