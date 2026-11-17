import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  CheckSquare,
  Layers,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { BuildMission } from '../../types';

export const MissionsPage: React.FC = () => {
  const [missions, setMissions] = useState<BuildMission[]>([]);

  useEffect(() => {
    async function load() {
      const data = await apiClient.getMissions();
      setMissions(data);
    }
    load();
  }, []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-nc-border pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="violet">Collaborative Execution</Badge>
          <span className="text-xs text-nc-text-subtle">Real Milestones</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">
          Build Missions
        </h1>
        <p className="text-xs text-nc-text-muted max-w-2xl">
          Replace passive networking with concrete deliverables. Claim tasks, commit code or designs, submit verified artifacts, and earn Builder Passport proof.
        </p>
      </div>

      {/* Missions List */}
      <div className="space-y-6">
        {missions.map(mission => (
          <Card key={mission.id} variant="solid" className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-nc-border">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="font-display text-lg font-bold text-nc-text">{mission.title}</h2>
                  <Badge variant="blue">{mission.status}</Badge>
                </div>
                <p className="text-xs text-nc-text-muted mt-1">{mission.circleName}</p>
              </div>

              <Link to={`/app/missions/${mission.id}`}>
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Inspect Tasks & Artifacts
                </Button>
              </Link>
            </div>

            <p className="text-xs text-nc-text-muted leading-relaxed">
              {mission.description}
            </p>

            {/* Progress Bar & Skills */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-nc-text">Sprint Completion: {mission.progressPercent}%</span>
                <span className="text-nc-text-subtle">Target Date: {mission.targetCompletionDate}</span>
              </div>
              <div className="w-full h-2 bg-nc-surface-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-nc-blue to-nc-violet transition-all duration-500"
                  style={{ width: `${mission.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Required Skills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {mission.skills.map(s => (
                <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-nc-surface-2 border border-nc-border text-nc-text-subtle">
                  {s}
                </span>
              ))}
            </div>

            {/* Tasks Summary */}
            <div className="pt-2 border-t border-nc-border grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="text-nc-text-subtle flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-nc-success" />
                <span>{mission.tasks.filter(t => t.status === 'done').length} of {mission.tasks.length} tasks completed</span>
              </div>
              <div className="text-nc-text-subtle flex items-center gap-2 sm:justify-end">
                <Award className="w-4 h-4 text-nc-violet" />
                <span>{mission.artifacts.length} verified artifacts published</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
