"use client";
import React, { useState } from "react";

type Drill = {
  prompt: string;
  answer: string;
  hint?: string | { fr: string; en: string };
};

type Props = {
  title: string | { fr: string; en: string };
  note?: string | { fr: string; en: string };
  drills: Drill[];
  onClose: () => void;
  language?: 'fr' | 'en';
};

export default function GrammarDrill({ title, note, drills, onClose, language = 'fr' }: Props) {
  const [showExplanationPanel, setShowExplanationPanel] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentDrill = drills[currentIndex];
  const progress = `${currentIndex + 1} / ${drills.length}`;

  // Helper pour obtenir le texte dans la bonne langue
  const getText = (value: any): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value[language]) return value[language];
    return value.fr || value.en || '';
  };

  const displayTitle = getText(title);
  const displayNote = getText(note);

  const normalizeAnswer = (text: string) => {
    return text.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const checkAnswer = () => {
    const correct = normalizeAnswer(userAnswer) === normalizeAnswer(currentDrill.answer);
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) setScore(score + 1);
  };

  const nextDrill = () => {
    if (currentIndex < drills.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setFeedback(null);
      setShowHint(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (feedback === null) checkAnswer();
      else nextDrill();
    }
  };

  const startExercises = () => {
    setHasStarted(true);
  };

  // Textes multilingues
  const texts = {
    fr: {
      startButton: "Commencer les exercices",
      backButton: "Retour",
      score: "Score",
      verify: "Vérifier",
      next: "Suivant",
      finish: "Terminer",
      finished: "Terminé!",
      correctAnswers: "bonnes réponses",
      backToList: "Retour à la liste",
      placeholder: "Tape ta réponse ici...",
      correct: "Correct!",
      incorrect: "Incorrect",
      correctAnswer: "Bonne réponse",
      exercise: "Exercice",
      showExplanation: "Afficher l'explication",
      hideExplanation: "Masquer",
      showHint: "💡 Indice",
      hideHint: "Cacher l'indice"
    },
    en: {
      startButton: "Start exercises",
      backButton: "Back",
      score: "Score",
      verify: "Check",
      next: "Next",
      finish: "Finish",
      finished: "Finished!",
      correctAnswers: "correct answers",
      backToList: "Back to list",
      placeholder: "Type your answer here...",
      correct: "Correct!",
      incorrect: "Incorrect",
      correctAnswer: "Correct answer",
      exercise: "Exercise",
      showExplanation: "Show explanation",
      hideExplanation: "Hide",
      showHint: "💡 Hint",
      hideHint: "Hide hint"
    }
  };

  const t = texts[language];

  // Fonction pour parser et formatter le texte - VERSION SIMPLIFIÉE
  const parseText = (text: string) => {
    // Enlever les ** pour le gras
    let parsed = text.replace(/\*\*/g, '');
    return parsed;
  };

  // Fonction pour formatter l'explication - VERSION TRÈS AÉRÉE
  const formatNote = (text: string) => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      
      // Titres avec emojis (⚙️, 💡, etc.) - GROS et espacé
      if (trimmed.match(/^[⚙️🔹💡🧩📝✅⚠️💬📍📊🗣️🎯🔥📘📗📕]/)) {
        elements.push(
          <div 
            key={i} 
            className="font-bold text-blue-400 text-xl mb-6 mt-8"
          >
            {parseText(trimmed)}
          </div>
        );
      }
      // Lignes avec flèches ou puces - TRÈS espacé
      else if (trimmed.match(/^[➡️•-]/)) {
        elements.push(
          <div key={i} className="flex items-start mb-4 ml-2">
            <span className="text-blue-400 mr-3 text-lg mt-1">→</span>
            <span className="text-gray-200 text-base leading-relaxed flex-1">
              {parseText(trimmed.replace(/^[➡️•-]\s*/, ''))}
            </span>
          </div>
        );
      }
      // Lignes normales - BIEN espacé
      else if (trimmed) {
        elements.push(
          <p 
            key={i} 
            className="text-gray-100 text-base leading-loose my-4"
          >
            {parseText(trimmed)}
          </p>
        );
      }
      // Ligne vide - GRAND espace
      else {
        elements.push(<div key={i} className="h-6" />);
      }
    });

    return elements;
  };

  // Écran initial avec l'explication complète - VERSION TRÈS AÉRÉE
  if (!hasStarted && displayNote) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto"> <div className="bg-gray-800 rounded-2xl p-8 max-w-4xl w-full my-8">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-3xl font-bold text-white">{displayTitle}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">×</button>
          </div>
          
          {/* Explication avec BEAUCOUP d'espace */}
          <div className="bg-gray-900 rounded-xl p-10 mb-8 max-h-[65vh] overflow-y-auto">
            {formatNote(displayNote)}
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={startExercises} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 px-8 py-5 rounded-xl font-semibold text-xl transition"
            >
              ✏️ {t.startButton} ({drills.length})
            </button>
            <button 
              onClick={onClose} 
              className="px-8 py-5 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold text-lg transition"
            >
              {t.backButton}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Écran de fin
  if (isFinished) {
    const percentage = Math.round((score / drills.length) * 100);
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-4">🎉 {t.finished}</h2>
          <div className="text-6xl font-bold mb-4 text-green-400">{percentage}%</div>
          <p className="text-xl mb-6">{score} / {drills.length} {t.correctAnswers}</p>
          <button 
            onClick={onClose} 
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            {t.backToList}
          </button>
        </div>
      </div>
    );
  }

  // Écran d'exercices avec panneau latéral OPTIONNEL
  return (
    <div className="fixed inset-0 bg-black/90 z-50 p-4 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto flex gap-4">
        {/* Panneau d'explication (collapsible) - VERSION COMPACTE */}
        {showExplanationPanel && displayNote && (
          <div className="bg-gray-800 rounded-2xl p-6 w-[400px] flex-shrink-0 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">📖 {displayTitle}</h3>
              <button 
                onClick={() => setShowExplanationPanel(false)}
                className="text-gray-400 hover:text-white text-xl"
                title={t.hideExplanation}
              >
                ✕
              </button>
            </div>
            <div className="text-sm">
              {formatNote(displayNote)}
            </div>
          </div>
        )}

        {/* Panel d'exercices */}
        <div className="bg-gray-800 rounded-2xl p-6 flex-1 flex flex-col min-w-0">
          <div className="flex justify-between items-center mb-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold truncate">{displayTitle}</h2>
              <p className="text-sm text-gray-400">{t.exercise} {progress}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl ml-4">×</button>
          </div>

          {/* Bouton toggle explication + Score */}
          <div className="flex items-center justify-between mb-6">
            {displayNote && !showExplanationPanel && (
              <button
                onClick={() => setShowExplanationPanel(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition text-sm"
              >
                📖 {t.showExplanation}
              </button>
            )}
            {displayNote && showExplanationPanel && <div></div>}
            <span className="text-lg">
              {t.score}: <span className="font-bold text-green-400">{score}</span> / {drills.length}
            </span>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6 mb-6 flex-shrink-0">
            <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: currentDrill.prompt }} />
          </div>
          
          <input 
            type="text" 
            value={userAnswer} 
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress} 
            placeholder={t.placeholder} 
            disabled={feedback !== null} 
            autoFocus
            className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-blue-500 disabled:opacity-50 flex-shrink-0"
          />

          {/* Afficher l'indice (hint) si disponible */}
          {currentDrill.hint && feedback === null && (
            <div className="mt-4 flex-shrink-0">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                {showHint ? t.hideHint : t.showHint}
              </button>
              {showHint && (
                <div className="mt-2 p-3 bg-slate-800 rounded-lg text-sm text-slate-300">
                  {getText(currentDrill.hint)}
                </div>
              )}
            </div>
          )}
          
          {feedback && (
            <div className={`mt-4 p-4 rounded-lg flex-shrink-0 ${
              feedback === "correct" 
                ? "bg-green-900/50 border border-green-600" 
                : "bg-red-900/50 border border-red-600"
            }`}>
              {feedback === "correct" ? (
                <p className="text-green-400 font-semibold">✓ {t.correct}</p>
              ) : (
                <div>
                  <p className="text-red-400 font-semibold">✗ {t.incorrect}</p>
                  <p className="text-sm mt-2">
                    {t.correctAnswer}: <span className="font-bold">{currentDrill.answer}</span>
                  </p>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-auto pt-6 flex-shrink-0">
            <div className="flex gap-3 mb-4">
              {feedback === null ? (
                <button 
                  onClick={checkAnswer} 
                  disabled={!userAnswer.trim()} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition"
                >
                  {t.verify}
                </button>
              ) : (
                <button 
                  onClick={nextDrill} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
                >
                  {currentIndex < drills.length - 1 ? `${t.next} →` : t.finish}
                </button>
              )}
            </div>
            
            <div className="bg-gray-900 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all" 
                style={{ width: `${((currentIndex + 1) / drills.length) * 100}%` }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}