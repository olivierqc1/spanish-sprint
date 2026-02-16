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
  const generateExercise = () => {
    const verbs = verbsByTense[selectedTense] || verbsByTense.presente;
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    
    const isImperative = selectedTense === 'imperativo';
    const pronounIndex = isImperative 
      ? Math.floor(Math.random() * 5)
      : Math.floor(Math.random() * 6);
    
    const contextPhrases = CONTEXT_PHRASES[selectedTense as keyof typeof CONTEXT_PHRASES] || CONTEXT_PHRASES.presente;
    const contextPhrase = contextPhrases[pronounIndex];

    setCurrentExercise({
      id: Date.now(),
      verb: verb.verb,
      pronoun: pronounIndex,
      tense: selectedTense,
      contextPhrase,
      answer: verb.conjugations[pronounIndex],
    });
    setUserAnswer('');
    setShowResult(false);
  };

  useEffect(() => {
    if (mode === 'practice') {
      generateExercise();
    }
  }, [mode, selectedTense]);

  const checkAnswer = () => {
    if (!currentExercise) return;
    
    const isCorrect = userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase();
    setShowResult(true);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const texts = {
    fr: {
      theory: '📚 Théorie',
      practice: '✍️ Pratique',
      score: 'Score',
      contextHint: '💡 Phrase contextuelle :',
      conjugate: 'Conjugue le verbe',
      check: 'Vérifier',
      next: 'Suivant',
      correct: '✅ Correct !',
      incorrect: '❌ Incorrect',
      correctAnswer: 'La bonne réponse était',
      selectTense: 'Choisis un temps'
    },
    en: {
      theory: '📚 Theory',
      practice: '✍️ Practice',
      score: 'Score',
      contextHint: '💡 Context phrase:',
      conjugate: 'Conjugate the verb',
      check: 'Check',
      next: 'Next',
      correct: '✅ Correct!',
      incorrect: '❌ Incorrect',
      correctAnswer: 'The correct answer was',
      selectTense: 'Choose a tense'
    }
  };

  const t = texts[language];

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setMode('theory')}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            mode === 'theory'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          {t.theory}
        </button>
        <button
          onClick={() => setMode('practice')}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            mode === 'practice'
              ? 'bg-green-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}
        >
          {t.practice}
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <label className="block text-sm text-slate-400 mb-2">
          {t.selectTense} {level !== 'ALL' && `(${level})`}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(tenses[language])
            .filter(([key]) => availableTenses.includes(key))
            .map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedTense(key)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTense === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {value}
              </button>
            ))}
        </div>
      </div>

      {mode === 'practice' ? (
        <>
          <div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
            <span className="text-slate-400">{t.score}: </span>
            <span className="text-green-400 font-bold text-2xl">{score.correct}</span>
            <span className="text-slate-500"> / </span>
            <span className="font-bold text-2xl">{score.total}</span>
          </div>

          {currentExercise && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-4">
              <div className="bg-purple-900 bg-opacity-30 border border-purple-600 rounded-lg p-4">
                <div className="text-sm text-purple-300 mb-1">{t.contextHint}</div>
                <div className="text-lg font-semibold text-white italic">
                  "{currentExercise.contextPhrase}"
                </div>
              </div>

              <div className="text-center">
                <div className="text-slate-400 mb-2">{t.conjugate}</div>
                <div className="text-4xl font-bold text-blue-400 mb-1">
                  {currentExercise.verb}
                </div>
                <div className="text-2xl text-slate-300">
                  ({selectedTense === 'imperativo' 
                    ? imperativePronouns[currentExercise.pronoun]
                    : pronouns[currentExercise.pronoun]
                  })
                </div>
              </div>

              {!showResult ? (
                <>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                    placeholder="..."
                    className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-lg text-white text-center text-2xl focus:border-blue-500 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim()}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition text-xl"
                  >
                    {t.check}
                  </button>
                </>
              ) : (
                <>
                  <div className={`p-6 rounded-lg text-center ${
                    userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase()
                      ? 'bg-green-900 bg-opacity-30 border-2 border-green-600'
                      : 'bg-red-900 bg-opacity-30 border-2 border-red-600'
                  }`}>
                    <div className="text-3xl mb-4">
                      {userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase() 
                        ? t.correct
                        : t.incorrect
                      }
                    </div>
                    {userAnswer.trim().toLowerCase() !== currentExercise.answer.toLowerCase() && (
                      <div>
                        <div className="text-slate-400 mb-2">{t.correctAnswer}:</div>
                        <div className="text-3xl font-bold text-green-400">
                          {currentExercise.answer}
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={generateExercise}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition text-xl"
                  >
                    {t.next} →
                  </button>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-2xl font-bold mb-4 text-blue-300">
            {tenses[language][selectedTense as keyof typeof tenses['fr']]}
          </h3>
          
          {verbsByTense[selectedTense]?.map((verb, idx) => (
            <div key={idx} className="mb-6 bg-slate-900 rounded-lg p-4">
              <h4 className="text-xl font-bold text-white mb-3 capitalize">{verb.verb}</h4>
              <div className="grid grid-cols-2 gap-2">
                {(selectedTense === 'imperativo' ? imperativePronouns : pronouns).map((pronoun, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-slate-800 rounded">
                    <span className="text-slate-400">{pronoun}</span>
                    <span className="font-mono text-green-400">{verb.conjugations[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
