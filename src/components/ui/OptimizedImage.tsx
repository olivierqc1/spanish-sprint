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

// src/hooks/useLazyLoad.ts
import { useEffect, useRef, useState } from 'react';

export function useLazyLoad<T extends HTMLElement>(
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        ...options,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref, isIntersecting };
}

// src/components/audio/LazyAudioPlayer.tsx
'use client';

import { useLazyLoad } from '@/hooks/useLazyLoad';

interface LazyAudioPlayerProps {
  src: string;
  title?: string;
}

export function LazyAudioPlayer({ src, title }: LazyAudioPlayerProps) {
  const { ref, isIntersecting } = useLazyLoad<HTMLDivElement>();

  return (
    <div ref={ref} className="w-full">
      {isIntersecting ? (
        <audio controls className="w-full" preload="metadata">
          <source src={src} type="audio/mpeg" />
          Votre navigateur ne supporte pas l'élément audio.
        </audio>
      ) : (
        <div className="w-full h-12 bg-slate-800 rounded-lg animate-pulse flex items-center justify-center">
          <span className="text-sm text-slate-400">Chargement audio...</span>
        </div>
      )}
      {title && (
        <p className="text-xs text-slate-500 mt-1 text-center">{title}</p>
      )}
    </div>
  );
}

// src/lib/audioCache.ts
class AudioCache {
  private cache: Map<string, Blob> = new Map();
  private maxSize: number;

  constructor(maxSizeMB: number = 50) {
    this.maxSize = maxSizeMB * 1024 * 1024;
  }

  async get(url: string): Promise<Blob | null> {
    return this.cache.get(url) || null;
  }

  async set(url: string, blob: Blob): Promise<void> {
    const currentSize = this.getCurrentSize();
    
    if (currentSize + blob.size > this.maxSize) {
      this.evictOldest();
    }
    
    this.cache.set(url, blob);
  }

  private getCurrentSize(): number {
    let size = 0;
    this.cache.forEach(blob => {
      size += blob.size;
    });
    return size;
  }

  private evictOldest(): void {
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      this.cache.delete(firstKey);
    }
  }

  clear(): void {
    this.cache.clear();
  }
}

export const audioCache = new AudioCache();

// src/lib/audioLoader.ts
import { audioCache } from './audioCache';

export async function loadAudio(url: string): Promise<string> {
  // Vérifier le cache
  const cached = await audioCache.get(url);
  if (cached) {
    return URL.createObjectURL(cached);
  }

  // Télécharger et cacher
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    await audioCache.set(url, blob);
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Erreur de chargement audio:', error);
    throw error;
  }
}

// src/components/ui/Skeleton.tsx
interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular' 
}: SkeletonProps) {
  const baseClass = 'animate-pulse bg-slate-800';
  
  const variantClass = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }[variant];

  return <div className={`${baseClass} ${variantClass} ${className}`} />;
}

// Exemple d'utilisation des Skeletons
export function ConversationCardSkeleton() {
  return (
    <div className="p-5 border-2 border-slate-700 rounded-xl">
      <div className="flex justify-between items-start mb-3">
        <Skeleton variant="circular" className="w-12 h-12" />
        <Skeleton variant="rectangular" className="w-12 h-6" />
      </div>
      <Skeleton variant="text" className="w-3/4 mb-2" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
  );
}
