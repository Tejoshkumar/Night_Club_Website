import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Share2,
  ShieldCheck,
  Sparkles,
  GitPullRequest,
  Users,
  Copy,
  Check,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { BuilderPassportData, User } from '../../types';

export const BuilderPassportPage: React.FC = () => {
  const [passport, setPassport] = useState<BuilderPassportData | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      const [u, p] = await Promise.all([
        apiClient.getCurrentUser(),
        apiClient.getPassport(),
      ]);
      setUser(u);
      setPassport(p);
    }
    load();
  }, []);

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(`https://nightclub.build/passport/karthik-varma`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!passport || !user) {
    return <div className="py-20 text-center text-nc-text-muted">Loading Builder Passport...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-nc-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="violet">Verifiable Proof of Work</Badge>
            <span className="text-xs text-nc-text-subtle">Cryptographically Referenced</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">
            Builder Passport
          </h1>
          <p className="text-xs text-nc-text-muted mt-1 max-w-xl">
            A living proof-of-work portfolio recording shipped missions, merged artifacts, and consensual peer acknowledgments.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={copied ? <Check className="w-3.5 h-3.5 text-nc-success" /> : <Copy className="w-3.5 h-3.5" />}
          onClick={handleCopyShareLink}
        >
          {copied ? 'Link Copied!' : 'Share Public Passport'}
        </Button>
      </div>

      {/* Profile Overview Card */}
      <Card variant="featured" className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-nc-border">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-nc-violet shadow-glow-subtle"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold text-nc-text">{user.name}</h2>
                <Badge variant="violet">Verified Builder</Badge>
              </div>
              <p className="text-xs text-nc-text-subtle mt-0.5">{passport.headline}</p>
              <span className="text-[11px] text-nc-text-muted block mt-1">Member Since {user.memberSince}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full sm:w-auto text-center">
            <div className="p-3 rounded-xl bg-nc-surface-1 border border-nc-border">
              <span className="font-display text-xl font-bold text-nc-violet block">
                {passport.metrics.missionsShipped}
              </span>
              <span className="text-[10px] text-nc-text-subtle uppercase">Shipped</span>
            </div>
            <div className="p-3 rounded-xl bg-nc-surface-1 border border-nc-border">
              <span className="font-display text-xl font-bold text-nc-success block">
                {passport.metrics.verifiedContributions}
              </span>
              <span className="text-[10px] text-nc-text-subtle uppercase">Verified</span>
            </div>
            <div className="p-3 rounded-xl bg-nc-surface-1 border border-nc-border">
              <span className="font-display text-xl font-bold text-nc-blue block">
                {passport.metrics.collaboratorCount}
              </span>
              <span className="text-[10px] text-nc-text-subtle uppercase">Collaborators</span>
            </div>
          </div>
        </div>

        {/* Verification Tiers Legend */}
        <div className="p-4 rounded-xl bg-nc-surface-1 border border-nc-border text-xs space-y-2">
          <span className="font-semibold text-nc-text block uppercase tracking-wider text-[10px]">
            Verification Standards
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-nc-success" />
              <span><strong>Artifact-Verified:</strong> Linked to merged GitHub PRs or live deployments.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-nc-violet" />
              <span><strong>Peer-Acknowledged:</strong> Confirmed by cross-functional squad teammates.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-nc-surface-3" />
              <span><strong>Self-Reported:</strong> Declared personal background and learning experiments.</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Verified Projects Timeline */}
      <div className="space-y-6">
        <h3 className="font-display text-lg font-bold text-nc-text flex items-center gap-2">
          <Award className="w-5 h-5 text-nc-violet" />
          <span>Verified Projects & Shipped Milestones</span>
        </h3>

        {passport.projects.map(project => (
          <Card key={project.id} variant="solid" className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-nc-border">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-display text-base font-bold text-nc-text">{project.title}</h4>
                  <Badge variant={project.verificationLevel === 'artifact_verified' ? 'success' : 'violet'}>
                    {project.verificationLevel.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-xs text-nc-text-muted mt-0.5">{project.tagline}</p>
              </div>

              <div className="text-right text-xs text-nc-text-subtle">
                <span className="font-semibold text-nc-text block">{project.role}</span>
                <span>{project.period}</span>
              </div>
            </div>

            {/* Verified Contributions */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-nc-text block">Documented Deliverables:</span>
              <ul className="space-y-1.5 text-xs text-nc-text-muted">
                {project.verifiedContributions.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-nc-violet shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Peer Endorsements */}
            {project.endorsedByPeers.length > 0 && (
              <div className="p-3 rounded-xl bg-nc-surface-2 border border-nc-border text-xs text-nc-text-subtle">
                <span className="font-semibold text-nc-text block mb-1">Squad Teammates Validated:</span>
                <div className="flex flex-wrap gap-2">
                  {project.endorsedByPeers.map((p, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-nc-surface-3 text-[11px] text-nc-text-muted">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Verified Links */}
            <div className="pt-2 border-t border-nc-border flex items-center justify-between text-xs">
              <span className="text-nc-text-subtle text-[11px]">Artifact Proof Links:</span>
              <div className="flex items-center gap-3">
                {project.artifacts.map((art, idx) => (
                  <a
                    key={idx}
                    href={art.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-nc-violet-soft hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>{art.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
