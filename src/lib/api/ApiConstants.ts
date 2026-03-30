export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';
export const CONTENT_URL = process.env.NEXT_PUBLIC_CONTENT_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Portfolio
  PROJECTS: `${API_BASE_URL}/portfolio/projects`,
  PROJECT: (id: string | number) => `${API_BASE_URL}/portfolio/projects/${id}`,
  CATEGORIES: `${API_BASE_URL}/portfolio/categories`,
  
  // Services
  SERVICES: `${API_BASE_URL}/services`,
  SERVICE: (id: string | number) => `${API_BASE_URL}/services/${id}`,
  
  // Stats
  STATS: `${API_BASE_URL}/stats`,
  STAT: (id: string | number) => `${API_BASE_URL}/stats/${id}`,
  STATS_SECTION: (section: string) => `${API_BASE_URL}/stats?section=${section}`,
  
  // Team
  TEAM: `${API_BASE_URL}/team`,
  TEAM_MEMBER: (id: string | number) => `${API_BASE_URL}/team/${id}`,
  
  // Testimonials
  TESTIMONIALS: `${API_BASE_URL}/testimonials`,
  TESTIMONIAL: (id: string | number) => `${API_BASE_URL}/testimonials/${id}`,
  
  // Contacts
  CONTACTS: `${API_BASE_URL}/contacts`,
  CONTACT: (id: string | number) => `${API_BASE_URL}/contacts/${id}`,
  
  // Settings
  SETTINGS: `${API_BASE_URL}/settings`,
  
  // Upload
  UPLOAD: `${API_BASE_URL}/upload`,
} as const;
