"use client";

import { useState, useEffect } from "react";
import type { Level, Country } from "@/components/LevelPicker";

import { wordsA1 } from "../data/words/A1";
import { wordsA2 } from "../data/words/A2";
import { wordsB1 } from "../data/words/B1";
import catalanWordsA1 from "../data/words/catalan/A1";
import { catalanWordsA2 } from "../data/words/catalan/A2";
import { catalanWordsB1 } from "../data/words/catalan/B1";

export interface Card {
  id: string;
  front: string;
  back: string;
  backEn?: string;
  level: string;
  country: string;
  category?: string;
}

interface FlashcardsProps {
  level: Level;
  country: Country;
  language?: 'fr' | 'en';
}

export default function Flashcards({ level, country, language: propLanguage }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [targetLanguage, setTargetLanguage] = useState<'spanish' | 'catalan'>('spanish');

  useEffect(() => {
    if (propLanguage) {
      setLanguage(propLanguage);
    } else {
      const savedLang = localStorage.getItem('spanish-sprint-language');
      if (savedLang === 'fr' || savedLang === 'en') setLanguage(savedLang);
    }
    const savedTarget = localStorage.getItem('iberian-sprint-target-language');
    if (savedTarget === 'catalan') setTargetLanguage('catalan');
    else setTargetLanguage('spanish');
  }, [propLanguage]);

  // ─── Chargement des cartes selon la langue cible ──────────────────────────
  let allCards: Card[] = [];

  if (targetLanguage === 'catalan') {
    // Cartes catalanes — country toujours 'catalonia'
    switch (level) {
      case 'A1': allCards = catalanWordsA1 as Card[]; break;
      case 'A2': allCards = catalanWordsA2 as Card[]; break;
      case 'B1': allCards = catalanWordsB1 as Card[]; break;
      case 'ALL': allCards = [...catalanWordsA1, ...catalanWordsA2, ...catalanWordsB1] as Card[]; break;
      default:   allCards = catalanWordsA1 as Card[];
    }
    // Pour catalan, on ignore le filtre country (tout est catalonia)
  } else {
    // Cartes espagnoles
    switch (level) {
      case 'A1':  allCards = wordsA1; break;
      case 'A2':  allCards = wordsA2; break;
      case 'B1':  allCards = wordsB1; break;
      case 'ALL': allCards = [...wordsA1, ...wordsA2, ...wordsB1]; break;
      default:    allCards = wordsA1;
    }
  }

  const filteredCards = targetLanguage === 'catalan'
    ? allCards
    : allCards.filter((card) => {
        const levelMatch = level === 'ALL' || card.level === level;
        const countryMatch = country === 'ALL' || card.country === country;
        return levelMatch && countryMatch;
      });

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const texts = {
    fr: {
      title: targetLanguage === 'catalan' ? 'Flashcards Català – Niveau' : 'Flashcards – Niveau',
      noCards: 'Aucune carte disponible pour ce niveau.',
      clickToFlip: 'Cliquez sur la carte pour voir la traduction',
      previous: '← Précédent',
      next: 'Suivant →',
      cardOf: 'Carte',
    },
    en: {
      title: targetLanguage === 'catalan' ? 'Catalan Flashcards – Level' : 'Flashcards – Level',
      noCards: 'No cards available for this level.',
      clickToFlip: 'Click on the card to see the translation',
      previous: '← Previous',
      next: 'Next →',
      cardOf: 'Card',
    },
  };

  const t = texts[language];

  if (filteredCards.length === 0) {
    return (
      <div>
        <h2 style={{ marginBottom: '20px' }}>{t.title} {level}</h2>
        <p style={{ textAlign: 'center', color: '#666' }}>{t.noCards}</p>
      </div>
    );
  }

  const currentCard = filteredCards[currentIndex];
  const displayText = isFlipped
    ? (language === 'en' && currentCard.backEn ? currentCard.backEn : currentCard.back)
    : currentCard.front;

  return (
    <div>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>
        {t.title} {level}
        {targetLanguage === 'catalan' && (
          <span style={{ marginLeft: '8px', fontSize: '14px', color: '#fbbf24' }}>🟡 Català</span>
        )}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            width: '100%',
            maxWidth: '500px',
            minHeight: '200px',
            border: targetLanguage === 'catalan' ? '2px solid #f59e0b' : '2px solid #007bff',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            backgroundColor: isFlipped
              ? (targetLanguage === 'catalan' ? '#92400e' : '#007bff')
              : '#fff',
            color: isFlipped ? '#fff' : '#000',
            fontSize: '28px',
            fontWeight: 'bold',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '20px',
          }}
        >
          <span>{displayText}</span>
          {/* Affiche la catégorie en petit sur la face avant */}
          {!isFlipped && currentCard.category && (
            <span style={{ fontSize: '12px', color: '#888', marginTop: '8px', fontWeight: 'normal' }}>
              {currentCard.category}
            </span>
          )}
        </div>

        <p style={{ color: '#666', fontSize: '14px' }}>{t.clickToFlip}</p>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePrevious}
            style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
          >
            {t.previous}
          </button>
          <button
            onClick={handleNext}
            style={{ padding: '10px 20px', backgroundColor: targetLanguage === 'catalan' ? '#d97706' : '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
          >
            {t.next}
          </button>
        </div>

        <p style={{ color: '#666', fontSize: '14px' }}>
          {t.cardOf} {currentIndex + 1} / {filteredCards.length}
        </p>
      </div>
    </div>
  );
}
