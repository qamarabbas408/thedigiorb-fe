export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  popular?: boolean;
  features: string[];
  techStack: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Desktop Application' | 'Mobile Design' | 'Web Design' | 'UI/UX' | 'Branding';
  badge?: string;
  description: string;
  fullDetails?: string;
  technologies: string[];
  year: string;
  image: string;
  metrics?: string;
  liveUrl?: string;
}

export interface RevampTeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  skills: string[];
  avatarGradient: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  tags: string[];
}

export interface FaqItem {
  id: string;
  category: 'General' | 'Process' | 'Pricing & Delivery' | 'Tech & Security';
  question: string;
  answer: string;
}
