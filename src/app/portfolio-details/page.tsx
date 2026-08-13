import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Award, Home, Puzzle, CheckCircle2, ShieldCheck, Gauge,
  MonitorSmartphone, CloudUpload, ArrowLeft, ArrowRight, Grid3X3,
  FileText, Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portfolio Details | TheDigiOrb',
  description: 'Explore our portfolio of successful projects and see how we transform ideas into digital reality.',
  robots: 'noindex, nofollow',
  alternates: {
    canonical: '/portfolio-details',
  },
};

const slides = [
  { src: '/assets/img/portfolio/portfolio-5.webp', alt: 'Project Showcase' },
  { src: '/assets/img/portfolio/portfolio-7.webp', alt: 'Project Showcase' },
  { src: '/assets/img/portfolio/portfolio-8.webp', alt: 'Project Showcase' },
];

const stats = [
  { num: '25k+', label: 'Monthly Users' },
  { num: '99.9%', label: 'Uptime' },
  { num: '12', label: 'Team Members' },
  { num: '4.9', label: 'Client Rating' },
];

const features = [
  { icon: ShieldCheck, title: 'Advanced Security', desc: 'Multi-layer protection system' },
  { icon: Gauge, title: 'High Performance', desc: 'Optimized for speed' },
  { icon: MonitorSmartphone, title: 'Mobile Responsive', desc: 'Works on all devices' },
  { icon: CloudUpload, title: 'Cloud Integration', desc: 'Seamless cloud sync' },
];

export default function PortfolioDetailsPage() {
  return (
    <div className="min-h-screen pt-32 pb-16 bg-[#030712] overflow-hidden relative">
      <div className="glow-orb w-[500px] h-[500px] bg-sky-600/10 top-0 left-[-200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-10 flex-wrap" aria-label="breadcrumb">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span className="text-slate-700">/</span>
          <Link href="/portfolio" className="hover:text-cyan-300 transition-colors">Portfolio</Link>
          <span className="text-slate-700">/</span>
          <span className="text-cyan-300">Portfolio Details</span>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Portfolio Details</h1>
          <p className="text-slate-400 mt-2">Explore our recent work and see how we transform ideas into digital reality.</p>
        </div>

        {/* Hero + Info */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img src={slides[0].src} alt={slides[0].alt} className="w-full h-[420px] object-cover" />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <span className="p-2.5 rounded-xl bg-slate-950/70 backdrop-blur border border-slate-700 text-white hover:border-cyan-400/60 cursor-pointer transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </span>
                <span className="p-2.5 rounded-xl bg-slate-950/70 backdrop-blur border border-slate-700 text-white hover:border-cyan-400/60 cursor-pointer transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </div>
            <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-mono font-bold shadow-lg">
              <Award className="w-3.5 h-3.5" /> Award Winning
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wide">Web Application</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Creative Digital Experience Platform</h1>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">A comprehensive digital platform designed to deliver exceptional user experiences with cutting-edge technology and intuitive design.</p>

              <div className="grid grid-cols-2 gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wide mb-1">Client</span>
                  <span className="text-white text-sm font-medium">TechVenture Labs</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wide mb-1">Date</span>
                  <span className="text-white text-sm font-medium">March 2024</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wide mb-1">Duration</span>
                  <span className="text-white text-sm font-medium">4 Months</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wide mb-1">Website</span>
                  <span className="text-sky-400 font-medium text-sm">project.example.com</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wide block mb-3">Tech Stack</span>
                <div className="flex flex-wrap gap-2">
                  {['Vue.js', 'Laravel', 'PostgreSQL', 'Docker'].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded-full text-xs font-mono font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-12 p-8 bg-gradient-to-r from-sky-950 via-slate-900 to-slate-950 border border-sky-500/30 rounded-3xl shadow-2xl shadow-sky-500/20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 mb-2">{stat.num}</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Overview + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">Project Overview</h3>
              </div>
              <p className="text-slate-200 leading-relaxed mb-4">We developed a complete digital solution that streamlined operations, improved user engagement, and delivered measurable business results for our client.</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">The project involved building a scalable architecture using modern technologies. We focused on creating an intuitive user interface while ensuring robust backend functionality. Regular testing and iterative improvements ensured the final product exceeded expectations.</p>
              <p className="text-slate-400 text-sm leading-relaxed">Our team worked closely with stakeholders to understand their unique requirements and delivered a solution that addressed their specific challenges while preparing them for future growth.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-6 glass-card rounded-3xl border border-slate-800">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                  <Puzzle className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">The Challenge</h4>
                <p className="text-slate-400 text-sm leading-relaxed">The client needed a unified platform to manage multiple business processes while ensuring seamless integration with existing systems.</p>
              </div>
              <div className="p-6 glass-card rounded-3xl border border-slate-800">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Our Solution</h4>
                <p className="text-slate-400 text-sm leading-relaxed">We built a custom solution with modular architecture, enabling easy scaling and integration while maintaining high performance.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card p-6 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-5">Key Features</h3>
              <div className="space-y-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-400/40 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white text-sm">{feature.title}</h5>
                      <p className="text-xs text-slate-400 mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase tracking-wide mb-2">
              <Star className="w-4 h-4" /> Gallery
            </span>
            <h3 className="text-3xl font-bold text-white">Project Screenshots</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg group">
              <img src="/assets/img/portfolio/portfolio-11.webp" alt="Project Screenshot" loading="lazy" className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg group">
                <img src="/assets/img/portfolio/portfolio-12.webp" alt="Project Screenshot" loading="lazy" className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="grid grid-rows-2 gap-5">
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg group">
                  <img src="/assets/img/portfolio/portfolio-2.webp" alt="Project Screenshot" loading="lazy" className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg group">
                  <img src="/assets/img/portfolio/portfolio-3.webp" alt="Project Screenshot" loading="lazy" className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-4">
          <Link href="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-200 hover:text-white hover:border-cyan-400/50 transition-all">
            <ArrowLeft className="w-4 h-4" /> Previous Work
          </Link>
          <Link href="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-xs font-mono font-bold text-white shadow-lg shadow-sky-500/20 hover:scale-105 transition-all">
            <Grid3X3 className="w-4 h-4" /> View All
          </Link>
          <Link href="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-200 hover:text-white hover:border-cyan-400/50 transition-all">
            Next Work <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}