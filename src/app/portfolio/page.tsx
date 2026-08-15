'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Eye, Briefcase, Network, Star, Zap, PlayCircle } from 'lucide-react';
import { usePublishedProjectsWithTotal, useCategories } from '@/hooks';

const PROJECTS_PER_PAGE = 12;

function PortfolioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const categoryId = searchParams.get('category') || undefined;

  const offset = (page - 1) * PROJECTS_PER_PAGE;
  const { data: result, isLoading } = usePublishedProjectsWithTotal(PROJECTS_PER_PAGE, offset, categoryId);
  const { data: categories } = useCategories();

  const projects = result?.projects || [];
  const totalProjects = result?.total || 0;
  const totalPages = Math.ceil(totalProjects / PROJECTS_PER_PAGE);

  const activeFilter = categoryId || '*';

  const getCategoryName = (catId: string) => {
    const category = categories?.find((c) => c.id === catId);
    return category?.name || catId;
  };

  const handleFilterClick = (catId?: string) => {
    router.push(catId ? `/portfolio?page=1&category=${catId}` : '/portfolio?page=1');
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set('page', newPage.toString());
    if (categoryId) {
      params.set('category', categoryId);
    }
    router.push(`/portfolio?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-16 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PortfolioSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-16 bg-[#030712] overflow-hidden relative">
      <div className="glow-orb w-[500px] h-[500px] bg-sky-600/10 top-0 right-[-200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Network className="w-3.5 h-3.5 text-cyan-300" />
            <span>DELIVERABLE GRAPH</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">Work & Projects</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            High-impact software, web platforms, and digital products engineered by TheDigiOrb team.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => handleFilterClick()}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 ${
              activeFilter === '*'
                ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-500/20 border border-sky-400/50 scale-105'
                : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/80'
            }`}
          >
            All Projects
          </button>
          {categories?.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterClick(category.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-500/20 border border-sky-400/50 scale-105'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/80'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-3xl border border-slate-800 p-12">
            <Briefcase className="w-14 h-14 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
            <p className="text-slate-400 text-sm">No projects in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
                whileHover={{ y: -6 }}
                className={`group glass-card rounded-3xl border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 shadow-xl overflow-hidden flex flex-col ${
                  project.featured ? 'border-sky-500/40' : ''
                }`}
              >
                <Link href={`/portfolio/${project.id}`} className="relative block overflow-hidden">
                  <img
                    src={project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-10 h-10 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-400/30">
                      <Eye className="w-5 h-5" />
                    </span>
                    <span className="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center shadow-lg">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur border border-slate-700 text-[10px] font-mono font-bold text-cyan-300 uppercase">
                    {getCategoryName(project.category_id)}
                  </span>
                  {project.featured && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-amber-400 text-slate-950 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                      <Star className="w-3 h-3 fill-slate-950" /> Featured
                    </span>
                  )}
                </Link>

                <div className="p-5 flex flex-col flex-1">
                  <Link href={`/portfolio/${project.id}`}>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  {project.subtitle && (
                    <p className="text-xs font-mono font-bold text-sky-400 mt-0.5">{project.subtitle}</p>
                  )}
                  <p className="text-slate-400 text-sm leading-relaxed mt-2 line-clamp-2">{project.description}</p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies?.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono font-semibold text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.year && <span className="text-[11px] font-mono text-slate-500">{project.year}</span>}
                  </div>

                  <Link
                    href={`/portfolio/${project.id}`}
                    className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-200 hover:text-white hover:border-cyan-400/50 transition-colors"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-11 h-11 rounded-xl font-mono text-sm font-bold transition-all ${
                    pageNum === page
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md shadow-sky-500/20 border border-sky-400/50'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-400/40'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </nav>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-slate-950 border border-sky-500/30 shadow-2xl shadow-sky-500/20 text-center overflow-hidden relative"
        >
          <div className="glow-orb w-[300px] h-[300px] bg-cyan-500/10 bottom-0 left-1/2 -translate-x-1/2" />
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-cyan-300 text-[10px] font-bold uppercase font-mono">
              <Zap className="w-3.5 h-3.5" /> Ready to Start?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Let&apos;s Create Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">Amazing Together</span>
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">
              Have a project in mind? We&apos;d love to hear about it and bring your vision to life.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-xs font-mono font-bold text-white shadow-lg shadow-sky-500/20 hover:scale-105 transition-all"
              >
                Start Your Project <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/#services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-200 hover:text-white hover:border-cyan-400/50 transition-all"
              >
                <PlayCircle className="w-4 h-4" /> Explore Services
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PortfolioSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="glass-card rounded-3xl border border-slate-800 overflow-hidden animate-pulse">
          <div className="w-full h-52 bg-slate-800/60" />
          <div className="p-5 space-y-3">
            <div className="h-5 w-2/3 bg-slate-800 rounded" />
            <div className="h-3.5 w-1/2 bg-slate-800/60 rounded" />
            <div className="h-3.5 w-full bg-slate-800/70 rounded" />
            <div className="h-3.5 w-4/5 bg-slate-800/70 rounded" />
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-16 bg-slate-800/60 rounded-md" />
              <div className="h-6 w-20 bg-slate-800/60 rounded-md" />
              <div className="h-6 w-14 bg-slate-800/60 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PortfolioLoading() {
  return (
    <div className="min-h-screen pt-32 pb-16 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioSkeleton />
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<PortfolioLoading />}>
      <PortfolioContent />
    </Suspense>
  );
}