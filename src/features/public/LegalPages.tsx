import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const TermsPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
      <div>
        <Badge variant="violet" className="mb-2">Legal Terms</Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-nc-text">Terms of Service</h1>
        <p className="text-xs text-nc-text-muted mt-1">Last revised: 13 November 2026</p>
      </div>

      <Card variant="solid" className="p-8 space-y-6 text-xs text-nc-text-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-nc-text">1. Acceptance of Terms</h2>
          <p>
            By registering for an account or subscribing to Nightclub (operated by Founder Labs by Nitish), you agree to be bound by these Terms of Service. Nightclub is an intelligent builder execution network designed for collaborative projects, learning sessions, and verified proof of work.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-nc-text">2. Membership & AutoPay Billing</h2>
          <p>
            Nightclub membership is priced at ₹189 per calendar month, billed automatically via Razorpay under the Reserve Bank of India (RBI) e-Mandate framework. You will receive an electronic pre-debit notice 24 hours prior to each billing transaction. You may cancel your subscription at any time without penalty.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-nc-text">3. Code of Conduct & Safety</h2>
          <p>
            Nightclub members agree to treat all peers with professional respect. Harassment, unauthorized disclosure of member contact details, spamming, academic dishonesty, and malicious scraping are strictly prohibited and will result in immediate termination of access without refund.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-nc-text">4. Intellectual Property</h2>
          <p>
            Members retain full copyright and ownership of the code, designs, and deliverables created within their squads and missions. Nightclub claims no ownership over projects built by members.
          </p>
        </section>
      </Card>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
      <div>
        <Badge variant="violet" className="mb-2">Privacy & Consent</Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-nc-text">Privacy Policy</h1>
        <p className="text-xs text-nc-text-muted mt-1">Last revised: 13 November 2026</p>
      </div>

      <Card variant="solid" className="p-8 space-y-6 text-xs text-nc-text-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-nc-text">1. Privacy by Default</h2>
          <p>
            In alignment with the Nightclub Hooked Product Blueprint, personal contact details (such as your private email and phone number) are never disclosed to other members by default. Communication occurs through authorized in-app messaging after mutual connection acceptance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-nc-text">2. Information We Collect</h2>
          <p>
            We collect the information you explicitly provide during Builder Persona onboarding: your role, skills offered, skills sought, goal weightings (startup, career, freelance), and optional portfolio links. We do not track keystrokes, browser history, or precise geolocation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-nc-text">3. Recommender Systems & Fairness</h2>
          <p>
            Matching algorithms in Find Your Four analyze skills, goals, and timezone availability to provide transparent recommendations. We never use protected personal traits for exclusion, nor do we sell member data to third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-nc-text">4. Data Deletion & Export</h2>
          <p>
            You have the complete right to export your Builder Passport data or request permanent deletion of your account and associated records directly from Account Settings.
          </p>
        </section>
      </Card>
    </div>
  );
};

export const RefundsPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-8 max-w-4xl mx-auto space-y-8">
      <div>
        <Badge variant="violet" className="mb-2">Subscription & Refunds</Badge>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-nc-text">Refund & Cancellation Policy</h1>
        <p className="text-xs text-nc-text-muted mt-1">Last revised: 13 November 2026</p>
      </div>

      <Card variant="solid" className="p-8 space-y-6 text-xs text-nc-text-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-nc-text">1. Transparent Monthly Cancellation</h2>
          <p>
            You can cancel your ₹189/month membership at any time directly through your Account Settings or Membership panel with a single click. There are no retention questionnaires or dark patterns. When cancelled, your membership will remain active until the end of the current paid billing cycle.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-nc-text">2. 7-Day Refund Window</h2>
          <p>
            If you subscribe and determine within 7 days of your first charge that Nightclub does not meet your expectations, you may email support@nightclub.build for a full, no-questions-asked refund of your ₹189 payment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-base font-semibold text-nc-text">3. Payment Disputes & Inquiries</h2>
          <p>
            If you observe any duplicate debit or unauthorized charge through Razorpay, please alert support@nightclub.build immediately with your transaction reference. Verified duplicate charges are refunded within 3-5 business days to the original payment method.
          </p>
        </section>
      </Card>
    </div>
  );
};
