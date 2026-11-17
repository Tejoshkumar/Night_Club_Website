import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Settings,
  Shield,
  Download,
  Trash2,
  Lock,
  Eye,
  Slash,
  Check,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [profileVisibility, setProfileVisibility] = useState('members_only');
  const [matchingConsent, setMatchingConsent] = useState(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSaveSettings = () => {
    setToastMsg('Privacy settings and visibility updated.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleExportData = () => {
    setToastMsg('Data export archive requested. Download link will be emailed to your registered address.');
    setTimeout(() => setToastMsg(null), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-nc-border pb-6 space-y-2">
        <Badge variant="violet">Account & Privacy</Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">
          Settings & Data Controls
        </h1>
        <p className="text-xs text-nc-text-muted max-w-xl">
          Manage your personal data visibility, security credentials, and discoverability preferences.
        </p>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-4 rounded-xl bg-nc-success/15 border border-nc-success/40 text-nc-success text-xs flex items-center justify-between">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Privacy & Visibility */}
      <Card variant="solid" className="p-6 space-y-5">
        <h3 className="font-display font-semibold text-sm text-nc-text flex items-center gap-2 pb-2 border-b border-nc-border">
          <Eye className="w-4 h-4 text-nc-violet" />
          <span>Profile Discoverability</span>
        </h3>

        <div className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="block font-medium text-nc-text-muted">Who can discover your profile</label>
            <select
              value={profileVisibility}
              onChange={(e) => setProfileVisibility(e.target.value)}
              className="w-full sm:w-80 px-3.5 py-2.5 bg-nc-surface-2 border border-nc-border rounded-lg text-nc-text text-sm focus:outline-none focus:border-nc-violet"
            >
              <option value="members_only">All Nightclub Members (Recommended)</option>
              <option value="connections_only">Accepted Connections Only</option>
              <option value="public">Public Web (Builder Passport shareable)</option>
            </select>
          </div>

          <div className="p-4 rounded-xl bg-nc-surface-2 border border-nc-border flex items-start gap-3">
            <input
              type="checkbox"
              checked={matchingConsent}
              onChange={(e) => setMatchingConsent(e.target.checked)}
              className="w-4 h-4 rounded mt-0.5 accent-nc-violet"
            />
            <div className="space-y-0.5">
              <span className="font-semibold text-nc-text block">Participate in Find Your Four Matching</span>
              <p className="text-nc-text-muted text-[11px]">
                Allows our reciprocal engine to evaluate your skills and goals to assemble balanced builder squads.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button size="sm" onClick={handleSaveSettings}>Save Privacy Settings</Button>
        </div>
      </Card>

      {/* Security: Password */}
      <Card variant="solid" className="p-6 space-y-4">
        <h3 className="font-display font-semibold text-sm text-nc-text flex items-center gap-2 pb-2 border-b border-nc-border">
          <Lock className="w-4 h-4 text-nc-violet" />
          <span>Change Password</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Current Password" type="password" placeholder="••••••••••••" />
          <Input label="New Password" type="password" placeholder="••••••••••••" />
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="outline" size="sm" onClick={() => { setToastMsg('Password updated.'); setTimeout(() => setToastMsg(null), 3000); }}>
            Update Password
          </Button>
        </div>
      </Card>

      {/* Data Export & Account Deletion */}
      <Card variant="solid" className="p-6 space-y-4">
        <h3 className="font-display font-semibold text-sm text-nc-text flex items-center gap-2 pb-2 border-b border-nc-border">
          <Shield className="w-4 h-4 text-nc-violet" />
          <span>Data Rights & Account Deletion</span>
        </h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs pt-1">
          <div className="space-y-1">
            <span className="font-semibold text-nc-text block">Export Personal Artifacts & Passport</span>
            <p className="text-nc-text-muted text-[11px]">
              Download a machine-readable JSON archive of all your verified contributions and missions.
            </p>
          </div>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />} onClick={handleExportData}>
            Export My Data
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs pt-4 border-t border-nc-border">
          <div className="space-y-1">
            <span className="font-semibold text-nc-danger block">Delete Account & Data</span>
            <p className="text-nc-text-muted text-[11px]">
              Permanently purges your account, persona, and credentials in accordance with our Privacy Policy.
            </p>
          </div>
          <Button variant="destructive" size="sm" leftIcon={<Trash2 className="w-3.5 h-3.5" />} onClick={() => alert('Account deletion requested. Support will confirm within 24h.')}>
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
};
