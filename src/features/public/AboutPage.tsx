import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ShieldCheck, HeartHandshake, Zap, Target, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-8 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="violet">Product Philosophy & Manifesto</Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-nc-text">
          Building the Network We Wished Existed
        </h1>
        <p className="text-nc-text-muted text-sm sm:text-base leading-relaxed">
          Nightclub is not an infinite-scrolling social network. It is an execution space where ambitious builders meet complementary collaborators, ship verifiable projects, and turn real work into real opportunities.
        </p>
      </div>

      {/* Positioning Statement */}
      <Card variant="featured" className="p-8 text-center space-y-4">
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-nc-text">
          Where Nightclub Fits in Your Builder Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs text-nc-text-muted text-left">
          <div className="p-4 rounded-xl bg-nc-surface-1 border border-nc-border">
            <span className="font-semibold text-nc-text block mb-1">GitHub & Figma</span>
            Record code commits and design mockups.
          </div>
          <div className="p-4 rounded-xl bg-nc-surface-1 border border-nc-border">
            <span className="font-semibold text-nc-text block mb-1">LinkedIn & X</span>
            Broadcast resumes, status updates, and opinions.
          </div>
          <div className="p-4 rounded-xl bg-nc-surface-2 border border-nc-violet/50 shadow-glow-subtle">
            <span className="font-semibold text-nc-violet-soft block mb-1">NIGHTCLUB</span>
            Find complementary collaborators, build together, verify artifacts, and unlock jobs & startups.
          </div>
        </div>
      </Card>

      {/* Core Principles */}
      <div className="space-y-6">
        <div className="border-b border-nc-border pb-3">
          <h2 className="font-display text-2xl font-bold text-nc-text">Our Non-Negotiable Principles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <Card variant="solid" className="space-y-2">
            <div className="flex items-center gap-2 text-nc-violet font-semibold text-sm">
              <Target className="w-4 h-4" />
              <span>1. Outcomes Over Screen Time</span>
            </div>
            <p className="text-nc-text-muted leading-relaxed">
              We do not measure success by how many minutes you spend glued to our interface. Our North Star is weekly meaningful collaborators—the number of people who participated in evidence-backed collaboration.
            </p>
          </Card>

          <Card variant="solid" className="space-y-2">
            <div className="flex items-center gap-2 text-nc-blue font-semibold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>2. Consent Before Connection</span>
            </div>
            <p className="text-nc-text-muted leading-relaxed">
              No automatic permanent group assignments. No public phone numbers or emails. Introductions are mutual and opt-in, with in-app chat enabled only after both parties agree.
            </p>
          </Card>

          <Card variant="solid" className="space-y-2">
            <div className="flex items-center gap-2 text-nc-success font-semibold text-sm">
              <Zap className="w-4 h-4" />
              <span>3. Proof Over Unverified Claims</span>
            </div>
            <p className="text-nc-text-muted leading-relaxed">
              In a world flooded with AI-generated resumes, we build trust through verified artifacts. The Builder Passport explicitly distinguishes self-reported work, peer-acknowledged tasks, and repository-verified commits.
            </p>
          </Card>

          <Card variant="solid" className="space-y-2">
            <div className="flex items-center gap-2 text-nc-warning font-semibold text-sm">
              <HeartHandshake className="w-4 h-4" />
              <span>4. Finite Discovery</span>
            </div>
            <p className="text-nc-text-muted leading-relaxed">
              We strictly reject infinite scrolling, deceptive urgency, and slot-machine mechanics. Every discovery feed has a clear stopping point: "You’re caught up."
            </p>
          </Card>
        </div>
      </div>

      {/* Community Roots */}
      <div className="p-8 rounded-2xl bg-nc-surface-2 border border-nc-border space-y-4">
        <h3 className="font-display text-lg font-semibold text-nc-text">Origin & The Team</h3>
        <p className="text-xs text-nc-text-muted leading-relaxed">
          Nightclub was founded by <strong>Nitish (Founder Labs)</strong>, originating with the vibrant Telugu AI and developer community. Ambitious builders from Hyderabad, Bangalore, and across India gather here alternate nights to code in public, share model weights, and launch products.
        </p>
        <div className="pt-2">
          <Link to="/register">
            <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Join the Network · ₹189/mo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
