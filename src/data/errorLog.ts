// src/data/errorLog.ts
// Journal des fautes avec répétition espacée (système Leitner, localStorage).
// Aucune dépendance externe.

export type LoggedMistake = {
  id: string;
  prompt: string;
  answer: string;
  topic: string;
  box: number;   // boîte Leitner : 1 (à revoir souvent) → 4
  due: number;   // timestamp (ms) du prochain passage
  added: number;
};

const KEY = 'ss_error_log_v1';

// Intervalle avant réapparition selon la boîte (en jours) : index = boîte.
// box1 ≈ tout de suite, box2 = +2j, box3 = +4j, box4 = +8j, puis maîtrisé.
const INTERVALS_MS = [0, 0, 2, 4, 8].map((d) => d * 86_400_000);

function hashId(prompt: string, answer: string): string {
  const s = `${prompt}|${answer}`;
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return 'm' + (h >>> 0).toString(36);
}

function load(): Record<string, LoggedMistake> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

function save(data: Record<string, LoggedMistake>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* quota plein : on ignore */
  }
}

// Enregistre (ou réarme) une faute. Une faute repart toujours en boîte 1.
export function logMistake(d: { prompt: string; answer: string }, topic = ''): void {
  const data = load();
  const id = hashId(d.prompt, d.answer);
  const now = Date.now();
  data[id] = {
    id,
    prompt: d.prompt,
    answer: d.answer,
    topic,
    box: 1,
    due: now,
    added: data[id]?.added ?? now,
  };
  save(data);
}

// À appeler après chaque réponse en mode révision.
export function recordReview(prompt: string, answer: string, correct: boolean): void {
  const data = load();
  const id = hashId(prompt, answer);
  const m = data[id];
  if (!m) return;

  if (correct) {
    m.box += 1;
    if (m.box >= INTERVALS_MS.length) {
      // maîtrisé → sort du journal
      delete data[id];
      save(data);
      return;
    }
    m.due = Date.now() + INTERVALS_MS[m.box];
  } else {
    m.box = 1;
    m.due = Date.now();
  }
  save(data);
}

// Fautes dues maintenant, les plus fragiles d'abord.
export function getDueMistakes(): LoggedMistake[] {
  const now = Date.now();
  return Object.values(load())
    .filter((m) => m.due <= now)
    .sort((a, b) => a.box - b.box || a.due - b.due);
}

export function countDue(): number {
  return getDueMistakes().length;
}

export function totalMistakes(): number {
  return Object.keys(load()).length;
}

export function clearErrorLog(): void {
  save({});
}
