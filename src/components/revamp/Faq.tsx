'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Search, MessageSquare, ArrowRight } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/revamp';

interface FaqSectionProps {
  onContactClick: () => void;
}

export const RevampFaq: React.FC<FaqSectionProps> = ({ onContactClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Questions');
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All Questions', 'Process', 'Pricing & Delivery', 'Tech & Security', 'General'];

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All Questions' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Background Orbs */}
      <div className="glow-orb w-96 h-96 bg-cyan-500/10 top-1/3 left-1/2 -translate-x-1/2" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Process & Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">Questions</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about how TheDigiOrb plans, engineers, delivers, and supports high-performance digital products.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-6 mb-10">
          {/* Search Input */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. tech stack, timeline, pricing)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/60 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-500/20 border border-sky-400/50 scale-105'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-3xl border border-slate-800 p-8">
            <p className="text-slate-400 text-sm font-mono">No questions found matching &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All Questions');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 hover:text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-cyan-400/50 shadow-xl shadow-cyan-500/5 bg-slate-900/80'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
                  }`}
                >
                  {/* Question Header Button */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none group"
                  >
                    <div className="space-y-1 pr-2">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase">
                        {faq.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`p-2 rounded-xl bg-slate-900 border border-slate-800 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'text-slate-400'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  {/* Expandable Answer Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* Still Have Questions CTA Banner */}
        <div className="mt-14 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Have a specific question about your project?</h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Our lead architects are available for a direct technical consultation.</p>
            </div>
          </div>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-xs font-mono font-bold text-white shadow-lg shadow-sky-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <span>Consult Our Engineers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};