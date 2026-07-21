"use client";
import React, { useState } from "react";
import { useSpeak } from "@/hooks/useSpeak";

type Drill = {
  prompt: string;
  answer: string;
  hint?: string | { fr: string; en: string };
};

type Visual = {
  type: 'comparison';
  left: { title: string; color: string; items: string[] };
  right: { title: string; color: string; items: string[] };
};

type Props = {
  title: string | { fr: string; en: string };
  note?: string | { fr: string; en: string };
  visual?: Visual;
  drills: Drill[];
  onClose: () => void;
  language?: 'fr' | 'en';
  onAnswer?: (correct: boolean, drill: Drill) => void;
};

const ACCENTS = ['á', 'é', 'í', 'ó', 'ú', 'à', 'è', 'ò', 'ç', 'ï', 'ü', 'ñ', 'l·l', '¿', '¡'];

// Reconstruit la phrase complète (blanc rempli, indices retirés) pour la lecture audio.
function buildSpoken(prompt: string, answer: string): string {
  let s = prompt.replace(/<[^>]*>/g, ' ');            // retire le HTML éventuel
  const hadBlank = /_{2,}/.test(s);
  s = s.replace(/_{2,}(?:\s+_{2,})*/, answer);         // remplit le 1er slot (fusionne les blancs adjacents)
  s = s.replace(/→|➜|=>/g, ', ');                       // flèches -> pause naturelle
  s = s.replace(/\([^)]*\)/g, ' ');                     // retire les indices entre parenthèses
  s = s.replace(/_{2,}/g, ' ');                         // supprime tout blanc résiduel
  s = s.replace(/\s+/g, ' ').replace(/\s+([.,;:!?])/g, '$1').trim();
  if (!hadBlank && !s.toLowerCase().includes(answer.toLowerCase())) {
    s = `${s} ${answer}`.trim();
  }
  return s;
}

export default function GrammarDrill({ title, note, visual, drills, onClose, language = 'fr', onAnswer }: Props) {
  const [hasStarted, setHasStarted] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentDrill = drills[currentIndex];
  const progress = `${currentIndex + 1} / ${drills.length}`;

  const getText = (value: any): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value[language]) return value[language];
    return value.fr || value.en || '';
  };

  const displayTitle = getText(title);
  const displayNote = getText(note);

  const normalizeAnswer = (text: string) =>
    text.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,!?;:¿¡]/g, "");

  const checkAnswer = () => {
    const correct = normalizeAnswer(userAnswer) === normalizeAnswer(currentDrill.answer);
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) setScore(score + 1);
    onAnswer?.(correct, currentDrill);
  };

  const nextDrill = () => {
    if (currentIndex < drills.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setFeedback(null);
      setShowHint(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (feedback === null) checkAnswer();
      else nextDrill();
    }
  };

  const texts = {
    fr: {
      startButton: "Commencer les exercices", backButton: "Retour",
      verify: "Verifier", next: "Suivant",
      finish: "Terminer", correctAnswers: "bonnes reponses",
      backToList: "Retour a la liste", placeholder: "Tape ta reponse ici...",
      correct: "Correct!", incorrect: "Incorrect", correctAnswer: "Bonne reponse",
      exercise: "Exercice", rules: "Règles", showHint: "Indice", hideHint: "Cacher",
    },
    en: {
      startButton: "Start exercises", backButton: "Back",
      verify: "Check", next: "Next",
      finish: "Finish", correctAnswers: "correct answers",
      backToList: "Back to list", placeholder: "Type your answer here...",
      correct: "Correct!", incorrect: "Incorrect", correctAnswer: "Correct answer",
      exercise: "Exercise", rules: "Rules", showHint: "Hint", hideHint: "Hide",
    },
  };

  const t = texts[language];
  const { speak, supported: canSpeak } = useSpeak('ca-ES');

  const speakSentence = () => {
    const isSpanish =
      typeof window !== 'undefined' &&
      localStorage.getItem('iberian-sprint-target-language') === 'spanish';
    speak(buildSpoken(currentDrill.prompt, currentDrill.answer), isSpanish ? 'es-ES' : 'ca-ES');
  };

  const renderVisual = (v: Visual) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '0 0 16px 0' }}>
      {[v.left, v.right].map((col, ci) => (
        <div key={ci} style={{ borderRadius: '10px', overflow: 'hidden', border: `2px solid ${col.color}` }}>
          <div style={{ background: col.color, padding: '8px 10px', fontWeight: 'bold', fontSize: '13px', color: '#fff', textAlign: 'center' }}>
            {col.title}
          </div>
          {col.items.map((item, ii) => (
            <div key={ii} style={{ padding: '6px 10px', fontSize: '12px', color: '#e2e8f0', background: ii % 2 === 0 ? '#0f172a' : '#1e293b', borderBottom: '1px solid #334155' }}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const formatNote = (text: string, compact = false) => {
    const lines = text.split('\n');
    const els: JSX.Element[] = [];
    const fs = compact ? '13px' : '14px';

    lines.forEach((line, i) => {
      const tr = line.trim();
      if (tr.match(/^─{3,}/)) {
        els.push(<hr key={i} style={{ border: 'none', borderTop: '1px solid #334155', margin: '10px 0' }} />);
      } else if (tr.match(/^[🎬📽⚡💡🖼⚙📚🔥🎯]/u)) {
        const color = tr.startsWith('⚡') ? '#fbbf24'
          : tr.startsWith('🖼') ? '#60a5fa'
          : tr.startsWith('💡') ? '#34d399'
          : tr.startsWith('🎬') ? '#e879f9'
          : tr.startsWith('📽') ? '#fb923c'
          : '#a78bfa';
        els.push(
          <div key={i} style={{ fontWeight: 'bold', fontSize: compact ? '14px' : '16px', color, marginTop: '14px', marginBottom: '4px' }}>
            {tr}
          </div>
        );
      } else if (tr.startsWith('→')) {
        els.push(
          <div key={i} style={{ display: 'flex', gap: '6px', marginLeft: '6px', marginBottom: '3px' }}>
            <span style={{ color: '#60a5fa', flexShrink: 0 }}>→</span>
            <span style={{ color: '#e2e8f0', fontSize: fs }}>{tr.slice(1).trim()}</span>
          </div>
        );
      } else if (!tr) {
        els.push(<div key={i} style={{ height: '8px' }} />);
      } else {
        els.push(
          <p key={i} style={{ color: '#cbd5e1', fontSize: fs, lineHeight: '1.55', margin: '2px 0' }}>
            {tr}
          </p>
        );
      }
    });
    return els;
  };

  const hasContent = displayNote || visual;

  // ---------- Écran de présentation ----------
  if (!hasStarted && hasContent) {
    return (
      <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full my-4 shadow-2xl">
          <div className="flex justify-between items-start mb-5">
            <h2 className="text-2xl font-black text-white pr-4 leading-tight">{displayTitle}</h2>
            <button onClick={onClose} className="text-slate-500 hover:text-white text-2xl leading-none flex-shrink-0 transition">✕</button>
          </div>
          {visual && renderVisual(visual)}
          {displayNote && (
            <div style={{ background: '#0b1220', borderRadius: '16px', padding: '18px', marginBottom: '18px', maxHeight: '55vh', overflowY: 'auto', border: '1px solid #1e293b' }}>
              {formatNote(displayNote)}
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={() => setHasStarted(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-500 px-6 py-4 rounded-2xl font-bold text-lg transition shadow-lg shadow-blue-600/20">
              {t.startButton} · {drills.length}
            </button>
            <button onClick={onClose}
              className="px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-semibold transition">
              {t.backButton}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Écran de fin ----------
  if (isFinished) {
    const pct = Math.round((score / drills.length) * 100);
    const ring = pct >= 80 ? '#34d399' : pct >= 50 ? '#fbbf24' : '#fb7185';
    const R = 54, C = 2 * Math.PI * R;
    const dash = (pct / 100) * C;
    const msg = pct >= 80
      ? (language === 'fr' ? 'Excellent !' : 'Excellent!')
      : pct >= 50
        ? (language === 'fr' ? 'Bien joué' : 'Well done')
        : (language === 'fr' ? 'Continue, ça vient' : 'Keep going');
    return (
      <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="relative w-40 h-40 mx-auto mb-5">
            <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
              <circle cx="64" cy="64" r={R} fill="none" stroke="#1e293b" strokeWidth="10" />
              <circle cx="64" cy="64" r={R} fill="none" stroke={ring} strokeWidth="10" strokeLinecap="round"
                strokeDasharray={`${dash} ${C}`} style={{ transition: 'stroke-dasharray 0.8s ease' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{pct}%</span>
            </div>
          </div>
          <h2 className="text-2xl font-black mb-1 text-white">{msg}</h2>
          <p className="text-slate-400 mb-6">{score} / {drills.length} {t.correctAnswers}</p>
          <button onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-500 px-6 py-3.5 rounded-2xl font-bold transition shadow-lg shadow-blue-600/20">
            {t.backToList}
          </button>
        </div>
      </div>
    );
  }

  // ---------- Écran d'exercice ----------
  const pctBar = ((currentIndex + 1) / drills.length) * 100;

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 p-3 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">

          <div className="bg-slate-800 rounded-full h-1.5 overflow-hidden mb-4">
            <div className="h-full transition-all duration-500 rounded-full"
              style={{ width: `${pctBar}%`, background: 'linear-gradient(90deg,#3b82f6,#60a5fa)' }} />
          </div>

          <div className="flex justify-between items-center mb-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold truncate text-white">{displayTitle}</h2>
              <p className="text-xs text-slate-500 uppercase tracking-wide">{t.exercise} {progress}</p>
            </div>
            <div className="flex items-center gap-3 ml-3">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-sm font-bold">
                <span className="text-emerald-400">{score}</span>
                <span className="text-slate-500"> / {drills.length}</span>
              </span>
              <button onClick={onClose} className="text-slate-500 hover:text-white text-xl">✕</button>
            </div>
          </div>

          {/* Bouton Règles — visible pendant tout l'exercice, sur tous les écrans */}
          {hasContent && (
            <button onClick={() => setShowRules(!showRules)}
              className={`mb-3 px-3 py-1.5 rounded-lg text-sm font-semibold transition border ${showRules ? 'bg-purple-600/20 border-purple-500 text-purple-200' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}>
              📖 {t.rules} {showRules ? '▲' : '▼'}
            </button>
          )}

          {showRules && hasContent && (
            <div className="mb-4 rounded-xl bg-slate-950 border border-slate-800 p-4" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
              {visual && renderVisual(visual)}
              {displayNote && formatNote(displayNote)}
            </div>
          )}

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 mb-4">
            <p className="text-xl leading-relaxed text-white" dangerouslySetInnerHTML={{ __html: currentDrill.prompt }} />
          </div>

          <input type="text" value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder}
            disabled={feedback !== null}
            autoFocus
            className="w-full bg-slate-950 border-2 border-slate-700 rounded-2xl px-4 py-3.5 text-lg text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 disabled:opacity-60 transition"
          />

          {/* Barre d'accents (espagnol + catalan) */}
          {feedback === null && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {ACCENTS.map(ch => (
                <button key={ch} type="button" onClick={() => setUserAnswer(userAnswer + ch)}
                  className="min-w-9 h-9 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-base font-medium transition active:scale-95">
                  {ch}
                </button>
              ))}
            </div>
          )}

          {currentDrill.hint && feedback === null && (
            <div className="mt-3">
              <button onClick={() => setShowHint(!showHint)} className="text-sm text-blue-400 hover:text-blue-300 transition">
                💡 {showHint ? t.hideHint : t.showHint}
              </button>
              {showHint && (
                <div className="mt-2 p-3 bg-slate-800 rounded-xl text-sm text-slate-300 border border-slate-700">
                  {getText(currentDrill.hint)}
                </div>
              )}
            </div>
          )}

          {feedback && (
            <div className={`mt-3 p-4 rounded-2xl border ${feedback === "correct" ? "bg-emerald-500/10 border-emerald-500/40" : "bg-rose-500/10 border-rose-500/40"}`}>
              {feedback === "correct" ? (
                <p className="text-emerald-400 font-bold text-lg">✓ {t.correct}</p>
              ) : (
                <div>
                  <p className="text-rose-400 font-bold">✗ {t.incorrect}</p>
                  <p className="text-sm mt-1 text-slate-300">{t.correctAnswer} : <span className="font-bold text-white">{currentDrill.answer}</span></p>
                </div>
              )}

              {canSpeak && (
                <button
                  onClick={speakSentence}
                  className="mt-3 inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold px-4 py-2 rounded-xl transition"
                >
                  🔊 {language === 'fr' ? 'Écouter la phrase' : 'Listen to the sentence'}
                </button>
              )}
            </div>
          )}

          <div className="pt-4">
            {feedback === null ? (
              <button onClick={checkAnswer} disabled={!userAnswer.trim()}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed px-6 py-3.5 rounded-2xl font-bold transition text-lg shadow-lg shadow-blue-600/20 disabled:shadow-none">
                {t.verify}
              </button>
            ) : (
              <button onClick={nextDrill}
                className="w-full bg-blue-600 hover:bg-blue-500 px-6 py-3.5 rounded-2xl font-bold transition text-lg shadow-lg shadow-blue-600/20">
                {currentIndex < drills.length - 1 ? `${t.next} →` : t.finish}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
