'use client';

import { useState, useEffect } from 'react';
import { getTodayWritingPrompt, getUpcomingPrompts } from '@/data/writingPrompts';

const DONE_KEY = 'ss_writing_done_v1';

function dayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function loadDone(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(DONE_KEY) || '[]');
  } catch {
    return [];
  }
}

export default function EscripturaAvui() {
  const [done, setDone] = useState<string[]>([]);
  const today = getTodayWritingPrompt();
  const upcoming = getUpcomingPrompts(5).slice(1); // les 4 prochains jours
  const isDone = done.includes(dayKey());

  useEffect(() => {
    setDone(loadDone());
  }, []);

  const markDone = () => {
    const k = dayKey();
    if (done.includes(k)) return;
    const next = [...done, k];
    setDone(next);
    try {
      localStorage.setItem(DONE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="space-y-5">
      {/* Sujet du jour */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-blue-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-wide text-blue-400 font-bold">✍️ Sujet du jour</span>
          <span className="text-xs text-slate-500">{today.theme}</span>
        </div>
        <p className="text-2xl font-black leading-snug mb-4">{today.ca}</p>
        <p className="text-sm text-slate-400 mb-4">
          Écris 8 à 10 phrases. Vise le point grammatical du jour. Puis fais-le corriger
          (par Laura, ou colle ton texte dans une conversation).
        </p>
        <button
          onClick={markDone}
          disabled={isDone}
          className="w-full py-3 rounded-xl font-bold transition bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500"
        >
          {isDone ? '✓ Fait aujourd\u2019hui' : 'J\u2019ai écrit mon texte'}
        </button>
      </div>

      {/* Aperçu des prochains jours */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
        <p className="text-xs uppercase tracking-wide text-slate-500 font-bold mb-3">Les prochains jours</p>
        <ul className="space-y-2">
          {upcoming.map((p, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="text-slate-600 shrink-0">J+{i + 1}</span>
              <div>
                <span className="text-slate-200">{p.ca}</span>
                <span className="text-slate-500 block text-xs">{p.theme}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
