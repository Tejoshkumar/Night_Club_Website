import React, { useState, useEffect } from 'react';
import { OrbitalBuilderNetwork } from '../../components/effects/OrbitalBuilderNetwork';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  Users,
  Sparkles,
  Send,
  Eye,
  CheckCircle2,
  Bookmark,
  X,
  LayoutGrid,
  Radio,
  Clock,
  Shield,
  Layers,
  ExternalLink,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { MatchCandidate, User } from '../../types';

export const FindYourFourPage: React.FC = () => {
  const [focalUser, setFocalUser] = useState<User | null>(null);
  const [candidates, setCandidates] = useState<MatchCandidate[]>([]);
  const [viewMode, setViewMode] = useState<'orbital' | 'grid'>('orbital');
  const [selectedCandidate, setSelectedCandidate] = useState<MatchCandidate | null>(null);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [customNote, setCustomNote] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const [u, c] = await Promise.all([
        apiClient.getCurrentUser(),
        apiClient.getFindYourFour(),
      ]);
      setFocalUser(u);
      setCandidates(c);
    }
    loadData();
  }, []);

  const handleOpenIntroModal = (candidate: MatchCandidate) => {
    setSelectedCandidate(candidate);
    setCustomNote(`Hey ${candidate.name.split(' ')[0]}, I saw your experience in ${candidate.role} and would love to collaborate on a builder squad.`);
    setIsIntroModalOpen(true);
  };

  const handleSendIntro = async () => {
    if (!selectedCandidate) return;
    setIsSending(true);
    try {
      await apiClient.requestIntroduction(selectedCandidate.id, customNote);
      setCandidates(prev =>
        prev.map(c => (c.id === selectedCandidate.id ? { ...c, status: 'requested' } : c))
      );
      setIsIntroModalOpen(false);
      setSuccessToast(`Introduction request dispatched to ${selectedCandidate.name}.`);
      setTimeout(() => setSuccessToast(null), 4000);
    } finally {
      setIsSending(false);
    }
  };

  const handleDismiss = async (id: string) => {
    await apiClient.dismissCandidate(id);
    setCandidates(prev => prev.filter(c => c.id !== id));
  };

  const handleSave = async (id: string) => {
    await apiClient.saveCandidate(id);
    setCandidates(prev =>
      prev.map(c => (c.id === id ? { ...c, status: 'saved' } : c))
    );
  };

  if (!focalUser) {
    return <div className="py-20 text-center text-nc-text-muted">Loading Find Your Four...</div>;
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header with Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-nc-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="violet">Builder Network</Badge>
            <span className="text-xs text-nc-text-subtle">Reciprocal Matching V1</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">
            Find Your Four: 5-Person Squad Assembly
          </h1>
          <p className="text-xs text-nc-text-muted mt-1 max-w-2xl leading-relaxed">
            Form high-velocity squads with complementary disciplines. Each recommendation is backed by transparent explanations and individual opt-in consent.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-nc-surface-2 p-1 rounded-xl border border-nc-border self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setViewMode('orbital')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'orbital'
                ? 'bg-nc-surface-1 text-nc-text shadow-sm border border-nc-violet/30'
                : 'text-nc-text-muted hover:text-nc-text'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Orbital View</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-nc-surface-1 text-nc-text shadow-sm border border-nc-violet/30'
                : 'text-nc-text-muted hover:text-nc-text'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Card List</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successToast && (
        <div className="p-4 rounded-xl bg-nc-success/15 border border-nc-success/40 text-nc-success text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-nc-success hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Squad Skill Coverage Summary Card */}
      <Card variant="featured" className="p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-semibold text-sm text-nc-text flex items-center gap-2">
              <Layers className="w-4 h-4 text-nc-violet" />
              <span>Squad Chemistry Coverage: 4 Complementary Roles</span>
            </h3>
            <p className="text-xs text-nc-text-muted mt-1">
              Architecture covers: Fullstack UI, Design Systems, Machine Learning Models, and Cloud Systems Infra.
            </p>
          </div>
          <Badge variant="success" className="px-3 py-1 text-xs">
            Balanced Cross-Discipline
          </Badge>
        </div>
      </Card>

      {/* Orbital Visualization Mode */}
      {viewMode === 'orbital' ? (
        <OrbitalBuilderNetwork
          focalUser={focalUser}
          candidates={candidates}
          onRequestIntro={(id) => {
            const cand = candidates.find(c => c.id === id);
            if (cand) handleOpenIntroModal(cand);
          }}
          onViewProfile={(cand) => setSelectedCandidate(cand)}
        />
      ) : (
        /* Accessible Card Grid Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map((cand) => (
            <Card key={cand.id} variant="solid" className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-nc-border"
                  />
                  <div>
                    <h3 className="font-display font-semibold text-sm text-nc-text">{cand.name}</h3>
                    <p className="text-xs text-nc-text-subtle">{cand.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="violet" className="text-[10px]">{cand.complementaryRole}</Badge>
                      <span className="text-[10px] text-nc-text-subtle flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {cand.availability}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSave(cand.id)}
                    className="p-1.5 text-nc-text-subtle hover:text-nc-text rounded-lg hover:bg-nc-surface-2"
                    title="Save candidate"
                  >
                    <Bookmark className={`w-4 h-4 ${cand.status === 'saved' ? 'fill-nc-violet text-nc-violet' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleDismiss(cand.id)}
                    className="p-1.5 text-nc-text-subtle hover:text-nc-danger rounded-lg hover:bg-nc-surface-2"
                    title="Dismiss"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Grounded Match Explanation */}
              <div className="p-3.5 rounded-xl bg-nc-surface-2 border border-nc-border text-xs space-y-1.5">
                <span className="text-nc-violet font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Why this match?
                </span>
                <p className="text-nc-text-muted leading-relaxed">{cand.whyThisMatch}</p>
              </div>

              {/* Proposed Squad Contribution */}
              <div className="p-3.5 rounded-xl bg-nc-surface-2 border border-nc-border text-xs space-y-1.5">
                <span className="text-nc-text font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-nc-blue" /> Proposed Contribution:
                </span>
                <p className="text-nc-text-muted leading-relaxed">{cand.proposedContribution}</p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-nc-border">
                {cand.sampleEvidence.url && (
                  <a
                    href={cand.sampleEvidence.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-nc-text-subtle hover:text-nc-violet flex items-center gap-1"
                  >
                    <span>Sample Artifact</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <div className="ml-auto">
                  {cand.status === 'available' ? (
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<Send className="w-3.5 h-3.5" />}
                      onClick={() => handleOpenIntroModal(cand)}
                    >
                      Request Introduction
                    </Button>
                  ) : cand.status === 'requested' ? (
                    <Badge variant="warning" className="px-3 py-1.5">
                      Introduction Pending
                    </Badge>
                  ) : (
                    <Badge variant="success" className="px-3 py-1.5">
                      ✓ Connected
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Introduction Request Modal Dialog */}
      <Modal
        isOpen={isIntroModalOpen}
        onClose={() => setIsIntroModalOpen(false)}
        title={selectedCandidate ? `Request Introduction with ${selectedCandidate.name}` : 'Request Introduction'}
        description="Introductions in Nightclub are mutual and privacy-safe. Personal contact details remain hidden."
      >
        {selectedCandidate && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-nc-surface-2 border border-nc-border">
              <img
                src={selectedCandidate.avatar}
                alt={selectedCandidate.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-xs font-semibold text-nc-text">{selectedCandidate.name}</div>
                <div className="text-[11px] text-nc-violet">{selectedCandidate.complementaryRole} · {selectedCandidate.role}</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-nc-text-muted">
                Personalized Context / Note (Optional)
              </label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-nc-surface-2 border border-nc-border rounded-lg text-xs text-nc-text focus:outline-none focus:border-nc-violet"
                placeholder="Mention the specific project or skills you would like to collaborate on..."
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-nc-border">
              <Button variant="ghost" size="sm" onClick={() => setIsIntroModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                isLoading={isSending}
                rightIcon={<Send className="w-3.5 h-3.5" />}
                onClick={handleSendIntro}
              >
                Send Request
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
