'use client';

import { useEffect } from 'react';

interface HtmlContentProps {
  html: string;
}

export default function HtmlContent({ html }: HtmlContentProps) {
  useEffect(() => {
    // Re-run any necessary scripts after HTML is inserted
    // The main.js script loaded via layout should handle initialization
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}