"use client";

import { useState, useEffect } from "react";
import type { Level, Country } from "@/components/LevelPicker";

// 🧩 Import des jeux de cartes selon le niveau
import { wordsA1 } from "../data/words/A1";
import { wordsA2 } from "../data/words/A2";
import { wordsB1 } from "../data/words/B1";
// Tu pourras ajouter plus tard : import { wordsB2 } from "../data/words/B2"; etc.

type Category = "verbe" | "nom" | "adjectif" | "autre";

export interface Card {
  id: string;
  front: string;
  back: string;
  backEn?: string;  // Traduction anglaise optionnelle
  level: string;
  country: string;
  category?: string;
}

interface FlashcardsProps {
  level: Level;
  country: Country;
  category?: Category;
}

export default function Flashcards({ level, country, category }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  // Récupérer la langue depuis localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('spanish-sprint-language');
    if (savedLanguage === 'fr' || savedLanguage === 'en') {
      setLanguage(savedLanguage);
    }
  }, []);

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
    case "ALL":
      // Pour "ALL", on combine tous les niveaux
      allCards = [...wordsA1, ...wordsA2, ...wordsB1];
      break;
    // Tu pourras continuer plus tard :
    // case "B2": allCards = wordsB2; break;
    default:
      allCards = wordsA1;
  }

  // 🎯 Filtrage par pays et catégorie
  const filteredCards = allCards.filter((card) => {
    const levelMatch = level === "ALL" || card.level === level;
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

  const texts = {
    fr: {
      title: "Flashcards – Niveau",
      noCards: "Aucune carte disponible pour ce niveau, ce pays ou cette catégorie.",
      clickToFlip: "Cliquez sur la carte pour voir la traduction",
      previous: "← Précédent",
      next: "Suivant →",
      cardOf: "Carte"
    },
    en: {
      title: "Flashcards – Level",
      noCards: "No cards available for this level, country or category.",
      clickToFlip: "Click on the card to see the translation",
      previous: "← Previous",
      next: "Next →",
      cardOf: "Card"
    }
  };

  const t = texts[language];

  if (filteredCards.length === 0) {
    return (
      <div>
        <h2 style={{ marginBottom: "20px" }}>{t.title}</h2>
        <p style={{ textAlign: "center", color: "#666" }}>
          {t.noCards}
        </p>
      </div>
    );
  }

  const currentCard = filteredCards[currentIndex];
  
  // Utiliser backEn si disponible et language='en', sinon back
  const translationText = isFlipped 
    ? (language === 'en' && currentCard.backEn ? currentCard.backEn : currentCard.back)
    : currentCard.front;

  return (
    <div>
      <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
        {t.title} {level}
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
          {translationText}
        </div>

        <p style={{ color: "#666", fontSize: "14px" }}>
          {t.clickToFlip}
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
            {t.previous}
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
            {t.next}
          </button>
        </div>

        <p style={{ color: "#666", fontSize: "14px" }}>
          {t.cardOf} {currentIndex + 1} / {filteredCards.length}
        </p>
      </div>
    </div>
  );
}