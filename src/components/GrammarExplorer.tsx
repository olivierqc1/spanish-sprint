"use client";
import React, { useMemo, useState, useEffect } from "react";
import GrammarDrill from "./GrammarDrill";

// Définir le type localement
type GrammarPoint = {
  id: string;
  title: { fr: string; en: string } | string;
  level: string;
  note?: { fr: string; en: string } | string;
  country?: string;
  jsonPath?: string;
  data?: {
    note?: { fr: string; en: string } | string;
    drills: Array<{
      prompt: string;
      answer: string;
    }>;
  };
};

type Props = {
  points?: GrammarPoint[];
  initialLevel?: GrammarPoint["level"];
  language?: 'fr' | 'en';
};

export default function GrammarExplorer({ points = [], initialLevel = "A1", language: propLanguage = 'fr' }: Props) {
  const [level, setLevel] = useState<GrammarPoint["level"]>(initialLevel);
  const [activeExercise, setActiveExercise] = useState<GrammarPoint | null>(null);
  
  // Utiliser directement la prop au lieu d'un state local
  const language = propLanguage;

  // Sauvegarder la langue dans localStorage
  const handleLanguageChange = (lang: 'fr' | 'en') => {
    // Cette fonction n'est plus utilisée - le toggle est dans la page parent
  };

  // Helper pour obtenir le texte dans la bonne langue
  const getText = (value: any): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value[language]) return value[language];
    return value.fr || value.en || '';
  };

  const pool = useMemo(
    () => points.filter(p => (level ? p.level === level : true)),
    [points, level]
  );

  const texts = {
    fr: {
      title: "Grammaire",
      noExercises: "Aucun point de grammaire pour ce niveau.",
      exercises: "exercices",
      start: "Commencer"
    },
    en: {
      title: "Grammar",
      noExercises: "No grammar points for this level.",
      exercises: "exercises",
      start: "Start"
    }
  };

  const t = texts[language];

  // Si un exercice est actif, afficher SEULEMENT le modal
  if (activeExercise && activeExercise.data?.drills) {
    return (
      <GrammarDrill
        title={activeExercise.title}
        note={activeExercise.data.note || activeExercise.note}
        drills={activeExercise.data.drills}
        onClose={() => setActiveExercise(null)}
        language={language}
      />
    );
  }

  // Sinon afficher la liste
  return (
    <div className="card vstack gap-3 p-4 rounded-2xl shadow">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <strong className="text-xl">{t.title}</strong>
        
        <div className="flex items-center gap-3">
          {/* Sélecteur de niveau */}
          <select 
            value={level ?? "A1"} 
            onChange={(e) => setLevel(e.target.value as GrammarPoint["level"])}
            className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
          >
            <option>A1</option>
            <option>A2</option>
            <option>B1</option>
          </select>
        </div>
      </div>

      {pool.length === 0 ? (
        <div className="text-sm text-gray-500">{t.noExercises}</div>
      ) : (
        <div className="vstack gap-2">
          {pool.map(point => (
            <div key={point.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <strong className="text-base block mb-1">{getText(point.title)}</strong>
                  {point.note && (
                    <div className="text-gray-400 text-sm line-clamp-2">
                      {getText(point.note).substring(0, 100)}...
                    </div>
                  )}
                  {point.data?.drills && (
                    <div className="text-gray-500 text-xs mt-2">
                      {point.data.drills.length} {t.exercises}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                    {point.level}
                  </span>
                  {point.data?.drills && point.data.drills.length > 0 && (
                    <button
                      onClick={() => setActiveExercise(point)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      {t.start}
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