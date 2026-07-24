// src/data/topicProgress.ts
// Meilleur score (%) par point de grammaire, en localStorage.

import { recordActivity } from './activityLog';

const KEY = 'ss_topic_progress_v1';
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

// N'enregistre que si c'est un meilleur score que l'existant.
// Marque toujours le jour comme "étudié", même si le score n'est pas un record.
export function recordTopicScore(id: string, pct: number): void {
  recordActivity();
  const m = load();
  if (pct > (m[id] ?? -1)) {
    m[id] = pct;
    save(m);
  }
}

export function getBestScore(id: string): number | undefined {
  return load()[id];
}

export function getAllTopicScores(): ScoreMap {
  return load();
}
