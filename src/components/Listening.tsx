"use client";

import { useState, useRef } from "react";
import type { Level, Country } from "@/components/LevelPicker";

interface AudioItem {
  id: number;
  title: string;
  audioUrl: string;      // conservé pour compat, plus utilisé (lecture par TTS)
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
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  const [slow, setSlow] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const filteredItems = items.filter((item) => {
    const levelMatch = level === "ALL" || item.level === level;
    const countryMatch = country === "ALL" || item.country === country;
    return levelMatch && countryMatch;
  });

  const speak = (item: AudioItem) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (speakingId === item.id) { setSpeakingId(null); return; }
    const u = new SpeechSynthesisUtterance(item.transcript);
    u.lang = "es-ES";
    u.rate = slow ? 0.7 : 0.95;
    u.onend = () => setSpeakingId(null);
    utterRef.current = u;
    setSpeakingId(item.id);
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-black text-white mb-1">🎧 Exercices d'écoute</h2>
      <p className="text-sm text-slate-400 mb-4">
        Écoute la phrase en espagnol (voix du navigateur), puis vérifie avec la transcription.
      </p>

      {filteredItems.length === 0 ? (
        <p className="text-slate-400">Aucun exercice pour ce niveau / pays.</p>
      ) : (
        filteredItems.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>

            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => speak(item)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl font-bold transition"
              >
                {speakingId === item.id ? "⏸ Arrêter" : "▶️ Écouter"}
              </button>
              <button
                onClick={() => setSlow(!slow)}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold transition border ${
                  slow ? "bg-blue-600/20 border-blue-600 text-blue-300" : "bg-slate-800 border-slate-700 text-slate-300"
                }`}
              >
                🐢 Lent
              </button>
            </div>

            <button
              onClick={() => setShowTranscript(showTranscript === item.id ? null : item.id)}
              className="text-sm text-blue-400 hover:text-blue-300 transition"
            >
              {showTranscript === item.id ? "Masquer la transcription" : "Voir la transcription"}
            </button>

            {showTranscript === item.id && (
              <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed">
                {item.transcript}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
