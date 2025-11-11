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
