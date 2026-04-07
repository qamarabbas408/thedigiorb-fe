'use client';

export default function PortfolioDetailSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container">
        <div className="mb-6">
          <div className="skeleton-line" style={{ width: '80px', height: '14px', marginBottom: '16px' }} />
          <div className="skeleton-line skeleton-title" style={{ width: '50%', height: '32px' }} />
        </div>
        
        <div className="row g-5">
          <div className="col-lg-8">
            <div className="skeleton-image" style={{ height: '400px', borderRadius: '16px' }} />
            
            <div className="mt-5">
              <div className="skeleton-line mb-2" style={{ width: '100%' }} />
              <div className="skeleton-line mb-2" style={{ width: '100%' }} />
              <div className="skeleton-line mb-2" style={{ width: '80%' }} />
              <div className="skeleton-line mb-2" style={{ width: '90%' }} />
              <div className="skeleton-line mb-4" style={{ width: '70%' }} />
              
              <div className="d-flex gap-2 mt-4">
                <div className="skeleton-tag" style={{ width: '80px', height: '32px' }} />
                <div className="skeleton-tag" style={{ width: '80px', height: '32px' }} />
                <div className="skeleton-tag" style={{ width: '80px', height: '32px' }} />
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="project-meta-card p-4">
              <div className="skeleton-line mb-3" style={{ width: '60%', height: '18px' }} />
              <div className="skeleton-line mb-2" style={{ width: '80%' }} />
              <div className="skeleton-line mb-2" style={{ width: '70%' }} />
              <div className="skeleton-line mb-4" style={{ width: '90%' }} />
              
              <div className="skeleton-line mb-3 mt-4" style={{ width: '60%', height: '18px' }} />
              <div className="skeleton-line mb-2" style={{ width: '100%' }} />
              
              <div className="skeleton-image mt-4" style={{ height: '150px', borderRadius: '8px' }} />
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <div className="skeleton-line skeleton-title" style={{ width: '200px', height: '28px', marginBottom: '24px' }} />
          <div className="row g-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="col-md-4">
                <div className="skeleton-image" style={{ height: '200px', borderRadius: '12px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}