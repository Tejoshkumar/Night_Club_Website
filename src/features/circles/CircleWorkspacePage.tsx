import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Layers,
  Users,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Shield,
  ArrowLeft,
  Award,
  Link as LinkIcon,
  Plus,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { BuilderCircle } from '../../types';

export const CircleWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [circle, setCircle] = useState<BuilderCircle | null>(null);
  const [acknowledgedMember, setAcknowledgedMember] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await apiClient.getCircleById(id || 'crc_01');
      if (data) setCircle(data);
    }
    load();
  }, [id]);

  if (!circle) {
    return <div className="py-20 text-center text-nc-text-muted">Loading Circle Workspace...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <Link to="/app/circles" className="inline-flex items-center gap-1.5 text-xs text-nc-text-muted hover:text-nc-text">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Circles
        </Link>
      </div>

      {/* Workspace Header */}
      <Card variant="featured" className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-nc-border">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">{circle.name}</h1>
              <Badge variant="violet">Team Workspace</Badge>
            </div>
            <p className="text-xs text-nc-text-muted mt-1">{circle.tagline}</p>
          </div>

          <Link to={`/app/missions/${circle.activeMissionId || 'msn_01'}`}>
            <Button size="md" rightIcon={<ExternalLink className="w-4 h-4" />}>
              Open Active Mission
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-nc-surface-1 border border-nc-border space-y-1">
            <span className="font-semibold text-nc-text uppercase tracking-wider text-[10px] text-nc-text-subtle">
              Objective
            </span>
            <p className="text-nc-text-muted leading-relaxed">{circle.objective}</p>
          </div>

          <div className="p-4 rounded-xl bg-nc-surface-1 border border-nc-border space-y-1">
            <span className="font-semibold text-nc-text uppercase tracking-wider text-[10px] text-nc-text-subtle">
              Working Agreement & Cadence
            </span>
            <p className="text-nc-text-muted leading-relaxed">{circle.workingAgreement}</p>
          </div>
        </div>
      </Card>

      {/* Shared Links & Repositories */}
      <Card variant="solid" className="p-6 space-y-4">
        <h3 className="font-display font-semibold text-sm text-nc-text flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-nc-violet" />
          <span>Shared Squad Repositories & Whiteboards</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {circle.sharedLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl bg-nc-surface-2 border border-nc-border hover:border-nc-violet/50 transition-colors flex items-center justify-between group"
            >
              <span className="font-medium text-nc-text group-hover:text-nc-violet transition-colors">
                {link.title}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-nc-text-subtle group-hover:text-nc-violet" />
            </a>
          ))}
        </div>
      </Card>

      {/* Members & Contribution Acknowledgment */}
      <Card variant="solid" className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-nc-border">
          <h3 className="font-display font-semibold text-sm text-nc-text">
            Squad Roster & Deliverable Ownership
          </h3>
          <span className="text-xs text-nc-text-subtle">{circle.members.length} Members</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {circle.members.map((m) => (
            <div key={m.userId} className="p-4 rounded-xl bg-nc-surface-2 border border-nc-border space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={m.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64'}
                    alt={m.name}
                    className="w-10 h-10 rounded-full object-cover border border-nc-border"
                  />
                  <div>
                    <span className="font-semibold text-xs text-nc-text block">{m.name}</span>
                    <span className="text-[11px] text-nc-violet">{m.role}</span>
                  </div>
                </div>
                <Link to={`/app/messages/${m.userId}`}>
                  <Button variant="ghost" size="sm">DM</Button>
                </Link>
              </div>

              <div className="p-2.5 rounded-lg bg-nc-surface-1 border border-nc-border text-xs text-nc-text-muted">
                <strong>Committed Deliverable:</strong> {m.deliverableOwnership}
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-nc-text-subtle">Joined {m.joinedAt}</span>
                <button
                  onClick={() => setAcknowledgedMember(m.name)}
                  className="text-nc-violet-soft hover:underline flex items-center gap-1 font-medium"
                >
                  <Award className="w-3.5 h-3.5" /> Acknowledge Work
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Acknowledged Notification Toast */}
      {acknowledgedMember && (
        <div className="p-4 rounded-xl bg-nc-success/15 border border-nc-success/40 text-nc-success text-xs flex items-center justify-between">
          <span>Peer contribution acknowledgment recorded for <strong>{acknowledgedMember}</strong> in their Builder Passport!</span>
          <button onClick={() => setAcknowledgedMember(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Milestones Timeline */}
      <Card variant="solid" className="p-6 space-y-4">
        <h3 className="font-display font-semibold text-sm text-nc-text">Circle Milestones</h3>
        <div className="space-y-3">
          {circle.milestones.map((ms) => (
            <div
              key={ms.id}
              className="p-3.5 rounded-xl bg-nc-surface-2 border border-nc-border flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                {ms.status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-nc-success" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-nc-text-subtle" />
                )}
                <div>
                  <span className={`font-semibold ${ms.status === 'completed' ? 'line-through text-nc-text-subtle' : 'text-nc-text'}`}>
                    {ms.title}
                  </span>
                  <span className="text-[11px] text-nc-text-subtle block">Owner: {ms.assignedToName} · Due {ms.dueDate}</span>
                </div>
              </div>

              <Badge variant={ms.status === 'completed' ? 'success' : 'subtle'}>
                {ms.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
