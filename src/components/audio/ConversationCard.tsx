'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card'; // Utilisez Card avec une majuscule

interface ConversationCardProps {
  children: React.ReactNode;
  className?: string;
  isSelected?: boolean;
  conversation: any; // Ajustez selon votre modèle de données
  onSelect?: (conversation: any) => void;
}

export const ConversationCard: React.FC<ConversationCardProps> = ({
  children,
  className = '',
  isSelected = false,
  conversation,
  onSelect
}) => {
  return (
    <Card
      onClick={() => onSelect?.(conversation)}
      className={`${className} ${
        isSelected ? 'border-blue-500 border-2' : ''
      }`}
    >
      {children}
    </Card>
  );
};

export default ConversationCard;