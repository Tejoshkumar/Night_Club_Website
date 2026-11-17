import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MatchCandidate, User } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { UserCheck, Sparkles, Send, Eye } from 'lucide-react';

export interface OrbitalBuilderNetworkProps {
  focalUser: User;
  candidates: MatchCandidate[];
  onRequestIntro: (candidateId: string) => void;
  onViewProfile: (candidate: MatchCandidate) => void;
}

export const OrbitalBuilderNetwork: React.FC<OrbitalBuilderNetworkProps> = ({
  focalUser,
  candidates,
  onRequestIntro,
  onViewProfile,
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<MatchCandidate | null>(
    candidates[0] || null
  );

  // Radial positions for up to 4 nodes (angles in radians: -135deg, -45deg, 45deg, 135deg)
  const nodePositions = [
    { x: -160, y: -110, angle: 'top-left' },
    { x: 160, y: -110, angle: 'top-right' },
    { x: 160, y: 110, angle: 'bottom-right' },
    { x: -160, y: 110, angle: 'bottom-left' },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8">
      {/* Visual Canvas Area */}
      <div className="relative w-full h-[460px] flex items-center justify-center overflow-hidden rounded-2xl bg-nc-surface-1/60 border border-nc-border">
        {/* Subtle grid and orbital rings */}
        <div className="absolute inset-0 bg-[radial-gradient(#292A36_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        
        {/* Central Ambient Glow */}
        <div className="absolute w-72 h-72 rounded-full bg-nc-violet/10 blur-3xl pointer-events-none" />

        {/* Orbit Ellipses */}
        <div className="absolute w-[360px] h-[360px] rounded-full border border-nc-violet/20 pointer-events-none animate-pulse-subtle" />
        <div className="absolute w-[440px] h-[440px] rounded-full border border-nc-border/40 pointer-events-none" />

        {/* Dynamic SVG Connecting Lines between Central User and Orbit Nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="orbitLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9B7BFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8BB9FF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {candidates.slice(0, 4).map((_, index) => {
            const pos = nodePositions[index];
            const cx = '50%';
            const cy = '50%';
            return (
              <line
                key={`line-${index}`}
                x1={cx}
                y1={cy}
                x2={`calc(50% + ${pos.x}px)`}
                y2={`calc(50% + ${pos.y}px)`}
                stroke="url(#orbitLineGrad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
            );
          })}
        </svg>

        {/* Central Node: Focal Member */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative p-1 rounded-full bg-gradient-to-r from-nc-violet to-nc-blue shadow-glow-violet">
            <img
              src={focalUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128'}
              alt={focalUser.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-nc-bg"
            />
            <span className="absolute -bottom-2 -right-1 px-2 py-0.5 bg-nc-violet text-nc-bg text-[10px] font-bold rounded-full uppercase tracking-wider">
              YOU
            </span>
          </div>
          <div className="mt-3 text-center">
            <div className="text-xs font-semibold text-nc-text">{focalUser.name}</div>
            <div className="text-[11px] text-nc-text-muted">{focalUser.persona?.role || 'Focal Builder'}</div>
          </div>
        </div>

        {/* Orbiting Candidates (Up to 4) */}
        {candidates.slice(0, 4).map((cand, index) => {
          const pos = nodePositions[index];
          const isSelected = selectedCandidate?.id === cand.id;

          return (
            <motion.div
              key={cand.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 * index, duration: 0.4 }}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }}
              className="absolute z-20"
            >
              <div
                onClick={() => setSelectedCandidate(cand)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedCandidate(cand);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Select collaborator ${cand.name}, ${cand.role}`}
                className={`group flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'bg-nc-surface-2 border-2 border-nc-violet shadow-glow-subtle scale-105'
                    : 'bg-nc-surface-1/90 border border-nc-border hover:border-nc-violet/50 hover:scale-102'
                }`}
              >
                <div className="relative">
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-11 h-11 rounded-full object-cover border border-nc-border group-hover:border-nc-violet transition-colors"
                  />
                  {cand.status === 'requested' && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-nc-warning rounded-full border border-nc-bg" title="Intro Requested" />
                  )}
                  {cand.status === 'accepted' && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-nc-success rounded-full border border-nc-bg" title="Connected" />
                  )}
                </div>

                <div className="hidden sm:block text-left">
                  <div className="text-xs font-semibold text-nc-text flex items-center gap-1.5">
                    {cand.name}
                  </div>
                  <div className="text-[10px] text-nc-violet font-medium">{cand.complementaryRole}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Node Detailed Explanation Panel */}
      {selectedCandidate && (
        <motion.div
          key={selectedCandidate.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 rounded-2xl bg-nc-surface-2 border border-nc-border/80 shadow-glass"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-nc-border">
            <div className="flex items-center gap-4">
              <img
                src={selectedCandidate.avatar}
                alt={selectedCandidate.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-nc-violet/50"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-semibold text-nc-text">{selectedCandidate.name}</h3>
                  <Badge variant="violet">{selectedCandidate.complementaryRole}</Badge>
                </div>
                <p className="text-xs text-nc-text-muted mt-0.5">{selectedCandidate.role} · {selectedCandidate.availability}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Eye className="w-3.5 h-3.5" />}
                onClick={() => onViewProfile(selectedCandidate)}
              >
                View Profile
              </Button>
              {selectedCandidate.status === 'available' ? (
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Send className="w-3.5 h-3.5" />}
                  onClick={() => onRequestIntro(selectedCandidate.id)}
                >
                  Request Introduction
                </Button>
              ) : selectedCandidate.status === 'requested' ? (
                <Badge variant="warning" className="px-3 py-1.5">
                  Introduction Pending
                </Badge>
              ) : (
                <Badge variant="success" className="px-3 py-1.5 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" /> Connected
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 text-xs">
            {/* Why This Match */}
            <div className="p-4 rounded-xl bg-nc-surface-1 border border-nc-border">
              <div className="flex items-center gap-1.5 text-nc-violet font-semibold mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Why This Match?</span>
              </div>
              <p className="text-nc-text-muted leading-relaxed">
                {selectedCandidate.whyThisMatch}
              </p>
            </div>

            {/* Proposed Contribution to Squad */}
            <div className="p-4 rounded-xl bg-nc-surface-1 border border-nc-border">
              <div className="text-nc-text font-semibold mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-nc-blue" />
                <span>Proposed Squad Contribution</span>
              </div>
              <p className="text-nc-text-muted leading-relaxed">
                {selectedCandidate.proposedContribution}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
