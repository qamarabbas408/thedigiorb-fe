'use client';

import React, { useState } from 'react';

interface ProjectImageProps {
  src?: string;
  title: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export default function ProjectImage({
  src,
  title,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative w-full h-full overflow-hidden',
}: ProjectImageProps) {
  const [error, setError] = useState(false);

  const initials = title
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={containerClassName}>
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={className}
          onError={() => setError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-500/15 via-slate-900 to-blue-600/15">
          <span className="text-4xl font-black font-mono tracking-widest text-sky-400/80">
            {initials || '??'}
          </span>
        </div>
      )}
    </div>
  );
}