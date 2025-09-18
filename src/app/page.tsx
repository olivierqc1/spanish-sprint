import Reading from "@/components/Reading";
import Flashcards from "@/components/Flashcards";
import { texts } from "@/data/texts";

// On transforme texts (qui a "excerpt") vers le format attendu par <Reading /> (qui veut "text")
const readingItems = texts.map(t => ({
  id: t.id,
  level: t.level,
  title: t.title,
  author: t.author,
  type: t.type,
  text: t.excerpt,     // 🔁 mapping excerpt -> text
  glosses: {},         // optionnel
  prompts: [],         // optionnel
}));

const cards = [
  { id: "c1", front: "casa", back: "maison", level: "A1", tag: "vocabulaire" },
  { id: "c2", front: "¿Cómo te llamas?", back: "Comment t'appelles-tu ?", level: "A1", tag: "phrases" },
];

export default function Page() {
  return (
    <main className="vstack gap-6 p-6">
      {/* Mets initialLevel="A2" pour voir ton poème direct */}
      <Reading items={readingItems} initialLevel="A2" />
      <Flashcards cards={cards} initialLevel="ALL" />
    </main>
  );
}
