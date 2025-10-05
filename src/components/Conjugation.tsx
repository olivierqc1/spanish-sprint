"use client";
import { useMemo, useState } from "react";
import type { Level } from "./LevelPicker";

type ConjugationExercise = {
  id: string;
  level: Exclude<Level, "ALL">;
  verb: string;
  translation: string;
  tense: string;
  pronoun: string;
  answer: string;
  hint?: string;
};

// Banque d'exercices de conjugaison
const conjugationBank: ConjugationExercise[] = [
  // A1 - PRÉSENT RÉGULIERS
  { id: "c54", level: "B1", verb: "decir", translation: "dire", tense: "futur", pronoun: "tú", answer: "dirás", hint: "dir-" },
  { id: "c55", level: "B1", verb: "poder", translation: "pouvoir", tense: "futur", pronoun: "nosotros", answer: "podremos", hint: "podr-" },
  { id: "c56", level: "B1", verb: "querer", translation: "vouloir", tense: "futur", pronoun: "ellos", answer: "querrán", hint: "querr-" },
  { id: "c57", level: "B1", verb: "venir", translation: "venir", tense: "futur", pronoun: "yo", answer: "vendré", hint: "vendr-" },
  { id: "c58", level: "B1", verb: "salir", translation: "sortir", tense: "futur", pronoun: "ella", answer: "saldrá", hint: "saldr-" },
  { id: "c59", level: "B1", verb: "poner", translation: "mettre", tense: "futur", pronoun: "yo", answer: "pondré", hint: "pondr-" },
  { id: "c60", level: "B1", verb: "saber", translation: "savoir", tense: "futur", pronoun: "tú", answer: "sabrás", hint: "sabr-" },
];

function normalize(str: string): string {
  return str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function Conjugation({
  level,
  country
}: {
  level: Level;
  country: "ALL" | "spain" | "mexico";
}) {
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const filtered = useMemo(() => {
    let pool = conjugationBank;
    if (level !== "ALL") pool = pool.filter(e => e.level === level);
    return pool;
  }, [level]);

  const current = filtered[idx] ?? null;
  const isCorrect = current && normalize(answer) === normalize(current.answer);

  const handleCheck = () => {
    if (!current) return;
    setShowResult(true);
    if (isCorrect) {
      setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }));
    } else {
      setScore(s => ({ ...s, total: s.total + 1 }));
    }
  };

  const handleNext = () => {
    setIdx(i => (i + 1) % Math.max(1, filtered.length));
    setAnswer("");
    setShowResult(false);
  };

  const handleRandom = () => {
    setIdx(Math.floor(Math.random() * Math.max(1, filtered.length)));
    setAnswer("");
    setShowResult(false);
  };

  if (!current) {
    return (
      <div className="card vstack">
        <strong>Conjugaison</strong>
        <div className="muted">Aucun exercice disponible pour ce niveau.</div>
      </div>
    );
  }

  return (
    <div className="card vstack">
      <div className="hstack" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <strong>Conjugaison interactive</strong>
        <div className="hstack">
          <span className="badge">{current.level}</span>
          <span className="muted">
            Score: {score.correct}/{score.total} ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
          </span>
        </div>
      </div>

      <div className="vstack">
        <div className="hstack" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h3 style={{ margin: "0 0 8px 0" }}>
              <strong>{current.verb}</strong> <span className="muted">({current.translation})</span>
            </h3>
            <div className="muted">
              {current.tense} · <strong>{current.pronoun}</strong>
            </div>
          </div>
          {current.hint && (
            <span className="badge" style={{ background: "#1e3a5f" }}>
              💡 {current.hint}
            </span>
          )}
        </div>

        <div style={{ 
          background: "#0b1220", 
          padding: "16px", 
          borderRadius: "10px",
          fontSize: "18px"
        }}>
          {current.pronoun} <strong style={{ color: "#60a5fa" }}>_______</strong>
        </div>

        <input
          placeholder="Écris la conjugaison..."
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !showResult) handleCheck();
            if (e.key === "Enter" && showResult) handleNext();
          }}
          disabled={showResult}
          style={{
            fontSize: "16px",
            border: showResult 
              ? isCorrect 
                ? "2px solid #10b981" 
                : "2px solid #ef4444"
              : "1px solid #334155"
          }}
        />

        {showResult && (
          <div 
            className="card" 
            style={{ 
              background: isCorrect ? "#064e3b" : "#7f1d1d",
              border: isCorrect ? "1px solid #10b981" : "1px solid #ef4444"
            }}
          >
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>
              {isCorrect ? "✅ Correct !" : "❌ Incorrect"}
            </div>
            {!isCorrect && (
              <div style={{ marginTop: "8px" }}>
                La bonne réponse est : <strong>{current.answer}</strong>
              </div>
            )}
          </div>
        )}

        <div className="hstack" style={{ justifyContent: "space-between" }}>
          {!showResult ? (
            <>
              <button onClick={handleCheck} disabled={!answer.trim()}>
                Vérifier
              </button>
              <button onClick={handleRandom}>
                🎲 Aléatoire
              </button>
            </>
          ) : (
            <>
              <button onClick={handleNext} style={{ flex: 1 }}>
                Suivant ▶
              </button>
            </>
          )}
        </div>

        <div className="muted" style={{ textAlign: "center", fontSize: "12px" }}>
          Exercice {idx + 1} / {filtered.length}
        </div>
      </div>
    </div>
  );
}
