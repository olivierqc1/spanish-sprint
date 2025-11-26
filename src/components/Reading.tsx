"use client";

import { useState, useMemo, useEffect } from "react";
import type { Level, Country } from "./LevelPicker";
import type { ReadingItem } from "@/data/texts/culturalTexts";

type Props = {
  texts: ReadingItem[];
  level: Level;
  country: Country;
};

export default function Reading({ texts, level, country }: Props) {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [selectedText, setSelectedText] = useState<ReadingItem | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);

  // Charger la langue depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('readingLanguage');
    if (saved === 'en' || saved === 'fr') {
      setLanguage(saved);
    }
  }, []);

  // Sauvegarder la langue dans localStorage
  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('readingLanguage', lang);
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
      vocabulary: "Vocabulaire",
      questions: "Questions",
      author: "Auteur",
      type: "Type",
      showTranslation: "Afficher le contexte",
      hideTranslation: "Masquer le contexte"
    },
    en: {
      title: "Reading",
      noTexts: "No texts available for this level/country.",
      back: "← Back",
      context: "Context",
      vocabulary: "Vocabulary",
      questions: "Questions",
      author: "Author",
      type: "Type",
      showTranslation: "Show context",
      hideTranslation: "Hide context"
    }
  };

  const t = textsT[language];

  // Vue détaillée d'un texte
  if (selectedText) {
    return (
      <div className="card vstack" style={{ gap: "20px" }}>
        {/* Header */}
        <div className="hstack" style={{ justifyContent: "space-between", alignItems: "start" }}>
          <button onClick={() => setSelectedText(null)} className="muted">
            {t.back}
          </button>
          <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
            <button
              onClick={() => handleLanguageChange('fr')}
              className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                language === 'fr' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
                language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Titre et métadonnées */}
        <div>
          <div className="hstack" style={{ gap: "12px", marginBottom: "8px" }}>
            <span className="badge">{selectedText.level}</span>
            <span className="muted text-sm">{selectedText.country}</span>
            {selectedText.author && (
              <span className="muted text-sm">• {t.author}: {selectedText.author}</span>
            )}
            {selectedText.type && (
              <span className="muted text-sm">• {t.type}: {selectedText.type}</span>
            )}
          </div>
          <h2 className="text-2xl font-bold">{selectedText.title}</h2>
        </div>

        {/* Texte principal */}
        <div className="card" style={{ background: "#1e3a5f", fontSize: "18px", lineHeight: "1.8", padding: "24px" }}>
          {selectedText.excerpt}
        </div>

        {/* Bouton contexte */}
        {selectedText.context && (
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
          >
            {showTranslation ? t.hideTranslation : t.showTranslation}
          </button>
        )}

        {/* Contexte */}
        {showTranslation && selectedText.context && (
          <div className="card" style={{ background: "#2d3748", borderLeft: "4px solid #60a5fa" }}>
            <strong className="text-blue-300">{t.context}:</strong>
            <p className="muted" style={{ marginTop: "8px" }}>{selectedText.context}</p>
          </div>
        )}

        {/* Vocabulaire */}
        {selectedText.vocab && selectedText.vocab.length > 0 && (
          <div className="card" style={{ background: "#2d3748" }}>
            <strong className="text-green-300">{t.vocabulary}:</strong>
            <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
              {selectedText.vocab.map((word, i) => (
                <li key={i} className="text-gray-300" style={{ marginBottom: "4px" }}>{word}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Questions */}
        {selectedText.questions && selectedText.questions.length > 0 && (
          <div className="card" style={{ background: "#2d3748" }}>
            <strong className="text-yellow-300">{t.questions}:</strong>
            <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
              {selectedText.questions.map((q, i) => (
                <li key={i} className="text-gray-300" style={{ marginBottom: "4px" }}>{q}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // Vue liste
  return (
    <div className="card vstack" style={{ gap: "20px" }}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <strong className="text-xl">{t.title}</strong>
        
        {/* Sélecteur de langue */}
        <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
          <button
            onClick={() => handleLanguageChange('fr')}
            className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
              language === 'fr' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            FR
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
              language === 'en' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="muted">{t.noTexts}</p>
      ) : (
        <div className="vstack" style={{ gap: "24px" }}>
          {Object.entries(textsByLevel).map(([lvl, items]) => (
            <div key={lvl}>
              <h3 className="text-lg font-bold mb-3 text-blue-300">{language === 'fr' ? 'Niveau' : 'Level'} {lvl}</h3>
              <div className="vstack" style={{ gap: "12px" }}>
                {items.map(text => (
                  <div
                    key={text.id}
                    className="card hover:bg-gray-750 transition cursor-pointer"
                    onClick={() => setSelectedText(text)}
                    style={{ padding: "16px" }}
                  >
                    <div className="hstack" style={{ justifyContent: "space-between", alignItems: "start" }}>
                      <div style={{ flex: 1 }}>
                        <div className="hstack" style={{ gap: "8px", marginBottom: "4px" }}>
                          <strong className="text-lg">{text.title}</strong>
                          {text.author && (
                            <span className="muted text-sm">— {text.author}</span>
                          )}
                        </div>
                        <p className="muted text-sm line-clamp-2" style={{ marginTop: "4px" }}>
                          {text.excerpt.substring(0, 150)}...
                        </p>
                        {text.context && (
                          <p className="text-xs text-gray-500" style={{ marginTop: "8px" }}>
                            {text.context}
                          </p>
                        )}
                      </div>
                      <span className="badge">{text.country}</span>
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