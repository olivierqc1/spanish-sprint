"use client";

import { useState } from "react";

// 🧩 Import des jeux de cartes selon le niveau
import { wordsA1 } from "../data/words/A1";
import { wordsA2 } from "../data/words/A2";
import { wordsB1 } from "../data/words/B1";
// Tu pourras ajouter plus tard : import { wordsB2 } from "../data/words/B2"; etc.

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
type Country = "ALL" | "spain" | "mexico" | "argentina";
type Category = "verbe" | "nom" | "adjectif" | "autre";

export interface Card {
  id: number;
  front: string;
  back: string;
  level: Level;
  country: Country;
  category?: Category;
}

interface FlashcardsProps {
  level: Level;
  country: Country;
  category?: Category;
}

export default function Flashcards({ level, country, category }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // 🧠 Choix automatique du bon fichier selon le niveau
  let allCards: Card[] = [];

  switch (level) {
    case "A1":
      allCards = wordsA1;
      break;
    case "A2":
      allCards = wordsA2;
      break;
    case "B1":
      allCards = wordsB1;
      break;
    // Tu pourras continuer plus tard :
    // case "B2": allCards = wordsB2; break;
    default:
      allCards = wordsA1;
  }

  // 🎯 Filtrage par pays et catégorie
  const filteredCards = allCards.filter((card) => {
    const levelMatch = card.level === level;
    const countryMatch = country === "ALL" || card.country === country;
    const categoryMatch = !category || card.category === category;
    return levelMatch && countryMatch && categoryMatch;
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
          Aucune carte disponible pour ce niveau, ce pays ou cette catégorie.
        </p>
      </div>
    );
  }

  const currentCard = filteredCards[currentIndex];

  return (
    <div>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        Flashcards – Niveau {level}
      </h2>
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
            textAlign: "center",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            padding: "10px",
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