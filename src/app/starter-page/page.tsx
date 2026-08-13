import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Home, Sparkles, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Starter Page | TheDigiOrb',
  robots: 'noindex, nofollow',
};

export default function StarterPagePage() {
  return (
    <div className="min-h-screen pt-32 pb-16 bg-[#030712] overflow-hidden relative">
      <div className="glow-orb w-[500px] h-[500px] bg-sky-600/10 top-0 left-[-200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-10 flex-wrap" aria-label="breadcrumb">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span className="text-slate-700">/</span>
          <span className="text-cyan-300">Starter Page</span>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Starter Page</h1>
          <p className="text-slate-400 mt-2">A clean slate for your custom content. Build something unique for your business.</p>
        </div>

        <div className="max-w-3xl mx-auto text-center p-8 sm:p-12 glass-card rounded-3xl border border-slate-800 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
          <p className="text-slate-300 leading-relaxed mb-6">Begin your journey with us and transform your digital presence. This is a placeholder page. Contact us to discuss your custom project requirements and let us bring your vision to life.</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-xs font-mono font-bold text-white shadow-lg shadow-sky-500/20 hover:scale-105 transition-all"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}