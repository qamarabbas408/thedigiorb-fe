-- Services table
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  icon VARCHAR(100) DEFAULT 'bi-lightbulb',
  featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample services
INSERT IGNORE INTO services (id, title, description, icon, featured, display_order, status) VALUES
('1', 'Web Development', 'Professional web development services using modern technologies like React, Next.js, and Node.js to build responsive and performant websites.', 'bi-code-slash', TRUE, 1, 'published'),
('2', 'Mobile App Development', 'Cross-platform mobile app development for iOS and Android using React Native and Flutter frameworks.', 'bi-phone', TRUE, 2, 'published'),
('3', 'UI/UX Design', 'User-centered design solutions including wireframing, prototyping, and visual design to create engaging digital experiences.', 'bi-palette', TRUE, 3, 'published'),
('4', 'E-Commerce Solutions', 'End-to-end e-commerce development with secure payment integrations, inventory management, and customizable storefronts.', 'bi-cart', FALSE, 4, 'published'),
('5', 'Cloud Services', 'Cloud infrastructure setup, migration, and management using AWS, Azure, and Google Cloud platforms.', 'bi-cloud', FALSE, 5, 'published'),
('6', 'Digital Marketing', 'Comprehensive digital marketing strategies including SEO, social media marketing, and content marketing to grow your online presence.', 'bi-megaphone', FALSE, 6, 'published');
