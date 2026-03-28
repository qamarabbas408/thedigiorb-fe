'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  categoryId: string;
  year: string;
  technologies: string[];
  description: string;
  image: string;
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

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('*');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        fetch('/api/portfolio/projects?status=published'),
        fetch('/api/portfolio/categories')
      ]);
      const projectsData = await projectsRes.json();
      const categoriesData = await categoriesRes.json();
      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error('Failed to fetch portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || categoryId;
  };

  const getFilterClass = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.filter_class || `filter-${categoryId}`;
  };

  const handleFilterClick = (filterClass: string) => {
    setActiveFilter(filterClass);
  };

  const filteredProjects = projects.filter(project => {
    if (activeFilter === '*') return true;
    return getFilterClass(project.categoryId) === activeFilter;
  });

  if (loading) {
    return (
      <section id="portfolio" className="portfolio section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Portfolio</h2>
          <p>Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Portfolio</h2>
        <p>Our Work & Projects</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="portfolio-container" data-default-filter="*" data-layout="fitRows" data-sort="original-order">
          <div className="filters-wrapper" data-aos="fade-up" data-aos-delay="100">
            <ul className="portfolio-filters">
              <li 
                data-filter="*" 
                className={activeFilter === '*' ? 'filter-active' : ''}
                onClick={() => handleFilterClick('*')}
              >
                All Projects
              </li>
              {categories.map((category) => (
                <li 
                  key={category.id}
                  data-filter={category.filter_class}
                  className={activeFilter === category.filter_class ? 'filter-active' : ''}
                  onClick={() => handleFilterClick(category.filter_class)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="row g-4 portfolio-grid" data-aos="fade-up" data-aos-delay="200">
            {projects.length === 0 ? (
              <div className="col-12">
                <div className="empty-portfolio">
                  <i className="bi bi-briefcase"></i>
                  <h3>No projects yet</h3>
                  <p>We&apos;re working on exciting new projects. Check back soon!</p>
                  <a href="#contact" className="btn btn-primary">
                    <i className="bi bi-envelope"></i> Get in Touch
                  </a>
                </div>
              </div>
            ) : filteredProjects.length === 0 && activeFilter !== '*' ? (
              <div className="col-12">
                <div className="empty-portfolio">
                  <i className="bi bi-folder2-open"></i>
                  <h3>No projects in this category</h3>
                  <p>We don&apos;t have any projects in this category yet. Check back soon!</p>
                  <button 
                  
                    onClick={() => handleFilterClick('*')} 
                    className="btn btn-primary mt-3 p-3"
                  >
                    View All Projects
                  </button>
                </div>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className={`col-lg-4 col-md-6 portfolio-item ${getFilterClass(project.categoryId)}`}
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
                      <span className="category-badge">{getCategoryName(project.categoryId)}</span>
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
                          {project.technologies?.map((tech, index) => (
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

          {projects.length > 0 && (
            <div className="cta-section" data-aos="zoom-in" data-aos-delay="300">
              <div className="cta-content">
                <span className="cta-label">
                  <i className="bi bi-lightning-charge-fill"></i> Ready to Start?
                </span>
                <h3>Let&apos;s Create Something Amazing Together</h3>
                <p>Have a project in mind? We&apos;d love to hear about it and bring your vision to life.</p>
                <div className="cta-buttons">
                  <a href="#contact" className="btn-cta-primary">
                    Start Your Project <i className="bi bi-arrow-right"></i>
                  </a>
                  <a href="#services" className="btn-cta-secondary">
                    <i className="bi bi-play-circle"></i> Explore Services
                  </a>
                </div>
              </div>
              <div className="cta-decoration">
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
