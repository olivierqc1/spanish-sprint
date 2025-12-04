// ===================================================
// ALGORITHME SM-2 (SuperMemo 2)
// src/utils/srs-algorithm.ts
// ===================================================

import type { Difficulty, CardProgress } from '@/types/srs';

/**
 * Calcule la prochaine révision selon l'algorithme SM-2
 * @param progress - Progression actuelle de la carte
 * @param difficulty - Difficulté évaluée par l'utilisateur
 * @returns Progression mise à jour
 */
export function calculateNextReview(
  progress: CardProgress,
  difficulty: Difficulty
): CardProgress {
  const now = new Date();
  let { easeFactor, interval, repetitions } = progress;

  // Mise à jour selon la difficulté
  switch (difficulty) {
    case 'again':
      // Échec - recommencer
      repetitions = 0;
      interval = 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      break;

    case 'hard':
      // Difficile - augmentation minimale
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      if (repetitions === 0) {
        interval = 1;
        repetitions = 1;
      } else {
        interval = Math.round(interval * 1.2);
      }
      break;

    case 'good':
      // Correct - progression normale
      if (repetitions === 0) {
        interval = 1;
        repetitions = 1;
      } else if (repetitions === 1) {
        interval = 6;
        repetitions = 2;
      } else {
        interval = Math.round(interval * easeFactor);
        repetitions += 1;
      }
      break;

    case 'easy':
      // Facile - progression rapide
      easeFactor = Math.min(2.5, easeFactor + 0.15);
      if (repetitions === 0) {
        interval = 4;
        repetitions = 1;
      } else if (repetitions === 1) {
        interval = 10;
        repetitions = 2;
      } else {
        interval = Math.round(interval * easeFactor * 1.3);
        repetitions += 1;
      }
      break;
  }

  // Calculer la date de prochaine révision
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    ...progress,
    easeFactor,
    interval,
    repetitions,
    nextReview,
    lastReviewed: now,
    totalReviews: progress.totalReviews + 1,
    correctReviews: progress.correctReviews + (difficulty === 'again' ? 0 : 1),
  };
}

/**
 * Crée une nouvelle progression pour une carte
 */
export function createNewCardProgress(cardId: string): CardProgress {
  return {
    cardId,
    easeFactor: 2.5,
    interval: 1,
    repetitions: 0,
    nextReview: new Date(), // À réviser immédiatement
    lastReviewed: null,
    totalReviews: 0,
    correctReviews: 0,
  };
}

/**
 * Vérifie si une carte doit être révisée aujourd'hui
 */
export function isDueForReview(progress: CardProgress): boolean {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Début de journée
  
  const nextReview = new Date(progress.nextReview);
  nextReview.setHours(0, 0, 0, 0);
  
  return nextReview <= now;
}

/**
 * Calcule le taux de réussite d'une carte
 */
export function getSuccessRate(progress: CardProgress): number {
  if (progress.totalReviews === 0) return 0;
  return Math.round((progress.correctReviews / progress.totalReviews) * 100);
}

/**
 * Détermine le statut d'une carte
 */
export function getCardStatus(progress: CardProgress): 'new' | 'learning' | 'young' | 'mature' {
  if (progress.repetitions === 0) return 'new';
  if (progress.interval < 21) return 'learning';
  if (progress.interval < 60) return 'young';
  return 'mature';
}