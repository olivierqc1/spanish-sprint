// src/components/GrammarExplorer.tsx
"use client";

import { useState, useMemo, useEffect } from 'react';
import type { GrammarPoint } from '@/data/grammar';
import GrammarDrill from './GrammarDrill';

type Props = {
  points: GrammarPoint[];
  initialLevel: "A1" | "A2" | "B1";
  language: 'fr' | 'en';
};

export default function GrammarExplorer({ points, initialLevel, language }: Props) {
  const [selectedPoint, setSelectedPoint] = useState<GrammarPoint | null>(null);
  const [quizData, setQuizData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState<'spanish' | 'catalan'>('spanish');

  useEffect(() => {
    const saved = localStorage.getItem('iberian-sprint-target-language');
    if (saved === 'catalan') setTargetLanguage('catalan');
    else setTargetLanguage('spanish');
  }, []);

  // Filtre par niveau ET par langue cible
  const filtered = useMemo(() => {
    return points.filter(p => {
      // Filtre langue : les points catalan commencent par "cat_"
      const isCatalanPoint = p.id.startsWith('cat_');
      if (targetLanguage === 'catalan' && !isCatalanPoint) return false;
      if (targetLanguage === 'spanish' && isCatalanPoint) return false;

      // Filtre niveau
      if (p.level.includes('-')) {
        const [min, max] = p.level.split('-');
        return min <= initialLevel || max >= initialLevel;
      }
      return p.level === initialLevel || p.level.includes(initialLevel);
    });
  }, [points, initialLevel, targetLanguage]);

  const loadQuiz = async (point: GrammarPoint) => {
    setLoading(true);
    setSelectedPoint(point);
    try {
      const data = await import(`@/data/grammar_quizz/${point.id}.json`);
      setQuizData(data.default || data);
    } catch (error) {
      console.error('Error loading quiz:', error);
      setQuizData(null);
    } finally {
      setLoading(false);
    }
  };

  const accentColor = targetLanguage === 'catalan' ? '#f59e0b' : '#3b82f6';

  if (!selectedPoint) {
    return (
      <div className="space-y-4">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold mb-2" style={{ color: accentColor }}>
            {targetLanguage === 'catalan'
              ? (language === 'fr' ? '📚 Grammaire catalane' : '📚 Catalan Grammar')
              : (language === 'fr' ? '📚 Points de grammaire' : '📚 Grammar Points')
            }
          </h2>
          <p className="text-slate-400">
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
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="px-2 py-1 rounded text-xs font-bold text-white"
                    style={{ background: accentColor }}>
                    {point.level}
                  </span>
                  <span className="text-sm" style={{ color: accentColor }}>→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-xl p-12 text-center border border-slate-700">
        <div className="text-4xl mb-4">⏳</div>
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

  return (
    <GrammarDrill
      title={selectedPoint.title}
      note={quizData.note}
      drills={quizData.drills}
      onClose={() => {
        setSelectedPoint(null);
        setQuizData(null);
      }}
      language={language}
    />
  );
}