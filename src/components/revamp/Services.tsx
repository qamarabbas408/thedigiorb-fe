'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, X, Network } from 'lucide-react';
import { SERVICES, ServiceItem, getIcon } from '@/lib/revamp';
import { usePublishedServices } from '@/hooks';

interface ServicesSectionProps {
  onContactClick?: () => void;
}

export const RevampServices: React.FC<ServicesSectionProps> = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const { data: dbServices, isLoading } = usePublishedServices();

  const nodeCodes = ["NODE #WEB-01", "NODE #MOBILE-02", "NODE #UI-03", "NODE #ECOM-04", "NODE #CLOUD-05", "NODE #MKTG-06"];

  // Prefer DB services when available, otherwise fall back to mock data.
  // DB shape: { id, title, description, icon, featured, ... }
  // Mock shape: { id, title, subtitle, description, iconName, popular, features, techStack }
  const services: ServiceItem[] =
    dbServices && dbServices.length > 0
      ? dbServices.map((s, index) => ({
          id: String(s.id),
          title: s.title,
          subtitle: s.icon || 'Enterprise service node',
          description: s.description,
          iconName: s.icon,
          popular: !!s.featured,
          features: [],
          techStack: [],
        }))
      : SERVICES;

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative py-24 bg-[#030712] overflow-hidden">
      {/* Glow shapes */}
      <div className="glow-orb w-[600px] h-[600px] bg-sky-600/10 top-0 right-[-200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Network className="w-3.5 h-3.5 text-cyan-300" />
            <span>CAPABILITIES GRAPH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Connected Engineering Nodes for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
              Enterprise Scale
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            Deploy specialized software nodes into your infrastructure. Each capability operates as an integrated module in our agency workflow graph.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!isLoading && services.map((service, index) => {
            const IconComponent = getIcon(service.iconName);
            const nodeCode = nodeCodes[index % nodeCodes.length];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative glass-card p-8 rounded-3xl border border-slate-800 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                {/* Node ID Badge Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/30 text-[10px] font-mono font-bold text-sky-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span>{nodeCode}</span>
                  </div>
                  {service.popular && (
                    <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-[9px] font-mono font-black uppercase tracking-wider text-white shadow-md shadow-sky-500/20">
                      ★ TOP NODE
                    </div>
                  )}
                </div>

                <div>
                  {/* Icon Header */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-sky-500 group-hover:to-cyan-400 group-hover:text-slate-950 transition-all duration-300 shadow-lg shadow-sky-500/10">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs font-semibold text-sky-400 mb-4 font-mono">
                    {service.subtitle}
                  </p>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bullet points summary */}
                  {service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Card Footer: Tech Stack & Action */}
                <div>
                  {service.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-800/80">
                      {service.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono font-semibold text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 group-hover:bg-sky-500/20 border border-slate-800 group-hover:border-sky-500/40 text-xs font-mono font-bold text-slate-200 group-hover:text-cyan-300 transition-all flex items-center justify-between"
                  >
                    <span>Inspect Node</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-sky-500/40 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Close service modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-cyan-300">
                  <Network className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedService.title}</h3>
                  <span className="text-xs text-sky-400 font-mono">{selectedService.subtitle}</span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {selectedService.description}
              </p>

              {selectedService.features.length > 0 && (
                <>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">Node Specifications</h4>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {selectedService.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200">{feat}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedService.techStack.length > 0 && (
                <>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">Linked Technologies</h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedService.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-cyan-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    handleContactClick();
                  }}
                  className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-white font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
                >
                  <span>Connect Node to Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};