import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  CheckSquare,
  Layers,
  Calendar,
  ExternalLink,
  Shield,
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  Plus,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { BuildMission, MissionTask, MissionArtifact } from '../../types';

export const MissionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mission, setMission] = useState<BuildMission | null>(null);
  const [isArtifactModalOpen, setIsArtifactModalOpen] = useState(false);
  const [artifactTitle, setArtifactTitle] = useState('');
  const [artifactUrl, setArtifactUrl] = useState('');
  const [artifactType, setArtifactType] = useState<MissionArtifact['type']>('code');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await apiClient.getMissionById(id || 'msn_01');
      if (data) setMission(data);
    }
    load();
  }, [id]);

  const handleToggleTask = async (taskId: string, currentStatus: MissionTask['status']) => {
    if (!mission) return;
    const nextStatus: MissionTask['status'] = currentStatus === 'done' ? 'todo' : 'done';
    const updated = await apiClient.updateTaskStatus(mission.id, taskId, nextStatus);
    setMission(updated);
    setToastMsg(`Task updated to ${nextStatus}.`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAddArtifact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mission || !artifactTitle || !artifactUrl) return;

    const newArt: MissionArtifact = {
      id: `art_${Date.now()}`,
      title: artifactTitle,
      url: artifactUrl,
      type: artifactType,
      submittedBy: 'Karthik Varma',
      verified: true,
      verificationLevel: 'artifact_verified',
    };

    setMission({
      ...mission,
      artifacts: [...mission.artifacts, newArt],
    });

    setIsArtifactModalOpen(false);
    setArtifactTitle('');
    setArtifactUrl('');
    setToastMsg('Artifact submitted and verified into Builder Passport!');
    setTimeout(() => setToastMsg(null), 4000);
  };

  if (!mission) {
    return <div className="py-20 text-center text-nc-text-muted">Loading Mission Details...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <Link to="/app/missions" className="inline-flex items-center gap-1.5 text-xs text-nc-text-muted hover:text-nc-text">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Missions
        </Link>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-4 rounded-xl bg-nc-success/15 border border-nc-success/40 text-nc-success text-xs flex items-center justify-between">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Mission Header */}
      <Card variant="featured" className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-nc-border">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">{mission.title}</h1>
              <Badge variant="blue">{mission.status}</Badge>
            </div>
            <p className="text-xs text-nc-text-muted mt-1">{mission.circleName}</p>
          </div>

          <Button
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={() => setIsArtifactModalOpen(true)}
          >
            Submit Artifact
          </Button>
        </div>

        <p className="text-xs sm:text-sm text-nc-text-muted leading-relaxed">
          {mission.description}
        </p>

        {/* Progress & Target */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-nc-text">Progress: {mission.progressPercent}%</span>
            <span className="text-nc-text-subtle">Target Completion: {mission.targetCompletionDate}</span>
          </div>
          <div className="w-full h-2.5 bg-nc-surface-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-nc-blue to-nc-violet transition-all duration-500"
              style={{ width: `${mission.progressPercent}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Tasks Breakdown */}
      <Card variant="solid" className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-nc-border">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-nc-violet" />
            <h3 className="font-display font-semibold text-sm text-nc-text">Sprint Tasks & Ownership</h3>
          </div>
          <span className="text-xs text-nc-text-subtle">Click check to toggle completion</span>
        </div>

        <div className="space-y-3">
          {mission.tasks.map(task => (
            <div
              key={task.id}
              onClick={() => handleToggleTask(task.id, task.status)}
              className="p-3.5 rounded-xl bg-nc-surface-2 border border-nc-border hover:border-nc-violet/50 transition-colors flex items-center justify-between cursor-pointer text-xs"
            >
              <div className="flex items-center gap-3">
                {task.status === 'done' ? (
                  <CheckCircle2 className="w-4 h-4 text-nc-success shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-nc-text-subtle shrink-0" />
                )}
                <div>
                  <span className={`font-medium ${task.status === 'done' ? 'line-through text-nc-text-subtle' : 'text-nc-text'}`}>
                    {task.title}
                  </span>
                  {task.evidenceUrl && (
                    <span className="text-[10px] text-nc-violet-soft block">
                      PR Evidence Attached
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-nc-text-subtle">{task.assigneeName}</span>
                <Badge variant={task.status === 'done' ? 'success' : 'subtle'} className="capitalize">
                  {task.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Submitted Artifacts & Verification */}
      <Card variant="solid" className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-nc-border">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-nc-violet" />
            <h3 className="font-display font-semibold text-sm text-nc-text">Verifiable Artifacts</h3>
          </div>
          <Badge variant="violet">{mission.artifacts.length} Published</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {mission.artifacts.map(art => (
            <div key={art.id} className="p-4 rounded-xl bg-nc-surface-2 border border-nc-border space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-nc-text">{art.title}</h4>
                  <span className="text-[10px] text-nc-text-subtle">Submitted by {art.submittedBy}</span>
                </div>
                <Badge variant={art.verificationLevel === 'artifact_verified' ? 'success' : 'blue'}>
                  {art.verificationLevel.replace('_', ' ')}
                </Badge>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-nc-border">
                <span className="text-[11px] text-nc-text-muted capitalize">Type: {art.type}</span>
                <a
                  href={art.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-nc-violet-soft hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>View Proof</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Submit Artifact Modal */}
      <Modal
        isOpen={isArtifactModalOpen}
        onClose={() => setIsArtifactModalOpen(false)}
        title="Submit Deliverable Artifact"
        description="Attach verified pull requests, Figma files, or live demos to update your squad mission and Builder Passport."
      >
        <form onSubmit={handleAddArtifact} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-nc-text-muted">Artifact Title</label>
            <input
              type="text"
              required
              value={artifactTitle}
              onChange={(e) => setArtifactTitle(e.target.value)}
              placeholder="e.g. Pull Request #15: Audio Resampler Implementation"
              className="w-full px-3 py-2 bg-nc-surface-2 border border-nc-border rounded-lg text-xs text-nc-text focus:outline-none focus:border-nc-violet"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-nc-text-muted">Artifact Link (GitHub / Figma / Demo)</label>
            <input
              type="url"
              required
              value={artifactUrl}
              onChange={(e) => setArtifactUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 bg-nc-surface-2 border border-nc-border rounded-lg text-xs text-nc-text focus:outline-none focus:border-nc-violet"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-nc-text-muted">Artifact Type</label>
            <select
              value={artifactType}
              onChange={(e) => setArtifactType(e.target.value as any)}
              className="w-full px-3 py-2 bg-nc-surface-2 border border-nc-border rounded-lg text-xs text-nc-text focus:outline-none focus:border-nc-violet"
            >
              <option value="code">Code Repository / Pull Request</option>
              <option value="design">Figma Specification</option>
              <option value="demo">Live Interactive Demo</option>
              <option value="document">Technical RFC / Document</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-nc-border">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsArtifactModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Submit & Verify
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
