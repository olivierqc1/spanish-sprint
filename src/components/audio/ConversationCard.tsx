'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Conversation {
  id: string;
  title: string;
  country?: string;
}

interface ConversationCardProps {
  conversation: Conversation;
  onSelect: (conversation: Conversation) => void;
  isSelected: boolean;
  flag?: string; // ✅ ajout de la prop flag
}

export const ConversationCard: React.FC<ConversationCardProps> = ({
  conversation,
  onSelect,
  isSelected,
  flag,
}) => {
  return (
    <Card
      onClick={() => onSelect(conversation)}
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? 'border-blue-500 border-2' : 'border-gray-200'
      }`}
    >
      <CardContent className="flex items-center space-x-3 p-4">
        {/* ✅ Affichage du drapeau */}
        {flag && (
          <div className="text-2xl" aria-label={`${conversation.country} flag`}>
            {flag}
          </div>
        )}

        {/* ✅ Infos de la conversation */}
        <div className="flex flex-col">
          <h3 className="font-bold text-base text-gray-800">
            {conversation.title}
          </h3>
          {conversation.country && (
            <p className="text-sm text-gray-500">{conversation.country}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationCard;