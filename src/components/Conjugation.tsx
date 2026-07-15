"use client";

import { useState, useEffect } from 'react';
import CatalanConjugation from './CatalanConjugation';
import {
  TENSES_BY_LEVEL, CTX, CTX_PRESENTE, verbsByTense, ConjugationExercise,
} from '@/data/verbs/spanishConjugation';

type Props = {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'ALL';
  country: string;
};

// =============================================================================

// SPANISH DATA
// =============================================================================


export default function Conjugation({ level }: Props) {
  const [mode, setMode] = useState<'theory' | 'practice'>('practice');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [targetLanguage, setTargetLanguage] = useState<'spanish' | 'catalan'>('spanish');
  const [selectedTense, setSelectedTense] = useState('presente');
  const [currentExercise, setCurrentExercise] = useState<ConjugationExercise | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const availableTenses = TENSES_BY_LEVEL[level] || TENSES_BY_LEVEL.A1;

  useEffect(() => {
    const saved = localStorage.getItem('spanish-sprint-language');
    if (saved === 'fr' || saved === 'en') setLanguage(saved as 'fr' | 'en');
    const target = localStorage.getItem('iberian-sprint-target-language');
    if (target === 'catalan') setTargetLanguage('catalan');
  }, []);

  useEffect(() => {
    if (!availableTenses.includes(selectedTense)) setSelectedTense('presente');
  }, [level, availableTenses, selectedTense]);

  const generateExercise = () => {
    const verbs = verbsByTense[selectedTense] || verbsByTense.presente;
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const isImp = selectedTense === 'imperativo';
    const idx = Math.floor(Math.random() * (isImp ? 5 : 6));
    const ctxArr = CTX[selectedTense] || CTX_PRESENTE;
    setCurrentExercise({
      id: Date.now(), verb: verb.verb, pronoun: idx,
      tense: selectedTense, contextPhrase: ctxArr[idx],
      answer: verb.conjugations[idx],
    });
    setUserAnswer('');
    setShowResult(false);
  };

  // useEffect AVANT le return conditionnel catalan
  useEffect(() => {
    if (mode === 'practice' && targetLanguage === 'spanish') generateExercise();
  }, [mode, selectedTense, targetLanguage]);

  // Return conditionnel APRES tous les hooks
  if (targetLanguage === 'catalan') return <CatalanConjugation language={language} />;

  const pronouns = ['yo','tu','el/ella','nosotros','vosotros','ellos/ellas'];
  const imperativePronouns = ['tu','usted','nosotros','vosotros','ustedes'];

  const tenses = {
    fr: {
      presente: 'Present', preterito_perfecto: 'Passe compose',
      imperativo: 'Imperatif', preterito: 'Passe simple',
      imperfecto: 'Imparfait', futuro: 'Futur',
      condicional: 'Conditionnel', pluscuamperfecto: 'Plus-que-parfait',
      subjuntivo_presente: 'Subjonctif',
    },
    en: {
      presente: 'Present', preterito_perfecto: 'Present Perfect',
      imperativo: 'Imperative', preterito: 'Preterite',
      imperfecto: 'Imperfect', futuro: 'Future',
      condicional: 'Conditional', pluscuamperfecto: 'Past Perfect',
      subjuntivo_presente: 'Subjunctive',
    },
  };

  const checkAnswer = () => {
    if (!currentExercise) return;
    const ok = userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase();
    setShowResult(true);
    setScore(p => ({ correct: p.correct + (ok ? 1 : 0), total: p.total + 1 }));
  };

  const t = language === 'fr'
    ? { theory: 'Theorie', practice: 'Pratique', score: 'Score',
        hint: 'Phrase :', conjugate: 'Conjugue', check: 'Verifier',
        next: 'Suivant', correct: 'Correct !', incorrect: 'Incorrect',
        answer: 'Bonne reponse', select: 'Choisis un temps' }
    : { theory: 'Theory', practice: 'Practice', score: 'Score',
        hint: 'Context:', conjugate: 'Conjugate', check: 'Check',
        next: 'Next', correct: 'Correct!', incorrect: 'Incorrect',
        answer: 'Correct answer', select: 'Choose a tense' };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2">
        <button onClick={() => setMode('theory')}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            mode === 'theory' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}>{t.theory}</button>
        <button onClick={() => setMode('practice')}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            mode === 'practice' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}>{t.practice}</button>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <label className="block text-sm text-slate-400 mb-2">{t.select}</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(tenses[language])
            .filter(([key]) => availableTenses.includes(key))
            .map(([key, value]) => (
              <button key={key} onClick={() => setSelectedTense(key)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTense === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                }`}>{value}</button>
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
                <div className="text-sm text-purple-300 mb-1">{t.hint}</div>
                <div className="text-lg font-semibold text-white italic">
                  "{currentExercise.contextPhrase}"
                </div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 mb-2">{t.conjugate}</div>
                <div className="text-4xl font-bold text-blue-400 mb-1">{currentExercise.verb}</div>
                <div className="text-2xl text-slate-300">
                  ({selectedTense === 'imperativo'
                    ? imperativePronouns[currentExercise.pronoun]
                    : pronouns[currentExercise.pronoun]})
                </div>
              </div>
              {!showResult ? (
                <>
                  <input type="text" value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && checkAnswer()}
                    placeholder="..."
                    className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-lg text-white text-center text-2xl focus:outline-none"
                    autoFocus />
                  <button onClick={checkAnswer} disabled={!userAnswer.trim()}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition text-xl">
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
                        ? t.correct : t.incorrect}
                    </div>
                    {userAnswer.trim().toLowerCase() !== currentExercise.answer.toLowerCase() && (
                      <div>
                        <div className="text-slate-400 mb-2">{t.answer}:</div>
                        <div className="text-3xl font-bold text-green-400">
                          {currentExercise.answer}
                        </div>
                      </div>
                    )}
                  </div>
                  <button onClick={generateExercise}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition text-xl">
                    {t.next} →
                  </button>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-h-96 overflow-y-auto space-y-4">
          {verbsByTense[selectedTense]?.map((verb, idx) => (
            <div key={idx} className="bg-slate-900 rounded-lg p-4">
              <h4 className="text-xl font-bold text-white mb-3 capitalize">{verb.verb}</h4>
              <div className="grid grid-cols-2 gap-2">
                {(selectedTense === 'imperativo' ? imperativePronouns : pronouns).map((p, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-slate-800 rounded">
                    <span className="text-slate-400">{p}</span>
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
