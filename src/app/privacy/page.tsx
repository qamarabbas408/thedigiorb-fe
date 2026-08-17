'use client';

import { useSettings } from "@/context/SettingsContext";
import {
  ShieldCheck, Info, Contact, Settings2, ThumbsUp, Landmark,
  Lock, ClipboardCheck, Eye, Pencil, Trash2, Ban, Mail,
  MapPin, Phone, Calendar, CreditCard, Bell, TrendingUp,
  Headset, Stars,
} from 'lucide-react';

export default function PrivacyPage() {
  const { settings, loading } = useSettings();

  const navLinks = [
    { href: '#intro', label: 'Introduction' },
    { href: '#collection', label: 'Information Collection' },
    { href: '#usage', label: 'How We Use Data' },
    { href: '#sharing', label: 'Information Sharing' },
    { href: '#security', label: 'Data Security' },
    { href: '#rights', label: 'Your Rights' },
    { href: '#updates', label: 'Policy Updates' },
    { href: '#contact', label: 'Contact Us' },
  ];

  const sections = [
    {
      id: 'intro',
      num: '01',
      title: 'Introduction',
      body: (
        <>
          <p>This Privacy Policy explains how {settings?.company_name || 'we'} (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, discloses, and safeguards information when you visit our website or use our services.</p>
          <p>By using our services, you agree to the collection and use of information in accordance with this policy.</p>
        </>
      ),
    },
    {
      id: 'collection',
      num: '02',
      title: 'Information We Collect',
      body: (
        <>
          <p>We may collect the following types of information:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Contact className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white">Data You Provide</h4>
              </div>
              <ul className="space-y-1.5">
                {['Full name and contact details', 'Login credentials', 'Billing information', 'Notification settings'].map((item) => (
                  <li key={item} className="text-sm text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Settings2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white">Automated Data</h4>
              </div>
              <ul className="space-y-1.5">
                {['Device specifications', 'Activity logs and metrics', 'Geographic data when permitted', 'Browser configuration'].map((item) => (
                  <li key={item} className="text-sm text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'usage',
      num: '03',
      title: 'How We Use Your Information',
      body: (
        <>
          <p>We use the information we collect for the following purposes:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
            {[
              { icon: Stars, label: 'Deliver personalized experiences' },
              { icon: CreditCard, label: 'Handle transactions and billing' },
              { icon: Bell, label: 'Send service notifications' },
              { icon: ShieldCheck, label: 'Ensure security and verification' },
              { icon: TrendingUp, label: 'Improve platform performance' },
              { icon: Headset, label: 'Provide customer support' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-sm text-slate-300">{item.label}</span>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id: 'sharing',
      num: '04',
      title: 'Information Sharing and Disclosure',
      body: (
        <>
          <p>We do not sell your personal information. We may share information in the following circumstances:</p>
          <div className="space-y-4 mt-5">
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <h4 className="font-bold text-white flex items-center gap-2 mb-2">
                <ThumbsUp className="w-4 h-4 text-cyan-400" /> With Your Permission
              </h4>
              <p className="text-sm text-slate-400">We may share your information if you explicitly consent to sharing.</p>
            </div>
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <h4 className="font-bold text-white flex items-center gap-2 mb-2">
                <Landmark className="w-4 h-4 text-cyan-400" /> For Legal Compliance
              </h4>
              <p className="text-sm text-slate-400 mb-3">We may disclose information when required by law or to protect our rights.</p>
              <ul className="space-y-1.5">
                {['Comply with applicable regulations and legal requirements', 'Enforce our service agreements', 'Address security threats and fraudulent activity', 'Safeguard user rights and property'].map((item) => (
                  <li key={item} className="text-sm text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'security',
      num: '05',
      title: 'Data Security',
      body: (
        <>
          <p>We implement appropriate security measures to protect your information:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {[
              { icon: Lock, title: 'SSL Encryption', desc: 'All data transmissions are encrypted' },
              { icon: ClipboardCheck, title: 'Regular Audits', desc: 'Continuous security assessments' },
              { icon: Lock, title: 'Access Control', desc: 'Restricted data access policies' },
            ].map((item, i) => (
              <div key={i} className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-3">
                  <item.icon className="w-5 h-5" />
                </div>
                <h5 className="font-semibold text-white text-sm">{item.title}</h5>
                <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id: 'rights',
      num: '06',
      title: 'Your Rights and Choices',
      body: (
        <>
          <p>You have the following rights regarding your personal information:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
            {[
              { icon: Eye, title: 'Access', desc: 'Review your personal data anytime' },
              { icon: Pencil, title: 'Correction', desc: 'Update inaccurate information' },
              { icon: Trash2, title: 'Deletion', desc: 'Request removal of your data' },
              { icon: Ban, title: 'Restriction', desc: 'Limit how we process your information' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-white text-sm">{item.title}</strong>
                  <span className="text-xs text-slate-400">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id: 'updates',
      num: '07',
      title: 'Changes to This Policy',
      body: (
        <>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
          <p>We encourage you to review this policy periodically for any changes.</p>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-16 bg-[#030712] overflow-hidden relative">
      <div className="glow-orb w-[500px] h-[500px] bg-sky-600/10 top-0 right-[-200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-bold uppercase font-mono tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> Privacy Policy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
          <p className="text-slate-400 mt-2">Effective: March 2026</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Nav */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6 rounded-3xl border border-slate-800 sticky top-32">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-bold text-white text-sm">Privacy Policy</span>
              </div>
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="flex items-center gap-2 px-3 py-2 mt-4 text-xs text-slate-400 font-mono">
                <Calendar className="w-3.5 h-3.5" /> Effective: March 2026
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Intro Card */}
            <div className="p-6 glass-card rounded-3xl border border-slate-800 shadow-xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                <Info className="w-6 h-6" />
              </div>
              <p className="text-slate-300 leading-relaxed">Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use our services.</p>
            </div>

            {sections.map((section) => (
              <div key={section.id} id={section.id} className="glass-card p-8 rounded-3xl border border-slate-800 shadow-xl scroll-mt-32">
                <div className="flex items-start gap-5">
                  <span className="text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 shrink-0">{section.num}</span>
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
                    <div className="text-slate-400 text-sm leading-relaxed space-y-3">{section.body}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Contact */}
            <div id="contact" className="glass-card p-8 rounded-3xl border border-slate-800 shadow-xl scroll-mt-32">
              <div className="flex items-start gap-5">
                <span className="text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 shrink-0">08</span>
                <div className="min-w-0">
                  <h2 className="text-xl font-bold text-white mb-3">Get in Touch</h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">If you have any questions about this Privacy Policy, please contact us:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-sm text-slate-300 break-all">{loading ? 'Loading...' : settings?.company_email}</span>
                    </div>
                    {settings?.company_address && (
                      <div className="flex items-center gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-sm text-slate-300">{settings?.company_address}</span>
                      </div>
                    )}
                    {settings?.show_phone === true && (
                      <div className="flex items-center gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
                        <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="text-sm text-slate-300">{loading ? 'Loading...' : settings?.company_phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}