// src/data/texts.ts

export type ReadingItem = {
  id: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  type: string;      // ex: conte, poème, dialogue
  title?: string;
  author?: string;
  excerpt: string;
};

export const texts: ReadingItem[] = [
  {
    id: "t1",
    level: "A1",
    type: "dialogue",
    title: "En el parque",
    author: "Anónimo",
    excerpt: "Lucía y Marcos caminan en el parque. Hablan sobre sus planes para el fin de semana.",
  },
  {
    id: "t2",
    level: "A1",
    type: "conte",
    title: "El león y el ratón",
    author: "Fábula clásica",
    excerpt: "Un ratón pequeño ayudó a un león enorme, demostrando que hasta los más pequeños pueden ser útiles.",
  },
  {
    id: "t3",
    level: "A2",
    type: "poème",
    title: "Rima XXI",
    author: "Gustavo Adolfo Bécquer",
    excerpt: `¿Qué es poesía? —dices mientras clavas
en mi pupila tu pupila azul—
¿Qué es poesía? ¿Y tú me lo preguntas?
Poesía... eres tú.`,
  },
  {
    id: "t4",
    level: "A2",
    type: "article",
    title: "La vida en una ciudad pequeña",
    author: "Revista juvenil",
    excerpt: "La vida en los pueblos pequeños es tranquila, la gente se conoce y todo está cerca.",
  },
  {
    id: "t5",
    level: "B1",
    type: "noticia",
    title: "Nuevas tecnologías en la educación",
    author: "El País",
    excerpt: "Cada vez más escuelas integran tabletas y plataformas digitales para facilitar el aprendizaje.",
  },
];
