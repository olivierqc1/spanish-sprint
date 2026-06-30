// src/components/RepasoErrores.tsx
'use client';

import { useEffect, useState } from 'react';
import GrammarDrill from './GrammarDrill';
import {
  getDueMistakes,
  recordReview,
  totalMistakes,
  clearErrorLog,
  type LoggedMistake,
} from '@/data/errorLog';

export default function RepasoErrores({ language = 'fr' }: { language?: 'fr' | 'en' }) {
  const [due, setDue] = useState<LoggedMistake[]>([]);
  const [total, setTotal] = useState(0);
  const [running, setRunning] = useState(false);

  const refresh = () => {
    setDue(getDueMistakes());
    setTotal(totalMistakes());
  };

  useEffect(() => {
    refresh();
  }, []);

  const t =
    language === 'fr'
      ? {
          title: 'Repaso de errores',
          none: 'Aucune erreur à revoir pour l’instant 🎉',
          start: 'Réviser mes erreurs',
          due: 'à revoir',
          total: 'enregistrées',
          clear: 'Tout effacer',
          note: '⚙ Tes fautes atterrissent ici en répétition espacée.\n\n→ Bonne réponse : la phrase revient plus tard.\n→ Mauvaise réponse : elle revient bientôt.\n\n💡 Quatre bonnes réponses d’affilée et elle disparaît : tu l’as maîtrisée.',
        }
      : {
          title: 'Mistake review',
          none: 'No mistakes to review right now 🎉',
          start: 'Review my mistakes',
          due: 'due',
          total: 'logged',
          clear: 'Clear all',
          note: '⚙ Your mistakes land here with spaced repetition.\n\n→ Correct answer: the sentence comes back later.\n→ Wrong answer: it comes back soon.\n\n💡 Four correct answers in a row and it disappears: you’ve mastered it.',
        };

  if (running && due.length > 0) {
    const drills = due.map((m) => ({ prompt: m.prompt, answer: m.answer }));
    return (
      <GrammarDrill
        title={t.title}
        note={t.note}
        drills={drills}
        language={language}
        onAnswer={(correct, d) => recordReview(d.prompt, d.answer, correct)}
        onClose={() => {
          setRunning(false);
          refresh();
        }}
      />
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">🔁 {t.title}</h3>
        <span className="text-sm text-slate-400">
          {due.length} {t.due} · {total} {t.total}
        </span>
      </div>

      {due.length === 0 ? (
        <p className="text-slate-400">{t.none}</p>
      ) : (
        <button
          onClick={() => setRunning(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition text-white"
        >
          {t.start} ({due.length})
        </button>
      )}

      {total > 0 && (
        <button
          onClick={() => {
            clearErrorLog();
            refresh();
          }}
          className="mt-3 text-xs text-slate-500 hover:text-red-400 transition"
        >
          {t.clear}
        </button>
      )}
    </div>
  );
}
