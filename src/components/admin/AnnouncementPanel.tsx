// components/admin/AnnouncementPanel.tsx
'use client';
import { useState } from 'react';
import { useAnnouncementStore, type Announcement, type AnnouncementType } from '@/store/announcementStore';
import { useTranslation } from '../../../i18n/useTranslation';
import { Plus, Edit, Trash2, X } from 'lucide-react';

export default function AnnouncementPanel() {
  const { t } = useTranslation();
  const { announcements, addAnnouncement, removeAnnouncement } = useAnnouncementStore();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Announcement>>({
    type: 'info',
    messageFr: '',
    messageEn: '',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 jours
    priority: 2,
    dismissible: true,
    link: '',
    linkTextFr: '',
    linkTextEn: ''
  });

  const types: AnnouncementType[] = ['info', 'warning', 'success', 'error', 'new'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.messageFr || !formData.messageEn) {
      alert('Les messages FR et EN sont obligatoires');
      return;
    }

  const newAnnouncement: Announcement = {
  id: editingId || Date.now().toString(),
  type: formData.type || 'info',
  messageFr: formData.messageFr,
  messageEn: formData.messageEn,
  startDate: formData.startDate || new Date(),
  endDate: formData.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  priority: formData.priority || 2,
  dismissible: formData.dismissible ?? true,
  link: formData.link,
  linkTextFr: formData.linkTextFr,
  linkTextEn: formData.linkTextEn
};

if (editingId) {
  removeAnnouncement(editingId);
  addAnnouncement(newAnnouncement);
  setEditingId(null);
} else {
  addAnnouncement(newAnnouncement);
}

    setFormData({
      type: 'info',
      messageFr: '',
      messageEn: '',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      priority: 2,
      dismissible: true,
      link: '',
      linkTextFr: '',
      linkTextEn: ''
    });
    setIsCreating(false);
  };

  const handleEdit = (announcement: Announcement) => {
    setFormData(announcement);
    setEditingId(announcement.id);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({
      type: 'info',
      messageFr: '',
      messageEn: '',
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      priority: 2,
      dismissible: true,
      link: '',
      linkTextFr: '',
      linkTextEn: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t('admin.announcements')}</h1>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            {t('admin.create_announcement')}
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {editingId ? t('admin.edit_announcement') : t('admin.create_announcement')}
            </h2>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('admin.type')}</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as AnnouncementType })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('admin.priority')}</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value={1}>{t('admin.high')}</option>
                  <option value={2}>{t('admin.medium')}</option>
                  <option value={3}>{t('admin.low')}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('admin.message_fr')}</label>
              <input
                type="text"
                value={formData.messageFr}
                onChange={(e) => setFormData({ ...formData, messageFr: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('admin.message_en')}</label>
              <input
                type="text"
                value={formData.messageEn}
                onChange={(e) => setFormData({ ...formData, messageEn: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('admin.start_date')}</label>
                <input
                  type="date"
                  value={formData.startDate instanceof Date ? formData.startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('admin.end_date')}</label>
                <input
                  type="date"
                  value={formData.endDate instanceof Date ? formData.endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Link (optionnel)</label>
              <input
                type="text"
                value={formData.link || ''}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                placeholder="/page"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Link Text FR (optionnel)</label>
                <input
                  type="text"
                  value={formData.linkTextFr || ''}
                  onChange={(e) => setFormData({ ...formData, linkTextFr: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Link Text EN (optionnel)</label>
                <input
                  type="text"
                  value={formData.linkTextEn || ''}
                  onChange={(e) => setFormData({ ...formData, linkTextEn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="dismissible"
                checked={formData.dismissible}
                onChange={(e) => setFormData({ ...formData, dismissible: e.target.checked })}
                className="h-4 w-4"
              />
              <label htmlFor="dismissible" className="text-sm">Dismissible</label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingId ? t('common.save') : t('admin.create_announcement')}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {t('common.cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {announcements.map((announcement) => {
          const startDate = new Date(announcement.startDate);
          const endDate = new Date(announcement.endDate);
          const now = new Date();
          const isActive = now >= startDate && now <= endDate;

          return (
            <div
              key={announcement.id}
              className={`bg-white dark:bg-gray-800 rounded-lg p-4 border ${
                isActive
                  ? 'border-green-300 dark:border-green-700'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      announcement.type === 'info' ? 'bg-blue-100 text-blue-700' :
                      announcement.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                      announcement.type === 'success' ? 'bg-green-100 text-green-700' :
                      announcement.type === 'error' ? 'bg-red-100 text-red-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {announcement.type}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {isActive ? t('admin.active') : t('admin.inactive')}
                    </span>
                    <span className="text-xs text-gray-500">
                      Priority: {announcement.priority}
                    </span>
                  </div>
                  <p className="text-sm font-medium mb-1">🇫🇷 {announcement.messageFr}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">🇬🇧 {announcement.messageEn}</p>
                  <div className="text-xs text-gray-500">
                    {startDate.toLocaleDateString()} → {endDate.toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Supprimer cette annonce ?')) {
                        removeAnnouncement(announcement.id);
                      }
                    }}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
