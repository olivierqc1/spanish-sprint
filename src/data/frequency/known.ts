// src/data/frequency/known.ts
// Mots de la liste de fréquence que l'utilisateur a cochés « je connais », par langue.
// Partagé entre la page Mots fréquents et les épisodes d'input compréhensible.
export type FreqLang = 'catalan' | 'spanish';
export const KNOWN_KEY = 'ss_freq_known_v1';

export function loadKnown(): Record<FreqLang, string[]> {
  if (typeof window === 'undefined') return { catalan: [], spanish: [] };
  try {
    const raw = JSON.parse(localStorage.getItem(KNOWN_KEY) || '{}');
    return { catalan: raw.catalan || [], spanish: raw.spanish || [] };
  } catch {
    return { catalan: [], spanish: [] };
  }
}

export function saveKnown(k: Record<FreqLang, string[]>): void {
  try {
    localStorage.setItem(KNOWN_KEY, JSON.stringify(k));
  } catch {
    /* stockage plein ou bloqué : on ignore */
  }
}
