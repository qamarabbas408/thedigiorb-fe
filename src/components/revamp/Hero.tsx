'use client';

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Network, ShieldCheck, Code2, Globe, Smartphone, Palette, Cloud, Activity } from 'lucide-react';

interface HeroProps {
  onContactClick?: () => void;
}

export const RevampHero: React.FC<HeroProps> = () => {
  const { scrollY } = useScroll();
  const yParallaxFast = useTransform(scrollY, [0, 500], [0, -120]);
  const yParallaxSlow = useTransform(scrollY, [0, 500], [0, -50]);
  const opacityParallax = useTransform(scrollY, [0, 350], [1, 0.2]);

  const [activeHeroNode, setActiveHeroNode] = useState<string>('core');

  const heroNodes = [
    { id: 'core', name: 'TheDigiOrb Central Engine', icon: Network, category: 'Core Hub', stats: '100% Sync', color: 'from-sky-500 to-cyan-400' },
    { id: 'web', name: 'Web Engineering', icon: Globe, category: 'Service Node', stats: '25+ Deployed', color: 'from-cyan-400 to-blue-600' },
    { id: 'mobile', name: 'Mobile Apps', icon: Smartphone, category: 'Service Node', stats: '500K Installs', color: 'from-blue-500 to-indigo-600' },
    { id: 'ui', name: 'UI/UX Design', icon: Palette, category: 'Service Node', stats: '60+ Systems', color: 'from-purple-500 to-sky-400' },
    { id: 'cloud', name: 'Cloud Infrastructure', icon: Cloud, category: 'Service Node', stats: '99.9% Uptime', color: 'from-emerald-400 to-teal-600' },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#030712]">
      {/* Background Ambient Glowing Orbs & Animated Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ y: yParallaxSlow }}
          className="glow-orb w-[600px] h-[600px] bg-sky-600/15 top-[-100px] left-[-100px]"
        />
        <motion.div
          style={{ y: yParallaxFast }}
          className="glow-orb w-[700px] h-[700px] bg-blue-600/10 top-[10%] right-[-150px]"
        />
        <div className="glow-orb w-[500px] h-[500px] bg-cyan-500/10 bottom-0 left-[30%]" />

        {/* Digital Grid & Cyber Matrix Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          style={{ opacity: opacityParallax }}
          className="grid lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6 text-left">
            {/* High-Tech Node Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.15)]"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <Network className="w-3.5 h-3.5 text-cyan-300" />
              <span>NODE #01: DIGIORB AGENCY GRAPH</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]"
            >
              The Digital Graph For{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
                Connected Innovation
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal"
            >
              We unify web development, mobile applications, cloud engineering, and UI/UX systems into a seamless digital graph. Built for modern enterprises seeking speed, scalability, and technical elegance.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <a
                href="#graph"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold font-mono text-xs text-white bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>EXPLORE WORK GRAPH</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#services"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2 hover:border-sky-500/50"
              >
                <span>Capabilities</span>
                <Code2 className="w-4 h-4 text-sky-400" />
              </a>
            </motion.div>

            {/* Micro Graph Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Enterprise Grade</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Latency &lt; 50ms</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-400" />
                <span>40+ Live Projects</span>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Visual: Interactive Teamwork Graph Node Canvas */}
          <div className="lg:col-span-6 relative">
            <motion.div
              style={{ y: yParallaxSlow }}
              className="relative w-full aspect-square max-w-lg mx-auto glass-card p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Background Graph Cables */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
              </svg>

              {/* Header Box */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                    <Network className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Interactive Technology Canvas
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  ● Live Graph
                </span>
              </div>

              {/* Interactive Node Network Diagram */}
              <div className="relative my-auto h-64 w-full flex items-center justify-center z-10">
                {/* Central Orb Node */}
                <div
                  onClick={() => setActiveHeroNode('core')}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-slate-900 border-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center p-2 text-center ${
                    activeHeroNode === 'core'
                      ? 'border-sky-400 ring-4 ring-sky-500/30 shadow-[0_0_40px_rgba(56,189,248,0.4)] scale-105'
                      : 'border-slate-700 hover:border-sky-400'
                  }`}
                >
                  <Network className="w-7 h-7 text-sky-400 mb-1 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-white uppercase leading-tight">TheDigiOrb Core</span>
                </div>

                {/* Floating Peripheral Service Nodes */}
                {[
                  { id: 'web', label: 'Web Dev', icon: Globe, pos: 'top-2 left-4' },
                  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone, pos: 'top-2 right-4' },
                  { id: 'ui', label: 'UI/UX Design', icon: Palette, pos: 'bottom-2 left-4' },
                  { id: 'cloud', label: 'Cloud Ops', icon: Cloud, pos: 'bottom-2 right-4' },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeHeroNode === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      onClick={() => setActiveHeroNode(item.id)}
                      whileHover={{ scale: 1.1 }}
                      className={`absolute ${item.pos} px-3 py-2 rounded-2xl bg-slate-900/90 border cursor-pointer transition-all duration-300 flex items-center gap-2 backdrop-blur-xl ${
                        isActive
                          ? 'border-cyan-400 shadow-lg shadow-cyan-500/30 text-white'
                          : 'border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="p-1 rounded-lg bg-sky-500/20 text-sky-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold font-sans">{item.label}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Selected Node Inspector Pill */}
              <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800/90 relative z-10 flex items-center justify-between text-left">
                {heroNodes
                  .filter((n) => n.id === activeHeroNode)
                  .map((n) => (
                    <React.Fragment key={n.id}>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl bg-gradient-to-r ${n.color} text-slate-950 font-bold`}>
                          <n.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block">{n.category}</span>
                          <span className="text-xs font-bold text-white block">{n.name}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-sky-400 uppercase block">Status</span>
                        <span className="text-xs font-bold font-mono text-emerald-400">{n.stats}</span>
                      </div>
                    </React.Fragment>
                  ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};