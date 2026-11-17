export type GoalWeights = {
  startup_building: number; // 0.0 to 1.0
  career_jobs: number;
  freelance_clients: number;
  learning_experiments: number;
};

export type PortfolioLink = {
  id: string;
  title: string;
  url: string;
  type: 'github' | 'figma' | 'live' | 'doc';
};

export type BuilderPersona = {
  role: string;
  bio: string;
  primarySkills: string[];
  secondarySkills: string[];
  skillsOffered: string[];
  skillsSought: string[];
  goals: GoalWeights;
  interests: string[];
  availability: '1-5 hrs/wk' | '5-10 hrs/wk' | '10-20 hrs/wk' | '20+ hrs/wk';
  workingFormat: 'Async-first' | 'Pair-programming' | 'Weekend sprints' | 'Night owls';
  languages: string[];
  timezone: string;
  privacy: {
    profileVisibility: 'public' | 'members_only' | 'connections_only';
    matchingConsent: boolean;
    showInDirectory: boolean;
  };
  portfolioLinks: PortfolioLink[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  headline?: string;
  isPaidMember: boolean;
  memberSince: string;
  persona?: BuilderPersona;
};

export type MatchCandidate = {
  id: string;
  name: string;
  avatar: string;
  role: string;
  primarySkills: string[];
  skillsOffered: string[];
  proposedContribution: string;
  whyThisMatch: string;
  complementaryRole: string;
  availability: string;
  timezoneOverlap: string;
  sampleEvidence: {
    title: string;
    type: string;
    url?: string;
  };
  status: 'available' | 'requested' | 'accepted' | 'declined' | 'saved';
};

export type FindYourFourState = {
  focalUserId: string;
  objective: string;
  teamCoverageScore: number;
  candidates: MatchCandidate[];
};

export type ConnectionStatus = 'none' | 'pending_sent' | 'pending_received' | 'accepted' | 'declined' | 'blocked';

export type Connection = {
  id: string;
  user: User;
  connectedSince: string;
  status: ConnectionStatus;
  note?: string;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  createdAt: string;
  isDelivered: boolean;
  isRead: boolean;
};

export type Conversation = {
  id: string;
  participant: User;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
};

export type CircleMember = {
  userId: string;
  name: string;
  role: string;
  avatar?: string;
  deliverableOwnership: string;
  joinedAt: string;
};

export type CircleMilestone = {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rescoped';
  assignedToName: string;
};

export type BuilderCircle = {
  id: string;
  name: string;
  tagline: string;
  objective: string;
  cadence: string;
  currentMilestone: string;
  workingAgreement: string;
  members: CircleMember[];
  milestones: CircleMilestone[];
  activeMissionId?: string;
  sharedLinks: { title: string; url: string }[];
};

export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

export type MissionTask = {
  id: string;
  title: string;
  assigneeName: string;
  status: TaskStatus;
  evidenceUrl?: string;
};

export type MissionArtifact = {
  id: string;
  title: string;
  type: 'code' | 'design' | 'demo' | 'document';
  url: string;
  submittedBy: string;
  verified: boolean;
  verificationLevel: 'self_reported' | 'peer_acknowledged' | 'artifact_verified';
};

export type BuildMission = {
  id: string;
  title: string;
  description: string;
  circleId: string;
  circleName: string;
  progressPercent: number;
  targetCompletionDate: string;
  skills: string[];
  tasks: MissionTask[];
  milestones: { id: string; title: string; completed: boolean; date: string }[];
  artifacts: MissionArtifact[];
  status: 'active' | 'review' | 'shipped';
};

export type SessionResource = {
  id: string;
  title: string;
  type: 'code' | 'slides' | 'notes' | 'recording';
  downloadUrl?: string;
  isMembersOnly: boolean;
};

export type Session = {
  id: string;
  title: string;
  description: string;
  date: string;
  timeIST: string;
  host: string;
  sessionType: 'Build Session' | 'Live Tear-down' | 'Founder AMA' | 'Peer Review';
  includedInMonthly: boolean; // 8 included sessions per month
  rsvpStatus: 'not_attending' | 'attending';
  googleMeetUrl?: string; // Revealed only to authenticated paying members
  isLiveNow: boolean;
  resources: SessionResource[];
  nextBuildStep: string;
};

export type Opportunity = {
  id: string;
  title: string;
  organization: string;
  type: 'startup_cofounder' | 'career_jobs' | 'freelance_clients' | 'early_customer';
  description: string;
  requirements: string[];
  fitRationale: string;
  remote: boolean;
  compensation: string;
  verifiedSource: string;
  saved: boolean;
  applied: boolean;
};

export type PassportVerificationLevel = 'self_reported' | 'peer_acknowledged' | 'artifact_verified';

export type PassportProject = {
  id: string;
  title: string;
  tagline: string;
  role: string;
  period: string;
  verifiedContributions: string[];
  verificationLevel: PassportVerificationLevel;
  endorsedByPeers: string[];
  artifacts: { title: string; url: string; type: string }[];
};

export type BuilderPassportData = {
  userId: string;
  headline: string;
  statement: string;
  metrics: {
    missionsShipped: number;
    verifiedContributions: number;
    collaboratorCount: number;
  };
  projects: PassportProject[];
};

export type MembershipDetails = {
  status: 'active' | 'past_due' | 'cancelled';
  plan: 'Nightclub Monthly Builder';
  amountINR: number; // 189
  billingInterval: 'monthly';
  nextBillingDate: string;
  sessionsIncludedPerMonth: number; // 8
  sessionsUsedThisMonth: number;
  razorpaySubscriptionId: string;
  cancelAtPeriodEnd: boolean;
  paymentMethodLast4: string;
};

export type NotificationItem = {
  id: string;
  priority: 'transactional' | 'high' | 'medium' | 'low';
  title: string;
  message: string;
  deepLink: string;
  createdAt: string;
  isRead: boolean;
};
