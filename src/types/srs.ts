// ===================================================
// TYPES POUR LE SYSTÈME SRS
// src/types/srs.ts
// ===================================================

export type Difficulty = 'again' | 'hard' | 'good' | 'easy';

export interface CardProgress {
  cardId: string;
  easeFactor: number;      // Facteur de facilité (commence à 2.5)
  interval: number;         // Intervalle en jours
  repetitions: number;      // Nombre de répétitions réussies
  nextReview: Date;         // Date de la prochaine révision
  lastReviewed: Date | null; // Dernière révision
  totalReviews: number;     // Total de révisions
  correctReviews: number;   // Révisions correctes
}

export interface StudySession {
  date: Date;
  cardsStudied: number;
  correctAnswers: number;
  timeSpent: number; // en minutes
}

export interface UserStats {
  totalCards: number;
  masteredCards: number;    // Cards avec interval > 21 jours
  learningCards: number;    // Cards en apprentissage
  newCards: number;         // Cards jamais vues
  streak: number;           // Jours consécutifs
  lastStudyDate: Date | null;
  studySessions: StudySession[];
}