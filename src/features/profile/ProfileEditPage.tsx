import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  User as UserIcon,
  Sparkles,
  Sliders,
  Save,
  Check,
  Shield,
  Layers,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { User, GoalWeights } from '../../types';

export const ProfileEditPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState('');
  const [bio, setBio] = useState('');
  const [goals, setGoals] = useState<GoalWeights>({
    startup_building: 0.45,
    career_jobs: 0.30,
    freelance_clients: 0.15,
    learning_experiments: 0.10,
  });
  const [availability, setAvailability] = useState('10-20 hrs/wk');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      const u = await apiClient.getCurrentUser();
      setUser(u);
      if (u.persona) {
        setRole(u.persona.role);
        setBio(u.persona.bio);
        setGoals(u.persona.goals);
        setAvailability(u.persona.availability);
      }
    }
    load();
  }, []);

  const handleGoalChange = (key: keyof GoalWeights, val: number) => {
    const newGoals = { ...goals, [key]: val };
    const sum = Object.values(newGoals).reduce((a, b) => a + b, 0);
    if (sum > 0) {
      setGoals({
        startup_building: parseFloat((newGoals.startup_building / sum).toFixed(2)),
        career_jobs: parseFloat((newGoals.career_jobs / sum).toFixed(2)),
        freelance_clients: parseFloat((newGoals.freelance_clients / sum).toFixed(2)),
        learning_experiments: parseFloat((newGoals.learning_experiments / sum).toFixed(2)),
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await apiClient.updatePersona({
        role,
        bio,
        goals,
        availability: availability as any,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return <div className="py-20 text-center text-nc-text-muted">Loading Builder Profile...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-nc-border pb-6 space-y-2">
        <Badge variant="violet">Builder Persona</Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">
          Edit Profile & Recommender Goals
        </h1>
        <p className="text-xs text-nc-text-muted max-w-xl">
          Your profile and goal vector drive reciprocal matching in Find Your Four and curated opportunities.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-nc-success/15 border border-nc-success/40 text-nc-success text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Profile and goal vector updated successfully! Matching recommendations will recalibrate.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Identity */}
        <Card variant="solid" className="p-6 space-y-4">
          <h3 className="font-display font-semibold text-sm text-nc-text flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-nc-violet" />
            <span>Core Identity & Direction</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Fullstack & AI Engineer"
            />

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-nc-text-muted">Availability</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-nc-surface-2 border border-nc-border rounded-lg text-nc-text text-sm focus:outline-none focus:border-nc-violet"
              >
                <option value="1-5 hrs/wk">1-5 hrs/wk</option>
                <option value="5-10 hrs/wk">5-10 hrs/wk</option>
                <option value="10-20 hrs/wk">10-20 hrs/wk</option>
                <option value="20+ hrs/wk">20+ hrs/wk</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-nc-text-muted">Builder Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-nc-surface-2 border border-nc-border rounded-lg text-nc-text text-sm focus:outline-none focus:border-nc-violet"
            />
          </div>
        </Card>

        {/* Dynamic Goal Weights Vector */}
        <Card variant="solid" className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-nc-border">
            <h3 className="font-display font-semibold text-sm text-nc-text flex items-center gap-2">
              <Sliders className="w-4 h-4 text-nc-violet" />
              <span>Dynamic Goal Vector Weights (Sum = 100%)</span>
            </h3>
            <span className="text-[11px] text-nc-text-subtle">Re-calibrates matching engine</span>
          </div>

          <div className="space-y-4">
            {[
              { key: 'startup_building', label: 'Startup Building & Cofounders' },
              { key: 'career_jobs', label: 'Career Growth & High-Tier Jobs' },
              { key: 'freelance_clients', label: 'Freelance & Contract Sprints' },
              { key: 'learning_experiments', label: 'Learning & Open Source Hacking' },
            ].map(g => {
              const val = goals[g.key as keyof GoalWeights];
              return (
                <div key={g.key} className="p-3.5 rounded-xl bg-nc-surface-2 border border-nc-border space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-nc-text">{g.label}</span>
                    <span className="font-mono text-nc-violet font-bold">{Math.round(val * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={Math.round(val * 100)}
                    onChange={(e) => handleGoalChange(g.key as keyof GoalWeights, parseInt(e.target.value) / 100)}
                    className="w-full h-1.5 bg-nc-surface-3 rounded-lg appearance-none cursor-pointer accent-nc-violet"
                  />
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            size="md"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Save Persona Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
