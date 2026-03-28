import React from 'react';

export default function TermsPage() {
  return (
    <section id="terms-of-service" className="terms-of-service section">
      <div className="container" data-aos="fade-up">
        {/* Page Header */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="terms-header" data-aos="fade-up">
              <div className="header-badge">
                <i className="bi bi-file-earmark-text"></i>
                <span>Legal Document</span>
              </div>
              <h2>Terms of Service</h2>
              <p>Review our terms and conditions governing your use of our platform and services</p>
              <div className="update-info">
                <i className="bi bi-calendar3"></i>
                <span>Effective Date: March 15, 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-10">
            <div className="quick-nav">
              <span className="nav-label">Quick Navigation:</span>
              <div className="nav-links">
                <a href="#acceptance">Acceptance</a>
                <a href="#ip-rights">IP Rights</a>
                <a href="#accounts">Accounts</a>
                <a href="#restrictions">Restrictions</a>
                <a href="#warranties">Warranties</a>
                <a href="#liability">Liability</a>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="terms-body" data-aos="fade-up" data-aos-delay="200">
              {/* Acceptance Section */}
              <article id="acceptance" className="terms-article">
                <div className="article-number">01</div>
                <div className="article-content">
                  <h3>Acceptance of Terms</h3>
                  <p>By accessing and using our website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>
                  <div className="highlight-card info">
                    <div className="card-icon">
                      <i className="bi bi-lightbulb"></i>
                    </div>
                    <div className="card-text">
                      <p>Please read these terms carefully before using our services. Your continued use indicates acceptance of these terms.</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* IP Rights Section */}
              <article id="ip-rights" className="terms-article">
                <div className="article-number">02</div>
                <div className="article-content">
                  <h3>Intellectual Property Rights</h3>
                  <p>All content, designs, graphics, logos, and other materials on our website are the intellectual property of Digital Orbits. Unauthorized reproduction, distribution, or modification is strictly prohibited.</p>
                  <div className="checklist">
                    <div className="check-item">
                      <i className="bi bi-check2-circle"></i>
                      <span>Exclusive ownership of all platform content</span>
                    </div>
                    <div className="check-item">
                      <i className="bi bi-check2-circle"></i>
                      <span>Prohibited modification or reproduction</span>
                    </div>
                    <div className="check-item">
                      <i className="bi bi-check2-circle"></i>
                      <span>Protected trademarks and branding</span>
                    </div>
                    <div className="check-item">
                      <i className="bi bi-check2-circle"></i>
                      <span>Limited personal usage rights only</span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Accounts Section */}
              <article id="accounts" className="terms-article">
                <div className="article-number">03</div>
                <div className="article-content">
                  <h3>User Account Responsibilities</h3>
                  <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Please notify us immediately of any unauthorized access.</p>
                  <div className="highlight-card warning">
                    <div className="card-icon">
                      <i className="bi bi-shield-exclamation"></i>
                    </div>
                    <div className="card-text">
                      <h5>Security Reminder</h5>
                      <p>Never share your password with third parties. Use strong, unique passwords and enable two-factor authentication when available.</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Restrictions Section */}
              <article id="restrictions" className="terms-article">
                <div className="article-number">04</div>
                <div className="article-content">
                  <h3>Usage Restrictions</h3>
                  <p>You agree not to use our services for any unlawful purpose or in any way that could damage, disable, or impair our platform. The following activities are strictly prohibited:</p>
                  <div className="restrictions-grid">
                    <div className="restriction-card">
                      <i className="bi bi-slash-circle"></i>
                      <p>Automated data extraction or scraping</p>
                    </div>
                    <div className="restriction-card">
                      <i className="bi bi-slash-circle"></i>
                      <p>Distribution of harmful software</p>
                    </div>
                    <div className="restriction-card">
                      <i className="bi bi-slash-circle"></i>
                      <p>Unauthorized system access attempts</p>
                    </div>
                    <div className="restriction-card">
                      <i className="bi bi-slash-circle"></i>
                      <p>Content manipulation or framing</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Warranties Section */}
              <article id="warranties" className="terms-article">
                <div className="article-number">05</div>
                <div className="article-content">
                  <h3>Disclaimer of Warranties</h3>
                  <p>Our services are provided "as is" without any warranties, express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.</p>
                  <div className="disclaimer-panel">
                    <div className="panel-header">
                      <i className="bi bi-info-lg"></i>
                      <span>Service Limitations</span>
                    </div>
                    <ul className="panel-list">
                      <li>Services may experience occasional downtime for maintenance</li>
                      <li>We strive for accuracy but cannot guarantee all content is current</li>
                      <li>User assumes responsibility for how they use our services</li>
                      <li>Third-party integrations are subject to their own terms</li>
                    </ul>
                  </div>
                </div>
              </article>

              {/* Liability Section */}
              <article id="liability" className="terms-article">
                <div className="article-number">06</div>
                <div className="article-content">
                  <h3>Limitation of Liability</h3>
                  <p>Digital Orbits shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability is limited to the amount paid for services.</p>
                </div>
              </article>

              {/* Indemnification Section */}
              <article className="terms-article">
                <div className="article-number">07</div>
                <div className="article-content">
                  <h3>Indemnification Clause</h3>
                  <p>You agree to indemnify and hold Digital Orbits harmless from any claims, damages, or expenses arising from your use of our services or violation of these terms.</p>
                </div>
              </article>

              {/* Termination Section */}
              <article className="terms-article">
                <div className="article-number">08</div>
                <div className="article-content">
                  <h3>Account Termination</h3>
                  <p>We reserve the right to suspend or terminate your account at any time for violation of these terms. You may also cancel your account at any time by contacting us.</p>
                </div>
              </article>

              {/* Governing Law Section */}
              <article className="terms-article">
                <div className="article-number">09</div>
                <div className="article-content">
                  <h3>Applicable Jurisdiction</h3>
                  <p>These terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes arising shall be subject to the exclusive jurisdiction of Pakistani courts.</p>
                </div>
              </article>

              {/* Modifications Section */}
              <article className="terms-article">
                <div className="article-number">10</div>
                <div className="article-content">
                  <h3>Terms Modifications</h3>
                  <p>We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.</p>
                  <div className="highlight-card notice">
                    <div className="card-icon">
                      <i className="bi bi-megaphone"></i>
                    </div>
                    <div className="card-text">
                      <p>We will notify users of significant changes via email or prominent notice on our website.</p>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* Contact Footer */}
        <div className="row justify-content-center" data-aos="fade-up" data-aos-delay="300">
          <div className="col-lg-10">
            <div className="terms-footer">
              <div className="footer-content">
                <div className="footer-text">
                  <h4>Need Clarification?</h4>
                  <p>Our legal team is available to address your questions regarding these terms.</p>
                </div>
                <div className="footer-actions">
                  <a href="#" className="btn-primary-action">
                    <i className="bi bi-chat-dots"></i>
                    <span>Get Support</span>
                  </a>
                  <a href="#" className="btn-secondary-action">
                    <i className="bi bi-download"></i>
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}