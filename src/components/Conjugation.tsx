"use client";
import { useMemo, useState } from "react";
import type { Level } from "./LevelPicker";

type ConjugationExercise = {
  id: string;
  level: "A1" | "A2" | "B1";
  verb: string;
  translation: string;
  tense: string;
  pronoun: string;
  answer: string;
  hint?: string;
};

// Banque complète d'exercices de conjugaison (60+)
const conjugationBank: ConjugationExercise[] = [
  // ==================== A1 - PRÉSENT RÉGULIERS (20) ====================
  // -AR
  { id: "c1", level: "A1", verb: "hablar", translation: "parler", tense: "présent", pronoun: "yo", answer: "hablo" },
  { id: "c2", level: "A1", verb: "trabajar", translation: "travailler", tense: "présent", pronoun: "tú", answer: "trabajas" },
  { id: "c3", level: "A1", verb: "estudiar", translation: "étudier", tense: "présent", pronoun: "él", answer: "estudia" },
  { id: "c4", level: "A1", verb: "mirar", translation: "regarder", tense: "présent", pronoun: "nosotros", answer: "miramos" },
  { id: "c5", level: "A1", verb: "bailar", translation: "danser", tense: "présent", pronoun: "vosotros", answer: "bailáis" },
  { id: "c6", level: "A1", verb: "cantar", translation: "chanter", tense: "présent", pronoun: "ellos", answer: "cantan" },
  { id: "c7", level: "A1", verb: "comprar", translation: "acheter", tense: "présent", pronoun: "yo", answer: "compro" },
  { id: "c8", level: "A1", verb: "cocinar", translation: "cuisiner", tense: "présent", pronoun: "ella", answer: "cocina" },
  
  // -ER
  { id: "c9", level: "A1", verb: "comer", translation: "manger", tense: "présent", pronoun: "yo", answer: "como" },
  { id: "c10", level: "A1", verb: "beber", translation: "boire", tense: "présent", pronoun: "tú", answer: "bebes" },
  { id: "c11", level: "A1", verb: "leer", translation: "lire", tense: "présent", pronoun: "ella", answer: "lee" },
  { id: "c12", level: "A1", verb: "vender", translation: "vendre", tense: "présent", pronoun: "nosotros", answer: "vendemos" },
  { id: "c13", level: "A1", verb: "aprender", translation: "apprendre", tense: "présent", pronoun: "vosotros", answer: "aprendéis" },
  { id: "c14", level: "A1", verb: "correr", translation: "courir", tense: "présent", pronoun: "ellos", answer: "corren" },
  
  // -IR
  { id: "c15", level: "A1", verb: "vivir", translation: "vivre", tense: "présent", pronoun: "yo", answer: "vivo" },
  { id: "c16", level: "A1", verb: "escribir", translation: "écrire", tense: "présent", pronoun: "tú", answer: "escribes" },
  { id: "c17", level: "A1", verb: "abrir", translation: "ouvrir", tense: "présent", pronoun: "ella", answer: "abre" },
  { id: "c18", level: "A1", verb: "recibir", translation: "recevoir", tense: "présent", pronoun: "nosotros", answer: "recibimos" },
  { id: "c19", level: "A1", verb: "subir", translation: "monter", tense: "présent", pronoun: "vosotros", answer: "subís" },
  { id: "c20", level: "A1", verb: "decidir", translation: "décider", tense: "présent", pronoun: "ellos", answer: "deciden" },

  // ==================== A1 - PRÉSENT IRRÉGULIERS (15) ====================
  { id: "c21", level: "A1", verb: "ser", translation: "être", tense: "présent", pronoun: "yo", answer: "soy", hint: "essence" },
  { id: "c22", level: "A1", verb: "ser", translation: "être", tense: "présent", pronoun: "tú", answer: "eres", hint: "essence" },
  { id: "c23", level: "A1", verb: "ser", translation: "être", tense: "présent", pronoun: "ellos", answer: "son", hint: "essence" },
  { id: "c24", level: "A1", verb: "estar", translation: "être", tense: "présent", pronoun: "yo", answer: "estoy", hint: "état/lieu" },
  { id: "c25", level: "A1", verb: "estar", translation: "être", tense: "présent", pronoun: "él", answer: "está", hint: "état/lieu" },
  { id: "c26", level: "A1", verb: "tener", translation: "avoir", tense: "présent", pronoun: "yo", answer: "tengo" },
  { id: "c27", level: "A1", verb: "tener", translation: "avoir", tense: "présent", pronoun: "tú", answer: "tienes" },
  { id: "c28", level: "A1", verb: "ir", translation: "aller", tense: "présent", pronoun: "yo", answer: "voy" },
  { id: "c29", level: "A1", verb: "ir", translation: "aller", tense: "présent", pronoun: "nosotros", answer: "vamos" },
  { id: "c30", level: "A1", verb: "hacer", translation: "faire", tense: "présent", pronoun: "yo", answer: "hago" },
  { id: "c31", level: "A1", verb: "poder", translation: "pouvoir", tense: "présent", pronoun: "yo", answer: "puedo", hint: "o→ue" },
  { id: "c32", level: "A1", verb: "querer", translation: "vouloir", tense: "présent", pronoun: "tú", answer: "quieres", hint: "e→ie" },
  { id: "c33", level: "A1", verb: "venir", translation: "venir", tense: "présent", pronoun: "yo", answer: "vengo" },
  { id: "c34", level: "A1", verb: "salir", translation: "sortir", tense: "présent", pronoun: "yo", answer: "salgo" },
  { id: "c35", level: "A1", verb: "decir", translation: "dire", tense: "présent", pronoun: "yo", answer: "digo" },

  // ==================== A2 - PRETÉRITO INDEFINIDO RÉGULIERS (12) ====================
  { id: "c36", level: "A2", verb: "hablar", translation: "parler", tense: "passé simple", pronoun: "yo", answer: "hablé" },
  { id: "c37", level: "A2", verb: "trabajar", translation: "travailler", tense: "passé simple", pronoun: "tú", answer: "trabajaste" },
  { id: "c38", level: "A2", verb: "estudiar", translation: "étudier", tense: "passé simple", pronoun: "ella", answer: "estudió" },
  { id: "c39", level: "A2", verb: "comprar", translation: "acheter", tense: "passé simple", pronoun: "nosotros", answer: "compramos" },
  { id: "c40", level: "A2", verb: "comer", translation: "manger", tense: "passé simple", pronoun: "yo", answer: "comí" },
  { id: "c41", level: "A2", verb: "beber", translation: "boire", tense: "passé simple", pronoun: "tú", answer: "bebiste" },
  { id: "c42", level: "A2", verb: "vender", translation: "vendre", tense: "passé simple", pronoun: "ella", answer: "vendió" },
  { id: "c43", level: "A2", verb: "vivir", translation: "vivre", tense: "passé simple", pronoun: "yo", answer: "viví" },
  { id: "c44", level: "A2", verb: "escribir", translation: "écrire", tense: "passé simple", pronoun: "tú", answer: "escribiste" },
  { id: "c45", level: "A2", verb: "abrir", translation: "ouvrir", tense: "passé simple", pronoun: "él", answer: "abrió" },
  { id: "c46", level: "A2", verb: "pagar", translation: "payer", tense: "passé simple", pronoun: "yo", answer: "pagué", hint: "g→gu" },
  { id: "c47", level: "A2", verb: "buscar", translation: "chercher", tense: "passé simple", pronoun: "yo", answer: "busqué", hint: "c→qu" },

  // ==================== A2 - PRETÉRITO INDEFINIDO IRRÉGULIERS (10) ====================
  { id: "c48", level: "A2", verb: "tener", translation: "avoir", tense: "passé simple", pronoun: "yo", answer: "tuve", hint: "tuv-" },
  { id: "c49", level: "A2", verb: "estar", translation: "être", tense: "passé simple", pronoun: "ella", answer: "estuvo", hint: "estuv-" },
  { id: "c50", level: "A2", verb: "poder", translation: "pouvoir", tense: "passé simple", pronoun: "nosotros", answer: "pudimos", hint: "pud-" },
  { id: "c51", level: "A2", verb: "hacer", translation: "faire", tense: "passé simple", pronoun: "él", answer: "hizo", hint: "hiz-" },
  { id: "c52", level: "A2", verb: "ir/ser", translation: "aller/être", tense: "passé simple", pronoun: "yo", answer: "fui" },
  { id: "c53", level: "A2", verb: "dar", translation: "donner", tense: "passé simple", pronoun: "yo", answer: "di" },
  { id: "c54", level: "A2", verb: "querer", translation: "vouloir", tense: "passé simple", pronoun: "tú", answer: "quisiste", hint: "quis-" },
  { id: "c55", level: "A2", verb: "venir", translation: "venir", tense: "passé simple", pronoun: "ellos", answer: "vinieron", hint: "vin-" },
  { id: "c56", level: "A2", verb: "decir", translation: "dire", tense: "passé simple", pronoun: "nosotros", answer: "dijimos", hint: "dij-" },
  { id: "c57", level: "A2", verb: "traer", translation: "apporter", tense: "passé simple", pronoun: "ellos", answer: "trajeron", hint: "traj-" },

  // ==================== B1 - FUTUR SIMPLE (10) ====================
  { id: "c58", level: "B1", verb: "hablar", translation: "parler", tense: "futur", pronoun: "yo", answer: "hablaré" },
  { id: "c59", level: "B1", verb: "comer", translation: "manger", tense: "futur", pronoun: "ella", answer: "comerá" },
  { id: "c60", level: "B1", verb: "vivir", translation: "vivre", tense: "futur", pronoun: "nosotros", answer: "viviremos" },
  { id: "c61", level: "B1", verb: "tener", translation: "avoir", tense: "futur", pronoun: "yo", answer: "tendré", hint: "tendr-" },
  { id: "c62", level: "B1", verb: "hacer", translation: "faire", tense: "futur", pronoun: "tú", answer: "harás", hint: "har-" },
  { id: "c63", level: "B1", verb: "decir", translation: "dire", tense: "futur", pronoun: "él", answer: "dirá", hint: "dir-" },
  { id: "c64", level: "B1", verb: "poder", translation: "pouvoir", tense: "futur", pronoun: "nosotros", answer: "podremos", hint: "podr-" },
  { id: "c65", level: "B1", verb: "querer", translation: "vouloir", tense: "futur", pronoun: "ellos", answer: "querrán", hint: "querr-" },
  { id: "c66", level: "B1", verb: "venir", translation: "venir", tense: "futur", pronoun: "yo", answer: "vendré", hint: "vendr-" },
  { id: "c67", level: "B1", verb: "salir", translation: "sortir", tense: "futur", pronoun: "ella", answer: "saldrá", hint: "saldr-" },
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

  // Raccourci clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!showResult) {
        handleCheck();
      } else {
        handleNext();
      }
    }
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
          onKeyDown={handleKeyDown}
          disabled={showResult}
          autoFocus
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
                Vérifier (Entrée)
              </button>
              <button onClick={handleRandom}>
                🎲 Aléatoire
              </button>
            </>
          ) : (
            <>
              <button onClick={handleNext} style={{ flex: 1 }}>
                Suivant ▶ (Entrée)
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
