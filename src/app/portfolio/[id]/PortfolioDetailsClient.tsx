'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  ArrowLeft, ArrowRight, Briefcase, CheckCircle2,
  ChevronLeft, ChevronRight, ExternalLink, Home, Image as ImageIcon, Quote,
  ShieldCheck, Zap, Settings, MonitorSmartphone, FileText, Puzzle,
  PersonStanding, Mail, Network, Star,
} from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { projectsApi, categoriesApi } from '@/lib/api';
import { processImageUrls } from '@/lib/api/utils';
import { Project, Category } from '@/lib/api/types';

export default function PortfolioDetailsClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { settings } = useSettings();
  const [project, setProject] = useState<Project | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);

      const [projectData, categoriesData, allProjectsData] = await Promise.all([
        projectsApi.getById(id),
        categoriesApi.getAll(),
        projectsApi.getPublished(),
      ]);

      setProject(projectData);

      const foundCategory = categoriesData.find((c: Category) => c.id === projectData.category_id);
      setCategory(foundCategory || null);

      const related = allProjectsData
        .filter((p: Project) => p.id !== id && p.category_id === projectData.category_id)
        .slice(0, 3)
        .map((p: Project) => processImageUrls(p, ['image']));

      setRelatedProjects(related);
    } catch (err) {
      setError('Failed to load project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-2 animate-pulse">
            <div className="h-3.5 w-32 bg-slate-800 rounded" />
            <div className="h-8 w-1/2 bg-slate-800 rounded" />
          </div>
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 h-[420px] bg-slate-800/60 rounded-3xl" />
            <div className="lg:col-span-5 space-y-4">
              <div className="h-8 w-3/4 bg-slate-800 rounded" />
              <div className="h-4 w-full bg-slate-800/70 rounded" />
              <div className="h-4 w-5/6 bg-slate-800/70 rounded" />
              <div className="h-4 w-2/3 bg-slate-800/70 rounded" />
              <div className="flex gap-2 pt-4">
                <div className="h-8 w-24 bg-slate-800/60 rounded-lg" />
                <div className="h-8 w-24 bg-slate-800/60 rounded-lg" />
                <div className="h-8 w-24 bg-slate-800/60 rounded-lg" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-800/60 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#030712]">
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6">
          <Zap className="w-10 h-10 text-red-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{error || 'Project not found'}</h3>
        <p className="text-slate-400 mb-6">The project you are looking for does not exist.</p>
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-xs font-mono font-bold text-white shadow-lg shadow-sky-500/20 hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>
    );
  }

  const allImages = [project.image, ...(project.gallery || [])].filter(Boolean);
  const hasImages = allImages.length > 0;

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % allImages.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + allImages.length) % allImages.length);

  const companyName = settings?.company_name || 'TheDigiOrb';

  return (
    <div className="min-h-screen pt-32 pb-16 bg-[#030712] overflow-hidden relative">
      <div className="glow-orb w-[500px] h-[500px] bg-sky-600/10 top-0 left-[-200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-4 flex-wrap" aria-label="breadcrumb">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <span className="text-slate-700">/</span>
          <Link href="/#portfolio" className="hover:text-cyan-300 transition-colors">Portfolio</Link>
          {category && (
            <>
              <span className="text-slate-700">/</span>
              <Link href="/#portfolio" className="hover:text-cyan-300 transition-colors">{category.name}</Link>
            </>
          )}
          <span className="text-slate-700">/</span>
          <span className="text-cyan-300">{project.title}</span>
        </nav>

        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{project.title}</h1>
          {project.subtitle && <p className="text-slate-400 mt-2">{project.subtitle}</p>}
        </div>

        {/* Hero + Info */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Image Slider */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
              {hasImages ? (
                <>
                  <div className="relative h-[380px] sm:h-[450px]">
                    {allImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${project.title} - Image ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`}
                      />
                    ))}
                  </div>
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-slate-950/70 backdrop-blur border border-slate-700 text-white hover:border-cyan-400/60 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-slate-950/70 backdrop-blur border border-slate-700 text-white hover:border-cyan-400/60 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {allImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveSlide(index)}
                            className={`h-1.5 rounded-full transition-all ${index === activeSlide ? 'w-8 bg-cyan-400' : 'w-1.5 bg-slate-600 hover:bg-slate-400'}`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="h-[380px] sm:h-[450px] flex items-center justify-center bg-slate-900/60">
                  <ImageIcon className="w-16 h-16 text-slate-700" />
                </div>
              )}
            </div>
            {project.featured && (
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-xs font-mono font-bold shadow-lg">
                <Star className="w-3.5 h-3.5 fill-white" /> Featured Project
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className="lg:col-span-5">
            <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-2xl">
              {category && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wide">{category.name}</span>
                </div>
              )}
              <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
              {project.subtitle && <p className="text-slate-400 mb-4">{project.subtitle}</p>}
              {project.description && (
                <p className="text-slate-300 text-sm leading-relaxed mb-6">{project.description}</p>
              )}

              <div className="grid grid-cols-2 gap-4 p-5 bg-slate-900/60 border border-slate-800 rounded-2xl mb-6">
                {project.client && (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wide mb-1">Client</span>
                    <span className="text-white text-sm font-medium">{project.client}</span>
                  </div>
                )}
                {project.year && (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wide mb-1">Year</span>
                    <span className="text-white text-sm font-medium">{project.year}</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wide mb-1">Status</span>
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold w-fit bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {project.status === 'published' ? 'Completed' : project.status}
                  </span>
                </div>
                {project.url && project.url !== '#' && (
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wide mb-1">Website</span>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-cyan-300 font-medium flex items-center gap-1 text-sm">
                      Visit <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-6">
                  <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wide block mb-3">Technologies Used</span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1.5 bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded-full text-xs font-mono font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href="/#contact"
                className="block w-full py-4 bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white text-center rounded-xl font-mono font-bold text-xs uppercase tracking-wider hover:scale-[1.01] transition-all shadow-lg shadow-sky-500/20"
              >
                Start Similar Project
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-12 p-8 bg-gradient-to-r from-sky-950 via-slate-900 to-slate-950 border border-sky-500/30 rounded-3xl shadow-2xl shadow-sky-500/20">
          {[
            { num: project.year || new Date().getFullYear(), label: 'Project Year' },
            { num: project.technologies?.length || 0, label: 'Technologies' },
            { num: allImages.length, label: 'Images' },
            { num: '100%', label: 'Satisfaction' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block text-4xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 mb-2">{stat.num}</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Overview / Challenge / Solution + Sidebar */}
        {project.description && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-3xl border border-slate-800 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Project Overview</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">{project.description}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 glass-card rounded-3xl border border-slate-800"
                >
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                    <Puzzle className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">The Challenge</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">We approached each requirement with careful analysis, ensuring every aspect of the project was thoroughly understood before implementation began.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 glass-card rounded-3xl border border-slate-800"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Our Solution</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Through innovative approaches and modern technologies, we delivered a robust solution that exceeds expectations and drives results.</p>
                </motion.div>
              </div>

              <div className="p-8 bg-gradient-to-r from-sky-950 via-slate-900 to-slate-950 border border-sky-500/30 rounded-3xl text-white shadow-xl">
                <div className="relative">
                  <Quote className="w-12 h-12 text-sky-400/30 absolute -top-2 left-0" />
                  <p className="text-lg italic leading-relaxed pl-12 mb-6 text-slate-200">
                    Working with {companyName} was an excellent experience. They delivered beyond our expectations and the results have been outstanding.
                  </p>
                  <div className="flex items-center gap-4 pl-12">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-xl font-bold text-white">
                      <PersonStanding className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block font-semibold text-white">{project.client || 'Happy Client'}</span>
                      <span className="text-slate-400 text-sm">Project Partner</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-3xl border border-slate-800 shadow-xl"
              >
                <h3 className="text-xl font-bold text-white mb-5">What We Delivered</h3>
                <div className="space-y-4">
                  {[
                    { icon: MonitorSmartphone, title: 'Responsive Design', desc: 'Works perfectly on all devices' },
                    { icon: ShieldCheck, title: 'Secure Architecture', desc: 'Enterprise-grade security' },
                    { icon: Zap, title: 'High Performance', desc: 'Optimized for speed' },
                    { icon: Settings, title: 'Easy Maintenance', desc: 'Clean, maintainable code' }
                  ].map((feature, i) => (
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
              </motion.div>

              <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 p-8 rounded-3xl text-center text-white shadow-xl shadow-sky-500/20">
                <h4 className="text-xl font-bold mb-2">Like This Project?</h4>
                <p className="text-sky-100 text-sm mb-4">Let&apos;s create something amazing together for your business.</p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-600 rounded-xl font-mono font-bold text-xs hover:bg-blue-50 transition-colors"
                >
                  <Mail className="w-4 h-4" /> Get in Touch
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase tracking-wide mb-2">
                <ImageIcon className="w-4 h-4" /> Gallery
              </span>
              <h3 className="text-3xl font-bold text-white">Project Screenshots</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.gallery.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg group"
                >
                  <img src={img} alt={`${project.title} gallery ${index + 1}`} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase tracking-wide mb-2">
                <Network className="w-4 h-4" /> Related Nodes
              </span>
              <h3 className="text-3xl font-bold text-white">Related Projects</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedProjects.map((rp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group glass-card rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-400/50 transition-all"
                >
                  <Link href={`/portfolio/${rp.id}`} className="block">
                    <img src={rp.image || '/assets/img/placeholder.svg'} alt={rp.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="p-4">
                      <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">{rp.title}</h4>
                      {rp.subtitle && <p className="text-xs text-slate-400 mt-1">{rp.subtitle}</p>}
                      <span className="inline-flex items-center gap-1.5 mt-3 text-xs font-mono font-bold text-cyan-300">
                        View Project <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* View All */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex justify-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-xs font-mono font-bold text-white shadow-lg shadow-sky-500/20 hover:scale-105 transition-all"
          >
            <Briefcase className="w-4 h-4" /> View All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}