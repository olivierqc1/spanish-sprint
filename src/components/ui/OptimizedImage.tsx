// src/components/ui/OptimizedImage.tsx
'use client';

import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  fallbackSrc = '/images/illustrations/empty-state.svg',
  width,
  height,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse rounded" />
      )}
      <img
        src={hasError ? fallbackSrc : imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setImageSrc(fallbackSrc);
          setIsLoading(false);
        }}
        loading="lazy"
      />
    </div>
  );
}
