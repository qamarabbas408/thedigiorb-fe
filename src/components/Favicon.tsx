'use client';

import { useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';

export default function Favicon() {
  const { settings, loading } = useSettings();

  useEffect(() => {
    if (!loading && settings.favicon) {
      const links = document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]');
      links.forEach((link) => {
        const htmlLink = link as HTMLLinkElement;
        if (htmlLink.getAttribute('data-dynamic') !== 'true') {
          htmlLink.setAttribute('data-dynamic', 'true');
        }
      });

      let faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        document.head.appendChild(faviconLink);
      }
      faviconLink.href = settings.favicon;
      faviconLink.setAttribute('data-dynamic', 'true');

      let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
      if (!appleTouchIcon) {
        appleTouchIcon = document.createElement('link');
        appleTouchIcon.rel = 'apple-touch-icon';
        document.head.appendChild(appleTouchIcon);
      }
      appleTouchIcon.href = settings.favicon;
      appleTouchIcon.setAttribute('data-dynamic', 'true');
    }
  }, [settings.favicon, loading]);

  return null;
}
