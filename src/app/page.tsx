import Reading from "@/components/Reading";
import Flashcards from "@/components/Flashcards";
import Listening from "@/components/Listening";
import { texts } from "@/data/texts";
import { audios } from "@/data/audio";

// Adapter texts -> format attendu par <Reading />
const readingItems = texts.map((t) => ({
  id: t.id,
  level: t.level,   // "A1" | "A2" | ...
  title: t.title,
  author: t.author,
  type: t.type,
  text: t.excerpt,  // excerpt -> text
  glosses: {},
  prompts: [],
}));

// ✅ Cartes de test SANS le champ `level` (il est optionnel dans Flashcards)
const cards = [
  { id: "c1", front: "casa", back: "maison", tag: "vocabulaire" },
  { id: "c2", front: "¿Cómo te llamas?", back: "Comment t'appelles-tu ?", tag: "phrases" },
];

export default function Page() {
  return (
    <main className="vstack gap-6 p
