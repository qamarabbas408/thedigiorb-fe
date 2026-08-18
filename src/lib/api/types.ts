export interface Project {
  id: string | number;
  title: string;
  subtitle?: string;
  category_id: string;
  year?: string;
  technologies?: string[];
  description?: string;
  image?: string;
  gallery?: string[];
  featured?: boolean;
  display_order?: number;
  is_active?: boolean;
  client?: string;
  url?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  filter_class: string;
  icon: string;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: string | number;
  title: string;
  description: string;
  icon: string;
  featured: boolean;
  display_order: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface Stat {
  id: string;
  section: string;
  label: string;
  value: string;
  icon: string;
  display_order: number;
  status: string;
  is_global?: boolean;
  global_key?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  display_order: number;
  status: string;
  facebook_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  instagram_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TeamSkill {
  name: string;
  level: number;
}

export interface TeamExperience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface TeamProject {
  title: string;
  category: string;
  image?: string;
  href?: string | null;
}

export interface TeamHobby {
  label: string;
  icon: string;
}

export interface TeamMemberProfile {
  id: string | number;
  slug?: string;
  name: string;
  role: string;
  photo?: string;
  years_experience?: number;
  location?: string;
  bio?: string;
  stack?: string[];
  skills?: TeamSkill[];
  experience?: TeamExperience[];
  projects?: TeamProject[];
  hobbies?: TeamHobby[];
  social?: {
    facebook?: string | null;
    twitter?: string | null;
    linkedin?: string | null;
    instagram?: string | null;
    github?: string | null;
  };
  display_order?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Testimonial {
  id: string | number;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  featured: boolean;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface Contact {
  id?: string | number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read?: boolean;
  created_at?: string;
}

export interface Settings {
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  company_description: string;
  logo_type: 'image' | 'text';
  logo_image: string;
  logo_text: string;
  favicon: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  instagram_url: string;
  show_phone: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
