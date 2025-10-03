import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedLessons: Set<string>;
  currentStreak: number;
  lastPracticeDate: string | null;
  totalStudyTime: number; // en minutes
  
  // Actions
  addCompletedLesson: (lessonId: string) => void;
  updateStreak: () => void;
  addStudyTime: (minutes: number) => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      // État initial
      completedLessons: new Set<string>(),
      currentStreak: 0,
      lastPracticeDate: null,
      totalStudyTime: 0,
      
      // Marquer une leçon comme complétée
      addCompletedLesson: (lessonId: string) => {
        set((state) => {
          const newCompleted = new Set(state.completedLessons);
          newCompleted.add(lessonId);
          return { completedLessons: newCompleted };
        });
        get().updateStreak();
      },
      
      // Mettre à jour la série de jours consécutifs
      updateStreak: () => {
        const today = new Date().toDateString();
        const lastDate = get().lastPracticeDate;
        
        if (lastDate === today) {
          // Déjà pratiqué aujourd'hui
          return;
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate === yesterday.toDateString()) {
          // Continuation de la série
          set((state) => ({ 
            currentStreak: state.currentStreak + 1,
            lastPracticeDate: today
          }));
        } else {
          // Nouvelle série
          set({ 
            currentStreak: 1, 
            lastPracticeDate: today 
          });
        }
      },
      
      // Ajouter du temps d'étude
      addStudyTime: (minutes: number) => {
        set((state) => ({
          totalStudyTime: state.totalStudyTime + minutes
        }));
        get().updateStreak();
      },
      
      // Réinitialiser toute la progression
      resetProgress: () => {
        set({
          completedLessons: new Set<string>(),
          currentStreak: 0,
          lastPracticeDate: null,
          totalStudyTime: 0,
        });
      },
    }),
    {
      name: 'spanish-sprint-progress',
      // Conversion Set <-> Array pour la persistance
      partialize: (state) => ({
        completedLessons: Array.from(state.completedLessons),
        currentStreak: state.currentStreak,
        lastPracticeDate: state.lastPracticeDate,
        totalStudyTime: state.totalStudyTime,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.completedLessons)) {
          state.completedLessons = new Set(state.completedLessons as any);
        }
      },
    }
  )
);
