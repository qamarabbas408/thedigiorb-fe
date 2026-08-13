import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Flag, Home, LayoutGrid, Users, Mail, Frown,
} from 'lucide-react';

export default function NotFound() {
  return (
    <section id="error-404" className="min-h-screen pt-32 pb-16 bg-[#030712] overflow-hidden relative">
      <div className="glow-orb w-[500px] h-[500px] bg-red-600/10 top-20 right-[-150px]" />
      <div className="glow-orb w-[400px] h-[400px] bg-sky-600/10 bottom-0 left-[-150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative">
              <div className="flex items-center gap-4">
                <span className="text-8xl sm:text-9xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">4</span>
                <span className="text-7xl sm:text-8xl font-black text-slate-800">
                  <Frown className="w-20 h-20 sm:w-28 sm:h-28 text-slate-700" />
                </span>
                <span className="text-8xl sm:text-9xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-300 to-sky-400">4</span>
              </div>
              <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-sky-500/10 border border-sky-500/20 animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full bg-cyan-500/10 border border-cyan-500/20 animate-pulse" />
              <div className="absolute top-1/2 -right-10 w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 animate-pulse" />
            </div>
          </div>

          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase font-mono tracking-wider mb-4">
              Oops!
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Something Went Wrong</h1>
            <p className="text-slate-400 mb-8 max-w-md mx-auto lg:mx-0">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-xs font-mono font-bold text-white shadow-lg shadow-sky-500/20 hover:scale-105 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Return Home
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-200 hover:text-white hover:border-cyan-400/50 transition-all"
              >
                <Flag className="w-4 h-4" /> Report Issue
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider text-center mb-6">Quick Navigation</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/', icon: Home, title: 'Homepage', desc: 'Start fresh' },
              { href: '/portfolio', icon: LayoutGrid, title: 'Portfolio', desc: 'View our work' },
              { href: '/#team', icon: Users, title: 'Team', desc: 'Meet the crew' },
              { href: '/#contact', icon: Mail, title: 'Contact', desc: 'Get in touch' },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex items-center gap-4 p-5 glass-card rounded-2xl border border-slate-800 hover:border-cyan-400/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-semibold text-white text-sm">{item.title}</span>
                  <span className="text-xs text-slate-400">{item.desc}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}