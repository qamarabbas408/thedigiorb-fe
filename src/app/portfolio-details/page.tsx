import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Details',
  description: 'Explore our portfolio of successful projects and see how we transform ideas into digital reality.',
  alternates: {
    canonical: '/portfolio-details',
  },
};

export default function PortfolioDetailsPage() {
  return (
    <>
      {/* Page Title */}
      <div className="page-title">
        <div className="breadcrumbs">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/"><i className="bi bi-house"></i> Home</a></li>
              <li className="breadcrumb-item"><a href="#">Category</a></li>
              <li className="breadcrumb-item active current">Portfolio Details</li>
            </ol>
          </nav>
        </div>
        <div className="title-wrapper">
          <h1>Portfolio Details</h1>
          <p>Explore our recent work and see how we transform ideas into digital reality.</p>
        </div>
      </div>{/* End Page Title */}

      {/* Portfolio Details Section */}
      <section id="portfolio-details" className="portfolio-details section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-5">
            <div className="col-lg-7" data-aos="fade-right" data-aos-delay="100">
              <div className="hero-image-wrapper">
                <div className="portfolio-slider swiper init-swiper">
                  <script type="application/json" className="swiper-config">
                    {JSON.stringify({
                      loop: true,
                      speed: 700,
                      autoplay: { delay: 4500 },
                      effect: "slide",
                      slidesPerView: 1,
                      navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                      }
                    })}
                  </script>
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <img src="/assets/img/portfolio/portfolio-5.webp" alt="Project Showcase" className="img-fluid" />
                    </div>
                    <div className="swiper-slide">
                      <img src="/assets/img/portfolio/portfolio-7.webp" alt="Project Showcase" className="img-fluid" />
                    </div>
                    <div className="swiper-slide">
                      <img src="/assets/img/portfolio/portfolio-8.webp" alt="Project Showcase" className="img-fluid" />
                    </div>
                  </div>
                  <div className="swiper-button-prev"></div>
                  <div className="swiper-button-next"></div>
                </div>
                <div className="floating-badge">
                  <i className="bi bi-award"></i>
                  <span>Award Winning</span>
                </div>
              </div>
            </div>{/* End Image Column */}

            <div className="col-lg-5" data-aos="fade-left" data-aos-delay="200">
              <div className="project-info-card">
                <div className="project-category">
                  <span className="dot"></span>
                  <span>Web Application</span>
                </div>
                <h1 className="project-title">Creative Digital Experience Platform</h1>
                <p className="project-excerpt">A comprehensive digital platform designed to deliver exceptional user experiences with cutting-edge technology and intuitive design.</p>
                <div className="meta-grid">
                  <div className="meta-item">
                    <span className="meta-label">Client</span>
                    <span className="meta-value">TechVenture Labs</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Date</span>
                    <span className="meta-value">March 2024</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Duration</span>
                    <span className="meta-value">4 Months</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Website</span>
                    <a href="#" className="meta-value meta-link">project.example.com</a>
                  </div>
                </div>
                <div className="tech-stack">
                  <span className="tech-label">Tech Stack</span>
                  <div className="tech-icons">
                    <span className="tech-badge">Vue.js</span>
                    <span className="tech-badge">Laravel</span>
                    <span className="tech-badge">PostgreSQL</span>
                    <span className="tech-badge">Docker</span>
                  </div>
                </div>
              </div>
            </div>{/* End Info Column */}
          </div>

          <div className="stats-ribbon" data-aos="fade-up" data-aos-delay="300">
            <div className="stat-box">
              <span className="stat-number">25k+</span>
              <span className="stat-text">Monthly Users</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">99.9%</span>
              <span className="stat-text">Uptime</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">12</span>
              <span className="stat-text">Team Members</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">4.9</span>
              <span className="stat-text">Client Rating</span>
            </div>
          </div>

          <div className="content-sections">
            <div className="row gy-5">
              <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
                <div className="content-block">
                  <div className="block-header">
                    <span className="block-icon"><i className="bi bi-file-text"></i></span>
                    <h3>Project Overview</h3>
                  </div>
                  <p className="lead-text">We developed a complete digital solution that streamlined operations, improved user engagement, and delivered measurable business results for our client.</p>
                  <p>The project involved building a scalable architecture using modern technologies. We focused on creating an intuitive user interface while ensuring robust backend functionality. Regular testing and iterative improvements ensured the final product exceeded expectations.</p>
                  <p>Our team worked closely with stakeholders to understand their unique requirements and delivered a solution that addressed their specific challenges while preparing them for future growth.</p>
                </div>

                <div className="challenge-solution" data-aos="fade-up" data-aos-delay="200">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="cs-card challenge">
                        <div className="cs-icon">
                          <i className="bi bi-puzzle"></i>
                        </div>
                        <h4>The Challenge</h4>
                        <p>The client needed a unified platform to manage multiple business processes while ensuring seamless integration with existing systems.</p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="cs-card solution">
                        <div className="cs-icon">
                          <i className="bi bi-check2-circle"></i>
                        </div>
                        <h4>Our Solution</h4>
                        <p>We built a custom solution with modular architecture, enabling easy scaling and integration while maintaining high performance.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{/* End Main Content Column */}

              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                <div className="features-sidebar">
                  <h3 className="sidebar-title">Key Features</h3>
                  <div className="feature-list">
                    <div className="feature-item">
                      <div className="feature-icon">
                        <i className="bi bi-shield-lock"></i>
                      </div>
                      <div className="feature-content">
                        <h5>Advanced Security</h5>
                        <p>Multi-layer protection system</p>
                      </div>
                    </div>
                    <div className="feature-item">
                      <div className="feature-icon">
                        <i className="bi bi-speedometer2"></i>
                      </div>
                      <div className="feature-content">
                        <h5>High Performance</h5>
                        <p>Optimized for speed</p>
                      </div>
                    </div>
                    <div className="feature-item">
                      <div className="feature-icon">
                        <i className="bi bi-phone"></i>
                      </div>
                      <div className="feature-content">
                        <h5>Mobile Responsive</h5>
                        <p>Works on all devices</p>
                      </div>
                    </div>
                    <div className="feature-item">
                      <div className="feature-icon">
                        <i className="bi bi-cloud-arrow-up"></i>
                      </div>
                      <div className="feature-content">
                        <h5>Cloud Integration</h5>
                        <p>Seamless cloud sync</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{/* End Sidebar Column */}
            </div>
          </div>

          <div className="gallery-section" data-aos="fade-up" data-aos-delay="100">
            <div className="gallery-header">
              <span className="section-label"><i className="bi bi-images"></i> Gallery</span>
              <h3>Project Screenshots</h3>
            </div>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="gallery-card large">
                  <a href="/assets/img/portfolio/portfolio-11.webp" className="glightbox">
                    <img src="/assets/img/portfolio/portfolio-11.webp" alt="Project Screenshot" className="img-fluid" loading="lazy" />
                    <div className="gallery-overlay">
                      <i className="bi bi-zoom-in"></i>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row g-4">
                  <div className="col-12">
                    <div className="gallery-card">
                      <a href="/assets/img/portfolio/portfolio-12.webp" className="glightbox">
                        <img src="/assets/img/portfolio/portfolio-12.webp" alt="Project Screenshot" className="img-fluid" loading="lazy" />
                        <div className="gallery-overlay">
                          <i className="bi bi-zoom-in"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="gallery-card">
                      <a href="/assets/img/portfolio/portfolio-2.webp" className="glightbox">
                        <img src="/assets/img/portfolio/portfolio-2.webp" alt="Project Screenshot" className="img-fluid" loading="lazy" />
                        <div className="gallery-overlay">
                          <i className="bi bi-zoom-in"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="gallery-card">
                      <a href="/assets/img/portfolio/portfolio-3.webp" className="glightbox">
                        <img src="/assets/img/portfolio/portfolio-3.webp" alt="Project Screenshot" className="img-fluid" loading="lazy" />
                        <div className="gallery-overlay">
                          <i className="bi bi-zoom-in"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="navigation-bar" data-aos="fade-up" data-aos-delay="100">
            <a href="#" className="nav-link prev">
              <span className="nav-icon"><i className="bi bi-arrow-left-short"></i></span>
              <span className="nav-text">Previous Work</span>
            </a>
            <a href="#" className="nav-link center">
              <span className="nav-icon"><i className="bi bi-grid-3x3-gap"></i></span>
              <span className="nav-text">View All</span>
            </a>
            <a href="#" className="nav-link next">
              <span className="nav-text">Next Work</span>
              <span className="nav-icon"><i className="bi bi-arrow-right-short"></i></span>
            </a>
          </div>
        </div>
      </section>{/* /Portfolio Details Section */}
    </>
  );
}