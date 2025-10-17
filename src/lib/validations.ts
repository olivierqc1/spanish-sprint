// src/lib/validations.ts
import { z } from 'zod';

export const conversationLineSchema = z.object({
  text: z.string().min(1, 'Le texte est requis').max(500, 'Texte trop long'),
  speaker: z.string().min(1, 'Le nom du speaker est requis').max(50),
  gender: z.enum(['homme', 'femme'], {
    errorMap: () => ({ message: 'Genre invalide' })
  }),
});

export const conversationSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Le titre doit faire au moins 3 caractères').max(100),
  country: z.string().min(1, 'Le pays est requis'),
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  lines: z.array(conversationLineSchema).min(1, 'Au moins une réplique requise').max(20, 'Maximum 20 répliques'),
});

export const apiKeySchema = z.string()
  .min(30, 'Clé API trop courte')
  .regex(/^AIza/, 'La clé doit commencer par "AIza"');

export type ConversationInput = z.infer<typeof conversationSchema>;
export type ConversationLineInput = z.infer<typeof conversationLineSchema>;
