// src/app/page.tsx
import Reading from "@/components/Reading";
import Flashcards, { type Card } from "@/components/Flashcards";
import Listening from "@/components/Listening";
import { texts } from "@/data/texts";
import { audios } from "@/data/audio";

// Adapter texts -> format attendu par <Reading />
const readingItems = texts.map((t) => ({
  id: t.id,
  level: t.level,
  title: t.title,
  author: t.author,
  type: t.type,
  text: t.excerpt,
  glosses: {},
  prompts: [],
}));

// ✅ Cartes typées avec niveaux
const cards: Card[] = [
  { id: "c1", front: "casa", back: "maison", level: "A1", tag: "vocabulaire" },
  { id: "c2", front: "¿Cómo te llamas?", back: "Comment t'appelles-tu ?", level: "A1", tag: "phrases" },
  { id: "c3", front: "ayer", back: "hier", level: "A2", tag: "connecteurs" },
  { id: "c4", front: "fue", back: "il/elle a été / il/elle alla", level: "A2", tag: "indefinido" },
  { id: "c5", front: "íbamos", back: "nous allions", level: "B1", tag: "imperfecto" },
];

export default function Page() {
  return (
    <main className="vstack gap-6 p-6">
      <Listening items={audios} initialLevel="A2" />
      <Reading items={readingItems} initialLevel="A2" />
      {/* initialLevel="ALL" pour voir toutes les cartes */}
      <Flashcards cards={cards} initialLevel="ALL" />
    </main>
  );
}
