import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Layers,
  Users,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { BuilderCircle } from '../../types';

export const CirclesPage: React.FC = () => {
  const [circles, setCircles] = useState<BuilderCircle[]>([]);

  useEffect(() => {
    async function load() {
      const data = await apiClient.getCircles();
      setCircles(data);
    }
    load();
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-nc-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="violet">Team Workspaces</Badge>
            <span className="text-xs text-nc-text-subtle">2-5 Member Squads</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">
            Builder Circles
          </h1>
          <p className="text-xs text-nc-text-muted mt-1 max-w-xl">
            Dedicated team spaces where complementary squads align on objectives, commit to milestones, and acknowledge peer contributions.
          </p>
        </div>

        <Link to="/app/find-your-four">
          <Button variant="outline" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
            Assemble New Squad
          </Button>
        </Link>
      </div>

      {/* Circle Cards List */}
      <div className="space-y-6">
        {circles.map(circle => (
          <Card key={circle.id} variant="solid" className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-nc-border">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="font-display text-lg font-bold text-nc-text">{circle.name}</h2>
                  <Badge variant="violet">Active Circle</Badge>
                </div>
                <p className="text-xs text-nc-text-muted mt-1">{circle.tagline}</p>
              </div>

              <Link to={`/app/circles/${circle.id}`}>
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Enter Circle Workspace
                </Button>
              </Link>
            </div>

            {/* Objective & Cadence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-nc-surface-2 border border-nc-border">
                <span className="text-nc-text-subtle block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                  Shared Objective
                </span>
                <p className="text-nc-text leading-relaxed">{circle.objective}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-nc-surface-2 border border-nc-border">
                <span className="text-nc-text-subtle block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                  Sync Cadence & Agreement
                </span>
                <p className="text-nc-text leading-relaxed">{circle.cadence}</p>
              </div>
            </div>

            {/* Squad Members */}
            <div>
              <span className="text-xs font-semibold text-nc-text block mb-3">
                Squad Members ({circle.members.length}):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {circle.members.map((m) => (
                  <div key={m.userId} className="p-3 rounded-lg bg-nc-surface-2 border border-nc-border flex items-start gap-2.5">
                    <img
                      src={m.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64'}
                      alt={m.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="font-semibold text-nc-text block truncate">{m.name}</span>
                      <span className="text-[10px] text-nc-violet block">{m.role}</span>
                      <span className="text-[10px] text-nc-text-subtle block truncate mt-1">
                        Owns: {m.deliverableOwnership}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones Preview */}
            <div className="pt-2 border-t border-nc-border flex items-center justify-between text-xs text-nc-text-subtle">
              <span>Current Sprint: <strong>{circle.currentMilestone}</strong></span>
              <Link to={`/app/circles/${circle.id}`} className="text-nc-violet-soft hover:underline flex items-center gap-1 text-[11px]">
                <span>Manage Milestones & Tasks</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
