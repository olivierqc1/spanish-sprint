// src/components/Conjugation.tsx
"use client";

import { useState, useEffect } from 'react';

type ConjugationExercise = {
  id: number;
  verb: string;
  pronoun: number;
  tense: string;
  contextPhrase: string;
  answer: string;
};

type Props = {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'ALL';
  country: string;
};

// 🎯 Temps disponibles par niveau
const TENSES_BY_LEVEL: Record<string, string[]> = {
  A1: ['presente', 'preterito_perfecto', 'imperativo'],
  A2: ['presente', 'preterito_perfecto', 'imperativo', 'imperfecto', 'futuro'],
  B1: ['presente', 'preterito_perfecto', 'imperativo', 'imperfecto', 'futuro', 'preterito', 'condicional'],
  B2: ['presente', 'preterito_perfecto', 'imperativo', 'imperfecto', 'futuro', 'preterito', 'condicional', 'pluscuamperfecto', 'subjuntivo_presente'],
  C1: ['presente', 'preterito_perfecto', 'imperativo', 'imperfecto', 'futuro', 'preterito', 'condicional', 'pluscuamperfecto', 'subjuntivo_presente'],
  C2: ['presente', 'preterito_perfecto', 'imperativo', 'imperfecto', 'futuro', 'preterito', 'condicional', 'pluscuamperfecto', 'subjuntivo_presente'],
  ALL: ['presente', 'preterito_perfecto', 'imperativo', 'imperfecto', 'futuro', 'preterito', 'condicional', 'pluscuamperfecto', 'subjuntivo_presente']
};

// Phrases contextuelles EN ESPAGNOL
const CONTEXT_PHRASES = {
  presente: [
    "Todos los días, yo ___",
    "Ahora mismo, tú ___",
    "Generalmente, él ___",
    "Nosotros ___ siempre",
    "Vosotros ___ a menudo",
    "Ellos ___ cada día"
  ],
  preterito_perfecto: [
    "Hoy, yo ___",
    "Esta semana, tú ___",
    "Este mes, él ___",
    "Este año, nosotros ___",
    "Últimamente, vosotros ___",
    "Recientemente, ellos ___"
  ],
  imperativo: [
    "¡___ ahora! (tú)",
    "¡___ conmigo! (tú)",
    "¡___ aquí! (usted)",
    "¡___ juntos! (nosotros)",
    "¡___ todos! (vosotros)",
    "¡___ ya! (ustedes)"
  ],
  preterito: [
    "Ayer, yo ___",
    "La semana pasada, tú ___",
    "Hace dos días, él ___",
    "El año pasado, nosotros ___",
    "El mes pasado, vosotros ___",
    "Anteayer, ellos ___"
  ],
  imperfecto: [
    "Cuando era niño, yo ___",
    "Antes, tú ___ siempre",
    "En aquella época, él ___",
    "Cada verano, nosotros ___",
    "Todos los sábados, vosotros ___",
    "De joven, ellos ___"
  ],
  futuro: [
    "Mañana, yo ___",
    "La semana que viene, tú ___",
    "El año próximo, él ___",
    "Dentro de un mes, nosotros ___",
    "Pronto, vosotros ___",
    "En el futuro, ellos ___"
  ],
  condicional: [
    "En tu lugar, yo ___",
    "Si pudieras, tú ___",
    "Él dijo que ___",
    "Nosotros ___ si tuviéramos tiempo",
    "Vosotros ___ en esa situación",
    "Ellos ___ con más dinero"
  ],
  pluscuamperfecto: [
    "Antes de ayer, yo ya ___",
    "Cuando llegaste, tú ya ___",
    "Cuando llegué, él ya ___",
    "Antes de salir, nosotros ya ___",
    "Cuando llamé, vosotros ya ___",
    "Antes de la fiesta, ellos ya ___"
  ],
  subjuntivo_presente: [
    "Espero que yo ___",
    "Quiero que tú ___",
    "Es importante que él ___",
    "Ojalá que nosotros ___",
    "Dudo que vosotros ___",
    "No creo que ellos ___"
  ]
};
export default function Conjugation({ level }: Props) {
  const [mode, setMode] = useState<'theory' | 'practice'>('practice');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [selectedTense, setSelectedTense] = useState('presente');
  const [currentExercise, setCurrentExercise] = useState<ConjugationExercise | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // 🎯 Filtrer les temps disponibles selon le niveau
  const availableTenses = TENSES_BY_LEVEL[level] || TENSES_BY_LEVEL.A1;

  useEffect(() => {
    const saved = localStorage.getItem('spanish-sprint-language');
    if (saved === 'fr' || saved === 'en') setLanguage(saved);
  }, []);

  // Si le temps sélectionné n'est plus disponible, revenir au présent
  useEffect(() => {
    if (!availableTenses.includes(selectedTense)) {
      setSelectedTense('presente');
    }
  }, [level, availableTenses, selectedTense]);

  const tenses = {
    fr: {
      presente: '🔵 Présent',
      preterito_perfecto: '🟢 Passé composé',
      imperativo: '🟡 Impératif',
      preterito: '🟢 Passé simple',
      imperfecto: '🟠 Imparfait',
      futuro: '🟣 Futur simple',
      condicional: '🟣 Conditionnel',
      pluscuamperfecto: '🔴 Plus-que-parfait',
      subjuntivo_presente: '🔴 Subjonctif présent'
    },
    en: {
      presente: '🔵 Present',
      preterito_perfecto: '🟢 Present Perfect',
      imperativo: '🟡 Imperative',
      preterito: '🟢 Preterite', 
      imperfecto: '🟠 Imperfect',
      futuro: '🟣 Simple Future',
      condicional: '🟣 Conditional',
      pluscuamperfecto: '🔴 Past Perfect',
      subjuntivo_presente: '🔴 Present Subjunctive'
    }
  };

  const pronouns = ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos/ellas'];
  const imperativePronouns = ['tú', 'usted', 'nosotros', 'vosotros', 'ustedes'];

  const verbsByTense: Record<string, Array<{verb: string, conjugations: string[]}>> = {
    presente: [
      { verb: 'hablar', conjugations: ['hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan'] },
      { verb: 'comer', conjugations: ['como', 'comes', 'come', 'comemos', 'coméis', 'comen'] },
      { verb: 'vivir', conjugations: ['vivo', 'vives', 'vive', 'vivimos', 'vivís', 'viven'] },
      { verb: 'ser', conjugations: ['soy', 'eres', 'es', 'somos', 'sois', 'son'] },
      { verb: 'estar', conjugations: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'] },
      { verb: 'tener', conjugations: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'] },
      { verb: 'hacer', conjugations: ['hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen'] },
      { verb: 'ir', conjugations: ['voy', 'vas', 'va', 'vamos', 'vais', 'van'] },
      { verb: 'venir', conjugations: ['vengo', 'vienes', 'viene', 'venimos', 'venís', 'vienen'] },
      { verb: 'decir', conjugations: ['digo', 'dices', 'dice', 'decimos', 'decís', 'dicen'] }
    ],
    preterito_perfecto: [
      { verb: 'hablar', conjugations: ['he hablado', 'has hablado', 'ha hablado', 'hemos hablado', 'habéis hablado', 'han hablado'] },
      { verb: 'comer', conjugations: ['he comido', 'has comido', 'ha comido', 'hemos comido', 'habéis comido', 'han comido'] },
      { verb: 'vivir', conjugations: ['he vivido', 'has vivido', 'ha vivido', 'hemos vivido', 'habéis vivido', 'han vivido'] },
      { verb: 'ser', conjugations: ['he sido', 'has sido', 'ha sido', 'hemos sido', 'habéis sido', 'han sido'] },
      { verb: 'estar', conjugations: ['he estado', 'has estado', 'ha estado', 'hemos estado', 'habéis estado', 'han estado'] },
      { verb: 'hacer', conjugations: ['he hecho', 'has hecho', 'ha hecho', 'hemos hecho', 'habéis hecho', 'han hecho'] },
      { verb: 'ver', conjugations: ['he visto', 'has visto', 'ha visto', 'hemos visto', 'habéis visto', 'han visto'] },
      { verb: 'decir', conjugations: ['he dicho', 'has dicho', 'ha dicho', 'hemos dicho', 'habéis dicho', 'han dicho'] },
      { verb: 'poner', conjugations: ['he puesto', 'has puesto', 'ha puesto', 'hemos puesto', 'habéis puesto', 'han puesto'] },
      { verb: 'escribir', conjugations: ['he escrito', 'has escrito', 'ha escrito', 'hemos escrito', 'habéis escrito', 'han escrito'] }
    ],
    imperativo: [
      { verb: 'hablar', conjugations: ['habla', 'hable', 'hablemos', 'hablad', 'hablen'] },
      { verb: 'comer', conjugations: ['come', 'coma', 'comamos', 'comed', 'coman'] },
      { verb: 'vivir', conjugations: ['vive', 'viva', 'vivamos', 'vivid', 'vivan'] },
      { verb: 'ser', conjugations: ['sé', 'sea', 'seamos', 'sed', 'sean'] },
      { verb: 'estar', conjugations: ['está', 'esté', 'estemos', 'estad', 'estén'] },
      { verb: 'ir', conjugations: ['ve', 'vaya', 'vamos', 'id', 'vayan'] },
      { verb: 'tener', conjugations: ['ten', 'tenga', 'tengamos', 'tened', 'tengan'] },
      { verb: 'hacer', conjugations: ['haz', 'haga', 'hagamos', 'haced', 'hagan'] },
      { verb: 'poner', conjugations: ['pon', 'ponga', 'pongamos', 'poned', 'pongan'] },
      { verb: 'venir', conjugations: ['ven', 'venga', 'vengamos', 'venid', 'vengan'] }
    ],
    preterito: [
      { verb: 'hablar', conjugations: ['hablé', 'hablaste', 'habló', 'hablamos', 'hablasteis', 'hablaron'] },
      { verb: 'comer', conjugations: ['comí', 'comiste', 'comió', 'comimos', 'comisteis', 'comieron'] },
      { verb: 'vivir', conjugations: ['viví', 'viviste', 'vivió', 'vivimos', 'vivisteis', 'vivieron'] },
      { verb: 'ser', conjugations: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'] },
      { verb: 'ir', conjugations: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'] },
      { verb: 'hacer', conjugations: ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'] },
      { verb: 'tener', conjugations: ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron'] },
      { verb: 'estar', conjugations: ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron'] },
      { verb: 'poder', conjugations: ['pude', 'pudiste', 'pudo', 'pudimos', 'pudisteis', 'pudieron'] },
      { verb: 'poner', conjugations: ['puse', 'pusiste', 'puso', 'pusimos', 'pusisteis', 'pusieron'] }
    ],
    imperfecto: [
      { verb: 'hablar', conjugations: ['hablaba', 'hablabas', 'hablaba', 'hablábamos', 'hablabais', 'hablaban'] },
      { verb: 'comer', conjugations: ['comía', 'comías', 'comía', 'comíamos', 'comíais', 'comían'] },
      { verb: 'vivir', conjugations: ['vivía', 'vivías', 'vivía', 'vivíamos', 'vivíais', 'vivían'] },
      { verb: 'ser', conjugations: ['era', 'eras', 'era', 'éramos', 'erais', 'eran'] },
      { verb: 'ir', conjugations: ['iba', 'ibas', 'iba', 'íbamos', 'ibais', 'iban'] },
      { verb: 'ver', conjugations: ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'] }
    ],
    futuro: [
      { verb: 'hablar', conjugations: ['hablaré', 'hablarás', 'hablará', 'hablaremos', 'hablaréis', 'hablarán'] },
      { verb: 'comer', conjugations: ['comeré', 'comerás', 'comerá', 'comeremos', 'comeréis', 'comerán'] },
      { verb: 'vivir', conjugations: ['viviré', 'vivirás', 'vivirá', 'viviremos', 'viviréis', 'vivirán'] },
      { verb: 'tener', conjugations: ['tendré', 'tendrás', 'tendrá', 'tendremos', 'tendréis', 'tendrán'] },
      { verb: 'poder', conjugations: ['podré', 'podrás', 'podrá', 'podremos', 'podréis', 'podrán'] },
      { verb: 'hacer', conjugations: ['haré', 'harás', 'hará', 'haremos', 'haréis', 'harán'] },
      { verb: 'salir', conjugations: ['saldré', 'saldrás', 'saldrá', 'saldremos', 'saldréis', 'saldrán'] },
      { verb: 'venir', conjugations: ['vendré', 'vendrás', 'vendrá', 'vendremos', 'vendréis', 'vendrán'] }
    ],
    condicional: [
      { verb: 'hablar', conjugations: ['hablaría', 'hablarías', 'hablaría', 'hablaríamos', 'hablaríais', 'hablarían'] },
      { verb: 'comer', conjugations: ['comería', 'comerías', 'comería', 'comeríamos', 'comeríais', 'comerían'] },
      { verb: 'vivir', conjugations: ['viviría', 'vivirías', 'viviría', 'viviríamos', 'viviríais', 'vivirían'] },
      { verb: 'tener', conjugations: ['tendría', 'tendrías', 'tendría', 'tendríamos', 'tendríais', 'tendrían'] },
      { verb: 'poder', conjugations: ['podría', 'podrías', 'podría', 'podríamos', 'podríais', 'podrían'] },
      { verb: 'hacer', conjugations: ['haría', 'harías', 'haría', 'haríamos', 'haríais', 'harían'] }
    ],
    pluscuamperfecto: [
      { verb: 'hablar', conjugations: ['había hablado', 'habías hablado', 'había hablado', 'habíamos hablado', 'habíais hablado', 'habían hablado'] },
      { verb: 'comer', conjugations: ['había comido', 'habías comido', 'había comido', 'habíamos comido', 'habíais comido', 'habían comido'] },
      { verb: 'vivir', conjugations: ['había vivido', 'habías vivido', 'había vivido', 'habíamos vivido', 'habíais vivido', 'habían vivido'] },
      { verb: 'ser', conjugations: ['había sido', 'habías sido', 'había sido', 'habíamos sido', 'habíais sido', 'habían sido'] },
      { verb: 'hacer', conjugations: ['había hecho', 'habías hecho', 'había hecho', 'habíamos hecho', 'habíais hecho', 'habían hecho'] },
      { verb: 'ver', conjugations: ['había visto', 'habías visto', 'había visto', 'habíamos visto', 'habíais visto', 'habían visto'] },
      { verb: 'decir', conjugations: ['había dicho', 'habías dicho', 'había dicho', 'habíamos dicho', 'habíais dicho', 'habían dicho'] },
      { verb: 'escribir', conjugations: ['había escrito', 'habías escrito', 'había escrito', 'habíamos escrito', 'habíais escrito', 'habían escrito'] }
    ],
    subjuntivo_presente: [
      { verb: 'hablar', conjugations: ['hable', 'hables', 'hable', 'hablemos', 'habléis', 'hablen'] },
      { verb: 'comer', conjugations: ['coma', 'comas', 'coma', 'comamos', 'comáis', 'coman'] },
      { verb: 'vivir', conjugations: ['viva', 'vivas', 'viva', 'vivamos', 'viváis', 'vivan'] },
      { verb: 'ser', conjugations: ['sea', 'seas', 'sea', 'seamos', 'seáis', 'sean'] },
      { verb: 'estar', conjugations: ['esté', 'estés', 'esté', 'estemos', 'estéis', 'estén'] },
      { verb: 'tener', conjugations: ['tenga', 'tengas', 'tenga', 'tengamos', 'tengáis', 'tengan'] },
      { verb: 'hacer', conjugations: ['haga', 'hagas', 'haga', 'hagamos', 'hagáis', 'hagan'] },
      { verb: 'ir', conjugations: ['vaya', 'vayas', 'vaya', 'vayamos', 'vayáis', 'vayan'] }
    ]
  };
