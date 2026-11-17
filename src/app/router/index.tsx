import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AppLayout } from '../layouts/AppLayout';

// Public Pages
import { LandingPage } from '../../features/public/LandingPage';
import { AboutPage } from '../../features/public/AboutPage';
import { MembershipPublicPage } from '../../features/public/MembershipPublicPage';
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from '../../features/public/AuthPages';
import { TermsPage, PrivacyPage, RefundsPage } from '../../features/public/LegalPages';

// Onboarding
import { OnboardingPage } from '../../features/onboarding/OnboardingPage';

// Member Application Pages
import { HomeDashboard } from '../../features/home/HomeDashboard';
import { FindYourFourPage } from '../../features/matching/FindYourFourPage';
import { DiscoverPage } from '../../features/discover/DiscoverPage';
import { MemberProfilePage } from '../../features/matching/MemberProfilePage';
import { ConnectionsPage } from '../../features/connections/ConnectionsPage';
import { MessagesPage } from '../../features/messages/MessagesPage';
import { CirclesPage } from '../../features/circles/CirclesPage';
import { CircleWorkspacePage } from '../../features/circles/CircleWorkspacePage';
import { MissionsPage } from '../../features/missions/MissionsPage';
import { MissionDetailPage } from '../../features/missions/MissionDetailPage';
import { SessionsPage } from '../../features/sessions/SessionsPage';
import { OpportunitiesPage } from '../../features/opportunities/OpportunitiesPage';
import { BuilderPassportPage } from '../../features/passport/BuilderPassportPage';
import { ProfileEditPage } from '../../features/profile/ProfileEditPage';
import { MembershipDashboardPage } from '../../features/membership/MembershipDashboardPage';
import { NotificationsPage } from '../../features/notifications/NotificationsPage';
import { SettingsPage } from '../../features/settings/SettingsPage';

export const router = createBrowserRouter([
  // Public Landing & Marketing
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'membership', element: <MembershipPublicPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'refunds', element: <RefundsPage /> },
    ],
  },

  // Onboarding
  {
    path: '/app/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/onboarding',
    element: <Navigate to="/app/onboarding" replace />,
  },

  // Member Protected Application Shell
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomeDashboard /> },
      { path: 'find-your-four', element: <FindYourFourPage /> },
      { path: 'discover', element: <DiscoverPage /> },
      { path: 'members/:id', element: <MemberProfilePage /> },
      { path: 'connections', element: <ConnectionsPage /> },
      { path: 'messages', element: <MessagesPage /> },
      { path: 'messages/:id', element: <MessagesPage /> },
      { path: 'circles', element: <CirclesPage /> },
      { path: 'circles/:id', element: <CircleWorkspacePage /> },
      { path: 'missions', element: <MissionsPage /> },
      { path: 'missions/:id', element: <MissionDetailPage /> },
      { path: 'sessions', element: <SessionsPage /> },
      { path: 'sessions/:id', element: <SessionsPage /> },
      { path: 'opportunities', element: <OpportunitiesPage /> },
      { path: 'opportunities/:id', element: <OpportunitiesPage /> },
      { path: 'passport', element: <BuilderPassportPage /> },
      { path: 'profile', element: <ProfileEditPage /> },
      { path: 'membership', element: <MembershipDashboardPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },

  // Fallback Catch-all
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
