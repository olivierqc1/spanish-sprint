// src/components/GrammarExplorer.tsx
"use client";

import { useState, useMemo } from 'react';
import type { GrammarPoint } from '@/data/grammar';

type Props = {
  points: GrammarPoint[];
  initialLevel: "A1" | "A2" | "B1";
  language: 'fr' | 'en';
};

type QuizData = {
  theory: { fr: string; en: string };
  drills: Array<{ prompt: string; answer: string }>;
};

export default function GrammarExplorer({ points, initialLevel, language }: Props) {
  const [selectedPoint, setSelectedPoint] = useState<GrammarPoint | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentDrill, setCurrentDrill] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Filtrer par niveau
  const filtered = useMemo(() => {
    return points.filter(p => {
      if (p.level.includes('-')) {
        const [min, max] = p.level.split('-');
        return min <= initialLevel || max >= initialLevel;
      }
      return p.level === initialLevel || p.level.includes(initialLevel);
    });
  }, [points, initialLevel]);

  // Charger les données du quiz
  const loadQuiz = async (point: GrammarPoint) => {
    setLoading(true);
    setSelectedPoint(point);
    
    try {
      const response = await fetch(point.jsonPath);
      if (!response.ok) throw new Error('Failed to load');
      
      const data = await response.json();
      setQuizData(data);
      setCurrentDrill(0);
      setUserAnswer('');
      setShowResult(false);
      setScore({ correct: 0, total: 0 });
    } catch (error) {
      console.error('Error loading quiz:', error);
      setQuizData(null);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = () => {
    if (!quizData) return;
    
    const drill = quizData.drills[currentDrill];
    const isCorrect = userAnswer.trim().toLowerCase() === drill.answer.toLowerCase();
    
    setShowResult(true);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));
  };

  const nextDrill = () => {
    if (!quizData) return;
    
    if (currentDrill < quizData.drills.length - 1) {
      setCurrentDrill(prev => prev + 1);
      setUserAnswer('');
      setShowResult(false);
    } else {
      // Fin du quiz
      alert(`Quiz terminé! Score: ${score.correct + (showResult && userAnswer.trim().toLowerCase() === quizData.drills[currentDrill].answer.toLowerCase() ? 1 : 0)}/${quizData.drills.length}`);
      setSelectedPoint(null);
      setQuizData(null);
    }
  };

  // Vue liste des points de grammaire
  if (!selectedPoint) {
    return (
      <div className="space-y-4">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold mb-4 text-blue-300">
            {language === 'fr' ? '📚 Points de grammaire' : '📚 Grammar Points'}
          </h2>
          <p className="text-slate-400 mb-4">
            {language === 'fr' 
              ? `${filtered.length} points disponibles pour le niveau ${initialLevel}`
              : `${filtered.length} points available for level ${initialLevel}`
            }
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filtered.map(point => (
            <button
              key={point.id}
              onClick={() => loadQuiz(point)}
              className="bg-slate-800 hover:bg-slate-700 rounded-xl p-4 border border-slate-700 text-left transition-all hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {point.title[language]}
                  </h3>
                  <p className="text-sm text-slate-400">
                    {point.note[language]}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="px-2 py-1 bg-blue-600 rounded text-xs font-bold">
                    {point.level}
                  </span>
                  <span className="text-blue-400 text-sm">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Vue quiz
  if (loading) {
    return (
      <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
        <div className="spinner mx-auto mb-4"></div>
        <p className="text-slate-400">
          {language === 'fr' ? 'Chargement...' : 'Loading...'}
        </p>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
        <p className="text-red-400 mb-4">
          {language === 'fr' ? 'Erreur de chargement' : 'Loading error'}
        </p>
        <button
          onClick={() => setSelectedPoint(null)}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
        >
          {language === 'fr' ? '← Retour' : '← Back'}
        </button>
      </div>
    );
  }

  const drill = quizData.drills[currentDrill];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <button
          onClick={() => setSelectedPoint(null)}
          className="text-blue-400 hover:text-blue-300 mb-3"
        >
          {language === 'fr' ? '← Retour à la liste' : '← Back to list'}
        </button>
        <h2 className="text-2xl font-bold text-white mb-2">
          {selectedPoint.title[language]}
        </h2>
        <p className="text-slate-400">
          {selectedPoint.note[language]}
        </p>
      </div>

      {/* Score */}
      <div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
        <span className="text-slate-400">
          {language === 'fr' ? 'Score: ' : 'Score: '}
        </span>
        <span className="text-green-400 font-bold text-2xl">{score.correct}</span>
        <span className="text-slate-500"> / </span>
        <span className="font-bold text-2xl">{score.total}</span>
        <span className="text-slate-400 ml-4">
          {language === 'fr' ? 'Question ' : 'Question '}
          {currentDrill + 1} / {quizData.drills.length}
        </span>
      </div>

      {/* Théorie (collapsible) */}
      <details className="bg-slate-800 rounded-xl border border-slate-700">
        <summary className="p-4 cursor-pointer hover:bg-slate-750 rounded-xl font-bold text-blue-300">
          📖 {language === 'fr' ? 'Voir la théorie' : 'View theory'}
        </summary>
        <div className="p-6 pt-0 prose prose-invert max-w-none">
          <div 
            className="text-slate-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: quizData.theory[language].replace(/\n/g, '<br/>') }}
          />
        </div>
      </details>

      {/* Exercice */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <p className="text-xl mb-4 text-white">
          {drill.prompt}
        </p>

        {!showResult ? (
          <>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder={language === 'fr' ? 'Ta réponse...' : 'Your answer...'}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-lg focus:border-blue-500 focus:outline-none mb-4"
              autoFocus
            />
            <button
              onClick={checkAnswer}
              disabled={!userAnswer.trim()}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition"
            >
              {language === 'fr' ? 'Vérifier' : 'Check'}
            </button>
          </>
        ) : (
          <>
            <div className={`p-4 rounded-lg mb-4 ${
              userAnswer.trim().toLowerCase() === drill.answer.toLowerCase()
                ? 'bg-green-900 bg-opacity-30 border-2 border-green-600'
                : 'bg-red-900 bg-opacity-30 border-2 border-red-600'
            }`}>
              <div className="text-2xl mb-2">
                {userAnswer.trim().toLowerCase() === drill.answer.toLowerCase() 
                  ? '✅ ' + (language === 'fr' ? 'Correct !' : 'Correct!')
                  : '❌ ' + (language === 'fr' ? 'Incorrect' : 'Incorrect')
                }
              </div>
              {userAnswer.trim().toLowerCase() !== drill.answer.toLowerCase() && (
                <div>
                  <div className="text-slate-400 mb-1">
                    {language === 'fr' ? 'La bonne réponse était :' : 'The correct answer was:'}
                  </div>
                  <div className="text-2xl font-bold text-green-400">{drill.answer}</div>
                </div>
              )}
            </div>
            <button
              onClick={nextDrill}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
            >
              {currentDrill < quizData.drills.length - 1
                ? (language === 'fr' ? 'Question suivante →' : 'Next question →')
                : (language === 'fr' ? 'Terminer le quiz' : 'Finish quiz')
              }
            </button>
          </>
        )}
      </div>
    </div>
  );
}