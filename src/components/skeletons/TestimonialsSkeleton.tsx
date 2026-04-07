'use client';

export default function TestimonialsSkeleton() {
  return (
    <div className="row g-4 justify-content-center">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="col-lg-6 col-md-8">
          <div className="testimonial-card">
            <div className="d-flex align-items-center mb-3">
              <div className="skeleton-avatar me-3" />
              <div>
                <div className="skeleton-line" style={{ width: '120px', height: '16px' }} />
                <div className="skeleton-line mt-1" style={{ width: '80px', height: '12px' }} />
              </div>
            </div>
            <div className="skeleton-line mb-2" style={{ width: '100%' }} />
            <div className="skeleton-line mb-2" style={{ width: '100%' }} />
            <div className="skeleton-line mb-3" style={{ width: '70%' }} />
            <div className="d-flex gap-1">
              <div className="skeleton-star" />
              <div className="skeleton-star" />
              <div className="skeleton-star" />
              <div className="skeleton-star" />
              <div className="skeleton-star" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}