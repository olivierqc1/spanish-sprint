// src/components/ComprensionAudio.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { recordAnswer } from '@/data/progress';
import { comprensionTexts } from '@/data/comprension';

type Question = { q: string; options: string[]; correct: number };
type Passage = { title: string; text: string; fr: string; questions: Question[] };

export default function ComprensionAudio({ language = 'fr' }: { language?: 'fr' | 'en' }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [passage, setPassage] = useState<Passage | null>(null);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showText, setShowText] = useState(false);
  const [slow, setSlow] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [noVoice, setNoVoice] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Charge une voix espagnole (asynchrone sur mobile).
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) { setNoVoice(true); return; }
    const pick = () => {
      const v = window.speechSynthesis.getVoices();
      if (!v.length) return false;
      const es = v.find((x) => x.lang && x.lang.toLowerCase().startsWith('es'));
      voiceRef.current = es || null;
      setNoVoice(!es);
      return true;
    };
    if (!pick()) { window.speechSynthesis.onvoiceschanged = () => pick(); setTimeout(pick, 700); }
    return () => { if (window.speechSynthesis) window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const t = language === 'fr'
    ? { heading: 'Compréhension orale', sub: (n: number) => `${n} texte${n > 1 ? 's' : ''}`, listen: 'Écouter le texto', stop: 'Arrêter', slow: 'Lent', check: 'Vérifier', back: '← Retour', showText: 'Voir le texte', hideText: 'Masquer', score: 'Score', loading: 'Chargement…', novoice: '⚠️ Aucune voix espagnole sur cet appareil (Réglages → Synthèse vocale → installer l’espagnol).' }
    : { heading: 'Listening comprehension', sub: (n: number) => `${n} text${n > 1 ? 's' : ''}`, listen: 'Play text', stop: 'Stop', slow: 'Slow', check: 'Check', back: '← Back', showText: 'Show text', hideText: 'Hide', score: 'Score', loading: 'Loading…', novoice: '⚠️ No Spanish voice on this device.' };

  const open = async (id: string) => {
    setLoading(true);
    setOpenId(id);
    setSelected({}); setSubmitted(false); setShowText(false);
    try {
      const mod = await import(`@/data/comprension/${id}.json`);
      setPassage((mod.default || mod) as Passage);
    } catch {
      setPassage(null);
    } finally {
      setLoading(false);
    }
  };

  const back = () => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setOpenId(null);
    setPassage(null);
  };

  const speak = () => {
    if (noVoice || !passage || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (speaking) { setSpeaking(false); return; }
    const u = new SpeechSynthesisUtterance(passage.text);
    u.lang = 'es-ES';
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = slow ? 0.7 : 0.92;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(u);
    setTimeout(() => { try { window.speechSynthesis.resume(); } catch {} }, 250);
  };

  // ----- Vue liste -----
  if (!openId) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">🎧 {t.heading}</h3>
          <span className="text-xs text-slate-500">{t.sub(comprensionTexts.length)}</span>
        </div>
        <div className="space-y-2">
          {comprensionTexts.map((c) => (
            <button key={c.id} onClick={() => open(c.id)}
              className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4 text-left transition hover:border-slate-600 hover:bg-slate-800">
              <span className="text-white font-medium">{c.title}</span>
              <span className="flex items-center gap-2 flex-shrink-0">
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-400/15 text-rose-300">{c.level}</span>
                <span className="text-slate-500">→</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ----- Vue exercice -----
  if (loading || !passage) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center max-w-2xl mx-auto">
        <button onClick={back} className="text-sm text-blue-400 hover:text-blue-300 float-left">{t.back}</button>
        <p className="text-slate-400 pt-6">{t.loading}</p>
      </div>
    );
  }

  const allAnswered = passage.questions.every((_, qi) => selected[qi] !== undefined);
  const score = passage.questions.reduce((n, q, qi) => n + (selected[qi] === q.correct ? 1 : 0), 0);

  const check = () => {
    setSubmitted(true);
    setShowText(true);
    passage.questions.forEach((q, qi) => recordAnswer(selected[qi] === q.correct));
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <button onClick={back} className="text-sm text-blue-400 hover:text-blue-300">{t.back}</button>
      </div>
      <h3 className="text-lg font-bold text-white mb-3">{passage.title}</h3>

      {noVoice && (
        <div className="mb-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-300 text-sm">{t.novoice}</div>
      )}

      <div className="flex items-center gap-2 mb-4">
        <button onClick={speak} disabled={noVoice}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 px-4 py-2.5 rounded-xl font-bold transition">
          {speaking ? `⏸ ${t.stop}` : `▶️ ${t.listen}`}
        </button>
        <button onClick={() => setSlow(!slow)} disabled={noVoice}
          className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition border disabled:opacity-40 ${slow ? 'bg-blue-600/20 border-blue-600 text-blue-300' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
          🐢 {t.slow}
        </button>
        <button onClick={() => setShowText(!showText)} className="ml-auto text-sm text-blue-400 hover:text-blue-300 transition">
          {showText ? t.hideText : t.showText}
        </button>
      </div>

      {showText && (
        <div className="mb-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
          <p className="text-slate-200 leading-relaxed">{passage.text}</p>
          {submitted && <p className="text-sm text-slate-500 italic mt-2">{passage.fr}</p>}
        </div>
      )}

      <div className="space-y-4">
        {passage.questions.map((q, qi) => (
          <div key={qi}>
            <p className="text-white font-medium mb-2">{qi + 1}. {q.q}</p>
            <div className="grid grid-cols-1 gap-1.5">
              {q.options.map((opt, oi) => {
                const chosen = selected[qi] === oi;
                let cls = 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700';
                if (submitted) {
                  if (oi === q.correct) cls = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300';
                  else if (chosen) cls = 'bg-rose-500/15 border-rose-500/50 text-rose-300';
                  else cls = 'bg-slate-800 border-slate-700 text-slate-400';
                } else if (chosen) {
                  cls = 'bg-blue-600/20 border-blue-600 text-blue-200';
                }
                return (
                  <button key={oi} disabled={submitted}
                    onClick={() => setSelected({ ...selected, [qi]: oi })}
                    className={`text-left px-3 py-2 rounded-lg border text-sm transition ${cls}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        {!submitted ? (
          <button onClick={check} disabled={!allAnswered}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 px-6 py-3 rounded-xl font-bold transition">
            {t.check}
          </button>
        ) : (
          <>
            <p className="text-center font-bold mb-3" style={{ color: score === passage.questions.length ? '#34d399' : '#fbbf24' }}>
              {t.score} : {score} / {passage.questions.length}
            </p>
            <button onClick={back} className="w-full bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold transition">
              {t.back}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
