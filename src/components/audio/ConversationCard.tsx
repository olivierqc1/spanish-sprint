// src/components/audio/ConversationCard.tsx
'use client';

import React from 'react';
import { Conversation } from '@/types/audio';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface ConversationCardProps {
  conversation: Conversation;
  onSelect: (conversation: Conversation) => void;
  onDelete?: (id: string) => void;
  isSelected: boolean;
  flag?: string;
  showPreview?: boolean;
}

export const ConversationCard: React.FC<ConversationCardProps> = React.memo(({
  conversation,
  onSelect,
  onDelete,
  isSelected,
  flag,
  showPreview = false,
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher la sélection lors du delete
    if (onDelete && confirm(`Supprimer "${conversation.title}" ?`)) {
      onDelete(conversation.id);
    }
  };

  return (
    <Card
      onClick={() => onSelect(conversation)}
      className={`
        cursor-pointer transition-all duration-200 
        hover:shadow-md hover:scale-[1.02]
        ${isSelected 
          ? 'border-blue-500 border-2 bg-blue-950/30' 
          : 'border-slate-700 hover:border-blue-400'
        }
      `}
      role="button"
      tabIndex={0}
      aria-label={`Sélectionner la conversation ${conversation.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(conversation);
        }
      }}
    >
      <div className="space-y-3">
        {/* En-tête */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Drapeau */}
            {flag && (
              <div 
                className="text-3xl flex-shrink-0" 
                role="img" 
                aria-label={`Drapeau ${conversation.country}`}
              >
                {flag}
              </div>
            )}

            {/* Infos principales */}
            <div className="flex flex-col">
              <h3 className="font-bold text-lg text-slate-100 line-clamp-2">
                {conversation.title}
              </h3>
              {conversation.country && (
                <p className="text-sm text-slate-400">
                  {conversation.country}
                </p>
              )}
            </div>
          </div>

          {/* Bouton supprimer */}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-red-900/30 rounded-lg transition-colors flex-shrink-0"
              aria-label={`Supprimer ${conversation.title}`}
            >
              <span className="text-red-400">🗑️</span>
            </button>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">
            {conversation.level}
          </Badge>
          <Badge variant="default">
            {conversation.lines.length} réplique{conversation.lines.length > 1 ? 's' : ''}
          </Badge>
          {isSelected && (
            <Badge variant="success">
              ✓ Sélectionné
            </Badge>
          )}
        </div>

        {/* Aperçu (optionnel) */}
        {showPreview && conversation.lines.length > 0 && (
          <div className="pt-3 border-t border-slate-700">
            <p className="text-xs text-slate-500 mb-2">Aperçu :</p>
            <div className="space-y-1">
              {conversation.lines.slice(0, 2).map((line, idx) => (
                <p key={idx} className="text-sm text-slate-300 truncate">
                  <strong className="text-blue-400">{line.speaker}:</strong> {line.text}
                </p>
              ))}
              {conversation.lines.length > 2 && (
                <p className="text-xs text-slate-500 italic">
                  + {conversation.lines.length - 2} autre{conversation.lines.length - 2 > 1 ? 's' : ''}...
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
});

ConversationCard.displayName = 'ConversationCard';

export default ConversationCard;