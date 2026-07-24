// src/data/studyPlan.ts
// Génère un plan d'étude personnalisé (niveau actuel → cible, minutes/jour)
// et lit les scores réels de topicProgress pour s'ajuster automatiquement.

import { grammarPoints, type GrammarPoint } from './grammar';
import { getAllTopicScores, getAllLastSeen } from './topicProgress';
import { dayKey, daysBetween, addDays } from './activityLog';

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type TargetLang = 'catalan' | 'spanish';

export type PlanConfig = {
  currentLevel: Level;
  targetLevel: Level;
  minutesPerDay: number;
  lang: TargetLang;
  startDate: string; // YYYY-MM-DD
  targetDate: string; // YYYY-MM-DD — la date butoir de ton objectif
};

const CONFIG_KEY = 'ss_studyplan_v1';
const TASKS_KEY = 'ss_studyplan_tasks_v1';
const MASTERY = 80;    // % pour considérer un point acquis
const GATE = 3;        // nb de modules faibles qui déclenche le mode consolidation
const REVIEW_DAYS = 14; // un module acquis se révise après ce nb de jours

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

export { dayKey } from './activityLog';

// ---------- config ----------
export function loadConfig(): PlanConfig | null {
  if (typeof window === 'undefined') return null;
  try {
    const r = localStorage.getItem(CONFIG_KEY);
    if (!r) return null;
    const c = JSON.parse(r) as PlanConfig;
    // Rétrocompatibilité : anciens plans sans date cible
    if (!c.targetDate) c.targetDate = addDays(c.startDate || dayKey(), 56);
    return c;
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
  // Dédoublonnage : grammar.ts contient des entrées enregistrées deux fois.
  const seenIds = new Set<string>();
  const unique = grammarPoints.filter((p) => {
    if (seenIds.has(p.id)) return false;
    seenIds.add(p.id);
    return true;
  });
  const all = unique
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

// ---------- calendrier & rythme ----------
export type PlanStatus = 'done' | 'ahead' | 'ontrack' | 'behind' | 'expired';

export type Pacing = {
  totalDays: number;      // durée totale du plan
  elapsedDays: number;    // jours écoulés depuis le début
  daysLeft: number;       // jours restants avant la date cible
  remaining: number;      // modules encore à acquérir
  capacityPerDay: number; // ce que ton temps quotidien permet
  requiredPerDay: number; // ce qu'il faudrait pour tenir la date
  projectedDays: number;  // jours nécessaires à ton rythme
  projectedDate: string;  // date de fin prévue
  status: PlanStatus;
};

export function getPacing(cfg: PlanConfig): Pacing {
  const today = dayKey();
  const { remaining: rem } = buildCurriculum(cfg);
  const remaining = rem.length;
  const capacityPerDay = pointsPerDay(cfg.minutesPerDay);

  const totalDays = Math.max(1, daysBetween(cfg.startDate, cfg.targetDate));
  const elapsedDays = Math.max(0, daysBetween(cfg.startDate, today));
  const daysLeft = daysBetween(today, cfg.targetDate);

  const projectedDays = Math.ceil(remaining / capacityPerDay);
  const projectedDate = addDays(today, projectedDays);
  const requiredPerDay = daysLeft > 0 ? remaining / daysLeft : Infinity;

  let status: PlanStatus;
  if (remaining === 0) status = 'done';
  else if (daysLeft < 0) status = 'expired';
  else if (projectedDays <= daysLeft * 0.85) status = 'ahead';
  else if (projectedDays <= daysLeft) status = 'ontrack';
  else status = 'behind';

  return {
    totalDays,
    elapsedDays,
    daysLeft,
    remaining,
    capacityPerDay,
    requiredPerDay,
    projectedDays,
    projectedDate,
    status,
  };
}

// Format court pour l'affichage : "6 sept."
export function formatShort(key: string): string {
  const [, m, d] = key.split('-').map(Number);
  const mois = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  return `${d} ${mois[(m || 1) - 1]}`;
}

// ---------- consolidation & révisions espacées ----------
export type Reason = 'weak' | 'review' | 'new';
export type TodayItem = { point: GrammarPoint; reason: Reason; best?: number };
export type TodayPlan = {
  mode: 'gate' | 'normal';
  items: TodayItem[];
  weakCount: number;   // modules déjà tentés mais sous le seuil
  dueCount: number;    // modules acquis à réviser
};

// Modules travaillés mais encore sous le seuil, du plus faible au moins faible.
export function getWeakPoints(cfg: PlanConfig): GrammarPoint[] {
  const scores = getAllTopicScores();
  return buildCurriculum(cfg)
    .all.filter((p) => scores[p.id] !== undefined && scores[p.id] < MASTERY)
    .sort((a, b) => (scores[a.id] ?? 0) - (scores[b.id] ?? 0));
}

// Modules acquis mais pas revus depuis REVIEW_DAYS jours.
export function getDuePoints(cfg: PlanConfig): GrammarPoint[] {
  const scores = getAllTopicScores();
  const seen = getAllLastSeen();
  const today = dayKey();
  return buildCurriculum(cfg)
    .all.filter((p) => (scores[p.id] ?? 0) >= MASTERY)
    .filter((p) => {
      const last = seen[p.id];
      return !last || daysBetween(last, today) >= REVIEW_DAYS;
    })
    .sort((a, b) => {
      const la = seen[a.id] ?? '0000-01-01';
      const lb = seen[b.id] ?? '0000-01-01';
      return la < lb ? -1 : 1;
    });
}

// Le plan du jour : consolidation forcée si trop de modules faibles.
export function getTodayPlan(cfg: PlanConfig): TodayPlan {
  const scores = getAllTopicScores();
  const perDay = pointsPerDay(cfg.minutesPerDay);
  const weak = getWeakPoints(cfg);
  const due = getDuePoints(cfg);
  const fresh = buildCurriculum(cfg).all.filter((p) => scores[p.id] === undefined);

  const wrap = (list: GrammarPoint[], reason: Reason): TodayItem[] =>
    list.map((point) => ({ point, reason, best: scores[point.id] }));

  // Verrou : trop de modules mal maîtrisés -> uniquement de la consolidation.
  if (weak.length >= GATE) {
    return {
      mode: 'gate',
      items: wrap(weak.slice(0, perDay), 'weak'),
      weakCount: weak.length,
      dueCount: due.length,
    };
  }

  // Sinon : une révision espacée max, puis les faibles, puis du nouveau.
  const items: TodayItem[] = [
    ...wrap(due.slice(0, 1), 'review'),
    ...wrap(weak, 'weak'),
    ...wrap(fresh, 'new'),
  ].slice(0, perDay);

  return { mode: 'normal', items, weakCount: weak.length, dueCount: due.length };
}
