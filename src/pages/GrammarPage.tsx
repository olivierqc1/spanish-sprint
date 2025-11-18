import { useParams } from "react-router-dom";
import { grammarPoints } from "../data/grammar";

export default function GrammarPage() {
  const { id } = useParams();
  const point = grammarPoints.find(p => p.id === id);

  if (!point) {
    return <div>Grammaire introuvable.</div>;
  }

  // NO MORE FETCH — now exercises come directly from grammar.ts
  const exercices = point.data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{point.title}</h1>
      <p className="text-gray-600 mb-4">{point.note}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Exercices</h2>

      {exercices && exercices.length > 0 ? (
        exercices.map((ex, i) => (
          <div key={i} className="p-4 border rounded mb-3">
            <p className="font-semibold">{ex.question}</p>

            {ex.options && (
              <ul className="mt-2">
                {ex.options.map((opt: string, idx: number) => (
                  <li key={idx}>• {opt}</li>
                ))}
              </ul>
            )}

            {ex.answer && (
              <p className="text-sm text-green-600 mt-2">
                Réponse : {ex.answer}
              </p>
            )}
          </div>
        ))
      ) : (
        <p>Aucun exercice pour l'instant.</p>
      )}
    </div>
  );
}