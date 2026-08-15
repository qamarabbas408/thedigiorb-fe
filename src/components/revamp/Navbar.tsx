'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Phone, Mail, ChevronRight, Sun, Moon } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { useTheme } from './ThemeProvider';

interface NavbarProps {
  onContactClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const { settings } = useSettings();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const base = isLanding ? '' : '/';

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      const sections = ['home', 'about', 'services', 'graph', 'portfolio', 'why-us', 'team', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Services', href: `${base}#services`, id: 'services' },
    { name: 'How It Works', href: `${base}#graph`, id: 'graph' },
    { name: 'Portfolio', href: `${base}#portfolio`, id: 'portfolio' },
    { name: 'About', href: `${base}#about`, id: 'about' },
    { name: 'FAQ', href: `${base}#faq`, id: 'faq' },
    { name: 'Team', href: `${base}#team`, id: 'team' },
  ];

  const phone = settings?.company_phone || '+92 311 588908';
  const email = settings?.company_email || 'support@thedigiorb.com';

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else if (isLanding) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <>
      {/* Top Viewport Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-slate-900/60 z-[100] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 shadow-[0_0_12px_rgba(34,211,238,0.9)] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-[background-color,border-color,box-shadow,padding] duration-300 ${
          scrolled
            ? 'bg-slate-950/80 border-b border-slate-800/60 py-3 shadow-2xl shadow-sky-950/20'
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Orb Animation */}
          <a href={base ? '/' : '#home'} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-400 p-[1px] shadow-lg shadow-sky-500/25 group-hover:shadow-sky-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center overflow-hidden relative">
                {/* Glowing sphere inner animation */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-blue-600/30 animate-pulse-slow"></div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 shadow-[0_0_12px_#38bdf8] group-hover:scale-110 transition-transform duration-300"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider text-white font-mono flex items-center gap-1">
                DIGI<span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">ORB</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-widest uppercase -mt-1 font-sans">Digital Solutions</span>
            </div>
          </a>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 backdrop-blur-xl px-3 py-1.5 rounded-full border border-slate-800/80 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-xs sm:text-sm font-semibold transition-colors duration-200 rounded-full ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-blue-600/20 border border-sky-500/40 rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action CTA & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/50 transition-all duration-200 shadow-sm flex items-center justify-center group"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-sky-400 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            <button
              onClick={handleContactClick}
              className="relative inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10">Start Project</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile menu button & Theme toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-sky-400" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-Over Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[110] md:hidden">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#080c14]/95 border-l border-slate-800/80 shadow-2xl backdrop-blur-2xl p-6 flex flex-col justify-between overflow-y-auto"
            >
              {/* Drawer Top Bar */}
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800/80">
                  <a
                    href={base ? '/' : '#home'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5"
                  >
                    <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-400 p-[1px]">
                      <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center overflow-hidden relative">
                        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 shadow-[0_0_8px_#38bdf8]"></div>
                      </div>
                    </div>
                    <span className="text-lg font-bold tracking-wider text-white font-mono">
                      DIGI<span className="text-cyan-400">ORB</span>
                    </span>
                  </a>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase px-3 mb-2 block">
                    Navigation
                  </span>
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-sky-500/20 to-blue-600/10 border border-sky-500/30 text-sky-300 shadow-sm'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900/60 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                          )}
                          <span>{link.name}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-600'}`} />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-slate-800/80 space-y-4 mt-8">
                <div className="space-y-2">
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-xs font-mono text-slate-300 hover:text-cyan-300 px-4 py-2.5 bg-slate-900/60 border border-slate-800/80 rounded-xl transition-colors"
                  >
                    <Phone className="w-4 h-4 text-sky-400" />
                    <span>{phone}</span>
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-xs font-mono text-slate-300 hover:text-cyan-300 px-4 py-2.5 bg-slate-900/60 border border-slate-800/80 rounded-xl transition-colors"
                  >
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>{email}</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleContactClick();
                  }}
                  className="w-full py-3.5 px-4 flex items-center justify-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 rounded-xl shadow-lg shadow-sky-500/25 active:scale-[0.98] transition-transform"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  </>
  );
};