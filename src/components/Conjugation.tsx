// src/components/Conjugation.tsx
"use client";

import { useState, useEffect } from 'react';

type ConjugationExercise = {
  id: number;
  verb: string;
  pronoun: number; // 0-5 (yo, tú, él, nosotros, vosotros, ellos)
  tense: string;
  contextPhrase: { fr: string; en: string }; // NOUVEAU!
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

type Props = {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'ALL';
  country: string; // On garde le prop mais on ne l'utilise pas
};

// Phrases contextuelles qui donnent des indices sur le temps
const CONTEXT_PHRASES = {
  presente: {
    fr: [
      "Tous les jours, je ___",
      "En ce moment, tu ___",
      "Généralement, il ___",
      "Nous ___ toujours",
      "Vous ___ souvent"
    ],
    en: [
      "Every day, I ___",
      "Right now, you ___",
      "Generally, he ___",
      "We ___ always",
      "You ___ often"
    ]
  },
  preterito: {
    fr: [
      "Hier, je ___",
      "La semaine dernière, tu ___",
      "Il y a deux jours, il ___",
      "L'année dernière, nous ___",
      "Le mois dernier, vous ___"
    ],
    en: [
      "Yesterday, I ___",
      "Last week, you ___",
      "Two days ago, he ___",
      "Last year, we ___",
      "Last month, you ___"
    ]
  },
  imperfecto: {
    fr: [
      "Quand j'étais petit, je ___",
      "Avant, tu ___ toujours",
      "Autrefois, il ___",
      "Nous ___ chaque été",
      "Vous ___ tous les samedis"
    ],
    en: [
      "When I was young, I ___",
      "Before, you ___ always",
      "In the past, he ___",
      "We ___ every summer",
      "You ___ every Saturday"
    ]
  },
  futuro: {
    fr: [
      "Demain, je ___",
      "La semaine prochaine, tu ___",
      "L'année prochaine, il ___",
      "Dans un mois, nous ___",
      "Bientôt, vous ___"
    ],
    en: [
      "Tomorrow, I ___",
      "Next week, you ___",
      "Next year, he ___",
      "In a month, we ___",
      "Soon, you ___"
    ]
  }
};

export default function Conjugation({ level }: Props) {
  const [mode, setMode] = useState<'theory' | 'practice'>('practice');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [selectedTense, setSelectedTense] = useState('presente');
  const [currentExercise, setCurrentExercise] = useState<ConjugationExercise | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('spanish-sprint-language');
    if (saved === 'fr' || saved === 'en') setLanguage(saved);
  }, []);

  const tenses = {
    fr: {
      presente: '🔵 Présent',
      preterito: '🟢 Passé simple',
      imperfecto: '🟡 Imparfait',
      futuro: '🟠 Futur simple'
    },
    en: {
      presente: '🔵 Present',
      preterito: '🟢 Preterite', 
      imperfecto: '🟡 Imperfect',
      futuro: '🟠 Simple Future'
    }
  };

  const pronouns = ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos/ellas'];

  // Exemples de verbes par temps (à enrichir)
  const verbsByTense: Record<string, Array<{verb: string, conjugations: string[]}>> = {
    presente: [
      { verb: 'hablar', conjugations: ['hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan'] },
      { verb: 'comer', conjugations: ['como', 'comes', 'come', 'comemos', 'coméis', 'comen'] },
      { verb: 'vivir', conjugations: ['vivo', 'vives', 'vive', 'vivimos', 'vivís', 'viven'] },
      { verb: 'ser', conjugations: ['soy', 'eres', 'es', 'somos', 'sois', 'son'] },
      { verb: 'estar', conjugations: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'] },
      { verb: 'tener', conjugations: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'] }
    ],
    preterito: [
      { verb: 'hablar', conjugations: ['hablé', 'hablaste', 'habló', 'hablamos', 'hablasteis', 'hablaron'] },
      { verb: 'comer', conjugations: ['comí', 'comiste', 'comió', 'comimos', 'comisteis', 'comieron'] },
      { verb: 'vivir', conjugations: ['viví', 'viviste', 'vivió', 'vivimos', 'vivisteis', 'vivieron'] },
      { verb: 'ser', conjugations: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'] },
      { verb: 'ir', conjugations: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'] },
      { verb: 'hacer', conjugations: ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'] }
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
      { verb: 'hacer', conjugations: ['haré', 'harás', 'hará', 'haremos', 'haréis', 'harán'] }
    ]
  };

  const generateExercise = () => {
    const verbs = verbsByTense[selectedTense] || verbsByTense.presente;
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const pronounIndex = Math.floor(Math.random() * 6);
    
    // Créer une phrase contextuelle
    const contextPhrases = CONTEXT_PHRASES[selectedTense as keyof typeof CONTEXT_PHRASES] || CONTEXT_PHRASES.presente;
    const contextFr = contextPhrases.fr[Math.floor(Math.random() * contextPhrases.fr.length)];
    const contextEn = contextPhrases.en[Math.floor(Math.random() * contextPhrases.en.length)];

    setCurrentExercise({
      id: Date.now(),
      verb: verb.verb,
      pronoun: pronounIndex,
      tense: selectedTense,
      contextPhrase: { fr: contextFr, en: contextEn },
      answer: verb.conjugations[pronounIndex],
      difficulty: 'medium'
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
      contextHint: '💡 Indice de contexte :',
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
      contextHint: '💡 Context hint:',
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
      {/* Mode toggle */}
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

      {/* Sélecteur de temps */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <label className="block text-sm text-slate-400 mb-2">{t.selectTense}</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(tenses[language]).map(([key, value]) => (
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
          {/* Score */}
          <div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
            <span className="text-slate-400">{t.score}: </span>
            <span className="text-green-400 font-bold text-2xl">{score.correct}</span>
            <span className="text-slate-500"> / </span>
            <span className="font-bold text-2xl">{score.total}</span>
          </div>

          {/* Exercice */}
          {currentExercise && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-4">
              {/* Phrase contextuelle - NOUVEAU! */}
              <div className="bg-purple-900 bg-opacity-30 border border-purple-600 rounded-lg p-4">
                <div className="text-sm text-purple-300 mb-1">{t.contextHint}</div>
                <div className="text-lg font-semibold text-white italic">
                  "{currentExercise.contextPhrase[language]}"
                </div>
              </div>

              {/* Question */}
              <div className="text-center">
                <div className="text-slate-400 mb-2">{t.conjugate}</div>
                <div className="text-4xl font-bold text-blue-400 mb-1">
                  {currentExercise.verb}
                </div>
                <div className="text-2xl text-slate-300">
                  ({pronouns[currentExercise.pronoun]})
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
        /* Mode théorie - Tables de conjugaison */
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-2xl font-bold mb-4 text-blue-300">
            {tenses[language][selectedTense as keyof typeof tenses['fr']]}
          </h3>
          
          {verbsByTense[selectedTense]?.map((verb, idx) => (
            <div key={idx} className="mb-6 bg-slate-900 rounded-lg p-4">
              <h4 className="text-xl font-bold text-white mb-3 capitalize">{verb.verb}</h4>
              <div className="grid grid-cols-2 gap-2">
                {pronouns.map((pronoun, i) => (
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