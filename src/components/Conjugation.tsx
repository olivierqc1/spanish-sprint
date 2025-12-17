// src/components/Conjugation.tsx
"use client";

import { useState, useEffect } from "react";
import type { Level, Country } from "@/components/LevelPicker";
import { allTenses, pronouns, type Tense, type Exercise } from "@/data/conjugacion";

interface ConjugationProps {
  level: Level;
  country: Country;
}

type Mode = 'theory' | 'practice';

interface ExerciseProgress {
  tense: Tense;
  exerciseId: number;
  failures: number;
  lastAttempt: Date | null;
}

export default function Conjugation({ level, country }: ConjugationProps) {
  const [mode, setMode] = useState<Mode>('theory');
  const [selectedTense, setSelectedTense] = useState<Tense>('presente');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [showUsageDetails, setShowUsageDetails] = useState(false);
  
  // Practice mode states
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
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
      usage: 'Utilisation',
      usageExamples: 'Exemples d\'usage',
      showDetails: 'Voir les détails d\'usage',
      hideDetails: 'Masquer les détails',
      yourAnswer: 'Ta réponse',
      check: 'Vérifier',
      next: 'Suivant',
      correct: '✅ Correct !',
      incorrect: '❌ Incorrect',
      correctAnswer: 'Bonne réponse',
      score: 'Score',
      difficultExercises: 'à réviser',
      pronoun: 'Pronom',
      noExercises: 'Aucun exercice disponible pour ce temps. Ajoute des exercices dans',
    },
    en: {
      title: '⚡ Conjugation',
      theory: '📚 Theory',
      practice: '✍️ Practice',
      selectTense: 'Choose a tense',
      examples: 'Examples',
      endings: 'Endings',
      usage: 'Usage',
      usageExamples: 'Usage examples',
      showDetails: 'Show usage details',
      hideDetails: 'Hide details',
      yourAnswer: 'Your answer',
      check: 'Check',
      next: 'Next',
      correct: '✅ Correct!',
      incorrect: '❌ Incorrect',
      correctAnswer: 'Correct answer',
      score: 'Score',
      difficultExercises: 'to review',
      pronoun: 'Pronoun',
      noExercises: 'No exercises available for this tense. Add exercises in',
    }
  };

  const t = texts[language];
  const currentTenseData = allTenses[selectedTense];

  const getConjugatedForm = (verbType: 'ar' | 'er' | 'ir', pronounIndex: number, tense: Tense) => {
    const example = currentTenseData.metadata.verbExamples[verbType];
    const root = example.verb.slice(0, -2);
    const ending = currentTenseData.metadata.endings[verbType][pronounIndex];
    
    if (tense === 'futuro' || tense === 'condicional') {
      return example.verb + ending;
    }
    
    if (tense === 'perfecto' || tense === 'pluscuamperfecto' || tense === 'futuro_perfecto') {
      return ending.replace(verbType === 'ar' ? '-ado' : '-ido', verbType === 'ar' ? 'ado' : 'ido');
    }

    if (tense === 'imperativo_afirmativo' || tense === 'imperativo_negativo') {
      if (pronounIndex === 0) return '-';
      if (tense === 'imperativo_negativo') {
        return ending;
      }
      return root + ending;
    }
    
    return root + ending;
  };

  const generateExercise = () => {
    const exercises = currentTenseData.exercises;
    
    if (exercises.length === 0) {
      return;
    }

    // Priorité aux exercices difficiles
    const difficultOnes = exerciseProgress
      .filter(p => p.failures > 0 && p.tense === selectedTense)
      .sort((a, b) => b.failures - a.failures);

    let exercise;

    if (difficultOnes.length > 0 && Math.random() < 0.7) {
      const difficult = difficultOnes[0];
      exercise = exercises.find(ex => ex.id === difficult.exerciseId) || exercises[0];
    } else {
      exercise = exercises[Math.floor(Math.random() * exercises.length)];
    }

    setCurrentExercise(exercise);
    setUserAnswer('');
    setShowResult(false);
  };

  const checkAnswer = () => {
    if (!currentExercise) return;

    const isAnswerCorrect = userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);

    setScore(prev => ({
      correct: prev.correct + (isAnswerCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    const existingIndex = exerciseProgress.findIndex(
      p => p.tense === selectedTense && p.exerciseId === currentExercise.id
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
        tense: selectedTense,
        exerciseId: currentExercise.id,
        failures: isAnswerCorrect ? 0 : 1,
        lastAttempt: new Date(),
      });
    }

    setExerciseProgress(newProgress);
    localStorage.setItem('conjugation-progress', JSON.stringify(newProgress));
  };

  const difficultCount = exerciseProgress.filter(p => p.failures > 0).length;
  const hasExercises = currentTenseData.exercises.length > 0;

  return (
    <div className="max-w-6xl mx-auto">
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
            if (!currentExercise && hasExercises) generateExercise();
          }}
          disabled={!hasExercises}
          className={`px-6 py-3 rounded-lg font-bold transition flex items-center gap-2 ${
            !hasExercises ? 'opacity-50 cursor-not-allowed' :
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {(Object.keys(allTenses) as Tense[]).map((tense) => (
                <button
                  key={tense}
                  onClick={() => {
                    setSelectedTense(tense);
                    setShowUsageDetails(false);
                  }}
                  className={`px-4 py-3 rounded-lg font-semibold transition text-sm ${
                    selectedTense === tense
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {allTenses[tense].metadata.name[language]}
                </button>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-slate-900 rounded-lg text-center text-slate-300">
              💡 {currentTenseData.metadata.description[language]}
            </div>
          </div>

          {/* Bouton détails d'usage */}
          <div className="mb-6 text-center"><button
              onClick={() => setShowUsageDetails(!showUsageDetails)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              {showUsageDetails ? `📖 ${t.hideDetails}` : `📚 ${t.showDetails}`}
            </button>
          </div>

          {/* Section détails d'usage */}
          {showUsageDetails && (
            <div className="bg-slate-800 rounded-xl p-6 mb-6">
              <h3 className="text-2xl font-bold mb-4 text-center text-purple-400">
                {t.usage} - {currentTenseData.metadata.name[language]}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-slate-900 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-3 text-blue-300">{t.usage}:</h4>
                  <ul className="space-y-2">
                    {currentTenseData.metadata.usage[language].map((use, index) => (
                      <li key={index} className="text-slate-300 pl-4 border-l-2 border-blue-500">
                        • {use}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900 rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-3 text-green-300">{t.usageExamples}:</h4>
                  <ul className="space-y-2">
                    {currentTenseData.metadata.examples[language].map((example, index) => (
                      <li key={index} className="text-slate-300 pl-4">
                        → <span className="font-semibold text-green-400">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tableaux des 3 verbes */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4">{t.examples}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Verbe -AR */}
              <div className="bg-slate-800 rounded-xl overflow-hidden border-2 border-blue-500">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-center">
                  <div className="text-2xl font-bold">{currentTenseData.metadata.verbExamples.ar.verb}</div>
                  <div className="text-sm opacity-90">
                    {currentTenseData.metadata.verbExamples.ar.meaning[language]}
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
                  <div className="text-2xl font-bold">{currentTenseData.metadata.verbExamples.er.verb}</div>
                  <div className="text-sm opacity-90">
                    {currentTenseData.metadata.verbExamples.er.meaning[language]}
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
                  <div className="text-2xl font-bold">{currentTenseData.metadata.verbExamples.ir.verb}</div>
                  <div className="text-sm opacity-90">
                    {currentTenseData.metadata.verbExamples.ir.meaning[language]}
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
              {t.endings} - {currentTenseData.metadata.name[language]}
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
                        {currentTenseData.metadata.endings.ar[index] === '-' ? '-' : `-${currentTenseData.metadata.endings.ar[index]}`}
                      </td>
                      <td className="py-2 text-center font-mono text-green-300 font-bold">
                        {currentTenseData.metadata.endings.er[index] === '-' ? '-' : `-${currentTenseData.metadata.endings.er[index]}`}
                      </td>
                      <td className="py-2 text-center font-mono text-purple-300 font-bold">
                        {currentTenseData.metadata.endings.ir[index] === '-' ? '-' : `-${currentTenseData.metadata.endings.ir[index]}`}
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
          {!hasExercises ? (
            <div className="bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-xl p-8 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <div className="text-xl mb-2">{t.noExercises}</div>
              <code className="text-sm text-yellow-300">
                src/data/conjugacion/{selectedTense}.ts
              </code>
            </div>
          ) : (
            <>
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
                      {currentTenseData.metadata.name[language]}
                    </div>
                    <div className="text-3xl font-bold mb-2">
                      {currentExercise.verb}
                    </div>
                    <div className="text-slate-400">
                      {currentExercise.meaning[language]}
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-xl text-slate-300">
                      {currentExercise.prompt[language]}
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
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-center text-xl focus:border-blue-500 focus:outline-none mb-4"
                        autoFocus
                      />
                      <button
                        onClick={checkAnswer}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                      >
                        {t.check}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className={`p-4 rounded-lg mb-4 text-center ${
                        isCorrect ? 'bg-green-900 bg-opacity-30 border border-green-600' : 'bg-red-900 bg-opacity-30 border border-red-600'
                      }`}>
                        <div className="text-2xl mb-2">
                          {isCorrect ? t.correct : t.incorrect}
                        </div>
                        {!isCorrect && (
                          <div>
                            <div className="text-slate-400 text-sm">{t.correctAnswer}:</div>
                            <div className="text-xl font-bold text-green-400">
                              {currentExercise.answer}
                            </div>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={generateExercise}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                      >
                        {t.next} →
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}