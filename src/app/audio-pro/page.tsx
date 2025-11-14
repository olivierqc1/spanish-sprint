// src/app/audio-pro/page.tsx
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useConversations } from '@/hooks/useConversations';
import { Conversation, AudioResult, GenerationProgress } from '@/types/audio';
import { Toaster } from 'react-hot-toast';
import { GOOGLE_VOICES } from '@/config/voices';

// Components
import { SetupWizard } from '@/components/audio/SetupWizard';
import { ConversationList } from '@/components/audio/ConversationList';
import { AIDialogueGenerator } from '@/components/audio/AIDialogueGenerator';
import { ConversationForm } from '@/components/audio/ConversationForm';
import { GenerationPanel } from '@/components/audio/GenerationPanel';
import { NavigationTabs } from '@/components/audio/NavigationTabs';
import { PageHeader } from '@/components/audio/PageHeader';

// Services
import { useGoogleTTS } from '@/hooks/useGoogleTTS';

export type Tab = 'setup' | 'list' | 'ai' | 'manual' | 'generate';

export default function AudioManagerPro() {
  // State
  const [activeTab, setActiveTab] = useState<Tab>('setup');
  const [isConfigured, setIsConfigured] = useState(false);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);

  // Hooks
  const { conversations, addConversation, removeConversation } = useConversations();
  const { 
    generateAudios, 
    generating, 
    progress, 
    results,
    resetResults 
  } = useGoogleTTS();

  // Check configuration on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('google_cloud_api_key');
    if (savedKey) {
      setIsConfigured(true);
      setActiveTab('list');
    }
  }, []);

  // Handlers
  const handleConfigured = useCallback(() => {
    setIsConfigured(true);
    setActiveTab('list');
  }, []);

  const handleUnconfigure = useCallback(() => {
    setIsConfigured(false);
    setActiveTab('setup');
  }, []);

  const handleAddConversation = useCallback((conv: Conversation) => {
    addConversation(conv);
    setActiveTab('list');
  }, [addConversation]);

  const handleGenerate = useCallback(async (conv: Conversation) => {
    await generateAudios(conv);
  }, [generateAudios]);

  // Computed
  const countries = useMemo(() => Object.keys(GOOGLE_VOICES), []);
  
  const getCountryFlag = useCallback((country: string): string => {
    return GOOGLE_VOICES[country]?.homme?.[0]?.flag || '🌍';
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-5">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        <PageHeader />

        <NavigationTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isConfigured={isConfigured}
          conversationCount={conversations.length}
          onResetConfig={handleUnconfigure}
        />

        <main className="mt-8">
          {/* Setup Tab */}
          {activeTab === 'setup' && (
            <SetupWizard onComplete={handleConfigured} />
          )}

          {/* List Tab */}
          {activeTab === 'list' && isConfigured && (
            <ConversationList
              conversations={conversations}
              selectedConv={selectedConv}
              onSelect={setSelectedConv}
              onDelete={removeConversation}
              onNavigateToAI={() => setActiveTab('ai')}
              onNavigateToManual={() => setActiveTab('manual')}
              getCountryFlag={getCountryFlag}
            />
          )}

          {/* AI Generator Tab */}
          {activeTab === 'ai' && isConfigured && (
            <AIDialogueGenerator
              countries={countries}
              onGenerate={handleAddConversation}
            />
          )}

          {/* Manual Form Tab */}
          {activeTab === 'manual' && isConfigured && (
            <ConversationForm
              countries={countries}
              onSave={handleAddConversation}
            />
          )}

          {/* Generation Tab */}
          {activeTab === 'generate' && isConfigured && (
            <GenerationPanel
              conversations={conversations}
              generating={generating}
              progress={progress}
              results={results}
              onGenerate={handleGenerate}
              onNavigateToList={() => setActiveTab('list')}
              getCountryFlag={getCountryFlag}
            />
          )}
        </main>
      </div>
    </div>
  );
}