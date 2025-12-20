// src/data/readingTexts/types.ts

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type Country = 'spain' | 'mexico' | 'argentina' | 'colombia' | 'peru' | 'chile' | 'cuba' | 'venezuela';
export type TextType = 'story' | 'article' | 'dialogue' | 'poem' | 'news' | 'literature';

export type ReadingText = {
  id: string;
  title: string;
  level: Level;
  country: Country;
  author?: string;
  type: TextType;
  excerpt: string;
  context: {
    fr: string;
    en: string;
  };
  vocab?: string[];
  questions?: {
    fr: string[];
    en: string[];
  };
};