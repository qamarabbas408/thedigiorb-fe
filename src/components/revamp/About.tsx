'use client';

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Zap, Award, Users, Headphones, ArrowRight, Network } from 'lucide-react';

interface AboutSectionProps {
  onContactClick?: () => void;
}

export const RevampAbout: React.FC<AboutSectionProps> = () => {
  const features = [
    { name: "Agile Graph Sprints", icon: Zap, text: "Rapid 2-week continuous delivery cycles", badge: "SPEED" },
    { name: "Zero-Defect QA", icon: Award, text: "Automated unit & integration tests", badge: "QUALITY" },
    { name: "Senior Architects", icon: Users, text: "Expert full-stack & cloud engineers", badge: "TALENT" },
    { name: "Continuous Monitoring", icon: Headphones, text: "24/7 telemetry & infrastructure support", badge: "SUPPORT" },
  ];

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="relative py-24 bg-[#030712] border-t border-b border-slate-800/80 overflow-hidden">
      {/* Background glow accents */}
      <div className="glow-orb w-[500px] h-[500px] bg-blue-600/10 top-1/2 left-[-200px] -translate-y-1/2"></div>
      <div className="glow-orb w-[400px] h-[400px] bg-sky-500/10 bottom-0 right-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Media Column - High Tech Overlay Card Stack */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Main Decorative Card Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                  alt="TheDigiOrb Team working on software solutions"
                  className="w-full h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent"></div>
              </div>

              {/* Floating Second Image Overlay Card */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="absolute -bottom-8 -right-4 sm:-right-8 w-2/3 rounded-2xl overflow-hidden border-2 border-sky-500/40 shadow-2xl shadow-sky-500/20"
              >
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80"
                  alt="TheDigiOrb UX Design session"
                  className="w-full h-44 object-cover object-center"
                />
              </motion.div>

              {/* Floating Node Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -top-6 -left-4 sm:-left-6 glass-card p-4 rounded-2xl border border-sky-500/30 shadow-2xl backdrop-blur-xl flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center font-mono font-black text-white text-xl shadow-lg shadow-sky-500/30">
                  5+
                </div>
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">Node Experience</div>
                  <div className="text-sm font-semibold text-white">5+ Years Operating</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase w-fit">
              <Network className="w-3.5 h-3.5 text-cyan-300" />
              <span>WHO WE ARE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Powering Modern Software <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">
                Through Connected Graph Architecture
              </span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              We are a forward-thinking digital engineering studio dedicated to connecting business goals with high-performance software systems. From early-stage web platforms to cloud pipelines and mobile apps, our connected methodology ensures every component is built for scale.
            </p>

            {/* 2x2 Feature Check Grid */}
            <div className="grid sm:grid-cols-2 gap-4 py-2">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-sky-500/40 transition-colors shadow-sm"
                  >
                    <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>{item.name}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        </h4>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sub Stats Bar */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-6 font-mono">
              <div>
                <span className="text-3xl font-black text-sky-400 block">85+</span>
                <span className="text-xs text-slate-400 font-sans block font-medium">Global Clients Connected</span>
              </div>
              <div>
                <span className="text-3xl font-black text-cyan-300 block">98%</span>
                <span className="text-xs text-slate-400 font-sans block font-medium">On-Time Sprint Completion</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#graph"
                className="px-6 py-3 rounded-xl font-bold font-mono text-xs text-white bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg shadow-sky-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                <span>OPEN WORK GRAPH</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={handleContactClick}
                className="px-6 py-3 rounded-xl font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors text-xs"
              >
                Contact Engineers
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};