// src/data/grammar.ts

export type Drill = { id: string; prompt: string; answer?: string };

// On rend les champs title/drills optionnels pour accepter tes objets existants
export type GrammarPoint = {
  id: string;
  title?: string;
  level?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  drills?: Drill[];
};

// ⬇️ Laisse tes objets existants ici.
// Exemple minimal (tu peux conserver tout ce que tu avais déjà) :
export const grammarPoints: GrammarPoint[] = [
  {
    id: "presente_basico",
    level: "A1",
    title: "Présent basique (-AR/-ER/-IR)",
    drills: [
      { id: "d1", prompt: "Conjugue ‘hablar’ (yo)", answer: "hablo" },
      { id: "d2", prompt: "Conjugue ‘comer’ (nosotros)", answer: "comemos" },
    ],
  },
  // …tes autres points déjà saisis…
];
