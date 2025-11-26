"use client";
import { useMemo, useState } from "react";
import type { Level, Country } from "./LevelPicker";

// Import des JSON de conjugaison
import presenteRegulares from "@/data/grammar_quizz/presente_regulares.json";
import presenteIrregulares from "@/data/grammar_quizz/presente_irregulares.json";
import presenteProgresivo from "@/data/grammar_quizz/presente_progresivo.json";
import imperfecto from "@/data/grammar_quizz/imperfecto.json";
import preteritoIndefinidoReg from "@/data/grammar_quizz/preterito_indefinido_regulares.json";
import preteritoIndefinidoIrreg from "@/data/grammar_quizz/preterito_indefinido_irregulares.json";
import futuroSimpleReg from "@/data/grammar_quizz/futuro_simple_regulares.json";
import futuroSimpleIrreg from "@/data/grammar_quizz/futuro_simple_irregulares.json";

type ConjugationExercise = {
  id: string;
  level: "A1" | "A2" | "B1";
  verb: string;
  translation: string;
  tense: string;
  pronoun: string;
  answer: string;
  hint?: string;
  prompt: string;
};

type LearningMode = "theory" | "practice";

// Combiner tous les drills des JSON
const allDrills: ConjugationExercise[] = [
  ...presenteRegulares.drills.map((d: any, i: number) => ({
    id: `pres_reg_${i}`,
    level: "A1" as const,
    verb: d.prompt.match(/\(([^)]+)\)/)?.[1] || "",
    translation: "",
    tense: "présent",
    pronoun: d.prompt.split(' ')[1] || "yo",
    answer: d.answer,
    prompt: d.prompt
  })),
  ...presenteIrregulares.drills.map((d: any, i: number) => ({
    id: `pres_irreg_${i}`,
    level: "A1" as const,
    verb: d.prompt.match(/\(([^)]+)\)/)?.[1] || "",
    translation: "",
    tense: "présent",
    pronoun: d.prompt.split(' ')[1] || "yo",
    answer: d.answer,
    prompt: d.prompt
  })),
  ...presenteProgresivo.drills.map((d: any, i: number) => ({
    id: `pres_prog_${i}`,
    level: "A2" as const,
    verb: d.prompt.match(/\(([^)]+)\)/)?.[1] || "",
    translation: "",
    tense: "présent progressif",
    pronoun: "yo",
    answer: d.answer,
    prompt: d.prompt
  })),
  ...imperfecto.drills.map((d: any, i: number) => ({
    id: `imperf_${i}`,
    level: "A2" as const,
    verb: d.prompt.match(/\(([^)]+)\)/)?.[1] || "",
    translation: "",
    tense: "imparfait",
    pronoun: d.prompt.split(' ')[0] || "yo",
    answer: d.answer,
    prompt: d.prompt
  })),
  ...preteritoIndefinidoReg.drills.map((d: any, i: number) => ({
    id: `pret_reg_${i}`,
    level: "A2" as const,
    verb: d.prompt.match(/\(([^)]+)\)/)?.[1] || "",
    translation: "",
    tense: "passé simple",
    pronoun: d.prompt.split(' ')[1] || "yo",
    answer: d.answer,
    prompt: d.prompt
  })),
  ...preteritoIndefinidoIrreg.drills.map((d: any, i: number) => ({
    id: `pret_irreg_${i}`,
    level: "A2" as const,
    verb: d.prompt.match(/\(([^)]+)\)/)?.[1] || "",
    translation: "",
    tense: "passé simple",
    pronoun: d.prompt.split(' ')[1] || "yo",
    answer: d.answer,
    prompt: d.prompt
  })),
  ...futuroSimpleReg.drills.map((d: any, i: number) => ({
    id: `fut_reg_${i}`,
    level: "A2" as const,
    verb: d.prompt.match(/\(([^)]+)\)/)?.[1] || "",
    translation: "",
    tense: "futur",
    pronoun: d.prompt.split(' ')[1] || "yo",
    answer: d.answer,
    prompt: d.prompt
  })),
  ...futuroSimpleIrreg.drills.map((d: any, i: number) => ({
    id: `fut_irreg_${i}`,
    level: "A2" as const,
    verb: d.prompt.match(/\(([^)]+)\)/)?.[1] || "",
    translation: "",
    tense: "futur",
    pronoun: d.prompt.split(' ')[1] || "yo",
    answer: d.answer,
    prompt: d.prompt
  }))
];

const tenseExplanations: Record<string, any> = {
  "présent": { title: "Présent", note: presenteRegulares.note, level: "A1" },
  "présent progressif": { title: "Présent progressif", note: presenteProgresivo.note, level: "A2" },
  "imparfait": { title: "Imparfait", note: imperfecto.note, level: "A2" },
  "passé simple": { title: "Passé simple", note: preteritoIndefinidoReg.note, level: "A2" },
  "futur": { title: "Futur simple", note: futuroSimpleReg.note, level: "A2" }
};

function normalize(str: string): string {
  return str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default function Conjugation({ level, country }: { level: Level; country: Country; }) {
  const [mode, setMode] = useState<LearningMode>("theory");
  const [selectedTense, setSelectedTense] = useState<string>("présent");
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const filtered = useMemo(() => {
    let pool = allDrills;
    if (level !== "ALL") pool = pool.filter(e => e.level === level);
    if (selectedTense !== "all") pool = pool.filter(e => e.tense === selectedTense);
    return pool;
  }, [level, selectedTense]);

  const current = filtered[idx] ?? null;
  const isCorrect = current && normalize(answer) === normalize(current.answer);
  const tenseExpl = tenseExplanations[selectedTense];

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!showResult) { handleCheck(); } else { handleNext(); }
    }
  };

  const availableTenses = useMemo(() => {
    const tenses = new Set(allDrills.filter(c => !level || level === "ALL" || c.level === level).map(c => c.tense));
    return Array.from(tenses);
  }, [level]);

  return (
    <div className="vstack" style={{ gap: "16px" }}>
      <div className="card vstack">
        <strong>⚡ Maîtrise de la conjugaison espagnole</strong>
        <div className="hstack" style={{ gap: "12px", flexWrap: "wrap" }}>
          <label className="muted">Temps verbal :</label>
          <select value={selectedTense} onChange={(e) => {
            setSelectedTense(e.target.value);
            setIdx(0);
            setAnswer("");
            setShowResult(false);
          }} style={{ minWidth: "200px" }}>
            {availableTenses.map(t => (
              <option key={t} value={t}>{tenseExplanations[t]?.title || t}</option>
            ))}
          </select>
        </div>
        <div className="hstack" style={{ gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
          <button onClick={() => setMode("theory")} style={{
            background: mode === "theory" ? "#1e3a5f" : "#0f1720",
            border: mode === "theory" ? "2px solid #60a5fa" : "1px solid #334155",
            flex: 1, minWidth: "140px"
          }}>📚 Théorie</button>
          <button onClick={() => setMode("practice")} style={{
            background: mode === "practice" ? "#1e3a5f" : "#0f1720",
            border: mode === "practice" ? "2px solid #60a5fa" : "1px solid #334155",
            flex: 1, minWidth: "140px"
          }}>✏️ Pratique</button>
        </div>
        {mode === "practice" && (
          <div className="hstack" style={{ justifyContent: "flex-end", marginTop: "8px" }}>
            <span className="muted">
              Score: {score.correct}/{score.total} ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
            </span>
          </div>
        )}
      </div>

      {mode === "theory" && tenseExpl && (
        <div className="card" style={{ background: "#1e3a5f", whiteSpace: "pre-wrap", lineHeight: "1.8" }}>
          <h2 style={{ margin: "0 0 16px 0" }}>{tenseExpl.title}</h2>
          <div style={{ fontSize: "15px" }}>{tenseExpl.note}</div>
          <button onClick={() => setMode("practice")} style={{ 
            marginTop: "20px", padding: "12px", fontSize: "16px", background: "#60a5fa", border: "none"
          }}>✏️ Commencer à pratiquer →</button>
        </div>
      )}

      {mode === "practice" && current && (
        <div className="card vstack">
          <div style={{ fontSize: "18px", marginBottom: "12px" }} dangerouslySetInnerHTML={{ __html: current.prompt }} />

          <input placeholder="Écris la conjugaison..." value={answer} onChange={e => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown} disabled={showResult} autoFocus
            style={{
              fontSize: "18px", textAlign: "center",
              border: showResult ? isCorrect ? "2px solid #10b981" : "2px solid #ef4444" : "1px solid #334155"
            }}
          />

          {showResult && (
            <div className="card" style={{ 
              background: isCorrect ? "#064e3b" : "#7f1d1d",
              border: isCorrect ? "1px solid #10b981" : "1px solid #ef4444"
            }}>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                {isCorrect ? "✅ Parfait !" : "❌ Pas tout à fait"}
              </div>
              {!isCorrect && (
                <div style={{ marginTop: "12px" }}>
                  <div>La bonne réponse : <strong style={{ fontSize: "18px" }}>{current.answer}</strong></div>
                </div>
              )}
            </div>
          )}

          <div className="hstack" style={{ justifyContent: "space-between", gap: "8px" }}>
            {!showResult ? (
              <>
                <button onClick={handleCheck} disabled={!answer.trim()}>Vérifier (Entrée)</button>
                <button onClick={handleRandom}>🎲 Aléatoire</button>
              </>
            ) : (
              <button onClick={handleNext} style={{ flex: 1 }}>Suivant ▶ (Entrée)</button>
            )}
          </div>

          <div className="muted" style={{ textAlign: "center", fontSize: "12px" }}>
            Exercice {idx + 1} / {filtered.length}
          </div>
        </div>
      )}

      {!current && mode === "practice" && (
        <div className="card" style={{ background: "#0b1220", textAlign: "center", padding: "40px" }}>
          <div className="muted">Aucun exercice disponible.<br /><small>Essaie un autre temps !</small></div>
        </div>
      )}
    </div>
  );
}