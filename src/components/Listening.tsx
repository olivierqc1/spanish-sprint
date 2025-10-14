"use client";

import { useState } from "react";

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
type Country = "ALL" | "spain" | "mexico" | "argentina";

interface AudioItem {
  id: number;
  title: string;
  audioUrl: string;
  transcript: string;
  level: Level;
  country: Country;
}

interface ListeningProps {
  items: AudioItem[];
  level: Level;
  country: Country;
}

export default function Listening({ items, level, country }: ListeningProps) {
  const [showTranscript, setShowTranscript] = useState<number | null>(null);

  const filteredItems = items.filter((item) => {
    const levelMatch = item.level === level;
    const countryMatch = country === "ALL" || item.country === country;
    return levelMatch && countryMatch;
  });

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Exercices d'écoute</h2>
      {filteredItems.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          Aucun exercice disponible pour ce niveau et ce pays.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>{item.title}</h3>
              <div style={{ marginBottom: "10px" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    backgroundColor: "#007bff",
                    color: "white",
                    borderRadius: "4px",
                    fontSize: "12px",
                    marginRight: "8px",
                  }}
                >
                  {item.level}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    backgroundColor: "#28a745",
                    color: "white",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  {item.country === "spain"
                    ? "🇪🇸 Espagne"
                    : item.country === "mexico"
                    ? "🇲🇽 Mexique"
                    : item.country === "argentina"
                    ? "🇦🇷 Argentine"
                    : "🌍 Tous"}
                </span>
              </div>
              <audio
                controls
                style={{ width: "100%", marginBottom: "10px" }}
                src={item.audioUrl}
              >
                Votre navigateur ne supporte pas l'élément audio.
              </audio>
              <button
                onClick={() =>
                  setShowTranscript(
                    showTranscript === item.id ? null : item.id
                  )
                }
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {showTranscript === item.id
                  ? "Masquer la transcription"
                  : "Voir la transcription"}
              </button>
              {showTranscript === item.id && (
                <div
                  style={{
                    marginTop: "15px",
                    padding: "15px",
                    backgroundColor: "#fff",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                >
                  <p style={{ margin: 0 }}>{item.transcript}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
          }
