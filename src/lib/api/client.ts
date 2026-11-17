import {
  User,
  MatchCandidate,
  BuilderCircle,
  BuildMission,
  MissionTask,
  Session,
  Opportunity,
  BuilderPassportData,
  MembershipDetails,
  NotificationItem,
  Conversation,
  Message,
  Connection,
  BuilderPersona
} from '../../types';
import {
  currentUser as initialUser,
  mockCandidates as initialCandidates,
  mockCircles as initialCircles,
  mockMissions as initialMissions,
  mockSessions as initialSessions,
  mockOpportunities as initialOpportunities,
  mockPassport as initialPassport,
  mockMembership as initialMembership,
  mockNotifications as initialNotifications,
  mockConversations as initialConversations,
  mockConnections as initialConnections
} from '../mockData';

// Local reactive storage for interactive prototype state
let activeUser: User = { ...initialUser };
let activeCandidates: MatchCandidate[] = [...initialCandidates];
let activeCircles: BuilderCircle[] = [...initialCircles];
let activeMissions: BuildMission[] = [...initialMissions];
let activeSessions: Session[] = [...initialSessions];
let activeOpportunities: Opportunity[] = [...initialOpportunities];
let activePassport: BuilderPassportData = { ...initialPassport };
let activeMembership: MembershipDetails = { ...initialMembership };
let activeNotifications: NotificationItem[] = [...initialNotifications];
let activeConversations: Conversation[] = [...initialConversations];
let activeConnections: Connection[] = [...initialConnections];

export const apiClient = {
  // Auth & Profile
  async getCurrentUser(): Promise<User> {
    return { ...activeUser };
  },

  async updatePersona(persona: Partial<BuilderPersona>): Promise<User> {
    if (activeUser.persona) {
      activeUser.persona = { ...activeUser.persona, ...persona };
    }
    return { ...activeUser };
  },

  // Find Your Four & Matches
  async getFindYourFour(): Promise<MatchCandidate[]> {
    return [...activeCandidates];
  },

  async requestIntroduction(candidateId: string, _customNote?: string): Promise<{ success: boolean; candidate: MatchCandidate }> {
    const candidate = activeCandidates.find(c => c.id === candidateId);
    if (!candidate) throw new Error('Candidate not found');
    candidate.status = 'requested';

    // Also add to sent connections
    const existingConn = activeConnections.find(c => c.user.id === candidateId);
    if (!existingConn) {
      activeConnections.push({
        id: `conn_${Date.now()}`,
        user: {
          id: candidate.id,
          name: candidate.name,
          email: `${candidate.name.toLowerCase().replace(' ', '.')}@example.com`,
          avatar: candidate.avatar,
          headline: candidate.role,
          isPaidMember: true,
          memberSince: 'Nov 2026',
        },
        connectedSince: 'Pending',
        status: 'pending_sent',
        note: candidate.proposedContribution,
      });
    }

    return { success: true, candidate: { ...candidate } };
  },

  async dismissCandidate(candidateId: string): Promise<{ success: boolean }> {
    const candidate = activeCandidates.find(c => c.id === candidateId);
    if (candidate) {
      candidate.status = 'declined';
    }
    return { success: true };
  },

  async saveCandidate(candidateId: string): Promise<{ success: boolean }> {
    const candidate = activeCandidates.find(c => c.id === candidateId);
    if (candidate) {
      candidate.status = 'saved';
    }
    return { success: true };
  },

  // Connections
  async getConnections(): Promise<Connection[]> {
    return [...activeConnections];
  },

  async acceptConnection(connectionId: string): Promise<Connection> {
    const conn = activeConnections.find(c => c.id === connectionId);
    if (!conn) throw new Error('Connection not found');
    conn.status = 'accepted';
    conn.connectedSince = 'Just now';

    // Initialize conversation if not exists
    if (!activeConversations.some(cv => cv.id === conn.user.id)) {
      activeConversations.unshift({
        id: conn.user.id,
        participant: conn.user as User,
        unreadCount: 0,
        updatedAt: 'Just now',
        lastMessage: {
          id: `msg_init_${Date.now()}`,
          conversationId: conn.user.id,
          senderId: conn.user.id,
          senderName: conn.user.name,
          content: 'Excited to connect! Looking forward to building together.',
          createdAt: 'Just now',
          isDelivered: true,
          isRead: true,
        },
      });
    }

    return { ...conn };
  },

  async blockUser(userId: string): Promise<{ success: boolean }> {
    activeConnections = activeConnections.filter(c => c.user.id !== userId);
    activeCandidates = activeCandidates.filter(c => c.id !== userId);
    activeConversations = activeConversations.filter(c => c.id !== userId);
    return { success: true };
  },

  // Direct Messages
  async getConversations(): Promise<Conversation[]> {
    return [...activeConversations];
  },

  async getMessages(conversationId: string): Promise<Message[]> {
    const conv = activeConversations.find(c => c.id === conversationId);
    if (!conv || !conv.lastMessage) return [];
    return [
      {
        id: `msg_hist_1`,
        conversationId,
        senderId: conversationId,
        senderName: conv.participant.name,
        senderAvatar: conv.participant.avatar,
        content: `Hey Karthik! Saw your goal alignment on startup building and your work with Web Audio and LLMs.`,
        createdAt: '2 days ago',
        isDelivered: true,
        isRead: true,
      },
      {
        id: `msg_hist_2`,
        conversationId,
        senderId: activeUser.id,
        senderName: activeUser.name,
        senderAvatar: activeUser.avatar,
        content: `Thanks for connecting! Yes, we are currently structuring the Project Akshara speech pipeline and could use your expertise.`,
        createdAt: '1 day ago',
        isDelivered: true,
        isRead: true,
      },
      conv.lastMessage,
    ];
  },

  async sendMessage(conversationId: string, content: string): Promise<Message> {
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      conversationId,
      senderId: activeUser.id,
      senderName: activeUser.name,
      senderAvatar: activeUser.avatar,
      content,
      createdAt: 'Just now',
      isDelivered: true,
      isRead: false,
    };

    const conv = activeConversations.find(c => c.id === conversationId);
    if (conv) {
      conv.lastMessage = newMessage;
      conv.updatedAt = 'Just now';
    }

    return newMessage;
  },

  // Circles & Missions
  async getCircles(): Promise<BuilderCircle[]> {
    return [...activeCircles];
  },

  async getCircleById(id: string): Promise<BuilderCircle | undefined> {
    return activeCircles.find(c => c.id === id);
  },

  async getMissions(): Promise<BuildMission[]> {
    return [...activeMissions];
  },

  async getMissionById(id: string): Promise<BuildMission | undefined> {
    return activeMissions.find(m => m.id === id);
  },

  async updateTaskStatus(missionId: string, taskId: string, newStatus: MissionTask['status']): Promise<BuildMission> {
    const mission = activeMissions.find(m => m.id === missionId);
    if (!mission) throw new Error('Mission not found');
    const task = mission.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = newStatus;
      const doneCount = mission.tasks.filter(t => t.status === 'done').length;
      mission.progressPercent = Math.round((doneCount / mission.tasks.length) * 100);
    }
    return { ...mission };
  },

  // Sessions
  async getSessions(): Promise<Session[]> {
    return [...activeSessions];
  },

  async toggleSessionRsvp(sessionId: string): Promise<Session> {
    const session = activeSessions.find(s => s.id === sessionId);
    if (!session) throw new Error('Session not found');
    session.rsvpStatus = session.rsvpStatus === 'attending' ? 'not_attending' : 'attending';
    return { ...session };
  },

  // Opportunities
  async getOpportunities(): Promise<Opportunity[]> {
    return [...activeOpportunities];
  },

  async toggleSaveOpportunity(oppId: string): Promise<Opportunity> {
    const opp = activeOpportunities.find(o => o.id === oppId);
    if (!opp) throw new Error('Opportunity not found');
    opp.saved = !opp.saved;
    return { ...opp };
  },

  async applyToOpportunity(oppId: string): Promise<Opportunity> {
    const opp = activeOpportunities.find(o => o.id === oppId);
    if (!opp) throw new Error('Opportunity not found');
    opp.applied = true;
    return { ...opp };
  },

  // Passport
  async getPassport(): Promise<BuilderPassportData> {
    return { ...activePassport };
  },

  // Membership & Billing
  async getMembership(): Promise<MembershipDetails> {
    return { ...activeMembership };
  },

  async cancelMembership(): Promise<MembershipDetails> {
    activeMembership.cancelAtPeriodEnd = true;
    return { ...activeMembership };
  },

  async reactivateMembership(): Promise<MembershipDetails> {
    activeMembership.cancelAtPeriodEnd = false;
    return { ...activeMembership };
  },

  // Notifications
  async getNotifications(): Promise<NotificationItem[]> {
    return [...activeNotifications];
  },

  async markNotificationRead(id: string): Promise<{ success: boolean }> {
    const notif = activeNotifications.find(n => n.id === id);
    if (notif) notif.isRead = true;
    return { success: true };
  },

  async markAllNotificationsRead(): Promise<{ success: boolean }> {
    activeNotifications.forEach(n => (n.isRead = true));
    return { success: true };
  },
};
