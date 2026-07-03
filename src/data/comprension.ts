// src/data/comprension.ts
// Registre des textes de compréhension orale.
// Pour AJOUTER un texte : crée src/data/comprension/<id>.json puis ajoute une ligne ici.

export type ComprensionMeta = { id: string; title: string; level: string };

export const comprensionTexts: ComprensionMeta[] = [
  { id: "priorat", title: "Un fin de semana en el Priorat", level: "B2" },
  { id: "empadronamiento", title: "El empadronamiento", level: "B2" },
  { id: "carrera_montana", title: "Una carrera de montaña", level: "B2" },
];
