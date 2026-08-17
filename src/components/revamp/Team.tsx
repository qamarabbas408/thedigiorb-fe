'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Network } from 'lucide-react';
import { TEAM_MEMBERS, RevampTeamMember } from '@/lib/revamp';
import { useActiveTeam } from '@/hooks';

export const RevampTeam: React.FC = () => {
  const { data: dbTeam, isLoading } = useActiveTeam();

  // Prefer DB team members when available, otherwise fall back to mock data.
  const members: RevampTeamMember[] =
    dbTeam && dbTeam.length > 0
      ? dbTeam.map((t, idx) => {
          const gradient = [
            'from-cyan-500 to-blue-600',
            'from-blue-600 to-indigo-700',
            'from-sky-500 to-cyan-600',
            'from-indigo-500 to-sky-500',
          ];
          const initials = t.name
            .split(' ')
            .map((part) => part[0])
            .filter(Boolean)
            .join('')
            .slice(0, 2)
            .toUpperCase();
          return {
            id: String(t.id),
            name: t.name,
            initials: initials || '?',
            role: t.role,
            bio: t.bio || '',
            skills: [],
            avatarGradient: gradient[idx % gradient.length],
          };
        })
      : TEAM_MEMBERS;

  if (isLoading) return null;

  return (
    <section id="team" className="relative py-24 bg-[#030712] overflow-hidden">
      {/* Background glow */}
      <div className="glow-orb w-[600px] h-[600px] bg-blue-600/10 top-1/2 right-[-200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Network className="w-3.5 h-3.5 text-cyan-300" />
            <span>GRAPH ARCHITECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Meet the Minds Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">TheDigiOrb Graph</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Senior full-stack engineers, cloud architects, and UI systems designers driving innovation.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group glass-card p-6 rounded-3xl border border-slate-800 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between shadow-xl text-center relative overflow-hidden"
            >
              {/* Initials Avatar Block matching screenshot */}
              <div className="space-y-4">
                <div className="mx-auto w-24 h-24 rounded-2xl bg-slate-900 border-2 border-slate-700/80 group-hover:border-cyan-400 flex items-center justify-center shadow-2xl relative overflow-hidden transition-colors">
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.avatarGradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  <span className="text-3xl font-black font-mono tracking-widest text-white relative z-10">
                    {member.initials}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-sky-400 block mt-0.5">
                    {member.role}
                  </span>
                </div>

                {member.bio && (
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {member.bio}
                  </p>
                )}
              </div>

              {/* Skills and Social Links */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-4">
                {member.skills.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-mono font-semibold text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-center gap-3 text-slate-400">
                  <a
                    href="https://thedigiorb.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://thedigiorb.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:text-sky-400 hover:bg-slate-800 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://thedigiorb.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner matching screenshot stats bar */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 grid sm:grid-cols-2 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
              40+
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400 block font-mono font-bold">
              Projects Connected
            </span>
          </div>
          <div className="space-y-1 pt-6 sm:pt-0">
            <span className="text-4xl sm:text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
              5+
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400 block font-mono font-bold">
              Years Engineering
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};