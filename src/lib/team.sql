-- Team Members table
CREATE TABLE IF NOT EXISTS team_members (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  role VARCHAR(200) DEFAULT '',
  bio TEXT,
  image VARCHAR(500) DEFAULT '',
  facebook_url VARCHAR(500) DEFAULT '#',
  twitter_url VARCHAR(500) DEFAULT '#',
  linkedin_url VARCHAR(500) DEFAULT '#',
  instagram_url VARCHAR(500) DEFAULT '#',
  display_order INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample team members
INSERT IGNORE INTO team_members (id, name, role, bio, image, display_order, status) VALUES
('1', 'Sarah Johnson', 'CEO & Founder', 'Visionary leader with 15+ years of experience in tech industry. Passionate about building innovative solutions.', '/assets/img/team/team-1.webp', 1, 'active'),
('2', 'Michael Chen', 'CTO', 'Technical expert specializing in scalable architecture. Leads our engineering team with excellence.', '/assets/img/team/team-2.webp', 2, 'active'),
('3', 'Emily Rodriguez', 'Lead Designer', 'Creative designer with a keen eye for detail. Passionate about user-centric design solutions.', '/assets/img/team/team-3.webp', 3, 'active');
