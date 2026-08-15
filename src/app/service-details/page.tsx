import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Home, Star, Zap, ShieldCheck, TrendingUp, Headset, ArrowRight,
  Download, FileText, FileSpreadsheet, MessageCircle, CircleArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Service Details',
  description: 'Learn more about our expert services and how we can help transform your business with innovative digital solutions.',
  robots: 'noindex, nofollow',
};

const capabilities = [
  { icon: Zap, title: 'Rapid Deployment', desc: 'Get your solution up and running quickly with our efficient development process and proven delivery framework.' },
  { icon: ShieldCheck, title: 'Enterprise Security', desc: 'Protect your data with bank-grade security measures and compliance with industry standards.' },
  { icon: TrendingUp, title: 'Scalable Architecture', desc: 'Build for growth with flexible solutions that expand seamlessly as your business evolves.' },
  { icon: Headset, title: 'Dedicated Support', desc: 'Rely on our responsive support team for ongoing assistance and troubleshooting.' },
];

const process = [
  { num: '01', title: 'Discovery & Analysis', desc: 'We begin by understanding your business goals, challenges, and requirements through detailed discussions and analysis.' },
  { num: '02', title: 'Strategic Planning', desc: 'Our team develops a comprehensive roadmap with clear milestones, timelines, and technical specifications.' },
  { num: '03', title: 'Development & Testing', desc: 'We build your solution using industry best practices, with rigorous testing at every stage of development.' },
  { num: '04', title: 'Launch & Optimization', desc: 'We deploy your solution and provide ongoing support to ensure optimal performance and continuous improvement.' },
];

const services = [
  'Digital Transformation',
  'Cloud Infrastructure',
  'Data Analytics',
  'Cybersecurity Solutions',
  'Custom Development',
  'IT Consulting',
];

const resources = [
  { icon: FileText, name: 'Service Brochure', size: 'PDF • 2.4 MB' },
  { icon: FileText, name: 'Technical Overview', size: 'PDF • 1.8 MB' },
  { icon: FileSpreadsheet, name: 'Pricing Guide', size: 'PDF • 856 KB' },
];

export default function ServiceDetailsPage() {
  return (
    <div className="min-h-screen pt-32 pb-16 bg-[#030712] overflow-hidden relative">
      <div className="glow-orb w-[500px] h-[500px] bg-blue-600/10 top-0 right-[-200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-10 flex-wrap" aria-label="breadcrumb">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span className="text-slate-700">/</span>
          <Link href="/#services" className="hover:text-cyan-300 transition-colors">Services</Link>
          <span className="text-slate-700">/</span>
          <span className="text-cyan-300">Service Details</span>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Service Details</h1>
          <p className="text-slate-400 mt-2">Learn more about how our expert services can help your business grow.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img src="/assets/img/services/services-7.webp" alt="Service detail" className="w-full h-72 object-cover" />
              <div className="absolute top-4 right-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-mono font-bold shadow-lg">
                <Star className="w-3.5 h-3.5 fill-white" /> Premium Solution
              </div>
            </div>

            {/* Overview */}
            <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wide">What We Deliver</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Comprehensive Digital Transformation Solutions</h2>
              <p className="text-slate-300 leading-relaxed mb-4">We help businesses embrace digital technologies to streamline operations, enhance customer experiences, and achieve sustainable growth. Our team of experts delivers tailored solutions that address your unique challenges.</p>
              <p className="text-slate-400 text-sm leading-relaxed">From initial consultation to implementation and support, we partner with you every step of the way. Our proven methodologies ensure successful delivery and measurable results for your organization.</p>
            </div>

            {/* Key Capabilities */}
            <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Key Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {capabilities.map((cap, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-400/40 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
                      <cap.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{cap.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Implementation Process</h3>
              <div className="space-y-6 border-l border-slate-800 pl-6">
                {process.map((step) => (
                  <div key={step.num} className="relative">
                    <span className="absolute -left-[31px] top-0.5 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">{step.num}</span>
                      <h4 className="text-lg font-bold text-white">{step.title}</h4>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Showcase */}
            <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Project Showcase</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['services-3', 'services-5', 'services-8', 'services-10', 'services-12'].map((img, i) => (
                  <div key={i} className={`rounded-2xl overflow-hidden border border-slate-800 shadow-lg group ${i < 2 ? 'md:col-span-1' : ''}`}>
                    <img src={`/assets/img/services/${img}.webp`} alt="Project showcase" loading="lazy" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service List */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-5">All Services</h3>
              <div className="space-y-2">
                {services.map((service, i) => (
                  <Link
                    key={service}
                    href="/#services"
                    className={`flex items-center gap-3 p-3 rounded-xl text-sm transition-colors ${i === 0
                      ? 'bg-sky-500/10 border border-sky-500/30 text-cyan-300'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'}`}
                  >
                    <CircleArrowRight className={`w-4 h-4 ${i === 0 ? 'text-cyan-300' : 'text-slate-600'}`} />
                    {service}
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="p-8 bg-gradient-to-r from-sky-950 via-slate-900 to-slate-950 border border-sky-500/30 rounded-3xl text-center space-y-6">
              {[
                { num: '850+', label: 'Projects Delivered' },
                { num: '99%', label: 'Client Satisfaction' },
                { num: '24/7', label: 'Support Available' },
              ].map((stat, i) => (
                <div key={i}>
                  <span className="block text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">{stat.num}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Resources */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-5">Resources</h3>
              <div className="space-y-3">
                {resources.map((res) => (
                  <a key={res.name} href="#" className="flex items-center gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-400/40 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
                      <res.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block font-semibold text-white text-sm truncate">{res.name}</span>
                      <span className="text-xs text-slate-400">{res.size}</span>
                    </div>
                    <Download className="w-4 h-4 text-slate-500" />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white shadow-xl shadow-sky-500/20 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">Ready to Transform Your Business?</h3>
              <p className="text-sky-100 text-sm mb-4">Connect with our specialists for a complimentary consultation.</p>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-600 rounded-xl font-mono font-bold text-xs hover:bg-blue-50 transition-colors"
              >
                Schedule a Call <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}