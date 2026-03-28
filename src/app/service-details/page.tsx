import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Details',
  description: 'Learn more about our expert services and how we can help transform your business.',
  alternates: {
    canonical: '/service-details',
  },
};

export default function ServiceDetailsPage() {
  return (
    <>
      {/* Page Title */}
      <div className="page-title">
        <div className="breadcrumbs">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/"><i className="bi bi-house"></i> Home</a></li>
              <li className="breadcrumb-item"><a href="#">Category</a></li>
              <li className="breadcrumb-item active current">Service Details</li>
            </ol>
          </nav>
        </div>
        <div className="title-wrapper">
          <h1>Service Details</h1>
          <p>Learn more about how our expert services can help your business grow.</p>
        </div>
      </div>{/* End Page Title */}

      {/* Service Details Section */}
      <section id="service-details" className="service-details section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-5">
            {/* Main Content Column */}
            <div className="col-lg-8">
              {/* Service Hero Image */}
              <div className="service-hero" data-aos="fade-up" data-aos-delay="100">
                <img src="/assets/img/services/services-7.webp" alt="Service detail" className="img-fluid" />
                <div className="service-badge">
                  <i className="bi bi-star-fill"></i>
                  <span>Premium Solution</span>
                </div>
              </div>

              {/* Service Overview */}
              <div className="service-overview" data-aos="fade-up" data-aos-delay="200">
                <div className="overview-label">
                  <span className="dot"></span>
                  <span>What We Deliver</span>
                </div>
                <h2>Comprehensive Digital Transformation Solutions</h2>
                <p>We help businesses embrace digital technologies to streamline operations, enhance customer experiences, and achieve sustainable growth. Our team of experts delivers tailored solutions that address your unique challenges.</p>
                <p>From initial consultation to implementation and support, we partner with you every step of the way. Our proven methodologies ensure successful delivery and measurable results for your organization.</p>
              </div>

              {/* Key Features */}
              <div className="key-features" data-aos="fade-up" data-aos-delay="300">
                <h3>Key Capabilities</h3>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <i className="bi bi-lightning-charge"></i>
                      </div>
                      <div className="feature-content">
                        <h4>Rapid Deployment</h4>
                        <p>Get your solution up and running quickly with our efficient development process and proven delivery framework.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <i className="bi bi-shield-check"></i>
                      </div>
                      <div className="feature-content">
                        <h4>Enterprise Security</h4>
                        <p>Protect your data with bank-grade security measures and compliance with industry standards.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <i className="bi bi-graph-up-arrow"></i>
                      </div>
                      <div className="feature-content">
                        <h4>Scalable Architecture</h4>
                        <p>Build for growth with flexible solutions that expand seamlessly as your business evolves.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="feature-card">
                      <div className="feature-icon">
                        <i className="bi bi-headset"></i>
                      </div>
                      <div className="feature-content">
                        <h4>Dedicated Support</h4>
                        <p>Rely on our responsive support team for ongoing assistance and troubleshooting.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Process Section */}
              <div className="service-process" data-aos="fade-up" data-aos-delay="400">
                <h3>Implementation Process</h3>
                <div className="process-timeline">
                  <div className="process-item">
                    <div className="process-number">01</div>
                    <div className="process-content">
                      <h4>Discovery &amp; Analysis</h4>
                      <p>We begin by understanding your business goals, challenges, and requirements through detailed discussions and analysis.</p>
                    </div>
                  </div>
                  <div className="process-item">
                    <div className="process-number">02</div>
                    <div className="process-content">
                      <h4>Strategic Planning</h4>
                      <p>Our team develops a comprehensive roadmap with clear milestones, timelines, and technical specifications.</p>
                    </div>
                  </div>
                  <div className="process-item">
                    <div className="process-number">03</div>
                    <div className="process-content">
                      <h4>Development &amp; Testing</h4>
                      <p>We build your solution using industry best practices, with rigorous testing at every stage of development.</p>
                    </div>
                  </div>
                  <div className="process-item">
                    <div className="process-number">04</div>
                    <div className="process-content">
                      <h4>Launch &amp; Optimization</h4>
                      <p>We deploy your solution and provide ongoing support to ensure optimal performance and continuous improvement.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Section */}
              <div className="service-gallery" data-aos="fade-up" data-aos-delay="500">
                <h3>Project Showcase</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <a href="/assets/img/services/services-3.webp" className="glightbox" data-gallery="service-gallery">
                      <img src="/assets/img/services/services-3.webp" alt="Project showcase" className="img-fluid" loading="lazy" />
                    </a>
                  </div>
                  <div className="col-md-6">
                    <a href="/assets/img/services/services-5.webp" className="glightbox" data-gallery="service-gallery">
                      <img src="/assets/img/services/services-5.webp" alt="Project showcase" className="img-fluid" loading="lazy" />
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href="/assets/img/services/services-8.webp" className="glightbox" data-gallery="service-gallery">
                      <img src="/assets/img/services/services-8.webp" alt="Project showcase" className="img-fluid" loading="lazy" />
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href="/assets/img/services/services-10.webp" className="glightbox" data-gallery="service-gallery">
                      <img src="/assets/img/services/services-10.webp" alt="Project showcase" className="img-fluid" loading="lazy" />
                    </a>
                  </div>
                  <div className="col-md-4">
                    <a href="/assets/img/services/services-12.webp" className="glightbox" data-gallery="service-gallery">
                      <img src="/assets/img/services/services-12.webp" alt="Project showcase" className="img-fluid" loading="lazy" />
                    </a>
                  </div>
                </div>
              </div>
            </div>{/* End Main Content Column */}

            {/* Sidebar Column */}
            <div className="col-lg-4">
              {/* Service List */}
              <div className="sidebar-widget service-list" data-aos="fade-up" data-aos-delay="200">
                <h3>All Services</h3>
                <ul>
                  <li className="active">
                    <a href="#">
                      <i className="bi bi-arrow-right-circle"></i>
                      <span>Digital Transformation</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-arrow-right-circle"></i>
                      <span>Cloud Infrastructure</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-arrow-right-circle"></i>
                      <span>Data Analytics</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-arrow-right-circle"></i>
                      <span>Cybersecurity Solutions</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-arrow-right-circle"></i>
                      <span>Custom Development</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-arrow-right-circle"></i>
                      <span>IT Consulting</span>
                    </a>
                  </li>
                </ul>
              </div>{/* End Service List */}

              {/* Stats Widget */}
              <div className="sidebar-widget stats-widget" data-aos="fade-up" data-aos-delay="300">
                <div className="stat-item">
                  <div className="stat-number">
                    <span data-purecounter-start="0" data-purecounter-end="850" data-purecounter-duration="1" className="purecounter"></span>+
                  </div>
                  <p>Projects Delivered</p>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    <span data-purecounter-start="0" data-purecounter-end="99" data-purecounter-duration="1" className="purecounter"></span>%
                  </div>
                  <p>Client Satisfaction</p>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    <span data-purecounter-start="0" data-purecounter-end="24" data-purecounter-duration="1" className="purecounter"></span>/7
                  </div>
                  <p>Support Available</p>
                </div>
              </div>{/* End Stats Widget */}

              {/* Download Brochure */}
              <div className="sidebar-widget download-widget" data-aos="fade-up" data-aos-delay="400">
                <h3>Resources</h3>
                <a href="#" className="download-item">
                  <div className="download-icon">
                    <i className="bi bi-file-earmark-pdf"></i>
                  </div>
                  <div className="download-info">
                    <span className="file-name">Service Brochure</span>
                    <span className="file-size">PDF • 2.4 MB</span>
                  </div>
                  <i className="bi bi-download"></i>
                </a>
                <a href="#" className="download-item">
                  <div className="download-icon">
                    <i className="bi bi-file-earmark-text"></i>
                  </div>
                  <div className="download-info">
                    <span className="file-name">Technical Overview</span>
                    <span className="file-size">PDF • 1.8 MB</span>
                  </div>
                  <i className="bi bi-download"></i>
                </a>
                <a href="#" className="download-item">
                  <div className="download-icon">
                    <i className="bi bi-file-earmark-spreadsheet"></i>
                  </div>
                  <div className="download-info">
                    <span className="file-name">Pricing Guide</span>
                    <span className="file-size">PDF • 856 KB</span>
                  </div>
                  <i className="bi bi-download"></i>
                </a>
              </div>{/* End Download Widget */}

              {/* CTA Widget */}
              <div className="sidebar-widget cta-widget" data-aos="fade-up" data-aos-delay="500">
                <div className="cta-content">
                  <div className="cta-icon">
                    <i className="bi bi-chat-dots"></i>
                  </div>
                  <h3>Ready to Transform Your Business?</h3>
                  <p>Connect with our specialists for a complimentary consultation.</p>
                  <a href="#" className="cta-btn">Schedule a Call <i className="bi bi-arrow-right"></i></a>
                </div>
              </div>{/* End CTA Widget */}
            </div>{/* End Sidebar Column */}
          </div>
        </div>
      </section>{/* /Service Details Section */}
    </>
  );
}