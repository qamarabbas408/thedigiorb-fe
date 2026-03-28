import React from 'react';

export default function StarterPagePage() {
  return (
    <>
      {/* Page Title */}
      <div className="page-title">
        <div className="breadcrumbs">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/"><i className="bi bi-house"></i> Home</a></li>
              <li className="breadcrumb-item"><a href="#">Category</a></li>
              <li className="breadcrumb-item active current">Starter Page</li>
            </ol>
          </nav>
        </div>
        <div className="title-wrapper">
          <h1>Starter Page</h1>
          <p>A clean slate for your custom content. Build something unique for your business.</p>
        </div>
      </div>{/* End Page Title */}

      {/* Starter Section Section */}
      <section id="starter-section" className="starter-section section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Getting Started</h2>
          <p>Begin your journey with us and transform your digital presence</p>
        </div>{/* End Section Title */}

        <div className="container" data-aos="fade-up">
          <p>This is a placeholder page. Contact us to discuss your custom project requirements and let us bring your vision to life.</p>
        </div>
      </section>{/* /Starter Section Section */}
    </>
  );
}