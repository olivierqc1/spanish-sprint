// src/components/Dashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { getStats, type Stats } from '@/data/progress';
import { countDue } from '@/data/errorLog';

type Props = {
  language?: 'fr' | 'en';
  /** Appelé quand on clique « Réviser mes erreurs ». */
  onReview?: () => void;
  /** Appelé quand on clique « Pratiquer ». */
  onPractice?: () => void;
};

const EMPTY: Stats = { totalAnswered: 0, totalCorrect: 0, accuracy: 0, streak: 0, todayCount: 0, daysActive: 0 };

export default function Dashboard({ language = 'fr', onReview, onPractice }: Props) {
  const [stats, setStats] = useState<Stats>(EMPTY);
  const [due, setDue] = useState(0);

  useEffect(() => {
    const refresh = () => { setStats(getStats()); setDue(countDue()); };
    refresh();
    const onFocus = () => refresh();
    window.addEventListener('focus', onFocus);
    window.addEventListener('ss-progress-updated', refresh);
    window.addEventListener('ss-errors-updated', refresh);
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('ss-progress-updated', refresh);
      window.removeEventListener('ss-errors-updated', refresh);
    };
  }, []);

  const hour = new Date().getHours();
  const greeting = language === 'fr'
    ? (hour < 6 ? 'Bonne nuit' : hour < 12 ? 'Bon matin' : hour < 18 ? 'Bon après-midi' : 'Bonsoir')
    : (hour < 6 ? 'Good night' : hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening');

  const t = language === 'fr'
    ? {
        eyebrow: 'SPANISH SPRINT',
        streak: (n: number) => `${n} jour${n > 1 ? 's' : ''} de suite`,
        noStreak: 'Commence ta série aujourd’hui',
        today: 'aujourd’hui',
        drills: 'drills faits',
        accuracy: 'précision',
        days: 'jours actifs',
        reviewTitle: 'à revoir',
        review: 'Réviser mes erreurs',
        allClear: 'Rien à réviser 🎉',
        practice: 'Pratiquer',
      }
    : {
        eyebrow: 'SPANISH SPRINT',
        streak: (n: number) => `${n} day${n > 1 ? 's' : ''} in a row`,
        noStreak: 'Start your streak today',
        today: 'today',
        drills: 'drills done',
        accuracy: 'accuracy',
        days: 'active days',
        reviewTitle: 'to review',
        review: 'Review my mistakes',
        allClear: 'Nothing to review 🎉',
        practice: 'Practice',
      };

  const Tile = ({ value, label, color }: { value: string | number; label: string; color: string }) => (
    <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
      <div className="text-2xl font-black" style={{ color }}>{value}</div>
      <div className="text-[11px] text-slate-500 uppercase tracking-wide mt-0.5">{label}</div>
    </div>
  );

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Hero : salutation + série */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-transparent" />
        <p className="text-xs font-bold tracking-[0.2em] text-blue-400 mb-1">{t.eyebrow}</p>
        <h1 className="text-2xl font-black text-white">{greeting}, Olivier</h1>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-4xl">🔥</span>
          <div>
            <div className="text-3xl font-black text-white leading-none">
              {stats.streak > 0 ? t.streak(stats.streak) : <span className="text-slate-400 text-xl">{t.noStreak}</span>}
            </div>
            {stats.todayCount > 0 && (
              <div className="text-sm text-slate-400 mt-1">{stats.todayCount} {t.today}</div>
            )}
          </div>
        </div>
      </div>

      {/* Tuiles de stats */}
      <div className="flex gap-3">
        <Tile value={stats.totalAnswered} label={t.drills} color="#60a5fa" />
        <Tile value={`${stats.accuracy}%`} label={t.accuracy} color="#34d399" />
        <Tile value={stats.daysActive} label={t.days} color="#a78bfa" />
      </div>

      {/* Carte révision (SRS) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-lg font-bold text-white">
            {due > 0 ? (
              <>🔁 <span className="text-rose-400">{due}</span> {t.reviewTitle}</>
            ) : (
              <span className="text-slate-400">{t.allClear}</span>
            )}
          </div>
        </div>
        {due > 0 && onReview && (
          <button
            onClick={onReview}
            className="flex-shrink-0 bg-rose-600 hover:bg-rose-500 px-5 py-2.5 rounded-xl font-bold transition shadow-lg shadow-rose-600/20"
          >
            {t.review}
          </button>
        )}
      </div>

      {/* CTA pratiquer */}
      {onPractice && (
        <button
          onClick={onPractice}
          className="w-full bg-blue-600 hover:bg-blue-500 px-6 py-4 rounded-2xl font-bold text-lg transition shadow-lg shadow-blue-600/20"
        >
          {t.practice} →
        </button>
      )}
    </div>
  );
}
