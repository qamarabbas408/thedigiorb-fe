import React from 'react';
import Link from 'next/link';
import {
  FileText, Calendar, Lightbulb, CheckCircle2, ShieldAlert,
  Ban, Info, Megaphone, MessageCircle, Download,
} from 'lucide-react';

const articles = [
  {
    id: 'acceptance',
    num: '01',
    title: 'Acceptance of Terms',
    content: (
      <>
        <p>By accessing and using our website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>
        <div className="flex items-start gap-4 p-4 bg-amber-500/5 border border-amber-500/30 rounded-2xl mt-5">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <p className="text-sm text-slate-400">Please read these terms carefully before using our services. Your continued use indicates acceptance of these terms.</p>
        </div>
      </>
    ),
  },
  {
    id: 'ip-rights',
    num: '02',
    title: 'Intellectual Property Rights',
    content: (
      <>
        <p>All content, designs, graphics, logos, and other materials on our website are the intellectual property of Digital Orbits. Unauthorized reproduction, distribution, or modification is strictly prohibited.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          {['Exclusive ownership of all platform content', 'Prohibited modification or reproduction', 'Protected trademarks and branding', 'Limited personal usage rights only'].map((item) => (
            <div key={item} className="flex items-center gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-sm text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'accounts',
    num: '03',
    title: 'User Account Responsibilities',
    content: (
      <>
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Please notify us immediately of any unauthorized access.</p>
        <div className="flex items-start gap-4 p-4 bg-red-500/5 border border-red-500/30 rounded-2xl mt-5">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-semibold text-white text-sm mb-1">Security Reminder</h5>
            <p className="text-sm text-slate-400">Never share your password with third parties. Use strong, unique passwords and enable two-factor authentication when available.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'restrictions',
    num: '04',
    title: 'Usage Restrictions',
    content: (
      <>
        <p>You agree not to use our services for any unlawful purpose or in any way that could damage, disable, or impair our platform. The following activities are strictly prohibited:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          {['Automated data extraction or scraping', 'Distribution of harmful software', 'Unauthorized system access attempts', 'Content manipulation or framing'].map((item) => (
            <div key={item} className="flex items-center gap-3 p-4 bg-slate-900/60 border border-slate-800 rounded-xl">
              <Ban className="w-4 h-4 text-red-400 shrink-0" />
              <span className="text-sm text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'warranties',
    num: '05',
    title: 'Disclaimer of Warranties',
    content: (
      <>
        <p>Our services are provided &quot;as is&quot; without any warranties, express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.</p>
        <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl mt-5">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-white text-sm">Service Limitations</span>
          </div>
          <ul className="space-y-1.5">
            {['Services may experience occasional downtime for maintenance', 'We strive for accuracy but cannot guarantee all content is current', 'User assumes responsibility for how they use our services', 'Third-party integrations are subject to their own terms'].map((item) => (
              <li key={item} className="text-sm text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'liability',
    num: '06',
    title: 'Limitation of Liability',
    content: (
      <p>Digital Orbits shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability is limited to the amount paid for services.</p>
    ),
  },
  {
    num: '07',
    title: 'Indemnification Clause',
    content: (
      <p>You agree to indemnify and hold Digital Orbits harmless from any claims, damages, or expenses arising from your use of our services or violation of these terms.</p>
    ),
  },
  {
    num: '08',
    title: 'Account Termination',
    content: (
      <p>We reserve the right to suspend or terminate your account at any time for violation of these terms. You may also cancel your account at any time by contacting us.</p>
    ),
  },
  {
    num: '09',
    title: 'Applicable Jurisdiction',
    content: (
      <p>These terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising shall be subject to the exclusive jurisdiction of Pakistani courts.</p>
    ),
  },
  {
    num: '10',
    title: 'Terms Modifications',
    content: (
      <>
        <p>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.</p>
        <div className="flex items-start gap-4 p-4 bg-cyan-500/5 border border-cyan-500/30 rounded-2xl mt-5">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Megaphone className="w-4 h-4" />
          </div>
          <p className="text-sm text-slate-400">We will notify users of significant changes via email or prominent notice on our website.</p>
        </div>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-16 bg-[#030712] overflow-hidden relative">
      <div className="glow-orb w-[500px] h-[500px] bg-blue-600/10 top-0 left-[-200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-bold uppercase font-mono tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5" /> Legal Document
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Terms of Service</h1>
          <p className="text-slate-400 mt-2">Review our terms and conditions governing your use of our platform and services</p>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-mono mt-4">
            <Calendar className="w-3.5 h-3.5" /> Effective Date: March 15, 2025
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { href: '#acceptance', label: 'Acceptance' },
            { href: '#ip-rights', label: 'IP Rights' },
            { href: '#accounts', label: 'Accounts' },
            { href: '#restrictions', label: 'Restrictions' },
            { href: '#warranties', label: 'Warranties' },
            { href: '#liability', label: 'Liability' },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-slate-300 hover:text-white hover:border-cyan-400/50 transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Articles */}
        <div className="max-w-4xl mx-auto space-y-6">
          {articles.map((article) => (
            <article key={article.title} id={article.id} className="glass-card p-8 rounded-3xl border border-slate-800 shadow-xl scroll-mt-32">
              <div className="flex items-start gap-5">
                <span className="text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 shrink-0">{article.num}</span>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-white mb-3">{article.title}</h3>
                  <div className="text-slate-400 text-sm leading-relaxed space-y-3">{article.content}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto mt-10 p-8 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-slate-950 border border-sky-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white">Need Clarification?</h4>
            <p className="text-sm text-slate-400 mt-1">Our legal team is available to address your questions regarding these terms.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-xs font-mono font-bold text-white shadow-lg shadow-sky-500/20 hover:scale-105 transition-all"
            >
              <MessageCircle className="w-4 h-4" /> Get Support
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-200 hover:text-white hover:border-cyan-400/50 transition-all"
            >
              <Download className="w-4 h-4" /> Download PDF
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}