import React, { useState, useEffect } from "react";
import { grammarPoints, GrammarPoint } from "@/data/grammar";

type Drill = { prompt: string; answer?: string };
type Lesson = { id: string; title: string; note?: string; drills: Drill[] };

export default function GrammarPage() {
  const [level, setLevel] = useState<"A1" | "A2" | "B1">("A1");
  const [selectedLesson, setSelectedLesson] = useState<GrammarPoint | null>(null);
  const [lessonData, setLessonData] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredLessons = grammarPoints.filter((g) => g.level === level);

  async function loadLesson(lesson: GrammarPoint) {
    setSelectedLesson(lesson);
    setLoading(true);
    try {
      const res = await fetch(lesson.src);
      const data = await res.json();
      setLessonData(data);
    } catch (e) {
      console.error("Erreur de chargement du quiz :", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">📘 Grammaire espagnole</h1>

      {/* Choix du niveau */}
      <div className="flex justify-center space-x-4">
        {(["A1", "A2", "B1"] as const).map((lvl) => (
          <button
            key={lvl}
            onClick={() => {
              setLevel(lvl);
              setSelectedLesson(null);
              setLessonData(null);
            }}
            className={`px-4 py-2 rounded-lg font-medium ${
              level === lvl ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Liste des leçons */}
      {!selectedLesson && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredLessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => loadLesson(lesson)}
              className="border rounded-lg p-3 text-left hover:bg-blue-50"
            >
              <h2 className="font-semibold">{lesson.title}</h2>
              <p className="text-sm text-gray-600">{lesson.note}</p>
            </button>
          ))}
        </div>
      )}

      {/* Contenu d’une leçon */}
      {selectedLesson && (
        <div className="border rounded-xl p-4 bg-white shadow-sm">
          <button
            onClick={() => {
              setSelectedLesson(null);
              setLessonData(null);
            }}
            className="text-blue-600 underline mb-3"
          >
            ← Retour aux leçons
          </button>

          <h2 className="text-xl font-semibold mb-2">
            {selectedLesson.title}
          </h2>

          {loading && <p>Chargement...</p>}

          {lessonData && (
            <>
              <div
                className="bg-gray-50 p-3 rounded mb-4 text-sm whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: lessonData.note || "" }}
              />
              <div className="space-y-2">
                {lessonData.drills.map((d, i) => (
                  <div
                    key={i}
                    className="border rounded-lg p-2 bg-gray-100 text-sm"
                  >
                    {d.prompt}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
