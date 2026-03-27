"use client";

import { useState, useMemo, useEffect } from "react";
import type { Level, Country } from "./LevelPicker";
import type { ReadingItem } from "@/data/texts/culturalTexts";
import ReadingQuiz from "./ReadingQuiz";

type Props = {
  texts: ReadingItem[];
  level: Level;
  country: Country;
};

export default function Reading({ texts, level, country }: Props) {
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  const [selectedText, setSelectedText] = useState<ReadingItem | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("readingLanguage");
    if (saved === "en" || saved === "fr") setLanguage(saved);
  }, []);

  const handleLanguageChange = (lang: "fr" | "en") => {
    setLanguage(lang);
    localStorage.setItem("readingLanguage", lang);
  };

  const filtered = useMemo(() => {
    let pool = texts;
    if (level !== "ALL") pool = pool.filter(t => t.level === level);
    if (country !== "ALL") pool = pool.filter(t => t.country === country);
    return pool;
  }, [texts, level, country]);

  const textsByLevel = useMemo(() => {
    const grouped: Record<string, ReadingItem[]> = {};
    filtered.forEach(text => {
      if (!grouped[text.level]) grouped[text.level] = [];
      grouped[text.level].push(text);
    });
    return grouped;
  }, [filtered]);

  const textsT = {
    fr: {
      title: "Lecture",
      noTexts: "Aucun texte disponible pour ce niveau/pays.",
      back: "← Retour",
      context: "Contexte",
      vocabulary: "Vocabulaire clé",
      author: "Auteur",
      type: "Type",
      showTranslation: "💡 Afficher le contexte",
      hideTranslation: "💡 Masquer le contexte",
      level: "Niveau",
    },
    en: {
      title: "Reading",
      noTexts: "No texts available for this level/country.",
      back: "← Back",
      context: "Context",
      vocabulary: "Key vocabulary",
      author: "Author",
      type: "Type",
      showTranslation: "💡 Show context",
      hideTranslation: "💡 Hide context",
      level: "Level",
    },
  };

  const t = textsT[language];

  const LangToggle = () => (
    <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
      {(["fr", "en"] as const).map(lang => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
            language === lang ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );

  // Vue détaillée
  if (selectedText) {
    const questions = selectedText.questions ?? [];

    return (
      <div className="card vstack" style={{ gap: "20px" }}>
        {/* Header */}
        <div className="hstack" style={{ justifyContent: "space-between", alignItems: "start" }}>
          <button
            onClick={() => {
              setSelectedText(null);
              setShowTranslation(false);
            }}
            className="muted"
          >
            {t.back}
          </button>
          <LangToggle />
        </div>

        {/* Titre et métadonnées */}
        <div>
          <div className="hstack" style={{ gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
            <span className="badge">{selectedText.level}</span>
            <span className="muted text-sm">{selectedText.country}</span>
            {selectedText.type && (
              <span className="muted text-sm">• {selectedText.type}</span>
            )}
            {selectedText.author && (
              <span className="muted text-sm">• {selectedText.author}</span>
            )}
          </div>
          <h2 className="text-2xl font-bold">{selectedText.title}</h2>
        </div>

        {/* Texte principal */}
        <div
          className="card"
          style={{
            background: "#1e3a5f",
            fontSize: "17px",
            lineHeight: "1.9",
            padding: "20px 24px",
          }}
        >
          {selectedText.excerpt}
        </div>

        {/* Bouton contexte */}
        {selectedText.context && (
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition text-left"
          >
            {showTranslation ? t.hideTranslation : t.showTranslation}
          </button>
        )}

        {/* Contexte */}
        {showTranslation && selectedText.context && (
          <div
            className="card"
            style={{ background: "#1e2d45", borderLeft: "4px solid #60a5fa" }}
          >
            <strong className="text-blue-300">{t.context} :</strong>
            <p className="muted" style={{ marginTop: "8px" }}>
              {selectedText.context}
            </p>
          </div>
        )}

        {/* Vocabulaire */}
        {selectedText.vocab && selectedText.vocab.length > 0 && (
          <div className="card" style={{ background: "#1a2e1a" }}>
            <strong className="text-green-300">{t.vocabulary} :</strong>
            <div
              style={{
                marginTop: "12px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "6px",
              }}
            >
              {selectedText.vocab.map((word, i) => (
                <div
                  key={i}
                  style={{
                    background: "#0f1f0f",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    fontSize: "13px",
                    color: "#d1fae5",
                  }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz interactif */}
        {questions.length > 0 && (
          <ReadingQuiz
            questions={questions}
            excerpt={selectedText.excerpt}
            title={selectedText.title}
            language={language}
          />
        )}
      </div>
    );
  }

  // Vue liste
  return (
    <div className="card vstack" style={{ gap: "20px" }}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <strong className="text-xl">{t.title}</strong>
        <LangToggle />
      </div>

      {filtered.length === 0 ? (
        <p className="muted">{t.noTexts}</p>
      ) : (
        <div className="vstack" style={{ gap: "24px" }}>
          {Object.entries(textsByLevel)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([lvl, items]) => (
              <div key={lvl}>
                <h3 className="text-lg font-bold mb-3 text-blue-300">
                  {t.level} {lvl}
                </h3>
                <div className="vstack" style={{ gap: "10px" }}>
                  {items.map(text => (
                    <div
                      key={text.id}
                      className="card hover:bg-gray-750 transition cursor-pointer"
                      onClick={() => setSelectedText(text)}
                      style={{ padding: "16px" }}
                    >
                      <div
                        className="hstack"
                        style={{ justifyContent: "space-between", alignItems: "start" }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            className="hstack"
                            style={{ gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}
                          >
                            <strong className="text-base">{text.title}</strong>
                            {text.author && (
                              <span className="muted text-sm">— {text.author}</span>
                            )}
                          </div>
                          <p
                            className="muted text-sm"
                            style={{
                              marginTop: "4px",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {text.excerpt.substring(0, 120)}…
                          </p>
                          {text.questions && text.questions.length > 0 && (
                            <span
                              style={{
                                display: "inline-block",
                                marginTop: "8px",
                                fontSize: "12px",
                                color: "#60a5fa",
                              }}
                            >
                              🧠 {text.questions.length} question{text.questions.length > 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                        <span className="badge" style={{ marginLeft: "12px", flexShrink: 0 }}>
                          {text.country}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
