import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  Users,
  MessageSquare,
  Check,
  X,
  Clock,
  Shield,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { apiClient } from '../../lib/api/client';
import { Connection } from '../../types';

export const ConnectionsPage: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [activeTab, setActiveTab] = useState<'accepted' | 'pending'>('accepted');

  useEffect(() => {
    async function load() {
      const data = await apiClient.getConnections();
      setConnections(data);
    }
    load();
  }, []);

  const handleAccept = async (connId: string) => {
    const updated = await apiClient.acceptConnection(connId);
    setConnections(prev => prev.map(c => c.id === connId ? updated : c));
  };

  const acceptedList = connections.filter(c => c.status === 'accepted');
  const pendingList = connections.filter(c => c.status === 'pending_sent' || c.status === 'pending_received');

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-nc-border pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="violet">Network Introductions</Badge>
          <span className="text-xs text-nc-text-subtle">Privacy Protected</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">
          Connections & Collaboration Requests
        </h1>
        <p className="text-xs text-nc-text-muted max-w-2xl">
          Accepted connections unlock direct in-app messaging. Personal contact details remain hidden by default to ensure privacy and safety.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-nc-border pb-2 text-xs">
        <button
          onClick={() => setActiveTab('accepted')}
          className={`flex items-center gap-2 pb-2 px-1 font-semibold transition-all relative ${
            activeTab === 'accepted' ? 'text-nc-violet border-b-2 border-nc-violet' : 'text-nc-text-muted hover:text-nc-text'
          }`}
        >
          <span>Active Connections</span>
          <span className="px-1.5 py-0.5 rounded-full bg-nc-surface-2 text-[10px]">
            {acceptedList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center gap-2 pb-2 px-1 font-semibold transition-all relative ${
            activeTab === 'pending' ? 'text-nc-violet border-b-2 border-nc-violet' : 'text-nc-text-muted hover:text-nc-text'
          }`}
        >
          <span>Pending Requests</span>
          {pendingList.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-nc-warning/20 text-nc-warning text-[10px]">
              {pendingList.length}
            </span>
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'accepted' ? (
        <div className="space-y-4">
          {acceptedList.length === 0 ? (
            <Card variant="solid" className="p-8 text-center space-y-3">
              <Users className="w-8 h-8 text-nc-text-subtle mx-auto" />
              <h3 className="font-semibold text-sm text-nc-text">No active connections yet</h3>
              <p className="text-xs text-nc-text-muted max-w-sm mx-auto">
                Explore Find Your Four to review complementary builders and request introductions.
              </p>
              <Link to="/app/find-your-four">
                <Button size="sm">Explore Find Your Four</Button>
              </Link>
            </Card>
          ) : (
            acceptedList.map(conn => (
              <Card key={conn.id} variant="solid" className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={conn.user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96'}
                    alt={conn.user.name}
                    className="w-12 h-12 rounded-full object-cover border border-nc-border"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-sm text-nc-text">{conn.user.name}</h3>
                      <Badge variant="success" className="text-[10px] py-0">Connected</Badge>
                    </div>
                    <p className="text-xs text-nc-text-subtle mt-0.5">{conn.user.headline || 'Builder'}</p>
                    <p className="text-[11px] text-nc-text-muted mt-1 italic">
                      "{conn.note || 'Active squad collaborator'}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <Link to={`/app/members/${conn.user.id}`}>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </Link>
                  <Link to={`/app/messages/${conn.user.id}`}>
                    <Button variant="primary" size="sm" leftIcon={<MessageSquare className="w-3.5 h-3.5" />}>
                      Direct Message
                    </Button>
                  </Link>
                </div>
              </Card>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {pendingList.length === 0 ? (
            <Card variant="solid" className="p-8 text-center text-xs text-nc-text-muted">
              No pending requests right now.
            </Card>
          ) : (
            pendingList.map(conn => (
              <Card key={conn.id} variant="solid" className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={conn.user.avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96'}
                    alt={conn.user.name}
                    className="w-12 h-12 rounded-full object-cover border border-nc-border"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-sm text-nc-text">{conn.user.name}</h3>
                      <Badge variant="warning" className="text-[10px]">
                        {conn.status === 'pending_sent' ? 'Request Sent' : 'Request Received'}
                      </Badge>
                    </div>
                    <p className="text-xs text-nc-text-subtle mt-0.5">{conn.user.headline || 'Builder'}</p>
                    <p className="text-[11px] text-nc-text-muted mt-1">
                      Context: {conn.note || 'Requested squad collaboration'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {conn.status === 'pending_received' ? (
                    <>
                      <Button variant="primary" size="sm" onClick={() => handleAccept(conn.id)}>
                        Accept Introduction
                      </Button>
                      <Button variant="outline" size="sm">
                        Decline
                      </Button>
                    </>
                  ) : (
                    <span className="text-xs text-nc-text-subtle flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Awaiting response
                    </span>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};
