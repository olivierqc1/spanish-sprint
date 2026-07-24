'use client';

import { useEffect, useState } from 'react';
import { getPacing, formatShort, type PlanConfig } from '@/data/studyPlan';
import { getCalendar, getStreak } from '@/data/activityLog';

const LABEL: Record<string, { text: string; cls: string }> = {
  done: { text: '🎉 Objectif atteint', cls: 'text-emerald-400' },
  ahead: { text: '🚀 En avance', cls: 'text-emerald-400' },
  ontrack: { text: '✓ Dans les temps', cls: 'text-blue-400' },
  behind: { text: '⚠️ En retard', cls: 'text-amber-400' },
  expired: { text: '⏰ Date dépassée', cls: 'text-rose-400' },
};

export default function PlaCalendari({ cfg }: { cfg: PlanConfig }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const refresh = () => setTick((t) => t + 1);
    window.addEventListener('ss-activity-updated', refresh);
    window.addEventListener('ss-topic-updated', refresh);
    return () => {
      window.removeEventListener('ss-activity-updated', refresh);
      window.removeEventListener('ss-topic-updated', refresh);
    };
  }, []);

  const p = getPacing(cfg);
  const streak = getStreak();
  const cal = getCalendar(14);
  const label = LABEL[p.status] ?? LABEL.ontrack;
  const dayNo = Math.min(p.elapsedDays + 1, p.totalDays);
  const timePct = Math.max(0, Math.min(100, Math.round((p.elapsedDays / p.totalDays) * 100)));

  return (
    <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-black">📅 Calendrier</h3>
        <span className={`text-sm font-bold ${label.cls}`}>{label.text}</span>
      </div>

      {/* Jour X / Y + temps écoulé */}
      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>
            Jour {dayNo} / {p.totalDays}
          </span>
          <span>
            {p.daysLeft >= 0 ? `${p.daysLeft} jours restants` : `${-p.daysLeft} jours de retard`}
          </span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500" style={{ width: `${timePct}%` }} />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Cible : {formatShort(cfg.targetDate)}
          {p.remaining > 0 && <> · fin prévue : {formatShort(p.projectedDate)}</>}
        </p>
      </div>

      {/* Rythme requis vs capacité */}
      {p.remaining > 0 && p.daysLeft > 0 && (
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-slate-800 rounded-xl p-3">
            <p className="text-xl font-black">{p.requiredPerDay.toFixed(1)}</p>
            <p className="text-xs text-slate-400">modules/jour requis</p>
          </div>
          <div className="bg-slate-800 rounded-xl p-3">
            <p className="text-xl font-black">{p.capacityPerDay}</p>
            <p className="text-xs text-slate-400">ton rythme actuel</p>
          </div>
        </div>
      )}

      {/* Série + 14 derniers jours */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs uppercase tracking-wide text-slate-500 font-bold">14 derniers jours</span>
          <span className="text-sm font-bold text-orange-400">
            🔥 {streak} {streak > 1 ? 'jours' : 'jour'}
          </span>
        </div>
        <div className="flex gap-1">
          {cal.map((d) => (
            <div
              key={d.key}
              title={d.key}
              className={`flex-1 h-7 rounded ${
                d.active ? 'bg-emerald-500' : 'bg-slate-800'
              } ${d.isToday ? 'ring-2 ring-blue-400' : ''}`}
            />
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Un carré vert = un jour où tu as terminé au moins un module.
        </p>
      </div>
    </div>
  );
}
