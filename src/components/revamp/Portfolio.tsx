'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Network } from 'lucide-react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '@/lib/revamp';
import { usePublishedProjects, useCategories } from '@/hooks';
import ProjectImage from './ProjectImage';

interface PortfolioSectionProps {
  onSelectProject: (project: PortfolioItem) => void;
  isLoading?: boolean;
}

export const RevampPortfolio: React.FC<PortfolioSectionProps> = ({
  onSelectProject,
  isLoading: propIsLoading = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Projects');
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);

  const { data: categories } = useCategories();
  const { data: dbProjects, isLoading: dbLoading } = usePublishedProjects();

  const mockCategories = ['All Projects', 'Desktop Application', 'Mobile Design', 'UI/UX', 'Web Design'];

  // Prefer DB projects when available, otherwise fall back to mock data.
  const projects: PortfolioItem[] =
    dbProjects && dbProjects.length > 0
      ? dbProjects.map((p) => {
          const catName = categories?.find((c) => c.id === p.category_id)?.name || p.category_id || 'Web Design';
          return {
            id: String(p.id),
            title: p.title,
            category: catName as PortfolioItem['category'],
            badge: p.featured ? 'Featured' : undefined,
            description: p.description || p.subtitle || '',
            fullDetails: p.description,
            technologies: p.technologies || [],
            year: p.year || '2025',
            image: p.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            metrics: p.client,
            liveUrl: p.url,
          };
        })
      : PORTFOLIO_ITEMS;

  // Build tab list from DB categories when present, else mock.
  const categoriesList: string[] =
    categories && categories.length > 0
      ? ['All Projects', ...categories.map((c) => c.name)]
      : mockCategories;

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    setIsCategoryLoading(true);
    setActiveCategory(cat);
    setTimeout(() => {
      setIsCategoryLoading(false);
    }, 350);
  };

  const isLoading = propIsLoading || isCategoryLoading || dbLoading;

  const filteredItems = activeCategory === 'All Projects'
    ? projects
    : projects.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 bg-[#030712] border-t border-b border-slate-800/80 overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb w-[600px] h-[600px] bg-sky-600/10 bottom-0 left-[-200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Network className="w-3.5 h-3.5 text-cyan-300" />
            <span>GRAPH DELIVERABLES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Deployed Systems &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
              Case Studies
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            Explore our repository of deployed web platforms, cross-platform mobile apps, cloud backends, and responsive design systems.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categoriesList.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 shadow-lg shadow-sky-500/25 scale-105 border border-sky-400/40'
                    : 'text-slate-400 bg-slate-900/80 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Portfolio Cards Grid or Skeleton Loader */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="glass-card rounded-3xl overflow-hidden border border-slate-800/80 p-0 flex flex-col justify-between shadow-xl animate-pulse"
              >
                {/* Image Placeholder Skeleton */}
                <div className="relative h-56 w-full bg-slate-800/60 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/20 to-transparent animate-shimmer" />
                  <div className="absolute top-4 left-4 h-6 w-20 rounded-md bg-slate-700/50" />
                  <div className="absolute top-4 right-4 h-6 w-16 rounded-md bg-slate-700/50" />
                </div>

                {/* Info Content Skeleton */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-24 bg-slate-800 rounded" />
                      <div className="h-3 w-16 bg-slate-800 rounded" />
                    </div>
                    <div className="h-6 w-3/4 bg-slate-800 rounded-lg" />
                    <div className="space-y-1.5 pt-1">
                      <div className="h-3.5 w-full bg-slate-800/60 rounded" />
                      <div className="h-3.5 w-5/6 bg-slate-800/60 rounded" />
                    </div>
                  </div>

                  {/* Tech Tags & Button Skeleton */}
                  <div className="space-y-4 pt-2">
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-slate-800 rounded-md" />
                      <div className="h-6 w-20 bg-slate-800 rounded-md" />
                      <div className="h-6 w-14 bg-slate-800 rounded-md" />
                    </div>
                    <div className="h-10 w-full bg-slate-800/80 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredItems.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between shadow-xl"
                >
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <ProjectImage
                      src={project.image}
                      title={project.title}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/20 to-transparent"></div>

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono font-bold text-cyan-300">
                        {project.category}
                      </span>
                      {project.badge && (
                        <span className="px-3 py-1 rounded-md bg-sky-500/20 border border-sky-400/40 text-[9px] font-mono font-bold uppercase text-emerald-300 backdrop-blur-md">
                          {project.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                        <span>DEPLOYED: {project.year}</span>
                        <span className="text-emerald-400 font-semibold">● ACTIVE NODE</span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-slate-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mt-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Tags */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono font-semibold text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => onSelectProject(project)}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-cyan-400 border border-slate-800 group-hover:border-transparent text-xs font-mono font-bold text-slate-200 group-hover:text-slate-950 transition-all duration-300 flex items-center justify-between"
                      >
                        <span>Inspect Deliverable</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};