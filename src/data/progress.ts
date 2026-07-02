// src/data/progress.ts
// Suivi de progression (série, drills, précision) + objectif quotidien, en localStorage.

export type Stats = {
  totalAnswered: number;
  totalCorrect: number;
  accuracy: number;   // 0-100
  streak: number;     // jours consécutifs (aujourd'hui inclus)
  todayCount: number;
  daysActive: number;
};

const KEY = 'ss_progress_v1';
const GOAL_KEY = 'ss_daily_goal_v1';
const DEFAULT_GOAL = 20;

type Store = {
  totalAnswered: number;
  totalCorrect: number;
  days: Record<string, number>; // 'YYYY-MM-DD' -> nombre de réponses
};

const EMPTY: Store = { totalAnswered: 0, totalCorrect: 0, days: {} };

function dayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function load(): Store {
  if (typeof window === 'undefined') return { ...EMPTY };
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '');
    return parsed && typeof parsed === 'object'
      ? { totalAnswered: 0, totalCorrect: 0, days: {}, ...parsed }
      : { ...EMPTY };
  } catch {
    return { ...EMPTY };
  }
}

function save(s: Store): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
    window.dispatchEvent(new Event('ss-progress-updated'));
  } catch {
    /* quota plein : on ignore */
  }
}

export function recordAnswer(correct: boolean): void {
  const s = load();
  s.totalAnswered += 1;
  if (correct) s.totalCorrect += 1;
  const k = dayKey();
  s.days[k] = (s.days[k] || 0) + 1;
  save(s);
}

function computeStreak(days: Record<string, number>): number {
  const has = (d: Date) => !!days[dayKey(d)];
  const cursor = new Date();
  if (!has(cursor)) {
    cursor.setDate(cursor.getDate() - 1);
    if (!has(cursor)) return 0;
  }
  let streak = 0;
  while (has(cursor)) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function getStats(): Stats {
  const s = load();
  return {
    totalAnswered: s.totalAnswered,
    totalCorrect: s.totalCorrect,
    accuracy: s.totalAnswered ? Math.round((s.totalCorrect / s.totalAnswered) * 100) : 0,
    streak: computeStreak(s.days),
    todayCount: s.days[dayKey()] || 0,
    daysActive: Object.keys(s.days).length,
  };
}

// ----- Objectif quotidien -----
export function getDailyGoal(): number {
  if (typeof window === 'undefined') return DEFAULT_GOAL;
  const v = Number(localStorage.getItem(GOAL_KEY));
  return v > 0 ? v : DEFAULT_GOAL;
}

export function setDailyGoal(n: number): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(GOAL_KEY, String(n));
    window.dispatchEvent(new Event('ss-progress-updated'));
  } catch {
    /* ignore */
  }
}

export function resetProgress(): void {
  save({ ...EMPTY });
}
