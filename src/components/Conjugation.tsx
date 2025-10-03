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
}d: "c1", level: "A1", verb: "hablar", translation: "parler", tense: "présent", pronoun: "yo", answer: "hablo" },
  { id: "c2", level: "A1", verb: "hablar", translation: "parler", tense: "présent", pronoun: "tú", answer: "hablas" },
  { id: "c3", level: "A1", verb: "hablar", translation: "parler", tense: "présent", pronoun: "él/ella", answer: "habla" },
  { id: "c4", level: "A1", verb: "hablar", translation: "parler", tense: "présent", pronoun: "nosotros", answer: "hablamos" },
  { id: "c5", level: "A1", verb: "comer", translation: "manger", tense: "présent", pronoun: "yo", answer: "como" },
  { id: "c6", level: "A1", verb: "comer", translation: "manger", tense: "présent", pronoun: "tú", answer: "comes" },
  { id: "c7", level: "A1", verb: "comer", translation: "manger", tense: "présent", pronoun: "ellos", answer: "comen" },
  { id: "c8", level: "A1", verb: "vivir", translation: "vivre", tense: "présent", pronoun: "yo", answer: "vivo" },
  { id: "c9", level: "A1", verb: "vivir", translation: "vivre", tense: "présent", pronoun: "nosotros", answer: "vivimos" },
  { id: "c10", level: "A1", verb: "trabajar", translation: "travailler", tense: "présent", pronoun: "ella", answer: "trabaja" },
  { id: "c11", level: "A1", verb: "estudiar", translation: "étudier", tense: "présent", pronoun: "yo", answer: "estudio" },
  { id: "c12", level: "A1", verb: "beber", translation: "boire", tense: "présent", pronoun: "tú", answer: "bebes" },
  { id: "c13", level: "A1", verb: "escribir", translation: "écrire", tense: "présent", pronoun: "él", answer: "escribe" },
  
  // A1 - PRÉSENT IRRÉGULIERS
  { id: "c14", level: "A1", verb: "ser", translation: "être", tense: "présent", pronoun: "yo", answer: "soy", hint: "irrégulier" },
  { id: "c15", level: "A1", verb: "ser", translation: "être", tense: "présent", pronoun: "tú", answer: "eres", hint: "irrégulier" },
  { id: "c16", level: "A1", verb: "estar", translation: "être (lieu/état)", tense: "présent", pronoun: "yo", answer: "estoy" },
  { id: "c17", level: "A1", verb: "estar", translation: "être (lieu/état)", tense: "présent", pronoun: "nosotros", answer: "estamos" },
  { id: "c18", level: "A1", verb: "tener", translation: "avoir", tense: "présent", pronoun: "yo", answer: "tengo", hint: "go-verb" },
  { id: "c19", level: "A1", verb: "tener", translation: "avoir", tense: "présent", pronoun: "tú", answer: "tienes", hint: "e→ie" },
  { id: "c20", level: "A1", verb: "ir", translation: "aller", tense: "présent", pronoun: "yo", answer: "voy" },
  { id: "c21", level: "A1", verb: "ir", translation: "aller", tense: "présent", pronoun: "nosotros", answer: "vamos" },
  { id: "c22", level: "A1", verb: "hacer", translation: "faire", tense: "présent", pronoun: "yo", answer: "hago" },
  { id: "c23", level: "A1", verb: "poder", translation: "pouvoir", tense: "présent", pronoun: "yo", answer: "puedo", hint: "o→ue" },
  { id: "c24", level: "A1", verb: "querer", translation: "vouloir", tense: "présent", pronoun: "tú", answer: "quieres", hint: "e→ie" },
  
  // A2 - PRETÉRITO INDEFINIDO RÉGULIERS
  { id: "c25", level: "A2", verb: "hablar", translation: "parler", tense: "passé simple", pronoun: "yo", answer: "hablé" },
  { id: "c26", level: "A2", verb: "hablar", translation: "parler", tense: "passé simple", pronoun: "él", answer: "habló" },
  { id: "c27", level: "A2", verb: "comer", translation: "manger", tense: "passé simple", pronoun: "yo", answer: "comí" },
  { id: "c28", level: "A2", verb: "comer", translation: "manger", tense: "passé simple", pronoun: "ellos", answer: "comieron" },
  { id: "c29", level: "A2", verb: "vivir", translation: "vivre", tense: "passé simple", pronoun: "nosotros", answer: "vivimos" },
  { id: "c30", level: "A2", verb: "trabajar", translation: "travailler", tense: "passé simple", pronoun: "tú", answer: "trabajaste" },
  { id: "c31", level: "A2", verb: "beber", translation: "boire", tense: "passé simple", pronoun: "ella", answer: "bebió" },
  { id: "c32", level: "A2", verb: "escribir", translation: "écrire", tense: "passé simple", pronoun: "yo", answer: "escribí" },
  
  // A2 - PRETÉRITO INDEFINIDO IRRÉGULIERS
  { id: "c33", level: "A2", verb: "ser/ir", translation: "être/aller", tense: "passé simple", pronoun: "yo", answer: "fui", hint: "même conjugaison" },
  { id: "c34", level: "A2", verb: "ser/ir", translation: "être/aller", tense: "passé simple", pronoun: "nosotros", answer: "fuimos" },
  { id: "c35", level: "A2", verb: "tener", translation: "avoir", tense: "passé simple", pronoun: "yo", answer: "tuve", hint: "tuv-" },
  { id: "c36", level: "A2", verb: "estar", translation: "être", tense: "passé simple", pronoun: "él", answer: "estuvo", hint: "estuv-" },
  { id: "c37", level: "A2", verb: "hacer", translation: "faire", tense: "passé simple", pronoun: "yo", answer: "hice", hint: "c→z" },
  { id: "c38", level: "A2", verb: "hacer", translation: "faire", tense: "passé simple", pronoun: "él", answer: "hizo" },
  { id: "c39", level: "A2", verb: "poder", translation: "pouvoir", tense: "passé simple", pronoun: "yo", answer: "pude", hint: "pud-" },
  { id: "c40", level: "A2", verb: "poner", translation: "mettre", tense: "passé simple", pronoun: "tú", answer: "pusiste", hint: "pus-" },
  { id: "c41", level: "A2", verb: "venir", translation: "venir", tense: "passé simple", pronoun: "ellos", answer: "vinieron", hint: "vin-" },
  { id: "c42", level: "A2", verb: "decir", translation: "dire", tense: "passé simple", pronoun: "yo", answer: "dije", hint: "dij-" },
  
  // A2 - IMPERFECTO
  { id: "c43", level: "A2", verb: "hablar", translation: "parler", tense: "imparfait", pronoun: "yo", answer: "hablaba" },
  { id: "c44", level: "A2", verb: "comer", translation: "manger", tense: "imparfait", pronoun: "nosotros", answer: "comíamos" },
  { id: "c45", level: "A2", verb: "vivir", translation: "vivre", tense: "imparfait", pronoun: "tú", answer: "vivías" },
  { id: "c46", level: "A2", verb: "ser", translation: "être", tense: "imparfait", pronoun: "yo", answer: "era", hint: "irrégulier" },
  { id: "c47", level: "A2", verb: "ir", translation: "aller", tense: "imparfait", pronoun: "nosotros", answer: "íbamos", hint: "irrégulier" },
  { id: "c48", level: "A2", verb: "ver", translation: "voir", tense: "imparfait", pronoun: "ellos", answer: "veían", hint: "irrégulier" },
  
  // B1 - FUTUR SIMPLE
  { id: "c49", level: "B1", verb: "hablar", translation: "parler", tense: "futur", pronoun: "yo", answer: "hablaré" },
  { id: "c50", level: "B1", verb: "comer", translation: "manger", tense: "futur", pronoun: "tú", answer: "comerás" },
  { id: "c51", level: "B1", verb: "vivir", translation: "vivre", tense: "futur", pronoun: "nosotros", answer: "viviremos" },
  { id: "c52", level: "B1", verb: "tener", translation: "avoir", tense: "futur", pronoun: "yo", answer: "tendré", hint: "tendr-" },
  { id: "c53", level: "B1", verb: "hacer", translation: "faire", tense: "futur", pronoun: "él", answer: "hará", hint: "har-" },
  { i
