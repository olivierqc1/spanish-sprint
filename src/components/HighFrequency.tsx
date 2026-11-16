'use client';

// Les 2 000 mots les plus fréquents (catalan ou espagnol), par paquets de 100.
// Mode Liste pour lire et cocher, mode Test pour vérifier ce que tu connais vraiment.
// Un mot raté au test part dans le repàs espaiat (carte « freq:<langue>:<rang> »).
import { useEffect, useMemo, useState } from 'react';
import { frequencyLists, type FreqWord } from '@/data/frequency';
import { recordActivity } from '@/data/activityLog';
import { loadKnown, saveKnown, type FreqLang } from '@/data/frequency/known';
import { getAllProgress, getCardProgress, saveCardProgress } from '@/utils/srs-storage';
import { calculateNextReview } from '@/utils/srs-algorithm';

type Lang = FreqLang;
const LANG_KEY = 'iberian-sprint-target-language';
const BAND = 100;

// Met à jour la carte de révision espacée d'un mot fréquent.
// Raté → à revoir demain. Su → l'intervalle s'allonge, seulement si la carte existe déjà.
function updateSrs(lang: Lang, rank: number, ok: boolean): void {
  try {
    const id = `freq:${lang}:${rank}`;
    if (ok && !getAllProgress()[id]) return;
    saveCardProgress(calculateNextReview(getCardProgress(id), ok ? 'good' : 'again'));
  } catch {
    /* stockage indisponible : on ignore */
  }
}

function speak(text: string, lang: Lang): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  const code = lang === 'catalan' ? 'ca-ES' : 'es-ES';
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const v =
    synth.getVoices().find((x) => x.lang.toLowerCase() === code.toLowerCase()) ||
    synth.getVoices().find((x) => x.lang.toLowerCase().startsWith(code.slice(0, 2))) ||
    null;
  if (v) u.voice = v;
  u.lang = v?.lang || code;
  u.rate = 0.9;
  synth.speak(u);
}

export default function HighFrequency() {
  const [lang, setLang] = useState<Lang>('catalan');
  const [band, setBand] = useState(0);
  const [known, setKnown] = useState<Record<Lang, string[]>>({ catalan: [], spanish: [] });
  const [mode, setMode] = useState<'list' | 'test'>('list');
  const [hideFr, setHideFr] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  // test
  const [queue, setQueue] = useState<number[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [testStats, setTestStats] = useState({ ok: 0, ko: 0 });

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'spanish' || saved === 'catalan') setLang(saved);
    setKnown(loadKnown());
  }, []);

  const list: FreqWord[] = frequencyLists[lang];
  const bands = Math.ceil(list.length / BAND);
  const start = band * BAND;
  const slice = useMemo(() => list.slice(start, start + BAND), [list, start]);
  const knownSet = useMemo(() => new Set(known[lang]), [known, lang]);
  const knownInBand = slice.filter(([w]) => knownSet.has(w)).length;
  const totalKnown = list.filter(([w]) => knownSet.has(w)).length;

  const setWordKnown = (w: string, value: boolean) => {
    setKnown((prev) => {
      const s = new Set(prev[lang]);
      if (value) s.add(w);
      else s.delete(w);
      const next = { ...prev, [lang]: Array.from(s) };
      saveKnown(next);
      return next;
    });
  };

  const markBand = (value: boolean) => {
    setKnown((prev) => {
      const s = new Set(prev[lang]);
      slice.forEach(([w]) => (value ? s.add(w) : s.delete(w)));
      const next = { ...prev, [lang]: Array.from(s) };
      saveKnown(next);
      return next;
    });
  };

  const startTest = () => {
    // les mots pas encore connus d'abord ; si tout est connu, on teste tout le paquet
    const unknown = slice.map((_, i) => i).filter((i) => !knownSet.has(slice[i][0]));
    const base = unknown.length > 0 ? unknown : slice.map((_, i) => i);
    const shuffled = [...base].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setFlipped(false);
    setTestStats({ ok: 0, ko: 0 });
    setMode('test');
  };

  const answerTest = (ok: boolean) => {
    const i = queue[0];
    if (i === undefined) return;
    setWordKnown(slice[i][0], ok);
    updateSrs(lang, start + i + 1, ok);
    setTestStats((s) => ({ ok: s.ok + (ok ? 1 : 0), ko: s.ko + (ok ? 0 : 1) }));
    setQueue((q) => q.slice(1));
    setFlipped(false);
    if (queue.length === 1) recordActivity();
  };

  const changeLang = (l: Lang) => {
    setLang(l);
    setBand(0);
    setMode('list');
    setRevealed(new Set());
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      /* ignore */
    }
  };

  const changeBand = (b: number) => {
    setBand(b);
    setMode('list');
    setRevealed(new Set());
  };

  const pct = Math.round((totalKnown / list.length) * 100);
  const current = queue[0] !== undefined ? slice[queue[0]] : null;

  return (
    <section className="space-y-5">
      <div className="bg-slate-800 rounded-lg p-1 flex gap-1 w-fit">
        {(['catalan', 'spanish'] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => changeLang(l)}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold ${lang === l ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
          >
            {l === 'catalan' ? 'Català' : 'Español'}
          </button>
        ))}
      </div>

      {/* Progression globale */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-black">Les 2 000 mots les plus fréquents</h2>
          <span className="text-sm font-bold text-emerald-400">
            {totalKnown}/{list.length}
          </span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
          <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-slate-400 mt-3">
          Quelques mots reviennent tout le temps : environ 1 000 mots couvrent déjà 80 % de ce qu&apos;on entend au
          quotidien, et 2 000 près de 90 %. Coche ceux que tu connais, puis vérifie-toi en mode Test : les mots ratés
          partent dans ton repàs espaiat, et ceux que tu n&apos;as pas cochés sont soulignés en vert dans les épisodes
          d&apos;input compréhensible.
        </p>
      </div>

      {/* Paquets de 50 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Array.from({ length: bands }, (_, b) => {
          const s = list.slice(b * BAND, b * BAND + BAND);
          const k = s.filter(([w]) => knownSet.has(w)).length;
          return (
            <button
              key={b}
              onClick={() => changeBand(b)}
              className={`shrink-0 px-3 py-2 rounded-xl text-xs font-semibold ${
                b === band ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {b * BAND + 1}–{b * BAND + s.length}
              <span className={`block text-[10px] ${k === s.length ? 'text-emerald-300' : 'opacity-70'}`}>
                {k === s.length ? '✓ ' : ''}
                {k}/{s.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Barre d'actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setMode('list')}
          className={`px-3 py-2 rounded-xl text-sm font-bold ${mode === 'list' ? 'bg-slate-600' : 'bg-slate-800'}`}
        >
          📋 Liste
        </button>
        <button
          onClick={startTest}
          className={`px-3 py-2 rounded-xl text-sm font-bold ${mode === 'test' ? 'bg-slate-600' : 'bg-slate-800'}`}
        >
          🎯 Test
        </button>
        {mode === 'list' && (
          <>
            <button onClick={() => setHideFr((v) => !v)} className="px-3 py-2 rounded-xl text-sm bg-slate-800">
              {hideFr ? '👁 Montrer le français' : '🙈 Cacher le français'}
            </button>
            <button
              onClick={() => markBand(knownInBand !== slice.length)}
              className="px-3 py-2 rounded-xl text-sm bg-slate-800"
            >
              {knownInBand === slice.length ? 'Tout décocher' : 'Tout cocher'}
            </button>
          </>
        )}
      </div>

      {mode === 'list' ? (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 divide-y divide-slate-800">
          {slice.map(([w, fr], i) => {
            const isKnown = knownSet.has(w);
            const showFr = !hideFr || revealed.has(i);
            return (
              <div key={w} className="flex items-center gap-3 px-4 py-2">
                <span className="w-10 text-xs text-slate-500 text-right shrink-0">{start + i + 1}</span>
                <button onClick={() => speak(w, lang)} className="text-left flex-1 min-w-0">
                  <span className="font-semibold text-slate-100">{w}</span>
                  <span className="text-xs text-slate-500"> 🔊</span>
                </button>
                <button
                  onClick={() =>
                    setRevealed((s) => {
                      const n = new Set(s);
                      if (n.has(i)) n.delete(i);
                      else n.add(i);
                      return n;
                    })
                  }
                  className="text-sm text-slate-400 text-right flex-1 min-w-0"
                >
                  {showFr ? fr : '···'}
                </button>
                <button
                  onClick={() => setWordKnown(w, !isKnown)}
                  aria-label={isKnown ? 'Je ne le connais pas' : 'Je le connais'}
                  className={`w-8 h-8 rounded-lg shrink-0 text-sm ${isKnown ? 'bg-emerald-600' : 'bg-slate-800 text-slate-500'}`}
                >
                  ✓
                </button>
              </div>
            );
          })}
        </div>
      ) : current ? (
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-center space-y-5">
          <p className="text-xs text-slate-500">
            Encore {queue.length} · ✓ {testStats.ok} · ✗ {testStats.ko}
          </p>
          <button onClick={() => speak(current[0], lang)} className="text-3xl font-black">
            {current[0]} <span className="text-base">🔊</span>
          </button>
          {flipped ? (
            <>
              <p className="text-lg text-slate-300">{current[1]}</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => answerTest(false)} className="py-3 rounded-xl font-bold bg-rose-800">
                  ✗ À revoir
                </button>
                <button onClick={() => answerTest(true)} className="py-3 rounded-xl font-bold bg-emerald-600">
                  ✓ Je savais
                </button>
              </div>
            </>
          ) : (
            <button onClick={() => setFlipped(true)} className="w-full py-3 rounded-xl font-bold bg-blue-600">
              Voir la traduction
            </button>
          )}
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-center space-y-3">
          <p className="text-lg font-bold">
            Test terminé : ✓ {testStats.ok} · ✗ {testStats.ko}
          </p>
          <p className="text-sm text-slate-400">
            Tu connais {knownInBand}/{slice.length} mots de ce paquet.
          </p>
          <div className="flex gap-2 justify-center">
            <button onClick={startTest} className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-800">
              Recommencer
            </button>
            {band < bands - 1 && (
              <button onClick={() => changeBand(band + 1)} className="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-600">
                Paquet suivant →
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
