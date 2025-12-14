"use client";

import { useState, useEffect } from "react";
import type { Level, Country } from "@/components/LevelPicker";

interface ConjugationProps {
  level: Level;
  country: Country;
}

type Mode = 'theory' | 'practice';
type Tense = 'presente' | 'preterito' | 'imperfecto' | 'futuro' | 'condicional' | 'subjuntivo_presente';

const tenseData: Record<Tense, {
  name: { fr: string; en: string };
  description: { fr: string; en: string };
  endings: {
    ar: string[];
    er: string[];
    ir: string[];
  };
  examples: {
    ar: { verb: string; meaning: { fr: string; en: string } };
    er: { verb: string; meaning: { fr: string; en: string } };
    ir: { verb: string; meaning: { fr: string; en: string } };
  };
}> = {
  presente: {
    name: { fr: 'Présent', en: 'Present' },
    description: { fr: 'Actions habituelles ou actuelles', en: 'Habitual or current actions' },
    endings: {
      ar: ['o', 'as', 'a', 'amos', 'áis', 'an'],
      er: ['o', 'es', 'e', 'emos', 'éis', 'en'],
      ir: ['o', 'es', 'e', 'imos', 'ís', 'en']
    },
    examples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  preterito: {
    name: { fr: 'Passé simple', en: 'Preterite' },
    description: { fr: 'Actions terminées dans le passé', en: 'Completed past actions' },
    endings: {
      ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
      er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
      ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron']
    },
    examples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  imperfecto: {
    name: { fr: 'Imparfait', en: 'Imperfect' },
    description: { fr: 'Actions répétées ou en cours dans le passé', en: 'Repeated or ongoing past actions' },
    endings: {
      ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
      er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
      ir: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían']
    },
    examples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  futuro: {
    name: { fr: 'Futur', en: 'Future' },
    description: { fr: 'Actions futures', en: 'Future actions' },
    endings: {
      ar: ['é', 'ás', 'á', 'emos', 'éis', 'án'],
      er: ['é', 'ás', 'á', 'emos', 'éis', 'án'],
      ir: ['é', 'ás', 'á', 'emos', 'éis', 'án']
    },
    examples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  condicional: {
    name: { fr: 'Conditionnel', en: 'Conditional' },
    description: { fr: 'Actions hypothétiques', en: 'Hypothetical actions' },
    endings: {
      ar: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
      er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
      ir: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían']
    },
    examples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  subjuntivo_presente: {
    name: { fr: 'Subjonctif présent', en: 'Present Subjunctive' },
    description: { fr: 'Doute, souhait, émotion', en: 'Doubt, wish, emotion' },
    endings: {
      ar: ['e', 'es', 'e', 'emos', 'éis', 'en'],
      er: ['a', 'as', 'a', 'amos', 'áis', 'an'],
      ir: ['a', 'as', 'a', 'amos', 'áis', 'an']
    },
    examples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  }
};

const pronouns = ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos/ellas'];

interface ExerciseProgress {
  tense: Tense;
  pronoun: number;
  verbType: 'ar' | 'er' | 'ir';
  failures: number;
  lastAttempt: Date | null;
}

export default function Conjugation({ level, country }: ConjugationProps) {
  const [mode, setMode] = useState<Mode>('theory');
  const [selectedTense, setSelectedTense] = useState<Tense>('presente');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  
  // Practice mode states
  const [currentExercise, setCurrentExercise] = useState<{
    verb: string;
    pronoun: number;
    verbType: 'ar' | 'er' | 'ir';
    tense: Tense;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [exerciseProgress, setExerciseProgress] = useState<ExerciseProgress[]>([]);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('spanish-sprint-language');
    if (savedLanguage === 'fr' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }

    // Charger la progression
    const saved = localStorage.getItem('conjugation-progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.forEach((p: ExerciseProgress) => {
        if (p.lastAttempt) p.lastAttempt = new Date(p.lastAttempt);
      });
      setExerciseProgress(parsed);
    }
  }, []);

  const texts = {
    fr: {
      title: '⚡ Conjugaison',
      theory: '📚 Théorie',
      practice: '✍️ Pratique',
      selectTense: 'Choisis un temps',
      examples: 'Exemples',
      endings: 'Terminaisons',
      startPractice: 'Commencer la pratique',
      yourAnswer: 'Ta réponse',
      check: 'Vérifier',
      next: 'Suivant',
      correct: '✅ Correct !',
      incorrect: '❌ Incorrect',
      correctAnswer: 'Bonne réponse',
      score: 'Score',
      difficultExercises: 'Exercices difficiles à réviser',
      pronoun: 'Pronom',
    },
    en: {
      title: '⚡ Conjugation',
      theory: '📚 Theory',
      practice: '✍️ Practice',
      selectTense: 'Choose a tense',
      examples: 'Examples',
      endings: 'Endings',
      startPractice: 'Start practice',
      yourAnswer: 'Your answer',
      check: 'Check',
      next: 'Next',
      correct: '✅ Correct!',
      incorrect: '❌ Incorrect',
      correctAnswer: 'Correct answer',
      score: 'Score',
      difficultExercises: 'Difficult exercises to review',
      pronoun: 'Pronoun',
    }
  };

  const t = texts[language];
  const currentTenseData = tenseData[selectedTense];

  const getConjugatedForm = (verbType: 'ar' | 'er' | 'ir', pronounIndex: number, tense: Tense) => {
    const example = tenseData[tense].examples[verbType];
    const root = example.verb.slice(0, -2);
    const ending = tenseData[tense].endings[verbType][pronounIndex];
    
    if (tense === 'futuro' || tense === 'condicional') {
      return example.verb + ending;
    }
    
    return root + ending;
  };

  const generateExercise = () => {
    // Priorité aux exercices difficiles (failures > 0)
    const difficultOnes = exerciseProgress
      .filter(p => p.failures > 0 && p.tense === selectedTense)
      .sort((a, b) => b.failures - a.failures);

    let exercise;

    if (difficultOnes.length > 0 && Math.random() < 0.7) {
      // 70% de chance de réviser un exercice difficile
      const difficult = difficultOnes[0];
      const example = tenseData[difficult.tense].examples[difficult.verbType];
      exercise = {
        verb: example.verb,
        pronoun: difficult.pronoun,
        verbType: difficult.verbType,
        tense: difficult.tense,
      };
    } else {
      // Nouvel exercice aléatoire
      const verbTypes: ('ar' | 'er' | 'ir')[] = ['ar', 'er', 'ir'];
      const verbType = verbTypes[Math.floor(Math.random() * verbTypes.length)];
      const example = currentTenseData.examples[verbType];
      
      exercise = {
        verb: example.verb,
        pronoun: Math.floor(Math.random() * 6),
        verbType,
        tense: selectedTense,
      };
    }

    setCurrentExercise(exercise);
    setUserAnswer('');
    setShowResult(false);
  };

  const checkAnswer = () => {
    if (!currentExercise) return;

    const correct = getConjugatedForm(
      currentExercise.verbType,
      currentExercise.pronoun,
      currentExercise.tense
    );

    const isAnswerCorrect = userAnswer.trim().toLowerCase() === correct.toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    // Mettre à jour le score
    setScore(prev => ({
      correct: prev.correct + (isAnswerCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    // Mettre à jour la progression
    const existingIndex = exerciseProgress.findIndex(
      p => p.tense === currentExercise.tense && 
           p.pronoun === currentExercise.pronoun && 
           p.verbType === currentExercise.verbType
    );

    let newProgress = [...exerciseProgress];

    if (existingIndex >= 0) {
      newProgress[existingIndex] = {
        ...newProgress[existingIndex],
        failures: isAnswerCorrect 
          ? Math.max(0, newProgress[existingIndex].failures - 1) 
          : newProgress[existingIndex].failures + 1,
        lastAttempt: new Date(),
      };
    } else {
      newProgress.push({
        tense: currentExercise.tense,
        pronoun: currentExercise.pronoun,
        verbType: currentExercise.verbType,
        failures: isAnswerCorrect ? 0 : 1,
        lastAttempt: new Date(),
      });
    }

    setExerciseProgress(newProgress);
    localStorage.setItem('conjugation-progress', JSON.stringify(newProgress));
  };

  const difficultCount = exerciseProgress.filter(p => p.failures > 0).length;

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">{t.title}</h2>

      {/* Mode Toggle */}
      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={() => setMode('theory')}
          className={`px-6 py-3 rounded-lg font-bold transition flex items-center gap-2 ${
            mode === 'theory'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {t.theory}
        </button>
        <button
          onClick={() => {
            setMode('practice');
            if (!currentExercise) generateExercise();
          }}
          className={`px-6 py-3 rounded-lg font-bold transition flex items-center gap-2 ${
            mode === 'practice'
              ? 'bg-green-600 text-white'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          {t.practice}
          {difficultCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {difficultCount}
            </span>
          )}
        </button>
      </div>

      {mode === 'theory' ? (
        <>
          {/* Sélecteur de temps */}
          <div className="bg-slate-800 rounded-xl p-4 mb-6">
            <label className="block text-sm text-slate-400 mb-3">{t.selectTense}</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(Object.keys(tenseData) as Tense[]).map((tense) => (
                <button
                  key={tense}
                  onClick={() => setSelectedTense(tense)}
                  className={`px-4 py-3 rounded-lg font-semibold transition ${
                    selectedTense === tense
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {tenseData[tense].name[language]}
                </button>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-slate-900 rounded-lg text-center text-slate-300">
              💡 {currentTenseData.description[language]}
            </div>
          </div>

          {/* Tableaux des 3 verbes */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">{t.examples}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Verbe -AR */}
              <div className="bg-slate-800 rounded-xl overflow-hidden border-2 border-blue-500">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-center">
                  <div className="text-2xl font-bold">{currentTenseData.examples.ar.verb}</div>
                  <div className="text-sm opacity-90">
                    {currentTenseData.examples.ar.meaning[language]}
                  </div>
                  <div className="text-xs opacity-75 mt-1">-AR</div>
                </div>
                <div className="p-4">
                  <table className="w-full">
                    <tbody>
                      {pronouns.map((pronoun, index) => (
                        <tr key={index} className="border-b border-slate-700 last:border-0">
                          <td className="py-2 text-slate-400 text-sm">{pronoun}</td>
                          <td className="py-2 text-right font-mono text-lg text-blue-300 font-bold">
                            {getConjugatedForm('ar', index, selectedTense)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Verbe -ER */}
              <div className="bg-slate-800 rounded-xl overflow-hidden border-2 border-green-500">
                <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 text-center">
                  <div className="text-2xl font-bold">{currentTenseData.examples.er.verb}</div>
                  <div className="text-sm opacity-90">
                    {currentTenseData.examples.er.meaning[language]}
                  </div>
                  <div className="text-xs opacity-75 mt-1">-ER</div>
                </div>
                <div className="p-4">
                  <table className="w-full">
                    <tbody>
                      {pronouns.map((pronoun, index) => (
                        <tr key={index} className="border-b border-slate-700 last:border-0">
                          <td className="py-2 text-slate-400 text-sm">{pronoun}</td>
                          <td className="py-2 text-right font-mono text-lg text-green-300 font-bold">
                            {getConjugatedForm('er', index, selectedTense)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Verbe -IR */}
              <div className="bg-slate-800 rounded-xl overflow-hidden border-2 border-purple-500">
                <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-4 text-center">
                  <div className="text-2xl font-bold">{currentTenseData.examples.ir.verb}</div>
                  <div className="text-sm opacity-90">
                    {currentTenseData.examples.ir.meaning[language]}
                  </div>
                  <div className="text-xs opacity-75 mt-1">-IR</div>
                </div>
                <div className="p-4">
                  <table className="w-full">
                    <tbody>
                      {pronouns.map((pronoun, index) => (
                        <tr key={index} className="border-b border-slate-700 last:border-0">
                          <td className="py-2 text-slate-400 text-sm">{pronoun}</td>
                          <td className="py-2 text-right font-mono text-lg text-purple-300 font-bold">
                            {getConjugatedForm('ir', index, selectedTense)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Tableau récapitulatif */}
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-center">
              {t.endings} - {currentTenseData.name[language]}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-700">
                    <th className="py-3 text-left text-slate-400">{t.pronoun}</th>
                    <th className="py-3 text-center text-blue-400">-AR</th>
                    <th className="py-3 text-center text-green-400">-ER</th>
                    <th className="py-3 text-center text-purple-400">-IR</th>
                  </tr>
                </thead>
                <tbody>
                  {pronouns.map((pronoun, index) => (
                    <tr key={index} className="border-b border-slate-700">
                      <td className="py-2 text-slate-300">{pronoun}</td>
                      <td className="py-2 text-center font-mono text-blue-300 font-bold">
                        -{currentTenseData.endings.ar[index]}
                      </td>
                      <td className="py-2 text-center font-mono text-green-300 font-bold">
                        -{currentTenseData.endings.er[index]}
                      </td>
                      <td className="py-2 text-center font-mono text-purple-300 font-bold">
                        -{currentTenseData.endings.ir[index]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Mode Practice */
        <div className="max-w-2xl mx-auto">
          {/* Score */}
          <div className="bg-slate-800 rounded-xl p-4 mb-6 flex justify-between items-center">
            <div>
              <span className="text-slate-400">{t.score}: </span>
              <span className="text-green-400 font-bold">{score.correct}</span>
              <span className="text-slate-500"> / </span>
              <span className="font-bold">{score.total}</span>
            </div>
            {difficultCount > 0 && (
              <div className="text-red-400 text-sm">
                🔥 {difficultCount} {t.difficultExercises}
              </div>
            )}
          </div>

          {currentExercise && (
            <div className="bg-slate-800 rounded-xl p-8">
              <div className="text-center mb-6">
                <div className="text-sm text-slate-400 mb-2">
                  {tenseData[currentExercise.tense].name[language]}
                </div>
                <div className="text-3xl font-bold mb-2">
                  {currentExercise.verb}
                </div>
                <div className="text-slate-400">
                  {tenseData[currentExercise.tense].examples[currentExercise.verbType].meaning[language]}
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-xl text-slate-300">
                  {pronouns[currentExercise.pronoun]} + ?
                </div>
              </div>

              {!showResult ? (
                <>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                    placeholder={t.yourAnswer}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg