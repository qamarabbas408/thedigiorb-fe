'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Rocket, Code2, Brain, Wrench, Puzzle,
  Sparkles, Send, CheckCircle2, Loader2, GraduationCap,
  Users, CalendarDays, MonitorPlay, Bot, Terminal, Target, ArrowDown,
} from 'lucide-react';
import { postToSheet } from '@/lib/api/services/sheetsWebhook';

const curriculum = [
  {
    icon: Code2,
    title: 'Web & Programming Fundamentals',
    desc: 'Learn how the web works and the building blocks of programming with hands-on exercises.',
    color: 'sky',
  },
  {
    icon: MonitorPlay,
    title: 'Building Simple Web Projects',
    desc: 'Create your own web pages and mini projects from scratch — publish and share them.',
    color: 'cyan',
  },
  {
    icon: Wrench,
    title: 'Modern Development Tools',
    desc: 'Get comfortable with the tools real developers use every day.',
    color: 'emerald',
  },
  {
    icon: Bot,
    title: 'AI-Assisted Development',
    desc: 'Discover how AI tools help developers write, debug, and improve code faster.',
    color: 'violet',
  },
  {
    icon: Puzzle,
    title: 'Problem-Solving Like a Developer',
    desc: 'Break big problems into small steps and solve them with logic and creativity.',
    color: 'amber',
  },
  {
    icon: Target,
    title: 'Confidence Through Projects',
    desc: 'Present what you build, iterate on feedback, and grow real confidence.',
    color: 'rose',
  },
];

const journey = [
  { emoji: '🌱', text: 'From curiosity to creativity.' },
  { emoji: '💡', text: 'From learning to building.' },
  { emoji: '🚀', text: 'From young learners to future developers.' },
];

const colorMap: Record<string, { icon: string; border: string; glow: string }> = {
  sky: { icon: 'bg-sky-500/10 text-sky-400', border: 'border-sky-500/20 hover:border-sky-400/50', glow: 'shadow-sky-500/10' },
  cyan: { icon: 'bg-cyan-500/10 text-cyan-300', border: 'border-cyan-500/20 hover:border-cyan-400/50', glow: 'shadow-cyan-500/10' },
  emerald: { icon: 'bg-emerald-500/10 text-emerald-400', border: 'border-emerald-500/20 hover:border-emerald-400/50', glow: 'shadow-emerald-500/10' },
  violet: { icon: 'bg-violet-500/10 text-violet-400', border: 'border-violet-500/20 hover:border-violet-400/50', glow: 'shadow-violet-500/10' },
  amber: { icon: 'bg-amber-500/10 text-amber-400', border: 'border-amber-500/20 hover:border-amber-400/50', glow: 'shadow-amber-500/10' },
  rose: { icon: 'bg-rose-500/10 text-rose-400', border: 'border-rose-500/20 hover:border-rose-400/50', glow: 'shadow-rose-500/10' },
};

export const JuniorsCourseClient: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    school: '',
    grade: '',
    parent_name: '',
    parent_email: '',
    parent_phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.parent_name) return;
    setFormError(null);
    const payload = {
      ...formData,
      course: 'Juniors – Young Developer Course',
    };
    setIsSubmitting(true);
    try {
      await postToSheet(payload);
      setFormSubmitted(true);
      setFormData({
        name: '', email: '', phone: '', age: '', school: '', grade: '',
        parent_name: '', parent_email: '', parent_phone: '', message: '',
      });
      setTimeout(() => setFormSubmitted(false), 8000);
    } catch {
      setFormError('Failed to submit registration. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    'w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600';

  return (
    <div className="min-h-screen bg-[#030712] pt-24 pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="glow-orb w-[700px] h-[700px] bg-sky-600/10 top-[-150px] right-[-250px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase"
          >
            <Rocket className="w-3.5 h-3.5 text-cyan-300" />
            <span>Junior Developer Program</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            Building Young Developers,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
              One Idea at a Time!
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto"
          >
            At <span className="text-cyan-300 font-semibold">TheDigiOrb</span>, we believe the best way to
            learn technology is to <span className="text-white">explore, build, experiment, and create.</span>{' '}
            Our <span className="text-white">Juniors – Young Developer Course</span> gives young learners a
            practical introduction to the world of technology, programming, web development, and
            problem-solving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 pt-2"
          >
            {[
              { icon: GraduationCap, label: 'Hands-on Learning' },
              { icon: CalendarDays, label: 'Flexible Schedule' },
              { icon: Users, label: 'Small Batches' },
              { icon: Sparkles, label: 'AI-Powered Curriculum' },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono"
              >
                <Icon className="w-4 h-4 text-cyan-400" /> {label}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center pt-4"
          >
            <a
              href="#register"
              className="relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Register Now</span>
              <ArrowDown className="w-4 h-4 relative z-10 group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Terminal className="w-3.5 h-3.5 text-cyan-300" />
            <span>Curriculum Modules</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Your Child Will <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">Learn</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {curriculum.map((item, i) => {
            const c = colorMap[item.color];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass-card p-6 rounded-3xl border ${c.border} shadow-2xl ${c.glow} transition-colors group`}
              >
                <div className={`w-12 h-12 rounded-2xl ${c.icon} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Journey */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-6">
          <div className="space-y-3">
            {journey.map((j) => (
              <p key={j.text} className="text-xl sm:text-2xl font-bold text-white">
                <span className="mr-2">{j.emoji}</span> {j.text}
              </p>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-800">
            <p className="text-lg font-mono font-bold text-cyan-300">
              &ldquo;The future belongs to those who build it.&rdquo;
            </p>
            <p className="text-sm text-slate-400 mt-2 font-mono">
              🌐 TheDigiOrb &mdash;{' '}
              <a href="https://thedigiorb.com" className="text-sky-400 hover:text-cyan-300 transition-colors">
                TheDigiOrb.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 scroll-mt-24">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left info */}
          <div className="lg:col-span-5 glass-card p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="glow-orb w-[400px] h-[400px] bg-sky-600/10 top-0 left-[-150px]" />
            <div className="relative z-10 space-y-3">
              <span className="px-3 py-1 rounded-md bg-sky-500/20 border border-sky-500/30 text-cyan-300 text-[10px] font-bold uppercase font-mono">
                ENROLLMENT OPEN
              </span>
              <h3 className="text-2xl font-bold text-white leading-snug">
                Join the Young Developer Course
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Fill in the student&apos;s details and a parent/guardian contact. Our team will reach out with
                schedule, fees, and next steps.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              {[
                { icon: GraduationCap, label: 'FOR', value: 'Young learners ready to build' },
                { icon: Brain, label: 'FOCUS', value: 'Code · Web · AI · Problem-Solving' },
                { icon: Sparkles, label: 'OUTCOME', value: 'Portfolio of real mini-projects' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase block">{label}</span>
                    <span className="text-sm font-mono font-bold text-white">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-900/50">
                <span className="text-sm font-bold text-sky-400 block">Web</span>
                <span className="text-[10px] text-slate-400 block">Fundamentals</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/50">
                <span className="text-sm font-bold text-cyan-300 block">AI</span>
                <span className="text-[10px] text-slate-400 block">Assisted Dev</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/50">
                <span className="text-sm font-bold text-emerald-400 block">Fun</span>
                <span className="text-[10px] text-slate-400 block">Hands-on</span>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7 glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Student Registration Form</h3>
                <p className="text-xs text-slate-400 font-mono">Complete the details below to reserve a seat.</p>
              </div>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-sky-500/10 border border-cyan-400/30 text-center space-y-4 my-8"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-400 text-slate-950 mx-auto flex items-center justify-center shadow-lg shadow-cyan-400/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-mono font-bold text-white">REGISTRATION RECEIVED</h4>
                <p className="text-sm text-slate-300">
                  Thank you for registering! Our team will contact the parent/guardian shortly with course
                  details.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300 font-mono">
                    {formError}
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      STUDENT NAME <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      AGE
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={21}
                      placeholder="e.g. 12"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      STUDENT EMAIL <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      STUDENT PHONE
                    </label>
                    <input
                      type="tel"
                      placeholder="+92 300 0000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      SCHOOL / INSTITUTION
                    </label>
                    <input
                      type="text"
                      placeholder="School name"
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      GRADE / CLASS
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 7th Grade"
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <p className="text-xs font-mono font-bold text-cyan-400 uppercase mb-3">
                    Parent / Guardian Details
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                        PARENT NAME <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Parent full name"
                        value={formData.parent_name}
                        onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                        PARENT PHONE
                      </label>
                      <input
                        type="tel"
                        placeholder="+92 300 0000000"
                        value={formData.parent_phone}
                        onChange={(e) => setFormData({ ...formData, parent_phone: e.target.value })}
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      PARENT EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="parent@email.com"
                      value={formData.parent_email}
                      onChange={(e) => setFormData({ ...formData, parent_email: e.target.value })}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                    MESSAGE / QUESTIONS
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Any questions about the course, schedule, or prior experience..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={inputCls + ' resize-none'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 font-bold font-mono text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> SUBMITTING...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> JOIN THE COURSE
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-500 text-center font-mono">
                  By submitting, you agree to be contacted about the Young Developer Course.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
