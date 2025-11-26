"use client";
import { useState, useMemo, useEffect } from "react";
import type { Country, Level } from "./LevelPicker";

type ConversationData = {
  id: string;
  level: Level;
  country?: Country;
  topic: string;
  context: string;
  conversation: Array<{
    speaker: "A" | "B";
    spanish: string;
    french: string;
  }>;
};

type Props = {
  conversations: ConversationData[];
  level: Level;
  country: Country;
};

export default function ConversationPractice({ conversations, level, country }: Props) {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [selectedConv, setSelectedConv] = useState<ConversationData | null>(null);
  const [showTranslations, setShowTranslations] = useState(false);

  // Charger la langue depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('conversationLanguage');
    if (saved === 'en' || saved === 'fr') {
      setLanguage(saved);
    }
  }, []);

  // Sauvegarder la langue dans localStorage
  const handleLanguageChange = (lang: 'fr' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('conversationLanguage', lang);
  };

  const filtered = useMemo(() => {
    let pool = conversations;
    if (level !== "ALL") pool = pool.filter(c => c.level === level);
    if (country !== "ALL") pool = pool.filter(c => !c.country || c.country === country);
    return pool;
  }, [conversations, level, country]);

  const texts = {
    fr: {
      title: "Pratique des conversations",
      noConversations: "Aucune conversation disponible pour ce niveau/pays.",
      context: "Contexte",
      showTranslations: "Afficher les traductions",
      hideTranslations: "Masquer les traductions",
      back: "← Retour",
      start: "Pratiquer"
    },
    en: {
      title: "Conversation Practice",
      noConversations: "No conversations available for this level/country.",
      context: "Context",
      showTranslations: "Show translations",
      hideTranslations: "Hide translations",
      back: "← Back",
      start: "Practice"
    }
  };

  const t = texts[language];

  if (selectedConv) {
    return (
      <div className="card vstack" style={{ gap: "16px" }}>
        <div className="hstack" style={{ justifyContent: "space-between" }}>
          <button onClick={() => setSelectedConv(null)} className="muted">
            {t.back}
          </button>
          <button onClick={() => setShowTranslations(!showTranslations)}>
            {showTranslations ? t.hideTranslations : t.showTranslations}
          </button>
        </div>

        <div>
          <strong className="text-xl">{selectedConv.topic}</strong>
          <p className="muted" style={{ marginTop: "8px" }}>
            {t.context}: {selectedConv.context}
          </p>
        </div>

        <div className="vstack" style={{ gap: "12px" }}>
          {selectedConv.conversation.map((line, i) => (
            <div
              key={i}
              className="card"
              style={{
                background: line.speaker === "A" ? "#1e3a5f" : "#0f1720",
                borderLeft: `4px solid ${line.speaker === "A" ? "#60a5fa" : "#34d399"}`
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
                {line.speaker === "A" ? "👤 Personne A" : "👥 Personne B"}
              </div>
              <div style={{ fontSize: "18px", marginBottom: showTranslations ? "8px" : "0" }}>
                {line.spanish}
              </div>
              {showTranslations && (
                <div className="muted" style={{ fontSize: "14px" }}>
                  {line.french}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card vstack" style={{ gap: "16px" }}>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <strong className="text-xl">{t.title}</strong>
        
        {/* Sélecteur de langue */}
        <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
          <button
            onClick={() => handleLanguageChange('fr')}
            className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
              language === 'fr' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            FR
          </button>
          <button
            onClick={() => handleLanguageChange('en')}
            className={`px-3 py-1 rounded-md text-sm font-semibold transition ${
              language === 'en' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="muted">{t.noConversations}</p>
      ) : (
        <div className="vstack" style={{ gap: "12px" }}>
          {filtered.map(conv => (
            <div
              key={conv.id}
              className="card hstack"
              style={{ justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              onClick={() => setSelectedConv(conv)}
            >
              <div>
                <strong>{conv.topic}</strong>
                <div className="muted" style={{ fontSize: "14px", marginTop: "4px" }}>
                  {conv.context}
                </div>
              </div>
              <div className="hstack" style={{ gap: "8px" }}>
                <span className="badge">{conv.level}</span>
                <button onClick={(e) => { e.stopPropagation(); setSelectedConv(conv); }}>
                  {t.start}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}