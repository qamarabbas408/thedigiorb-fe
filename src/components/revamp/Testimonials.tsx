'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Network } from 'lucide-react';
import { TESTIMONIALS, Testimonial } from '@/lib/revamp';
import { usePublishedTestimonials } from '@/hooks';

interface TestimonialsSectionProps {
  isLoading?: boolean;
}

export const RevampTestimonials: React.FC<TestimonialsSectionProps> = ({ isLoading: propIsLoading = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: dbTestimonials, isLoading: dbLoading } = usePublishedTestimonials();

  // Prefer DB testimonials when available, otherwise fall back to mock data.
  const testimonials: Testimonial[] =
    dbTestimonials && dbTestimonials.length > 0
      ? dbTestimonials.map((t) => ({
          id: String(t.id),
          name: t.name,
          role: t.title,
          company: t.company,
          avatar: t.image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
          rating: t.rating || 5,
          quote: t.content,
          tags: [],
        }))
      : TESTIMONIALS;

  const isLoading = propIsLoading || dbLoading;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-24 bg-[#030712] border-t border-b border-slate-800/80 overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb w-[500px] h-[500px] bg-sky-600/10 top-0 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Network className="w-3.5 h-3.5 text-cyan-300" />
            <span>PARTNER FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Partner <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">Node Endorsements</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Read direct feedback from tech founders and enterprise leaders operating on TheDigiOrb&apos;s engine.
          </p>
        </div>

        {/* Testimonial Showcase Box / Skeleton Loader */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-12 gap-8 items-center glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-2xl animate-pulse">
              {/* Left Column Skeleton */}
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4 border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-8">
                <div className="w-20 h-20 rounded-2xl bg-slate-800/80" />
                <div className="space-y-2 w-full flex flex-col items-center md:items-start">
                  <div className="h-5 w-32 bg-slate-800 rounded" />
                  <div className="h-3.5 w-24 bg-slate-800/60 rounded" />
                  <div className="h-3.5 w-28 bg-slate-800/50 rounded" />
                </div>
                <div className="flex gap-1 pt-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 rounded bg-slate-800" />
                  ))}
                </div>
              </div>

              {/* Right Column Skeleton */}
              <div className="md:col-span-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-5 w-full bg-slate-800/80 rounded" />
                  <div className="h-5 w-11/12 bg-slate-800/80 rounded" />
                  <div className="h-5 w-4/5 bg-slate-800/80 rounded" />
                  <div className="flex gap-2 pt-4">
                    <div className="h-6 w-20 bg-slate-800/60 rounded-md" />
                    <div className="h-6 w-24 bg-slate-800/60 rounded-md" />
                    <div className="h-6 w-16 bg-slate-800/60 rounded-md" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-8 bg-slate-800 rounded-full" />
                    <div className="h-2 w-2 bg-slate-800 rounded-full" />
                    <div className="h-2 w-2 bg-slate-800 rounded-full" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-800" />
                    <div className="w-10 h-10 rounded-xl bg-slate-800" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-12 gap-8 items-center glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 relative shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 text-sky-400 pointer-events-none">
                <Quote className="w-32 h-32" />
              </div>

              {/* Left Info Column */}
              <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-4 border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-8">
                <div className="relative">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-cyan-400/60 shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-cyan-400 text-slate-950 font-mono font-bold text-[10px] uppercase">
                    {current.rating}.0 ★
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{current.name}</h3>
                  <p className="text-xs font-mono font-bold text-cyan-300">{current.role}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{current.company}</p>
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 text-amber-400 pt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Right Quote Column */}
              <div className="md:col-span-8 space-y-6 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <p className="text-slate-200 text-base sm:text-lg leading-relaxed italic font-normal">
                      &quot;{current.quote}&quot;
                    </p>

                    {current.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {current.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono font-semibold text-cyan-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <div className="flex gap-1.5">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-800 hover:bg-slate-700'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={prevTestimonial}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};