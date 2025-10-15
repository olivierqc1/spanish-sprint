import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateNextReview, type ReviewQuality } from "@/lib/spacedRepetition";

export interface CardReviewState {
  repetitions: number;
  easeFactor: number;
  interval: number;
  nextReview: string;
  lastReviewed: string;
}

interface ReviewStore {
  reviewState: Record<number, CardReviewState>;
  recordReview: (cardId: number, quality: ReviewQuality) => void;
  resetCard: (cardId: number) => void;
  resetAll: () => void;
}

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set) => ({
      reviewState: {},

      recordReview: (cardId: number, quality: ReviewQuality) => {
        set((state) => {
          const currentState = state.reviewState[cardId] || {
            repetitions: 0,
            easeFactor: 2.5,
            interval: 0,
            nextReview: new Date().toISOString(),
            lastReviewed: new Date().toISOString(),
          };

          const newState = calculateNextReview(currentState, quality);

          return {
            reviewState: {
              ...state.reviewState,
              [cardId]: newState,
            },
          };
        });
      },

      resetCard: (cardId: number) => {
        set((state) => {
          const newState = { ...state.reviewState };
          delete newState[cardId];
          return { reviewState: newState };
        });
      },

      resetAll: () => {
        set({ reviewState: {} });
      },
    }),
    {
      name: "spanish-sprint-review-storage",
    }
  )
);
