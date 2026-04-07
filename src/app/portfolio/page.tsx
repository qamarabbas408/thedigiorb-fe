'use client';

import { Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
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
    const category = categories?.find(c => c.id === catId);
    return category?.name || catId;
  };

  const getFilterClass = (catId: string) => {
    const category = categories?.find(c => c.id === catId);
    return category?.filter_class || `filter-${catId}`;
  };

  const handleFilterClick = (filterClass: string, catId?: string) => {
    if (catId) {
      router.push(`/portfolio?page=1&category=${catId}`);
    } else {
      router.push(`/portfolio?page=1`);
    }
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
      <div className="min-h-screen pt-24 pb-12">
        <div className="container">
          <div className="section-title" data-aos="fade-up">
            <h2>Portfolio</h2>
            <p>Our Work & Projects</p>
          </div>
          <div className="text-center py-12">
            <div className="inline-block w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>Portfolio</h2>
          <p>Our Work & Projects</p>
        </div>

        <div className="portfolio" data-aos="fade-up" data-aos-delay="100">
          {/* Filters */}
          <div className="filters-wrapper mb-8">
            <ul className="portfolio-filters">
              <li 
                className={activeFilter === '*' ? 'filter-active' : ''}
                onClick={() => handleFilterClick('*')}
              >
                All Projects
              </li>
              {categories?.map((category) => (
                <li 
                  key={category.id}
                  className={activeFilter === category.id ? 'filter-active' : ''}
                  onClick={() => handleFilterClick(category.filter_class, category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Grid */}
          <div className="row g-4 portfolio-grid">
            {projects.length === 0 ? (
              <div className="col-12">
                <div className="empty-portfolio text-center py-12">
                  <i className="bi bi-briefcase text-5xl text-gray-300 mb-4"></i>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No projects found</h3>
                  <p className="text-gray-500">No projects in this category yet.</p>
                </div>
              </div>
              ) : (
              projects.map((project) => (
                <div 
                  key={project.id} 
                  className={`col-lg-4 col-md-6 portfolio-item ${getFilterClass(project.category_id)}`}
                >
                  <div className={`project-card ${project.featured ? 'featured' : ''}`}>
                    <Link href={`/portfolio/${project.id}`} className="image-wrapper">
                      <img 
                        src={project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'} 
                        alt={project.title} 
                        className="img-fluid" 
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop';
                        }}
                      />
                      <div className="hover-overlay">
                        <div className="overlay-actions">
                          <span className="action-btn">
                            <i className="bi bi-eye"></i>
                          </span>
                          <span className="action-btn">
                            <i className="bi bi-arrow-right-short"></i>
                          </span>
                        </div>
                      </div>
                      <span className="category-badge">{getCategoryName(project.category_id)}</span>
                      {project.featured && (
                        <span className="featured-badge">
                          <i className="bi bi-star-fill"></i> Featured
                        </span>
                      )}
                    </Link>
                    <div className="project-info">
                      <Link href={`/portfolio/${project.id}`}>
                        <h3>{project.title}</h3>
                      </Link>
                      {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
                      <p className="project-description">{project.description}</p>
                      <div className="project-meta">
                        <div className="tech-tags">
                          {project.technologies?.slice(0, 3).map((tech, index) => (
                            <span key={index}>{tech}</span>
                          ))}
                        </div>
                        <span className="year">{project.year}</span>
                      </div>
                      <Link href={`/portfolio/${project.id}`} className="view-details-btn">
                        View Details <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-wrapper mt-12 flex justify-center">
              <nav className="flex gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-lg border ${
                      pageNum === page 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </nav>
            </div>
          )}

          {/* CTA Section */}
          <div className="cta-section mt-16" data-aos="zoom-in">
            <div className="cta-content">
              <span className="cta-label">
                <i className="bi bi-lightning-charge-fill"></i> Ready to Start?
              </span>
              <h3>Let&apos;s Create Something Amazing Together</h3>
              <p>Have a project in mind? We&apos;d love to hear about it and bring your vision to life.</p>
              <div className="cta-buttons">
                <a href="/#contact" className="btn-cta-primary">
                  Start Your Project <i className="bi bi-arrow-right"></i>
                </a>
                <a href="/#services" className="btn-cta-secondary">
                  <i className="bi bi-play-circle"></i> Explore Services
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortfolioLoading() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>Portfolio</h2>
          <p>Our Work & Projects</p>
        </div>
        <div className="text-center py-12">
          <div className="inline-block w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
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