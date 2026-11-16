// src/data/input/types.ts
// Input compréhensible : une histoire en épisodes, du plus facile au plus dur.
export type InputLang = 'catalan' | 'spanish';
export type InputLevel = 'A1' | 'A2' | 'B1';

export type InputQuestion = {
  q: string; // question dans la langue cible
  qFr: string; // traduction française
  options: string[];
  answer: number; // index de la bonne option
};

export type InputEpisode = {
  id: string;
  level: InputLevel;
  title: string;
  titleFr: string;
  // [phrase dans la langue cible, traduction française]
  sentences: [string, string][];
  // mots clés tels qu'ils apparaissent dans le texte → traduction (accents et majuscules ignorés)
  words: Record<string, string>;
  questions: InputQuestion[];
};

export type InputSeries = {
  lang: InputLang;
  title: string;
  intro: string; // présentation en français
  episodes: InputEpisode[];
};
