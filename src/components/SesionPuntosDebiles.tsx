// src/components/SesionPuntosDebiles.tsx
'use client';

import { useEffect, useState } from 'react';
import GrammarDrill from './GrammarDrill';
import { grammarPoints } from '@/data/grammar';
import { getAllTopicScores } from '@/data/topicProgress';
import { recordAnswer } from '@/data/progress';
import { logMistake } from '@/data/errorLog';

type Drill = { prompt: string; answer: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SesionPuntosDebiles({ language = 'fr' }: { language?: 'fr' | 'en' }) {
  const [weak, setWeak] = useState<{ id: string; title: string; pct: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [drills, setDrills] = useState<Drill[] | null>(null);

  useEffect(() => {
    const scores = getAllTopicScores();
    const list = Object.entries(scores)
      .filter(([, pct]) => pct < 80)
      .map(([id, pct]) => {
        const p = grammarPoints.find((g) => g.id === id);
        return p ? { id, title: p.title[language], pct } : null;
      })
      .filter(Boolean) as { id: string; title: string; pct: number }[];
    list.sort((a, b) => a.pct - b.pct);
    setWeak(list.slice(0, 5));
  }, [language]);

  const t = language === 'fr'
    ? {
        title: 'Session points faibles',
        desc: 'Un exercice construit automatiquement à partir de tes thèmes les moins bien réussis (score < 80 %).',
        none: 'Aucun point faible pour l’instant — soit tu n’as pas encore assez pratiqué, soit tout est ≥ 80 % 🎉',
        start: 'Réviser mes points faibles',
        loading: 'Préparation…',
        sessionTitle: 'Points faibles',
        note: '⚙ Mélange de tes thèmes les plus fragiles. Ce que tu rates ici repart dans ta révision espacée.',
      }
    : {
        title: 'Weak points session',
        desc: 'An exercise built automatically from your lowest-scoring topics (score < 80%).',
        none: 'No weak points yet — either you haven’t practised enough, or everything is ≥ 80% 🎉',
        start: 'Review my weak points',
        loading: 'Preparing…',
        sessionTitle: 'Weak points',
        note: '⚙ A mix of your most fragile topics. What you miss here goes back into spaced review.',
      };

  const startSession = async () => {
    setLoading(true);
    try {
      const parts = await Promise.all(
        weak.map(async (w) => {
          try {
            const mod = await import(`@/data/grammar_quizz/${w.id}.json`);
            return ((mod.default || mod).drills || []) as Drill[];
          } catch {
            return [] as Drill[];
          }
        })
      );
      const all = shuffle(parts.flat()).slice(0, 25);
      setDrills(all);
    } finally {
      setLoading(false);
    }
  };

  if (drills && drills.length > 0) {
    return (
      <GrammarDrill
        title={t.sessionTitle}
        note={t.note}
        drills={drills}
        language={language}
        onAnswer={(correct, d) => {
          recordAnswer(correct);
          if (!correct) logMistake(d, t.sessionTitle);
        }}
        onClose={() => setDrills(null)}
      />
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 max-w-2xl mx-auto">
      <h3 className="text-lg font-bold text-white mb-1">🎯 {t.title}</h3>
      <p className="text-sm text-slate-400 mb-4">{t.desc}</p>

      {weak.length === 0 ? (
        <p className="text-slate-400 text-sm">{t.none}</p>
      ) : (
        <>
          <div className="space-y-1.5 mb-4">
            {weak.map((w) => (
              <div key={w.id} className="flex items-center justify-between text-sm">
                <span className="text-slate-300 truncate pr-3">{w.title}</span>
                <span className="font-bold flex-shrink-0" style={{ color: w.pct >= 50 ? '#fbbf24' : '#fb7185' }}>
                  {w.pct}%
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={startSession}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 px-6 py-3 rounded-xl font-bold transition"
          >
            {loading ? t.loading : t.start}
          </button>
        </>
      )}
    </div>
  );
}
