'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  LEVELS,
  loadConfig,
  saveConfig,
  clearConfig,
  buildCurriculum,
  getTodayPlan,
  estimateDaysLeft,
  pointsPerDay,
  wantsInput,
  wantsOutput,
  getTodayTasks,
  toggleTask,
  todaysInput,
  todaysProduction,
  type Level,
  type TargetLang,
  type PlanConfig,
} from '@/data/studyPlan';
import { getAllTopicScores } from '@/data/topicProgress';
import PlaCalendari from '@/components/PlaCalendari';

const MINUTES = [20, 30, 45, 60, 90, 120];

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function PlaEstudi() {
  const [cfg, setCfg] = useState<PlanConfig | null>(null);
  const [editing, setEditing] = useState(false);
  const [tick, setTick] = useState(0); // force refresh on score/plan changes

  // form state
  const [current, setCurrent] = useState<Level>('A2');
  const [target, setTarget] = useState<Level>('B1');
  const [minutes, setMinutes] = useState<number>(60);
  const [lang, setLang] = useState<TargetLang>('catalan');
  const [targetDate, setTargetDate] = useState<string>('2026-09-15');

  useEffect(() => {
    const c = loadConfig();
    setCfg(c);
    if (c) {
      setCurrent(c.currentLevel);
      setTarget(c.targetLevel);
      setMinutes(c.minutesPerDay);
      setLang(c.lang);
      if (c.targetDate) setTargetDate(c.targetDate);
    } else {
      const saved = localStorage.getItem('iberian-sprint-target-language');
      if (saved === 'catalan' || saved === 'spanish') setLang(saved);
      setEditing(true);
    }
    const refresh = () => setTick((t) => t + 1);
    window.addEventListener('ss-topic-updated', refresh);
    window.addEventListener('ss-plan-updated', refresh);
    return () => {
      window.removeEventListener('ss-topic-updated', refresh);
      window.removeEventListener('ss-plan-updated', refresh);
    };
  }, []);

  const scores = useMemo(() => (typeof window !== 'undefined' ? getAllTopicScores() : {}), [tick]);

  const view = useMemo(() => {
    if (!cfg) return null;
    const cur = buildCurriculum(cfg);
    const plan = getTodayPlan(cfg);
    return {
      plan,
      mastered: cur.mastered.length,
      total: cur.all.length,
      dueCount: plan.dueCount,
      daysLeft: estimateDaysLeft(cfg),
      perDay: pointsPerDay(cfg.minutesPerDay),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfg, tick]);

  const save = () => {
    const c: PlanConfig = {
      currentLevel: current,
      targetLevel: target,
      minutesPerDay: minutes,
      lang,
      startDate: cfg?.startDate ?? today(),
      targetDate,
    };
    saveConfig(c);
    setCfg(c);
    setEditing(false);
  };

  // ---------- ONBOARDING ----------
  if (editing || !cfg) {
    return (
      <section className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
        <h2 className="text-lg font-black mb-1">🎯 Mon plan d'étude</h2>
        <p className="text-slate-400 text-sm mb-5">
          Trois questions, et le plan s'ajuste chaque jour selon tes scores.
        </p>

        <label className="block text-sm font-semibold text-slate-300 mb-1">Je veux apprendre</label>
        <div className="flex gap-2 mb-4">
          {(['catalan', 'spanish'] as TargetLang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
                lang === l ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {l === 'catalan' ? 'Català' : 'Español'}
            </button>
          ))}
        </div>

        <label className="block text-sm font-semibold text-slate-300 mb-1">Mon niveau actuel</label>
        <select
          value={current}
          onChange={(e) => setCurrent(e.target.value as Level)}
          className="w-full mb-4 bg-slate-800 rounded-lg p-2 text-white"
        >
          {LEVELS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <label className="block text-sm font-semibold text-slate-300 mb-1">Niveau que je veux atteindre</label>
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value as Level)}
          className="w-full mb-4 bg-slate-800 rounded-lg p-2 text-white"
        >
          {LEVELS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <label className="block text-sm font-semibold text-slate-300 mb-1">Temps par jour</label>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {MINUTES.map((m) => (
            <button
              key={m}
              onClick={() => setMinutes(m)}
              className={`py-2 rounded-lg text-sm font-semibold ${
                minutes === m ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {m} min
            </button>
          ))}
        </div>

        <label className="block text-sm font-semibold text-slate-300 mb-1">
          Date cible (ton échéance)
        </label>
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="w-full mb-5 bg-slate-800 rounded-lg p-2 text-white"
        />

        <button
          onClick={save}
          className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-black"
        >
          Générer mon plan →
        </button>
      </section>
    );
  }

  // ---------- VUE DU JOUR ----------
  const tasks = getTodayTasks();
  const pct = view && view.total > 0 ? Math.round((view.mastered / view.total) * 100) : 0;
  const done = view && view.plan.items.length === 0;

  return (
    <section className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black">🎯 Objectifs d'aujourd'hui</h2>
        <button onClick={() => setEditing(true)} className="text-slate-400 text-sm hover:text-white">
          ⚙️ Ajuster
        </button>
      </div>

      {/* Progression globale */}
      <div>
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>
            {cfg.currentLevel} → {cfg.targetLevel} · {cfg.minutesPerDay} min/jour
          </span>
          <span>
            {view?.mastered}/{view?.total} acquis
          </span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {done ? 'Périmètre terminé 🎉' : `≈ ${view?.daysLeft} jours à ce rythme`}
        </p>
      </div>

      <PlaCalendari cfg={cfg} />

      {/* Grammaire du jour */}
      {done ? (
        <div className="bg-emerald-950/40 border border-emerald-800 rounded-xl p-4 text-sm">
          Tu as atteint 80%+ sur tout ton périmètre {cfg.currentLevel}→{cfg.targetLevel}. Monte ta cible
          d'un cran avec ⚙️ Ajuster, ou passe à la production (écrit long + oral).
        </div>
      ) : (
        <div className="space-y-2">
          {view?.plan.mode === 'gate' && (
            <div className="bg-amber-950/40 border border-amber-700 rounded-xl p-3 mb-1">
              <p className="text-sm font-bold text-amber-300">🔒 Mode consolidation</p>
              <p className="text-xs text-amber-100/80 mt-1">
                {view.plan.weakCount} modules sont encore sous 80 %. Repasse-les au-dessus du seuil
                avant d'en ouvrir de nouveaux — inutile d'empiler du neuf sur des bases fragiles.
              </p>
            </div>
          )}

          <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">
            {view?.plan.mode === 'gate' ? 'À consolider' : 'Grammaire'} ({view?.plan.items.length})
          </p>

          {view?.plan.items.map(({ point, reason, best }) => {
            const badge =
              reason === 'weak'
                ? { text: 'à consolider', cls: 'bg-amber-900/50 text-amber-300' }
                : reason === 'review'
                ? { text: 'révision', cls: 'bg-violet-900/50 text-violet-300' }
                : { text: 'nouveau', cls: 'bg-blue-900/50 text-blue-300' };
            return (
              <Link
                key={point.id}
                href={`/grammaire?point=${point.id}`}
                className="flex items-center justify-between bg-slate-800 rounded-lg p-3 hover:bg-slate-750"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{point.title.fr}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-500">{point.level}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${badge.cls}`}>
                      {badge.text}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs font-bold shrink-0 ml-2 ${
                    best == null ? 'text-slate-500' : best >= 80 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {best == null ? 'à faire' : `${best}%`}
                </span>
              </Link>
            );
          })}

          <p className="text-xs text-slate-500">
            Tape un objectif pour l'ouvrir directement.
            {view && view.dueCount > 0 && view.plan.mode === 'normal' && (
              <> · {view.dueCount} module(s) à réviser bientôt.</>
            )}
          </p>
        </div>
      )}

      {/* Input / Output selon le temps */}
      {(wantsInput(cfg.minutesPerDay) || wantsOutput(cfg.minutesPerDay)) && (
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">Pratique</p>
          {wantsInput(cfg.minutesPerDay) && (
            <button
              onClick={() => toggleTask('input')}
              className="w-full flex items-center gap-3 bg-slate-800 rounded-lg p-3 text-left"
            >
              <span className={tasks.input ? 'text-emerald-400' : 'text-slate-600'}>
                {tasks.input ? '☑' : '☐'}
              </span>
              <span className="text-sm">🎧 {todaysInput()}</span>
            </button>
          )}
          {wantsOutput(cfg.minutesPerDay) && (() => {
            const prod = todaysProduction(cfg);
            return (
              <button
                onClick={() => toggleTask('output')}
                className="w-full flex items-start gap-3 bg-slate-800 rounded-lg p-3 text-left"
              >
                <span className={tasks.output ? 'text-emerald-400 mt-0.5' : 'text-slate-600 mt-0.5'}>
                  {tasks.output ? '☑' : '☐'}
                </span>
                <span className="text-sm">
                  <span className="font-semibold">{prod.modality}</span> — {prod.topic}
                </span>
              </button>
            );
          })()}
        </div>
      )}

      <button
        onClick={() => {
          if (confirm('Réinitialiser le plan ?')) {
            clearConfig();
            setCfg(null);
            setEditing(true);
          }
        }}
        className="text-xs text-slate-600 hover:text-slate-400"
      >
        Réinitialiser le plan
      </button>
    </section>
  );
}
