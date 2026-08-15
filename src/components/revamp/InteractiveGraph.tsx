'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Smartphone,
  Cloud,
  Zap,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Network,
  ShieldCheck,
  Activity,
  Send
} from 'lucide-react';

interface ServicePillar {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  tagline: string;
  technologies: string[];
  deliverables: string[];
  metrics: { label: string; value: string };
  gradient: string;
  color: string;
}

const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'web',
    title: 'Web Engineering',
    category: 'FULL-STACK WEB',
    icon: Globe,
    tagline: 'Custom web platforms, SaaS apps, and responsive client portals.',
    technologies: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js'],
    deliverables: ['Custom Web Applications', 'Admin Dashboards', 'E-Commerce Portals', 'SEO Optimized Sites'],
    metrics: { label: 'Avg Speed Score', value: '98/100' },
    gradient: 'from-sky-500 via-blue-600 to-cyan-400',
    color: '#38bdf8'
  },
  {
    id: 'mobile',
    title: 'Mobile Applications',
    category: 'CROSS-PLATFORM MOBILE',
    icon: Smartphone,
    tagline: 'High-performance iOS & Android apps with native speed and smooth touch physics.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'Offline Sync', 'Push Notifications'],
    deliverables: ['iOS & Android Apps', 'App Store Deployment', 'Offline First Storage', 'Biometric Auth'],
    metrics: { label: 'User Rating', value: '4.9 ★' },
    gradient: 'from-cyan-400 via-teal-500 to-emerald-400',
    color: '#22d3ee'
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    category: 'DEVOPS & BACKEND',
    icon: Cloud,
    tagline: 'Autoscaling backend servers, cloud databases, and automated deployment pipelines.',
    technologies: ['AWS', 'Google Cloud', 'Docker', 'PostgreSQL / Firestore', 'REST / GraphQL'],
    deliverables: ['CI/CD Pipelines', 'Database Architecture', 'Microservices', 'Security Patching'],
    metrics: { label: 'System Uptime', value: '99.99%' },
    gradient: 'from-blue-600 via-indigo-600 to-sky-400',
    color: '#60a5fa'
  },
  {
    id: 'ai',
    title: 'AI & Smart Automation',
    category: 'INTELLIGENT SYSTEMS',
    icon: Zap,
    tagline: 'Generative AI assistants, automated data extraction, and intelligent workflow bots.',
    technologies: ['Gemini API', 'LLM Agents', 'Python', 'Vector DBs', 'Custom AI Pipelines'],
    deliverables: ['AI Chat Assistants', 'Smart Search Engines', 'Document Parsers', 'Workflow Automation'],
    metrics: { label: 'Response Time', value: '<80ms' },
    gradient: 'from-emerald-400 via-cyan-400 to-blue-500',
    color: '#34d399'
  }
];

interface InteractiveGraphProps {
  onContactClick?: () => void;
}

export const InteractiveGraph: React.FC<InteractiveGraphProps> = ({ onContactClick }) => {
  const [activePillarId, setActivePillarId] = useState<string>('web');

  const activePillar = SERVICE_PILLARS.find((p) => p.id === activePillarId) || SERVICE_PILLARS[0];

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="graph" className="relative py-24 bg-[#030712] overflow-hidden border-t border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="glow-orb w-[600px] h-[600px] bg-sky-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Network className="w-3.5 h-3.5 text-cyan-300" />
            <span>HOW DIGIORB WORKS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our Connected Engine for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">
              Your Digital Success
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We simplify software development by connecting your business goals directly to high-performance code, cloud infrastructure, and modern user experiences.
          </p>
        </div>

        {/* 3-Step Flow Diagram Header Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-center">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-3">
            <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center shrink-0">1</span>
            <span className="text-slate-300 font-semibold">Your Vision & Scope</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-3">
            <span className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-bold flex items-center justify-center shrink-0">2</span>
            <span className="text-cyan-300 font-bold">TheDigiOrb Core Engine</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0">3</span>
            <span className="text-slate-300 font-semibold">Deployed Business Result</span>
          </div>
        </div>

        {/* Main Pillar Selector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SERVICE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isActive = pillar.id === activePillarId;

            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`relative p-5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between space-y-4 group overflow-hidden ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isActive && (
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.gradient}`} />
                )}

                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-xl transition-colors ${
                      isActive
                        ? `bg-gradient-to-br ${pillar.gradient} text-slate-950 font-bold shadow-md`
                        : 'bg-slate-800 text-slate-400 group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-mono font-bold text-slate-500 group-hover:text-slate-400">
                    {pillar.category}
                  </span>
                </div>

                <div>
                  <h3 className={`text-base font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {pillar.tagline}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <span className={isActive ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
                    {pillar.metrics.value}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? 'text-cyan-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Detailed Connected View Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Ambient Background Accent */}
            <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${activePillar.gradient} opacity-10 blur-3xl pointer-events-none`} />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Column: Pillar Summary */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 text-cyan-300 text-xs font-mono font-bold uppercase">
                  <Activity className="w-3.5 h-3.5 text-cyan-300" />
                  <span>ACTIVE ARCHITECTURE NODE</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {activePillar.title}
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {activePillar.tagline}
                  </p>
                </div>

                {/* Key Metric Card */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono uppercase">Key Outcome Metric</span>
                  <div className="text-right">
                    <span className="text-xl font-bold font-mono text-cyan-300 block">{activePillar.metrics.value}</span>
                    <span className="text-[10px] text-slate-500 font-mono block">{activePillar.metrics.label}</span>
                  </div>
                </div>

                {/* Included Tech Stack Pills */}
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase block">
                    Core Technologies & Frameworks
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activePillar.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-slate-200 flex items-center gap-1.5"
                      >
                        <Cpu className="w-3.5 h-3.5 text-sky-400" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Call To Action */}
                <div className="pt-2">
                  <button
                    onClick={handleContactClick}
                    className="px-6 py-3.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 hover:opacity-95 shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>BUILD THIS SOLUTION WITH US</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Deliverables Checklist Card */}
              <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-cyan-300" />
                    <h4 className="text-base font-bold text-white">What We Deliver</h4>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">100% PRODUCTION READY</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {activePillar.deliverables.map((item) => (
                    <div
                      key={item}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-200 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Architecture Quality Highlights */}
                <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    <span>Clean & Scalable Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    <span>Responsive UI Systems</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Micro Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 font-mono">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-2xl font-black text-sky-400 block">40+</span>
            <span className="text-xs text-slate-400 block mt-0.5">Projects Delivered</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-2xl font-black text-cyan-300 block">99.9%</span>
            <span className="text-xs text-slate-400 block mt-0.5">Uptime Standard</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-2xl font-black text-emerald-400 block">&lt;100ms</span>
            <span className="text-xs text-slate-400 block mt-0.5">Average Latency</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
            <span className="text-2xl font-black text-blue-400 block">100%</span>
            <span className="text-xs text-slate-400 block mt-0.5">Code Coverage</span>
          </div>
        </div>
      </div>
    </section>
  );
};