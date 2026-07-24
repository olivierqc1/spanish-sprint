// src/data/topicProgress.ts
// Meilleur score (%) par point de grammaire, en localStorage.

import { recordActivity, dayKey } from './activityLog';

const KEY = 'ss_topic_progress_v1';
const SEEN_KEY = 'ss_topic_seen_v1'; // id du point -> dernier jour travaillé (YYYY-MM-DD)
type ScoreMap = Record<string, number>; // id du point -> meilleur %

function load(): ScoreMap {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

function save(m: ScoreMap): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(m));
    window.dispatchEvent(new Event('ss-topic-updated'));
  } catch {
    /* quota plein : on ignore */
  }
}

type SeenMap = Record<string, string>;

function loadSeen(): SeenMap {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(SEEN_KEY) || '{}');
  } catch {
    return {};
  }
}

// Date de dernier passage sur un module (pour les révisions espacées).
export function getAllLastSeen(): SeenMap {
  return loadSeen();
}

export function getLastSeen(id: string): string | undefined {
  return loadSeen()[id];
}

// N'enregistre le score que si c'est un record, MAIS note toujours
// le jour d'activité et la date de dernier passage sur ce module.
export function recordTopicScore(id: string, pct: number): void {
  recordActivity();

  const seen = loadSeen();
  seen[id] = dayKey();
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  } catch {
    /* quota plein : on ignore */
  }

  const m = load();
  if (pct > (m[id] ?? -1)) {
    m[id] = pct;
    save(m);
  } else {
    // pas un record, mais la vue du plan doit quand même se rafraîchir
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('ss-topic-updated'));
  }
}

export function getBestScore(id: string): number | undefined {
  return load()[id];
}

export function getAllTopicScores(): ScoreMap {
  return load();
}
