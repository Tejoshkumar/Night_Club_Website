import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Search,
  Filter,
  Check,
  Compass,
  Users,
  Layers,
  ArrowRight,
  ExternalLink,
  Bookmark,
  Sparkles,
} from 'lucide-react';

interface DiscoverItem {
  id: string;
  type: 'builder' | 'project';
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  evidence: string;
  evidenceUrl?: string;
  intent: string;
}

export const DiscoverPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'builders' | 'projects'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');

  const skillsList = ['All', 'React', 'Python', 'FastAPI', 'Figma', 'PyTorch', 'Go', 'DevRel', 'Audio/Speech'];

  const items: DiscoverItem[] = [
    {
      id: 'd1',
      type: 'builder',
      title: 'Rohit Annam',
      subtitle: 'ML / Data Scientist · 10-20 hrs/wk',
      tags: ['Python', 'PyTorch', 'Hugging Face', 'Whisper'],
      description: 'Fine-tuning compact speech models for conversational Telugu and Hindi. Seeking fullstack frontend collaborators.',
      evidence: 'Benchmark paper & Hugging Face Checkpoint (8.4% WER)',
      evidenceUrl: 'https://huggingface.co',
      intent: 'Seeking squad for multilingual voice apps',
    },
    {
      id: 'd2',
      type: 'project',
      title: 'Project Akshara (Telugu AI Studio)',
      subtitle: 'Active Builder Circle · Sprint 2',
      tags: ['WebSockets', 'React', 'TypeScript', 'AudioWorklet'],
      description: 'Building a low-latency, dialect-aware speech-to-text studio. Live WebSocket streaming pipeline under construction.',
      evidence: 'PR #14: 16kHz Web Audio resampler merged',
      evidenceUrl: 'https://github.com',
      intent: 'Looking for a cloud infra reviewer',
    },
    {
      id: 'd3',
      type: 'builder',
      title: 'Sravani Rayudu',
      subtitle: 'Product Designer · 10-15 hrs/wk',
      tags: ['Figma', 'Design Systems', 'UX Research'],
      description: 'Specializes in accessible nocturnal dark mode interfaces and complex audio visualizer token architectures.',
      evidence: 'Design System Kit for HealthTech with 40+ tokens',
      evidenceUrl: 'https://figma.com',
      intent: 'Pairing with engineers shipping AI tools',
    },
    {
      id: 'd4',
      type: 'project',
      title: 'HyperDoc Vector Search',
      subtitle: 'Completed Builder Mission · Open Source',
      tags: ['Python', 'SQLite Vector', 'FastAPI'],
      description: 'Private on-device document search with zero cloud telemetry. Built during Session #4.',
      evidence: '1,200 open-source downloads on GitHub',
      evidenceUrl: 'https://github.com',
      intent: 'Artifact verified in Builder Passport',
    },
    {
      id: 'd5',
      type: 'builder',
      title: 'Teja Madhav',
      subtitle: 'Cloud & Systems Architect · 10-15 hrs/wk',
      tags: ['Go', 'Kubernetes', 'PostgreSQL', 'Redis'],
      description: 'Distributed systems engineer focusing on high-throughput WebSocket brokers and low-memory vector caches.',
      evidence: 'Sub-millisecond Vector Cache written in Go',
      evidenceUrl: 'https://github.com',
      intent: 'Available for technical architecture reviews',
    },
  ];

  const filteredItems = items.filter(item => {
    const matchesTab = activeTab === 'all' || (activeTab === 'builders' && item.type === 'builder') || (activeTab === 'projects' && item.type === 'project');
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSkill = selectedSkill === 'All' || item.tags.includes(selectedSkill);
    return matchesTab && matchesSearch && matchesSkill;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-nc-border pb-6 space-y-2">
        <Badge variant="violet">Intentional Discovery</Badge>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-nc-text">
          Explore Builders & Active Projects
        </h1>
        <p className="text-xs text-nc-text-muted max-w-2xl">
          Discover verified artifacts, ongoing missions, and complementary skills. Finite by design—no algorithmically forced endless scrolling.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center bg-nc-surface-2 p-1 rounded-xl border border-nc-border">
            {(['all', 'builders', 'projects'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-nc-surface-1 text-nc-text shadow-sm border border-nc-violet/30'
                    : 'text-nc-text-muted hover:text-nc-text'
                }`}
              >
                {tab === 'all' ? 'All Inventory' : tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative sm:w-72">
            <Search className="w-4 h-4 text-nc-text-subtle absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill, title, role..."
              className="w-full pl-9 pr-3 py-2 bg-nc-surface-2 border border-nc-border rounded-lg text-xs text-nc-text placeholder:text-nc-text-subtle focus:outline-none focus:border-nc-violet"
            />
          </div>
        </div>

        {/* Skill Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-nc-text-subtle text-[11px] mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {skillsList.map(skill => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              className={`px-2.5 py-1 rounded-full text-[11px] transition-all whitespace-nowrap ${
                selectedSkill === skill
                  ? 'bg-nc-violet text-nc-bg font-semibold'
                  : 'bg-nc-surface-2 text-nc-text-muted hover:text-nc-text border border-nc-border'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Discovery Results */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-nc-surface-1 border border-nc-border space-y-3">
            <Compass className="w-8 h-8 text-nc-text-subtle mx-auto" />
            <h3 className="font-semibold text-sm text-nc-text">No matches found</h3>
            <p className="text-xs text-nc-text-muted max-w-sm mx-auto">
              Try adjusting your search query or selecting a broader skill filter.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setSearchQuery(''); setSelectedSkill('All'); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          filteredItems.map(item => (
            <Card key={item.id} variant="solid" className="p-5 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-nc-border">
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${item.type === 'builder' ? 'bg-nc-violet/15 text-nc-violet' : 'bg-nc-blue/15 text-nc-blue'}`}>
                    {item.type === 'builder' ? <Users className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm text-nc-text">{item.title}</h3>
                    <p className="text-[11px] text-nc-text-subtle">{item.subtitle}</p>
                  </div>
                </div>

                <Badge variant={item.type === 'builder' ? 'violet' : 'blue'}>
                  {item.intent}
                </Badge>
              </div>

              <p className="text-xs text-nc-text-muted leading-relaxed">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-nc-surface-2 border border-nc-border text-nc-text-subtle">
                    {t}
                  </span>
                ))}
              </div>

              {/* Artifact & Action */}
              <div className="flex items-center justify-between pt-2 border-t border-nc-border text-xs">
                <div className="flex items-center gap-1.5 text-nc-text-subtle text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-nc-violet" />
                  <span>Evidence: {item.evidence}</span>
                </div>

                <div className="flex items-center gap-2">
                  {item.type === 'builder' ? (
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      Inspect Mission
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Finite Stopping Point */}
      <div className="p-6 rounded-xl bg-nc-surface-1 border border-nc-border text-center space-y-2">
        <div className="w-7 h-7 rounded-full bg-nc-surface-2 text-nc-success flex items-center justify-center mx-auto">
          <Check className="w-4 h-4" />
        </div>
        <h4 className="font-semibold text-xs text-nc-text">You've reached the end of today's discovery inventory</h4>
        <p className="text-xs text-nc-text-muted max-w-md mx-auto">
          We respect your time. New missions and squad updates appear only when real code or design milestones are committed.
        </p>
      </div>
    </div>
  );
};
