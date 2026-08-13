'use client';

import React from 'react';
import { ArrowUp, Send, Network, X as TwitterIcon, Instagram, Linkedin, Facebook } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/context/SettingsContext';

export const RevampFooter: React.FC = () => {
  const { settings } = useSettings();
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const base = isLanding ? '' : '/';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const companyName = settings?.company_name || 'TheDigiOrb';
  const description =
    settings?.company_description ||
    'Next-generation software development graph. Engineered for high-throughput web architectures, cross-platform apps, and automated cloud workflows.';

  const socials = [
    { name: 'Facebook', href: settings?.facebook_url || 'https://thedigiorb.com', Icon: Facebook },
    { name: 'X / Twitter', href: settings?.twitter_url || 'https://thedigiorb.com', Icon: TwitterIcon },
    { name: 'Instagram', href: settings?.instagram_url || 'https://thedigiorb.com', Icon: Instagram },
    { name: 'LinkedIn', href: settings?.linkedin_url || 'https://thedigiorb.com', Icon: Linkedin },
  ];

  return (
    <footer className="bg-[#030712] border-t border-slate-800 text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href={`${base}#home`} className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 via-cyan-400 to-blue-600 p-[1px] shadow-lg shadow-cyan-400/20">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Network className="w-5 h-5 text-cyan-300" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-wider text-white font-mono">
                DIGI<span className="text-cyan-400">ORB</span>
              </span>
            </a>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">{description}</p>

            <div className="flex items-center gap-3 pt-2">
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                  aria-label={name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase font-mono">Service Nodes</h4>
            <ul className="space-y-2 font-mono text-[11px]">
              <li><a href={`${base}#services`} className="hover:text-cyan-300 transition-colors">Web Systems</a></li>
              <li><a href={`${base}#services`} className="hover:text-cyan-300 transition-colors">Mobile Platforms</a></li>
              <li><a href={`${base}#services`} className="hover:text-cyan-300 transition-colors">UI Design Systems</a></li>
              <li><a href={`${base}#services`} className="hover:text-cyan-300 transition-colors">Custom Backend</a></li>
              <li><a href={`${base}#services`} className="hover:text-cyan-300 transition-colors">API Architecture</a></li>
              <li><a href={`${base}#services`} className="hover:text-cyan-300 transition-colors">Cloud Networks</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase font-mono">System Directory</h4>
            <ul className="space-y-2 font-mono text-[11px]">
              <li><a href={`${base}#about`} className="hover:text-cyan-300 transition-colors">About Engine</a></li>
              <li><a href={`${base}#portfolio`} className="hover:text-cyan-300 transition-colors">Deliverable Graph</a></li>
              <li><a href={`${base}#team`} className="hover:text-cyan-300 transition-colors">Architects</a></li>
              <li><a href={`${base}#why-us`} className="hover:text-cyan-300 transition-colors">Advantage</a></li>
              <li><a href={`${base}#contact`} className="hover:text-cyan-300 transition-colors">Connect Node</a></li>
            </ul>
          </div>

          {/* Stay Updated Newsletter */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs tracking-wider uppercase font-mono">Telemetry Feed</h4>
            <p className="text-slate-400 text-xs">
              Subscribe to technical updates and system architecture releases.
            </p>
            <div className="flex gap-1.5 pt-1">
              <input
                type="email"
                placeholder="Developer Email"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
              <button
                type="button"
                className="p-2 rounded-lg bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 font-bold shrink-0 hover:scale-105 transition-transform"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <p>© {new Date().getFullYear()} <span className="text-slate-300 font-bold">{companyName}</span>. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <a href="/terms" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy</a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-cyan-400 hover:text-slate-950 border border-slate-800 text-slate-300 transition-all ml-2"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};