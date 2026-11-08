"use client";

import { useState, useEffect } from "react";
import type { Level, Country } from "@/components/LevelPicker";

import { wordsA1 } from "../data/words/A1";
import { wordsA2 } from "../data/words/A2";
import { wordsB1 } from "../data/words/B1";
import catalanWordsA1 from "../data/words/catalan/A1";
import { catalanWordsA2 } from "../data/words/catalan/A2";
import { catalanWordsB1 } from "../data/words/catalan/B1";
import { catalanNotebookCards } from "../data/words/catalan/A2_notebook";
import { catalanNotebook3Cards } from "../data/words/catalan/A2_notebook_3";

// Fusionne des listes de cartes sans doublons (même id ou même mot catalan)
function mergeCards(...lists: Card[][]): Card[] {
  const ids = new Set<string>();
  const fronts = new Set<string>();
  const out: Card[] = [];
  for (const list of lists) {
    for (const c of list) {
      const key = c.front.trim().toLowerCase();
      if (ids.has(c.id) || fronts.has(key)) continue;
      ids.add(c.id);
      fronts.add(key);
      out.push(c);
    }
  }
  return out;
}

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

type ViewMode = 'cards' | 'list' | 'review';

const STORAGE_KEY = 'iberian-sprint-difficult-words';
const REVERSE_KEY = 'iberian-sprint-flashcard-reverse';

function getDifficultIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveDifficultIds(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {}
}

export default function Flashcards({
  level, country, language: propLanguage,
}: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [targetLanguage, setTargetLanguage] = useState<'spanish' | 'catalan'>('spanish');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [difficultIds, setDifficultIds] = useState<Set<string>>(new Set());
  const [reverse, setReverse] = useState(true); // true = français d'abord, je dois retrouver le mot

  useEffect(() => {
    if (propLanguage) {
      setLanguage(propLanguage);
    } else {
      const savedLang = localStorage.getItem('spanish-sprint-language');
      if (savedLang === 'fr' || savedLang === 'en') setLanguage(savedLang as 'fr' | 'en');
    }
    const savedTarget = localStorage.getItem('iberian-sprint-target-language');
    if (savedTarget === 'catalan') setTargetLanguage('catalan');
    else setTargetLanguage('spanish');
    setDifficultIds(getDifficultIds());
    try {
      const r = localStorage.getItem(REVERSE_KEY);
      if (r === '0') setReverse(false);
      else setReverse(true);
    } catch {}
  }, [propLanguage]);

  const toggleReverse = () => {
    const next = !reverse;
    setReverse(next);
    setIsFlipped(false);
    try { localStorage.setItem(REVERSE_KEY, next ? '1' : '0'); } catch {}
  };

  let allCards: Card[] = [];
  if (targetLanguage === 'catalan') {
    switch (level) {
      case 'A1':  allCards = catalanWordsA1 as Card[]; break;
      case 'A2':  allCards = mergeCards(catalanWordsA2 as Card[], catalanNotebookCards as Card[], catalanNotebook3Cards as Card[]); break;
      case 'B1':  allCards = catalanWordsB1 as Card[]; break;
      case 'ALL': allCards = mergeCards(
        catalanWordsA1 as Card[], catalanWordsA2 as Card[],
        catalanNotebookCards as Card[], catalanNotebook3Cards as Card[],
        catalanWordsB1 as Card[],
      ); break;
      default:    allCards = catalanWordsA1 as Card[];
    }
  } else {
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
    : allCards.filter(card => {
        const levelMatch = level === 'ALL' || card.level === level;
        const countryMatch = country === 'ALL' || card.country === country;
        return levelMatch && countryMatch;
      });

  const reviewCards = filteredCards.filter(c => difficultIds.has(c.id));
  const activeCards = viewMode === 'review' ? reviewCards : filteredCards;
  const currentCard = activeCards[currentIndex] ?? filteredCards[0];

  const toggleDifficult = (id: string) => {
    const next = new Set(difficultIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setDifficultIds(next);
    saveDifficultIds(next);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(p => (p + 1) % activeCards.length);
  };
  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(p => (p - 1 + activeCards.length) % activeCards.length);
  };
  const switchMode = (m: ViewMode) => {
    setViewMode(m);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const isCat = targetLanguage === 'catalan';
  const accent = isCat ? '#f59e0b' : '#3b82f6';
  const accentDark = isCat ? '#d97706' : '#2563eb';

  const t = language === 'fr' ? {
    title: isCat ? 'Flashcards Català' : 'Flashcards',
    lang: isCat ? 'Català' : 'Espagnol',
    cards: 'Cartes', list: 'Liste', review: 'Révision',
    flip: 'Cliquez sur la carte pour voir la réponse',
    dirFr: '🇫🇷 → Català (je retrouve le mot)', dirCa: 'Català → 🇫🇷 (je traduis)',
    prev: '← Précédent', next: 'Suivant →', cardOf: 'Carte',
    hard: 'Difficile', unhard: 'Retiré',
    hardCount: (n: number) => `${n} mot${n > 1 ? 's' : ''} difficile${n > 1 ? 's' : ''}`,
    listHint: 'Appuie sur ☆ pour marquer un mot difficile — il apparaitra en Révision.',
    noReview: 'Aucun mot marqué difficile. Va en mode Liste et appuie sur ☆.',
    noCards: 'Aucune carte disponible.',
  } : {
    title: isCat ? 'Catalan Flashcards' : 'Flashcards',
    lang: isCat ? 'Català' : 'Spanish',
    cards: 'Cards', list: 'List', review: 'Review',
    flip: 'Click on the card to see the answer',
    dirFr: '🇫🇷 → Català (I recall the word)', dirCa: 'Català → 🇫🇷 (I translate)',
    prev: '← Previous', next: 'Next →', cardOf: 'Card',
    hard: 'Hard', unhard: 'Removed',
    hardCount: (n: number) => `${n} difficult word${n > 1 ? 's' : ''}`,
    listHint: 'Tap ☆ to mark a word as difficult — it will appear in Review mode.',
    noReview: 'No words marked difficult. Go to List mode and tap ☆.',
    noCards: 'No cards available.',
  };

  if (filteredCards.length === 0) {
    return (
      <div className="text-center text-slate-400 py-10">{t.noCards}</div>
    );
  }

  const tabStyle = (m: ViewMode, color?: string) => ({
    padding: '8px 16px',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer',
    border: 'none',
    background: viewMode === m ? (color || accent) : '#1e293b',
    color: viewMode === m ? '#fff' : '#94a3b8',
    transition: 'all 0.2s',
  } as React.CSSProperties);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
          {t.title}
          <span style={{ color: accent, fontSize: '13px', fontWeight: 'normal', marginLeft: '8px' }}>
            {t.lang} · {level}
          </span>
        </h2>
        <span style={{ color: '#64748b', fontSize: '12px' }}>
          {t.hardCount(difficultIds.size)}
        </span>
      </div>

      {/* Mode tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => switchMode('cards')} style={tabStyle('cards')}>
          🃏 {t.cards}
        </button>
        <button onClick={() => switchMode('list')} style={tabStyle('list')}>
          📋 {t.list}
        </button>
        <button onClick={() => switchMode('review')} style={tabStyle('review', '#dc2626')}>
          ⭐ {t.review}
          {difficultIds.size > 0 && (
            <span style={{
              marginLeft: '4px',
              background: '#fff',
              color: '#dc2626',
              borderRadius: '9999px',
              padding: '0 5px',
              fontSize: '11px',
              fontWeight: 'bold',
            }}>
              {difficultIds.size}
            </span>
          )}
        </button>
      </div>

      {/* Direction */}
      <button
        onClick={toggleReverse}
        style={{
          padding: '8px 12px', borderRadius: '8px', border: '1px solid #334155',
          background: '#0f172a', color: '#e2e8f0', fontSize: '13px',
          fontWeight: 600, cursor: 'pointer', textAlign: 'center',
        }}
      >
        🔁 {reverse ? t.dirFr : t.dirCa}
      </button>

      {/* ── LIST MODE ─────────────────────────────────────────── */}
      {viewMode === 'list' && (
        <div>
          <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '12px' }}>
            {t.listHint}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredCards.map(card => {
              const isHard = difficultIds.has(card.id);
              return (
                <div key={card.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  borderRadius: '12px',
                  border: `1px solid ${isHard ? accent : '#334155'}`,
                  background: isHard ? '#1c1a10' : '#1e293b',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: 'bold', color: '#fff', fontSize: '16px',
                    }}>
                      {card.front}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '2px' }}>
                      {language === 'en' && card.backEn ? card.backEn : card.back}
                    </div>
                    {card.category && (
                      <div style={{ color: accent, fontSize: '11px', marginTop: '2px' }}>
                        {card.category}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleDifficult(card.id)}
                    style={{
                      marginLeft: '12px',
                      width: '36px',
                      height: '36px',
                      flexShrink: 0,
                      borderRadius: '8px',
                      border: 'none',
                      background: isHard ? accent : '#334155',
                      fontSize: '18px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isHard ? '⭐' : '☆'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── REVIEW MODE empty ─────────────────────────────────── */}
      {viewMode === 'review' && reviewCards.length === 0 && (
        <div style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '12px',
          padding: '32px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>⭐</div>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>{t.noReview}</p>
        </div>
      )}

      {/* ── CARDS / REVIEW card view ───────────────────────────── */}
      {(viewMode === 'cards' || (viewMode === 'review' && reviewCards.length > 0)) && currentCard && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>

          {/* Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              width: '100%',
              minHeight: '220px',
              border: `2px solid ${accent}`,
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              background: isFlipped ? accentDark : '#fff',
              color: isFlipped ? '#fff' : '#000',
              fontSize: '28px',
              fontWeight: 'bold',
              textAlign: 'center',
              transition: 'all 0.25s ease',
              boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
              padding: '24px',
            }}
          >
            <span style={{ lineHeight: 1.3 }}>
              {(isFlipped === reverse)
                ? currentCard.front
                : (language === 'en' && currentCard.backEn ? currentCard.backEn : currentCard.back)}
            </span>
            {!isFlipped && currentCard.category && (
              <span style={{
                fontSize: '12px', color: '#888',
                marginTop: '8px', fontWeight: 'normal',
              }}>
                {currentCard.category}
              </span>
            )}
          </div>

          <p style={{ color: '#64748b', fontSize: '13px' }}>{t.flip}</p>

          {/* Mark difficult */}
          <button
            onClick={() => toggleDifficult(currentCard.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 20px',
              borderRadius: '8px',
              border: 'none',
              background: difficultIds.has(currentCard.id) ? accent : '#334155',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {difficultIds.has(currentCard.id) ? '⭐' : '☆'}
            {difficultIds.has(currentCard.id) ? t.unhard : t.hard}
          </button>

          {/* Nav */}
          <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <button onClick={handlePrev} style={{
              flex: 1, padding: '12px', borderRadius: '10px', border: 'none',
              background: '#475569', color: '#fff', fontSize: '16px',
              fontWeight: 600, cursor: 'pointer',
            }}>
              {t.prev}
            </button>
            <button onClick={handleNext} style={{
              flex: 1, padding: '12px', borderRadius: '10px', border: 'none',
              background: accent, color: '#fff', fontSize: '16px',
              fontWeight: 600, cursor: 'pointer',
            }}>
              {t.next}
            </button>
          </div>

          <p style={{ color: '#64748b', fontSize: '13px' }}>
            {t.cardOf} {currentIndex + 1} / {activeCards.length}
            {viewMode === 'review' && (
              <span style={{ color: '#f87171', marginLeft: '8px' }}>· ⭐ révision</span>
            )}
          </p>
        </div>
      )}

    </div>
  );
}
