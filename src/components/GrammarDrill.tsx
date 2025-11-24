"use client";
import React, { useState, useEffect } from "react";

type Drill = {
  prompt: string;
  answer: string;
};

type Props = {
  title: string;
  drills: Drill[];
  onClose: () => void;
};

export default function GrammarDrill({ title, drills, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentDrill = drills[currentIndex];
  const progress = `${currentIndex + 1} / ${drills.length}`;

  const normalizeAnswer = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Enlève les accents
  };

  const checkAnswer = () => {
    const correct = normalizeAnswer(userAnswer) === normalizeAnswer(currentDrill.answer);
    setFeedback(correct ? "correct" : "incorrect");
    if (correct) {
      setScore(score + 1);
    }
  };

  const nextDrill = () => {
    if (currentIndex < drills.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setFeedback(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (feedback === null) {
        checkAnswer();
      } else {
        nextDrill();
      }
    }
  };

  if (isFinished) {
    const percentage = Math.round((score / drills.length) * 100);
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-4">🎉 Terminé!</h2>
          <div className="text-6xl font-bold mb-4 text-green-400">
            {percentage}%
          </div>
          <p className="text-xl mb-6">
            {score} / {drills.length} bonnes réponses
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-sm text-gray-400">{progress}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Score */}
        <div className="mb-6 text-center">
          <span className="text-lg">
            Score: <span className="font-bold text-green-400">{score}</span> / {drills.length}
          </span>
        </div>

        {/* Prompt */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <p className="text-lg" dangerouslySetInnerHTML={{ __html: currentDrill.prompt }} />
        </div>

        {/* Input */}
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Tape ta réponse ici..."
          disabled={feedback !== null}
          autoFocus
          className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-blue-500 disabled:opacity-50"
        />

        {/* Feedback */}
        {feedback && (
          <div className={`mt-4 p-4 rounded-lg ${
            feedback === "correct" 
              ? "bg-green-900/50 border border-green-600" 
              : "bg-red-900/50 border border-red-600"
          }`}>
            {feedback === "correct" ? (
              <p className="text-green-400 font-semibold">✓ Correct!</p>
            ) : (
              <div>
                <p className="text-red-400 font-semibold">✗ Incorrect</p>
                <p className="text-sm mt-2">
                  Bonne réponse: <span className="font-bold">{currentDrill.answer}</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          {feedback === null ? (
            <button
              onClick={checkAnswer}
              disabled={!userAnswer.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition"
            >
              Vérifier
            </button>
          ) : (
            <button
              onClick={nextDrill}
              className="flex-1 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              {currentIndex < drills.length - 1 ? "Suivant →" : "Terminer"}
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-6 bg-gray-900 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / drills.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}