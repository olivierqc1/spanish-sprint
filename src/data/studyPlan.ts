// src/data/studyPlan.ts
// Génère un plan d'étude personnalisé (niveau actuel → cible, minutes/jour)
// et lit les scores réels de topicProgress pour s'ajuster automatiquement.

import { grammarPoints, type GrammarPoint } from './grammar';
import { getAllTopicScores } from './topicProgress';

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type TargetLang = 'catalan' | 'spanish';

export type PlanConfig = {
  currentLevel: Level;
  targetLevel: Level;
  minutesPerDay: number;
  lang: TargetLang;
  startDate: string; // YYYY-MM-DD
};

const CONFIG_KEY = 'ss_studyplan_v1';
const TASKS_KEY = 'ss_studyplan_tasks_v1';
const MASTERY = 80; // % pour considérer un point acquis

export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const RANK: Record<Level, number> = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5, C2: 6 };

// "A1-A2" -> 2, "A2" -> 2, "A2-B1" -> 3
function maxRank(level: string): number {
  const found = (level.match(/[ABC][12]/g) || ['A1']) as Level[];
  return Math.max(...found.map((l) => RANK[l] ?? 1));
}

function isCatalan(p: GrammarPoint): boolean {
  return p.id.startsWith('cat') || p.id.startsWith('catala');
}

export function dayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ---------- config ----------
export function loadConfig(): PlanConfig | null {
  if (typeof window === 'undefined') return null;
  try {
    const r = localStorage.getItem(CONFIG_KEY);
    return r ? (JSON.parse(r) as PlanConfig) : null;
  } catch {
    return null;
  }
}

export function saveConfig(c: PlanConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(c));
    window.dispatchEvent(new Event('ss-plan-updated'));
  } catch {
    /* quota plein : on ignore */
  }
}

export function clearConfig(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CONFIG_KEY);
    window.dispatchEvent(new Event('ss-plan-updated'));
  } catch {
    /* ignore */
  }
}

// ---------- tâches quotidiennes (input / output) ----------
type DayTasks = { input?: boolean; output?: boolean };

function loadTasks(): Record<string, DayTasks> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(TASKS_KEY) || '{}');
  } catch {
    return {};
  }
}

export function getTodayTasks(): DayTasks {
  return loadTasks()[dayKey()] || {};
}

export function toggleTask(kind: 'input' | 'output'): void {
  if (typeof window === 'undefined') return;
  const all = loadTasks();
  const k = dayKey();
  all[k] = { ...all[k], [kind]: !all[k]?.[kind] };
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(all));
    window.dispatchEvent(new Event('ss-plan-updated'));
  } catch {
    /* ignore */
  }
}

// ---------- génération du plan ----------
export function pointsPerDay(minutes: number): number {
  return Math.min(5, Math.max(1, Math.round((minutes - 20) / 25)));
}
export function wantsInput(minutes: number): boolean {
  return minutes >= 45;
}
export function wantsOutput(minutes: number): boolean {
  return minutes >= 60;
}

export type Curriculum = {
  all: GrammarPoint[];
  mastered: GrammarPoint[];
  remaining: GrammarPoint[];
};

export function buildCurriculum(cfg: PlanConfig): Curriculum {
  const lo = RANK[cfg.currentLevel];
  const hi = Math.max(lo, RANK[cfg.targetLevel]);
  const scores = getAllTopicScores();
  const all = grammarPoints
    .filter((p) => (cfg.lang === 'catalan' ? isCatalan(p) : !isCatalan(p)))
    .filter((p) => {
      const r = maxRank(p.level);
      return r >= lo && r <= hi;
    });
  const mastered = all.filter((p) => (scores[p.id] ?? 0) >= MASTERY);
  const remaining = all.filter((p) => (scores[p.id] ?? 0) < MASTERY);
  return { all, mastered, remaining };
}

// Objectifs de grammaire du jour = prochains points non acquis
export function todaysGrammar(cfg: PlanConfig): GrammarPoint[] {
  const { remaining } = buildCurriculum(cfg);
  return remaining.slice(0, pointsPerDay(cfg.minutesPerDay));
}

export function estimateDaysLeft(cfg: PlanConfig): number {
  const { remaining } = buildCurriculum(cfg);
  return Math.ceil(remaining.length / pointsPerDay(cfg.minutesPerDay));
}

// Suggestions input / output qui tournent chaque jour
const INPUT_TASKS = [
  'Podcast Easy Catalan (épisode débutant + transcription)',
  'Un article court sur VilaWeb ou 3Cat — note 10 mots',
  'Infos de Catalunya Ràdio (écoute active, 10 min)',
  'Un épisode de série sur 3Cat, sous-titres en català',
];
const OUTPUT_TASKS = [
  'Écris 8 phrases sur ta journée (mélange les temps)',
  'Enregistre-toi 2 min : raconte hier et demain',
  '10 min de conversation avec Laura, 100% en català',
  'Dictée courte : Easy Catalan, écoute et transcris',
];

function dayIndex(): number {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

export function todaysInput(): string {
  return INPUT_TASKS[dayIndex() % INPUT_TASKS.length];
}
export function todaysOutput(): string {
  return OUTPUT_TASKS[dayIndex() % OUTPUT_TASKS.length];
}
