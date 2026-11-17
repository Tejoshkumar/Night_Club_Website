import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  Briefcase,
  Bookmark,
  Send,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Building,
  DollarSign,
  MapPin,
  Filter,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { Opportunity } from '../../types';

export const OpportunitiesPage: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'startup_cofounder' | 'career_jobs' | 'freelance_clients' | 'early_customer'>('all');
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await apiClient.getOpportunities();
      setOpportunities(data);
    }
    load();
  }, []);

  const handleToggleSave = async (oppId: string) => {
    const updated = await apiClient.toggleSaveOpportunity(oppId);
    setOpportunities(prev => prev.map(o => o.id === oppId ? updated : o));
    setToastMsg(updated.saved ? 'Opportunity saved to your bookmarks.' : 'Bookmark removed.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleApply = async () => {
    if (!selectedOpp) return;
    const updated = await apiClient.applyToOpportunity(selectedOpp.id);
    setOpportunities(prev => prev.map(o => o.id === selectedOpp.id ? updated : o));
    setIsApplyModalOpen(false);
    setToastMsg(`Introduction & evidence dispatched to ${selectedOpp.organization}!`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const filteredOpps = opportunities.filter(o => activeFilter === 'all' || o.type === activeFilter);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-nc-border pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="success">Verified Ecosystem Pipeline</Badge>
          <span className="text-xs text-nc-text-subtle">Outcome Focused</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">
          Opportunities: Startups, Jobs & Pilots
        </h1>
        <p className="text-xs text-nc-text-muted max-w-2xl">
          Legitimate opportunities routed to you based on your dynamic goal vector weights. We facilitate community introductions backed by your verified Builder Passport.
        </p>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-4 rounded-xl bg-nc-success/15 border border-nc-success/40 text-nc-success text-xs flex items-center justify-between">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { key: 'all', label: 'All Opportunities' },
          { key: 'startup_cofounder', label: 'Startup Cofounders' },
          { key: 'career_jobs', label: 'Career & High-Tier Jobs' },
          { key: 'early_customer', label: 'Early Pilot Customers' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key as any)}
            className={`px-3.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              activeFilter === tab.key
                ? 'bg-nc-violet text-nc-bg font-semibold'
                : 'bg-nc-surface-2 text-nc-text-muted hover:text-nc-text border border-nc-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Opportunity Cards */}
      <div className="space-y-6">
        {filteredOpps.map(opp => (
          <Card key={opp.id} variant="solid" className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-nc-border">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant={opp.type === 'startup_cofounder' ? 'violet' : opp.type === 'early_customer' ? 'warning' : 'blue'}>
                    {opp.type.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <span className="text-xs text-nc-text-subtle font-medium">{opp.organization}</span>
                </div>
                <h2 className="font-display text-base sm:text-lg font-bold text-nc-text mt-1.5">{opp.title}</h2>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => handleToggleSave(opp.id)}
                  className="p-2 rounded-lg bg-nc-surface-2 border border-nc-border text-nc-text-subtle hover:text-nc-violet"
                  title="Bookmark"
                >
                  <Bookmark className={`w-4 h-4 ${opp.saved ? 'fill-nc-violet text-nc-violet' : ''}`} />
                </button>
                {opp.applied ? (
                  <Badge variant="success" className="px-3 py-2 text-xs">
                    ✓ Introduction Expressed
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    rightIcon={<Send className="w-3.5 h-3.5" />}
                    onClick={() => {
                      setSelectedOpp(opp);
                      setIsApplyModalOpen(true);
                    }}
                  >
                    Express Interest
                  </Button>
                )}
              </div>
            </div>

            <p className="text-xs text-nc-text-muted leading-relaxed">
              {opp.description}
            </p>

            {/* Fit Rationale */}
            <div className="p-3.5 rounded-xl bg-nc-surface-2 border border-nc-border text-xs space-y-1">
              <span className="text-nc-violet font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Recommender Fit Rationale:
              </span>
              <p className="text-nc-text-muted leading-relaxed">{opp.fitRationale}</p>
            </div>

            {/* Requirements & Compensation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-nc-border text-xs text-nc-text-subtle">
              <div>
                <span className="font-semibold text-nc-text block mb-1">Key Requirements:</span>
                <div className="flex flex-wrap gap-1">
                  {opp.requirements.map(req => (
                    <span key={req} className="px-2 py-0.5 rounded bg-nc-surface-3 text-[10px] text-nc-text-muted">
                      {req}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sm:text-right">
                <span className="font-semibold text-nc-text block mb-1">Compensation / Equity:</span>
                <span className="text-nc-success font-semibold">{opp.compensation}</span>
                <div className="text-[10px] text-nc-text-subtle mt-0.5">
                  Source: {opp.verifiedSource}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Express Interest Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title={selectedOpp ? `Express Interest to ${selectedOpp.organization}` : 'Express Interest'}
        description="We attach your verified Builder Passport and recent mission artifacts. No cold spam."
      >
        {selectedOpp && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-nc-surface-2 border border-nc-border text-xs space-y-1">
              <span className="font-semibold text-nc-text">{selectedOpp.title}</span>
              <p className="text-[11px] text-nc-text-muted">Attached Evidence: Project Akshara Studio PR #14 & HyperDoc SQLite</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-nc-text-muted">Personal Pitch / Availability</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 bg-nc-surface-2 border border-nc-border rounded-lg text-xs text-nc-text focus:outline-none focus:border-nc-violet"
                defaultValue="I have hands-on experience building audio streaming interfaces and LLM agents. I would love to explore this opportunity and discuss mutual fit."
              />
            </div>

            <div className="p-3 rounded-lg bg-nc-surface-1 border border-nc-border text-[11px] text-nc-text-subtle">
              Nightclub verifies legitimate postings but does not guarantee employment or investment. All introductions are consensual.
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-nc-border">
              <Button variant="ghost" size="sm" onClick={() => setIsApplyModalOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={handleApply}>Submit Application</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
