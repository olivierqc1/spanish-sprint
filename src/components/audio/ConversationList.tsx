// src/components/audio/ConversationList.tsx
import React from 'react';
import { Conversation } from '@/types/audio';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ConversationCard } from './ConversationCard';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConv: Conversation | null;
  onSelect: (conv: Conversation) => void;
  onDelete: (id: string) => void;
  onNavigateToAI: () => void;
  onNavigateToManual: () => void;
  getCountryFlag: (country: string) => string;
}

export const ConversationList = React.memo(({
  conversations,
  selectedConv,
  onSelect,
  onDelete,
  onNavigateToAI,
  onNavigateToManual,
  getCountryFlag
}: ConversationListProps) => {
  if (conversations.length === 0) {
    return (
      <Card className="text-center py-12">
        <p className="text-lg mb-6 text-slate-300">
          Aucune conversation pour le moment
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={onNavigateToAI} size="lg">
            ✨ Générer avec IA
          </Button>
          <Button variant="secondary" onClick={onNavigateToManual} size="lg">
            ✍️ Ajouter manuellement
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {conversations.map(conv => (
        <ConversationCard
          key={conv.id}
          conversation={conv}
          flag={getCountryFlag(conv.country)}
          onSelect={onSelect}
          onDelete={onDelete}
          isSelected={selectedConv?.id === conv.id}
          showPreview={true}
        />
      ))}
    </div>
  );
});

ConversationList.displayName = 'ConversationList';