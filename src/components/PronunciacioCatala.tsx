'use client';
// src/components/PronunciacioCatala.tsx
// Pratique de prononciation catalane : TTS (écouter) + reconnaissance vocale (répéter)
// Fonctionne dans Chrome Android (ca-ES). iOS Safari : support partiel.

import { useState, useEffect, useRef, useCallback } from 'react';
import { catalanNotebookCards, CatalanCard } from '../data/words/catalan/A2_notebook';

// ─── Utils de comparaison ────────────────────────────────────────────
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // enlève les accents (tolérance)
    .replace(/[.,!?;:'’·\-\/()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
}

function similarity(target: string, heard: string): number {
  const t = normalize(target);
  const h = normalize(heard);
  if (!t || !h) return 0;
  if (t === h) return 100;
  // Le mot cible apparaît dans la phrase entendue → très bon
  if (h.includes(t)) return 95;
  const dist = levenshtein(t, h);
  const score = Math.round((1 - dist / Math.max(t.length, h.length)) * 100);
  return Math.max(0, score);
}

// Ne garde que la partie catalane à prononcer (avant les / et parenthèses)
function speakableTarget(front: string): string {
  return front.split('/')[0].replace(/\(.*?\)/g, '').trim();
}

type Feedback = { score: number; heard: string } | null;

export default function PronunciacioCatala() {
  const [category, setCategory] = useState<string>('totes');
  const [index, setIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const [hasCatalanVoice, setHasCatalanVoice] = useState(true);
  const [stats, setStats] = useState({ tries: 0, good: 0 });
  const recognitionRef = useRef<any>(null);

  const categories = ['totes', ...Array.from(new Set(catalanNotebookCards.map(c => c.category)))];
  const cards: CatalanCard[] = category === 'totes'
    ? catalanNotebookCards
    : catalanNotebookCards.filter(c => c.category === category);
  const card = cards[index % cards.length];

  // ─── Vérifie le support navigateur ─────────────────────────────────
  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) setSupported(false);
    const checkVoices = () => {
      const voices = window.speechSynthesis?.getVoices() || [];
      setHasCatalanVoice(voices.some(v => v.lang.toLowerCase().startsWith('ca')));
    };
    checkVoices();
    window.speechSynthesis?.addEventListener?.('voiceschanged', checkVoices);
    return () => window.speechSynthesis?.removeEventListener?.('voiceschanged', checkVoices);
  }, []);

  // ─── Écouter le mot (TTS) ──────────────────────────────────────────
  const speak = useCallback((slow = false) => {
    if (!window.speechSynthesis || !card) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(speakableTarget(card.front));
    u.lang = 'ca-ES';
    u.rate = slow ? 0.6 : 0.9;
    const voice = window.speechSynthesis.getVoices().find(v => v.lang.toLowerCase().startsWith('ca'));
    if (voice) u.voice = voice;
    window.speechSynthesis.speak(u);
  }, [card]);

  // ─── Enregistrer et comparer ───────────────────────────────────────
  const startListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR || !card) return;
    setError(null);
    setFeedback(null);

    const rec = new SR();
    recognitionRef.current = rec;
    rec.lang = 'ca-ES';
    rec.interimResults = false;
    rec.maxAlternatives = 5;

    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onerror = (e: any) => {
      setListening(false);
      if (e.error === 'no-speech') setError("Je n'ai rien entendu — réessaie plus proche du micro.");
      else if (e.error === 'not-allowed') setError('Accès au micro refusé. Autorise-le dans les réglages du navigateur.');
      else setError(`Erreur de reconnaissance : ${e.error}`);
    };
    rec.onresult = (e: any) => {
      const target = speakableTarget(card.front);
      // Prend la meilleure des alternatives proposées
      let best = { score: 0, heard: '' };
      for (let i = 0; i < e.results[0].length; i++) {
        const heard = e.results[0][i].transcript as string;
        const s = similarity(target, heard);
        if (s > best.score) best = { score: s, heard };
      }
      if (!best.heard) best.heard = e.results[0][0]?.transcript || '';
      setFeedback(best);
      setStats(prev => ({ tries: prev.tries + 1, good: prev.good + (best.score >= 75 ? 1 : 0) }));
    };

    try {
      rec.start();
    } catch {
      setError('Impossible de démarrer le micro.');
    }
  }, [card]);

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const next = () => {
    setFeedback(null);
    setError(null);
    setIndex(i => (i + 1) % cards.length);
  };

  const changeCategory = (cat: string) => {
    setCategory(cat);
    setIndex(0);
    setFeedback(null);
    setError(null);
  };

  const scoreColor = (s: number) =>
    s >= 90 ? 'text-green-500' : s >= 75 ? 'text-lime-500' : s >= 50 ? 'text-amber-500' : 'text-red-500';

  const scoreMessage = (s: number) =>
    s >= 90 ? 'Perfecte! 🎉' : s >= 75 ? 'Molt bé! 👏' : s >= 50 ? 'Gairebé — réécoute et réessaie' : 'Torna-ho a provar 💪';

  if (!supported) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">🎤 Pronunciació</h1>
        <p className="text-slate-500">
          Ton navigateur ne supporte pas la reconnaissance vocale.
          Utilise <strong>Chrome sur Android</strong> pour cette fonction.
          Le bouton 🔊 Écouter fonctionne quand même :
        </p>
        <button
          onClick={() => speak()}
          className="mt-4 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold"
        >
          🔊 Écouter « {card ? speakableTarget(card.front) : ''} »
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 pb-24">
      <h1 className="text-2xl font-bold mb-1">🎤 Pronunciació catalana</h1>
      <p className="text-sm text-slate-500 mb-4">
        Écoute le mot, répète-le au micro, et vois si on te comprend.
      </p>

      {!hasCatalanVoice && (
        <p className="text-xs text-amber-600 mb-3">
          ⚠️ Aucune voix catalane détectée sur cet appareil — le TTS peut sonner espagnol.
          (Android : Paramètres → Synthèse vocale → installer « català »)
        </p>
      )}

      {/* Filtre catégories */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap border ${
              category === cat
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-transparent text-slate-600 border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Carte */}
      <div className="rounded-2xl border border-slate-200 shadow-sm p-6 text-center bg-white dark:bg-slate-800 dark:border-slate-700">
        <p className="text-xs text-slate-400 mb-2">
          {index % cards.length + 1} / {cards.length} · {card.category}
        </p>
        <p className="text-3xl font-bold mb-1">{card.front}</p>
        <p className="text-slate-500 mb-5">{card.back}</p>

        <div className="flex justify-center gap-3 flex-wrap">
          <button
            onClick={() => speak(false)}
            className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 font-medium"
          >
            🔊 Écouter
          </button>
          <button
            onClick={() => speak(true)}
            className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 font-medium"
          >
            🐢 Lent
          </button>
          <button
            onClick={listening ? stopListening : startListening}
            className={`px-5 py-3 rounded-xl font-semibold text-white ${
              listening ? 'bg-red-500 animate-pulse' : 'bg-blue-600'
            }`}
          >
            {listening ? '⏹ Stop' : '🎤 Prononcer'}
          </button>
        </div>

        {listening && (
          <p className="mt-4 text-sm text-blue-500">Parle maintenant… je t'écoute 👂</p>
        )}

        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        {feedback && (
          <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
            <p className={`text-4xl font-bold ${scoreColor(feedback.score)}`}>
              {feedback.score}%
            </p>
            <p className="font-medium mt-1">{scoreMessage(feedback.score)}</p>
            <p className="text-sm text-slate-500 mt-2">
              J'ai entendu : « <em>{feedback.heard || '…'}</em> »
            </p>
            <p className="text-sm text-slate-400">
              Cible : « {speakableTarget(card.front)} »
            </p>
          </div>
        )}
      </div>

      {/* Navigation + stats */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-slate-500">
          ✅ {stats.good} / {stats.tries} réussis (≥75 %)
        </p>
        <button
          onClick={next}
          className="px-5 py-2.5 rounded-xl bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 font-medium"
        >
          Suivant →
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-6">
        💡 Astuce : la reconnaissance est tolérante aux accents écrits, mais pas aux sons.
        Attention aux pièges catalans : la « x » de <em>xandall</em> = « ch », le « ll » de
        <em> genoll</em>, et la vocal neutra des finales en -a/-e.
      </p>
    </div>
  );
}