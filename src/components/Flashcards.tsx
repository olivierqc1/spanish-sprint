"use client";

import { useState } from "react";

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
type Country = "ALL" | "spain" | "mexico" | "argentina";

interface Card {
  id: number;
  front: string;
  back: string;
  level: Level;
  country: Country;
}

interface FlashcardsProps {
  cards: Card[];
  level: Level;
  country: Country;
}

export default function Flashcards({ cards, level, country }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredCards = cards.filter((card) => {
    const levelMatch = card.level === level;
    const countryMatch = country === "ALL" || card.country === country;
    return levelMatch && countryMatch;
  });

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex(
      (prev) => (prev - 1 + filteredCards.length) % filteredCards.length
    );
  };

  if (filteredCards.length === 0) {
    return (
      <div>
        <h2 style={{ marginBottom: "20px" }}>Flashcards</h2>
        <p style={{ textAlign: "center", color: "#666" }}>
          Aucune carte disponible pour ce niveau et ce pays.
        </p>
      </div>
    );
  }

  const currentCard = filteredCards[currentIndex];

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Flashcards</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
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

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handlePrevious}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ← Précédent
          </button>
          <button
            onClick={handleNext}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Suivant →
          </button>
        </div>

        <p style={{ color: "#666", fontSize: "14px" }}>
          Carte {currentIndex + 1} sur {filteredCards.length}
        </p>
      </div>
    </div>
  );
}
