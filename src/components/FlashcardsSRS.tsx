"use client";

import { useState, useEffect } from "react";
import type { Level, Country } from "@/components/LevelPicker";
import type { Card } from "@/components/Flashcards";
import type { Difficulty, CardProgress } from "@/types/srs";
import { calculateNextReview } from "@/utils/srs-algorithm";
import { 
  getCardProgress, 
  saveCardProgress, 
  getDueCards, 
  getNewCards,
  saveStudySession 
} from "@/utils/srs-storage";

import { wordsA1 } from "../data/words/A1";
import { wordsA2 } from "../data/words/A2";
import { wordsB1 } from "../data/words/B1";

interface FlashcardsSRSProps {
  level: Level;
  country: Country;
}

export default function FlashcardsSRS({ level, country }: FlashcardsSRSProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [reviewQueue, setReviewQueue] = useState<Card[]>([]);
  const [sessionStats, setSessionStats] = useState({
    studied: 0,
    correct: 0,
    startTime: Date.now(),
  });
  const [showAnswer, setShowAnswer] = useState(false);

  // Récupérer la langue depuis localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('spanish-sprint-language');
    if (savedLanguage === 'fr' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }
  }, []);

  // Charger les cartes à réviser
  useEffect(() => {
    loadReviewQueue();
  }, [level, country]);

  const loadReviewQueue = () => {
    // Récupérer toutes les cartes selon le niveau
    let allCards: Card[] = [];
    switch (level) {
      case "A1": allCards = wordsA1; break;
      case "A2": allCards = wordsA2; break;
      case "B1": allCards = wordsB1; break;
      case "ALL": allCards = [...wordsA1, ...wordsA2, ...wordsB1]; break;
      default: allCards = wordsA1;
    }

    // Filtrer par pays
    const filteredCards = allCards.filter((card) => 
      country === "ALL" || card.country === country
    );

    const allCardIds = filteredCards.map(c => c.id);

    // Récupérer les cartes à réviser
    const dueProgress = getDueCards(allCardIds);
    const dueCardIds = dueProgress.map(p => p.cardId);
    
    // Ajouter quelques nouvelles cartes (max 10)
    const newCardIds = getNewCards(allCardIds, 10);
    
    // Combiner
    const reviewIds = [...dueCardIds, ...newCardIds];
    const cardsToReview = filteredCards.filter(c => reviewIds.includes(c.id));
    
    // Mélanger
    const shuffled = cardsToReview.sort(() => Math.random() - 0.5);
    
    setReviewQueue(shuffled);
    setCurrentIndex(0);
  };

  const handleDifficulty = (difficulty: Difficulty) => {
    if (reviewQueue.length === 0) return;

    const currentCard = reviewQueue[currentIndex];
    
    // Récupérer la progression actuelle
    const progress = getCardProgress(currentCard.id);
    
    // Calculer la prochaine révision
    const updatedProgress = calculateNextReview(progress, difficulty);
    
    // Sauvegarder
    saveCardProgress(updatedProgress);
    
    // Mettre à jour les stats de session
    setSessionStats(prev => ({
      ...prev,
      studied: prev.studied + 1,
      correct: prev.correct + (difficulty === 'again' ? 0 : 1),
    }));

    // Passer à la carte suivante
    setShowAnswer(false);
    setIsFlipped(false);
    
    if (currentIndex < reviewQueue.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Fin de session
      finishSession();
    }
  };

  const finishSession = () => {
    const timeSpent = Math.round((Date.now() - sessionStats.startTime) / 60000); // en minutes
    
    saveStudySession({
      date: new Date(),
      cardsStudied: sessionStats.studied,
      correctAnswers: sessionStats.correct,
      timeSpent,
    });
    
    // Recharger la queue
    loadReviewQueue();
    
    // Réinitialiser les stats
    setSessionStats({
      studied: 0,
      correct: 0,
      startTime: Date.now(),
    });
  };

  const texts = {
    fr: {
      title: "📚 Révision espacée",
      cardsToReview: "Cartes à réviser",
      showAnswer: "Montrer la réponse",
      howWasIt: "Comment c'était ?",
      again: "❌ À revoir",
      hard: "😓 Difficile",
      good: "👍 Correct",
      easy: "😄 Facile",
      sessionComplete: "Session terminée !",
      studied: "Cartes étudiées",
      correctRate: "Taux de réussite",
      continueStudying: "Continuer l'étude",
      noCardsToReview: "🎉 Aucune carte à réviser pour l'instant ! Reviens plus tard.",
    },
    en: {
      title: "📚 Spaced Repetition",
      cardsToReview: "Cards to review",
      showAnswer: "Show answer",
      howWasIt: "How was it?",
      again: "❌ Again",
      hard: "😓 Hard",
      good: "👍 Good",
      easy: "😄 Easy",
      sessionComplete: "Session complete!",
      studied: "Cards studied",
      correctRate: "Success rate",
      continueStudying: "Continue studying",
      noCardsToReview: "🎉 No cards to review right now! Come back later.",
    }
  };

  const t = texts[language];

  if (reviewQueue.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center p-8">
        <h2 className="text-3xl font-bold mb-4">{t.title}</h2>
        <p className="text-xl text-gray-400">{t.noCardsToReview}</p>
      </div>
    );
  }

  const currentCard = reviewQueue[currentIndex];
  const translationText = isFlipped 
    ? (language === 'en' && currentCard.backEn ? currentCard.backEn : currentCard.back)
    : currentCard.front;

  const progressPercent = Math.round(((currentIndex + 1) / reviewQueue.length) * 100);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">{t.title}</h2>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{currentIndex + 1} / {reviewQueue.length}</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Carte */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="bg-gray-800 border-2 border-blue-600 rounded-xl p-8 min-h-[300px] flex items-center justify-center cursor-pointer hover:bg-gray-750 transition mb-6"
      >
        <p className="text-4xl font-bold text-center">
          {translationText}
        </p>
      </div>

      {/* Boutons de réponse */}
      {!showAnswer ? (
        <button
          onClick={() => setShowAnswer(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition"
        >
          {t.showAnswer}
        </button>
      ) : (
        <div>
          <p className="text-center text-gray-400 mb-4">{t.howWasIt}</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleDifficulty('again')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition"
            >
              {t.again}
              <div className="text-xs mt-1 opacity-80">1 min</div>
            </button>
            <button
              onClick={() => handleDifficulty('hard')}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-lg transition"
            >
              {t.hard}
              <div className="text-xs mt-1 opacity-80">10 min</div>
            </button>
            <button
              onClick={() => handleDifficulty('good')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition"
            >
              {t.good}
              <div className="text-xs mt-1 opacity-80">1-6 jours</div>
            </button>
            <button
              onClick={() => handleDifficulty('easy')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition"
            >
              {t.easy}
              <div className="text-xs mt-1 opacity-80">4+ jours</div>
            </button>
          </div>
        </div>
      )}

      {/* Stats de session */}
      {sessionStats.studied > 0 && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>{t.studied}: {sessionStats.studied}</span>
            <span>{t.correctRate}: {Math.round((sessionStats.correct / sessionStats.studied) * 100)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}