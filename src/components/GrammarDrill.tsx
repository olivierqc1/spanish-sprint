"use client";
import React, { useState } from "react";

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
};

export default function GrammarDrill({ title, note, visual, drills, onClose, language = 'fr' }: Props) {
  const [showExplanationPanel, setShowExplanationPanel] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
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
    text.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const checkAnswer = () => {
    const correct = normalizeAnswer(userAnswer) === normalizeAnswer(currentDrill.answer);
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) setScore(score + 1);
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
      score: "Score", verify: "Verifier", next: "Suivant",
      finish: "Terminer", finished: "Termine!", correctAnswers: "bonnes reponses",
      backToList: "Retour a la liste", placeholder: "Tape ta reponse ici...",
      correct: "Correct!", incorrect: "Incorrect", correctAnswer: "Bonne reponse",
      exercise: "Exercice", showExplanation: "Voir l'explication",
      hideExplanation: "Masquer", showHint: "Indice", hideHint: "Cacher",
    },
    en: {
      startButton: "Start exercises", backButton: "Back",
      score: "Score", verify: "Check", next: "Next",
      finish: "Finish", finished: "Finished!", correctAnswers: "correct answers",
      backToList: "Back to list", placeholder: "Type your answer here...",
      correct: "Correct!", incorrect: "Incorrect", correctAnswer: "Correct answer",
      exercise: "Exercise", showExplanation: "Show explanation",
      hideExplanation: "Hide", showHint: "Hint", hideHint: "Hide",
    },
  };

  const t = texts[language];

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
    const fs = compact ? '12px' : '14px';

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
          <div key={i} style={{ fontWeight: 'bold', fontSize: compact ? '13px' : '16px', color, marginTop: '14px', marginBottom: '4px' }}>
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
      } else if (tr.match(/^\d+\./)) {
        els.push(
          <div key={i} style={{ fontWeight: 'bold', color: '#fbbf24', fontSize: fs, marginTop: '8px', marginBottom: '2px' }}>
            {tr}
          </div>
        );
      } else if (tr.toLowerCase().startsWith('mots cl') || tr.toLowerCase().startsWith('key word')) {
        els.push(
          <div key={i} style={{ background: '#1e3a5f', borderRadius: '6px', padding: '3px 8px', fontSize: compact ? '11px' : '13px', color: '#93c5fd', margin: '3px 0' }}>
            {tr}
          </div>
        );
      } else if (!tr) {
        els.push(<div key={i} style={{ height: compact ? '4px' : '8px' }} />);
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

  if (!hasStarted && hasContent) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-start justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full my-4">
          <div className="flex justify-between items-start mb-5">
            <h2 className="text-2xl font-bold text-white pr-4">{displayTitle}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none flex-shrink-0">x</button>
          </div>
          {visual && renderVisual(visual)}
          {displayNote && (
            <div style={{ background: '#0f172a', borderRadius: '12px', padding: '16px', marginBottom: '16px', maxHeight: '55vh', overflowY: 'auto' }}>
              {formatNote(displayNote)}
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={() => setHasStarted(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-xl font-semibold text-lg transition">
              {t.startButton} ({drills.length})
            </button>
            <button onClick={onClose}
              className="px-6 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition">
              {t.backButton}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const pct = Math.round((score / drills.length) * 100);
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-4">{t.finished}</h2>
          <div className="text-6xl font-bold mb-4 text-green-400">{pct}%</div>
          <p className="text-xl mb-6">{score} / {drills.length} {t.correctAnswers}</p>
          <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition">
            {t.backToList}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 p-3 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto flex gap-3">

        {showExplanationPanel && hasContent && (
          <div className="bg-gray-900 rounded-2xl p-4 w-72 flex-shrink-0 overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-bold text-white">{displayTitle}</h3>
              <button onClick={() => setShowExplanationPanel(false)} className="text-gray-400 hover:text-white text-lg">x</button>
            </div>
            {visual && renderVisual(visual)}
            {displayNote && formatNote(displayNote, true)}
          </div>
        )}

        <div className="bg-gray-800 rounded-2xl p-5 flex-1 flex flex-col min-w-0">
          <div className="flex justify-between items-center mb-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold truncate">{displayTitle}</h2>
              <p className="text-sm text-gray-400">{t.exercise} {progress}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl ml-3">x</button>
          </div>

          <div className="flex items-center justify-between mb-4">
            {hasContent && !showExplanationPanel && (
              <button onClick={() => setShowExplanationPanel(true)}
                className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 rounded-lg text-sm font-semibold transition">
                {t.showExplanation}
              </button>
            )}
            {hasContent && showExplanationPanel && <div />}
            <span className="text-base ml-auto">
              {t.score}: <span className="font-bold text-green-400">{score}</span> / {drills.length}
            </span>
          </div>

          <div className="bg-gray-900 rounded-xl p-5 mb-4 flex-shrink-0">
            <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: currentDrill.prompt }} />
          </div>

          <input type="text" value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder}
            disabled={feedback !== null}
            autoFocus
            className="w-full bg-gray-900 border-2 border-gray-700 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-blue-500 disabled:opacity-50 flex-shrink-0"
          />

          {currentDrill.hint && feedback === null && (
            <div className="mt-3 flex-shrink-0">
              <button onClick={() => setShowHint(!showHint)} className="text-sm text-blue-400 hover:text-blue-300">
                {showHint ? t.hideHint : t.showHint}
              </button>
              {showHint && (
                <div className="mt-2 p-3 bg-slate-800 rounded-lg text-sm text-slate-300">
                  {getText(currentDrill.hint)}
                </div>
              )}
            </div>
          )}

          {feedback && (
            <div className={`mt-3 p-4 rounded-xl flex-shrink-0 ${feedback === "correct" ? "bg-green-900/50 border border-green-600" : "bg-red-900/50 border border-red-600"}`}>
              {feedback === "correct" ? (
                <p className="text-green-400 font-semibold text-lg">✓ {t.correct}</p>
              ) : (
                <div>
                  <p className="text-red-400 font-semibold">✗ {t.incorrect}</p>
                  <p className="text-sm mt-1">{t.correctAnswer}: <span className="font-bold text-white">{currentDrill.answer}</span></p>
                </div>
              )}
            </div>
          )}

          <div className="mt-auto pt-4 flex-shrink-0">
            <div className="flex gap-3 mb-3">
              {feedback === null ? (
                <button onClick={checkAnswer} disabled={!userAnswer.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-semibold transition text-lg">
                  {t.verify}
                </button>
              ) : (
                <button onClick={nextDrill}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition text-lg">
                  {currentIndex < drills.length - 1 ? `${t.next} →` : t.finish}
                </button>
              )}
            </div>
            <div className="bg-gray-900 rounded-full h-2 overflow-hidden">
              <div className="bg-blue-600 h-full transition-all" style={{ width: `${((currentIndex + 1) / drills.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}