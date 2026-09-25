"use client";
import React, { useState, useRef, useEffect } from "react";
import { getCardProgress, saveCardProgress } from "@/utils/srs-storage";
import { calculateNextReview } from "@/utils/srs-algorithm";

type Drill = {
  prompt: string;
  answer: string;
  hint?: string | { fr: string; en: string };
  // Identifiant stable pour le SRS (mode Repàs espaiat).
  // Si absent, il est déduit de quizId + index de la question.
  srsId?: string;
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
  // Appelé une fois par question (score du thème, carnet d'erreurs).
  onAnswer?: (correct: boolean, drill: Drill) => void;
  // Identifiant du point de grammaire, pour générer un srsId stable.
  quizId?: string;
};

export default function GrammarDrill({ title, note, visual, drills, onClose, language = 'fr', onAnswer, quizId }: Props) {
  const [drillIndex, setDrillIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);      // which blank we're on
  const [filledAnswers, setFilledAnswers] = useState<string[]>([]); // blanks already filled
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentDrill = drills[drillIndex];

  // Parse multi-blank answers — comma-separated
  const answerParts = currentDrill.answer.split(',').map(a => a.trim());
  const totalBlanks = (currentDrill.prompt.match(/___/g) || []).length;
  // If blanks count doesn't match answer parts, treat as single answer
  const isMulti = totalBlanks > 1 && answerParts.length === totalBlanks;
  const currentExpected = isMulti ? answerParts[subIndex] : currentDrill.answer;

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [drillIndex, subIndex, feedback]);

  const getText = (value: any): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value[language]) return value[language];
    return value.fr || value.en || '';
  };

  const displayTitle = getText(title);
  const displayNote = getText(note);

  const normalize = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\u2018\u2019\u0060\u00b4\u2032]/g, "'")
      .replace(/\s*,\s*/g, ", ")
      .replace(/[.;:!?]$/g, "")
      .trim();

  // Build sentence showing filled blanks in green, current blank as ___, future as ___
  const buildSentence = () => {
    const parts = currentDrill.prompt.split('___');
    if (parts.length === 1) return <span>{currentDrill.prompt}</span>;

    return (
      <>
        {parts.map((part, i) => {
          if (i === parts.length - 1) return <span key={i}>{part}</span>;
          const isFilled = isMulti && i < subIndex;
          const isCurrent = !isMulti || i === subIndex;
          return (
            <React.Fragment key={i}>
              <span>{part}</span>
              {isFilled ? (
                <span style={{ color: '#4ade80', fontWeight: 'bold', borderBottom: '2px solid #4ade80', padding: '0 2px' }}>
                  {filledAnswers[i]}
                </span>
              ) : isCurrent ? (
                <span style={{ display: 'inline-block', minWidth: '60px', borderBottom: '3px solid #3b82f6', margin: '0 2px', verticalAlign: 'bottom' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              ) : (
                <span style={{ display: 'inline-block', minWidth: '60px', borderBottom: '3px solid #475569', margin: '0 2px', verticalAlign: 'bottom', opacity: 0.5 }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              )}
            </React.Fragment>
          );
        })}
      </>
    );
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) return;
    const correct = normalize(userAnswer) === normalize(currentExpected);
    setFeedback(correct ? "correct" : "incorrect");
    if (!correct) setWrongAnswer(userAnswer);
    setTotalAnswered(n => n + 1);
    if (correct) setScore(s => s + 1);

    // Une question compte une seule fois : à la 1re erreur,
    // ou quand le dernier blanc est rempli correctement.
    const questionDone = !correct || !isMulti || subIndex === totalBlanks - 1;
    if (questionDone) {
      onAnswer?.(correct, currentDrill);
      // Répétition espacée (SM-2) : best-effort, sans impact si ça échoue.
      try {
        const srsId = currentDrill.srsId ?? `grammar:${quizId ?? 'unknown'}:${drillIndex}`;
        const updated = calculateNextReview(getCardProgress(srsId), correct ? 'good' : 'again');
        saveCardProgress(updated);
      } catch {
        /* localStorage indisponible : on ignore */
      }
    }
  };

  const next = () => {
    if (feedback === 'correct' && isMulti && subIndex < totalBlanks - 1) {
      // Move to next blank in the SAME drill
      setFilledAnswers(prev => {
        const next = [...prev];
        next[subIndex] = userAnswer.trim();
        return next;
      });
      setSubIndex(s => s + 1);
      setUserAnswer("");
      setFeedback(null);
      setWrongAnswer("");
    } else {
      // Move to next drill
      if (drillIndex < drills.length - 1) {
        setDrillIndex(i => i + 1);
        setSubIndex(0);
        setFilledAnswers([]);
        setUserAnswer("");
        setFeedback(null);
        setWrongAnswer("");
      } else {
        setIsFinished(true);
      }
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") feedback === null ? checkAnswer() : next();
  };

  const speak = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ca-ES';
    utt.rate = 0.85;
    window.speechSynthesis.speak(utt);
  };

  const getFullSentence = () => {
    let s = currentDrill.prompt;
    answerParts.forEach(a => { s = s.replace('___', a); });
    return s;
  };

  const t = {
    fr: { rules: 'Règles', exercise: 'EXERCICE', correct: 'Correct !', incorrect: 'Incorrect',
      goodAnswer: 'Bonne réponse', listen: 'Écouter la phrase', next: 'Suivant',
      finish: 'Terminer', finished: 'Terminé !', goodAnswers: 'bonnes réponses',
      retry: 'Recommencer', back: 'Retour', placeholder: 'Votre réponse...', verify: 'Vérifier',
      blank: 'Blanc', of: 'sur' },
    en: { rules: 'Rules', exercise: 'EXERCISE', correct: 'Correct!', incorrect: 'Incorrect',
      goodAnswer: 'Correct answer', listen: 'Listen', next: 'Next',
      finish: 'Finish', finished: 'Finished!', goodAnswers: 'correct answers',
      retry: 'Retry', back: 'Back', placeholder: 'Your answer...', verify: 'Check',
      blank: 'Blank', of: 'of' },
  }[language];

  // ── Visual comparison table ──────────────────────────────────────────────
  const renderVisual = (v: Visual) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '12px 0' }}>
      {[v.left, v.right].map((col, ci) => (
        <div key={ci} style={{ borderRadius: '10px', overflow: 'hidden', border: `2px solid ${col.color}` }}>
          <div style={{ background: col.color, padding: '7px 10px', fontWeight: 'bold', fontSize: '12px', color: '#fff', textAlign: 'center' }}>
            {col.title}
          </div>
          {col.items.map((item, ii) => (
            <div key={ii} style={{ padding: '5px 8px', fontSize: '11px', color: '#e2e8f0', background: ii % 2 === 0 ? '#0f172a' : '#1e293b', borderBottom: '1px solid #334155' }}>
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  // ── Note formatter ───────────────────────────────────────────────────────
  const formatNote = (text: string) => text.split('\n').map((line, i) => {
    const tr = line.trim();
    if (tr.match(/^─{3,}/)) return <hr key={i} style={{ border: 'none', borderTop: '1px solid #334155', margin: '8px 0' }} />;
    if (tr.match(/^[🎬📽⚡💡🖼⚙📚🔥🎯]/u)) {
      const color = tr.startsWith('⚡') ? '#fbbf24' : tr.startsWith('🖼') ? '#60a5fa'
        : tr.startsWith('💡') ? '#34d399' : tr.startsWith('🎬') ? '#e879f9' : '#a78bfa';
      return <div key={i} style={{ fontWeight: 'bold', fontSize: '14px', color, marginTop: '12px', marginBottom: '3px' }}>{tr}</div>;
    }
    if (tr.startsWith('→')) return (
      <div key={i} style={{ display: 'flex', gap: '6px', marginLeft: '6px', marginBottom: '3px' }}>
        <span style={{ color: '#60a5fa', flexShrink: 0 }}>→</span>
        <span style={{ color: '#e2e8f0', fontSize: '13px' }}>{tr.slice(1).trim()}</span>
      </div>
    );
    if (tr.match(/^\d+\./)) return <div key={i} style={{ fontWeight: 'bold', color: '#fbbf24', fontSize: '13px', marginTop: '8px', marginBottom: '2px' }}>{tr}</div>;
    if (tr.toLowerCase().startsWith('mots cl') || tr.toLowerCase().startsWith('key word'))
      return <div key={i} style={{ background: '#1e3a5f', borderRadius: '6px', padding: '3px 8px', fontSize: '12px', color: '#93c5fd', margin: '3px 0' }}>{tr}</div>;
    if (!tr) return <div key={i} style={{ height: '6px' }} />;
    return <p key={i} style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: '1.5', margin: '2px 0' }}>{tr}</p>;
  });

  // ── Finished ─────────────────────────────────────────────────────────────
  if (isFinished) {
    const pct = Math.round((score / totalAnswered) * 100);
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: '#1e293b', borderRadius: '20px', padding: '40px 30px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
          <div style={{ fontSize: '64px', fontWeight: 'bold', color: pct >= 70 ? '#4ade80' : '#f87171', marginBottom: '8px' }}>{pct}%</div>
          <p style={{ color: '#94a3b8', fontSize: '18px', marginBottom: '24px' }}>{score} / {totalAnswered} {t.goodAnswers}</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => { setDrillIndex(0); setSubIndex(0); setFilledAnswers([]); setScore(0); setTotalAnswered(0); setUserAnswer(''); setFeedback(null); setIsFinished(false); }}
              style={{ flex: 1, background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              🔄 {t.retry}
            </button>
            <button onClick={onClose}
              style={{ flex: 1, background: '#334155', color: '#fff', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              {t.back}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = (drillIndex / drills.length) * 100;
  const hasContent = displayNote || visual;

  // ── Main exercise UI ──────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', flexDirection: 'column', maxWidth: '480px', margin: '0 auto' }}>

      {/* Progress bar */}
      <div style={{ height: '4px', background: '#1e293b', flexShrink: 0 }}>
        <div style={{ height: '100%', background: '#3b82f6', width: `${progress}%`, transition: 'width 0.3s' }} />
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 8px' }}>
        <div>
          <h2 style={{ color: '#fff', fontWeight: 'bold', fontSize: '17px', margin: 0 }}>{displayTitle}</h2>
          <p style={{ color: '#64748b', fontSize: '12px', margin: '2px 0 0' }}>
            {t.exercise} {drillIndex + 1} / {drills.length}
            {isMulti && ` · ${t.blank} ${subIndex + 1} ${t.of} ${totalBlanks}`}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            background: score > 0 ? '#14532d' : '#1e293b',
            border: `2px solid ${score > 0 ? '#4ade80' : '#334155'}`,
            borderRadius: '20px', padding: '4px 12px',
            color: score > 0 ? '#4ade80' : '#94a3b8',
            fontSize: '14px', fontWeight: 'bold',
          }}>
            {score} / {drills.length}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '22px', cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 16px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Rules collapsible */}
        {hasContent && (
          <div style={{ background: '#1e293b', borderRadius: '12px', overflow: 'hidden' }}>
            <button onClick={() => setRulesOpen(o => !o)}
              style={{ width: '100%', background: 'none', border: 'none', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#e2e8f0', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
              📖 {t.rules}
              <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#64748b' }}>{rulesOpen ? '▲' : '▼'}</span>
            </button>
            {rulesOpen && (
              <div style={{ padding: '0 16px 16px', borderTop: '1px solid #334155', maxHeight: '300px', overflowY: 'auto' }}>
                {visual && renderVisual(visual)}
                {displayNote && formatNote(displayNote)}
              </div>
            )}
          </div>
        )}

        {/* Sentence */}
        <div style={{ background: '#1e293b', borderRadius: '16px', padding: '24px 20px', textAlign: 'center' }}>
          <p style={{ color: '#f1f5f9', fontSize: '21px', fontWeight: '600', lineHeight: '1.6', margin: 0 }}>
            {buildSentence()}
          </p>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={userAnswer}
          onChange={e => setUserAnswer(e.target.value)}
          onKeyDown={handleKey}
          placeholder={getText(currentDrill.hint) || t.placeholder}
          disabled={feedback !== null}
          style={{
            width: '100%', padding: '18px 20px', borderRadius: '14px',
            border: `2px solid ${feedback === 'correct' ? '#16a34a' : feedback === 'incorrect' ? '#dc2626' : '#334155'}`,
            background: '#1e293b', color: '#fff', fontSize: '20px',
            outline: 'none', boxSizing: 'border-box', fontWeight: '500',
          }}
        />

        {/* Feedback */}
        {feedback && (
          <div style={{
            background: feedback === 'correct' ? '#052e16' : '#1a0000',
            border: `2px solid ${feedback === 'correct' ? '#16a34a' : '#dc2626'}`,
            borderRadius: '14px', padding: '16px',
          }}>
            <p style={{ fontWeight: 'bold', fontSize: '17px', margin: '0 0 6px', color: feedback === 'correct' ? '#4ade80' : '#f87171' }}>
              {feedback === 'correct' ? `✓ ${t.correct}` : `✗ ${t.incorrect}`}
            </p>
            {feedback === 'incorrect' && (
              <p style={{ color: '#e2e8f0', margin: '0 0 10px', fontSize: '15px' }}>
                {t.goodAnswer} : <strong style={{ color: '#4ade80' }}>{currentExpected}</strong>
              </p>
            )}
            <button onClick={() => speak(getFullSentence())}
              style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '8px 14px', color: '#94a3b8', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🔊 {t.listen}
            </button>
          </div>
        )}

        {/* Buttons */}
        <div style={{ marginTop: 'auto' }}>
          {feedback === null ? (
            <button onClick={checkAnswer} disabled={!userAnswer.trim()}
              style={{
                width: '100%', padding: '18px', borderRadius: '14px', border: 'none',
                background: userAnswer.trim() ? '#3b82f6' : '#1e293b',
                color: userAnswer.trim() ? '#fff' : '#475569',
                fontSize: '18px', fontWeight: 'bold',
                cursor: userAnswer.trim() ? 'pointer' : 'not-allowed',
                transition: 'background 0.2s',
              }}>
              {t.verify}
            </button>
          ) : (
            <button onClick={next}
              style={{ width: '100%', padding: '18px', borderRadius: '14px', border: 'none', background: '#3b82f6', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
              {feedback === 'correct' && isMulti && subIndex < totalBlanks - 1
                ? `${t.blank} ${subIndex + 2} →`
                : drillIndex < drills.length - 1 ? `${t.next} →` : t.finish}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
