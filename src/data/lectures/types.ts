// src/data/lectures/types.ts
export type Lectura = {
  id: string;
  title: string;
  level: string;
  theme: string;
  paragraphs: string[];
  glossary: Record<string, string>;
  summaryPrompt: string;
};
