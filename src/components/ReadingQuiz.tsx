"use client";

import { useState } from "react";

type Props = {
  questions: string[];
  excerpt: string;
  title: string;
  language: "fr" | "en";
};

type Answer = {
  question: string;
  userAnswer: string;
  feedback: string;
  correct: boolean | null;
};

export default function ReadingQuiz({ questions, excerpt, title, language }: Props) {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const t = {
    fr: {
      start: "Commencer le quiz",
      question: "Question",
      of: "sur",
      placeholder: "Ta réponse...",
      validate: "Valider",
      next: "Question suivante",
      finish: "Voir le résultat",
      result: "Résultat",
      correct: "correctes",
      retry: "Recommencer",
      thinking: "Correction en cours...",
      skip: "Passer",
    },
    en: {
      start: "Start quiz",
      question: "Question",
      of: "of",
      placeholder: "Your answer...",
      validate: "Check",
      next: "Next question",
      finish: "See results",
      result: "Result",
      correct: "correct",
      retry: "Try again",
      thinking: "Checking...",
      skip: "Skip",
    },
  };

  const tx = t[language];

  const validateAnswer = async (question: string, userAnswer: string) => {
    if (!userAnswer.trim()) return;
    setLoading(true);

    const systemPrompt = language === "fr"
      ? `Tu es un professeur d'espagnol. L'étudiant vient de lire ce texte en espagnol :

"${excerpt}"

Tu dois évaluer la réponse de l'étudiant à une question de compréhension. Réponds UNIQUEMENT avec un JSON valide (sans markdown) de cette forme :
{"correct": true/false, "feedback": "explication courte en français (max 2 phrases)"}

Sois bienveillant : si l'essentiel est bon, c'est correct. Fournis toujours la bonne réponse dans le feedback.`
      : `You are a Spanish teacher. The student just read this text in Spanish:

"${excerpt}"

Evaluate the student's answer to a comprehension question. Reply ONLY with valid JSON (no markdown):
{"correct": true/false, "feedback": "short explanation in English (max 2 sentences)"}

Be generous: if the main idea is right, it's correct. Always include the right answer in feedback.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content: `Question : ${question}\nRéponse de l'étudiant : ${userAnswer}`,
            },
          ],
        }),
      });

      const data = await response.json();
      const text = data.content?.[0]?.text || '{"correct": false, "feedback": "Erreur de validation."}';
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      const newAnswer: Answer = {
        question,
        userAnswer,
        feedback: parsed.feedback,
        correct: parsed.correct,
      };

      const newAnswers = [...answers, newAnswer];
      setAnswers(newAnswers);

      if (currentIndex + 1 >= questions.length) {
        setFinished(true);
      }
    } catch {
      const newAnswer: Answer = {
        question,
        userAnswer,
        feedback: language === "fr" ? "Impossible de valider, mais continue !" : "Could not validate, keep going!",
        correct: null,
      };
      setAnswers([...answers, newAnswer]);
      if (currentIndex + 1 >= questions.length) setFinished(true);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const handleValidate = async () => {
    if (!input.trim() || loading) return;
    await validateAnswer(questions[currentIndex], input);
  };

  const handleNext = () => {
    setCurrentIndex(i => i + 1);
    setInput("");
  };

  const handleSkip = () => {
    const skipped: Answer = {
      question: questions[currentIndex],
      userAnswer: "—",
      feedback: language === "fr" ? "Question passée." : "Question skipped.",
      correct: false,
    };
    const newAnswers = [...answers, skipped];
    setAnswers(newAnswers);
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
      setInput("");
    }
  };

  const handleRetry = () => {
    setStarted(false);
    setFinished(false);
    setCurrentIndex(0);
    setInput("");
    setAnswers([]);
  };

  const score = answers.filter(a => a.correct === true).length;
  const currentAnswerDone = answers.length > currentIndex;

  if (!started) {
    return (
      <button
        onClick={() => setStarted(true)}
        style={{
          background: "#1d4ed8",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "12px 24px",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          width: "100%",
          marginTop: "8px",
        }}
      >
        🧠 {tx.start} ({questions.length})
      </button>
    );
  }

  if (finished) {
    return (
      <div style={{ background: "#0f2540", borderRadius: "12px", padding: "20px" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ fontSize: "40px", marginBottom: "8px" }}>
            {score === questions.length ? "🏆" : score >= questions.length / 2 ? "👍" : "📚"}
          </div>
          <div style={{ fontSize: "22px", fontWeight: "700", color: "#fff" }}>
            {score} / {questions.length} {tx.correct}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
          {answers.map((a, i) => (
            <div
              key={i}
              style={{
                background: a.correct === true ? "#064e3b" : a.correct === false ? "#7f1d1d" : "#1e3a5f",
                borderRadius: "8px",
                padding: "12px 16px",
                borderLeft: `4px solid ${a.correct === true ? "#10b981" : a.correct === false ? "#ef4444" : "#60a5fa"}`,
              }}
            >
              <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "4px" }}>
                {tx.question} {i + 1}
              </div>
              <div style={{ fontSize: "14px", color: "#e5e7eb", marginBottom: "6px" }}>
                {a.question}
              </div>
              <div style={{ fontSize: "13px", color: "#d1d5db", marginBottom: "4px" }}>
                → {a.userAnswer}
              </div>
              <div style={{ fontSize: "13px", color: a.correct ? "#6ee7b7" : "#fca5a5" }}>
                {a.correct === true ? "✓" : "✗"} {a.feedback}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleRetry}
          style={{
            background: "#1d4ed8",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "12px 24px",
            fontSize: "15px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          🔄 {tx.retry}
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#0f2540", borderRadius: "12px", padding: "20px" }}>
      {/* Progress */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontSize: "13px", color: "#9ca3af" }}>
          {tx.question} {currentIndex + 1} {tx.of} {questions.length}
        </span>
        <div style={{ display: "flex", gap: "4px" }}>
          {questions.map((_, i) => (
            <div
              key={i}
              style={{
                width: "24px",
                height: "6px",
                borderRadius: "3px",
                background: i < answers.length
                  ? (answers[i]?.correct ? "#10b981" : "#ef4444")
                  : i === currentIndex ? "#60a5fa" : "#374151",
              }}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div style={{
        fontSize: "17px",
        fontWeight: "600",
        color: "#f3f4f6",
        marginBottom: "16px",
        lineHeight: "1.5",
      }}>
        {questions[currentIndex]}
      </div>

      {/* Input ou feedback */}
      {!currentAnswerDone ? (
        <>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleValidate(); } }}
            placeholder={tx.placeholder}
            disabled={loading}
            rows={3}
            style={{
              width: "100%",
              background: "#1e3a5f",
              border: "1px solid #334155",
              borderRadius: "8px",
              padding: "12px",
              color: "#f3f4f6",
              fontSize: "15px",
              resize: "none",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: "12px",
            }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleValidate}
              disabled={!input.trim() || loading}
              style={{
                flex: 1,
                background: input.trim() && !loading ? "#1d4ed8" : "#374151",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: input.trim() && !loading ? "pointer" : "default",
              }}
            >
              {loading ? tx.thinking : tx.validate}
            </button>
            <button
              onClick={handleSkip}
              disabled={loading}
              style={{
                background: "transparent",
                color: "#6b7280",
                border: "1px solid #374151",
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {tx.skip}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Feedback */}
          <div style={{
            background: answers[currentIndex]?.correct ? "#064e3b" : "#7f1d1d",
            borderRadius: "8px",
            padding: "14px",
            marginBottom: "12px",
            borderLeft: `4px solid ${answers[currentIndex]?.correct ? "#10b981" : "#ef4444"}`,
          }}>
            <div style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "4px" }}>
              Ta réponse : {answers[currentIndex]?.userAnswer}
            </div>
            <div style={{ fontSize: "14px", color: answers[currentIndex]?.correct ? "#6ee7b7" : "#fca5a5" }}>
              {answers[currentIndex]?.correct ? "✓" : "✗"} {answers[currentIndex]?.feedback}
            </div>
          </div>

          <button
            onClick={handleNext}
            style={{
              width: "100%",
              background: "#1d4ed8",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {currentIndex + 1 < questions.length ? `${tx.next} →` : tx.finish}
          </button>
        </>
      )}
    </div>
  );
}
