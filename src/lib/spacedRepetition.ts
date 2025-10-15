import type { CardReviewState } from "@/store/reviewStore";

/**
 * Qualité de la réponse (basé sur l'algorithme SM-2)
 * 0 = Oublié complètement
 * 1 = Réponse incorrecte mais familière
 * 2 = Réponse correcte avec difficulté
 * 3 = Réponse correcte avec hésitation
 * 4 = Réponse correcte facilement
 * 5 = Réponse correcte instantanément
 */
export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Calcule le prochain état de révision en utilisant l'algorithme SM-2
 * @param currentState État actuel de la carte
 * @param quality Qualité de la réponse (0-5)
 * @returns Nouvel état de révision
 */
export function calculateNextReview(
  currentState: CardReviewState,
  quality: ReviewQuality
): CardReviewState {
  const now = new Date();
  let { repetitions, easeFactor, interval } = currentState;

  // Calculer le nouveau facteur de facilité
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  // Si la qualité est inférieure à 3, recommencer à zéro
  if (quality < 3) {
    repetitions = 0;
    interval = 0;
  } else {
    repetitions += 1;

    // Calculer le nouvel intervalle
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }

  // Calculer la date de la prochaine révision
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    repetitions,
    easeFactor,
    interval,
    nextReview: nextReview.toISOString(),
    lastReviewed: now.toISOString(),
  };
}

/**
 * Vérifie si une carte doit être révisée aujourd'hui
 * @param cardState État de la carte
 * @returns true si la carte doit être révisée
 */
export function shouldReviewToday(cardState: CardReviewState | undefined): boolean {
  if (!cardState) return true; // Nouvelle carte
  return new Date(cardState.nextReview) <= new Date();
}

/**
 * Retourne le nombre de jours avant la prochaine révision
 * @param cardState État de la carte
 * @returns Nombre de jours (peut être négatif si en retard)
 */
export function daysUntilNextReview(cardState: CardReviewState): number {
  const now = new Date();
  const nextReview = new Date(cardState.nextReview);
  const diffTime = nextReview.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
