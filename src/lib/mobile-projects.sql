-- Insert mobile development projects

-- VAD – Experience Abu Dhabi
INSERT IGNORE INTO projects (id, title, subtitle, category_id, year, technologies, description, image, featured, client, url, status)
VALUES ('8', 'VAD – Experience Abu Dhabi', 'Tourism Mobile Application', 'mobile-design', '2023-2025', '["Swift", "UIKit", "Firebase", "REST APIs"]', 'Developed a tourism mobile application showcasing events, attractions, and cultural experiences in Abu Dhabi. Focused on performance, scalability, and seamless user experience with real-time data integration.', '/assets/img/portfolio/portfolio-3.webp', TRUE, 'Abu Dhabi Tourism', '#', 'published');

-- Safa App
INSERT IGNORE INTO projects (id, title, subtitle, category_id, year, technologies, description, image, featured, client, url, status)
VALUES ('9', 'Safa App', 'Real-time Chat Application', 'mobile-design', '2023-2024', '["Swift", "Firebase", "Push Notifications"]', 'Built a real-time messaging application with Firebase integration, enabling instant communication, message synchronization, and push notifications.', '/assets/img/portfolio/portfolio-9.webp', FALSE, 'Safa Communications', '#', 'published');

-- PTTR – Loadboard
INSERT IGNORE INTO projects (id, title, subtitle, category_id, year, technologies, description, image, featured, client, url, status)
VALUES ('10', 'PTTR – Loadboard', 'Logistics Mobile Application', 'mobile-design', '2024-2025', '["Flutter", "Dart", "Google Maps API", "Mapbox", "REST APIs"]', 'Developed a cross-platform logistics application for managing shipments and truck navigation, featuring real-time tracking and map-based services. Deployed on both Android and iOS platforms.', '/assets/img/portfolio/portfolio-11.webp', TRUE, 'PTTR Logistics', '#', 'published');

-- GoBro – Customer App
INSERT IGNORE INTO projects (id, title, subtitle, category_id, year, technologies, description, image, featured, client, url, status)
VALUES ('11', 'GoBro – Customer App', 'Customer Mobile Application', 'mobile-design', '2023-2024', '["Flutter", "Dart", "Firebase"]', 'Developed a customer-facing mobile application providing seamless user experience for ordering, tracking, and managing services on-the-go.', '/assets/img/portfolio/portfolio-12.webp', FALSE, 'GoBro Services', '#', 'published');
