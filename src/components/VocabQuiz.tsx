"use client";
import { useMemo, useState } from "react";
import type { Level } from "./LevelPicker";

type VocabQuestion = {
  id: string;
  level: Exclude<Level, "ALL">;
  theme: string;
  question: string;
  options: string[];
  correct: number; // index de la bonne réponse
  explanation?: string;
};

const vocabQuestions: VocabQuestion[] = [
  // A1 - NOURRITURE
  {
    id: "v1",
    level: "A1",
    theme: "Nourriture",
    question: "Comment dit-on 'pain' en espagnol ?",
    options: ["pan", "pato", "papa", "pino"],
    correct: 0,
  },
  {
    id: "v2",
    level: "A1",
    theme: "Nourriture",
    question: "Quel mot signifie 'eau' ?",
    options: ["aire", "agua", "arena", "alma"],
    correct: 1,
  },
  {
    id: "v3",
    level: "A1",
    theme: "Nourriture",
    question: "'Manzana' signifie :",
    options: ["orange", "banane", "pomme", "poire"],
    correct: 2,
  },
  {
    id: "v4",
    level: "A1",
    theme: "Nourriture",
    question: "Comment dit-on 'viande' ?",
    options: ["carne", "caro", "carta", "casa"],
    correct: 0,
  },
  
  // A1 - FAMILLE
  {
    id: "v5",
    level: "A1",
    theme: "Famille",
    question: "'Hermano' veut dire :",
    options: ["sœur", "frère", "cousin", "oncle"],
    correct: 1,
  },
  {
    id: "v6",
    level: "A1",
    theme: "Famille",
    question: "Comment dit-on 'mère' ?",
    options: ["madre", "mujer", "menor", "mayor"],
    correct: 0,
  },
  {
    id: "v7",
    level: "A1",
    theme: "Famille",
    question: "'Abuelo' signifie :",
    options: ["père", "grand-père", "frère", "fils"],
    correct: 1,
  },
  {
    id: "v8",
    level: "A1",
    theme: "Famille",
    question: "Quel mot désigne 'fils' ?",
    options: ["hijo", "hija", "niño", "joven"],
    correct: 0,
  },

  // A1 - COULEURS
  {
    id: "v9",
    level: "A1",
    theme: "Couleurs",
    question: "'Rojo' c'est :",
    options: ["bleu", "vert", "rouge", "jaune"],
    correct: 2,
  },
  {
    id: "v10",
    level: "A1",
    theme: "Couleurs",
    question: "Comment dit-on 'blanc' ?",
    options: ["blanco", "negro", "gris", "verde"],
    correct: 0,
  },
  {
    id: "v11",
    level: "A1",
    theme: "Couleurs",
    question: "'Azul' signifie :",
    options: ["rouge", "bleu", "jaune", "orange"],
    correct: 1,
  },

  // A1 - NOMBRES
  {
    id: "v12",
    level: "A1",
    theme: "Nombres",
    question: "Comment dit-on 'cinq' ?",
    options: ["cinco", "seis", "siete", "cuatro"],
    correct: 0,
  },
  {
    id: "v13",
    level: "A1",
    theme: "Nombres",
    question: "'Veinte' c'est :",
    options: ["10", "15", "20", "25"],
    correct: 2,
  },
  {
    id: "v14",
    level: "A1",
    theme: "Nombres",
    question: "Quel nombre est 'cien' ?",
    options: ["10", "50", "100", "1000"],
    correct: 2,
  },

  // A1 - TEMPS
  {
    id: "v15",
    level: "A1",
    theme: "Temps",
    question: "'Hoy' signifie :",
    options: ["hier", "aujourd'hui", "demain", "maintenant"],
    correct: 1,
  },
  {
    id: "v16",
    level: "A1",
    theme: "Temps",
    question: "Comment dit-on 'demain' ?",
    options: ["mañana", "tarde", "noche", "día"],
    correct: 0,
  },
  {
    id: "v17",
    level: "A1",
    theme: "Temps",
    question: "'Ayer' veut dire :",
    options: ["hier", "aujourd'hui", "demain", "toujours"],
    correct: 0,
  },

  // A2 - VERBES FRÉQUENTS
  {
    id: "v18",
    level: "A2",
    theme: "Verbes",
    question: "'Hacer' signifie :",
    options: ["avoir", "faire", "être", "aller"],
    correct: 1,
  },
  {
    id: "v19",
    level: "A2",
    theme: "Verbes",
    question: "Comment dit-on 'pouvoir' ?",
    options: ["poner", "poder", "saber", "querer"],
    correct: 1,
  },
  {
    id: "v20",
    level: "A2",
    theme: "Verbes",
    question: "'Venir' veut dire :",
    options: ["voir", "venir", "vivre", "vendre"],
    correct: 1,
  },
  {
    id: "v21",
    level: "A2",
    theme: "Verbes",
    question: "Quel verbe signifie 'savoir' ?",
    options: ["saber", "salir", "ser", "seguir"],
    correct: 0,
  },

  // A2 - CONNECTEURS
  {
    id: "v22",
    level: "A2",
    theme: "Connecteurs",
    question: "'Aunque' signifie :",
    options: ["mais", "bien que", "parce que", "donc"],
    correct: 1,
  },
  {
    id: "v23",
    level: "A2",
    theme: "Connecteurs",
    question: "Comment dit-on 'parce que' ?",
    options: ["porque", "por qué", "para que", "pero"],
    correct: 0,
  },
  {
    id: "v24",
    level: "A2",
    theme: "Connecteurs",
    question: "'Mientras' veut dire :",
    options: ["toujours", "jamais", "pendant que", "après"],
    correct: 2,
  },

  // A2 - ADJECTIFS
  {
    id: "v25",
    level: "A2",
    theme: "Adjectifs",
    question: "'Grande' signifie :",
    options: ["petit", "grand", "moyen", "énorme"],
    correct: 1,
  },
  {
    id: "v26",
    level: "A2",
    theme: "Adjectifs",
    question: "Quel mot veut dire 'cher' (prix) ?",
    options: ["caro", "barato", "cerca", "claro"],
    correct: 0,
  },
  {
    id: "v27",
    level: "A2",
    theme: "Adjectifs",
    question: "'Difícil' c'est :",
    options: ["facile", "différent", "difficile", "divers"],
    correct: 2,
  },

  // A2 - EXPRESSIONS
  {
    id: "v28",
    level: "A2",
    theme: "Expressions",
    question: "'Echar de menos' signifie :",
    options: ["jeter", "manquer à quelqu'un", "se tromper", "perdre"],
    correct: 1,
    explanation: "Expression idiomatique : Te echo de menos = Tu me manques",
  },
  {
    id: "v29",
    level: "A2",
    theme: "Expressions",
    question: "'Dar igual' veut dire :",
    options: ["être égal", "peu importe", "donner", "partager"],
    correct: 1,
    explanation: "Me da igual = Ça m'est égal / Peu importe",
  },

  // B1 - VOCABULAIRE ABSTRAIT
  {
    id: "v30",
    level: "B1",
    theme: "Abstrait",
    question: "'Desafío' signifie :",
    options: ["défi", "désir", "défaut", "décision"],
    correct: 0,
  },
  {
    id: "v31",
    level: "B1",
    theme: "Abstrait",
    question: "Comment dit-on 'conséquence' ?",
    options: ["consecuencia", "conciencia", "consenso", "consejo"],
    correct: 0,
  },
  {
    id: "v32",
    level: "B1",
    theme: "Abstrait",
    question: "'Lograr' veut dire :",
    options: ["loger", "réussir à", "louer", "longer"],
    correct: 1,
  },
  {
    id: "v33",
    level: "B1",
    theme: "Abstrait",
    question: "Quel mot signifie 'développement' ?",
    options: ["desenvolvimiento", "desarrollo", "descubrimiento", "desenlace"],
    correct: 1,
  },

  // B1 - CONNECTEURS AVANCÉS
  {
    id: "v34",
    level: "B1",
    theme: "Connecteurs",
    question: "'Sin embargo' c'est :",
    options: ["sans doute", "cependant", "surtout", "en effet"],
    correct: 1,
  },
  {
    id: "v35",
    level: "B1",
    theme: "Connecteurs",
    question: "'Por lo tanto' signifie :",
    options: ["par contre", "par conséquent", "pour autant", "pour tant"],
    correct: 1,
  },
  {
    id: "v36",
    level: "B1",
    theme: "Connecteurs",
    question: "Comment dit-on 'de plus' ?",
    options: ["además", "ademán", "adentro", "adelante"],
    correct: 0,
  },

  // B1 - EXPRESSIONS IDIOMATIQUES
  {
    id: "v37",
    level: "B1",
    theme: "Expressions",
    question: "'Meter la pata' veut dire :",
    options: ["mettre le pied", "faire une gaffe", "donner un coup de pied", "entrer"],
    correct: 1,
    explanation: "Expression : Faire une bévue, se tromper",
  },
  {
    id: "v38",
    level: "B1",
    theme: "Expressions",
    question: "'Estar en las nubes' signifie :",
    options: ["être heureux", "être dans la lune", "être en colère", "être pressé"],
    correct: 1,
    explanation: "Être distrait, ne pas faire attention",
  },
  {
    id: "v39",
    level: "B1",
    theme: "Expressions",
    question: "'No tener pelos en la lengua' c'est :",
    options: ["être muet", "parler franchement", "mentir", "bégayer"],
    correct: 1,
    explanation: "Ne pas avoir sa langue dans sa poche, dire ce qu'on pense",
  },
  {
    id: "v40",
    level: "B1",
    theme: "Expressions",
    question: "'Costar un ojo de la cara' veut dire :",
    options: ["être aveugle", "coûter très cher", "être difficile", "faire mal"],
    correct: 1,
    explanation: "Coûter les yeux de la tête",
  },
];

export default function VocabQuiz({
  level,
}: {
  level: Level;
}) {
  const [idx, setIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const filtered = useMemo(() => {
    let pool = vocabQuestions;
    if (level !== "ALL") pool = pool.filter(q => q.level === level);
    return pool;
  }, [level]);

  const current = filtered[idx] ?? null;

  const handleSelect = (optionIndex: number) => {
    if (showAnswer) return;
    setSelectedOption(optionIndex);
  };

  const handleCheck = () => {
    if (selectedOption === null || !current) return;
    setShowAnswer(true);
    const isCorrect = selectedOption === current.correct;
    setScore(s => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }));
  };

  const handleNext = () => {
    setIdx(i => (i + 1) % Math.max(1, filtered.length));
    setSelectedOption(null);
    setShowAnswer(false);
  };

  const handleRandom = () => {
    setIdx(Math.floor(Math.random() * Math.max(1, filtered.length)));
    setSelectedOption(null);
    setShowAnswer(false);
  };

  if (!current) {
    return (
      <div className="card vstack">
        <strong>Quiz de vocabulaire</strong>
        <div className="muted">Aucune question disponible pour ce niveau.</div>
      </div>
    );
  }

  const isCorrect = selectedOption === current.correct;

  return (
    <div className="card vstack">
      <div className="hstack" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <strong>Quiz de vocabulaire</strong>
        <div className="hstack">
          <span className="badge">{current.theme}</span>
          <span className="badge">{current.level}</span>
          <span className="muted">
            Score: {score.correct}/{score.total} ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
          </span>
        </div>
      </div>

      <div className="vstack">
        <div 
          style={{ 
            background: "#0b1220", 
            padding: "20px", 
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          {current.question}
        </div>

        <div className="vstack">
          {current.options.map((option, i) => {
            let bgColor = "#0f1720";
            let borderColor = "#334155";
            
            if (showAnswer) {
              if (i === current.correct) {
                bgColor = "#064e3b";
                borderColor = "#10b981";
              } else if (i === selectedOption) {
                bgColor = "#7f1d1d";
                borderColor = "#ef4444";
              }
            } else if (selectedOption === i) {
              borderColor = "#60a5fa";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                style={{
                  background: bgColor,
                  border: `2px solid ${borderColor}`,
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "16px",
                  cursor: showAnswer ? "default" : "pointer",
                  transition: "all 0.2s",
                }}
                disabled={showAnswer}
              >
                <strong>{String.fromCharCode(65 + i)}.</strong> {option}
                {showAnswer && i === current.correct && " ✅"}
                {showAnswer && i === selectedOption && i !== current.correct && " ❌"}
              </button>
            );
          })}
        </div>

        {showAnswer && current.explanation && (
          <div className="card" style={{ background: "#1e3a5f", border: "1px solid #60a5fa" }}>
            <strong>💡 Explication :</strong>
            <div style={{ marginTop: "8px" }}>{current.explanation}</div>
          </div>
        )}

        <div className="hstack" style={{ justifyContent: "space-between" }}>
          {!showAnswer ? (
            <>
              <button onClick={handleCheck} disabled={selectedOption === null}>
                Vérifier
              </button>
              <button onClick={handleRandom}>
                🎲 Aléatoire
              </button>
            </>
          ) : (
            <button onClick={handleNext} style={{ flex: 1 }}>
              Question suivante ▶
            </button>
          )}
        </div>

        <div className="muted" style={{ textAlign: "center", fontSize: "12px" }}>
          Question {idx + 1} / {filtered.length}
        </div>
      </div>
    </div>
  );
}
