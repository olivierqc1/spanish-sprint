// src/lib/spacedRepetition.ts
/**
 * Système de répétition espacée (Spaced Repetition System - SRS)
 * Basé sur l'algorithme SM-2 simplifié
 */

export type CardReview = {
  cardId: string;
  easiness: number;        // Facteur de facilité (1.3 à 2.5)
  interval: number;        // Intervalle en jours
  repetitions: number;     // Nombre de répétitions réussies
  nextReview: Date;        // Date de prochaine révision
  lastReviewed: Date;      // Dernière révision
  totalReviews: number;    // Total de révisions
  successRate: number;     // Taux de réussite (0-100)
};

export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;
// 0: Totalement oublié
// 1: Réponse incorrecte mais reconnaissable
// 2: Réponse incorrecte mais facile à rappeler
// 3: Réponse correcte mais difficile
// 4: Réponse correcte avec hésitation
// 5: Réponse correcte et facile

/**
 * Initialise une nouvelle carte pour la révision espacée
 */
export function initializeCard(cardId: string): CardReview {
  return {
    cardId,
    easiness: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: new Date(),
    lastReviewed: new Date(),
    totalReviews: 0,
    successRate: 0,
  };
}

/**
 * Calcule la prochaine révision basée sur la qualité de la réponse
 * Algorithme SM-2 modifié
 */
export function calculateNextReview(
  card: CardReview,
  quality: ReviewQuality
): CardReview {
  const now = new Date();
  const isCorrect = quality >= 3;

  // Mettre à jour le facteur de facilité
  let newEasiness = card.easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  newEasiness = Math.max(1.3, Math.min(2.5, newEasiness)); // Limiter entre 1.3 et 2.5

  let newInterval: number;
  let newRepetitions: number;

  if (!isCorrect) {
    // Si incorrect, recommencer à 0
    newInterval = 0;
    newRepetitions = 0;
  } else {
    // Si correct, augmenter l'intervalle
    if (card.repetitions === 0) {
      newInterval = 1; // 1 jour
    } else if (card.repetitions === 1) {
      newInterval = 6; // 6 jours
    } else {
      newInterval = Math.round(card.interval * newEasiness);
    }
    newRepetitions = card.repetitions + 1;
  }

  // Calculer la date de prochaine révision
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + newInterval);

  // Calculer le taux de réussite
  const totalSuccess = (card.successRate * card.totalReviews + (isCorrect ? 100 : 0));
  const newSuccessRate = totalSuccess / (card.totalReviews + 1);

  return {
    ...card,
    easiness: newEasiness,
    interval: newInterval,
    repetitions: newRepetitions,
    nextReview,
    lastReviewed: now,
    totalReviews: card.totalReviews + 1,
    successRate: newSuccessRate,
  };
}

/**
 * Détermine si une carte doit être révisée aujourd'hui
 */
export function isDueForReview(card: CardReview): boolean {
  return new Date() >= card.nextReview;
}

/**
 * Filtre et trie les cartes à réviser
 */
export function getCardsToReview(cards: CardReview[], limit?: number): CardReview[] {
  const dueCards = cards.filter(isDueForReview);
  
  // Trier par priorité :
  // 1. Cartes en retard (plus anciennes d'abord)
  // 2. Nouvelles cartes (jamais révisées)
  // 3. Cartes avec faible taux de réussite
  const sorted = dueCards.sort((a, b) => {
    // Nouvelles cartes en priorité
    if (a.totalReviews === 0 && b.totalReviews > 0) return -1;
    if (b.totalReviews === 0 && a.totalReviews > 0) return 1;

    // Ensuite par date de révision (plus ancienne d'abord)
    const dateCompare = a.nextReview.getTime() - b.nextReview.getTime();
    if (dateCompare !== 0) return dateCompare;

    // Finalement par taux de réussite (plus faible d'abord)
    return a.successRate - b.successRate;
  });

  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Obtient les statistiques de révision
 */
export function getReviewStats(cards: CardReview[]) {
  const now = new Date();
  
  const due = cards.filter(isDueForReview).length;
  const newCards = cards.filter(c => c.totalReviews === 0).length;
  const learning = cards.filter(c => c.repetitions > 0 && c.repetitions < 3).length;
  const mature = cards.filter(c => c.repetitions >= 3).length;
  
  const avgSuccessRate = cards.length > 0
    ? cards.reduce((sum, c) => sum + c.successRate, 0) / cards.length
    : 0;

  // Cartes à revoir dans les prochains jours
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const dueTomorrow = cards.filter(c => c.nextReview >= now && c.nextReview < tomorrow).length;
  const dueThisWeek = cards.filter(c => c.nextReview >= now && c.nextReview < nextWeek).length;

  return {
    total: cards.length,
    due,
    newCards,
    learning,
    mature,
    avgSuccessRate: Math.round(avgSuccessRate),
    dueTomorrow,
    dueThisWeek,
  };
}

/**
 * Exporte les données de révision (pour sauvegarde)
 */
export function exportReviewData(cards: CardReview[]): string {
  return JSON.stringify(cards);
}

/**
 * Importe les données de révision (depuis sauvegarde)
 */
export function importReviewData(jsonData: string): CardReview[] {
  try {
    const data = JSON.parse(jsonData);
    return data.map((card: any) => ({
      ...card,
      nextReview: new Date(card.nextReview),
      lastReviewed: new Date(card.lastReviewed),
    }));
  } catch (error) {
    console.error("Erreur d'importation:", error);
    return [];
  }
}

/**
 * Suggestion de session de révision quotidienne
 */
export function getSuggestedDailySession(
  cards: CardReview[],
  maxNewCards: number = 10,
  maxReviews: number = 50
): CardReview[] {
  const dueCards = getCardsToReview(cards);
  const newCards = dueCards.filter(c => c.totalReviews === 0).slice(0, maxNewCards);
  const reviewCards = dueCards.filter(c => c.totalReviews > 0).slice(0, maxReviews - newCards.length);
  
  return [...newCards, ...reviewCards];
}
