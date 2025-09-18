import Reading from "@/components/Reading";
import Flashcards from "@/components/Flashcards";

// Données de test minimales pour valider le build.
// Tu pourras remplacer par tes vraies données ensuite.
const readings = [
  {
    id: "r1",
    level: "A1" as const,
    title: "En el parque",
    author: "Anónimo",
    type: "dialogue",
    text:
      "Lucía y Marcos caminan en el parque. Hablan sobre sus planes para el fin de semana.",
    glosses: {
      caminan: "marchent",
      parque: "parc",
      planes: "plans",
      fin: "fin",
      semana: "semaine",
    },
    prompts: [
      "¿Dónde caminan Lucía y Marcos?",
      "¿De qué hablan?",
      "¿Qué planes tienes tú para el fin de semana?",
    ],
  },
];

const cards = [
  { id: "c1", front: "casa", back: "maison", level: "A1" as const, tag: "vocabulaire" },
  {
    id: "c2",
    front: "¿Cómo te llamas?",
    back: "Comment t'appelles-tu ?",
    level: "A1" as const,
    tag: "phrases",
  },
];

export default function Page() {
  return (
    <main className="vstack gap-6 p-6">
      <Reading items={readings} initialLevel="A1" />
      <Flashcards cards={cards} initialLevel="ALL" />
    </main>
  );
}
