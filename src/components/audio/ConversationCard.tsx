// src/components/audio/ConversationCard.tsx
import { Conversation } from '@/types/audio';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface ConversationCardProps {
  conversation: Conversation;
  onSelect?: (conversation: Conversation) => void;
  isSelected?: boolean;
  flag?: string;
}

export function ConversationCard({
  conversation,
  onSelect,
  isSelected = false,
  flag = '🌍',
}: ConversationCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:border-blue-500 ${
        isSelected ? 'border-blue-500 border-2' : ''
      }`}
      onClick={() => onSelect?.(conversation)}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-3xl">{flag}</span>
        <Badge variant="primary">{conversation.level}</Badge>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 text-slate-100">
        {conversation.title}
      </h3>
      
      <p className="text-sm text-slate-400">
        {conversation.country} • {conversation.lines.length} répliques
      </p>
    </Card>
  );
}
