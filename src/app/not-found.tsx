import React from 'react';

export default function NotFound() {
  return (
    <section id="error-404" className="error-404 section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row align-items-center g-5">
          <div className="col-lg-6" data-aos="fade-right" data-aos-delay="200">
            <div className="error-visual">
              <div className="error-code">
                <span className="digit">4</span>
                <span className="digit middle">
                  <i className="bi bi-emoji-frown"></i>
                </span>
                <span className="digit">4</span>
              </div>
              <div className="error-decoration">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
              </div>
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="300">
            <div className="error-content">
              <span className="error-badge">Oops!</span>
              <h1 className="error-heading">Something Went Wrong</h1>
              <p className="error-text">
                The page you're looking for doesn't exist or has been moved. Let's get you back on track.
              </p>

              <div className="action-buttons">
                <a href="/" className="btn-home">
                  <i className="bi bi-arrow-left"></i>
                  Return Home
                </a>
                <a href="#" className="btn-report">
                  <i className="bi bi-flag"></i>
                  Report Issue
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5 pt-4">
          <div className="col-12">
            <div className="quick-navigation" data-aos="fade-up" data-aos-delay="400">
              <h4 className="nav-title">Quick Navigation</h4>
              <div className="nav-links">
                <a href="/" className="nav-link-item">
                  <div className="icon-wrap">
                    <i className="bi bi-house-door"></i>
                  </div>
                  <div className="link-content">
                    <span className="link-title">Homepage</span>
                    <span className="link-desc">Start fresh</span>
                  </div>
                </a>
                <a href="/portfolio-details" className="nav-link-item">
                  <div className="icon-wrap">
                    <i className="bi bi-collection"></i>
                  </div>
                  <div className="link-content">
                    <span className="link-title">Portfolio</span>
                    <span className="link-desc">View our work</span>
                  </div>
                </a>
                <a href="/#team" className="nav-link-item">
                  <div className="icon-wrap">
                    <i className="bi bi-people"></i>
                  </div>
                  <div className="link-content">
                    <span className="link-title">Team</span>
                    <span className="link-desc">Meet the crew</span>
                  </div>
                </a>
                <a href="/#contact" className="nav-link-item">
                  <div className="icon-wrap">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div className="link-content">
                    <span className="link-title">Contact</span>
                    <span className="link-desc">Get in touch</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}