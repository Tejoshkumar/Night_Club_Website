import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  Users,
  Send,
  Shield,
  Flag,
  Slash,
  Sparkles,
  Award,
  CheckCircle2,
  ExternalLink,
  Clock,
  ArrowLeft,
  Calendar,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { MatchCandidate } from '../../types';

export const MemberProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<MatchCandidate | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadMember() {
      const candidates = await apiClient.getFindYourFour();
      const found = candidates.find(c => c.id === id) || candidates[0];
      setCandidate(found);
    }
    loadMember();
  }, [id]);

  const handleBlock = async () => {
    if (!candidate) return;
    await apiClient.blockUser(candidate.id);
    setIsBlocked(true);
    setToastMsg(`${candidate.name} has been blocked. They will no longer appear in your network.`);
  };

  const handleReport = () => {
    setIsReportModalOpen(false);
    setToastMsg('Report submitted to Nightclub moderation team. Thank you for maintaining safety.');
  };

  if (!candidate) {
    return <div className="py-20 text-center text-nc-text-muted">Loading Builder Profile...</div>;
  }

  if (isBlocked) {
    return (
      <div className="py-16 text-center space-y-4 max-w-md mx-auto">
        <Slash className="w-10 h-10 text-nc-danger mx-auto" />
        <h2 className="font-display text-lg font-bold text-nc-text">Member Blocked</h2>
        <p className="text-xs text-nc-text-muted">You have blocked this member. All interactions have been severed.</p>
        <Link to="/app/discover">
          <Button variant="outline" size="sm">
            Return to Discover
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Toast */}
      {toastMsg && (
        <div className="p-4 rounded-xl bg-nc-surface-2 border border-nc-violet/40 text-nc-text text-xs flex items-center justify-between">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="text-nc-violet-soft font-bold">✕</button>
        </div>
      )}

      {/* Back button */}
      <div>
        <Link to="/app/find-your-four" className="inline-flex items-center gap-1.5 text-xs text-nc-text-muted hover:text-nc-text">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Squad Assembly
        </Link>
      </div>

      {/* Profile Header Card */}
      <Card variant="featured" className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-nc-border">
          <div className="flex items-center gap-4">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-nc-violet shadow-glow-subtle"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl sm:text-2xl font-bold text-nc-text">{candidate.name}</h1>
                <Badge variant="violet">{candidate.complementaryRole}</Badge>
              </div>
              <p className="text-xs sm:text-sm text-nc-text-subtle mt-1">{candidate.role}</p>
              <div className="flex items-center gap-3 text-xs text-nc-text-muted mt-2">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {candidate.availability}</span>
                <span>·</span>
                <span>{candidate.timezoneOverlap}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {candidate.status === 'available' ? (
              <Button
                variant="primary"
                size="md"
                leftIcon={<Send className="w-3.5 h-3.5" />}
                onClick={() => {
                  apiClient.requestIntroduction(candidate.id);
                  setCandidate({ ...candidate, status: 'requested' });
                  setToastMsg(`Introduction requested with ${candidate.name}.`);
                }}
              >
                Request Introduction
              </Button>
            ) : candidate.status === 'requested' ? (
              <Badge variant="warning" className="px-3 py-2 text-xs">
                Introduction Pending
              </Badge>
            ) : (
              <Link to={`/app/messages/${candidate.id}`}>
                <Button variant="primary" size="md" leftIcon={<Send className="w-3.5 h-3.5" />}>
                  Open In-App Chat
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Privacy Indicator */}
        <div className="p-3 rounded-xl bg-nc-surface-1 border border-nc-border text-[11px] text-nc-text-subtle flex items-center gap-2">
          <Shield className="w-4 h-4 text-nc-success shrink-0" />
          <span>
            <strong>Privacy Safeguard:</strong> Personal email and phone are shielded. In-app messaging is unlocked upon accepted introduction.
          </span>
        </div>
      </Card>

      {/* Profile Details Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Why this match */}
        <Card variant="solid" className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-nc-violet font-semibold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>Why This Match?</span>
          </div>
          <p className="text-xs text-nc-text-muted leading-relaxed">
            {candidate.whyThisMatch}
          </p>
        </Card>

        {/* Proposed Contribution */}
        <Card variant="solid" className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-nc-text font-semibold text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-nc-blue" />
            <span>Proposed Squad Contribution</span>
          </div>
          <p className="text-xs text-nc-text-muted leading-relaxed">
            {candidate.proposedContribution}
          </p>
        </Card>
      </div>

      {/* Skills Offered & Verified Sample Artifact */}
      <Card variant="solid" className="p-6 space-y-4">
        <h3 className="font-display font-semibold text-sm text-nc-text">Skills Offered & Proof of Work</h3>
        <div className="flex flex-wrap gap-2">
          {candidate.primarySkills.map(s => (
            <Badge key={s} variant="subtle" className="text-xs py-1 px-3">
              {s}
            </Badge>
          ))}
        </div>

        <div className="pt-3 border-t border-nc-border">
          <span className="text-xs font-semibold text-nc-text block mb-2">Sample Evidence:</span>
          <div className="p-3 rounded-lg bg-nc-surface-2 border border-nc-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-nc-violet" />
              <span className="font-medium text-nc-text">{candidate.sampleEvidence.title}</span>
              <span className="text-nc-text-subtle">({candidate.sampleEvidence.type})</span>
            </div>
            {candidate.sampleEvidence.url && (
              <a
                href={candidate.sampleEvidence.url}
                target="_blank"
                rel="noreferrer"
                className="text-nc-violet-soft hover:underline flex items-center gap-1 text-[11px]"
              >
                <span>Inspect</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </Card>

      {/* Safety Controls: Block & Report */}
      <div className="pt-4 flex items-center justify-between text-xs text-nc-text-subtle border-t border-nc-border">
        <span>Need assistance with this member?</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="hover:text-nc-warning flex items-center gap-1 transition-colors"
          >
            <Flag className="w-3.5 h-3.5" /> Report Member
          </button>
          <button
            onClick={handleBlock}
            className="hover:text-nc-danger flex items-center gap-1 transition-colors"
          >
            <Slash className="w-3.5 h-3.5" /> Block
          </button>
        </div>
      </div>

      {/* Report Modal */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title={`Report ${candidate.name}`}
        description="Help maintain a trusted, harassment-free environment for all builders."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-medium text-nc-text-muted">Reason for report</label>
            <select className="w-full px-3 py-2 bg-nc-surface-2 border border-nc-border rounded-lg text-xs text-nc-text">
              <option>Unsolicited spam or commercial promotion</option>
              <option>Inappropriate or disrespectful communication</option>
              <option>Misrepresenting skills or fabricated artifacts</option>
              <option>Other safety violation</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-nc-text-muted">Additional Details</label>
            <textarea
              rows={3}
              placeholder="Describe what occurred..."
              className="w-full px-3 py-2 bg-nc-surface-2 border border-nc-border rounded-lg text-xs text-nc-text"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-nc-border">
            <Button variant="ghost" size="sm" onClick={() => setIsReportModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={handleReport}>Submit Report</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
