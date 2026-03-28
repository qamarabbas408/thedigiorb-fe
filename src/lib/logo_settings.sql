-- Add logo and favicon fields to site_settings table
ALTER TABLE site_settings ADD COLUMN logo_type VARCHAR(20) DEFAULT 'text';
ALTER TABLE site_settings ADD COLUMN logo_image VARCHAR(500) DEFAULT '';
ALTER TABLE site_settings ADD COLUMN favicon VARCHAR(500) DEFAULT '';

-- Insert default logo settings if not exists
INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES
('logo_type', 'text'),
('logo_image', ''),
('favicon', '');
