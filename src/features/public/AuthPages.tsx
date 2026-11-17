// AuthPages.tsx
// LoginPage and RegisterPage both use the interactive Pull-Cord Lamp experience.
// ForgotPasswordPage and ResetPasswordPage are standard utility forms.

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Check } from 'lucide-react';

// --- LAMP-POWERED PAGES ---

import { PullCordLampLogin } from '../auth/PullCordLampLogin';
export const LoginPage = PullCordLampLogin;

import { PullCordLampSignup } from '../auth/PullCordLampSignup';
export const RegisterPage = PullCordLampSignup;

// --- UTILITY AUTH PAGES ---

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-20 px-4 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card variant="solid" className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="violet" className="mb-1">Recovery</Badge>
          <h1 className="font-display text-2xl font-bold text-nc-text">Reset Password</h1>
          <p className="text-xs text-nc-text-muted">
            Enter your email to receive a secure password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 rounded-xl bg-nc-surface-2 border border-nc-success/30 text-center space-y-3">
            <Check className="w-8 h-8 text-nc-success mx-auto" />
            <p className="text-xs text-nc-text">
              If an account matches <strong>{email}</strong>, a secure reset link has been dispatched to your inbox.
            </p>
            <Link to="/login" className="block text-xs text-nc-violet font-semibold hover:underline pt-2">
              ← Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="karthik@example.com"
            />
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
            <div className="text-center pt-2">
              <Link to="/login" className="text-xs text-nc-text-muted hover:text-nc-text">
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password && password === confirmPassword) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <div className="py-20 px-4 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card variant="solid" className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="violet" className="mb-1">Security</Badge>
          <h1 className="font-display text-2xl font-bold text-nc-text">Set New Password</h1>
          <p className="text-xs text-nc-text-muted">Choose a strong, unique password for your Nightclub account.</p>
        </div>

        {success ? (
          <div className="p-4 rounded-xl bg-nc-surface-2 border border-nc-success/30 text-center space-y-2">
            <Check className="w-8 h-8 text-nc-success mx-auto" />
            <p className="text-xs text-nc-text font-semibold">Password updated successfully!</p>
            <p className="text-[11px] text-nc-text-subtle">Redirecting to sign in...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="••••••••••••"
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              placeholder="••••••••••••"
            />
            <Button type="submit" className="w-full">
              Update Password
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};
