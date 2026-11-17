import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PullCordLamp } from '../../components/effects/PullCordLamp';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Logo } from '../../components/ui/Logo';
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CreditCard,
  Lock,
} from 'lucide-react';

export const PullCordLampSignup: React.FC = () => {
  const navigate = useNavigate();

  // Lamp & Lighting state
  const [isLampOn, setIsLampOn] = useState(false);

  // Registration step (1: Account Details, 2: Razorpay AutoPay Confirmation)
  const [step, setStep] = useState<1 | 2>(1);

  // Form Fields State (preserved even if lamp is toggled off)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle Form Submission
  const handleStepOneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms of Service & Privacy Policy.');
      return;
    }

    // Move to Razorpay AutoPay step
    setStep(2);
  };

  const handleSimulateRazorpay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/app/onboarding');
    }, 1200);
  };

  const handleGoogleSignup = () => {
    setName('Karthik Varma');
    setEmail('karthik@nightclub.build');
    setPassword('SecurePassword123!');
    setConfirmPassword('SecurePassword123!');
    setStep(2);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-nc-bg text-nc-text flex items-center justify-center py-10 px-4 sm:px-6 lg:px-12 select-none">
      {/* 1. ATMOSPHERIC SPOTLIGHT CONE & ROOM ILLUMINATION */}
      {/* Dynamic ambient violet glow filling room when light is engaged */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out ${
          isLampOn ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 90% 75% at 28% 30%, rgba(155, 123, 255, 0.22) 0%, rgba(139, 185, 255, 0.10) 40%, rgba(9, 9, 13, 0) 80%)',
        }}
      />

      {/* Large directional spotlight beam spreading across to the right towards form */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-700 ease-out ${
          isLampOn
            ? 'opacity-70 scale-100'
            : 'opacity-0 scale-95'
        }`}
        style={{
          background:
            'radial-gradient(circle 700px at 32% 35%, rgba(185, 166, 255, 0.16) 0%, rgba(139, 185, 255, 0.05) 55%, transparent 75%)',
        }}
      />

      {/* 2. MAIN TWO-COLUMN RESPONSIVE GRID */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT COLUMN: THE PHYSICAL PULL-CORD LAMP */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
          {/* Brand Eyebrow */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nc-surface-2/80 border border-nc-border text-nc-text-muted text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-nc-violet" />
              <span>NIGHTCLUB EXECUTION NETWORK</span>
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-nc-text mb-2">
            Step Into The Light
          </h1>
          <p className="text-xs text-nc-text-muted max-w-sm mb-6 leading-relaxed">
            Ambitious builders code after dark. Pull the lamp cord below to illuminate the room and create your member passport.
          </p>

          {/* Realistic SVG Pull-Cord Lamp Component */}
          <PullCordLamp
            isLampOn={isLampOn}
            onToggle={(state) => setIsLampOn(state)}
          />
        </div>

        {/* RIGHT COLUMN: THE ILLUMINATED SIGNUP CARD */}
        <div className="lg:col-span-7 flex items-center justify-center w-full">
          {/* The form card smoothly emerges when lamp turns ON */}
          <div
            className={`w-full max-w-lg transition-all duration-700 ease-out ${
              isLampOn
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto blur-0'
                : 'opacity-0 translate-y-8 scale-95 pointer-events-none blur-sm'
            }`}
            aria-hidden={!isLampOn}
          >
            <Card
              variant="glass"
              className="p-6 sm:p-8 space-y-6 relative border border-nc-violet/30 shadow-glow-violet backdrop-blur-2xl bg-nc-surface-1/80"
            >
              {/* Card Header */}
              <div className="border-b border-nc-border/80 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Logo size="sm" />
                    <span className="font-display font-bold text-sm tracking-wider text-nc-text">
                      NIGHTCLUB
                    </span>
                  </div>
                  <Badge variant="violet" className="text-[10px]">
                    {step === 1 ? 'Step 1 of 2' : 'Step 2 of 2'}
                  </Badge>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-bold text-nc-text mt-3">
                  {step === 1 ? 'Create Your Builder Account' : 'Membership AutoPay Authorization'}
                </h2>
                <p className="text-xs text-nc-text-muted mt-1 leading-relaxed">
                  {step === 1
                    ? 'Join the network to find your squad, attend 8 live sessions, and ship real projects.'
                    : 'Transparent ₹189/month builder subscription via Razorpay AutoPay.'}
                </p>
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3 rounded-lg bg-nc-danger/15 border border-nc-danger/30 text-nc-danger text-xs">
                  {errorMessage}
                </div>
              )}

              {/* STEP 1: REGISTRATION CREDENTIALS */}
              {step === 1 && (
                <form onSubmit={handleStepOneSubmit} className="space-y-4">
                  {/* Google Quick Sign-Up */}
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg bg-nc-surface-2 hover:bg-nc-surface-3 border border-nc-border text-xs font-semibold text-nc-text transition-all hover:border-nc-violet/40"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <div className="relative flex items-center justify-center my-3">
                    <div className="border-t border-nc-border w-full" />
                    <span className="bg-nc-surface-1 px-3 text-[10px] text-nc-text-subtle uppercase tracking-wider absolute">
                      or with email
                    </span>
                  </div>

                  <Input
                    label="Full Name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Karthik Varma"
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="builder@example.com"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <Input
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-8 text-nc-text-subtle hover:text-nc-text"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <Input
                      label="Confirm Password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                    />
                  </div>

                  {/* Terms & Privacy Consent */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-nc-text-muted">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 rounded border-nc-border bg-nc-surface-2 accent-nc-violet mt-0.5"
                      />
                      <span>
                        I agree to the Nightclub{' '}
                        <Link to="/terms" target="_blank" className="text-nc-violet-soft underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" target="_blank" className="text-nc-violet-soft underline">
                          Privacy Policy
                        </Link>
                        . Personal contact information remains confidential.
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-2"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Continue to Membership (₹189/mo)
                  </Button>
                </form>
              )}

              {/* STEP 2: RAZORPAY AUTOPAY SIMULATION & CONFIRMATION */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-nc-surface-2 border border-nc-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-nc-text">Nightclub Monthly Builder</span>
                      <span className="font-display text-xl font-bold text-nc-violet">₹189 / mo</span>
                    </div>

                    <ul className="text-xs text-nc-text-muted space-y-2 pt-2 border-t border-nc-border">
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-nc-success" />
                        <span>8 Included alternate-night live build sessions with Nitish</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-nc-success" />
                        <span>Google Meet live access & code tear-downs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-nc-success" />
                        <span>Find Your Four 5-person squad matching</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-nc-success" />
                        <span>Curated WhatsApp community access</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-lg bg-nc-surface-2/60 border border-nc-border text-[11px] text-nc-text-subtle flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-nc-success shrink-0 mt-0.5" />
                    <span>
                      <strong>RBI e-Mandate Framework:</strong> Monthly AutoPay via card or UPI. Pre-debit notification sent 24h prior. Cancel anytime in 1-click from your account settings.
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="w-1/3">
                      Back
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleSimulateRazorpay}
                      isLoading={isProcessing}
                      className="w-2/3"
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                    >
                      Authorize ₹189 via Razorpay
                    </Button>
                  </div>
                </div>
              )}

              {/* Card Footer: Sign In Link */}
              <div className="pt-3 border-t border-nc-border/80 text-center text-xs text-nc-text-muted">
                Already an active member?{' '}
                <Link to="/login" className="text-nc-violet font-semibold hover:underline">
                  Sign In to Workspace
                </Link>
              </div>
            </Card>
          </div>

          {/* Prompt when lamp is OFF */}
          {!isLampOn && (
            <div className="absolute text-center pointer-events-none transition-opacity duration-500 text-xs text-nc-text-subtle max-w-xs">
              <Lock className="w-5 h-5 text-nc-text-subtle mx-auto mb-2 opacity-50" />
              <span>Pull the lamp cord on the left to illuminate the registration terminal.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
