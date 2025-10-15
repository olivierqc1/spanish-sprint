// Types de niveaux CECRL
export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

// Types de pays
export type Country = "ALL" | "spain" | "mexico" | "argentina";

// Type pour les cartes de vocabulaire
export interface Card {
  id: number;
  front: string;
  back: string;
  level: Level;
  country: Country;
}

// Type pour les exercices d'écoute
export interface AudioItem {
  id: number;
  title: string;
  audioUrl: string;
  transcript: string;
  level: Level;
  country: Country;
}

// Type pour les exercices de lecture
export interface TextItem {
  id: number;
  title: string;
  text: string;
  level: Level;
  country: Country;
}
