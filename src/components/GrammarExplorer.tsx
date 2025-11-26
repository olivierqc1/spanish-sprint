"use client";
import React, { useMemo, useState } from "react";
import type { GrammarPoint } from "@/data/grammar";
import GrammarDrill from "./GrammarDrill";

type Props = {
  points?: GrammarPoint[];
  initialLevel?: GrammarPoint["level"];
};

export default function GrammarExplorer({ points = [], initialLevel = "A1" }: Props) {
  const [level, setLevel] = useState<GrammarPoint["level"]>(initialLevel);
  const [activeExercise, setActiveExercise] = useState<GrammarPoint | null>(null);

  const pool = useMemo(
    () => points.filter(p => (level ? p.level === level : true)),
    [points, level]
  );

  // Si un exercice est actif, afficher SEULEMENT le modal
  if (activeExercise && activeExercise.data?.drills) {
    return (
      <GrammarDrill
        title={activeExercise.title}
        note={activeExercise.data.note || activeExercise.note}
        drills={activeExercise.data.drills}
        onClose={() => setActiveExercise(null)}
      />
    );
  }

  // Sinon afficher la liste
  return (
    <div className="card vstack gap-3 p-4 rounded-2xl shadow">
      <div className="hstack items-center justify-between">
        <strong className="text-xl">Grammaire</strong>
        <select value={level ?? "A1"} onChange={(e) => setLevel(e.target.value as GrammarPoint["level"])}
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2">
          <option>A1</option>
          <option>A2</option>
          <option>B1</option>
        </select>
      </div>

      {pool.length === 0 ? (
        <div className="text-sm text-gray-500">Aucun point de grammaire pour ce niveau.</div>
      ) : (
        <div className="vstack gap-2">
          {pool.map(point => (
            <div key={point.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <strong className="text-base block mb-1">{point.title}</strong>
                  {point.note && (
                    <div className="text-gray-400 text-sm line-clamp-2">
                      {point.note.substring(0, 100)}...
                    </div>
                  )}
                  {point.data?.drills && (
                    <div className="text-gray-500 text-xs mt-2">
                      {point.data.drills.length} exercices
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {point.level}
                  </span>
                  {point.data?.drills && point.data.drills.length > 0 && (
                    <button onClick={() => setActiveExercise(point)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition">
                      Commencer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}