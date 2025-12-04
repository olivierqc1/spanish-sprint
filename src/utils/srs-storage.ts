// ===================================================
// GESTION DU STOCKAGE SRS (localStorage)
// src/utils/srs-storage.ts
// ===================================================

import type { CardProgress, StudySession, UserStats } from '@/types/srs';
import { createNewCardProgress, isDueForReview, getCardStatus } from './srs-algorithm';

const STORAGE_KEYS = {
  PROGRESS: 'spanish-sprint-card-progress',
  STATS: 'spanish-sprint-user-stats',
  SESSIONS: 'spanish-sprint-study-sessions',
};

/**
 * Récupère la progression d'une carte
 */
export function getCardProgress(cardId: string): CardProgress {
  const allProgress = getAllProgress();
  return allProgress[cardId] || createNewCardProgress(cardId);
}

/**
 * Sauvegarde la progression d'une carte
 */
export function saveCardProgress(progress: CardProgress): void {
  const allProgress = getAllProgress();
  allProgress[progress.cardId] = progress;
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress));
}

/**
 * Récupère toutes les progressions
 */
export function getAllProgress(): Record<string, CardProgress> {
  const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  if (!data) return {};
  
  const progress = JSON.parse(data);
  
  // Convertir les dates strings en objets Date
  Object.keys(progress).forEach(key => {
    progress[key].nextReview = new Date(progress[key].nextReview);
    if (progress[key].lastReviewed) {
      progress[key].lastReviewed = new Date(progress[key].lastReviewed);
    }
  });
  
  return progress;
}

/**
 * Récupère les cartes à réviser aujourd'hui
 */
export function getDueCards(allCardIds: string[]): CardProgress[] {
  const allProgress = getAllProgress();
  
  return allCardIds
    .map(id => allProgress[id] || createNewCardProgress(id))
    .filter(progress => isDueForReview(progress))
    .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime());
}

/**
 * Récupère les nouvelles cartes (jamais étudiées)
 */
export function getNewCards(allCardIds: string[], limit: number = 20): string[] {
  const allProgress = getAllProgress();
  
  return allCardIds
    .filter(id => !allProgress[id])
    .slice(0, limit);
}

/**
 * Sauvegarde une session d'étude
 */
export function saveStudySession(session: StudySession): void {
  const sessions = getStudySessions();
  sessions.push(session);
  
  // Garder seulement les 90 derniers jours
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  
  const recentSessions = sessions.filter(s => 
    new Date(s.date) > ninetyDaysAgo
  );
  
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(recentSessions));
}

/**
 * Récupère l'historique des sessions
 */
export function getStudySessions(): StudySession[] {
  const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  if (!data) return [];
  
  const sessions = JSON.parse(data);
  sessions.forEach((s: StudySession) => {
    s.date = new Date(s.date);
  });
  
  return sessions;
}

/**
 * Calcule les statistiques utilisateur
 */
export function getUserStats(allCardIds: string[]): UserStats {
  const allProgress = getAllProgress();
  const sessions = getStudySessions();
  
  let newCards = 0;
  let learningCards = 0;
  let masteredCards = 0;
  
  allCardIds.forEach(id => {
    const progress = allProgress[id];
    if (!progress) {
      newCards++;
    } else {
      const status = getCardStatus(progress);
      if (status === 'new' || status === 'learning') {
        learningCards++;
      } else {
        masteredCards++;
      }
    }
  });
  
  // Calculer le streak
  const streak = calculateStreak(sessions);
  
  return {
    totalCards: allCardIds.length,
    masteredCards,
    learningCards,
    newCards,
    streak,
    lastStudyDate: sessions.length > 0 ? sessions[sessions.length - 1].date : null,
    studySessions: sessions,
  };
}

/**
 * Calcule le nombre de jours consécutifs d'étude
 */
function calculateStreak(sessions: StudySession[]): number {
  if (sessions.length === 0) return 0;
  
  const sortedSessions = [...sessions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let checkDate = new Date(today);
  
  for (const session of sortedSessions) {
    const sessionDate = new Date(session.date);
    sessionDate.setHours(0, 0, 0, 0);
    
    if (sessionDate.getTime() === checkDate.getTime()) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (sessionDate.getTime() < checkDate.getTime()) {
      break;
    }
  }
  
  return streak;
}

/**
 * Réinitialise toutes les données SRS
 */
export function resetAllProgress(): void {
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.SESSIONS);
}