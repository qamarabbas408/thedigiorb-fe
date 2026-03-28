'use client';

import { useState, useEffect } from 'react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  displayOrder: number;
  status: string;
}

interface Stat {
  id: string;
  section: string;
  label: string;
  value: string;
  icon: string;
  displayOrder: number;
  status: string;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, statsRes] = await Promise.all([
        fetch('/api/services?status=published'),
        fetch('/api/stats?section=services&status=published')
      ]);
      const [servicesData, statsData] = await Promise.all([
        servicesRes.json(),
        statsRes.json()
      ]);
      setServices(Array.isArray(servicesData) ? servicesData : []);
      setStats(Array.isArray(statsData) ? statsData : []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  const publishedServices = services.filter(s => s.status === 'published');
  const featuredServices = services.filter(s => s.featured && s.status === 'published');
  const regularServices = publishedServices.filter(s => !s.featured);

  return (
    <section id="services" className="services section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>Expert solutions tailored to transform your digital presence and drive business growth</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-4">
          {featuredServices.map((service, index) => (
            <div key={service.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
              <div className="service-card featured">
                <div className="featured-badge">
                  <i className="bi bi-star-fill"></i>
                  <span>Popular</span>
                </div>
                <div className="icon-wrapper">
                  <i className={`bi ${service.icon}`}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="/service-details" className="service-link">
                  <span>Discover More</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}

          {regularServices.map((service, index) => (
            <div key={service.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={(featuredServices.length + index + 1) * 100}>
              <div className="service-card">
                <div className="icon-wrapper">
                  <i className={`bi ${service.icon}`}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="/service-details" className="service-link">
                  <span>Discover More</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-row" data-aos="fade-up" data-aos-delay="400">
          <div className="row g-4 justify-content-center">
            {!loading && stats.length > 0 ? (
              stats.sort((a, b) => a.displayOrder - b.displayOrder).map((stat) => (
                <div key={stat.id} className="col-6 col-md-3">
                  <div className="stat-item">
                    <span className="stat-number">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="col-6 col-md-3">
                  <div className="stat-item">
                    <span className="stat-number">250+</span>
                    <span className="stat-label">Projects Delivered</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-item">
                    <span className="stat-number">98%</span>
                    <span className="stat-label">Client Satisfaction</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-item">
                    <span className="stat-number">15+</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="stat-item">
                    <span className="stat-number">40+</span>
                    <span className="stat-label">Team Experts</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
