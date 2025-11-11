"use client";

import { useState } from "react";
import { useReviewStore } from "@/store/reviewStore";
import type { ReviewQuality } from "@/lib/spacedRepetition";
import type { Card } from "@/components/Flashcards";

type SmartReviewProps = {
  cards: Card[];
  level: string;
  country: string;
};

export default function SmartReview({ cards, level, country }: SmartReviewProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { reviewState, recordReview } = useReviewStore();

  // Filtrer les cartes selon le niveau et le pays
  const filteredCards = cards.filter((card) => {
    const levelMatch = card.level === level;
    const countryMatch = country === "ALL" || card.country === country;
    return levelMatch && countryMatch;
  });

  // Obtenir les cartes à réviser aujourd'hui
  const cardsToReview = filteredCards.filter((card) => {
    const cardState = reviewState[parseInt(card.id)];
    if (!cardState) return true; // Nouvelle carte
    return new Date(cardState.nextReview) <= new Date();
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  if (cardsToReview.length === 0) {
    return (
      <div>
        <h2 style={{ marginBottom: "20px" }}>Révision intelligente</h2>
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "30px",
            backgroundColor: "#f9f9f9",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "18px", color: "#28a745", marginBottom: "10px" }}>
            ✅ Bravo ! Aucune carte à réviser pour le moment.
          </p>
          <p style={{ color: "#666", fontSize: "14px" }}>
            Revenez plus tard pour continuer vos révisions.
          </p>
        </div>
      </div>
    );
  }

  const currentCard = cardsToReview[currentIndex];
  const cardState = reviewState[parseInt(currentCard.id)];

  const handleReview = (quality: ReviewQuality) => {
    recordReview(parseInt(currentCard.id), quality);
    setIsFlipped(false);

    if (currentIndex < cardsToReview.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Toutes les cartes ont été révisées
      setCurrentIndex(0);
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Révision intelligente (SM-2)</h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#e7f3ff",
          borderRadius: "8px",
          border: "1px solid #b3d9ff",
        }}
      >
        <p style={{ margin: 0, fontSize: "14px", color: "#004085" }}>
          📊 Cartes à réviser aujourd'hui: <strong>{cardsToReview.length}</strong>
        </p>
        <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#004085" }}>
          📈 Progression: <strong>{currentIndex + 1}/{cardsToReview.length}</strong>
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Carte */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "300px",
            border: "2px solid #007bff",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: isFlipped ? "#007bff" : "#fff",
            color: isFlipped ? "#fff" : "#000",
            fontSize: "32px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          {isFlipped ? currentCard.back : currentCard.front}
        </div>

        <p style={{ color: "#666", fontSize: "14px" }}>
          Cliquez sur la carte pour voir la traduction
        </p>

        {/* Informations sur la carte */}
        {cardState && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              fontSize: "12px",
              color: "#666",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0 }}>
              Répétitions: {cardState.repetitions} | Facilité: {cardState.easeFactor.toFixed(2)} | 
              Intervalle: {cardState.interval} jour(s)
            </p>
          </div>
        )}

        {/* Boutons de qualité */}
        {isFlipped && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => handleReview(0)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              ❌ Oublié
            </button>
            <button
              onClick={() => handleReview(3)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#ffc107",
                color: "black",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              🤔 Difficile
            </button>
            <button
              onClick={() => handleReview(4)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#17a2b8",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              👍 Bien
            </button>
            <button
              onClick={() => handleReview(5)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              ✨ Facile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
