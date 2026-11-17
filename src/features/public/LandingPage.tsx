import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { NightclubUniverse } from '../../components/effects/NightclubUniverse';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import {
  Users,
  Layers,
  Award,
  Briefcase,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Compass,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="bg-nc-bg text-nc-text overflow-hidden selection:bg-nc-violet/30 selection:text-nc-violet-soft">
      {/* 1. HERO SECTION: CINEMATIC TWO-COLUMN WITH 3D "BUILDER UNIVERSE" */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 lg:py-20 px-4 sm:px-6 lg:px-12 border-b border-nc-border/60">
        {/* Ambient atmospheric backdrop glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 72% 45%, rgba(155, 123, 255, 0.16) 0%, rgba(139, 185, 255, 0.05) 45%, rgba(9, 9, 13, 0) 75%)',
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* LEFT COLUMN: HERO EDITORIAL MANIFESTO & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nc-surface-2 border border-nc-violet/30 text-nc-violet-soft text-xs font-mono tracking-wider shadow-glow-subtle">
                <Sparkles className="w-3.5 h-3.5 text-nc-violet" />
                <span>A NEW WORLD FOR BUILDERS</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-nc-text leading-[1.08]"
            >
              THE INTERNET IS FULL OF CONSUMERS.<br />
              <span className="bg-gradient-to-r from-nc-violet-soft via-nc-violet to-nc-blue bg-clip-text text-transparent">
                BE A BUILDER.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2"
            >
              <p className="text-nc-text text-base sm:text-lg font-medium leading-relaxed">
                Find your people. Build something real. Make your work matter.
              </p>
              <p className="text-nc-text-muted text-xs sm:text-sm max-w-xl leading-relaxed">
                NIGHTCLUB unites developers, designers, founders, and creators into high-velocity squads. Turn your abilities into complementary introductions, verified milestones, and career-defining opportunities.
              </p>
            </motion.div>

            {/* Primary & Secondary Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto px-8 shadow-glow-violet" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  ENTER NIGHTCLUB
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  EXPLORE THE EXPERIENCE
                </Button>
              </Link>
            </motion.div>

            {/* Value Proposition Micro-badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-3 text-xs text-nc-text-subtle"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-nc-success" /> 8 Live Paid Sessions / Mo
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-nc-success" /> Find Your Four Matching
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-nc-success" /> ₹189/mo · Cancel Anytime
              </span>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: THE 3D "BUILDER UNIVERSE" ARCHITECTURAL SCULPTURE */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <NightclubUniverse />
          </div>
        </div>
      </section>

      {/* 2. THE 5-STEP PRODUCT JOURNEY */}
      <section id="experience" className="py-20 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="violet" className="mb-3">The Architecture</Badge>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-nc-text">
            Not another endless-scrolling social network.
          </h2>
          <p className="text-nc-text-muted text-sm mt-3">
            Nightclub is structured around one intentional macro loop designed to produce real human outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'Understand Me',
              desc: 'Declare skills offered, gaps sought, and dynamic vector weights for startups, career, and gigs.',
              icon: Compass,
            },
            {
              step: '02',
              title: 'Find My People',
              desc: 'Find Your Four recommends up to 4 complementary collaborators with transparent match reasons.',
              icon: Users,
            },
            {
              step: '03',
              title: 'Build Together',
              desc: 'Join Builder Circles and complete Build Missions with clear deliverable ownership.',
              icon: Layers,
            },
            {
              step: '04',
              title: 'Prove My Work',
              desc: 'Earn Builder Passport verification: self-reported, peer-acknowledged, or artifact-verified.',
              icon: Award,
            },
            {
              step: '05',
              title: 'Unlock Opportunities',
              desc: 'Get discovered for co-founder roles, high-intent hiring, freelance gigs, and pilot customers.',
              icon: Briefcase,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Card key={i} variant="interactive" className="relative group">
                <div className="text-xs font-mono font-bold text-nc-violet mb-3">
                  {item.step}
                </div>
                <div className="w-9 h-9 rounded-lg bg-nc-surface-2 flex items-center justify-center text-nc-text-muted group-hover:text-nc-violet transition-colors mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-display font-semibold text-sm text-nc-text mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-nc-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. SIGNATURE HIGHLIGHT: FIND YOUR FOUR */}
      <section className="py-20 px-4 sm:px-8 border-y border-nc-border bg-nc-surface-1/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="blue" className="mb-3">Signature Capability</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-nc-text">
              Find Your Four: Your 5-Person Squad
            </h2>
            <p className="text-nc-text-muted text-sm mt-4 leading-relaxed">
              Most projects fail because of homogenous teams. Nightclub’s reciprocal matching engine analyzes skill gaps, goal alignment, and capacity overlap to assemble balanced, cross-functional squads:
            </p>

            <ul className="space-y-3 mt-6 text-xs text-nc-text">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-nc-violet mt-0.5 shrink-0" />
                <span><strong>No fabricated matches:</strong> We show fewer than four rather than fill seats with artificial profiles.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-nc-violet mt-0.5 shrink-0" />
                <span><strong>Explainable fit:</strong> Every recommendation explains exactly why you were matched and what each member contributes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-nc-violet mt-0.5 shrink-0" />
                <span><strong>Individual opt-in:</strong> Request introductions one-by-one. No forced groups or contact leaks.</span>
              </li>
            </ul>

            <div className="mt-8">
              <Link to="/register">
                <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Matching Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual representation of a squad card */}
          <div className="p-6 rounded-2xl bg-nc-surface-2 border border-nc-border shadow-glass space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-nc-border">
              <span className="text-xs font-semibold text-nc-text">Squad Chemistry Coverage</span>
              <Badge variant="success">96% Balanced Fit</Badge>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Karthik Varma (You)', role: 'Fullstack & Agent Arch', skill: 'React / FastAPI', color: 'text-nc-violet' },
                { name: 'Sravani Rayudu', role: 'Product & Design Systems', skill: 'Figma / UX Research', color: 'text-nc-blue' },
                { name: 'Rohit Annam', role: 'Machine Learning', skill: 'PyTorch / Fine-tuning', color: 'text-nc-success' },
                { name: 'Teja Madhav', role: 'Distributed Systems & Infra', skill: 'Go / Kubernetes', color: 'text-nc-warning' },
              ].map((m, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-nc-surface-1 border border-nc-border text-xs">
                  <div>
                    <div className="font-semibold text-nc-text">{m.name}</div>
                    <div className={`text-[11px] font-medium ${m.color}`}>{m.role}</div>
                  </div>
                  <span className="text-[10px] text-nc-text-subtle px-2 py-1 bg-nc-surface-3 rounded">
                    {m.skill}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-nc-text-subtle text-center">
              All members have consented to collaborate on real deliverables.
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE SESSIONS & MEMBERSHIP BENEFITS */}
      <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card variant="featured">
                <Calendar className="w-5 h-5 text-nc-violet mb-3" />
                <h4 className="font-display font-semibold text-sm text-nc-text">8 Paid Build Sessions</h4>
                <p className="text-xs text-nc-text-muted mt-1 leading-relaxed">
                  Alternate-night live deep dives with founder Nitish and expert guests. Practical code, no fluff.
                </p>
              </Card>

              <Card variant="solid">
                <MessageSquare className="w-5 h-5 text-nc-blue mb-3" />
                <h4 className="font-display font-semibold text-sm text-nc-text">Curated WhatsApp Group</h4>
                <p className="text-xs text-nc-text-muted mt-1 leading-relaxed">
                  Direct peer accountability, fast technical unblocking, and daily project updates.
                </p>
              </Card>

              <Card variant="solid">
                <Award className="w-5 h-5 text-nc-success mb-3" />
                <h4 className="font-display font-semibold text-sm text-nc-text">Builder Passport</h4>
                <p className="text-xs text-nc-text-muted mt-1 leading-relaxed">
                  Artifact-verified proof of contributions. A living portfolio that speaks for your capabilities.
                </p>
              </Card>

              <Card variant="solid">
                <ShieldCheck className="w-5 h-5 text-nc-warning mb-3" />
                <h4 className="font-display font-semibold text-sm text-nc-text">Google Meet Live Access</h4>
                <p className="text-xs text-nc-text-muted mt-1 leading-relaxed">
                  Direct live access to interactive build rooms and code tear-down reviews.
                </p>
              </Card>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Badge variant="violet" className="mb-3">Membership Value</Badge>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-nc-text">
              Just ₹189 per month.<br />Transparent & Zero Lock-in.
            </h2>
            <p className="text-nc-text-muted text-sm mt-4 leading-relaxed">
              We believe elite technical collaboration and mentorship should be accessible to any dedicated student or engineer. One predictable subscription powered by Razorpay AutoPay.
            </p>

            <div className="mt-6 p-4 rounded-xl bg-nc-surface-2 border border-nc-border">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-nc-text">₹189</span>
                <span className="text-xs text-nc-text-muted">/ month (incl. GST)</span>
              </div>
              <p className="text-xs text-nc-text-subtle mt-1">
                RBI e-Mandate compliant. Cancel anytime in 1-click directly from your account settings.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Link to="/register">
                <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Start Building Today
                </Button>
              </Link>
              <Link to="/membership" className="text-xs text-nc-violet-soft hover:underline">
                View Full Entitlement Policy →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-b from-nc-surface-1 to-nc-bg border-t border-nc-border">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-nc-text">
            Ready to build with real collaborators?
          </h2>
          <p className="text-nc-text-muted text-sm sm:text-base max-w-xl mx-auto">
            Stop coding in isolation. Complete your persona, meet your squad, and ship verified milestones.
          </p>
          <div className="pt-2">
            <Link to="/register">
              <Button size="lg" className="px-10" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Join Nightclub · ₹189/mo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
