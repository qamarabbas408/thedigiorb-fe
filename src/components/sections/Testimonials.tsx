'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSettings } from '@/context/SettingsContext';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  image: string;
  featured: boolean;
  status: string;
}

export default function Testimonials() {
  const { settings } = useSettings();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (loading) {
    return (
      <section id="testimonials" className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Testimonials</h2>
            <p className="text-slate-500">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Testimonials</h2>
            <p className="text-slate-500">What our clients say about us</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Testimonials</h2>
          <p className="text-slate-500">What our clients say about us</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1" data-aos="fade-right" data-aos-delay="150">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl text-white sticky top-24">
              <div className="flex -space-x-3 mb-6">
                {testimonials.slice(0, 4).map((t, i) => (
                  <div 
                    key={t.id} 
                    className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-slate-800 flex items-center justify-center text-sm font-bold overflow-hidden"
                  >
                    {t.image ? (
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{getInitials(t.name)}</span>
                    )}
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-slate-800 flex items-center justify-center text-sm font-bold">
                  +{testimonials.length}
                </div>
              </div>

              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                  <i className="bi bi-heart-fill text-blue-400" />
                  Satisfied Clients
                </span>
                
                <h3 className="text-2xl font-bold leading-tight text-light">
                  Discover What Our Clients Say About Us
                </h3>
                
                <p className="text-slate-300 leading-relaxed">
                  We take pride in delivering exceptional results for our clients. Here&apos;s what they have to say about their experience working with us.
                </p>
                
                <a 
                  href="#contact" 
                  className=" text-light inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-colors"
                >
                  Work With Us <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
          </div>

          <div 
            className="lg:col-span-2" 
            data-aos="fade-left" 
            data-aos-delay="200"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0">
                      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-slate-100 mx-1">
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i 
                                key={star}
                                className={`bi text-xl ${star <= testimonial.rating ? 'bi-star-fill text-amber-400' : 'bi-star text-slate-300'}`}
                              />
                            ))}
                          </div>
                          <i className="bi bi-quote text-4xl text-blue-100" />
                        </div>
                        
                        <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>
                        
                        <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                          {testimonial.image ? (
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-14 h-14 rounded-full object-cover" 
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                              {getInitials(testimonial.name)}
                            </div>
                          )}
                          <div>
                            <h5 className="font-bold text-slate-800">{testimonial.name}</h5>
                            {testimonial.title && (
                              <p className="text-sm text-slate-500">
                                {testimonial.title}
                                {testimonial.company && ` at ${testimonial.company}`}
                              </p>
                            )}
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-xl transition-all z-10"
                    aria-label="Previous testimonial"
                  >
                    <i className="bi bi-chevron-left text-xl" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-xl transition-all z-10"
                    aria-label="Next testimonial"
                  >
                    <i className="bi bi-chevron-right text-xl" />
                  </button>

                  <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentIndex 
                            ? 'bg-blue-500 w-8' 
                            : 'bg-slate-300 hover:bg-slate-400'
                        }`}
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
