"use client";
import { useMemo, useState, useEffect } from "react";
import type { Level } from "./LevelPicker";

export type Card = {
  id: string;
  front: string;
  back: string;
  level?: Exclude<Level, "ALL">;
  tag?: string;
  country?: "Espagne" | "Mexique";
};

type FlashcardMode = "flip" | "type";

export default function Flashcards({
  cards, level, country
}: {
  cards: Card[];
  level: Level;
  country: "ALL" | "spain" | "mexico";
}) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const [mode, setMode] = useState<FlashcardMode>("flip");

  const filtered = useMemo(() => {
    let pool = cards;
    if (level !== "ALL") pool = pool.filter(c => c.level === level);
    if (country !== "ALL") pool = pool.filter(c => (country==="spain"? c.country==="Espagne" : c.country==="Mexique"));
    return pool.filter(c => (c.front + " " + c.back + " " + (c.tag ?? "")).toLowerCase().includes(q.toLowerCase()));
  }, [cards, q, level, country]);

  const cur = filtered[idx] ?? null;

  const handleNext = () => {
    setIdx(i => Math.min(filtered.length - 1, i + 1));
  };

  const handlePrev = () => {
    setIdx(i => Math.max(0, i - 1));
  };

  return (
    <div className="card vstack">
      {/* EN-TÊTE */}
      <div className="hstack" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <strong>🎴 Flashcards</strong>
        
        <div className="hstack" style={{ gap: "8px" }}>
          <button
            onClick={() => setMode("flip")}
            style={{
              background: mode === "flip" ? "#1e3a5f" : "#0f1720",
              border: mode === "flip" ? "2px solid #60a5fa" : "1px solid #334155",
              padding: "6px 12px",
              fontSize: "12px"
            }}
          >
            👆 Cliquer
          </button>
          <button
            onClick={() => setMode("type")}
            style={{
              background: mode === "type" ? "#1e3a5f" : "#0f1720",
              border: mode === "type" ? "2px solid #60a5fa" : "1px solid #334155",
              padding: "6px 12px",
              fontSize: "12px"
            }}
          >
            ⌨️ Écrire
          </button>
        </div>

        <input 
          placeholder="Recherche..." 
          value={q} 
          onChange={e => { setQ(e.target.value); setIdx(0); }}
          style={{ minWidth: "200px" }}
        />
      </div>

      <div className="muted" style={{ fontSize: "12px" }}>
        {mode === "flip" ? "👆 Clique sur la carte pour la retourner" : "⌨️ Écris la réponse puis valide"}
      </div>

      {/* CARTE */}
      {!cur ? (
        <div className="card" style={{ background: "#0b1220", padding: "40px", textAlign: "center" }}>
          <div className="muted">Aucune carte pour ce filtre.</div>
        </div>
      ) : mode === "flip" ? (
        <FlipCard 
          front={cur.front} 
          back={cur.back} 
          tag={cur.tag} 
          idx={idx} 
          total={filtered.length}
          onPrev={handlePrev} 
          onNext={handleNext} 
        />
      ) : (
        <TypeCard 
          front={cur.front} 
          back={cur.back} 
          tag={cur.tag} 
          idx={idx} 
          total={filtered.length}
          onPrev={handlePrev} 
          onNext={handleNext} 
        />
      )}

    </div>
  );
}

// MODE FLIP : Cliquer pour retourner
function FlipCard({
  front, back, tag, idx, total, onPrev, onNext
}: {
  front: string; 
  back: string; 
  tag?: string; 
  idx: number; 
  total: number;
  onPrev: () => void; 
  onNext: () => void;
}) {
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    setShowBack(false);
  }, [idx]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        setShowBack(s => !s);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setShowBack(false);
        onPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setShowBack(false);
        onNext();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onPrev, onNext]);

  return (
    <div className="vstack">
      <div className="hstack" style={{ justifyContent: "space-between" }}>
        <span className="badge">{tag ?? "vocabulaire"}</span>
        <span className="muted">{idx + 1} / {total}</span>
      </div>

      <div 
        onClick={() => setShowBack(s => !s)} 
        style={{
          cursor: "pointer",
          background: showBack ? "#064e3b" : "#0b1220",
          border: showBack ? "2px solid #10b981" : "2px solid #334155",
          borderRadius: "12px",
          padding: "48px 24px",
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s",
          userSelect: "none"
        }}
      >
        <h2 style={{ 
          textAlign: "center", 
          margin: 0,
          fontSize: showBack ? "28px" : "32px",
          color: showBack ? "#10b981" : "#e5e7eb"
        }}>
          {showBack ? back : front}
        </h2>
      </div>

      <div className="hstack" style={{ justifyContent: "space-between" }}>
        <button 
          onClick={(e) => { e.stopPropagation(); setShowBack(false); onPrev(); }}
          disabled={idx === 0}
        >
          ◀ Précédent
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); setShowBack(false); onNext(); }}
          disabled={idx === total - 1}
        >
          Suivant ▶
        </button>
      </div>

      <div className="muted" style={{ textAlign: "center", fontSize: "12px" }}>
        Raccourcis : <kbd style={{ background: "#1f2a37", padding: "2px 6px", borderRadius: "4px" }}>Espace</kbd> retourner · 
        <kbd style={{ background: "#1f2a37", padding: "2px 6px", borderRadius: "4px", marginLeft: "4px" }}>← →</kbd> naviguer
      </div>
    </div>
  );
}

// MODE TYPE : Écrire la réponse
function TypeCard({
  front, back, tag, idx, total, onPrev, onNext
}: {
  front: string; 
  back: string; 
  tag?: string; 
  idx: number; 
  total: number;
  onPrev: () => void; 
  onNext: () => void;
}) {
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    setAnswer("");
    setShowResult(false);
  }, [idx]);

  const normalize = (str: string) => {
    return str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const isCorrect = normalize(answer) === normalize(back);
  const isSimilar = !isCorrect && answer.length > 2 && normalize(back).includes(normalize(answer));

  const handleCheck = () => {
    if (!answer.trim()) return;
    setShowResult(true);
    if (isCorrect) {
      setScore(s => ({ correct: s.correct + 1, total: s.total + 1 }));
    } else {
      setScore(s => ({ ...s, total: s.total + 1 }));
    }
  };

  const handleNext = () => {
    setAnswer("");
    setShowResult(false);
    onNext();
  };

  const handleSkip = () => {
    setAnswer("");
    setShowResult(false);
    setScore(s => ({ ...s, total: s.total + 1 }));
    onNext();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!showResult) {
        handleCheck();
      } else {
        handleNext();
      }
    }
  };

  return (
    <div className="vstack">
      <div className="hstack" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <span className="badge">{tag ?? "vocabulaire"}</span>
        <span className="muted">
          Score : {score.correct}/{score.total} ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
        </span>
        <span className="muted">{idx + 1} / {total}</span>
      </div>

      <div 
        style={{
          background: "#0b1220",
          border: "2px solid #334155",
          borderRadius: "12px",
          padding: "32px 24px",
          minHeight: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h2 style={{ textAlign: "center", margin: 0, fontSize: "32px" }}>
          {front}
        </h2>
      </div>

      <input
        type="text"
        placeholder="Écris ta réponse en espagnol..."
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={showResult}
        autoFocus
        style={{
          fontSize: "18px",
          textAlign: "center",
          padding: "16px",
          border: showResult 
            ? isCorrect 
              ? "2px solid #10b981" 
              : isSimilar
                ? "2px solid #f59e0b"
                : "2px solid #ef4444"
            : "1px solid #334155"
        }}
      />

      {showResult && (
        <div 
          className="card" 
          style={{ 
            background: isCorrect ? "#064e3b" : isSimilar ? "#713f12" : "#7f1d1d",
            border: isCorrect ? "1px solid #10b981" : isSimilar ? "1px solid #f59e0b" : "1px solid #ef4444"
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            {isCorrect ? "✅ Parfait !" : isSimilar ? "⚠️ Presque !" : "❌ Pas tout à fait"}
          </div>
          {!isCorrect && (
            <div style={{ marginTop: "12px", fontSize: "18px" }}>
              La bonne réponse : <strong>{back}</strong>
            </div>
          )}
        </div>
      )}

      <div className="hstack" style={{ justifyContent: "space-between", gap: "8px" }}>
        {!showResult ? (
          <>
            <button onClick={handleSkip}>⏭️ Passer</button>
            <button onClick={handleCheck} disabled={!answer.trim()} style={{ flex: 1 }}>
              Vérifier (Entrée)
            </button>
          </>
        ) : (
          <button onClick={handleNext} style={{ flex: 1 }}>
            Suivant ▶ (Entrée)
          </button>
        )}
      </div>
    </div>
  );
            }
