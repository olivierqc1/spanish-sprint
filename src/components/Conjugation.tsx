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

type VerbConjugation = {
  infinitive: string;
  translation: string;
  type: "-AR" | "-ER" | "-IR" | "irrégulier";
  conjugations: Record<string, string>;
  notes?: string;
};

type TenseExplanation = {
  title: string;
  level: "A1" | "A2" | "B1";
  when: string;
  formation: {
    regular: { ar?: string; er?: string; ir?: string; };
    description: string;
  };
  examples: { spanish: string; french: string; }[];
  commonVerbs: { verb: string; conjugation: string; translation: string; }[];
  tips: string[];
  irregularities?: string[];
};

type LearningMode = "theory" | "practice" | "test";

const tenseExplanations: Record<string, TenseExplanation> = {
  "présent": {
    title: "Présent de l'indicatif (Presente)",
    level: "A1",
    when: "Actions habituelles, vérités générales, état actuel, actions en cours",
    formation: {
      regular: { ar: "o, as, a, amos, áis, an", er: "o, es, e, emos, éis, en", ir: "o, es, e, imos, ís, en" },
      description: "On retire la terminaison de l'infinitif (-ar, -er, -ir) et on ajoute les terminaisons selon le sujet"
    },
    examples: [
      { spanish: "Yo hablo español todos los días", french: "Je parle espagnol tous les jours" },
      { spanish: "Mi hermana come mucha fruta", french: "Ma sœur mange beaucoup de fruits" },
      { spanish: "Nosotros vivimos en Barcelona", french: "Nous vivons à Barcelone" }
    ],
    commonVerbs: [
      { verb: "hablar", conjugation: "hablo, hablas, habla, hablamos, habláis, hablan", translation: "parler" },
      { verb: "comer", conjugation: "como, comes, come, comemos, coméis, comen", translation: "manger" },
      { verb: "vivir", conjugation: "vivo, vives, vive, vivimos, vivís, viven", translation: "vivre" }
    ],
    tips: [
      "💡 Les terminaisons -ER et -IR sont presque identiques",
      "💡 Le présent espagnol = présent simple ET progressif",
      "⚠️ Diphtongues : e→ie (querer→quiero), o→ue (poder→puedo)"
    ],
    irregularities: [
      "ser: soy, eres, es, somos, sois, son",
      "estar: estoy, estás, está, estamos, estáis, están",
      "tener: tengo, tienes, tiene, tenemos, tenéis, tienen"
    ]
  }
};
const verbDatabase: Record<string, VerbConjugation> = {
  "hablar": {
    infinitive: "hablar",
    translation: "parler",
    type: "-AR",
    conjugations: {
      "yo": "hablo",
      "tú": "hablas",
      "él/ella/usted": "habla",
      "nosotros": "hablamos",
      "vosotros": "habláis",
      "ellos": "hablan"
    }
  },
  "comer": {
    infinitive: "comer",
    translation: "manger",
    type: "-ER",
    conjugations: {
      "yo": "como",
      "tú": "comes",
      "él/ella/usted": "come",
      "nosotros": "comemos",
      "vosotros": "coméis",
      "ellos": "comen"
    }
  },
  "vivir": {
    infinitive: "vivir",
    translation: "vivre",
    type: "-IR",
    conjugations: {
      "yo": "vivo",
      "tú": "vives",
      "él/ella/usted": "vive",
      "nosotros": "vivimos",
      "vosotros": "vivís",
      "ellos": "viven"
    }
  },
  "ser": {
    infinitive: "ser",
    translation: "être (essence)",
    type: "irrégulier",
    conjugations: {
      "yo": "soy",
      "tú": "eres",
      "él/ella/usted": "es",
      "nosotros": "somos",
      "vosotros": "sois",
      "ellos": "son"
    },
    notes: "Utilisé pour : essence, identité, profession, origine"
  },
  "estar": {
    infinitive: "estar",
    translation: "être (état/lieu)",
    type: "irrégulier",
    conjugations: {
      "yo": "estoy",
      "tú": "estás",
      "él/ella/usted": "está",
      "nosotros": "estamos",
      "vosotros": "estáis",
      "ellos": "están"
    },
    notes: "Utilisé pour : état temporaire, lieu, émotion"
  },
  "tener": {
    infinitive: "tener",
    translation: "avoir",
    type: "irrégulier",
    conjugations: {
      "yo": "tengo",
      "tú": "tienes",
      "él/ella/usted": "tiene",
      "nosotros": "tenemos",
      "vosotros": "tenéis",
      "ellos": "tienen"
    }
  },
  "ir": {
    infinitive: "ir",
    translation: "aller",
    type: "irrégulier",
    conjugations: {
      "yo": "voy",
      "tú": "vas",
      "él/ella/usted": "va",
      "nosotros": "vamos",
      "vosotros": "vais",
      "ellos": "van"
    }
  }
};

const conjugationBank: ConjugationExercise[] = [
  { id: "c1", level: "A1", verb: "hablar", translation: "parler", tense: "présent", pronoun: "yo", answer: "hablo" },
  { id: "c2", level: "A1", verb: "hablar", translation: "parler", tense: "présent", pronoun: "tú", answer: "hablas" },
  { id: "c3", level: "A1", verb: "comer", translation: "manger", tense: "présent", pronoun: "yo", answer: "como" },
  { id: "c4", level: "A1", verb: "vivir", translation: "vivre", tense: "présent", pronoun: "yo", answer: "vivo" },
  { id: "c5", level: "A1", verb: "ser", translation: "être", tense: "présent", pronoun: "yo", answer: "soy" },
  { id: "c6", level: "A1", verb: "estar", translation: "être", tense: "présent", pronoun: "yo", answer: "estoy" },
  { id: "c7", level: "A1", verb: "tener", translation: "avoir", tense: "présent", pronoun: "yo", answer: "tengo" },
  { id: "c8", level: "A1", verb: "ir", translation: "aller", tense: "présent", pronoun: "yo", answer: "voy" },
];

function normalize(str: string): string {
  return str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
export default function Conjugation({ level, country }: { level: Level; country: "ALL" | "spain" | "mexico"; }) {
  const [mode, setMode] = useState<LearningMode>("theory");
  const [selectedTense, setSelectedTense] = useState<string>("présent");
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const filtered = useMemo(() => {
    let pool = conjugationBank;
    if (level !== "ALL") pool = pool.filter(e => e.level === level);
    if (selectedTense !== "all") pool = pool.filter(e => e.tense === selectedTense);
    return pool;
  }, [level, selectedTense]);

  const current = filtered[idx] ?? null;
  const isCorrect = current && normalize(answer) === normalize(current.answer);
  const currentVerbData = current ? verbDatabase[current.verb] : null;
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
    const tenses = new Set(conjugationBank.filter(c => !level || level === "ALL" || c.level === level).map(c => c.tense));
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
          <button onClick={() => setMode("test")} style={{
            background: mode === "test" ? "#1e3a5f" : "#0f1720",
            border: mode === "test" ? "2px solid #60a5fa" : "1px solid #334155",
            flex: 1, minWidth: "140px"
          }}>🎯 Test</button>
        </div>
        {mode !== "theory" && (
          <div className="hstack" style={{ justifyContent: "space-between", marginTop: "8px" }}>
            <span className="muted" style={{ fontSize: "12px" }}>
              {mode === "practice" ? "✍️ Avec aide" : "🏆 Sans aide"}
            </span>
            <span className="muted">
              Score: {score.correct}/{score.total} ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
            </span>
          </div>
        )}
      </div>
     {mode === "theory" && tenseExpl && (
        <div className="vstack" style={{ gap: "16px" }}>
          <div className="card" style={{ background: "#1e3a5f" }}>
            <h2 style={{ margin: "0 0 12px 0" }}>
              {tenseExpl.title}
              <span className="badge" style={{ marginLeft: "12px", background: "#0f1720" }}>{tenseExpl.level}</span>
            </h2>
            <div style={{ fontSize: "16px", lineHeight: "1.6" }}>
              <strong>🎯 Quand l'utiliser ?</strong>
              <p style={{ marginTop: "8px" }}>{tenseExpl.when}</p>
            </div>
          </div>

          <div className="card">
            <h3 style={{ margin: "0 0 12px 0" }}>📐 Formation</h3>
            <p className="muted" style={{ marginBottom: "12px" }}>{tenseExpl.formation.description}</p>
            {tenseExpl.formation.regular.ar && (
              <div className="vstack" style={{ gap: "8px" }}>
                <div className="card" style={{ background: "#064e3b" }}>
                  <strong style={{ color: "#10b981" }}>Verbes en -AR</strong>
                  <div style={{ fontFamily: "monospace", fontSize: "16px", marginTop: "8px" }}>
                    {tenseExpl.formation.regular.ar}
                  </div>
                </div>
                <div className="card" style={{ background: "#1e3a5f" }}>
                  <strong style={{ color: "#60a5fa" }}>Verbes en -ER</strong>
                  <div style={{ fontFamily: "monospace", fontSize: "16px", marginTop: "8px" }}>
                    {tenseExpl.formation.regular.er}
                  </div>
                </div>
                <div className="card" style={{ background: "#713f12" }}>
                  <strong style={{ color: "#f59e0b" }}>Verbes en -IR</strong>
                  <div style={{ fontFamily: "monospace", fontSize: "16px", marginTop: "8px" }}>
                    {tenseExpl.formation.regular.ir}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="card">
            <h3 style={{ margin: "0 0 12px 0" }}>📝 Verbes fréquents</h3>
            <div className="vstack" style={{ gap: "12px" }}>
              {tenseExpl.commonVerbs.map((v, i) => (
                <div key={i} className="card" style={{ background: "#0b1220" }}>
                  <div className="hstack" style={{ justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong style={{ color: "#60a5fa" }}>{v.verb}</strong>
                    <span className="muted" style={{ fontSize: "13px" }}>({v.translation})</span>
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: "14px" }}>{v.conjugation}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ margin: "0 0 12px 0" }}>✅ Exemples</h3>
            <div className="vstack" style={{ gap: "12px" }}>
              {tenseExpl.examples.map((ex, i) => (
                <div key={i} className="card" style={{ background: "#064e3b" }}>
                  <div style={{ fontSize: "16px", marginBottom: "4px" }}>{ex.spanish}</div>
                  <div className="muted" style={{ fontSize: "14px" }}>→ {ex.french}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: "#713f12" }}>
            <h3 style={{ margin: "0 0 12px 0" }}>💡 Astuces</h3>
            <div className="vstack" style={{ gap: "8px" }}>
              {tenseExpl.tips.map((tip, i) => (
                <div key={i} style={{ fontSize: "14px" }}>{tip}</div>
              ))}
            </div>
          </div>

          {tenseExpl.irregularities && (
            <div className="card" style={{ background: "#7f1d1d" }}>
              <h3 style={{ margin: "0 0 12px 0" }}>⚠️ Verbes irréguliers</h3>
              <div className="vstack" style={{ gap: "4px" }}>
                {tenseExpl.irregularities.map((irreg, i) => (
                  <div key={i} style={{ fontSize: "14px", fontFamily: "monospace" }}>• {irreg}</div>
                ))}
              </div>
            </div>
          )}

          <button onClick={() => setMode("practice")} style={{ 
            padding: "16px", fontSize: "18px", background: "#1e3a5f", border: "2px solid #60a5fa"
          }}>✏️ Commencer à pratiquer →</button>
        </div>
      )}
      {mode === "practice" && currentVerbData && (
        <div className="card vstack">
          <div className="hstack" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>
              📋 {currentVerbData.infinitive}
              <span className="muted" style={{ marginLeft: "8px", fontSize: "16px" }}>({currentVerbData.translation})</span>
            </h3>
            <span className="badge" style={{ background: "#1e3a5f" }}>{currentVerbData.type}</span>
          </div>
          {currentVerbData.notes && (
            <div className="card" style={{ background: "#713f12", fontSize: "14px" }}>💡 {currentVerbData.notes}</div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px", fontSize: "16px" }}>
            {Object.entries(currentVerbData.conjugations).map(([pronoun, conjugation]) => (
              <>
                <div key={`${pronoun}-label`} style={{ 
                  textAlign: "right", 
                  fontWeight: current?.pronoun === pronoun.split('/')[0] ? "bold" : "normal",
                  color: current?.pronoun === pronoun.split('/')[0] ? "#60a5fa" : "#93a2b8"
                }}>{pronoun}</div>
                <div key={`${pronoun}-value`} style={{ 
                  fontWeight: current?.pronoun === pronoun.split('/')[0] ? "bold" : "normal",
                  color: current?.pronoun === pronoun.split('/')[0] ? "#60a5fa" : "#e5e7eb"
                }}>{conjugation}</div>
              </>
            ))}
          </div>
        </div>
      )}

      {(mode === "practice" || mode === "test") && current && (
        <div className="card vstack">
          <div className="hstack" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h3 style={{ margin: "0 0 8px 0" }}>
                <strong>{current.verb}</strong> <span className="muted">({current.translation})</span>
              </h3>
              <div className="muted">{current.tense} · <strong>{current.pronoun}</strong></div>
            </div>
            {current.hint && mode === "practice" && (
              <span className="badge" style={{ background: "#1e3a5f" }}>💡 {current.hint}</span>
            )}
          </div>

          <div style={{ background: "#0b1220", padding: "20px", borderRadius: "10px", fontSize: "20px", textAlign: "center" }}>
            {current.pronoun} <strong style={{ color: "#60a5fa" }}>________</strong>
          </div>

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

      {!current && mode !== "theory" && (
        <div className="card" style={{ background: "#0b1220", textAlign: "center", padding: "40px" }}>
          <div className="muted">Aucun exercice disponible.<br /><small>Essaie un autre temps !</small></div>
        </div>
      )}

    </div>
  );
}
