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

function dayIndex(): number {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

// ---------- input (écoute) ----------
const INPUT_TASKS = [
  'Podcast Easy Catalan (épisode débutant + transcription)',
  'Un article court sur VilaWeb ou 3Cat — note 10 mots',
  'Infos de Catalunya Ràdio (écoute active, 10 min)',
  'Un épisode de série sur 3Cat, sous-titres en català',
];
export function todaysInput(): string {
  return INPUT_TASKS[dayIndex() % INPUT_TASKS.length];
}

// ---------- production (sujet écrit/oral accordé au thème du jour) ----------
type Theme = 'past' | 'future' | 'conditional' | 'pronouns' | 'subjunctive' | 'general';

const PROMPTS: Record<TargetLang, Record<Theme, string[]>> = {
  catalan: {
    past: [
      'Explica què vas fer el cap de setmana passat (mín. 6 frases).',
      'Descriu el teu últim viatge: on vas anar i què va passar.',
      "Com ha anat el teu dia d'avui? Fes servir el perfet.",
      'Explica una cursa de muntanya que hagis corregut.',
    ],
    future: [
      'Com serà la teva setmana que ve? Explica els teus plans.',
      'Què faràs quan comencis el màster a la UB?',
      "Imagina la teva vida d'aquí a cinc anys.",
      'Quins llocs de Catalunya visitaràs aquest any?',
    ],
    conditional: [
      'Si guanyessis la loteria, què faries?',
      'Quin consell donaries a algú que arriba a viure a Barcelona?',
      'Si poguessis viure en qualsevol època de la història, quina triaries i per què?',
      'Què faries si tinguessis un mes lliure sense feina?',
    ],
    pronouns: [
      'Descriu la teva rutina del matí i substitueix els noms per pronoms febles.',
      'Respon amb pronoms: Vas sovint a la muntanya? Beus vi? Fas els deures?',
      'Explica un plat que cuines i com el prepares, usant pronoms.',
      'Explica què fas amb les teves coses (claus, cafè, llibres) amb en/hi/el/la.',
    ],
    subjunctive: [
      'Digues què vols que passi aquest any (Vull que...).',
      'Dona la teva opinió: És important que... / No crec que...',
      'Expressa desitjos per al teu futur a Barcelona (Espero que...).',
      'Recomana a un amic què faci a Barcelona (Et recomano que...).',
    ],
    general: [
      "Presenta't: qui ets, d'on véns i per què vius a Barcelona.",
      'Explica la història romana de Barcelona (Barcino) en 6 frases.',
      "Descriu el teu grup de música preferit i per què t'agrada.",
      "Explica per què t'agrada el vi i quins en prefereixes.",
    ],
  },
  spanish: {
    past: [
      'Cuenta qué hiciste el fin de semana pasado (mín. 6 frases).',
      'Describe tu último viaje: adónde fuiste y qué pasó.',
      '¿Cómo ha ido tu día de hoy? Usa el pretérito perfecto.',
      'Explica una carrera de montaña que hayas corrido.',
    ],
    future: [
      '¿Cómo será tu próxima semana? Explica tus planes.',
      '¿Qué harás cuando empieces el máster?',
      'Imagina tu vida dentro de cinco años.',
      '¿Qué lugares visitarás este año?',
    ],
    conditional: [
      'Si ganaras la lotería, ¿qué harías?',
      '¿Qué consejo le darías a alguien que llega a vivir a Barcelona?',
      'Si pudieras vivir en cualquier época, ¿cuál elegirías y por qué?',
      '¿Qué harías si tuvieras un mes libre?',
    ],
    pronouns: [
      'Describe tu rutina y sustituye los nombres por pronombres.',
      '¿Ves a menudo a tus amigos? ¿Bebes café? Responde usando pronombres.',
      'Explica un plato que cocinas usando lo/la/los/las/le.',
      'Cuenta qué haces con tus cosas usando pronombres.',
    ],
    subjunctive: [
      'Di qué quieres que pase este año (Quiero que...).',
      'Da tu opinión: Es importante que... / No creo que...',
      'Expresa deseos para tu futuro (Espero que...).',
      'Recomienda a un amigo qué hacer (Te recomiendo que...).',
    ],
    general: [
      'Preséntate: quién eres, de dónde vienes y por qué vives en Barcelona.',
      'Explica la historia romana de Barcelona en 6 frases.',
      'Describe tu grupo de música favorito y por qué te gusta.',
      'Explica por qué te gusta el vino y cuáles prefieres.',
    ],
  },
};

function themeOfDay(cfg: PlanConfig): Theme {
  const ids = todaysGrammar(cfg).map((p) => p.id).join(' ');
  if (/pronom|feble|combinat|cod|coi/.test(ids)) return 'pronouns';
  if (/subjuntiu|subjuntivo/.test(ids)) return 'subjunctive';
  if (/condicional/.test(ids)) return 'conditional';
  if (/futur|futuro/.test(ids)) return 'future';
  if (/perfet|perifrastic|imperfet|passat|pronominals|preterito|pluscuam|plusquam|indefinit/.test(ids))
    return 'past';
  return 'general';
}

export type Production = { theme: Theme; modality: string; topic: string };

export function todaysProduction(cfg: PlanConfig): Production {
  const theme = themeOfDay(cfg);
  const bank = PROMPTS[cfg.lang][theme] || PROMPTS[cfg.lang].general;
  const topic = bank[dayIndex() % bank.length];
  const modality = dayIndex() % 2 === 0 ? '✍️ Écris' : '🎙️ Enregistre-toi (oral)';
  return { theme, modality, topic };
}
