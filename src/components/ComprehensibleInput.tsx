'use client';

// Input compréhensible : une histoire en épisodes (catalan ou espagnol),
// à écouter et lire, avec traduction d'une phrase en un tap et questions de compréhension.
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { inputSeries, type InputEpisode, type InputLang } from '@/data/input';
import { recordActivity } from '@/data/activityLog';

const PROGRESS_KEY = 'ss_input_progress_v1'; // { [episodeId]: score sur 3 }
const TIME_KEY = 'ss_input_seconds_v1'; // { catalan: secondes, spanish: secondes }
const LANG_KEY = 'iberian-sprint-target-language';
const SPEEDS = [0.7, 0.85, 1];

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* stockage plein ou bloqué : on ignore */
  }
}

// minuscules, sans accents, sans ponctuation au début et à la fin
function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/^[^a-z0-9ñç]+|[^a-z0-9ñç]+$/g, '');
}

// Cherche un mot dans le glossaire : tel quel, sans l'/d'/s'…, puis avant un tiret (tastar-la).
function lookup(token: string, gloss: Record<string, string>): string | null {
  const t = norm(token);
  if (!t) return null;
  const noElision = t.replace(/^(l|d|s|n|m|t)'/, '');
  const candidates = [t, noElision, t.split('-')[0], noElision.split('-')[0]];
  for (const c of candidates) if (gloss[c]) return gloss[c];
  return null;
}

function formatTime(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

export default function ComprehensibleInput() {
  const [lang, setLang] = useState<InputLang>('catalan');
  const [episodeId, setEpisodeId] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [seconds, setSeconds] = useState<Record<InputLang, number>>({ catalan: 0, spanish: 0 });
  const [shown, setShown] = useState<Set<number>>(new Set()); // phrases dont la traduction est affichée
  const [allFr, setAllFr] = useState(false);
  const [hideText, setHideText] = useState(false);
  const [showWords, setShowWords] = useState(false);
  const [picked, setPicked] = useState<{ word: string; gloss: string } | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [qFr, setQFr] = useState<Set<number>>(new Set());
  const [speed, setSpeed] = useState(0.85);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);
  const playingRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'spanish' || saved === 'catalan') setLang(saved);
    setProgress(readJson(PROGRESS_KEY, {}));
    setSeconds({ catalan: 0, spanish: 0, ...readJson(TIME_KEY, {}) });
  }, []);

  const series = inputSeries[lang];
  const voiceLang = lang === 'catalan' ? 'ca-ES' : 'es-ES';
  const episodeIndex = series.episodes.findIndex((e) => e.id === episodeId);
  const episode: InputEpisode | null = episodeIndex >= 0 ? series.episodes[episodeIndex] : null;

  const gloss = useMemo(() => {
    const out: Record<string, string> = {};
    if (episode) for (const [k, v] of Object.entries(episode.words)) out[norm(k)] = v;
    return out;
  }, [episode]);

  // Compteur de temps d'input : avance seulement quand un épisode est ouvert et l'onglet visible.
  useEffect(() => {
    if (!episode) return;
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      setSeconds((prev) => {
        const next = { ...prev, [lang]: (prev[lang] || 0) + 5 };
        writeJson(TIME_KEY, next);
        return next;
      });
    }, 5000);
    return () => window.clearInterval(id);
  }, [episode, lang]);

  const stopAudio = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    setCurrent(null);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  // coupe l'audio si on quitte l'épisode ou la page
  useEffect(() => stopAudio, [episodeId, lang, stopAudio]);

  const speakOne = useCallback(
    (text: string, onEnd?: () => void) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      const synth = window.speechSynthesis;
      const u = new SpeechSynthesisUtterance(text);
      const voices = synth.getVoices();
      const v =
        voices.find((x) => x.lang.toLowerCase() === voiceLang.toLowerCase()) ||
        voices.find((x) => x.lang.toLowerCase().startsWith(voiceLang.slice(0, 2))) ||
        null;
      if (v) u.voice = v;
      u.lang = v?.lang || voiceLang;
      u.rate = speed;
      if (onEnd) {
        u.onend = onEnd;
        u.onerror = onEnd;
      }
      synth.speak(u);
    },
    [speed, voiceLang]
  );

  const playFrom = useCallback(
    (i: number) => {
      if (!episode || !playingRef.current) return;
      if (i >= episode.sentences.length) {
        stopAudio();
        return;
      }
      setCurrent(i);
      speakOne(episode.sentences[i][0], () => {
        if (playingRef.current) playFrom(i + 1);
      });
    },
    [episode, speakOne, stopAudio]
  );

  const playAll = () => {
    if (playing) {
      stopAudio();
      return;
    }
    window.speechSynthesis?.cancel();
    playingRef.current = true;
    setPlaying(true);
    playFrom(0);
  };

  const speakSentence = (i: number) => {
    stopAudio();
    if (!episode) return;
    setCurrent(i);
    speakOne(episode.sentences[i][0], () => setCurrent(null));
  };

  const openEpisode = (id: string) => {
    setEpisodeId(id);
    setShown(new Set());
    setAllFr(false);
    setPicked(null);
    setAnswers({});
    setQFr(new Set());
    setShowWords(false);
    window.scrollTo?.({ top: 0 });
  };

  const changeLang = (l: InputLang) => {
    setLang(l);
    setEpisodeId(null);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      /* ignore */
    }
  };

  const toggleSet = (set: Set<number>, i: number): Set<number> => {
    const next = new Set(set);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    return next;
  };

  const answer = (qi: number, oi: number) => {
    if (!episode || answers[qi] !== undefined) return;
    const next = { ...answers, [qi]: oi };
    setAnswers(next);
    if (Object.keys(next).length === episode.questions.length) {
      const score = episode.questions.filter((q, i) => next[i] === q.answer).length;
      const best = Math.max(score, progress[episode.id] ?? 0);
      const p = { ...progress, [episode.id]: best };
      setProgress(p);
      writeJson(PROGRESS_KEY, p);
      recordActivity();
    }
  };

  const renderSentence = (text: string): ReactNode[] =>
    text.split(/(\s+)/).map((tok, i) => {
      const g = /^\s+$/.test(tok) ? null : lookup(tok, gloss);
      if (!g) return <span key={i}>{tok}</span>;
      return (
        <span
          key={i}
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            setPicked({ word: tok.replace(/^[^0-9A-Za-zÀ-ÿ]+|[^0-9A-Za-zÀ-ÿ]+$/g, ''), gloss: g });
          }}
          className="underline decoration-dotted decoration-amber-400 underline-offset-4 text-amber-100"
        >
          {tok}
        </span>
      );
    });

  const langSwitch = (
    <div className="bg-slate-800 rounded-lg p-1 flex gap-1 w-fit">
      {(['catalan', 'spanish'] as InputLang[]).map((l) => (
        <button
          key={l}
          onClick={() => changeLang(l)}
          className={`px-3 py-1.5 rounded-md text-sm font-semibold ${lang === l ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
        >
          {l === 'catalan' ? 'Català' : 'Español'}
        </button>
      ))}
    </div>
  );

  // ── LISTE DES ÉPISODES ──
  if (!episode) {
    const done = series.episodes.filter((e) => progress[e.id] !== undefined).length;
    return (
      <section className="space-y-5">
        {langSwitch}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
          <h2 className="text-xl font-black">{series.title}</h2>
          <p className="text-sm text-slate-300 mt-1">{series.intro}</p>
          <div className="flex gap-4 mt-3 text-xs text-slate-400">
            <span>
              ✓ {done}/{series.episodes.length} épisodes
            </span>
            <span>⏱ {formatTime(seconds[lang] || 0)} d&apos;input</span>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Le principe : écouter et lire beaucoup de langue que tu comprends presque entièrement. Écoute d&apos;abord sans
            lire, puis relis, et ne touche la traduction que si tu bloques.
          </p>
        </div>
        <div className="space-y-2">
          {series.episodes.map((e, i) => (
            <button
              key={e.id}
              onClick={() => openEpisode(e.id)}
              className="w-full text-left bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-xs text-slate-500">Épisode {i + 1}</div>
                <div className="font-bold">{e.title}</div>
                <div className="text-xs text-slate-400">{e.titleFr}</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-bold bg-slate-800 px-2 py-1 rounded-full">{e.level}</span>
                {progress[e.id] !== undefined && (
                  <span className="text-xs text-emerald-400">
                    ✓ {progress[e.id]}/{e.questions.length}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  // ── LECTEUR D'ÉPISODE ──
  const allAnswered = Object.keys(answers).length === episode.questions.length;
  const score = episode.questions.filter((q, i) => answers[i] === q.answer).length;
  const nextEpisode = series.episodes[episodeIndex + 1];

  return (
    <section className="space-y-5">
      <button onClick={() => setEpisodeId(null)} className="text-blue-400 text-sm font-semibold">
        ← Tous les épisodes
      </button>

      <article className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-xs text-slate-500">
              {series.title} · épisode {episodeIndex + 1}
            </div>
            <h2 className="text-xl font-black">{episode.title}</h2>
          </div>
          <span className="text-xs font-bold bg-slate-800 px-2 py-1 rounded-full">{episode.level}</span>
        </div>

        {/* Contrôles audio et affichage */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button onClick={playAll} className="px-3 py-2 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500">
            {playing ? '⏹ Stop' : '▶️ Écouter tout'}
          </button>
          <div className="flex bg-slate-800 rounded-xl p-1">
            {SPEEDS.map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 rounded-lg text-xs font-semibold ${speed === s ? 'bg-slate-600' : 'text-slate-400'}`}
              >
                {s === 1 ? 'Normal' : s === 0.85 ? 'Lent' : 'Très lent'}
              </button>
            ))}
          </div>
          <button
            onClick={() => setHideText((v) => !v)}
            className="px-3 py-2 rounded-xl text-sm bg-slate-800 hover:bg-slate-700"
          >
            {hideText ? '👁 Afficher le texte' : '🎧 Écoute seule'}
          </button>
          <button onClick={() => setAllFr((v) => !v)} className="px-3 py-2 rounded-xl text-sm bg-slate-800 hover:bg-slate-700">
            {allFr ? 'Masquer le français' : 'Tout traduire'}
          </button>
        </div>

        {/* Mots clés */}
        <button onClick={() => setShowWords((v) => !v)} className="mt-4 text-xs text-amber-300 font-semibold">
          {showWords ? '▾' : '▸'} Mots clés ({Object.keys(episode.words).length})
        </button>
        {showWords && (
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(episode.words).map(([w, g]) => (
              <span key={w} className="text-xs bg-slate-800 rounded-lg px-2 py-1">
                <span className="text-amber-100 font-semibold">{w}</span> <span className="text-slate-400">· {g}</span>
              </span>
            ))}
          </div>
        )}

        {/* Texte */}
        {hideText ? (
          <p className="mt-5 text-sm text-slate-400">
            🎧 Écoute l&apos;épisode sans lire. Essaie de comprendre l&apos;histoire, puis affiche le texte pour vérifier.
            {current !== null && ` (phrase ${current + 1}/${episode.sentences.length})`}
          </p>
        ) : (
          <div className="mt-5 space-y-3">
            {episode.sentences.map(([t, fr], i) => (
              <div
                key={i}
                onClick={() => setShown((s) => toggleSet(s, i))}
                className={`rounded-xl p-2 -mx-2 cursor-pointer transition ${current === i ? 'bg-blue-950/60' : ''}`}
              >
                <div className="flex gap-2 items-start">
                  <p className="text-lg leading-relaxed text-slate-100 flex-1">{renderSentence(t)}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakSentence(i);
                    }}
                    className="text-slate-500 hover:text-white text-sm pt-1"
                    aria-label="Écouter la phrase"
                  >
                    🔊
                  </button>
                </div>
                {(allFr || shown.has(i)) && <p className="text-sm text-slate-400 italic mt-1">{fr}</p>}
              </div>
            ))}
            <p className="text-xs text-slate-500">Tape une phrase pour la traduction, un mot souligné pour son sens.</p>
          </div>
        )}

        {picked && (
          <div className="mt-4 flex items-center justify-between bg-amber-950/40 border border-amber-800 rounded-xl p-3">
            <div>
              <span className="font-bold text-amber-200">{picked.word}</span>
              <span className="text-slate-400 mx-2">→</span>
              <span className="text-slate-100">{picked.gloss}</span>
            </div>
            <button onClick={() => setPicked(null)} className="text-slate-500 hover:text-white text-sm">
              ✕
            </button>
          </div>
        )}
      </article>

      {/* Questions */}
      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-5">
        <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">❓ As-tu compris ?</p>
        {episode.questions.map((q, qi) => {
          const chosen = answers[qi];
          return (
            <div key={qi}>
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold">{q.q}</p>
                <button onClick={() => setQFr((s) => toggleSet(s, qi))} className="text-xs text-slate-500 shrink-0">
                  FR
                </button>
              </div>
              {qFr.has(qi) && <p className="text-xs text-slate-400 italic">{q.qFr}</p>}
              <div className="grid gap-2 mt-2">
                {q.options.map((o, oi) => {
                  let cls = 'bg-slate-800 hover:bg-slate-700';
                  if (chosen !== undefined) {
                    if (oi === q.answer) cls = 'bg-emerald-700';
                    else if (oi === chosen) cls = 'bg-rose-800';
                    else cls = 'bg-slate-800 opacity-60';
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => answer(qi, oi)}
                      disabled={chosen !== undefined}
                      className={`text-left px-3 py-2 rounded-xl text-sm ${cls}`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {allAnswered && (
          <div className="pt-2 space-y-3">
            <p className="font-bold">
              {score === episode.questions.length ? '🎉' : '👍'} {score}/{episode.questions.length} bonnes réponses
            </p>
            {nextEpisode ? (
              <button
                onClick={() => openEpisode(nextEpisode.id)}
                className="w-full py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500"
              >
                Épisode suivant : {nextEpisode.title} →
              </button>
            ) : (
              <p className="text-sm text-emerald-300">Tu as fini la série. Bravo !</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
