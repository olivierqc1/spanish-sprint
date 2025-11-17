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
  startDate: string | Date;
  endDate?: string | Date;
  priority: number;
}

interface AnnouncementStore {
  announcements: Announcement[];
  dismissedIds: string[];
  
  // Actions
  getActiveAnnouncements: () => Announcement[];
  dismissAnnouncement: (id: string) => void;
  addAnnouncement: (announcement: Announcement) => void;
  removeAnnouncement: (id: string) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
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
            if (dismissedIds.includes(announcement.id)) {
              return false;
            }
            
            const startDate = new Date(announcement.startDate);
            if (now < startDate) {
              return false;
            }
            
            if (announcement.endDate) {
              const endDate = new Date(announcement.endDate);
              if (now > endDate) {
                return false;
              }
            }
            
            return true;
          })
          .sort((a, b) => b.priority - a.priority);
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

      updateAnnouncement: (id: string, updates: Partial<Announcement>) => {
        set((state) => ({
          announcements: state.announcements.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
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