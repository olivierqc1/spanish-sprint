// src/data/audio.ts
export type AudioQA = { q: string; accept: string[] }; // réponses acceptées (variantes)
export type AudioItem = {
  id: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  title: string;
  src: string;   // ex: "/audio/a1_saludos.mp3"
  script: string;
  questions: AudioQA[];
};

export const audios: AudioItem[] = [
  {
    id: "a1_saludos",
    level: "A1",
    title: "Saludos y presentaciones",
    src: "/audio/a1_saludos.mp3",
    script:
      "Hola, me llamo Lucía. Vivo en Valencia y trabajo en una cafetería. ¿Cómo te llamas?",
    questions: [
      { q: "¿Cómo se llama la persona?", accept: ["lucía", "lucia"] },
      { q: "¿Dónde vive?", accept: ["valencia"] },
      { q: "¿Dónde trabaja?", accept: ["en una cafetería", "cafetería"] },
    ],
  },
  {
    id: "a2_rutina",
    level: "A2",
    title: "Rutina y horarios",
    src: "/audio/a2_rutina.mp3",
    script:
      "De lunes a viernes me levanto a las seis y media. Desayuno rápido y voy al trabajo en metro. Por la tarde estudio español una hora.",
    questions: [
      { q: "¿A qué hora se levanta?", accept: ["a las seis y media", "seis y media"] },
      { q: "¿Cómo va al trabajo?", accept: ["en metro", "metro"] },
      { q: "¿Cuánto tiempo estudia por la tarde?", accept: ["una hora", "1 hora"] },
    ],
  },
  {
    id: "b1_viaje",
    level: "B1",
    title: "Viaje corto de fin de semana",
    src: "/audio/b1_viaje.mp3",
    script:
      "El sábado por la mañana salimos temprano hacia Granada. Visitamos la Alhambra y por la noche probamos tapas en el centro. El domingo regresamos en tren.",
    questions: [
      { q: "¿A dónde viajaron?", accept: ["granada"] },
      { q: "¿Qué visitaron?", accept: ["la alhambra", "alhambra"] },
      { q: "¿Cómo regresaron el domingo?", accept: ["en tren", "tren"] },
    ],
  },
];
