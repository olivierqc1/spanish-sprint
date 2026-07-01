// src/components/GrammarExplorer.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import type { GrammarPoint } from '@/data/grammar';
import GrammarDrill from './GrammarDrill';
import { logMistake } from '@/data/errorLog';
import { recordAnswer } from '@/data/progress';
import { recordTopicScore, getAllTopicScores } from '@/data/topicProgress';

type Props = {
  points: GrammarPoint[];
  initialLevel: "A1" | "A2" | "B1";
  language: 'fr' | 'en';
};

// Couleur par niveau = vraie information (difficulté croissante), pas décoration.
const levelColor = (level: string) => {
  if (level.includes('B2')) return '#fb7185'; // rose
  if (level.includes('B1')) return '#a78bfa'; // violet
  if (level.includes('A2')) return '#38bdf8'; // ciel
  return '#34d399';                            // A1 émeraude
};

const scoreColor = (pct: number) => (pct >= 80 ? '#34d399' : pct >= 50 ? '#fbbf24' : '#fb7185');

// Petit anneau de progression (meilleur score du thème).
function ScoreRing({ pct }: { pct: number }) {
  const R = 13, C = 2 * Math.PI * R, dash = (pct / 100) * C, col = scoreColor(pct);
  return (
    <div className="relative w-9 h-9 flex-shrink-0" title={`Meilleur score : ${pct}%`}>
      <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90">
        <circle cx="16" cy="16" r={R} fill="none" stroke="#1e293b" strokeWidth="3" />
        <circle cx="16" cy="16" r={R} fill="none" stroke={col} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={`${dash} ${C}`} />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[9px] font-bold" style={{ color: col }}>
        {pct}
      </span>
    </div>
  );
}

export default function GrammarExplorer({ points, initialLevel, language }: Props) {
  const [selectedPoint, setSelectedPoint] = useState<GrammarPoint | null>(null);
  const [quizData, setQuizData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState<'spanish' | 'catalan'>('spanish');
  const [search, setSearch] = useState('');
  const [scores, setScores] = useState<Record<string, number>>({});

  // compteurs de la session en cours (pour calculer le score final du thème)
  const sess = useRef({ correct: 0, total: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('iberian-sprint-target-language');
    setTargetLanguage(saved === 'catalan' ? 'catalan' : 'spanish');
    setScores(getAllTopicScores());
    const refresh = () => setScores(getAllTopicScores());
    window.addEventListener('ss-topic-updated', refresh);
    return () => window.removeEventListener('ss-topic-updated', refresh);
  }, []);

  const filtered = useMemo(() => {
    return points.filter(p => {
      const isCatalanPoint = p.id.startsWith('cat_');
      if (targetLanguage === 'catalan' && !isCatalanPoint) return false;
      if (targetLanguage === 'spanish' && isCatalanPoint) return false;

      if (p.level.includes('-')) {
        const [min, max] = p.level.split('-');
        if (!(min <= initialLevel || max >= initialLevel)) return false;
      } else {
        if (!(p.level === initialLevel || p.level.includes(initialLevel))) return false;
      }

      if (search.trim()) {
        const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const q = norm(search);
        if (!norm(p.title[language]).includes(q) && !norm(p.note[language]).includes(q)) return false;
      }
      return true;
    });
  }, [points, initialLevel, targetLanguage, search, language]);

  const loadQuiz = async (point: GrammarPoint) => {
    setLoading(true);
    setSelectedPoint(point);
    sess.current = { correct: 0, total: 0 };
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

  const closeDrill = () => {
    // Enregistre le score du thème seulement si la session a été complétée.
    const total = quizData?.drills?.length ?? 0;
    if (selectedPoint && total > 0 && sess.current.total >= total) {
      const pct = Math.round((sess.current.correct / total) * 100);
      recordTopicScore(selectedPoint.id, pct);
    }
    setSelectedPoint(null);
    setQuizData(null);
  };

  const accent = targetLanguage === 'catalan' ? '#f59e0b' : '#3b82f6';

  const t = {
    fr: {
      eyebrow: targetLanguage === 'catalan' ? 'GRAMÀTICA CATALANA' : 'GRAMMAIRE',
      heading: targetLanguage === 'catalan' ? 'Catalan' : 'Espagnol',
      sub: (n: number) => `${n} point${n > 1 ? 's' : ''} · niveau ${initialLevel}`,
      placeholder: 'Rechercher un point…',
      noResult: 'Rien ne correspond à',
      loading: 'Chargement…',
      errTitle: 'Impossible de charger cet exercice',
      errBack: '← Retour à la liste',
    },
    en: {
      eyebrow: targetLanguage === 'catalan' ? 'CATALAN GRAMMAR' : 'GRAMMAR',
      heading: targetLanguage === 'catalan' ? 'Catalan' : 'Spanish',
      sub: (n: number) => `${n} point${n > 1 ? 's' : ''} · level ${initialLevel}`,
      placeholder: 'Search a point…',
      noResult: 'Nothing matches',
      loading: 'Loading…',
      errTitle: "Couldn't load this exercise",
      errBack: '← Back to list',
    },
  }[language];

  if (!selectedPoint) {
    return (
      <div className="space-y-5">
        <header className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
          <p className="text-xs font-bold tracking-[0.2em] mb-1" style={{ color: accent }}>{t.eyebrow}</p>
          <h2 className="text-3xl font-black text-white leading-tight">{t.heading}</h2>
          <p className="text-slate-400 text-sm mt-1">{t.sub(filtered.length)}</p>

          <div className="relative mt-5">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.placeholder}
              className="w-full bg-slate-950/60 border border-slate-700 rounded-xl pl-10 pr-9 py-2.5 text-white placeholder-slate-500 text-sm transition focus:outline-none focus:ring-2"
              style={{ ['--tw-ring-color' as any]: accent }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-lg leading-none" aria-label="clear">×</button>
            )}
          </div>
        </header>

        {filtered.length === 0 ? (
          <div className="text-center text-slate-400 py-14 border border-dashed border-slate-800 rounded-2xl">
            <div className="text-3xl mb-2">🤔</div>
            {t.noResult} <span className="text-white font-semibold">“{search}”</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filtered.map(point => {
              const lc = levelColor(point.level);
              const best = scores[point.id];
              return (
                <button
                  key={point.id}
                  onClick={() => loadQuiz(point)}
                  className="group relative flex items-stretch gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 pl-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-800"
                >
                  <span className="absolute left-0 top-3 bottom-3 w-1 rounded-full" style={{ background: lc }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold" style={{ background: `${lc}22`, color: lc }}>
                        {point.level}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">{point.title[language]}</h3>
                    <p className="text-sm text-slate-400 mt-0.5 line-clamp-2">{point.note[language]}</p>
                  </div>
                  <div className="self-center flex-shrink-0 flex items-center gap-2">
                    {typeof best === 'number' && <ScoreRing pct={best} />}
                    <span className="grid place-items-center w-9 h-9 rounded-full border border-slate-700 text-slate-400 transition-all group-hover:text-white group-hover:border-slate-500">→</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-14 text-center">
        <div className="text-4xl mb-3 animate-pulse">⏳</div>
        <p className="text-slate-400">{t.loading}</p>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">
        <div className="text-3xl mb-3">⚠️</div>
        <p className="text-rose-400 mb-5">{t.errTitle}</p>
        <button onClick={() => setSelectedPoint(null)} className="bg-slate-700 hover:bg-slate-600 px-6 py-2.5 rounded-xl font-semibold transition">
          {t.errBack}
        </button>
      </div>
    );
  }

  return (
    <GrammarDrill
      title={selectedPoint.title}
      note={quizData.note}
      visual={quizData.visual}
      drills={quizData.drills}
      onClose={closeDrill}
      language={language}
      onAnswer={(correct, d) => {
        recordAnswer(correct);
        sess.current.total += 1;
        if (correct) sess.current.correct += 1;
        else logMistake(d, selectedPoint.title[language]);
      }}
    />
  );
}
