// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

// src/test/setup.ts
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// src/lib/__tests__/validations.test.ts
import { describe, it, expect } from 'vitest';
import { conversationSchema, conversationLineSchema, apiKeySchema } from '../validations';

describe('Validations', () => {
  describe('conversationLineSchema', () => {
    it('devrait valider une ligne correcte', () => {
      const validLine = {
        text: 'Hola, ¿cómo estás?',
        speaker: 'Carlos',
        gender: 'homme' as const,
      };

      const result = conversationLineSchema.safeParse(validLine);
      expect(result.success).toBe(true);
    });

    it('devrait rejeter un texte vide', () => {
      const invalidLine = {
        text: '',
        speaker: 'Carlos',
        gender: 'homme' as const,
      };

      const result = conversationLineSchema.safeParse(invalidLine);
      expect(result.success).toBe(false);
    });

    it('devrait rejeter un genre invalide', () => {
      const invalidLine = {
        text: 'Hello',
        speaker: 'Carlos',
        gender: 'autre',
      };

      const result = conversationLineSchema.safeParse(invalidLine);
      expect(result.success).toBe(false);
    });
  });

  describe('conversationSchema', () => {
    it('devrait valider une conversation complète', () => {
      const validConv = {
        title: 'Test Conversation',
        country: 'Espagne',
        level: 'A1' as const,
        lines: [
          { text: 'Hola', speaker: 'A', gender: 'homme' as const },
          { text: 'Adiós', speaker: 'B', gender: 'femme' as const },
        ],
      };

      const result = conversationSchema.safeParse(validConv);
      expect(result.success).toBe(true);
    });

    it('devrait rejeter une conversation sans lignes', () => {
      const invalidConv = {
        title: 'Test',
        country: 'Espagne',
        level: 'A1',
        lines: [],
      };

      const result = conversationSchema.safeParse(invalidConv);
      expect(result.success).toBe(false);
    });

    it('devrait rejeter un titre trop court', () => {
      const invalidConv = {
        title: 'AB',
        country: 'Espagne',
        level: 'A1',
        lines: [{ text: 'Hello', speaker: 'A', gender: 'homme' }],
      };

      const result = conversationSchema.safeParse(invalidConv);
      expect(result.success).toBe(false);
    });
  });

  describe('apiKeySchema', () => {
    it('devrait valider une clé API Google valide', () => {
      const validKey = 'AIzaSyABC123DEF456GHI789JKL012MNO345PQR';
      const result = apiKeySchema.safeParse(validKey);
      expect(result.success).toBe(true);
    });

    it('devrait rejeter une clé trop courte', () => {
      const invalidKey = 'AIzaShort';
      const result = apiKeySchema.safeParse(invalidKey);
      expect(result.success).toBe(false);
    });

    it('devrait rejeter une clé sans préfixe AIza', () => {
      const invalidKey = 'InvalidKeyThatIsLongEnoughButWrongPrefix';
      const result = apiKeySchema.safeParse(invalidKey);
      expect(result.success).toBe(false);
    });
  });
});

// src/lib/__tests__/spacedRepetition.test.ts
import { describe, it, expect } from 'vitest';
import { calculateNextReview, shouldReviewToday, daysUntilNextReview } from '../spacedRepetition';
import type { CardReviewState } from '@/store/reviewStore';

describe('Spaced Repetition Algorithm (SM-2)', () => {
  const initialState: CardReviewState = {
    repetitions: 0,
    easeFactor: 2.5,
    interval: 0,
    nextReview: new Date().toISOString(),
    lastReviewed: new Date().toISOString(),
  };

  describe('calculateNextReview', () => {
    it('devrait augmenter les répétitions pour une bonne réponse', () => {
      const result = calculateNextReview(initialState, 4);
      expect(result.repetitions).toBeGreaterThan(0);
    });

    it('devrait réinitialiser pour une mauvaise réponse', () => {
      const state = { ...initialState, repetitions: 3 };
      const result = calculateNextReview(state, 1);
      expect(result.repetitions).toBe(0);
    });

    it('devrait calculer un intervalle croissant', () => {
      let state = initialState;
      
      // Première répétition
      state = calculateNextReview(state, 4);
      expect(state.interval).toBe(1);
      
      // Deuxième répétition
      state = calculateNextReview(state, 4);
      expect(state.interval).toBe(6);
      
      // Troisième répétition
      state = calculateNextReview(state, 4);
      expect(state.interval).toBeGreaterThan(6);
    });

    it('devrait ajuster easeFactor basé sur la qualité', () => {
      const perfectAnswer = calculateNextReview(initialState, 5);
      const goodAnswer = calculateNextReview(initialState, 4);
      const hardAnswer = calculateNextReview(initialState, 3);

      expect(perfectAnswer.easeFactor).toBeGreaterThan(goodAnswer.easeFactor);
      expect(goodAnswer.easeFactor).toBeGreaterThan(hardAnswer.easeFactor);
    });

    it('devrait maintenir easeFactor >= 1.3', () => {
      let state = initialState;
      
      // Plusieurs mauvaises réponses
      for (let i = 0; i < 10; i++) {
        state = calculateNextReview(state, 0);
      }
      
      expect(state.easeFactor).toBeGreaterThanOrEqual(1.3);
    });
  });

  describe('shouldReviewToday', () => {
    it('devrait retourner true pour une nouvelle carte', () => {
      expect(shouldReviewToday(undefined)).toBe(true);
    });

    it('devrait retourner true si nextReview est passé', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      
      const state: CardReviewState = {
        ...initialState,
        nextReview: pastDate.toISOString(),
      };
      
      expect(shouldReviewToday(state)).toBe(true);
    });

    it('devrait retourner false si nextReview est futur', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      
      const state: CardReviewState = {
        ...initialState,
        nextReview: futureDate.toISOString(),
      };
      
      expect(shouldReviewToday(state)).toBe(false);
    });
  });

  describe('daysUntilNextReview', () => {
    it('devrait calculer les jours correctement', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5);
      
      const state: CardReviewState = {
        ...initialState,
        nextReview: futureDate.toISOString(),
      };
      
      const days = daysUntilNextReview(state);
      expect(days).toBe(5);
    });

    it('devrait retourner un nombre négatif pour une carte en retard', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 3);
      
      const state: CardReviewState = {
        ...initialState,
        nextReview: pastDate.toISOString(),
      };
      
      const days = daysUntilNextReview(state);
      expect(days).toBeLessThan(0);
    });
  });
});

// src/hooks/__tests__/useConversations.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useConversations } from '../useConversations';

describe('useConversations Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('devrait initialiser avec les conversations de démo', () => {
    const { result } = renderHook(() => useConversations());
    expect(result.current.conversations.length).toBeGreaterThan(0);
  });

  it('devrait ajouter une conversation', () => {
    const { result } = renderHook(() => useConversations());
    
    const newConv = {
      id: 'test_1',
      title: 'Test',
      country: 'Espagne',
      level: 'A1',
      lines: [{ text: 'Hola', speaker: 'Test', gender: 'homme' as const }],
    };

    act(() => {
      result.current.addConversation(newConv);
    });

    expect(result.current.conversations).toContainEqual(newConv);
  });

  it('devrait supprimer une conversation', () => {
    const { result } = renderHook(() => useConversations());
    
    const initialLength = result.current.conversations.length;
    const idToRemove = result.current.conversations[0].id;

    act(() => {
      result.current.removeConversation(idToRemove);
    });

    expect(result.current.conversations.length).toBe(initialLength - 1);
    expect(result.current.conversations.find(c => c.id === idToRemove)).toBeUndefined();
  });

  it('devrait mettre à jour une conversation', () => {
    const { result } = renderHook(() => useConversations());
    
    const convToUpdate = result.current.conversations[0];
    const newTitle = 'Updated Title';

    act(() => {
      result.current.updateConversation(convToUpdate.id, { title: newTitle });
    });

    const updated = result.current.conversations.find(c => c.id === convToUpdate.id);
    expect(updated?.title).toBe(newTitle);
  });
});

// package.json - Section scripts à ajouter
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
