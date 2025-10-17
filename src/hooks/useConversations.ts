// src/hooks/useConversations.ts
import { Conversation } from '@/types/audio';
import { useLocalStorage } from './useLocalStorage';

const DEMO_CONVERSATIONS: Conversation[] = [
  {
    id: "demo_es_cafe",
    title: "Au café (Demo)",
    country: "Espagne",
    level: "A1",
    lines: [
      { text: "Hola, ¿cómo estás?", speaker: "Carlos", gender: "homme" },
      { text: "Muy bien, gracias.", speaker: "María", gender: "femme" },
    ]
  }
];

export function useConversations() {
  const [conversations, setConversations] = useLocalStorage<Conversation[]>(
    'spanish-sprint-conversations',
    DEMO_CONVERSATIONS
  );

  const addConversation = (conversation: Conversation) => {
    setConversations((prev) => [...prev, conversation]);
  };

  const removeConversation = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
  };

  const updateConversation = (id: string, updates: Partial<Conversation>) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  return {
    conversations,
    addConversation,
    removeConversation,
    updateConversation,
  };
}
