"use client";
import { useState, useEffect, useMemo } from "react";
import type { Conversation, ConversationLine } from "@/data/conversations";
import { conversations, getConversationWithAudioUrls } from "@/data/conversations";
import type { Level } from "./LevelPicker";

type Country = "ALL" | "spain" | "mexico" | "argentina" | "colombia";

export default function ConversationPractice({
  level,
  country
}: {
  level: Level;
  country: Country;
}) {
  const [idx, setIdx] = useState(0);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Filtrer les conversations
  const filtered = useMemo(() => {
    let pool = conversations;
    if (level !== "ALL") pool = pool.filter(c => c.level === level);
    if (country !== "ALL") {
      const countryMap: Record<string, string> = {
        spain: "Espagne",
        mexico: "Mexique",
        argentina: "Argentine",
        colombia: "Colombie"
      };
      pool = pool.filter(c => c.country === countryMap[country]);
    }
    return pool.map(getConversationWithAudioUrls);
  }, [level, country]);

  const current = filtered[idx] ?? null;
  const currentLine = current?.lines[currentLineIdx];

  // Réinitialiser quand on change de conversation
  useEffect(() => {
    setCurrentLineIdx(0);
    setShowTranscript(false);
    setShowQuestions(false);
    setAnswers({});
    setShowResults(false);
  }, [idx]);

  // Jouer l'audio d'une ligne
  const playLine = (line: ConversationLine & { audioUrl?: string }) => {
    if (!line.audioUrl) return;
    
    const audio = new Audio(line.audioUrl);
    setIsPlaying(true);
    
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      console.error("Erreur de lecture audio");
      setIsPlaying(false);
    };
    
    audio.play().catch(err => {
      console.error("Erreur:", err);
      setIsPlaying(false);
    });
  };

  // Jouer toute la conversation
  const playAll = async () => {
    if (!current) return;
    
    for (let i = 0; i < current.lines.length; i++) {
      setCurrentLineIdx(i);
      const line = current.lines[i] as ConversationLine & { audioUrl?: string };
      
      if (line.audioUrl) {
        await new Promise((resolve) => {
          const audio = new Audio(line.audioUrl);
          audio.onended = resolve;
          audio.play();
        });
        
        // Pause entre les lignes
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  };

  // Vérifier les réponses
  const checkAnswers = () => {
    if (!current) return;
    
    let correct = 0;
    current.questions.forEach((q, i) => {
      const userAnswer = answers[i]?.toLowerCase().trim();
      const correctAnswer = q.correctAnswer.toLowerCase().trim();
      
      if (userAnswer === correctAnswer) {
        correct++;
      }
    });
    
    setScore({ correct, total: current.questions.length });
    setShowResults(true);
  };

  // Navigation
  const handleNext = () => {
    if (currentLineIdx < (current?.lines.length ?? 0) - 1) {
      setCurrentLineIdx(i => i + 1);
    } else {
      setShowQuestions(true);
    }
  };

  const handlePrevious = () => {
    if (currentLineIdx > 0) {
      setCurrentLineIdx(i => i - 1);
    }
  };

  const handleRandomConversation = () => {
    setIdx(Math.floor(Math.random() * Math.max(1, filtered.length)));
  };

  if (!current) {
    return (
      <div className="card vstack">
        <strong>💬 Conversations</strong>
        <div className="muted">Aucune conversation disponible pour ce filtre.</div>
      </div>
    );
  }

  return (
    <div className="card vstack">
      {/* EN-TÊTE */}
      <div className="hstack" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <strong>💬 Conversations interactives</strong>
        <div className="hstack" style={{ gap: "8px" }}>
          <span className="badge">{current.country}</span>
          <span className="badge">{current.level}</span>
        </div>
      </div>

      {/* TITRE & CONTEXTE */}
      <div className="card" style={{ background: "#1e3a5f" }}>
        <h3 style={{ margin: "0 0 8px 0" }}>{current.title}</h3>
        <div className="muted" style={{ fontSize: "14px" }}>
          📌 {current.context}
        </div>
      </div>

      {/* NAVIGATION CONVERSATION */}
      {!showQuestions && (
        <>
          {/* LIGNE ACTUELLE */}
          <div 
            className="card" 
            style={{ 
              background: "#0b1220",
              border: `2px solid ${currentLine?.speaker === "A" ? "#60a5fa" : "#10b981"}`
            }}
          >
            <div className="hstack" style={{ justifyContent: "space-between", marginBottom: "16px" }}>
              <strong style={{ color: currentLine?.speaker === "A" ? "#60a5fa" : "#10b981" }}>
                {currentLine?.speakerName}
              </strong>
              <span className="badge">
                {currentLineIdx + 1} / {current.lines.length}
              </span>
            </div>

            {/* AUDIO */}
            <button
              onClick={() => currentLine && playLine(currentLine as any)}
              disabled={isPlaying}
              style={{
                padding: "16px",
                fontSize: "18px",
                background: "#1e3a5f",
                border: "1px solid #60a5fa",
                marginBottom: "16px"
              }}
            >
              {isPlaying ? "🔊 Lecture..." : "▶️ Écouter"}
            </button>

            {/* TRANSCRIPTION */}
            {showTranscript && (
              <div style={{
                background: "#1f2a37",
                padding: "16px",
                borderRadius: "8px",
                fontSize: "18px",
                textAlign: "center"
              }}>
                {currentLine?.text}
              </div>
            )}

            <button
              onClick={() => setShowTranscript(!showTranscript)}
              style={{ marginTop: "8px" }}
            >
              {showTranscript ? "👁️ Cacher" : "👁️ Voir le texte"}
            </button>
          </div>

          {/* TOUTES LES LIGNES */}
          <details>
            <summary style={{ cursor: "pointer", fontSize: "14px" }}>
              📜 Voir toute la conversation
            </summary>
            <div className="vstack" style={{ marginTop: "12px" }}>
              {current.lines.map((line, i) => (
                <div
                  key={i}
                  className="card"
                  style={{
                    background: i === currentLineIdx ? "#1e3a5f" : "#1f2a37",
                    cursor: "pointer"
                  }}
                  onClick={() => setCurrentLineIdx(i)}
                >
                  <div className="hstack" style={{ justifyContent: "space-between" }}>
                    <strong style={{ color: line.speaker === "A" ? "#60a5fa" : "#10b981" }}>
                      {line.speakerName}
                    </strong>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playLine(line as any);
                      }}
                      style={{ padding: "4px 8px", fontSize: "12px" }}
                    >
                      ▶️
                    </button>
                  </div>
                  <div style={{ fontSize: "14px", marginTop: "4px" }}>
                    {line.text}
                  </div>
                </div>
              ))}
            </div>
          </details>

          {/* CONTRÔLES */}
          <div className="hstack" style={{ justifyContent: "space-between", gap: "8px" }}>
            <button onClick={handlePrevious} disabled={currentLineIdx === 0}>
              ◀ Précédent
            </button>
            <button onClick={playAll} style={{ background: "#1e3a5f" }}>
              🔊 Tout écouter
            </button>
            <button onClick={handleNext}>
              {currentLineIdx < current.lines.length - 1 ? "Suivant ▶" : "Questions 📝"}
            </button>
          </div>
        </>
      )}

      {/* QUESTIONS */}
      {showQuestions && !showResults && (
        <div className="vstack">
          <h3 style={{ margin: "0 0 16px 0" }}>❓ Questions de compréhension</h3>
          
          {current.questions.map((q, i) => (
            <div key={i} className="card" style={{ background: "#0b1220" }}>
              <strong>{i + 1}. {q.question}</strong>
              
              {q.type === "choice" ? (
                <div className="vstack" style={{ marginTop: "12px" }}>
                  {q.options?.map((option, j) => (
                    <button
                      key={j}
                      onClick={() => setAnswers({ ...answers, [i]: option })}
                      style={{
                        background: answers[i] === option ? "#1e3a5f" : "#1f2a37",
                        border: answers[i] === option ? "2px solid #60a5fa" : "1px solid #334155",
                        textAlign: "left"
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Écris ta réponse..."
                  value={answers[i] || ""}
                  onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                  style={{ marginTop: "12px" }}
                />
              )}
            </div>
          ))}

          <button
            onClick={checkAnswers}
            disabled={Object.keys(answers).length !== current.questions.length}
            style={{ padding: "16px", fontSize: "18px" }}
          >
            ✅ Vérifier mes réponses
          </button>
        </div>
      )}

      {/* RÉSULTATS */}
      {showResults && (
        <div className="vstack">
          <div 
            className="card" 
            style={{ 
              background: score.correct === score.total ? "#064e3b" : "#1e3a5f",
              border: `2px solid ${score.correct === score.total ? "#10b981" : "#60a5fa"}`
            }}
          >
            <h3 style={{ margin: "0 0 12px 0" }}>
              {score.correct === score.total ? "🎉 Parfait !" : "📊 Résultats"}
            </h3>
            <div style={{ fontSize: "32px", fontWeight: "bold", textAlign: "center" }}>
              {score.correct} / {score.total}
            </div>
            <div className="muted" style={{ textAlign: "center" }}>
              {Math.round((score.correct / score.total) * 100)}% de réussite
            </div>
          </div>

          {/* CORRECTION */}
          {current.questions.map((q, i) => {
            const userAnswer = answers[i]?.toLowerCase().trim();
            const correctAnswer = q.correctAnswer.toLowerCase().trim();
            const isCorrect = userAnswer === correctAnswer;

            return (
              <div 
                key={i}
                className="card"
                style={{
                  background: isCorrect ? "#064e3b" : "#7f1d1d",
                  border: `1px solid ${isCorrect ? "#10b981" : "#ef4444"}`
                }}
              >
                <div className="hstack" style={{ justifyContent: "space-between" }}>
                  <strong>{i + 1}. {q.question}</strong>
                  <span style={{ fontSize: "20px" }}>{isCorrect ? "✅" : "❌"}</span>
                </div>
                
                <div style={{ marginTop: "8px" }}>
                  <div>Ta réponse: <strong>{answers[i]}</strong></div>
                  {!isCorrect && (
                    <div style={{ marginTop: "4px" }}>
                      Bonne réponse: <strong>{q.correctAnswer}</strong>
                    </div>
                  )}
                  {q.explanation && (
                    <div className="muted" style={{ marginTop: "8px", fontSize: "12px" }}>
                      💡 {q.explanation}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="hstack" style={{ justifyContent: "space-between" }}>
            <button onClick={() => {
              setShowQuestions(false);
              setShowResults(false);
              setAnswers({});
              setCurrentLineIdx(0);
            }}>
              🔄 Réécouter
            </button>
            <button onClick={handleRandomConversation}>
              🎲 Nouvelle conversation
            </button>
          </div>
        </div>
      )}

      {/* VOCABULAIRE */}
      <details>
        <summary style={{ cursor: "pointer", fontSize: "14px" }}>
          📚 Vocabulaire clé
        </summary>
        <div className="vstack" style={{ marginTop: "12px" }}>
          {current.vocabulary.map((v, i) => (
            <div key={i} className="badge" style={{ background: "#1e3a5f" }}>
              {v}
            </div>
          ))}
        </div>
      </details>

      {/* NAVIGATION CONVERSATIONS */}
      <div className="hstack" style={{ justifyContent: "space-between", marginTop: "16px" }}>
        <button 
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          disabled={idx === 0}
        >
          ◀ Conversation précédente
        </button>
        <span className="muted">{idx + 1} / {filtered.length}</span>
        <button 
          onClick={() => setIdx(i => Math.min(filtered.length - 1, i + 1))}
          disabled={idx === filtered.length - 1}
        >
          Conversation suivante ▶
        </button>
      </div>
    </div>
  );
                }
