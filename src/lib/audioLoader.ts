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
