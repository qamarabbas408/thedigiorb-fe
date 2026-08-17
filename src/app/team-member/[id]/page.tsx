import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Award, Briefcase, Home, UserRound, Zap, Users, LayoutGrid } from 'lucide-react';
import { teamMembers, TeamMember } from '@/data/teamMembers';
import JsonLd from '@/components/JsonLd';

interface TeamMemberPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return teamMembers.map((member) => ({ id: String(member.id) }));
}

function buildMemberSchemas(member: TeamMember) {
  const profileUrl = `https://thedigiorb.com/team-member/${member.id}`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${profileUrl}#person`,
    name: member.name,
    jobTitle: member.role,
    description: member.bio,
    url: profileUrl,
    worksFor: { "@id": "https://thedigiorb.com/#organization" },
    ...(member.photo ? { image: member.photo } : {}),
    ...(member.stack.length > 0 ? { knowsAbout: member.stack } : {}),
    ...(member.experience.length > 0
      ? {
          alumniOf: member.experience
            .filter((e) => e.company !== "TheDigiOrb")
            .map((e) => ({
              "@type": "Organization",
              name: e.company,
            })),
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://thedigiorb.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Team",
        item: "https://thedigiorb.com/#team",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: member.name,
        item: profileUrl,
      },
    ],
  };

  return [personSchema, breadcrumbSchema];
}

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const { id } = await params;
  const member = teamMembers.find((m) => String(m.id) === id);

  const title = member ? `${member.name} - ${member.role}` : 'Team Member';
  const description = member?.bio;

  return {
    title,
    description,
    alternates: {
      canonical: `/team-member/${id}`,
    },
    openGraph: {
      type: 'profile',
      url: `/team-member/${id}`,
      title,
      description,
      siteName: 'TheDigiOrb',
      images: [
        member?.photo
          ? { url: member.photo, width: 1200, height: 630, alt: member.name }
          : { url: '/assets/img/og-image.png', width: 1200, height: 630, alt: 'TheDigiOrb - Digital Solutions' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [member?.photo ?? '/assets/img/og-image.png'],
    },
  };
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { id } = await params;
  const member = teamMembers.find((m) => String(m.id) === id);

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#030712]">
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6">
          <UserRound className="w-10 h-10 text-red-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Member not found</h3>
        <p className="text-slate-400 mb-6">The team member you are looking for does not exist.</p>
        <Link
          href="/#team"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-xs font-mono font-bold text-white shadow-lg shadow-sky-500/20 hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Team
        </Link>
      </div>
    );
  }

  return (
    <>
      {buildMemberSchemas(member).map((schema) => (
        <JsonLd key={schema["@type"]} data={schema} />
      ))}
      <TeamMemberProfile member={member} />
    </>
  );
}

function TeamMemberProfile({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const metaItems = [
    { label: 'Experience', value: member.yearsExperience > 0 ? `${member.yearsExperience}+ Years` : '' },
    { label: 'Specialties', value: member.stack.length > 0 ? `${member.stack.length} Technologies` : '' },
    { label: 'Projects', value: member.projectsCount > 0 ? `${member.projectsCount}+ Delivered` : '' },
    { label: 'Focus', value: member.stack[0] || '' },
  ].filter((m) => m.value);

  const hasContent =
    member.stack.length > 0 ||
    member.skills.length > 0 ||
    member.experience.length > 0 ||
    member.hobbies.length > 0;

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
          <Link href="/#team" className="hover:text-cyan-300 transition-colors">Team</Link>
          <span className="text-slate-700">/</span>
          <span className="text-cyan-300">{member.name}</span>
        </nav>

        {/* Profile Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Photo Column */}
          <div className="lg:col-span-4">
            <div className="glass-card p-6 rounded-3xl border border-slate-800 shadow-2xl relative">
              <div className="rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-700/80 relative h-72">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-blue-600/10">
                    <span className="text-6xl font-black font-mono tracking-widest text-white">{initials}</span>
                  </div>
                )}
              </div>
              {member.yearsExperience > 0 && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-mono font-bold shadow-lg shadow-amber-500/30 whitespace-nowrap">
                  <Award className="w-4 h-4" />
                  {member.yearsExperience}+ Years Experience
                </div>
              )}
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-8">
            <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_8px_#38bdf8]" />
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wide">{member.role}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{member.name}</h1>
              <p className="text-slate-300 leading-relaxed mt-4">{member.bio}</p>

              {metaItems.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {metaItems.map((item) => (
                    <div key={item.label} className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
                      <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wide block">{item.label}</span>
                      <span className="text-white font-bold text-sm mt-1 block">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {member.stack.length > 0 && (
                <div className="mt-6">
                  <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wide block mb-3">Tech Stack</span>
                  <div className="flex flex-wrap gap-2">
                    {member.stack.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-sky-500/10 border border-sky-500/30 text-sky-400 rounded-full text-xs font-mono font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {hasContent && (
          <div className="grid lg:grid-cols-12 gap-8 mt-12">
            {/* Main Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-xl">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white">
                    <UserRound className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">About</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">{member.bio}</p>
              </div>

              {member.experience.length > 0 && (
                <div className="glass-card p-8 rounded-3xl border border-slate-800 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Experience</h3>
                  </div>
                  <div className="space-y-6 border-l border-slate-800 pl-6">
                    {member.experience.map((exp) => (
                      <div key={`${exp.role}-${exp.company}`} className="relative">
                        <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                        <span className="text-[11px] font-mono font-bold text-cyan-300 uppercase">{exp.period}</span>
                        <h4 className="text-lg font-bold text-white mt-1">
                          {exp.role} <span className="text-slate-400 font-normal">· {exp.company}</span>
                        </h4>
                        <p className="text-slate-400 text-sm leading-relaxed mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              {member.skills.length > 0 && (
                <div className="glass-card p-6 rounded-3xl border border-slate-800 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-5">Skills</h3>
                  <div className="space-y-4">
                    {member.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-semibold text-slate-200">{skill.name}</span>
                          <span className="text-xs font-mono text-cyan-300 font-bold">{skill.level}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                          <span
                            className="block h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all duration-700"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {member.hobbies.length > 0 && (
                <div className="glass-card p-6 rounded-3xl border border-slate-800 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-5">Outside of Work</h3>
                  <div className="flex flex-wrap gap-2">
                    {member.hobbies.map((hobby) => (
                      <span key={hobby.label} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-semibold text-slate-300 flex items-center gap-1.5">
                        <span aria-hidden="true">{hobby.icon}</span>
                        {hobby.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {member.projectsCount > 0 && (
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-slate-950 border border-sky-500/30 shadow-xl text-center">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase tracking-wide mb-2">
              <LayoutGrid className="w-4 h-4" /> Projects
            </span>
            <h3 className="text-2xl font-bold text-white mb-4">Projects Worked On</h3>
            <div className="flex items-center justify-center gap-4">
              <span className="text-5xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                {member.projectsCount}+
              </span>
              <span className="text-sm text-slate-400 font-mono">Projects Delivered</span>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-slate-950 border border-sky-500/30 shadow-2xl shadow-sky-500/20 text-center overflow-hidden relative">
          <div className="glow-orb w-[300px] h-[300px] bg-cyan-500/10 bottom-0 left-1/2 -translate-x-1/2" />
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-cyan-300 text-[10px] font-bold uppercase font-mono">
              <Zap className="w-3.5 h-3.5" /> Let&apos;s Collaborate
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Want to work with <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">{member.name.split(" ")[0]}</span>?
            </h3>
            <p className="text-slate-400 text-sm sm:text-base">Tell us about your project and our team will get back to you.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 text-xs font-mono font-bold text-white shadow-lg shadow-sky-500/20 hover:scale-105 transition-all"
              >
                Get in Touch <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
              <Link
                href="/#team"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-slate-200 hover:text-white hover:border-cyan-400/50 transition-all"
              >
                <Users className="w-4 h-4" /> Meet the Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}