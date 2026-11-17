import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';
import { ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-nc-bg text-nc-text selection:bg-nc-violet/30 selection:text-nc-violet-soft">
      {/* Public Glass Header */}
      <header className="sticky top-0 z-40 w-full nc-glass-nav px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <Logo size="md" className="group-hover:scale-105 transition-transform" />
          <div>
            <span className="font-display font-bold tracking-wider text-nc-text text-sm block">NIGHTCLUB</span>
            <span className="text-[10px] tracking-widest text-nc-text-subtle uppercase block font-medium">BUILD · CONNECT · GROW</span>
          </div>
        </Link>

        {/* Public Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-nc-text-muted">
          <Link to="/" className={`hover:text-nc-text transition-colors ${location.pathname === '/' ? 'text-nc-violet font-semibold' : ''}`}>
            Home
          </Link>
          <Link to="/about" className={`hover:text-nc-text transition-colors ${location.pathname === '/about' ? 'text-nc-violet font-semibold' : ''}`}>
            Philosophy & Ethos
          </Link>
          <Link to="/membership" className={`hover:text-nc-text transition-colors ${location.pathname === '/membership' ? 'text-nc-violet font-semibold' : ''}`}>
            Membership (₹189/mo)
          </Link>
        </nav>

        {/* Header CTAs */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Join Nightclub
            </Button>
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <div className="flex-1">
        <Outlet />
      </div>

      {/* Public Footer */}
      <footer className="border-t border-nc-border bg-nc-surface-1 py-12 px-4 sm:px-8 text-xs text-nc-text-muted">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Logo size="sm" />
              <span className="font-display font-bold text-nc-text text-sm">NIGHTCLUB</span>
            </div>
            <p className="text-nc-text-subtle text-[11px] leading-relaxed">
              Founder Labs by Nitish. An intelligent builder execution network turning skills and goals into complementary squads, verified proof, and real career and startup opportunities.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-nc-text-subtle pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-nc-success" />
              <span>₹189/mo Transparent AutoPay · Cancel Anytime</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-nc-text mb-3 text-xs uppercase tracking-wider">Product Loop</h4>
            <ul className="space-y-2 text-[11px]">
              <li><Link to="/about" className="hover:text-nc-text">Understand Me (Persona)</Link></li>
              <li><Link to="/app/find-your-four" className="hover:text-nc-text">Find Your Four (Squad)</Link></li>
              <li><Link to="/app/missions" className="hover:text-nc-text">Build Together (Missions)</Link></li>
              <li><Link to="/app/passport" className="hover:text-nc-text">Prove My Work (Passport)</Link></li>
              <li><Link to="/app/opportunities" className="hover:text-nc-text">Unlock Opportunities</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-nc-text mb-3 text-xs uppercase tracking-wider">Community & Learning</h4>
            <ul className="space-y-2 text-[11px]">
              <li><Link to="/membership" className="hover:text-nc-text">8 Paid Build Sessions / Mo</Link></li>
              <li><Link to="/membership" className="hover:text-nc-text">Google Meet Live Access</Link></li>
              <li><Link to="/membership" className="hover:text-nc-text">WhatsApp Curated Community</Link></li>
              <li><Link to="/about" className="hover:text-nc-text">Anti-Infinite-Scroll Manifesto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-nc-text mb-3 text-xs uppercase tracking-wider">Policies & Legal</h4>
            <ul className="space-y-2 text-[11px]">
              <li><Link to="/terms" className="hover:text-nc-text">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-nc-text">Privacy Policy</Link></li>
              <li><Link to="/refunds" className="hover:text-nc-text">Refund & Cancellation Policy</Link></li>
              <li className="pt-2 text-nc-text-subtle text-[10px]">
                Razorpay AutoPay Compliant · RBI e-Mandate Framework
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-nc-border/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-nc-text-subtle gap-3">
          <div>© {new Date().getFullYear()} Nightclub (Founder Labs by Nitish). All rights reserved.</div>
          <div className="flex items-center gap-1">
            <HeartHandshake className="w-3.5 h-3.5 text-nc-violet" />
            <span>Built for ambitious, collaborative builders.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
