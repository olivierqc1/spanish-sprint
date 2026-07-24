// src/data/activityLog.ts
// Journal des jours où tu as réellement étudié (un drill terminé = jour actif).
// Aucun import : évite toute dépendance circulaire.

const KEY = 'ss_activity_days_v1';

export function dayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function parseDay(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

export function daysBetween(fromKey: string, toKey: string): number {
  const a = parseDay(fromKey).getTime();
  const b = parseDay(toKey).getTime();
  return Math.round((b - a) / 86400000);
}

export function addDays(key: string, n: number): string {
  const d = parseDay(key);
  d.setDate(d.getDate() + n);
  return dayKey(d);
}

function load(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

// Marque aujourd'hui comme jour étudié (idempotent).
export function recordActivity(): void {
  if (typeof window === 'undefined') return;
  const days = load();
  const k = dayKey();
  if (days.includes(k)) return;
  days.push(k);
  try {
    localStorage.setItem(KEY, JSON.stringify(days.slice(-400)));
    window.dispatchEvent(new Event('ss-activity-updated'));
  } catch {
    /* quota plein : on ignore */
  }
}

export function getActivityDays(): string[] {
  return load();
}

// Série de jours consécutifs, en comptant depuis aujourd'hui (ou hier si pas encore étudié).
export function getStreak(): number {
  const days = new Set(load());
  if (days.size === 0) return 0;
  let cursor = dayKey();
  if (!days.has(cursor)) {
    cursor = addDays(cursor, -1);
    if (!days.has(cursor)) return 0;
  }
  let n = 0;
  while (days.has(cursor)) {
    n += 1;
    cursor = addDays(cursor, -1);
  }
  return n;
}

// Les n derniers jours, pour la bande de calendrier.
export function getCalendar(n = 14): { key: string; active: boolean; isToday: boolean }[] {
  const days = new Set(load());
  const today = dayKey();
  const out: { key: string; active: boolean; isToday: boolean }[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const k = addDays(today, -i);
    out.push({ key: k, active: days.has(k), isToday: k === today });
  }
  return out;
}
