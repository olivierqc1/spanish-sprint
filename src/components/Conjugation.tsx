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

// Mode d'apprentissage
type LearningMode = "learn" | "practice" | "test";

// Base de données de conjugaisons complètes
const verbDatabase: Record<string, VerbConjugation> = {
  // PRÉSENT - Réguliers
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
    },
    notes: "Verbe régulier modèle en -AR"
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
    },
    notes: "Verbe régulier modèle en -ER"
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
    },
    notes: "Verbe régulier modèle en -IR"
  },
  // PRÉSENT - Irréguliers
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
    notes: "Irrégulier ! Utilisé pour essence, identité, profession, origine"
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
    notes: "Irrégulier ! Utilisé pour état temporaire, lieu, émotion"
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
    },
    notes: "Irrégulier à la 1re personne. Diphtongue e→ie sauf yo/nosotros"
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
    },
    notes: "Totalement irrégulier ! Conjugaison unique à mémoriser"
  },
  "hacer": {
    infinitive: "hacer",
    translation: "faire",
    type: "irrégulier",
    conjugations: {
      "yo": "hago",
      "tú": "haces",
      "él/ella/usted": "hace",
      "nosotros": "hacemos",
      "vosotros": "hacéis",
      "ellos": "hacen"
    },
    notes: "Irrégulier à yo : hago (g ajouté)"
  },
  "poder": {
    infinitive: "poder",
    translation: "pouvoir",
    type: "irrégulier",
    conjugations: {
      "yo": "puedo",
      "tú": "puedes",
      "él/ella/usted": "puede",
      "nosotros": "podemos",
      "vosotros": "podéis",
      "ellos": "pueden"
    },
    notes: "Diphtongue o→ue sauf nosotros/vosotros"
  },
};

// Explications par temps
const tenseExplanations: Record<string, any> = {
  "présent": {
    title: "Présent de l'indicatif",
    when: "Actions habituelles, vérités générales, état actuel",
    rules: [
      {
        type: "Verbes en -AR",
        endings: "o, as, a, amos, áis, an",
        example: "hablar → hablo, hablas, habla..."
      },
      {
        type: "Verbes en -ER",
        endings: "o, es, e, emos, éis, en",
        example: "comer → como, comes, come..."
      },
      {
        type: "Verbes en -IR",
        endings: "o, es, e, imos, ís, en",
        example: "vivir → vivo, vives, vive..."
      }
    ],
    tips: [
      "💡 Les terminaisons -ER et -IR sont presque identiques",
      "💡 Attention aux irréguliers : ser, estar, tener, ir...",
      "⚠️ Certains verbes ont des diphtongues : poder→puedo, querer→quiero"
    ],
    examples: [
      "Yo hablo español todos los días",
      "Mi hermana come mucha fruta",
      "Nosotros vivimos en Barcelona"
    ]
  }
};

const conjugationBank: ConjugationExercise[] = [
  // A1 - PRÉSENT RÉGULIERS
  { id: "c1", level: "A1", verb: "hablar", translation: "parler", tense: "présent", pronoun: "yo", answer: "hablo" },
  { id: "c2", level: "A1", verb: "hablar", translation: "parler", tense: "présent", pronoun: "tú", answer: "hablas" },
  { id: "c3", level: "A1", verb: "hablar", translation: "parler", tense: "présent", pronoun: "él", answer: "habla" },
  { id: "c4", level: "A1", verb: "comer", translation: "manger", tense: "présent", pronoun: "yo", answer: "como" },
  { id: "c5", level: "A1", verb: "comer", translation: "manger", tense: "présent", pronoun: "tú", answer: "comes" },
  { id: "c6", level: "A1", verb: "comer", translation: "manger", tense: "présent", pronoun: "ella", answer: "come" },
  { id: "c7", level: "A1", verb: "vivir", translation: "vivre", tense: "présent", pronoun: "yo", answer: "vivo" },
  { id: "c8", level: "A1", verb: "vivir", translation: "vivre", tense: "présent", pronoun: "tú", answer: "vives" },
  { id: "c9", level: "A1", verb: "vivir", translation: "vivre", tense: "présent", pronoun: "nosotros", answer: "vivimos" },
  
  // A1 - PRÉSENT IRRÉGULIERS
  { id: "c10", level: "A1", verb: "ser", translation: "être", tense: "présent", pronoun: "yo", answer: "soy", hint: "essence" },
  { id: "c11", level: "A1", verb: "ser", translation: "être", tense: "présent", pronoun: "tú", answer: "eres", hint: "essence" },
  { id: "c12", level: "A1", verb: "ser", translation: "être", tense: "présent", pronoun: "él", answer: "es", hint: "essence" },
  { id: "c13", level: "A1", verb: "estar", translation: "être", tense: "présent", pronoun: "yo", answer: "estoy", hint: "état/lieu" },
  { id: "c14", level: "A1", verb: "estar", translation: "être", tense: "présent", pronoun: "tú", answer: "estás", hint: "état/lieu" },
  { id: "c15", level: "A1", verb: "estar", translation: "être", tense: "présent", pronoun: "ella", answer: "está", hint: "état/lieu" },
  { id: "c16", level: "A1", verb: "tener", translation: "avoir", tense: "présent", pronoun: "yo", answer: "tengo" },
  { id: "c17", level: "A1", verb: "tener", translation: "avoir", tense: "présent", pronoun: "tú", answer: "tienes" },
  { id: "c18", level: "A1", verb: "tener", translation: "avoir", tense: "présent", pronoun: "ellos", answer: "tienen" },
  { id: "c19", level: "A1", verb: "ir", translation: "aller", tense: "présent", pronoun: "yo", answer: "voy" },
  { id: "c20", level: "A1", verb: "ir", translation: "aller", tense: "présent", pronoun: "nosotros", answer: "vamos" },
  { id: "c21", level: "A1", verb: "hacer", translation: "faire", tense: "présent", pronoun: "yo", answer: "hago" },
  { id: "c22", level: "A1", verb: "poder", translation: "pouvoir", tense: "présent", pronoun: "yo", answer: "puedo", hint: "o→ue" },
  { id: "c23", level: "A1", verb: "poder", translation: "pouvoir", tense: "présent", pronoun: "tú", answer: "puedes", hint: "o→ue" },
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
  const [mode, setMode] = useState<LearningMode>("learn");
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showConjugation, setShowConjugation] = useState(true);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const filtered = useMemo(() => {
    let pool = conjugationBank;
    if (level !== "ALL") pool = pool.filter(e => e.level === level);
    return pool;
  }, [level]);

  const current = filtered[idx] ?? null;
  const isCorrect = current && normalize(answer) === normalize(current.answer);
  const currentVerbData = current ? verbDatabase[current.verb] : null;

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

  const explanation = tenseExplanations[current.tense];

  return (
    <div className="vstack" style={{ gap: "16px" }}>
      
      {/* SÉLECTEUR DE MODE */}
      <div className="card vstack">
        <strong>⚡ Conjugaison interactive</strong>
        
        <div className="hstack" style={{ gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => setMode("learn")}
            style={{
              background: mode === "learn" ? "#1e3a5f" : "#0f1720",
              border: mode === "learn" ? "2px solid #60a5fa" : "1px solid #334155",
              flex: 1,
              minWidth: "120px"
            }}
          >
            📚 Apprendre
          </button>
          <button
            onClick={() => setMode("practice")}
            style={{
              background: mode === "practice" ? "#1e3a5f" : "#0f1720",
              border: mode === "practice" ? "2px solid #60a5fa" : "1px solid #334155",
              flex: 1,
              minWidth: "120px"
            }}
          >
            ✏️ Pratiquer
          </button>
          <button
            onClick={() => setMode("test")}
            style={{
              background: mode === "test" ? "#1e3a5f" : "#0f1720",
              border: mode === "test" ? "2px solid #60a5fa" : "1px solid #334155",
              flex: 1,
              minWidth: "120px"
            }}
          >
            🎯 Tester
          </button>
        </div>

        <div className="muted" style={{ fontSize: "12px", marginTop: "8px" }}>
          {mode === "learn" && "📖 Étudie les règles et exemples"}
          {mode === "practice" && "✍️ Pratique avec aide (tableau visible)"}
          {mode === "test" && "🏆 Teste-toi sans aide !"}
        </div>

        <div className="hstack" style={{ justifyContent: "space-between", marginTop: "8px" }}>
          <span className="badge">{current.level} · {current.tense}</span>
          <span className="muted">
            Score: {score.correct}/{score.total} ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
          </span>
        </div>
      </div>

      {/* MODE APPRENDRE - EXPLICATIONS */}
      {mode === "learn" && explanation && (
        <div className="card vstack">
          <h3 style={{ margin: "0 0 12px 0" }}>📚 {explanation.title}</h3>
          
          <div className="card" style={{ background: "#1e3a5f" }}>
            <strong>🎯 Quand l'utiliser ?</strong>
            <p style={{ margin: "8px 0 0 0" }}>{explanation.when}</p>
          </div>

          <div className="vstack">
            <strong>📐 Formation</strong>
            {explanation.rules.map((rule: any, i: number) => (
              <div key={i} className="card" style={{ background: "#0b1220" }}>
                <div className="hstack" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <strong style={{ color: "#60a5fa" }}>{rule.type}</strong>
                    <div className="muted" style={{ fontSize: "14px", marginTop: "4px" }}>
                      Terminaisons : <strong>{rule.endings}</strong>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "8px", fontSize: "14px" }}>
                  Exemple : <code style={{ background: "#1f2a37", padding: "2px 6px", borderRadius: "4px" }}>{rule.example}</code>
                </div>
              </div>
            ))}
          </div>

          <div className="vstack">
            <strong>💡 Astuces</strong>
            {explanation.tips.map((tip: string, i: number) => (
              <div key={i} className="muted" style={{ fontSize: "14px" }}>
                {tip}
              </div>
            ))}
          </div>

          <div className="vstack">
            <strong>✅ Exemples en contexte</strong>
            {explanation.examples.map((ex: string, i: number) => (
              <div key={i} className="card" style={{ background: "#064e3b", fontSize: "14px" }}>
                {ex}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TABLEAU DE CONJUGAISON COMPLÈTE */}
      {(mode === "learn" || mode === "practice") && currentVerbData && (
        <div className="card vstack">
          <div className="hstack" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>
              📋 {currentVerbData.infinitive}
              <span className="muted" style={{ marginLeft: "8px", fontSize: "16px" }}>
                ({currentVerbData.translation})
              </span>
            </h3>
            <span className="badge" style={{ background: "#1e3a5f" }}>
              {currentVerbData.type}
            </span>
          </div>

          {currentVerbData.notes && (
            <div className="card" style={{ background: "#713f12", fontSize: "14px" }}>
              💡 {currentVerbData.notes}
            </div>
          )}

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "auto 1fr", 
            gap: "8px",
            fontSize: "16px"
          }}>
            {Object.entries(currentVerbData.conjugations).map(([pronoun, conjugation]) => (
              <>
                <div key={`${pronoun}-label`} style={{ 
                  textAlign: "right", 
                  color: "#93a2b8",
                  fontWeight: current.pronoun === pronoun.split('/')[0] ? "bold" : "normal",
                  color: current.pronoun === pronoun.split('/')[0] ? "#60a5fa" : "#93a2b8"
                }}>
                  {pronoun}
                </div>
                <div key={`${pronoun}-value`} style={{ 
                  fontWeight: current.pronoun === pronoun.split('/')[0] ? "bold" : "normal",
                  color: current.pronoun === pronoun.split('/')[0] ? "#60a5fa" : "#e5e7eb"
                }}>
                  {conjugation}
                </div>
              </>
            ))}
          </div>
        </div>
      )}

      {/* EXERCICE PRATIQUE */}
      {(mode === "practice" || mode === "test") && (
        <div className="card vstack">
          <div className="hstack" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h3 style={{ margin: "0 0 8px 0" }}>
                <strong>{current.verb}</strong> 
                <span className="muted"> ({current.translation})</span>
              </h3>
              <div className="muted">
                {current.tense} · <strong>{current.pronoun}</strong>
              </div>
            </div>
            {current.hint && mode === "practice" && (
              <span className="badge" style={{ background: "#1e3a5f" }}>
                💡 {current.hint}
              </span>
            )}
          </div>

          <div style={{ 
            background: "#0b1220", 
            padding: "20px", 
            borderRadius: "10px",
            fontSize: "20px",
            textAlign: "center"
          }}>
            {current.pronoun} <strong style={{ color: "#60a5fa" }}>________</strong>
          </div>

          <input
            placeholder="Écris la conjugaison..."
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={showResult}
            autoFocus
            style={{
              fontSize: "18px",
              textAlign: "center",
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
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                {isCorrect ? "✅ Parfait !" : "❌ Pas tout à fait"}
              </div>
              {!isCorrect && (
                <div style={{ marginTop: "12px" }}>
                  <div>La bonne réponse : <strong style={{ fontSize: "18px" }}>{current.answer}</strong></div>
                  {mode === "test" && currentVerbData && (
                    <div style={{ marginTop: "8px", fontSize: "14px" }}>
                      💡 Conjugaison complète :
                      <div style={{ marginTop: "4px" }}>
                        {Object.entries(currentVerbData.conjugations).map(([p, c]) => (
                          <span key={p} style={{ marginRight: "12px" }}>
                            {p.split('/')[0]}: <strong>{c}</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
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
              <button onClick={handleNext} style={{ flex: 1 }}>
                Suivant ▶ (Entrée)
              </button>
            )}
          </div>

          <div className="muted" style={{ textAlign: "center", fontSize: "12px" }}>
            Exercice {idx + 1} / {filtered.length}
          </div>
        </div>
      )}

      {/* CONSEILS GÉNÉRAUX */}
      <div className="card" style={{ background: "#0b1220" }}>
        <strong>💡 Conseils d'utilisation</strong>
        <div className="vstack" style={{ gap: "8px", fontSize: "14px", marginTop: "8px" }}>
          <div>1️⃣ Commence en mode <strong>Apprendre</strong> pour comprendre les règles</div>
          <div>2️⃣ Passe en mode <strong>Pratiquer</strong> avec le tableau sous les yeux</div>
          <div>3️⃣ Teste-toi en mode <strong>Test</strong> sans aide pour vérifier ta maîtrise</div>
          <div>4️⃣ Répète régulièrement les verbes difficiles !</div>
        </div>
      </div>

    </div>
  );
      }
