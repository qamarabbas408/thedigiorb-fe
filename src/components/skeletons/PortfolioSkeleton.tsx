'use client';

export default function PortfolioSkeleton() {
  return (
    <div className="row g-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="col-lg-4 col-md-6">
          <div className="project-card">
            <div className="image-wrapper">
              <div className="skeleton-image" style={{ height: '220px' }} />
            </div>
            <div className="project-info p-4">
              <div className="skeleton-line skeleton-title mb-2" style={{ width: '70%' }} />
              <div className="skeleton-line skeleton-subtitle mb-3" style={{ width: '50%' }} />
              <div className="skeleton-line mb-2" style={{ width: '100%' }} />
              <div className="skeleton-line mb-3" style={{ width: '80%' }} />
              <div className="d-flex gap-2 mt-3">
                <div className="skeleton-tag" />
                <div className="skeleton-tag" />
                <div className="skeleton-tag" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}