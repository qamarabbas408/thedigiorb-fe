'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Zap, BarChart3, Award, Search, FileText, Code2, RefreshCw, Compass, ShieldCheck, TrendingUp, Network } from 'lucide-react';
import { METHODOLOGY_STEPS } from '@/lib/revamp';

export const RevampWhyUs: React.FC = () => {
  const whyUsCards = [
    {
      title: "Rapid Parallel Engineering",
      badge: "OPTIMIZED",
      icon: Zap,
      description: "We deploy dedicated dev pods that run in parallel. Agile iterations guarantee rapid deployment without sacrificing code cleanliness or security."
    },
    {
      title: "Telemetry & Data Analytics",
      icon: BarChart3,
      description: "Every architectural decision is verified by live metrics. We analyze user flows, latency spikes, and conversion graphs to maximize throughput."
    },
    {
      title: "Senior Full-Stack Talent",
      icon: Award,
      description: "Engineers with deep experience in React, TypeScript, Node, and Cloud infrastructure. We write clean, resilient code engineered for longevity."
    }
  ];

  const valueProps = [
    {
      title: "Architecture Blueprinting",
      icon: Compass,
      description: "We map system architectures, API schemas, and data pipelines before writing code to guarantee predictable scalability."
    },
    {
      title: "Custom Component Engines",
      icon: Code2,
      description: "We craft bespoke UI design systems and backend microservices tuned specifically for your business logic."
    },
    {
      title: "Post-Launch Maintenance Graph",
      icon: RefreshCw,
      description: "Continuous infrastructure patching, security audits, and automated scaling to keep your system performing seamlessly."
    }
  ];

  const stepIcons = [Search, FileText, Code2, RefreshCw];

  return (
    <section id="why-us" className="relative py-24 bg-[#030712] overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb w-[500px] h-[500px] bg-blue-600/10 top-1/4 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Top Why Us Intro */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase">
              <Network className="w-3.5 h-3.5 text-cyan-300" />
              <span>THE GRAPH ADVANTAGE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Engineered for Speed, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">
                Resilience & Precision
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We combine computer science fundamentals with modern aesthetic craft to build software products that scale effortlessly. Our methodology ensures full project transparency and fast time-to-market.
            </p>

            {/* Stat callouts */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 font-mono">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-3xl font-black text-sky-400 block">180+</span>
                <span className="text-xs text-slate-400 font-sans font-medium">Nodes Deployed</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-3xl font-black text-cyan-300 block">99.9%</span>
                <span className="text-xs text-slate-400 font-sans font-medium">Uptime Metric</span>
              </div>
            </div>
          </div>

          {/* Right Why Us Feature Cards */}
          <div className="lg:col-span-7 grid gap-4">
            {whyUsCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 flex items-start gap-5 relative overflow-hidden group"
                >
                  <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 shrink-0 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-cyan-400 group-hover:text-slate-950 transition-all duration-300 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">{card.title}</h3>
                      {card.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                          {card.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Connected Methodology Pipeline */}
        <div className="pt-12 border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Connected Workflow Methodology</h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Our 4-node pipeline transforms initial requirements into a deployed, high-speed production engine.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {METHODOLOGY_STEPS.map((step, idx) => {
              const Icon = stepIcons[idx % stepIcons.length];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative glass-card p-6 rounded-2xl border border-slate-800 hover:border-cyan-400/50 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-cyan-400/60">NODE {step.step}</span>
                    <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Value Proposition Cards */}
        <div className="grid md:grid-cols-3 gap-6 pt-12 border-t border-slate-800/80">
          {valueProps.map((prop) => {
            const Icon = prop.icon;
            return (
              <div
                key={prop.title}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">{prop.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{prop.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};