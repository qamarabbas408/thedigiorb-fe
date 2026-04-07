'use client';

export default function TeamSkeleton() {
  return (
    <div className="row g-4 justify-content-center">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="col-lg-3 col-md-6">
          <div className="team-card">
            <div className="skeleton-image" style={{ height: '280px' }} />
            <div className="team-info p-4 text-center">
              <div className="skeleton-line skeleton-title mb-2" style={{ width: '60%', margin: '0 auto' }} />
              <div className="skeleton-line skeleton-subtitle mb-3" style={{ width: '40%', margin: '0 auto' }} />
              <div className="d-flex justify-content-center gap-2">
                <div className="skeleton-icon" />
                <div className="skeleton-icon" />
                <div className="skeleton-icon" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}