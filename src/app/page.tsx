"use client";

import { useState } from "react";
import type { Level, Country } from "@/components/LevelPicker";
import Listening from "@/components/Listening";
import Reading from "@/components/Reading";
import Flashcards from "@/components/Flashcards";
import Orthographe from "@/components/Orthographe";
import Dictee from "@/components/Dictee";
import Conjugation from "@/components/Conjugation";
import VocabQuiz from "@/components/VocabQuiz";
import SmartReview from "@/components/SmartReview";
import DailyPlan from "@/components/Dailyplan";
import HourCounter from "@/components/HourCounter";
import GrammarExplorer from "@/components/GrammarExplorer";
import Dashboard from "@/components/Dashboard";
import Badges from "@/components/Badges";
import ConversationPractice from "@/components/ConversationPractice";

import { allTexts } from "@/data/texts";
import { audios } from "@/data/audio";
import { cards } from "@/data/cards";
import { exercises } from "@/data/exercices";
import { grammarPoints } from "@/data/grammar";

type ActivityTab = "listening" | "reading" | "conversations" | "flashcards" | 
                   "conjugation" | "grammar" | "vocabQuiz" | "orthographe" | "dictee";

const activityTabs = [
  { id: "listening" as const, label: "Écoute", icon: "🎧" },
  { id: "reading" as const, label: "Lecture", icon: "📖" },
  { id: "conversations" as const, label: "Conversations", icon: "💬" },
  { id: "flashcards" as const, label: "Flashcards", icon: "🎴" },
  { id: "conjugation" as const, label: "Conjugaison", icon: "⚡" },
  { id: "grammar" as const, label: "Grammaire", icon: "📚" },
  { id: "vocabQuiz" as const, label: "Quiz Vocab", icon: "🎯" },
  { id: "orthographe" as const, label: "Orthographe", icon: "✍️" },
  { id: "dictee" as const, label: "Dictée", icon: "🎤" },
];

export default function HomePage() {
  const [level, setLevel] = useState<Level>("A1");
  const [country, setCountry] = useState<Country>("ALL");
  const [activeTab, setActiveTab] = useState<ActivityTab>("listening");
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return (
      <main>
        <div className="hstack" style={{ justifyContent: "space-between", marginBottom: "24px" }}>
          <h1 style={{ margin: 0 }}>📊 Tableau de bord</h1>
          <button onClick={() => setShowDashboard(false)}>
            ← Retour à l'apprentissage
          </button>
        </div>
        <Dashboard />
        <div style={{ marginTop: "24px" }}>
          <Badges />
        </div>
      </main>
    );
  }

  return (
    <main>
      <div style={{ marginBottom: "24px" }}>
        <div className="hstack" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          <h1 style={{ margin: 0 }}>🇪🇸 Spanish Sprint</h1>
          <button 
            onClick={() => setShowDashboard(true)}
            style={{ background: "#1e3a5f", border: "2px solid #60a5fa" }}
          >
            📊 Tableau de bord
          </button>
        </div>
        <p className="muted">
          Apprentissage progressif par niveau • Sélectionne ton niveau et pratique !
        </p>
      </div>

      <div className="card" style={{ marginBottom: "16px" }}>
        <div className="hstack" style={{ gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <label className="muted" style={{ minWidth: "60px" }}>Pays</label>
          <select 
            value={country} 
            onChange={e => setCountry(e.target.value as Country)}
            style={{ minWidth: "200px" }}
          >
            <option value="ALL">🌍 Tous</option>
            <optgroup label="Europe">
              <option value="spain">🇪🇸 Espagne</option>
            </optgroup>
            <optgroup label="Amérique du Nord">
              <option value="mexico">🇲🇽 Mexique</option>
              <option value="cuba">🇨🇺 Cuba</option>
            </optgroup>
            <optgroup label="Amérique du Sud">
              <option value="argentina">🇦🇷 Argentine</option>
              <option value="colombia">🇨🇴 Colombie</option>
              <option value="peru">🇵🇪 Pérou</option>
              <option value="chile">🇨🇱 Chili</option>
              <option value="venezuela">🇻🇪 Venezuela</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div className="card" style={{ padding: "12px", marginBottom: "16px" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", 
          gap: "8px" 
        }}>
          {(["A1", "A2", "B1", "ALL"] as Level[]).map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevel(lvl)}
              style={{
                background: level === lvl ? "#1e3a5f" : "#0f1720",
                border: level === lvl ? "2px solid #60a5fa" : "1px solid #334155",
                padding: "16px 12px",
                fontSize: "18px",
                fontWeight: level === lvl ? "bold" : "normal",
                transition: "all 0.2s"
              }}
            >
              {lvl === "ALL" ? "📚 Tous" : `📖 Niveau ${lvl}`}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ background: "#1e3a5f", marginBottom: "16px" }}>
        <strong>
          {level === "A1" && "📘 Niveau A1 - Débutant"}
          {level === "A2" && "📗 Niveau A2 - Élémentaire"}
          {level === "B1" && "📙 Niveau B1 - Intermédiaire"}
          {level === "ALL" && "📚 Tous les niveaux"}
        </strong>
        <p className="muted" style={{ marginTop: "8px", fontSize: "14px" }}>
          {level === "A1" && "Découvre les bases : salutations, présent, vocabulaire essentiel. Parfait pour débuter !"}
          {level === "A2" && "Approfondis avec le passé, les descriptions, et des conversations plus riches."}
          {level === "B1" && "Maîtrise le futur, le subjonctif, et exprime des idées complexes."}
          {level === "ALL" && "Accès à tous les contenus de tous les niveaux pour une pratique complète."}
        </p>
      </div>

      <div className="card" style={{ padding: "12px", marginBottom: "24px" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", 
          gap: "8px" 
        }}>
          {activityTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? "#1e3a5f" : "#0f1720",
                border: activeTab === tab.id ? "2px solid #60a5fa" : "1px solid #334155",
                padding: "10px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "14px"
              }}
            >
              <span style={{ fontSize: "20px" }}>{tab.icon}</span>
              <span style={{ fontSize: "11px", fontWeight: activeTab === tab.id ? "bold" : "normal" }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ minHeight: "400px" }}>
        {activeTab === "listening" && <Listening items={audios} level={level} country={country} />}
        {activeTab === "reading" && <Reading items={allTexts} level={level} country={country} />}
        {activeTab === "conversations" && <ConversationPractice level={level} country={country} />}
        {activeTab === "flashcards" && <Flashcards cards={cards} level={level} country={country} />}
        {activeTab === "conjugation" && <Conjugation level={level} country={country} />}
        {activeTab === "grammar" && <GrammarExplorer points={grammarPoints} initialLevel={level as any} />}
        {activeTab === "vocabQuiz" && <VocabQuiz level={level} />}
        {activeTab === "orthographe" && <Orthographe bank={exercises.orthographe} level={level} country={country} />}
        {activeTab === "dictee" && <Dictee items={exercises.dictee} level={level} country={country} />}
      </div>

      <div className="card" style={{ marginTop: "24px", background: "#0b1220" }}>
        <strong>⚡ Accès rapide</strong>
        <div className="hstack" style={{ gap: "12px", marginTop: "12px", flexWrap: "wrap" }}>
          <button onClick={() => setShowDashboard(true)} style={{ background: "#1e3a5f" }}>
            📊 Statistiques
          </button>
          <button onClick={() => { setActiveTab("conversations"); }} style={{ background: "#4c1d95" }}>
            💬 Conversations
          </button>
          <button onClick={() => { setActiveTab("conjugation"); }} style={{ background: "#713f12" }}>
            ⚡ Conjugaison
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "48px", padding: "16px", opacity: 0.5, fontSize: "12px" }}>
        Spanish Sprint v4.0 · Organisation par niveau 🚀
      </div>
    </main>
  );
            }
