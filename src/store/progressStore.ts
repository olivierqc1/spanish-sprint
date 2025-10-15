import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressStore {
  currentStreak: number; // Nombre de jours consécutifs d'étude
  longestStreak: number; // Plus longue série de jours
  totalStudyTime: number; // Temps total d'étude en minutes
  completedLessons: number; // Nombre de leçons complétées
  lastStudyDate: string | null; // Date de la dernière étude
  
  // Actions
  updateStreak: () => void;
  addStudyTime: (minutes: number) => void;
  completeLesson: () => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      longestStreak: 0,
      totalStudyTime: 0,
      completedLessons: 0,
      lastStudyDate: null,

      updateStreak: () => {
        const today = new Date().toDateString();
        const lastDate = get().lastStudyDate;

        if (!lastDate) {
          // Première étude
          set({ currentStreak: 1, longestStreak: 1, lastStudyDate: today });
        } else if (lastDate === today) {
          // Déjà étudié aujourd'hui, ne rien faire
          return;
        } else {
          const lastStudy = new Date(lastDate);
          const todayDate = new Date(today);
          const diffTime = todayDate.getTime() - lastStudy.getTime();
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            // Jour consécutif
            const newStreak = get().currentStreak + 1;
            set({
              currentStreak: newStreak,
              longestStreak: Math.max(newStreak, get().longestStreak),
              lastStudyDate: today,
            });
          } else {
            // Série brisée
            set({ currentStreak: 1, lastStudyDate: today });
          }
        }
      },

      addStudyTime: (minutes: number) => {
        set((state) => ({ 
          totalStudyTime: state.totalStudyTime + minutes 
        }));
        get().updateStreak();
      },

      completeLesson: () => {
        set((state) => ({ 
          completedLessons: state.completedLessons + 1 
        }));
        get().updateStreak();
      },

      resetProgress: () => {
        set({
          currentStreak: 0,
          longestStreak: 0,
          totalStudyTime: 0,
          completedLessons: 0,
          lastStudyDate: null,
        });
      },
    }),
    {
      name: "spanish-sprint-progress-storage",
    }
  )
);
