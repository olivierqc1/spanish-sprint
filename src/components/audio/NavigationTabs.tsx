// src/components/audio/NavigationTabs.tsx
import { Button } from '@/components/ui/Button';
import type { Tab } from '@/app/audio-pro/page';

interface NavigationTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  isConfigured: boolean;
  conversationCount: number;
  onResetConfig: () => void;
}

export function NavigationTabs({
  activeTab,
  onTabChange,
  isConfigured,
  conversationCount,
  onResetConfig
}: NavigationTabsProps) {
  if (!isConfigured) {
    return (
      <nav className="flex gap-2 mb-8" role="navigation" aria-label="Navigation principale">
        <Button
          variant={activeTab === 'setup' ? 'primary' : 'ghost'}
          onClick={() => onTabChange('setup')}
        >
          ⚙️ Configuration
        </Button>
      </nav>
    );
  }

  return (
    <nav className="flex flex-wrap gap-2 mb-8" role="navigation" aria-label="Navigation principale">
      <Button
        variant={activeTab === 'list' ? 'primary' : 'ghost'}
        onClick={() => onTabChange('list')}
        aria-current={activeTab === 'list' ? 'page' : undefined}
      >
        📋 Conversations ({conversationCount})
      </Button>
      <Button
        variant={activeTab === 'ai' ? 'primary' : 'ghost'}
        onClick={() => onTabChange('ai')}
        aria-current={activeTab === 'ai' ? 'page' : undefined}
      >
        ✨ AI
      </Button>
      <Button
        variant={activeTab === 'manual' ? 'primary' : 'ghost'}
        onClick={() => onTabChange('manual')}
        aria-current={activeTab === 'manual' ? 'page' : undefined}
      >
        ✍️ Manuel
      </Button>
      <Button
        variant={activeTab === 'generate' ? 'primary' : 'ghost'}
        onClick={() => onTabChange('generate')}
        aria-current={activeTab === 'generate' ? 'page' : undefined}
      >
        🚀 Générer
      </Button>
      <Button
        variant="ghost"
        onClick={onResetConfig}
        className="ml-auto"
      >
        🔓 Changer clé
      </Button>
    </nav>
  );
}