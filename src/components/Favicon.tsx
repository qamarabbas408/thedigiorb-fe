'use client';

import { useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';

const CONTENT_URL = process.env.NEXT_PUBLIC_CONTENT_URL || 'https://site.thedigiorb.com';

function getAbsoluteUrl(relativeUrl: string): string {
  if (!relativeUrl) return '';
  
  // If URL is already absolute (starts with http:// or https://), return as-is
  if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
    return relativeUrl;
  }
  
  // If URL is relative (starts with /), prepend CONTENT_URL
  if (relativeUrl.startsWith('/')) {
    return `${CONTENT_URL}${relativeUrl}`;
  }
  
  // Otherwise, treat as relative path and prepend CONTENT_URL
  return `${CONTENT_URL}/${relativeUrl}`;
}

export default function Favicon() {
  const { settings, loading } = useSettings();

  useEffect(() => {
    if (!loading && settings?.favicon) {
      const links = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]');
      links.forEach((link) => {
        const htmlLink = link as HTMLLinkElement;
        if (htmlLink.getAttribute('data-dynamic') !== 'true') {
          htmlLink.setAttribute('data-dynamic', 'true');
        }
      });

      const absoluteFaviconUrl = getAbsoluteUrl(settings.favicon);

      let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        document.head.appendChild(faviconLink);
      }
      faviconLink.href = absoluteFaviconUrl;
      faviconLink.setAttribute('data-dynamic', 'true');

      let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
      if (!appleTouchIcon) {
        appleTouchIcon = document.createElement('link');
        appleTouchIcon.rel = 'apple-touch-icon';
        document.head.appendChild(appleTouchIcon);
      }
      appleTouchIcon.href = absoluteFaviconUrl;
      appleTouchIcon.setAttribute('data-dynamic', 'true');
    }
  }, [settings?.favicon, loading]);

  return null;
}
