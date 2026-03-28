-- Add gallery_images column to projects table (safe for all MySQL versions)
ALTER TABLE projects ADD COLUMN gallery_images TEXT;

-- Sample gallery data for existing projects
UPDATE projects SET gallery_images = '[]' WHERE gallery_images IS NULL;
