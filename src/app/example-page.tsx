// src/app/example-page.tsx
'use client';
import { useTranslation } from '@/i18n/useTranslation';
import LanguageToggle from '@/components/LanguageToggle';
import AnnouncementBanner from '@/components/AnnouncementBanner';

export default function ExamplePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Bannière d'annonces */}
      <AnnouncementBanner />

      {/* Header avec sélection de langue */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{t('common.home')}</h1>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('navigation.vocabulary')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <NavCard title={t('navigation.vocabulary')} description={t('vocabulary.subtitle')} />
            <NavCard title={t('navigation.grammar')} description={t('grammar.subtitle')} />
            <NavCard title={t('navigation.conversation')} description={t('conversation.subtitle')} />
            <NavCard title={t('navigation.reading')} description={t('reading.subtitle')} />
          </div>
        </nav>

        {/* Section Vocabulaire */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('vocabulary.title')}</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t('vocabulary.subtitle')}</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {t('vocabulary.start_learning')}
              </button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                {t('vocabulary.review_now')}
              </button>
            </div>
          </div>
        </section>

        {/* Section Niveaux */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{t('levels.a1')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <LevelCard level="A1" title={t('levels.a1')} />
            <LevelCard level="A2" title={t('levels.a2')} />
            <LevelCard level="B1" title={t('levels.b1')} />
          </div>
        </section>

        {/* Section Pays */}
        <section>
          <h2 className="text-xl font-semibold mb-4">{t('navigation.countries')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <CountryCard name={t('countries.spain')} flag="🇪🇸" />
            <CountryCard name={t('countries.mexico')} flag="🇲🇽" />
            <CountryCard name={t('countries.argentina')} flag="🇦🇷" />
            <CountryCard name={t('countries.colombia')} flag="🇨🇴" />
          </div>
        </section>
      </main>
    </div>
  );
}

// Composants auxiliaires
function NavCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function LevelCard({ level, title }: { level: string; title: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="text-3xl font-bold text-blue-600 mb-2">{level}</div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
      <div className="mt-4">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: '60%' }} />
        </div>
        <p className="text-xs text-gray-500 mt-1">60% complété</p>
      </div>
    </div>
  );
}

function CountryCard({ name, flag }: { name: string; flag: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors cursor-pointer text-center">
      <div className="text-3xl mb-2">{flag}</div>
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
}
