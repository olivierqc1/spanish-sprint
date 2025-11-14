// components/AnnouncementBanner.tsx
'use client';
import { useAnnouncementStore, type AnnouncementType } from '@/stores/announcementStore';
import { useTranslation } from '../../i18n/useTranslation';
import { X } from 'lucide-react';
import Link from 'next/link';

const typeStyles: Record<AnnouncementType, string> = {
  info: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
  warning: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100',
  success: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100',
  error: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
  new: 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100'
};

const typeButtonStyles: Record<AnnouncementType, string> = {
  info: 'hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-300',
  warning: 'hover:bg-yellow-100 dark:hover:bg-yellow-900 text-yellow-600 dark:text-yellow-300',
  success: 'hover:bg-green-100 dark:hover:bg-green-900 text-green-600 dark:text-green-300',
  error: 'hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-300',
  new: 'hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-600 dark:text-purple-300'
};

const typeLinkStyles: Record<AnnouncementType, string> = {
  info: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
  warning: 'bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600',
  success: 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600',
  error: 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600',
  new: 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600'
};

export default function AnnouncementBanner() {
  const { getActiveAnnouncements, dismissAnnouncement } = useAnnouncementStore();
  const { language } = useTranslation();
  const activeAnnouncements = getActiveAnnouncements();

  if (activeAnnouncements.length === 0) {
    return null;
  }

  // Afficher seulement la première annonce (la plus prioritaire)
  const announcement = activeAnnouncements[0];
  const message = language === 'fr' ? announcement.messageFr : announcement.messageEn;
  const linkText = language === 'fr' ? announcement.linkTextFr : announcement.linkTextEn;

  return (
    <div className={`border-b ${typeStyles[announcement.type]}`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{message}</p>
            {announcement.link && linkText && (
              <Link
                href={announcement.link}
                className={`px-3 py-1 text-xs font-medium text-white rounded-md transition-colors whitespace-nowrap ${typeLinkStyles[announcement.type]}`}
              >
                {linkText}
              </Link>
            )}
          </div>
          {announcement.dismissible && (
            <button
              onClick={() => dismissAnnouncement(announcement.id)}
              className={`p-1 rounded-md transition-colors flex-shrink-0 ${typeButtonStyles[announcement.type]}`}
              aria-label="Dismiss announcement"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
