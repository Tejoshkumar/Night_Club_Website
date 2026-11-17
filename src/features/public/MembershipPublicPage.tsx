import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Calendar,
  Video,
  MessageSquare,
  Award,
  ArrowRight,
  CreditCard,
} from 'lucide-react';

export const MembershipPublicPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is included in the ₹189/month membership?',
      a: 'Membership includes full access to 8 live build sessions per month, Google Meet live access, the curated private WhatsApp community, Find Your Four collaborator matching, Builder Circles workspace, and your verified Builder Passport.',
    },
    {
      q: 'How does Razorpay AutoPay work?',
      a: 'We use the Reserve Bank of India (RBI) compliant e-Mandate framework via Razorpay. Your card or UPI mandate authorizes ₹189 every month. You receive a notification 24 hours prior to each deduction, and you can cancel anytime with a single click.',
    },
    {
      q: 'How do I access the Google Meet links?',
      a: 'Google Meet links are authorized exclusively for active paying members. They become accessible directly on your member dashboard and Live Sessions hub 15 minutes before each alternate-night build.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes, absolutely. There are no lock-ins, contracts, or hidden retention gates. You can cancel with 1 click directly in your Account Settings, and you will retain access until the end of your billing cycle.',
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-8 max-w-5xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="violet">Transparent Builder Membership</Badge>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-nc-text">
          Elite Builder Network.<br />Simple ₹189/month.
        </h1>
        <p className="text-nc-text-muted text-sm sm:text-base leading-relaxed">
          High-velocity collaboration, live code sessions, and verifiable outcomes. No paywalls on safety, no hidden tier upgrades.
        </p>
      </div>

      {/* Main Pricing Box */}
      <div className="max-w-xl mx-auto">
        <Card variant="featured" className="p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-nc-border">
            <div>
              <h3 className="font-display text-xl font-bold text-nc-text">Nightclub Builder Pass</h3>
              <p className="text-xs text-nc-text-muted mt-0.5">Monthly execution subscription</p>
            </div>
            <div className="text-right">
              <span className="font-display text-3xl font-bold text-nc-text">₹189</span>
              <span className="text-xs text-nc-text-muted"> / month</span>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            {[
              { text: '8 Included Paid Live Sessions / month on alternate nights', icon: Calendar },
              { text: 'Google Meet live access & code reviews with Nitish', icon: Video },
              { text: 'Curated WhatsApp Builder Community for daily unblocking', icon: MessageSquare },
              { text: 'Find Your Four: 5-person complementary squad matching', icon: ShieldCheck },
              { text: 'Builder Circles workspace with task & milestone accountability', icon: CheckCircle2 },
              { text: 'Builder Passport with artifact-verified proof of work', icon: Award },
              { text: 'Direct discovery for cofounders, jobs, and freelance gigs', icon: CheckCircle2 },
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="flex items-start gap-3 text-nc-text">
                  <Icon className="w-4 h-4 text-nc-violet shrink-0 mt-0.5" />
                  <span>{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-nc-border space-y-3">
            <Link to="/register" className="w-full block">
              <Button size="lg" className="w-full text-base" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Subscribe for ₹189/month
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-2 text-[11px] text-nc-text-subtle">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Razorpay AutoPay · RBI e-Mandate · Cancel Anytime</span>
            </div>
          </div>
        </Card>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="border-b border-nc-border pb-3">
          <h2 className="font-display text-2xl font-bold text-nc-text">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-nc-surface-1 border border-nc-border cursor-pointer transition-colors hover:border-nc-violet/30"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex items-center justify-between text-xs font-semibold text-nc-text">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-nc-violet" />
                  {faq.q}
                </span>
                <span className="text-nc-text-subtle font-mono">{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && (
                <p className="mt-3 text-xs text-nc-text-muted leading-relaxed pl-6 border-l border-nc-violet/30">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
