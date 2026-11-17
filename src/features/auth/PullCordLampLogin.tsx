import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PullCordLamp } from '../../components/effects/PullCordLamp';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Logo } from '../../components/ui/Logo';
import {
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  Sparkles,
  LogIn,
} from 'lucide-react';

export const PullCordLampLogin: React.FC = () => {
  const navigate = useNavigate();

  // Lamp & lighting state
  const [isLampOn, setIsLampOn] = useState(false);

  // Form fields (preserved even if lamp is toggled off)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    // Demo credentials check
    if (email !== 'karthik@nightclub.build' || password !== 'password123') {
      setErrorMessage('Invalid credentials. Use karthik@nightclub.build / password123');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/app');
    }, 600);
  };

  const handleGoogleLogin = () => {
    setEmail('karthik@nightclub.build');
    setPassword('password123');
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/app');
    }, 800);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-nc-bg text-nc-text flex items-center justify-center py-10 px-4 sm:px-6 lg:px-12 select-none">
      {/* 1. ATMOSPHERIC ROOM GLOW — only when lamp is ON */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out ${
          isLampOn ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 90% 75% at 28% 30%, rgba(155, 123, 255, 0.22) 0%, rgba(139, 185, 255, 0.10) 40%, rgba(9, 9, 13, 0) 80%)',
        }}
      />

      {/* Directional spotlight beam towards the form */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-700 ease-out ${
          isLampOn ? 'opacity-70 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          background:
            'radial-gradient(circle 700px at 32% 35%, rgba(185, 166, 255, 0.16) 0%, rgba(139, 185, 255, 0.05) 55%, transparent 75%)',
        }}
      />

      {/* 2. MAIN TWO-COLUMN GRID */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

        {/* LEFT COLUMN: PULL-CORD LAMP */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
          {/* Brand Eyebrow */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-nc-surface-2/80 border border-nc-border text-nc-text-muted text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-nc-violet" />
              <span>NIGHTCLUB EXECUTION NETWORK</span>
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-nc-text mb-2">
            Welcome Back
          </h1>
          <p className="text-xs text-nc-text-muted max-w-sm mb-6 leading-relaxed">
            The network stays dark until you arrive. Pull the cord to light up your workspace and sign in.
          </p>

          {/* Pull-Cord Lamp */}
          <PullCordLamp
            isLampOn={isLampOn}
            onToggle={(state) => setIsLampOn(state)}
          />
        </div>

        {/* RIGHT COLUMN: THE SIGN-IN CARD */}
        <div className="lg:col-span-7 flex items-center justify-center w-full relative">
          {/* Form card — emerges from darkness when lamp turns ON */}
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
                <div className="flex items-center gap-2.5 mb-3">
                  <Logo size="sm" />
                  <span className="font-display font-bold text-sm tracking-wider text-nc-text">
                    NIGHTCLUB
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-bold text-nc-text">
                  Sign In to Your Workspace
                </h2>
                <p className="text-xs text-nc-text-muted mt-1 leading-relaxed">
                  Continue building with your squad. Your passport and progress are waiting.
                </p>
              </div>

              {/* Error Alert */}
              <AnimatePresence>
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="p-3 rounded-lg bg-nc-danger/15 border border-nc-danger/30 text-nc-danger text-xs"
                  >
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* LOGIN FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
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

                {/* Email */}
                <Input
                  label="Email Address"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="builder@example.com"
                />

                {/* Password */}
                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-nc-text-subtle hover:text-nc-text"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Remember Me + Forgot Password row */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[11px] text-nc-text-muted">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-nc-border bg-nc-surface-2 accent-nc-violet"
                    />
                    <span>Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[11px] text-nc-violet hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Demo credentials hint */}
                <div className="p-2.5 rounded-lg bg-nc-surface-2/60 border border-nc-border text-[10px] text-nc-text-subtle font-mono">
                  Demo: karthik@nightclub.build · password123
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full mt-2"
                  size="md"
                  isLoading={isProcessing}
                  rightIcon={<LogIn className="w-4 h-4" />}
                >
                  Sign In to Workspace
                </Button>
              </form>

              {/* Card Footer */}
              <div className="pt-3 border-t border-nc-border/80 text-center text-xs text-nc-text-muted">
                Not a member yet?{' '}
                <Link to="/register" className="text-nc-violet font-semibold hover:underline">
                  Join Nightclub
                </Link>
              </div>
            </Card>
          </div>

          {/* Prompt when lamp is OFF */}
          {!isLampOn && (
            <div className="absolute text-center pointer-events-none transition-opacity duration-500 text-xs text-nc-text-subtle max-w-xs">
              <Lock className="w-5 h-5 text-nc-text-subtle mx-auto mb-2 opacity-50" />
              <span>Pull the lamp cord on the left to illuminate the sign-in terminal.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
