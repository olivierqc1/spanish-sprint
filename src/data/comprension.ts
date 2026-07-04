// src/data/comprension.ts
// Registre des textes de compréhension orale.
// Pour AJOUTER un texte : crée src/data/comprension/<id>.json puis ajoute une ligne ici.

export type ComprensionMeta = { id: string; title: string; level: string };

export const comprensionTexts: ComprensionMeta[] = [
  { id: "priorat", title: "Un fin de semana en el Priorat", level: "B2" },
  { id: "empadronamiento", title: "El empadronamiento", level: "B2" },
  { id: "carrera_montana", title: "Una carrera de montaña", level: "B2" },
{ id: "buscar_piso", title: "Buscar piso en Barcelona", level: "B2" },
  { id: "la_boqueria", title: "El mercado de La Boquería", level: "B2" },
  { id: "entrevista_trabajo", title: "Una entrevista de trabajo", level: "B2" },
{ id: "cat_origen", title: "D'on ve el català", level: "A2" },
  { id: "cat_pompeu_fabra", title: "Pompeu Fabra i el català modern", level: "B1" },
  { id: "cat_territoris", title: "El català a diferents territoris", level: "A2" },
];
