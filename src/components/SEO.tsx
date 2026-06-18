'use client';

import { useSettings } from '@/context/SettingsContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
}

const SITE_URL = 'https://thedigiorb.com';
const DEFAULT_IMAGE = 'https://thedigiorb.com/assets/img/og-image.png';

export default function SEO({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  publishedTime,
  author
}: SEOProps) {
  const { settings } = useSettings();
  
  const siteName = settings?.company_name || 'TheDigiOrb';
  const defaultDescription = settings?.company_description || 'Building innovative web and mobile solutions';
  
  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const pageDescription = description || defaultDescription;
  const pageImage = image || DEFAULT_IMAGE;
  const pageUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  
  return null;
}

export function generateMetadata(overrides?: Partial<SEOProps>): Record<string, string> {
  const base: Record<string, string> = {
    'title': overrides?.title || 'TheDigiOrb',
    'description': overrides?.description || 'Building innovative web and mobile solutions',
    'keywords': 'web development, mobile apps, digital solutions, software development, UI/UX design',
    'author': 'TheDigiOrb',
    'robots': 'index, follow',
    'og:title': overrides?.title || 'TheDigiOrb',
    'og:description': overrides?.description || 'Building innovative web and mobile solutions',
    'og:type': overrides?.type || 'website',
    'og:url': overrides?.url || SITE_URL,
    'og:image': overrides?.image || DEFAULT_IMAGE,
    'og:site_name': 'TheDigiOrb',
    'twitter:card': 'summary_large_image',
    'twitter:title': overrides?.title || 'TheDigiOrb',
    'twitter:description': overrides?.description || 'Building innovative web and mobile solutions',
    'twitter:image': overrides?.image || DEFAULT_IMAGE,
    'twitter:creator': '@digitalorbits',
    'canonical': overrides?.url || SITE_URL,
  };
  
  if (overrides?.publishedTime) {
    base['article:published_time'] = overrides.publishedTime;
  }
  
  if (overrides?.author) {
    base['article:author'] = overrides.author;
  }
  
  return base;
}
