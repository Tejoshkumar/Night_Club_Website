import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  CreditCard,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink,
  MessageSquare,
  Video,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { MembershipDetails } from '../../types';

export const MembershipDashboardPage: React.FC = () => {
  const [membership, setMembership] = useState<MembershipDetails | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const data = await apiClient.getMembership();
      setMembership(data);
    }
    load();
  }, []);

  const handleCancel = async () => {
    const updated = await apiClient.cancelMembership();
    setMembership(updated);
    setToastMsg('Membership cancelled. You will retain access until the end of the billing period.');
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleReactivate = async () => {
    const updated = await apiClient.reactivateMembership();
    setMembership(updated);
    setToastMsg('Membership reactivated! Your Razorpay AutoPay subscription is active.');
    setTimeout(() => setToastMsg(null), 4000);
  };

  if (!membership) {
    return <div className="py-20 text-center text-nc-text-muted">Loading Membership Details...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-nc-border pb-6 space-y-2">
        <Badge variant="violet">Subscription & Billing</Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">
          Membership & AutoPay Management
        </h1>
        <p className="text-xs text-nc-text-muted max-w-xl">
          Transparent ₹189/month builder subscription powered by Razorpay AutoPay. No lock-ins, contracts, or hidden retention traps.
        </p>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-4 rounded-xl bg-nc-surface-2 border border-nc-violet/40 text-nc-text text-xs flex items-center justify-between">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Plan Status Card */}
      <Card variant="featured" className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-nc-border">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold text-nc-text">{membership.plan}</h2>
              <Badge variant={membership.cancelAtPeriodEnd ? 'warning' : 'success'}>
                {membership.cancelAtPeriodEnd ? 'Cancels at Period End' : 'Active Subscription'}
              </Badge>
            </div>
            <p className="text-xs text-nc-text-muted mt-1">Razorpay Subscription ID: {membership.razorpaySubscriptionId}</p>
          </div>

          <div className="text-right">
            <span className="font-display text-3xl font-bold text-nc-text">₹{membership.amountINR}</span>
            <span className="text-xs text-nc-text-muted"> / month</span>
          </div>
        </div>

        {/* Benefits & Usage Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-nc-surface-1 border border-nc-border space-y-1">
            <span className="text-nc-text-subtle uppercase text-[10px] font-semibold">Included Live Sessions</span>
            <span className="font-display text-xl font-bold text-nc-violet block">
              {membership.sessionsUsedThisMonth} / {membership.sessionsIncludedPerMonth} Used
            </span>
            <span className="text-[11px] text-nc-text-muted">Resets on next billing cycle</span>
          </div>

          <div className="p-4 rounded-xl bg-nc-surface-1 border border-nc-border space-y-1">
            <span className="text-nc-text-subtle uppercase text-[10px] font-semibold">Next AutoPay Debit</span>
            <span className="font-semibold text-nc-text block text-sm pt-1">
              {membership.nextBillingDate}
            </span>
            <span className="text-[11px] text-nc-text-muted">SMS notification 24h prior</span>
          </div>

          <div className="p-4 rounded-xl bg-nc-surface-1 border border-nc-border space-y-1">
            <span className="text-nc-text-subtle uppercase text-[10px] font-semibold">Payment Method</span>
            <span className="font-semibold text-nc-text block text-sm pt-1">
              {membership.paymentMethodLast4}
            </span>
            <span className="text-[11px] text-nc-text-success">RBI e-Mandate Compliant</span>
          </div>
        </div>

        {/* WhatsApp & Google Meet Entitlement status */}
        <div className="p-4 rounded-xl bg-nc-surface-1 border border-nc-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-semibold text-nc-text flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-nc-success" />
              <span>WhatsApp Builder Community</span>
            </span>
            <p className="text-nc-text-muted text-[11px]">Daily peer support, live unblocking, and announcements from Nitish.</p>
          </div>
          <a
            href="https://chat.whatsapp.com/sample-nightclub"
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
            <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
              Open WhatsApp Group
            </Button>
          </a>
        </div>

        {/* Cancellation / Reactivation Action */}
        <div className="pt-4 border-t border-nc-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="text-nc-text-subtle text-[11px]">
            {membership.cancelAtPeriodEnd ? (
              <span className="text-nc-warning flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Access will end on {membership.nextBillingDate}.
              </span>
            ) : (
              <span>Need to pause? You can cancel anytime with zero friction.</span>
            )}
          </div>

          <div>
            {membership.cancelAtPeriodEnd ? (
              <Button variant="primary" size="sm" onClick={handleReactivate}>
                Reactivate Subscription
              </Button>
            ) : (
              <Button variant="destructive" size="sm" onClick={handleCancel}>
                Cancel Membership
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
