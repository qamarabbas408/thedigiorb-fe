import Link from 'next/link';
import { teamMembers, TeamMember } from '@/data/teamMembers';

interface TeamMemberPageProps {
  params: Promise<{ id: string }>;
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { id } = await params;
  const member = teamMembers.find((m) => String(m.id) === id);

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <i className="bi bi-person-exclamation text-6xl text-gray-400 mb-4" />
        <h3 className="text-2xl font-bold text-gray-700 mb-2">Member not found</h3>
        <p className="text-gray-500 mb-6">The team member you are looking for does not exist.</p>
        <Link href="/#team" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <i className="bi bi-arrow-left" /> Back to Team
        </Link>
      </div>
    );
  }

  return <TeamMemberProfile member={member} />;
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
    <>
      {/* Page Title */}
      <div className="page-title">
        <div className="breadcrumbs">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"><i className="bi bi-house"></i> Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/#team">Team</Link>
              </li>
              <li className="breadcrumb-item active current">{member.name}</li>
            </ol>
          </nav>
        </div>
        <div className="title-wrapper">
          <h1>{member.name}</h1>
          <p>{member.role}</p>
        </div>
      </div>{/* End Page Title */}

      {/* Team Member Section */}
      <section id="team-member" className="team-member section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-5">
            {/* Photo Column */}
            <div className="col-lg-4" data-aos="fade-right" data-aos-delay="100">
              <div className="profile-card">
                <div className="profile-photo">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} />
                  ) : (
                    <div className="avatar-fallback">{initials}</div>
                  )}
                  {member.yearsExperience > 0 && (
                    <div className="floating-badge">
                      <i className="bi bi-award"></i>
                      <span>{member.yearsExperience}+ Years Experience</span>
                    </div>
                  )}
                </div>
              </div>
            </div>{/* End Photo Column */}

            {/* Info Column */}
            <div className="col-lg-8" data-aos="fade-left" data-aos-delay="200">
              <div className="member-info-card">
                <div className="member-category">
                  <span className="dot"></span>
                  <span>{member.role}</span>
                </div>
                <h1>{member.name}</h1>
                <p className="member-bio">{member.bio}</p>

                {metaItems.length > 0 && (
                  <div className="meta-grid">
                    {metaItems.map((item) => (
                      <div key={item.label} className="meta-item">
                        <span className="meta-label">{item.label}</span>
                        <span className="meta-value">{item.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {member.stack.length > 0 && (
                  <div className="tech-stack">
                    <span className="tech-label">Tech Stack</span>
                    <div className="tech-icons">
                      {member.stack.map((tech) => (
                        <span key={tech} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>{/* End Info Column */}
          </div>

          {hasContent && (
            <div className="content-sections">
              <div className="row gy-5">
                <div className="col-lg-7" data-aos="fade-up" data-aos-delay="100">
                  <div className="content-block">
                    <div className="block-header">
                      <span className="block-icon"><i className="bi bi-person-badge"></i></span>
                      <h3>About</h3>
                    </div>
                    <p>{member.bio}</p>
                  </div>

                  {member.experience.length > 0 && (
                    <div className="content-block">
                      <div className="block-header">
                        <span className="block-icon"><i className="bi bi-briefcase"></i></span>
                        <h3>Experience</h3>
                      </div>
                      <div className="experience-list">
                        {member.experience.map((exp) => (
                          <div key={`${exp.role}-${exp.company}`} className="experience-item">
                            <span className="exp-period">{exp.period}</span>
                            <h4>
                              {exp.role} <span>· {exp.company}</span>
                            </h4>
                            <p>{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>{/* End Main Content Column */}

                <div className="col-lg-5" data-aos="fade-up" data-aos-delay="200">
                  {member.skills.length > 0 && (
                    <div className="features-sidebar">
                      <h3 className="sidebar-title">Skills</h3>
                      <div className="skill-list">
                        {member.skills.map((skill) => (
                          <div key={skill.name} className="skill-item">
                            <div className="skill-header">
                              <span>{skill.name}</span>
                              <span>{skill.level}%</span>
                            </div>
                            <div className="skill-bar">
                              <span style={{ width: `${skill.level}%` }}></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {member.hobbies.length > 0 && (
                    <div className="features-sidebar">
                      <h3 className="sidebar-title">Outside of Work</h3>
                      <div className="hobby-list">
                        {member.hobbies.map((hobby) => (
                          <span key={hobby.label} className="hobby-item">
                            <span aria-hidden="true">{hobby.icon}</span>
                            {hobby.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>{/* End Sidebar Column */}
              </div>
            </div>
          )}

          {member.projectsCount > 0 && (
            <div className="projects-section" data-aos="fade-up" data-aos-delay="100">
              <div className="projects-header">
                <span className="section-label">
                  <i className="bi bi-collection"></i> Projects
                </span>
                <h3>Projects Worked On</h3>
              </div>
              <div className="projects-count">
                <div className="projects-count-number">{member.projectsCount}+</div>
                <div className="projects-count-label">Projects Delivered</div>
              </div>
            </div>
          )}

          <div className="cta-section" data-aos="zoom-in">
            <div className="cta-content">
              <span className="cta-label">
                <i className="bi bi-lightning-charge-fill"></i> Let&apos;s Collaborate
              </span>
              <h3>Want to work with {member.name.split(" ")[0]}?</h3>
              <p>Tell us about your project and our team will get back to you.</p>
              <div className="cta-buttons">
                <Link href="/#contact" className="btn-cta-primary">
                  Get in Touch <i className="bi bi-arrow-right"></i>
                </Link>
                <Link href="/#team" className="btn-cta-secondary">
                  <i className="bi bi-people"></i> Meet the Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>{/* /Team Member Section */}
    </>
  );
}
