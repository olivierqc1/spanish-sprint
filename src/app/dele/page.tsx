'use client';

// src/app/dele/page.tsx
// Mode DELE B2 — partie 2 sur 2 (la partie 1 est DeleTrainers.tsx) : compte à rebours, semaine type, parcours subjonctif,
// entraînement à l'écrit (chrono + compteur de mots) et à l'oral.

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { grammarPoints } from '@/data/grammar';
import { getAllTopicScores } from '@/data/topicProgress';
import {
  DEFAULT_EXAM_DATE, WEEK, KIND_STYLE, PATH,
  readLS, writeLS, daysUntil,
  WritingTrainer, OralTrainer,
} from './DeleTrainers';

// ───────────────────────── Page ─────────────────────────

type Tab = 'semaine' | 'subjonctif' | 'ecrit' | 'oral';

export default function DelePage() {
  const [tab, setTab] = useState<Tab>('semaine');
  const [examDate, setExamDate] = useState(DEFAULT_EXAM_DATE);
  const [editingDate, setEditingDate] = useState(false);

  useEffect(() => {
    setExamDate(readLS('ss-dele-exam-date', DEFAULT_EXAM_DATE));
    const saved = readLS('ss-dele-tab', 'semaine') as Tab;
    if (['semaine', 'subjonctif', 'ecrit', 'oral'].includes(saved)) setTab(saved);
  }, []);

  const changeTab = (t: Tab) => { setTab(t); writeLS('ss-dele-tab', t); };
  const days = daysUntil(examDate);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">← Retour</Link>

        {/* Compte à rebours */}
        <header className="mt-4 mb-6">
          <h1 className="text-3xl font-black">DELE B2</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-6xl font-black text-blue-400 tabular-nums">{days > 0 ? days : 0}</span>
            <span className="text-slate-300">jours avant l’examen du {new Date(examDate + 'T12:00:00').toLocaleDateString('fr-CA', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          {editingDate ? (
            <div className="mt-2 flex gap-2 items-center">
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-sm"
              />
              <button
                onClick={() => { writeLS('ss-dele-exam-date', examDate); setEditingDate(false); }}
                className="px-3 py-1 rounded-lg bg-blue-600 text-sm font-semibold"
              >OK</button>
            </div>
          ) : (
            <button onClick={() => setEditingDate(true)} className="mt-1 text-xs text-slate-400 underline">
              Modifier la date (inscriptions dès décembre sur examenes.cervantes.es)
            </button>
          )}
        </header>

        {/* Onglets */}
        <nav className="flex gap-1 bg-slate-900 rounded-xl p-1 mb-6" role="tablist">
          {([
            ['semaine', 'Semaine'],
            ['subjonctif', 'Subjonctif'],
            ['ecrit', 'Écrit'],
            ['oral', 'Oral'],
          ] as [Tab, string][]).map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => changeTab(k)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${tab === k ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >{label}</button>
          ))}
        </nav>

        {tab === 'semaine' && <WeekView />}
        {tab === 'subjonctif' && <SubjunctivePath />}
        {tab === 'ecrit' && <WritingTrainer />}
        {tab === 'oral' && <OralTrainer />}
      </div>
    </div>
  );
}

// ───────────────────────── Semaine ─────────────────────────

function WeekView() {
  const [todayIdx, setTodayIdx] = useState<number | null>(null);
  useEffect(() => setTodayIdx(new Date().getDay()), []);
  // Affiche lundi → dimanche
  const order = [1, 2, 3, 4, 5, 6, 0];

  return (
    <section>
      <p className="text-slate-400 text-sm mb-4">
        Bleu = espagnol, jaune = catalan, vert = cours. Jamais les deux langues dans le même bloc.
      </p>
      <div className="space-y-3">
        {order.map((i) => {
          const d = WEEK[i];
          const isToday = i === todayIdx;
          return (
            <div key={d.day} className={`rounded-xl p-4 ${isToday ? 'bg-slate-800 ring-2 ring-blue-500' : 'bg-slate-900'}`}>
              <p className="font-bold mb-2">{d.day}{isToday && <span className="ml-2 text-blue-400 text-sm">aujourd’hui</span>}</p>
              <ul className="space-y-1">
                {d.blocks.map((b, j) => (
                  <li key={j} className={`border-l-4 pl-3 text-sm ${KIND_STYLE[b.kind]}`}>
                    <span className="text-slate-400 mr-2">{b.time}</span>{b.label}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="text-slate-500 text-xs mt-4">
        Après le 3 décembre (fin du cours CPNL) : garde 15 min de catalan par jour et donne le reste à l’espagnol.
        De mars à mai : remplace la grammaire du lundi et du jeudi par des examens modèles chronométrés.
      </p>
    </section>
  );
}

// ───────────────────────── Parcours subjonctif ─────────────────────────

function SubjunctivePath() {
  const router = useRouter();
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const refresh = () => setScores(getAllTopicScores());
    refresh();
    window.addEventListener('ss-topic-updated', refresh);
    return () => window.removeEventListener('ss-topic-updated', refresh);
  }, []);

  const titles = useMemo(() => {
    const m: Record<string, string> = {};
    grammarPoints.forEach((p) => { if (!m[p.id]) m[p.id] = p.title.fr; });
    return m;
  }, []);

  const allIds = PATH.flatMap((g) => g.ids);
  const done = allIds.filter((id) => (scores[id] ?? 0) >= 80).length;

  const open = (id: string) => {
    // Force le filtre espagnol pour que le lien direct trouve le module
    writeLS('ss-grammar-lang-filter', 'spanish');
    router.push(`/grammaire/?point=${id}`);
  };

  return (
    <section>
      <p className="text-slate-300 mb-1">
        <span className="font-bold text-white">{done}</span> / {allIds.length} modules maîtrisés (80 % et plus)
      </p>
      <div className="h-2 bg-slate-800 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-blue-500 transition-all" style={{ width: `${(done / allIds.length) * 100}%` }} />
      </div>

      {PATH.map((g) => (
        <div key={g.group} className="mb-6">
          <h2 className="font-bold text-lg mb-2">{g.group}</h2>
          <ol className="space-y-2">
            {g.ids.map((id) => {
              const s = scores[id];
              const mastered = (s ?? 0) >= 80;
              return (
                <li key={id}>
                  <button
                    onClick={() => open(id)}
                    className="w-full text-left bg-slate-900 hover:bg-slate-800 rounded-lg px-4 py-3 flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${mastered ? 'bg-emerald-600' : 'bg-slate-700'}`}>
                      {mastered ? '✓' : ''}
                    </span>
                    <span className="flex-1 text-sm">{titles[id] ?? id}</span>
                    <span className="text-xs text-slate-400 tabular-nums">{s !== undefined ? `${s} %` : '—'}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </section>
  );
}
