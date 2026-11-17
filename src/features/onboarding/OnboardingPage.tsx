import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Logo } from '../../components/ui/Logo';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Shield,
  Layers,
  Compass,
  Sliders,
  Link as LinkIcon,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { BuilderPersona, GoalWeights } from '../../types';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  // Form State
  const [role, setRole] = useState('Fullstack & AI Engineer');
  const [bio, setBio] = useState('Building reactive interfaces and orchestrating agent workflows.');
  const [primarySkills, setPrimarySkills] = useState<string[]>(['React', 'TypeScript', 'FastAPI']);
  const [skillsOffered, setSkillsOffered] = useState<string[]>(['Web UI Architecture', 'API Integration']);
  const [skillsSought, setSkillsSought] = useState<string[]>(['Figma Product Design', 'PyTorch ML']);
  
  // Dynamic Goal Vector (must sum to 1.0)
  const [goals, setGoals] = useState<GoalWeights>({
    startup_building: 0.45,
    career_jobs: 0.30,
    freelance_clients: 0.15,
    learning_experiments: 0.10,
  });

  const [interests, setInterests] = useState<string[]>(['Agentic AI', 'Telugu LLMs', 'Developer Tools']);
  const [availability, setAvailability] = useState<BuilderPersona['availability']>('10-20 hrs/wk');
  const [workingFormat, setWorkingFormat] = useState<BuilderPersona['workingFormat']>('Night owls');
  const [matchingConsent, setMatchingConsent] = useState(true);
  const [portfolioLink, setPortfolioLink] = useState('https://github.com/karthik-varma');

  const availableSkillOptions = [
    'React', 'TypeScript', 'Python', 'FastAPI', 'Node.js', 'Go', 'Figma',
    'Design Systems', 'PyTorch', 'LangChain', 'Docker', 'PostgreSQL',
    'DevRel', 'Copywriting', 'SEO', 'Mobile Dev', 'Solidity'
  ];

  const toggleSkill = (skill: string, list: string[], setList: (l: string[]) => void) => {
    if (list.includes(skill)) {
      setList(list.filter(s => s !== skill));
    } else {
      setList([...list, skill]);
    }
  };

  const handleGoalChange = (key: keyof GoalWeights, val: number) => {
    const newGoals = { ...goals, [key]: val };
    // Normalize to sum to 1.0
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

  const handleFinish = async () => {
    await apiClient.updatePersona({
      role,
      bio,
      primarySkills,
      skillsOffered,
      skillsSought,
      goals,
      interests,
      availability,
      workingFormat,
      privacy: {
        profileVisibility: 'members_only',
        matchingConsent,
        showInDirectory: true,
      },
      portfolioLinks: portfolioLink ? [{ id: 'p1', title: 'Main Portfolio', url: portfolioLink, type: 'github' }] : [],
    });

    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-nc-bg text-nc-text py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-2.5">
          <Logo size="sm" />
          <span className="font-display font-bold text-sm tracking-wider text-nc-text">NIGHTCLUB</span>
        </div>

        {/* Progress Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-nc-text-muted">
            <span className="font-semibold text-nc-text">Builder Persona Onboarding</span>
            <span>Step {step} of {totalSteps}</span>
          </div>
          <div className="w-full h-1.5 bg-nc-surface-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-nc-violet to-nc-blue transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Card Content */}
        <Card variant="solid" className="p-8 space-y-6">
          {/* STEP 1: ROLE & BIO */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <Badge variant="violet" className="mb-2">Identity & Direction</Badge>
                <h2 className="font-display text-2xl font-bold text-nc-text">What are you building toward?</h2>
                <p className="text-xs text-nc-text-muted mt-1">
                  Define your primary role and a short sentence on your technical or creative direction.
                </p>
              </div>

              <Input
                label="Primary Role Title"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. AI Engineer, Product Designer, Founder"
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-nc-text-muted">Short Bio / Builder Statement</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 bg-nc-surface-2 border border-nc-border rounded-lg text-nc-text placeholder:text-nc-text-subtle text-sm focus:outline-none focus:border-nc-violet"
                  placeholder="e.g. Exploring fine-tuning on speech models. Looking to ship an MVP with a front-end lead."
                />
              </div>

              <Input
                label="Primary Artifact / Portfolio Link (Optional)"
                value={portfolioLink}
                onChange={(e) => setPortfolioLink(e.target.value)}
                placeholder="https://github.com/your-username"
              />
            </div>
          )}

          {/* STEP 2: SKILLS OFFERED & SOUGHT */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Badge variant="blue" className="mb-2">Reciprocal Chemistry</Badge>
                <h2 className="font-display text-2xl font-bold text-nc-text">Skills Offered & Missing Gaps</h2>
                <p className="text-xs text-nc-text-muted mt-1">
                  What can you contribute to a build squad, and what complementary skills are you looking for?
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-nc-text mb-2">
                  Skills you bring to the table (Select up to 5):
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSkillOptions.map((s) => {
                    const selected = primarySkills.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSkill(s, primarySkills, setPrimarySkills)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          selected
                            ? 'bg-nc-violet text-nc-bg font-semibold border-nc-violet'
                            : 'bg-nc-surface-2 text-nc-text-muted border-nc-border hover:border-nc-violet/50'
                        }`}
                      >
                        {selected ? `✓ ${s}` : `+ ${s}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 border-t border-nc-border">
                <label className="block text-xs font-semibold text-nc-text mb-2">
                  Complementary skills you seek in collaborators:
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSkillOptions.map((s) => {
                    const selected = skillsSought.includes(s);
                    return (
                      <button
                        key={`sought-${s}`}
                        type="button"
                        onClick={() => toggleSkill(s, skillsSought, setSkillsSought)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          selected
                            ? 'bg-nc-blue text-nc-bg font-semibold border-nc-blue'
                            : 'bg-nc-surface-2 text-nc-text-muted border-nc-border hover:border-nc-blue/50'
                        }`}
                      >
                        {selected ? `✓ ${s}` : `+ ${s}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DYNAMIC GOAL VECTOR */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Badge variant="violet" className="mb-2">Dynamic Objectives</Badge>
                <h2 className="font-display text-2xl font-bold text-nc-text">Balance Your Goals</h2>
                <p className="text-xs text-nc-text-muted mt-1">
                  Adjust your relative focus vector. The recommender engine dynamically routes matches based on these weights.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'startup_building', label: 'Startup Building & Cofounders', desc: 'Forming high-commitment squads to launch products.' },
                  { key: 'career_jobs', label: 'Career Growth & High-Tier Hiring', desc: 'Building portfolio proof for employment & referrals.' },
                  { key: 'freelance_clients', label: 'Freelance & Contract Work', desc: 'Finding paid sprint gigs and pilot customers.' },
                  { key: 'learning_experiments', label: 'Learning & Open Source Experiments', desc: 'Hacking on exploratory ideas without immediate commercial goals.' },
                ].map((g) => {
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
                      <p className="text-[11px] text-nc-text-subtle">{g.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: AVAILABILITY & WORKING STYLE */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <Badge variant="success" className="mb-2">Capacity & Norms</Badge>
                <h2 className="font-display text-2xl font-bold text-nc-text">Availability & Working Cadence</h2>
                <p className="text-xs text-nc-text-muted mt-1">
                  Prevents mismatched expectations before introductions happen.
                </p>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-nc-text">Weekly Dedicated Capacity</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['1-5 hrs/wk', '5-10 hrs/wk', '10-20 hrs/wk', '20+ hrs/wk'] as const).map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAvailability(a)}
                      className={`p-3 rounded-lg border text-xs font-medium transition-all ${
                        availability === a
                          ? 'bg-nc-surface-2 border-nc-violet text-nc-violet-soft font-semibold'
                          : 'bg-nc-surface-2 border-nc-border text-nc-text-muted hover:text-nc-text'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-nc-border">
                <label className="block text-xs font-semibold text-nc-text">Working Cadence</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Async-first', 'Pair-programming', 'Weekend sprints', 'Night owls'] as const).map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWorkingFormat(w)}
                      className={`p-3 rounded-lg border text-xs font-medium text-left transition-all ${
                        workingFormat === w
                          ? 'bg-nc-surface-2 border-nc-violet text-nc-violet-soft font-semibold'
                          : 'bg-nc-surface-2 border-nc-border text-nc-text-muted hover:text-nc-text'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: PRIVACY & CONSENT CONFIRMATION */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <Badge variant="warning" className="mb-2">Privacy & Consent</Badge>
                <h2 className="font-display text-2xl font-bold text-nc-text">Privacy Safeguards</h2>
                <p className="text-xs text-nc-text-muted mt-1">
                  Nightclub never exposes personal contact details without consent.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-nc-surface-2 border border-nc-border space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-nc-success shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-semibold text-nc-text block">Zero Contact Leakage</span>
                    <span className="text-nc-text-muted">
                      Your phone number and personal email remain concealed. All initial interactions occur through authorized in-app messaging after mutual connection.
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-nc-border">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={matchingConsent}
                      onChange={(e) => setMatchingConsent(e.target.checked)}
                      className="w-4 h-4 rounded border-nc-border bg-nc-surface-1 accent-nc-violet"
                    />
                    <span className="text-xs text-nc-text font-medium">
                      I consent to receive eligible collaborator recommendations via Find Your Four.
                    </span>
                  </label>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-nc-surface-3/50 border border-nc-border/70 text-xs text-nc-text-muted">
                <strong>Ready to launch:</strong> You can edit these preferences anytime in your Profile & Settings.
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-nc-border">
            {step > 1 ? (
              <Button
                variant="outline"
                size="md"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            ) : <div />}

            {step < totalSteps ? (
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => setStep(step + 1)}
              >
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                rightIcon={<Sparkles className="w-4 h-4" />}
                onClick={handleFinish}
              >
                Complete Persona & Enter Dashboard
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
