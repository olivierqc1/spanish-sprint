// src/data/conjugations/catalan.ts
// Conjugaisons catalanes A1 et A2
// Utilisées par src/app/conjugaison/page.tsx quand targetLanguage === 'catalan'

export const catalanPronouns = ['jo', 'tu', 'ell/ella', 'nosaltres', 'vosaltres', 'ells/elles'];

export type CatalanTense = 'present' | 'perifrasticPast' | 'imperfect' | 'future' | 'imperative';

export interface CatalanVerb {
  verb: string;
  meaning: string;
  meaningEn: string;
  conjugations: string[];
  irregular?: boolean;
  note?: string;
}

// ─── PRESENT D'INDICATIU ─────────────────────────────────────────────────────
// Terminaisons régulières :
//   -AR : o, es, a, em, eu, en
//   -RE / -ER : o, s, -, em, eu, en  (3e pers. sg. souvent sans terminaison)
//   -IR (incoatius) :eixo, eixes, eix, im, iu, eixen

export const presentTense: CatalanVerb[] = [
  // Verbes irréguliers essentiels A1
  {
    verb: 'ser',
    meaning: 'être (identité/origine)',
    meaningEn: 'to be (identity)',
    conjugations: ['sóc', 'ets', 'és', 'som', 'sou', 'són'],
    irregular: true,
    note: 'Différent de "estar" — ser s\'utilise pour l\'identité, la nationalité, la profession',
  },
  {
    verb: 'estar',
    meaning: 'être (état/lieu)',
    meaningEn: 'to be (state/location)',
    conjugations: ['estic', 'estàs', 'està', 'estem', 'esteu', 'estan'],
    irregular: true,
    note: 'Estar s\'utilise pour l\'état temporaire et la localisation',
  },
  {
    verb: 'tenir',
    meaning: 'avoir',
    meaningEn: 'to have',
    conjugations: ['tinc', 'tens', 'té', 'tenim', 'teniu', 'tenen'],
    irregular: true,
  },
  {
    verb: 'anar',
    meaning: 'aller',
    meaningEn: 'to go',
    conjugations: ['vaig', 'vas', 'va', 'anem', 'aneu', 'van'],
    irregular: true,
    note: 'Très irrégulier — vaig/vas/va au singulier',
  },
  {
    verb: 'fer',
    meaning: 'faire',
    meaningEn: 'to do / make',
    conjugations: ['faig', 'fas', 'fa', 'fem', 'feu', 'fan'],
    irregular: true,
  },
  {
    verb: 'voler',
    meaning: 'vouloir',
    meaningEn: 'to want',
    conjugations: ['vull', 'vols', 'vol', 'volem', 'voleu', 'volen'],
    irregular: true,
  },
  {
    verb: 'poder',
    meaning: 'pouvoir',
    meaningEn: 'can / to be able to',
    conjugations: ['puc', 'pots', 'pot', 'podem', 'podeu', 'poden'],
    irregular: true,
  },
  {
    verb: 'saber',
    meaning: 'savoir',
    meaningEn: 'to know (facts)',
    conjugations: ['sé', 'saps', 'sap', 'sabem', 'sabeu', 'saben'],
    irregular: true,
  },
  {
    verb: 'venir',
    meaning: 'venir',
    meaningEn: 'to come',
    conjugations: ['vinc', 'véns', 've', 'venim', 'veniu', 'vénen'],
    irregular: true,
  },
  {
    verb: 'dir',
    meaning: 'dire',
    meaningEn: 'to say',
    conjugations: ['dic', 'dius', 'diu', 'diem', 'dieu', 'diuen'],
    irregular: true,
  },
  // Verbes réguliers -AR
  {
    verb: 'parlar',
    meaning: 'parler',
    meaningEn: 'to speak',
    conjugations: ['parlo', 'parles', 'parla', 'parlem', 'parleu', 'parlen'],
  },
  {
    verb: 'treballar',
    meaning: 'travailler',
    meaningEn: 'to work',
    conjugations: ['treballo', 'treballes', 'treballa', 'treballem', 'treballeu', 'treballen'],
  },
  {
    verb: 'comprar',
    meaning: 'acheter',
    meaningEn: 'to buy',
    conjugations: ['compro', 'compres', 'compra', 'comprem', 'compreu', 'compren'],
  },
  {
    verb: 'estudiar',
    meaning: 'étudier',
    meaningEn: 'to study',
    conjugations: ['estudio', 'estudies', 'estudia', 'estudiem', 'estudieu', 'estudien'],
  },
  {
    verb: 'escoltar',
    meaning: 'écouter',
    meaningEn: 'to listen',
    conjugations: ['escolto', 'escoltes', 'escolta', 'escoltem', 'escolteu', 'escolten'],
  },
  {
    verb: 'mirar',
    meaning: 'regarder',
    meaningEn: 'to look / watch',
    conjugations: ['miro', 'mires', 'mira', 'mirem', 'mireu', 'miren'],
  },
  {
    verb: 'portar',
    meaning: 'porter / apporter',
    meaningEn: 'to carry / bring',
    conjugations: ['porto', 'portes', 'porta', 'portem', 'porteu', 'porten'],
  },
  {
    verb: 'trobar',
    meaning: 'trouver',
    meaningEn: 'to find',
    conjugations: ['trobo', 'trobes', 'troba', 'trobem', 'trobeu', 'troben'],
  },
  // Verbes réguliers -RE
  {
    verb: 'menjar',
    meaning: 'manger',
    meaningEn: 'to eat',
    conjugations: ['menjo', 'menges', 'menja', 'mengem', 'mengeu', 'mengen'],
    note: '-jar → jo/jugar : attention au g devant e/i',
  },
  {
    verb: 'beure',
    meaning: 'boire',
    meaningEn: 'to drink',
    conjugations: ['bec', 'beus', 'beu', 'bevem', 'beveu', 'beuen'],
    irregular: true,
  },
  {
    verb: 'viure',
    meaning: 'vivre / habiter',
    meaningEn: 'to live',
    conjugations: ['visc', 'vius', 'viu', 'vivim', 'viviu', 'viuen'],
    irregular: true,
  },
  {
    verb: 'llegir',
    meaning: 'lire',
    meaningEn: 'to read',
    conjugations: ['llegeixo', 'llegeixes', 'llegeix', 'llegim', 'llegiu', 'llegeixen'],
    note: 'Verbe incoatif (-eixo/-eixes/-eix au singulier et 3e pluriel)',
  },
  {
    verb: 'escriure',
    meaning: 'écrire',
    meaningEn: 'to write',
    conjugations: ['escric', 'escrius', 'escriu', 'escrivim', 'escriviu', 'escriuen'],
    irregular: true,
  },
];

// ─── PASSAT PERIFRÀSTIC (A2) ──────────────────────────────────────────────────
// Formation : anar (présent) + infinitif
// vaig / vas / va / vam / vau / van + infinitif
// Équivalent du passé composé en français pour les actions ponctuelles passées

export const perifrasticPast: CatalanVerb[] = [
  {
    verb: 'parlar',
    meaning: 'parler (passé)',
    meaningEn: 'to speak (past)',
    conjugations: [
      'vaig parlar',
      'vas parlar',
      'va parlar',
      'vam parlar',
      'vau parlar',
      'van parlar',
    ],
    note: 'Le passé périphrastique est le temps du passé le plus courant en catalan parlé',
  },
  {
    verb: 'menjar',
    meaning: 'manger (passé)',
    meaningEn: 'to eat (past)',
    conjugations: [
      'vaig menjar',
      'vas menjar',
      'va menjar',
      'vam menjar',
      'vau menjar',
      'van menjar',
    ],
  },
  {
    verb: 'anar',
    meaning: 'aller (passé)',
    meaningEn: 'to go (past)',
    conjugations: [
      'vaig anar',
      'vas anar',
      'va anar',
      'vam anar',
      'vau anar',
      'van anar',
    ],
  },
  {
    verb: 'fer',
    meaning: 'faire (passé)',
    meaningEn: 'to do (past)',
    conjugations: [
      'vaig fer',
      'vas fer',
      'va fer',
      'vam fer',
      'vau fer',
      'van fer',
    ],
  },
  {
    verb: 'veure',
    meaning: 'voir (passé)',
    meaningEn: 'to see (past)',
    conjugations: [
      'vaig veure',
      'vas veure',
      'va veure',
      'vam veure',
      'vau veure',
      'van veure',
    ],
  },
  {
    verb: 'comprar',
    meaning: 'acheter (passé)',
    meaningEn: 'to buy (past)',
    conjugations: [
      'vaig comprar',
      'vas comprar',
      'va comprar',
      'vam comprar',
      'vau comprar',
      'van comprar',
    ],
  },
  {
    verb: 'arribar',
    meaning: 'arriver (passé)',
    meaningEn: 'to arrive (past)',
    conjugations: [
      'vaig arribar',
      'vas arribar',
      'va arribar',
      'vam arribar',
      'vau arribar',
      'van arribar',
    ],
  },
  {
    verb: 'treballar',
    meaning: 'travailler (passé)',
    meaningEn: 'to work (past)',
    conjugations: [
      'vaig treballar',
      'vas treballar',
      'va treballar',
      'vam treballar',
      'vau treballar',
      'van treballar',
    ],
  },
];

// ─── IMPERFET (A2) ────────────────────────────────────────────────────────────
// Terminaisons :
//   -AR : ava, aves, ava, àvem, àveu, aven
//   -RE/-ER/-IR : ia, ies, ia, íem, íeu, ien
// Utilisé pour : habitudes passées, descriptions, actions en cours dans le passé

export const imperfect: CatalanVerb[] = [
  {
    verb: 'parlar',
    meaning: 'parler (imparfait)',
    meaningEn: 'to speak (imperfect)',
    conjugations: ['parlava', 'parlaves', 'parlava', 'parlàvem', 'parlàveu', 'parlaven'],
    note: 'Imparfait -AR : base + ava/aves/ava/àvem/àveu/aven',
  },
  {
    verb: 'ser',
    meaning: 'être (imparfait)',
    meaningEn: 'to be (imperfect)',
    conjugations: ['era', 'eres', 'era', 'érem', 'éreu', 'eren'],
    irregular: true,
  },
  {
    verb: 'tenir',
    meaning: 'avoir (imparfait)',
    meaningEn: 'to have (imperfect)',
    conjugations: ['tenia', 'tenies', 'tenia', 'teníem', 'teníeu', 'tenien'],
    note: 'Imparfait -RE/-ER/-IR : base + ia/ies/ia/íem/íeu/ien',
  },
  {
    verb: 'anar',
    meaning: 'aller (imparfait)',
    meaningEn: 'to go (imperfect)',
    conjugations: ['anava', 'anaves', 'anava', 'anàvem', 'anàveu', 'anaven'],
  },
  {
    verb: 'fer',
    meaning: 'faire (imparfait)',
    meaningEn: 'to do (imperfect)',
    conjugations: ['feia', 'feies', 'feia', 'fèiem', 'fèieu', 'feien'],
    irregular: true,
  },
  {
    verb: 'viure',
    meaning: 'vivre (imparfait)',
    meaningEn: 'to live (imperfect)',
    conjugations: ['vivia', 'vivies', 'vivia', 'vivíem', 'vivíeu', 'vivien'],
  },
];

// ─── FUTUR (A2) ───────────────────────────────────────────────────────────────
// Formation : infinitif + terminaisons é/às/à/em/eu/an
// Mêmes terminaisons pour tous les verbes

export const future: CatalanVerb[] = [
  {
    verb: 'parlar',
    meaning: 'parler (futur)',
    meaningEn: 'to speak (future)',
    conjugations: ['parlaré', 'parlaràs', 'parlarà', 'parlarem', 'parlareu', 'parlaran'],
    note: 'Futur : infinitif + é/às/à/em/eu/an',
  },
  {
    verb: 'ser',
    meaning: 'être (futur)',
    meaningEn: 'to be (future)',
    conjugations: ['seré', 'seràs', 'serà', 'serem', 'sereu', 'seran'],
  },
  {
    verb: 'tenir',
    meaning: 'avoir (futur)',
    meaningEn: 'to have (future)',
    conjugations: ['tindré', 'tindràs', 'tindrà', 'tindrem', 'tindreu', 'tindran'],
    irregular: true,
    note: 'Futur irrégulier : tindr- (base modifiée)',
  },
  {
    verb: 'anar',
    meaning: 'aller (futur)',
    meaningEn: 'to go (future)',
    conjugations: ['aniré', 'aniràs', 'anirà', 'anirem', 'anireu', 'aniran'],
  },
  {
    verb: 'fer',
    meaning: 'faire (futur)',
    meaningEn: 'to do (future)',
    conjugations: ['faré', 'faràs', 'farà', 'farem', 'fareu', 'faran'],
    irregular: true,
    note: 'Futur irrégulier : far- (base modifiée)',
  },
  {
    verb: 'poder',
    meaning: 'pouvoir (futur)',
    meaningEn: 'can (future)',
    conjugations: ['podré', 'podràs', 'podrà', 'podrem', 'podreu', 'podran'],
    irregular: true,
  },
  {
    verb: 'venir',
    meaning: 'venir (futur)',
    meaningEn: 'to come (future)',
    conjugations: ['vindré', 'vindràs', 'vindrà', 'vindrem', 'vindreu', 'vindran'],
    irregular: true,
  },
];

// ─── IMPERATIU (A2) ──────────────────────────────────────────────────────────
// Pronoms utilisés : tu / vostè / nosaltres / vosaltres / vostès

export const imperativePronouns = ['tu', 'vostè', 'nosaltres', 'vosaltres', 'vostès'];

export const imperative: CatalanVerb[] = [
  {
    verb: 'parlar',
    meaning: 'parler (impératif)',
    meaningEn: 'to speak (imperative)',
    conjugations: ['parla', 'parli', 'parlem', 'parleu', 'parlin'],
    note: 'Impératif -AR : base + a/i/em/eu/in',
  },
  {
    verb: 'menjar',
    meaning: 'manger (impératif)',
    meaningEn: 'to eat (imperative)',
    conjugations: ['menja', 'mengi', 'mengem', 'mengeu', 'mengin'],
  },
  {
    verb: 'ser',
    meaning: 'être (impératif)',
    meaningEn: 'to be (imperative)',
    conjugations: ['sigues', 'sigui', 'siguem', 'sigueu', 'siguin'],
    irregular: true,
  },
  {
    verb: 'anar',
    meaning: 'aller (impératif)',
    meaningEn: 'to go (imperative)',
    conjugations: ['ves', 'vagi', 'anem', 'aneu', 'vagin'],
    irregular: true,
  },
  {
    verb: 'fer',
    meaning: 'faire (impératif)',
    meaningEn: 'to do (imperative)',
    conjugations: ['fes', 'faci', 'fem', 'feu', 'facin'],
    irregular: true,
  },
  {
    verb: 'venir',
    meaning: 'venir (impératif)',
    meaningEn: 'to come (imperative)',
    conjugations: ['vine', 'vingui', 'vinguem', 'veniu', 'vinguin'],
    irregular: true,
  },
];

// ─── INDEX PAR TEMPS ─────────────────────────────────────────────────────────

export const catalanConjugations: Record<CatalanTense, CatalanVerb[]> = {
  present: presentTense,
  perifrasticPast: perifrasticPast,
  imperfect: imperfect,
  future: future,
  imperative: imperative,
};

// Labels des temps pour l'UI
export const catalanTenseLabels: Record<CatalanTense, { fr: string; en: string; note?: string }> = {
  present: {
    fr: '🔵 Present',
    en: '🔵 Present',
    note: 'Actions actuelles et habituelles',
  },
  perifrasticPast: {
    fr: '🟢 Passat perifràstic',
    en: '🟢 Periphrastic past',
    note: 'vaig/vas/va + infinitif — équivalent du passé composé',
  },
  imperfect: {
    fr: '🟠 Imperfet',
    en: '🟠 Imperfect',
    note: 'Habitudes et descriptions dans le passé',
  },
  future: {
    fr: '🟣 Futur',
    en: '🟣 Future',
    note: 'Actions futures',
  },
  imperative: {
    fr: '🟡 Imperatiu',
    en: '🟡 Imperative',
    note: 'Ordres et instructions',
  },
};
