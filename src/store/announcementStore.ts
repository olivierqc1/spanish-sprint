import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AnnouncementType = 'info' | 'warning' | 'success' | 'error' | 'new';

export interface Announcement {
  id: string;
  type: AnnouncementType;
  messageFr: string;
  messageEn: string;
  link?: string;
  linkTextFr?: string;
  linkTextEn?: string;
  dismissible: boolean;
  startDate: string;
  endDate?: string;
  priority: number; // Plus le nombre est élevé, plus la priorité est haute
}

interface AnnouncementStore {
  announcements: Announcement[];
  dismissedIds: string[];
  
  // Actions
  getActiveAnnouncements: () => Announcement[];
  dismissAnnouncement: (id: string) => void;
  addAnnouncement: (announcement: Announcement) => void;
  removeAnnouncement: (id: string) => void;
  clearDismissed: () => void;
}

export const useAnnouncementStore = create<AnnouncementStore>()(
  persist(
    (set, get) => ({
      announcements: [],
      dismissedIds: [],

      getActiveAnnouncements: () => {
        const now = new Date();
        const { announcements, dismissedIds } = get();
        
        return announcements
          .filter((announcement) => {
            // Vérifier si l'annonce n'est pas dismissée
            if (dismissedIds.includes(announcement.id)) {
              return false;
            }
            
            // Vérifier la date de début
            const startDate = new Date(announcement.startDate);
            if (now < startDate) {
              return false;
            }
            
            // Vérifier la date de fin si elle existe
            if (announcement.endDate) {
              const endDate = new Date(announcement.endDate);
              if (now > endDate) {
                return false;
              }
            }
            
            return true;
          })
          .sort((a, b) => b.priority - a.priority); // Trier par priorité décroissante
      },

      dismissAnnouncement: (id: string) => {
        set((state) => ({
          dismissedIds: [...state.dismissedIds, id],
        }));
      },

      addAnnouncement: (announcement: Announcement) => {
        set((state) => ({
          announcements: [...state.announcements, announcement],
        }));
      },

      removeAnnouncement: (id: string) => {
        set((state) => ({
          announcements: state.announcements.filter((a) => a.id !== id),
        }));
      },

      clearDismissed: () => {
        set({ dismissedIds: [] });
      },
    }),
    {
      name: "spanish-sprint-announcements-storage",
    }
  )
);