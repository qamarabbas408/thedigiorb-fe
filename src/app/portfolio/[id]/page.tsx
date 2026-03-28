'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  categoryId: string;
  year: string;
  technologies: string[];
  description: string;
  image: string;
  gallery: string[];
  featured: boolean;
  client: string;
  url: string;
  status: string;
}

interface Category {
  id: string;
  name: string;
  filter_class: string;
}

export default function PortfolioDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { settings } = useSettings();
  const [project, setProject] = useState<Project | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjectData();
  }, [id]);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      const [projectRes, categoriesRes, allProjectsRes] = await Promise.all([
        fetch(`/api/portfolio/projects/${id}`),
        fetch('/api/portfolio/categories'),
        fetch('/api/portfolio/projects?status=published')
      ]);

      const projectData = await projectRes.json();
      const categoriesData = await categoriesRes.json();
      const allProjectsData = await allProjectsRes.json();

      if (!projectRes.ok) {
        setError(projectData.error || 'Project not found');
        return;
      }

      setProject(projectData);
      
      const categories = Array.isArray(categoriesData) ? categoriesData : [];
      const category = categories.find((c: Category) => c.id === projectData.categoryId);
      setCategory(category || null);

      const related = (Array.isArray(allProjectsData) ? allProjectsData : [])
        .filter((p: Project) => p.id !== id && p.categoryId === projectData.categoryId)
        .slice(0, 3);
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <i className="bi bi-exclamation-triangle text-6xl text-gray-400 mb-4" />
        <h3 className="text-2xl font-bold text-gray-700 mb-2">{error || 'Project not found'}</h3>
        <p className="text-gray-500 mb-6">The project you are looking for does not exist.</p>
        <Link href="/#portfolio" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <i className="bi bi-arrow-left" /> Back to Portfolio
        </Link>
      </div>
    );
  }

  const allImages = [project.image, ...project.gallery].filter(Boolean);

  return (
    <div>
      <div className="page-title">
        <div className="breadcrumbs">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/"><i className="bi bi-house" /> Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/#portfolio">Portfolio</Link>
              </li>
              {category && (
                <li className="breadcrumb-item">
                  <Link href="/#portfolio">{category.name}</Link>
                </li>
              )}
              <li className="breadcrumb-item active current">{project.title}</li>
            </ol>
          </nav>
        </div>
        <div className="title-wrapper">
          <h1>{project.title}</h1>
          {project.subtitle && <p>{project.subtitle}</p>}
        </div>
      </div>

      <section id="portfolio-details" className="portfolio-details section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-5">
            <div className="col-lg-7" data-aos="fade-right" data-aos-delay="100">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="portfolio-slider swiper init-swiper">
                  <script type="application/json" className="swiper-config">
                    {JSON.stringify({
                      loop: allImages.length > 1,
                      speed: 700,
                      autoplay: { delay: 4500, disableOnInteraction: false },
                      effect: "slide",
                      slidesPerView: 1,
                      pagination: allImages.length > 1 ? {
                        el: ".swiper-pagination",
                        clickable: true
                      } : false,
                      navigation: allImages.length > 1 ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                      } : false
                    })}
                  </script>
                  <div className="swiper-wrapper">
                    {allImages.length > 0 ? (
                      allImages.map((img, index) => (
                        <div key={index} className="swiper-slide">
                          <img src={img} alt={`${project.title} - Image ${index + 1}`} className="img-fluid w-full h-[450px] object-cover" />
                        </div>
                      ))
                    ) : (
                      <div className="swiper-slide">
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop" alt={project.title} className="img-fluid w-full h-[450px] object-cover" />
                      </div>
                    )}
                  </div>
                  {allImages.length > 1 && (
                    <>
                      <div className="swiper-button-prev" />
                      <div className="swiper-button-next" />
                      <div className="swiper-pagination" />
                    </>
                  )}
                </div>
                {project.featured && (
                  <div className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-semibold shadow-lg z-10">
                    <i className="bi bi-award" />
                    <span>Featured Project</span>
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-5" data-aos="fade-left" data-aos-delay="200">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                {category && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm font-semibold text-blue-500 uppercase tracking-wide">{category.name}</span>
                  </div>
                )}
                <h1 className="text-3xl font-bold text-slate-800 mb-2">{project.title}</h1>
                {project.subtitle && (
                  <p className="text-lg text-slate-500 mb-4">{project.subtitle}</p>
                )}
                {project.description && (
                  <p className="text-slate-600 leading-relaxed mb-6">{project.description}</p>
                )}
                
                <div className="grid grid-cols-2 gap-4 p-5 bg-slate-50 rounded-xl mb-6">
                  {project.client && (
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Client</span>
                      <span className="text-slate-700 font-medium">{project.client}</span>
                    </div>
                  )}
                  {project.year && (
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Year</span>
                      <span className="text-slate-700 font-medium">{project.year}</span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Status</span>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold w-fit ${project.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {project.status === 'published' ? 'Completed' : project.status}
                    </span>
                  </div>
                  {project.url && project.url !== '#' && (
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Website</span>
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1">
                        Visit <i className="bi bi-box-arrow-up-right" />
                      </a>
                    </div>
                  )}
                </div>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-6">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-3">Technologies Used</span>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <a href="#contact" className="block w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl">
                  <i className="bi bi-chat-dots mr-2" /> Start Similar Project
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-12 p-8 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl">
            {[
              { num: project.year || new Date().getFullYear(), label: 'Project Year' },
              { num: project.technologies?.length || 0, label: 'Technologies' },
              { num: allImages.length, label: 'Images' },
              { num: '100%', label: 'Satisfaction' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <span className="block text-4xl font-bold text-white mb-2">{stat.num}</span>
                <span className="text-sm text-slate-400 uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>

          {project.description && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl">
                      <i className="bi bi-file-text" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Project Overview</h3>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed">{project.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl mb-4 shadow-sm">
                      <i className="bi bi-puzzle text-amber-500" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">The Challenge</h4>
                    <p className="text-slate-600">We approached each requirement with careful analysis, ensuring every aspect of the project was thoroughly understood before implementation began.</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl mb-4 shadow-sm">
                      <i className="bi bi-check2-circle text-green-500" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">Our Solution</h4>
                    <p className="text-slate-600">Through innovative approaches and modern technologies, we delivered a robust solution that exceeds expectations and drives results.</p>
                  </div>
                </div>

                <div className="p-8 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl text-white">
                  <div className="relative">
                    <i className="bi bi-quote text-6xl text-blue-500/30 absolute -top-2 left-0" />
                    <p className="text-lg italic leading-relaxed pl-10 mb-6">
                      Working with {settings?.company_name || 'DigitalOrbit'} was an excellent experience. They delivered beyond our expectations and the results have been outstanding.
                    </p>
                    <div className="flex items-center gap-4 pl-10">
                      <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
                        <i className="bi bi-person-circle" />
                      </div>
                      <div>
                        <span className="block font-semibold">{project.client || 'Happy Client'}</span>
                        <span className="text-slate-400 text-sm">Project Partner</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-5">What We Delivered</h3>
                  <div className="space-y-4">
                    {[
                      { icon: 'bi-pc-display', title: 'Responsive Design', desc: 'Works perfectly on all devices' },
                      { icon: 'bi-shield-lock', title: 'Secure Architecture', desc: 'Enterprise-grade security' },
                      { icon: 'bi-lightning-charge', title: 'High Performance', desc: 'Optimized for speed' },
                      { icon: 'bi-gear', title: 'Easy Maintenance', desc: 'Clean, maintainable code' }
                    ].map((feature, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-blue-500 text-xl shadow-sm flex-shrink-0">
                          <i className={feature.icon} />
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-800">{feature.title}</h5>
                          <p className="text-sm text-slate-500">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-2xl text-center text-white">
                  <h4 className="text-xl font-bold mb-2">Like This Project?</h4>
                  <p className="text-blue-100 mb-4">Let&apos;s create something amazing together for your business.</p>
                  <a href="#contact" className="inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    <i className="bi bi-envelope" /> Get in Touch
                  </a>
                </div>
              </div>
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-16">
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 uppercase tracking-wide mb-2">
                  <i className="bi bi-images" /> Gallery
                </span>
                <h3 className="text-3xl font-bold text-slate-800">Project Screenshots</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {project.gallery.map((img, index) => (
                  <div key={index} className={`group relative overflow-hidden rounded-xl ${index === 0 ? 'md:col-span-2' : ''}`}>
                    <a href={img} className="glightbox block" data-gallery="project-gallery">
                      <img 
                        src={img} 
                        alt={`${project.title} screenshot ${index + 1}`} 
                        className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${index === 0 ? 'h-96' : 'h-64'}`}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <i className="bi bi-zoom-in text-white text-3xl" />
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {relatedProjects.length > 0 && (
            <div className="mt-16">
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 uppercase tracking-wide mb-2">
                  <i className="bi bi-collection" /> Related
                </span>
                <h3 className="text-3xl font-bold text-slate-800">Similar Projects</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((related) => (
                  <Link key={related.id} href={`/portfolio/${related.id}`} className="group">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img 
                          src={related.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop'} 
                          alt={related.title} 
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-4 py-2 bg-white text-slate-800 rounded-lg font-medium text-sm flex items-center gap-2">
                            View Project <i className="bi bi-arrow-right" />
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide">{category?.name}</span>
                        <h4 className="text-lg font-bold text-slate-800 mt-1">{related.title}</h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-slate-200 flex justify-center">
            <Link href="/#portfolio" className="flex items-center gap-3 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
              <i className="bi bi-grid-3x3-gap text-xl" />
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
