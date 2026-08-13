'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Network, Send } from 'lucide-react';

interface ParallaxBannerProps {
  onContactClick?: () => void;
}

export const ParallaxBanner: React.FC<ParallaxBannerProps> = ({ onContactClick }) => {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 my-10 overflow-hidden bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ y: backgroundY }}
          className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-sky-950 via-slate-900 to-slate-950 overflow-hidden shadow-2xl shadow-sky-500/20 border border-sky-500/30 text-center"
        >
          {/* Animated Connecting SVG Grid Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 8" className="animate-dash-flow" />
            <line x1="20%" y1="0" x2="80%" y2="100%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* Glowing Ambient Sphere */}
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md">
              <Network className="w-3.5 h-3.5 text-cyan-300" />
              <span>CONNECTED PIPELINE: ONLINE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to Connect Your Systems to the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
                DigiOrb Work Graph?
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-normal">
              Empower your digital infrastructure with high-performance software engineering, reactive UI components, and enterprise cloud architecture.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleContactClick}
                className="px-8 py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 hover:opacity-95 shadow-xl shadow-cyan-500/25 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>DEPLOY PROJECT NODE</span>
              </button>

              <a
                href="#graph"
                className="px-8 py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <span>TEST WORK GRAPH</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};