// src/pages/GrammarPage.tsx
// VERSION NEXT.JS (sans react-router-dom)

import { useRouter } from "next/router";
import { grammarPoints } from "../data/grammar";

export default function GrammarPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const point = grammarPoints.find(p => p.id === id);

  if (!point) {
    return (
      <div className="container mx-auto p-4">
        <p>Grammaire introuvable.</p>
        <button 
          onClick={() => router.push('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retour
        </button>
      </div>
    );
  }

  // Les exercices viennent directement de grammar.ts
  const exercices = point.data?.drills || [];

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => router.back()}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Retour
      </button>

      <h1 className="text-2xl font-bold mb-2">{point.title}</h1>
      <p className="text-gray-600 mb-4">{point.note}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Exercices</h2>

      {exercices && exercices.length > 0 ? (
        exercices.map((ex: any, i: number) => (
          <div key={i} className="p-4 border rounded mb-3 bg-white dark:bg-slate-800">
            <p className="font-semibold">{ex.prompt}</p>

            {ex.options && (
              <ul className="mt-2">
                {ex.options.map((opt: string, idx: number) => (
                  <li key={idx} className="ml-4">• {opt}</li>
                ))}
              </ul>
            )}

            <details className="mt-2">
              <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                Voir la réponse
              </summary>
              <p className="text-sm text-green-600 mt-2">
                ✓ {ex.answer}
              </p>
            </details>
          </div>
        ))
      ) : (
        <p>Aucun exercice pour l'instant.</p>
      )}
    </div>
  );
}