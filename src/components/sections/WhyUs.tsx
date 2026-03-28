'use client';

import { useState, useEffect } from 'react';

interface Stat {
  id: string;
  section: string;
  label: string;
  value: string;
  icon: string;
  displayOrder: number;
  status: string;
}

export default function WhyUs() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats?section=why_us&status=published');
      const data = await res.json();
      setStats(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="why-us" className="why-us section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Why Us</h2>
        <p>Discover what sets us apart and why clients trust us with their digital transformation</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-5">
          <div className="col-lg-5" data-aos="fade-right" data-aos-delay="200">
            <div className="sidebar-content">
              <div className="badge-wrapper">
                <span className="section-badge"><i className="bi bi-stars"></i> Our Difference</span>
              </div>
              <h2>Transform Your Vision Into Digital Excellence</h2>
              <p className="description">We combine technical expertise with creative thinking to deliver solutions that drive real business growth. Our proven methodology ensures transparency, efficiency, and exceptional results every time.</p>

              <div className="stat-cards">
                {!loading && stats.length > 0 ? (
                  stats.sort((a, b) => a.displayOrder - b.displayOrder).map((stat, index) => (
                    <div key={stat.id} className="stat-card" data-aos="zoom-in" data-aos-delay={300 + (index * 50)}>
                      <div className="stat-value">
                        {stat.value}
                      </div>
                      <div className="stat-text">{stat.label}</div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
                      <div className="stat-value">
                        <span className="purecounter" data-purecounter-start="0" data-purecounter-end="180" data-purecounter-duration="2">180</span>+
                      </div>
                      <div className="stat-text">Successful Campaigns</div>
                    </div>
                    <div className="stat-card" data-aos="zoom-in" data-aos-delay="350">
                      <div className="stat-value">
                        <span className="purecounter" data-purecounter-start="0" data-purecounter-end="95" data-purecounter-duration="2">95</span>%
                      </div>
                      <div className="stat-text">Customer Satisfaction</div>
                    </div>
                    <div className="stat-card" data-aos="zoom-in" data-aos-delay="400">
                      <div className="stat-value">
                        <span className="purecounter" data-purecounter-start="0" data-purecounter-end="320" data-purecounter-duration="2">320</span>%
                      </div>
                      <div className="stat-text">Growth Achieved</div>
                    </div>
                  </>
                )}
              </div>

              <div className="action-buttons">
                <a href="#" className="btn-main">Get Started Today</a>
                <a href="#" className="btn-outline">Explore Portfolio</a>
              </div>
            </div>
          </div>

          <div className="col-lg-7" data-aos="fade-left" data-aos-delay="200">
            <div className="features-grid">
              <div className="feature-box highlight" data-aos="fade-up" data-aos-delay="250">
                <div className="feature-ribbon">Top Rated</div>
                <div className="feature-icon">
                  <i className="bi bi-rocket-takeoff-fill"></i>
                </div>
                <div className="feature-content">
                  <h4>Rapid Implementation</h4>
                  <p>We deliver projects on time without compromising quality. Our agile process ensures quick iterations and fast turnaround without sacrificing excellence.</p>
                  <a href="#" className="feature-link">Discover How <i className="bi bi-chevron-right"></i></a>
                </div>
              </div>

              <div className="feature-box" data-aos="fade-up" data-aos-delay="300">
                <div className="feature-icon">
                  <i className="bi bi-bar-chart-line-fill"></i>
                </div>
                <div className="feature-content">
                  <h4>Analytics-First Approach</h4>
                  <p>Every decision we make is backed by data. We track metrics, analyze results, and continuously optimize to ensure maximum ROI for your investment.</p>
                  <a href="#" className="feature-link">Discover How <i className="bi bi-chevron-right"></i></a>
                </div>
              </div>

              <div className="feature-box" data-aos="fade-up" data-aos-delay="350">
                <div className="feature-icon">
                  <i className="bi bi-award-fill"></i>
                </div>
                <div className="feature-content">
                  <h4>Award-Winning Team</h4>
                  <p>Our team of certified experts brings diverse skills and proven experience. We're passionate about technology and committed to exceeding expectations.</p>
                  <a href="#" className="feature-link">Discover How <i className="bi bi-chevron-right"></i></a>
                </div>
              </div>
            </div>

            <div className="process-timeline" data-aos="fade-up" data-aos-delay="400">
              <h5 className="timeline-title"><i className="bi bi-diagram-3-fill"></i> Our Proven Methodology</h5>
              <div className="timeline-steps">
                <div className="timeline-step">
                  <div className="step-marker">1</div>
                  <div className="step-info">
                    <strong>Research</strong>
                    <span>Gathering insights</span>
                  </div>
                </div>
                <div className="timeline-connector"></div>
                <div className="timeline-step">
                  <div className="step-marker">2</div>
                  <div className="step-info">
                    <strong>Blueprint</strong>
                    <span>Creating roadmap</span>
                  </div>
                </div>
                <div className="timeline-connector"></div>
                <div className="timeline-step">
                  <div className="step-marker">3</div>
                  <div className="step-info">
                    <strong>Build</strong>
                    <span>Developing solution</span>
                  </div>
                </div>
                <div className="timeline-connector"></div>
                <div className="timeline-step">
                  <div className="step-marker">4</div>
                  <div className="step-info">
                    <strong>Refine</strong>
                    <span>Iterating results</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="capabilities-section" data-aos="fade-up" data-aos-delay="450">
              <h5 className="capabilities-heading">What We Bring to the Table</h5>
              <div className="capabilities-grid">
                <div className="capability-card">
                  <div className="capability-icon">
                    <i className="bi bi-bullseye"></i>
                  </div>
                  <h6>Strategic Consulting</h6>
                  <p>We analyze your business needs and develop customized strategies that align with your goals and drive measurable growth.</p>
                </div>
                <div className="capability-card">
                  <div className="capability-icon">
                    <i className="bi bi-code-slash"></i>
                  </div>
                  <h6>Tailored Development</h6>
                  <p>We build custom solutions that fit your unique requirements. From web apps to mobile solutions, we deliver scalable and maintainable code.</p>
                </div>
                <div className="capability-card">
                  <div className="capability-icon">
                    <i className="bi bi-arrow-repeat"></i>
                  </div>
                  <h6>Continuous Enhancement</h6>
                  <p>Our relationship doesn't end at launch. We provide ongoing support, updates, and improvements to keep your digital presence ahead of the curve.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
