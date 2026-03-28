-- Create database
CREATE DATABASE IF NOT EXISTS orbit_portfolio;
USE orbit_portfolio;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  filter_class VARCHAR(50) NOT NULL,
  icon VARCHAR(50) DEFAULT 'bi-folder',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  subtitle VARCHAR(200) DEFAULT '',
  category_id VARCHAR(50) NOT NULL,
  year VARCHAR(20) DEFAULT '',
  technologies TEXT,
  description TEXT,
  image VARCHAR(500) DEFAULT '',
  gallery TEXT,
  featured BOOLEAN DEFAULT FALSE,
  client VARCHAR(200) DEFAULT '',
  url VARCHAR(500) DEFAULT '#',
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Insert default categories
INSERT IGNORE INTO categories (id, name, slug, filter_class, icon) VALUES
('web-design', 'Web Design', 'web-design', 'filter-web', 'bi-globe'),
('mobile-design', 'Mobile Design', 'mobile-design', 'filter-mobile', 'bi-phone'),
('branding', 'Branding', 'branding', 'filter-branding', 'bi-palette'),
('ui-ux', 'UI/UX', 'ui-ux', 'filter-ui', 'bi-ui-checks'),
('desktop-app', 'Desktop Application', 'desktop-application', 'filter-desktop', 'bi-laptop');

-- Insert sample projects
INSERT IGNORE INTO projects (id, title, subtitle, category_id, year, technologies, description, image, featured, client, url, status) VALUES
('1', 'BookNStay', 'Hotel & Event Booking Platform', 'web-design', '2024-2025', '["Laravel", "ReactJS", "MySQL", "REST APIs"]', 'Developed a full-stack web application for the Gilgit Baltistan hospitality industry, enabling users to book hotels and events through a centralized platform. The system includes booking management, user authentication, and admin dashboards for efficient operations.', '/assets/img/portfolio/portfolio-1.webp', TRUE, 'Hospitality Industry', '#', 'published'),
('2', 'eSchool ERP', 'LMS + School Management System', 'web-design', '2024-2025', '["Laravel", "ReactJS", "MySQL", "REST APIs"]', 'Built a comprehensive ERP system combining LMS features with school management functionalities. The platform supports course management, student and teacher workflows, role-based access, and performance tracking dashboards.', '/assets/img/portfolio/portfolio-2.webp', TRUE, 'Education Sector', '#', 'published'),
('3', 'JPay', 'HR Management System', 'web-design', '2023-2024', '["ReactJS", "JavaScript", "Axios", "REST APIs"]', 'Developed a web-based HR system for managing companies and employees, including dashboards, employee data handling, and workflows.', '/assets/img/portfolio/portfolio-4.webp', FALSE, 'Corporate', '#', 'published'),
('4', 'SpeedyHR', 'Advanced HR Platform', 'web-design', '2023-2024', '["ReactJS", "Redux", "JavaScript", "REST APIs"]', 'Designed an advanced HR management system enabling organizations to manage employees, payroll processes, and internal workflows with improved efficiency.', '/assets/img/portfolio/portfolio-5.webp', FALSE, 'HR Departments', '#', 'published'),
('5', 'CloudMunshi', 'eCommerce Integration Platform', 'web-design', '2023-2024', '["ReactJS", "APIs Integration", "JavaScript"]', 'Built a platform integrating multiple eCommerce stores into a unified system, allowing centralized monitoring and management of business operations.', '/assets/img/portfolio/portfolio-6.webp', FALSE, 'eCommerce Businesses', '#', 'published'),
('6', 'CloudInstaller', 'Build Distribution Platform', 'web-design', '2023', '["ReactJS", "JavaScript", "File Management"]', 'Developed a web-based portal for sharing mobile application builds (IPA/APK) among teams and testers, enabling efficient version control and internal distribution.', '/assets/img/portfolio/portfolio-7.webp', FALSE, 'Development Teams', '#', 'published'),
('7', 'Zendesk Clone', 'Web Chat Application', 'web-design', '2023', '["ReactJS", "JavaScript", "Real-time Communication"]', 'Developed a real-time web chat application with a user-friendly interface, enabling seamless communication and interaction between users.', '/assets/img/portfolio/portfolio-8.webp', FALSE, 'Support Teams', '#', 'published'),
('12', 'FinanceFlow Dashboard', 'Fintech UI/UX Design', 'ui-ux', '2024', '["Figma", "Prototyping", "User Research"]', 'Designed a comprehensive financial dashboard for a fintech startup, focusing on data visualization, user-friendly navigation, and accessibility. Included wireframes, high-fidelity mockups, and interactive prototypes.', '/assets/img/portfolio/portfolio-13.webp', TRUE, 'FinanceFlow', '#', 'published'),
('13', 'HealthTrack App', 'Healthcare UI/UX Design', 'ui-ux', '2024', '["Figma", "Adobe XD", "User Testing"]', 'Created an intuitive health tracking mobile application design with focus on elderly users. Conducted user research and usability testing to ensure accessible interface patterns.', '/assets/img/portfolio/portfolio-14.webp', TRUE, 'HealthTech Inc', '#', 'published'),
('14', 'ShopNest', 'E-commerce Redesign', 'ui-ux', '2023', '["Figma", "Design System", "Mobile-first"]', 'Redesigned a complete e-commerce platform with modern UI patterns, optimized checkout flow, and cohesive design system. Increased conversion rate by 25% through UX improvements.', '/assets/img/portfolio/portfolio-15.webp', FALSE, 'ShopNest Retail', '#', 'published'),
('15', 'Nexus Bank Rebrand', 'Corporate Identity', 'branding', '2024', '["Logo Design", "Brand Guidelines", "Stationery"]', 'Created complete brand identity for a modern digital bank, including logo, color palette, typography, and comprehensive brand guidelines for consistent application.', '/assets/img/portfolio/portfolio-16.webp', TRUE, 'Nexus Bank', '#', 'published'),
('16', 'GreenEarth Logo', 'Environmental Brand Identity', 'branding', '2023', '["Logo Design", "Brand Strategy", "Visual Identity"]', 'Developed eco-friendly brand identity for an environmental consulting firm, featuring sustainable design elements and earth-toned color palette.', '/assets/img/portfolio/portfolio-17.webp', FALSE, 'GreenEarth Solutions', '#', 'published'),
('17', 'Urban Eats', 'Restaurant Brand Identity', 'branding', '2024', '["Logo", "Menu Design", "Signage", "Social Media"]', 'Created vibrant brand identity for a modern fast-casual restaurant chain, including logo, menu designs, interior signage, and social media templates.', '/assets/img/portfolio/portfolio-18.webp', FALSE, 'Urban Eats', '#', 'published'),
('18', 'TechDesk Pro', 'Desktop Application', 'desktop-app', '2024', '["Electron", "React", "Node.js", "SQLite"]', 'Developed a comprehensive help desk management desktop application with ticket tracking, knowledge base, and reporting features. Built with Electron for cross-platform compatibility.', '/assets/img/portfolio/portfolio-19.webp', TRUE, 'TechDesk Inc', '#', 'published'),
('19', 'DataViz Studio', 'Desktop Analytics Tool', 'desktop-app', '2023', '["Electron", "D3.js", "Python", "PostgreSQL"]', 'Created a powerful data visualization desktop application for business analytics, featuring interactive charts, real-time data connection, and custom report generation.', '/assets/img/portfolio/portfolio-20.webp', TRUE, 'DataViz Corp', '#', 'published'),
('20', 'SecureVault', 'Password Manager Desktop App', 'desktop-app', '2024', '["Electron", "React", "Encryption", "Local Storage"]', 'Built a secure password management application with AES-256 encryption, biometric authentication, and cross-device sync capabilities.', '/assets/img/portfolio/portfolio-21.webp', FALSE, 'SecureVault Labs', '#', 'published');
