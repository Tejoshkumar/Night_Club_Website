import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users,
  Layers,
  Award,
  Video,
  Clock,
  Briefcase,
  Compass,
  MessageSquare,
  ChevronRight,
  Check,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { User, MatchCandidate, BuildMission, Session, Opportunity } from '../../types';

export const HomeDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [candidates, setCandidates] = useState<MatchCandidate[]>([]);
  const [activeMission, setActiveMission] = useState<BuildMission | null>(null);
  const [nextSession, setNextSession] = useState<Session | null>(null);
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [u, cands, missions, sessions, opps] = await Promise.all([
          apiClient.getCurrentUser(),
          apiClient.getFindYourFour(),
          apiClient.getMissions(),
          apiClient.getSessions(),
          apiClient.getOpportunities(),
        ]);
        setUser(u);
        setCandidates(cands);
        setActiveMission(missions[0] || null);
        setNextSession(sessions[0] || null);
        setOpportunity(opps[0] || null);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (isLoading || !user) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 bg-nc-surface-1 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-64 bg-nc-surface-1 rounded-xl md:col-span-2" />
          <div className="h-64 bg-nc-surface-1 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 1. ONE DOMINANT NEXT MEANINGFUL ACTION BANNER */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-nc-surface-2 via-nc-surface-1 to-nc-surface-2 border border-nc-violet/30 shadow-glass relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-full bg-nc-violet/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="violet">Next Priority Action</Badge>
              <span className="text-xs text-nc-text-subtle">Sprint Milestone Due in 3 days</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-nc-text">
              Project Akshara: Complete WebSocket Audio Client
            </h2>
            <p className="text-xs text-nc-text-muted max-w-2xl">
              Sravani has pushed the audio visualizer tokens and Rohit’s Whisper model checkpoint is ready. Your task is to connect the live transcript buffer.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <Link to="/app/missions/msn_01">
              <Button size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Open Task & Deliverable
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. BENTO GRID ARCHITECTURE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Squad & Build */}
        <div className="lg:col-span-8 space-y-6">
          {/* Bento Block A: Find Your Four Squad Status */}
          <Card variant="solid" className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-nc-border">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-nc-violet" />
                <div>
                  <h3 className="font-display text-base font-semibold text-nc-text">Find Your Four</h3>
                  <p className="text-[11px] text-nc-text-muted">4 complementary builders matched to your goal vector</p>
                </div>
              </div>
              <Link to="/app/find-your-four">
                <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                  Explore Orbital Network
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {candidates.map((cand) => (
                <div
                  key={cand.id}
                  className="p-3.5 rounded-xl bg-nc-surface-2 border border-nc-border hover:border-nc-violet/40 transition-colors flex items-start gap-3"
                >
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-10 h-10 rounded-full object-cover border border-nc-border"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-nc-text truncate">{cand.name}</span>
                      <Badge variant="violet" className="text-[9px] py-0 px-1.5">{cand.complementaryRole}</Badge>
                    </div>
                    <p className="text-[11px] text-nc-text-subtle truncate mt-0.5">{cand.role}</p>
                    <p className="text-[10px] text-nc-text-muted mt-1.5 line-clamp-1 italic">
                      "{cand.whyThisMatch}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Bento Block B: Active Build Mission */}
          {activeMission && (
            <Card variant="solid" className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-nc-border">
                <div className="flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-nc-blue" />
                  <div>
                    <h3 className="font-display text-base font-semibold text-nc-text">Active Build Mission</h3>
                    <p className="text-[11px] text-nc-text-muted">{activeMission.circleName}</p>
                  </div>
                </div>
                <Badge variant="blue">{activeMission.progressPercent}% Completed</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-nc-text">{activeMission.title}</span>
                  <span className="text-nc-text-subtle">Target: {activeMission.targetCompletionDate}</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-2 bg-nc-surface-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-nc-blue to-nc-violet transition-all duration-500"
                    style={{ width: `${activeMission.progressPercent}%` }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {activeMission.tasks.slice(0, 4).map((task) => (
                    <div
                      key={task.id}
                      className="p-2.5 rounded-lg bg-nc-surface-2 border border-nc-border flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        {task.status === 'done' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-nc-success shrink-0" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-nc-text-subtle shrink-0" />
                        )}
                        <span className={`truncate ${task.status === 'done' ? 'line-through text-nc-text-subtle' : 'text-nc-text'}`}>
                          {task.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-nc-text-subtle shrink-0 ml-2">
                        {task.assigneeName.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link to={`/app/missions/${activeMission.id}`}>
                  <Button variant="outline" size="sm">
                    View Full Mission Tasks & Artifacts →
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column (4 cols): Sessions & Opportunities */}
        <div className="lg:col-span-4 space-y-6">
          {/* Bento Block C: Upcoming Live Session */}
          {nextSession && (
            <Card variant="featured" className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-nc-border">
                <div className="flex items-center gap-2 text-nc-violet font-semibold text-xs uppercase tracking-wider">
                  <Video className="w-4 h-4" />
                  <span>Next Live Build Session</span>
                </div>
                <Badge variant="violet">8/Mo Included</Badge>
              </div>

              <div>
                <h4 className="font-display font-semibold text-sm text-nc-text leading-snug">
                  {nextSession.title}
                </h4>
                <div className="mt-3 space-y-1.5 text-xs text-nc-text-muted">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-nc-text-subtle" />
                    <span>{nextSession.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-nc-text-subtle" />
                    <span>{nextSession.timeIST}</span>
                  </div>
                  <div className="text-[11px] text-nc-violet-soft pt-1">
                    Host: {nextSession.host}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-nc-surface-1 border border-nc-border text-xs text-nc-text-subtle">
                Google Meet link will activate for paying members 15 mins before start time.
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Link to="/app/sessions" className="w-full">
                  <Button size="sm" className="w-full">
                    RSVP & Access Resources
                  </Button>
                </Link>
              </div>
            </Card>
          )}

          {/* Bento Block D: Curated Opportunity Matched to Goals */}
          {opportunity && (
            <Card variant="solid" className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-nc-border">
                <div className="flex items-center gap-2 text-nc-text text-xs font-semibold">
                  <Briefcase className="w-4 h-4 text-nc-success" />
                  <span>Curated Opportunity</span>
                </div>
                <Badge variant="success">Startup Co-founder</Badge>
              </div>

              <div>
                <h4 className="font-semibold text-xs text-nc-text">
                  {opportunity.title}
                </h4>
                <p className="text-[11px] text-nc-text-subtle mt-0.5">{opportunity.organization} · {opportunity.compensation}</p>
                <p className="text-xs text-nc-text-muted mt-2 leading-relaxed">
                  {opportunity.fitRationale}
                </p>
              </div>

              <div className="pt-2">
                <Link to={`/app/opportunities`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Review Fit & Apply →
                  </Button>
                </Link>
              </div>
            </Card>
          )}

          {/* Bento Block E: Builder Passport Quick Snapshot */}
          <Card variant="solid" className="p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-nc-text flex items-center gap-1.5">
                <Award className="w-4 h-4 text-nc-violet" /> Builder Passport
              </span>
              <span className="text-nc-violet font-mono font-bold">12 Verified</span>
            </div>
            <p className="text-nc-text-muted text-[11px]">
              3 PRs artifact-verified on GitHub. 4 milestones acknowledged by squad peers.
            </p>
            <Link to="/app/passport" className="block text-nc-violet-soft text-[11px] font-medium hover:underline pt-1">
              View Verified Proof-of-Work →
            </Link>
          </Card>
        </div>
      </div>

      {/* 3. FINITE DISCOVERY SUMMARY WITH "YOU'RE CAUGHT UP" STATE */}
      <section className="pt-4 space-y-4">
        <div className="flex items-center justify-between border-b border-nc-border pb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-nc-text-muted" />
            <h3 className="font-display font-semibold text-sm text-nc-text">Finite Discovery</h3>
          </div>
          <Link to="/app/discover" className="text-xs text-nc-violet-soft hover:underline">
            View All Filtered Builders & Projects →
          </Link>
        </div>

        <div className="p-6 rounded-xl bg-nc-surface-1 border border-nc-border text-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-nc-surface-2 text-nc-violet flex items-center justify-center mx-auto">
            <Check className="w-4 h-4" />
          </div>
          <h4 className="font-semibold text-xs text-nc-text">You're completely caught up!</h4>
          <p className="text-xs text-nc-text-muted max-w-md mx-auto">
            Nightclub does not employ infinite algorithmic scrolling. You have reviewed all active squad updates and new project milestones for today.
          </p>
        </div>
      </section>
    </div>
  );
};
