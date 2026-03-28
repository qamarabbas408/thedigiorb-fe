'use client';

import { useSettings } from "@/context/SettingsContext";

export default function PrivacyPage() {
  const { settings, loading } = useSettings();

  return (
    <section id="privacy" className="privacy section">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-3" data-aos="fade-right" data-aos-delay="100">
            <div className="sidebar-nav">
              <div className="nav-header">
                <i className="bi bi-shield-lock"></i>
                <span>Privacy Policy</span>
              </div>
              <ul className="nav-links">
                <li><a href="#intro">Introduction</a></li>
                <li><a href="#collection">Information Collection</a></li>
                <li><a href="#usage">How We Use Data</a></li>
                <li><a href="#sharing">Information Sharing</a></li>
                <li><a href="#security">Data Security</a></li>
                <li><a href="#rights">Your Rights</a></li>
                <li><a href="#updates">Policy Updates</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
              <div className="effective-date">
                <i className="bi bi-calendar3"></i>
                <span>Effective: March 2026</span>
              </div>
            </div>
          </div>

          <div className="col-lg-9" data-aos="fade-left" data-aos-delay="200">
            <div className="policy-intro-card" data-aos="zoom-in" data-aos-delay="250">
              <div className="intro-icon">
                <i className="bi bi-info-circle"></i>
              </div>
              <p>Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use our services.</p>
            </div>

            <div className="policy-section" id="intro" data-aos="fade-up" data-aos-delay="100">
              <div className="section-number">01</div>
              <div className="section-content">
                <h2>Introduction</h2>
                <p>This Privacy Policy explains how {settings.company_name || 'we'} (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, discloses, and safeguards information when you visit our website or use our services.</p>
                <p>By using our services, you agree to the collection and use of information in accordance with this policy.</p>
              </div>
            </div>

            <div className="policy-section" id="collection" data-aos="fade-up" data-aos-delay="150">
              <div className="section-number">02</div>
              <div className="section-content">
                <h2>Information We Collect</h2>
                <p>We may collect the following types of information:</p>
                <div className="info-cards">
                  <div className="info-card">
                    <div className="card-icon">
                      <i className="bi bi-person-badge"></i>
                    </div>
                    <h4>Data You Provide</h4>
                    <ul>
                      <li>Full name and contact details</li>
                      <li>Login credentials</li>
                      <li>Billing information</li>
                      <li>Notification settings</li>
                    </ul>
                  </div>
                  <div className="info-card">
                    <div className="card-icon">
                      <i className="bi bi-gear-wide-connected"></i>
                    </div>
                    <h4>Automated Data</h4>
                    <ul>
                      <li>Device specifications</li>
                      <li>Activity logs and metrics</li>
                      <li>Geographic data when permitted</li>
                      <li>Browser configuration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="policy-section" id="usage" data-aos="fade-up" data-aos-delay="200">
              <div className="section-number">03</div>
              <div className="section-content">
                <h2>How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <div className="usage-grid">
                  <div className="usage-item">
                    <i className="bi bi-stars"></i>
                    <span>Deliver personalized experiences</span>
                  </div>
                  <div className="usage-item">
                    <i className="bi bi-credit-card"></i>
                    <span>Handle transactions and billing</span>
                  </div>
                  <div className="usage-item">
                    <i className="bi bi-bell"></i>
                    <span>Send service notifications</span>
                  </div>
                  <div className="usage-item">
                    <i className="bi bi-shield-check"></i>
                    <span>Ensure security and verification</span>
                  </div>
                  <div className="usage-item">
                    <i className="bi bi-graph-up-arrow"></i>
                    <span>Improve platform performance</span>
                  </div>
                  <div className="usage-item">
                    <i className="bi bi-headset"></i>
                    <span>Provide customer support</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="policy-section" id="sharing" data-aos="fade-up" data-aos-delay="250">
              <div className="section-number">04</div>
              <div className="section-content">
                <h2>Information Sharing and Disclosure</h2>
                <p>We do not sell your personal information. We may share information in the following circumstances:</p>
                <div className="sharing-block">
                  <h4><i className="bi bi-hand-thumbs-up"></i> With Your Permission</h4>
                  <p>We may share your information if you explicitly consent to sharing.</p>
                </div>
                <div className="sharing-block">
                  <h4><i className="bi bi-bank"></i> For Legal Compliance</h4>
                  <p>We may disclose information when required by law or to protect our rights.</p>
                  <ul>
                    <li>Comply with applicable regulations and legal requirements</li>
                    <li>Enforce our service agreements</li>
                    <li>Address security threats and fraudulent activity</li>
                    <li>Safeguard user rights and property</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="policy-section" id="security" data-aos="fade-up" data-aos-delay="300">
              <div className="section-number">05</div>
              <div className="section-content">
                <h2>Data Security</h2>
                <p>We implement appropriate security measures to protect your information:</p>
                <div className="security-features">
                  <div className="security-item">
                    <div className="security-icon">
                      <i className="bi bi-lock"></i>
                    </div>
                    <div className="security-text">
                      <h5>SSL Encryption</h5>
                      <p>All data transmissions are encrypted</p>
                    </div>
                  </div>
                  <div className="security-item">
                    <div className="security-icon">
                      <i className="bi bi-clipboard-check"></i>
                    </div>
                    <div className="security-text">
                      <h5>Regular Audits</h5>
                      <p>Continuous security assessments</p>
                    </div>
                  </div>
                  <div className="security-item">
                    <div className="security-icon">
                      <i className="bi bi-person-lock"></i>
                    </div>
                    <div className="security-text">
                      <h5>Access Control</h5>
                      <p>Restricted data access policies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="policy-section" id="rights" data-aos="fade-up" data-aos-delay="350">
              <div className="section-number">06</div>
              <div className="section-content">
                <h2>Your Rights and Choices</h2>
                <p>You have the following rights regarding your personal information:</p>
                <div className="rights-list">
                  <div className="right-item">
                    <i className="bi bi-eye"></i>
                    <div>
                      <strong>Access</strong>
                      <span>Review your personal data anytime</span>
                    </div>
                  </div>
                  <div className="right-item">
                    <i className="bi bi-pencil-square"></i>
                    <div>
                      <strong>Correction</strong>
                      <span>Update inaccurate information</span>
                    </div>
                  </div>
                  <div className="right-item">
                    <i className="bi bi-trash3"></i>
                    <div>
                      <strong>Deletion</strong>
                      <span>Request removal of your data</span>
                    </div>
                  </div>
                  <div className="right-item">
                    <i className="bi bi-slash-circle"></i>
                    <div>
                      <strong>Restriction</strong>
                      <span>Limit how we process your information</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="policy-section" id="updates" data-aos="fade-up" data-aos-delay="400">
              <div className="section-number">07</div>
              <div className="section-content">
                <h2>Changes to This Policy</h2>
                <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
                <p>We encourage you to review this policy periodically for any changes.</p>
              </div>
            </div>

            <div className="policy-section contact-section" id="contact" data-aos="fade-up" data-aos-delay="450">
              <div className="section-number">08</div>
              <div className="section-content">
                <h2>Get in Touch</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="contact-cards">
                  <div className="contact-card">
                    <i className="bi bi-envelope"></i>
                    <span>{loading ? 'Loading...' : settings.company_email}</span>
                  </div>
                  {settings.company_address && (
                    <div className="contact-card">
                      <i className="bi bi-geo-alt"></i>
                      <span>{settings.company_address}</span>
                    </div>
                  )}
                  <div className="contact-card">
                    <i className="bi bi-telephone"></i>
                    <span>{loading ? 'Loading...' : settings.company_phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
