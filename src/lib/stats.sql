-- Stats table
CREATE TABLE IF NOT EXISTS stats (
  id VARCHAR(50) PRIMARY KEY,
  section VARCHAR(50) NOT NULL,
  label VARCHAR(200) NOT NULL,
  value VARCHAR(50) NOT NULL,
  icon VARCHAR(100),
  display_order INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_section (section)
);

-- Insert initial stats data
INSERT IGNORE INTO stats (id, section, label, value, icon, display_order, status) VALUES
-- Hero Section Stats
('hero_1', 'hero', 'Projects Delivered', '150+', 'bi-briefcase', 1, 'published'),
('hero_2', 'hero', 'Client Satisfaction', '98%', 'bi-heart', 2, 'published'),
('hero_3', 'hero', 'Years Experience', '12+', 'bi-calendar', 3, 'published'),
('hero_4', 'hero', 'Team Experts', '40+', 'bi-people', 4, 'published'),

-- About Section Stats
('about_1', 'about', 'Years of Excellence', '12', 'bi-award', 1, 'published'),
('about_2', 'about', 'Projects Done', '150', 'bi-check-circle', 2, 'published'),
('about_3', 'about', 'Happy Clients', '85', 'bi-emoji-smile', 3, 'published'),
('about_4', 'about', 'Retention', '95%', 'bi-graph-up', 4, 'published'),

-- Services Section Stats
('services_1', 'services', 'Projects Delivered', '250+', 'bi-briefcase', 1, 'published'),
('services_2', 'services', 'Client Satisfaction', '98%', 'bi-heart', 2, 'published'),
('services_3', 'services', 'Years Experience', '15+', 'bi-calendar', 3, 'published'),
('services_4', 'services', 'Team Experts', '40+', 'bi-people', 4, 'published'),

-- Why Us Section Stats
('whyus_1', 'why_us', 'Successful Campaigns', '180+', 'bi-megaphone', 1, 'published'),
('whyus_2', 'why_us', 'Customer Satisfaction', '95%', 'bi-heart', 2, 'published'),
('whyus_3', 'why_us', 'Growth Achieved', '320%', 'bi-graph-up-arrow', 3, 'published'),

-- Contact Section Stats
('contact_1', 'contact', 'Satisfaction', '98%', 'bi-heart', 1, 'published'),
('contact_2', 'contact', 'Support', '24/7', 'bi-headset', 2, 'published'),
('contact_3', 'contact', 'Projects', '3.2k', 'bi-folder', 3, 'published'),

-- Portfolio Details Section Stats
('portfolio_1', 'portfolio_details', 'Monthly Users', '25k+', 'bi-people', 1, 'published'),
('portfolio_2', 'portfolio_details', 'Uptime', '99.9%', 'bi-server', 2, 'published'),
('portfolio_3', 'portfolio_details', 'Team Members', '12', 'bi-person', 3, 'published'),
('portfolio_4', 'portfolio_details', 'Client Rating', '4.9', 'bi-star', 4, 'published'),

-- Service Details Section Stats
('servicedetails_1', 'service_details', 'Projects Delivered', '850+', 'bi-briefcase', 1, 'published'),
('servicedetails_2', 'service_details', 'Client Satisfaction', '99%', 'bi-heart', 2, 'published'),
('servicedetails_3', 'service_details', 'Support Available', '24/7', 'bi-headset', 3, 'published');
