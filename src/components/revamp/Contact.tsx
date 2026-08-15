'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Clock, ShieldCheck, CheckCircle2, Sparkles, Facebook, Twitter, Linkedin, Instagram, Network, Loader2 } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { useSubmitContact } from '@/hooks';

export const RevampContact: React.FC = () => {
  const { settings } = useSettings();
  const submitContact = useSubmitContact();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormError(null);
    try {
      await submitContact.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
      setFormSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    } catch (err) {
      setFormError('Failed to transmit signal. Please try again or email us directly.');
    }
  };

  const email = settings?.company_email || 'support@thedigiorb.com';
  const phone = settings?.company_phone || '+92 311 1588908';
  const address = settings?.company_address || 'Pakistan';

  return (
    <section id="contact" className="relative py-24 bg-[#030712] border-t border-slate-800/80 overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb w-[600px] h-[600px] bg-sky-600/10 top-0 left-[-200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Network className="w-3.5 h-3.5 text-cyan-300" />
            <span>CONNECT GRAPH NODE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Initiate Connection With <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">TheDigiOrb Engine</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Reach out to establish a direct communication link with our engineering team.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Box */}
          <div className="lg:col-span-5 glass-card p-8 rounded-3xl border border-slate-800 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-3">
              <span className="px-3 py-1 rounded-md bg-sky-500/20 border border-sky-500/30 text-cyan-300 text-[10px] font-bold uppercase font-mono">
                PIPELINE STATUS: READY
              </span>
              <h3 className="text-2xl font-bold text-white leading-snug">
                Let&apos;s Build Something Extraordinary
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Ready to transform your ideas into reality? Our senior engineers and solution architects respond to technical inquiries swiftly.
              </p>
            </div>

            {/* Direct Contact Handles */}
            <div className="space-y-4">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/50 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase block">DIRECT EMAIL</span>
                  <span className="text-sm font-mono font-bold text-white group-hover:text-cyan-300">{email}</span>
                </div>
              </a>

              <a
                href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/50 transition-colors group"
              >
                <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase block">ENGINEERING LINE</span>
                  <span className="text-sm font-mono font-bold text-white group-hover:text-cyan-300">{phone}</span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase block">HEADQUARTERS</span>
                  <span className="text-sm font-mono font-bold text-white">{address}</span>
                </div>
              </div>
            </div>

            {/* Micro Stats Grid matching screenshot */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 rounded-xl bg-slate-900/50">
                <span className="text-sm font-bold text-sky-400 block">&lt;1hr</span>
                <span className="text-[10px] text-slate-400 block">Response</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/50">
                <span className="text-sm font-bold text-cyan-300 block">40+</span>
                <span className="text-[10px] text-slate-400 block">Projects</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/50">
                <span className="text-sm font-bold text-emerald-400 block">99%</span>
                <span className="text-[10px] text-slate-400 block">Client Metric</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">NETWORKS</span>
              <div className="flex items-center gap-2">
                <a href={settings?.facebook_url || '#'} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-cyan-300 text-slate-400 transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href={settings?.twitter_url || '#'} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-cyan-300 text-slate-400 transition-colors" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href={settings?.linkedin_url || '#'} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-cyan-300 text-slate-400 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={settings?.instagram_url || '#'} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 hover:text-cyan-300 text-slate-400 transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 glass-card p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Transmit Message Signal</h3>
                <p className="text-xs text-slate-400 font-mono">Fill out the project parameters below.</p>
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
                <h4 className="text-xl font-mono font-bold text-white">SIGNAL RECEIVED</h4>
                <p className="text-sm text-slate-300">
                  Thank you for connecting with TheDigiOrb. Our team will contact you via email shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      NAME <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                      EMAIL ADDRESS <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">PHONE NUMBER</label>
                    <input
                      type="tel"
                      placeholder="+92 311 588908"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">PROJECT DOMAIN</label>
                    <input
                      type="text"
                      placeholder="Web App, Mobile, Design System..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                    PROJECT PARAMETERS <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your target requirements, architecture goals, or tech stack..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  ></textarea>
                </div>

                {formError && (
                  <p className="text-xs font-mono text-red-400 text-center">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitContact.isPending}
                  className="w-full py-3.5 px-6 rounded-xl font-mono font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:pointer-events-none"
                >
                  {submitContact.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                  )}
                  <span>{submitContact.isPending ? 'TRANSMITTING...' : 'TRANSMIT SIGNAL'}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ENCRYPTED NODE COMMUNICATION LINK</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};