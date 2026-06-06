'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePublishedTestimonials } from '@/hooks';
import TestimonialsSkeleton from '@/components/skeletons/TestimonialsSkeleton';

export default function Testimonials() {
  const { data: testimonials, isLoading } = usePublishedTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const nextSlide = useCallback(() => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  }, [testimonials]);

  const prevSlide = useCallback(() => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying || !testimonials || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (isLoading) {
    return (
      <section id="testimonials" className="testimonials section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Testimonials</h2>
          <p>What our clients say about us</p>
        </div>
        <div className="container">
          <TestimonialsSkeleton />
        </div>
      </section>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <section id="testimonials" className="testimonials section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Testimonials</h2>
          <p>What our clients say about us</p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Testimonials</h2>
        <p>What our clients say about us</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-5 align-items-start">
          <div className="col-lg-4" data-aos="fade-right" data-aos-delay="150">
            <div className="testimonials-sidebar-card">
              <div className="avatar-stack">
                {testimonials.slice(0, 4).map((t, i) => (
                  t.image ? (
                    <img key={t.id} src={t.image} alt={t.name} className="avatar" />
                  ) : (
                    <div key={t.id} className="avatar initials">
                      {getInitials(t.name)}
                    </div>
                  )
                ))}
                <div className="avatar-count">
                  +{testimonials.length}
                </div>
              </div>

              <div className="sidebar-content">
                <span className="satisfied-badge">
                  <i className="bi bi-heart-fill" />
                  Satisfied Clients
                </span>

                <h3>Discover What Our Clients Say About Us</h3>

                <p>
                  We take pride in delivering exceptional results for our clients. Here&apos;s what they have to say about their experience working with us.
                </p>

                <a href="/#contact" className="btn-view-all">
                  Work With Us <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
          </div>

          <div
            className="col-lg-8"
            data-aos="fade-left"
            data-aos-delay="200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="testimonials-carousel">
              <div className="overflow-hidden">
                <div
                  className="carousel-track"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="carousel-slide">
                      <div className="testimonial-card">
                        <div className="card-top">
                          <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i
                                key={star}
                                className={`bi ${star <= testimonial.rating ? 'bi-star-fill' : 'bi-star'}`}
                              />
                            ))}
                          </div>
                          <div className="quote-mark">
                            <i className="bi bi-quote" />
                          </div>
                        </div>

                        <p className="testimonial-text">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>

                        <div className="author-info">
                          {testimonial.image ? (
                            <img src={testimonial.image} alt={testimonial.name} className="author-img" />
                          ) : (
                            <div className="author-img initials">
                              {getInitials(testimonial.name)}
                            </div>
                          )}
                          <div className="author-details">
                            <h5>{testimonial.name}</h5>
                            <span>
                              {testimonial.title}
                              {testimonial.company && ` at ${testimonial.company}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {testimonials.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="carousel-nav carousel-prev"
                    aria-label="Previous testimonial"
                  >
                    <i className="bi bi-chevron-left" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="carousel-nav carousel-next"
                    aria-label="Next testimonial"
                  >
                    <i className="bi bi-chevron-right" />
                  </button>

                  <div className="swiper-pagination">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`swiper-pagination-bullet ${index === currentIndex ? 'swiper-pagination-bullet-active' : ''}`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
