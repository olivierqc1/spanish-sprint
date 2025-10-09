"use client";

import { useState } from "react";
import LevelPicker, { type Level, type Country } from "@/components/LevelPicker";
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

import { allTexts } from "@/data/texts";
import { audios } from "@/data/audio";
import { cards } from "@/data/cards";
import { exercises } from "@/data/exercices";
import { grammarPoints } from "@/data/grammar";

type Tab = "home" | "dashboard" | "smartReview" | "listening" | "reading" | "flashcards" | 
           "conjugation" | "grammar" | "vocabQuiz" | "orthographe" | "dictee" | "badges" | "planning";

const tabs: { id: Tab; label: string; icon: string; color: string }[] = [
  { id: "home", label: "Accueil", icon: "🏠", color: "#60a5fa" },
  { id: "dashboard", label: "Tableau de bord", icon: "📊", color: "#10b981" },
  { id: "smartReview", label: "Révision Intelligente", icon: "🧠", color: "#f59e0b" },
  { id: "listening", label: "Écoute", icon: "🎧", color: "#60a5fa" },
  { id: "reading", label: "Lecture", icon: "📖", color: "#60a5fa" },
  { id: "flashcards", label: "Flashcards", icon: "🎴", color: "#a78bfa" },
  { id: "conjugation", label: "Conjugaison", icon: "⚡", color: "#f59e0b" },
  { id: "grammar", label: "Grammaire", icon: "📚", color: "#f59e0b" },
  { id: "vocabQuiz", label: "Quiz Vocab", icon: "🎯", color: "#10b981" },
  { id: "orthographe", label: "Orthographe", icon: "✍️", color: "#34d399" },
  { id: "dictee", label: "Dictée", icon: "🎤", color: "#34d399" },
  { id: "badges", label: "Badges", icon: "🏆", color: "#fbbf24" },
  { id: "planning", label: "Planning", icon: "📅", color: "#93a2b8" },
];

export default function HomePage() {
  const [level, setLevel] = useState<Level>("A1");
  const [country, setCountry] = useState<Country>("ALL");
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <main>
      {/* EN-TÊTE */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ marginTop: 0 }}>🇪🇸 Spanish Sprint</h1>
        <p className="muted">
          <strong>Apprends l'espagnol</strong> avec des exercices variés : écoute, lecture, vocabulaire, conjugaison, révision intelligente et plus !
        </p>
      </div>

      {/* CONFIGURATION NIVEAU & PAYS */}
      <div className="card" style={{ marginBottom: "16px" }}>
        <div className="hstack" style={{ flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
          <div className="hstack">
            <label className="muted" style={{ minWidth: "60px" }}>Niveau</label>
            <select 
              value={level} 
              onChange={e => setLevel(e.target.value as Level)}
              style={{ minWidth: "140px" }}
            >
              <option value="A1">A1 - Débutant</option>
              <option value="A2">A2 - Élémentaire</option>
              <option value="B1">B1 - Intermédiaire</option>
              <option value="ALL">Tous niveaux</option>
            </select>
          </div>

          <div className="hstack">
            <label className="muted" style={{ minWidth: "60px" }}>Pays</label>
            <select 
              value={country} 
              onChange={e => setCountry(e.target.value as Country)}
              style={{ minWidth: "140px" }}
            >
              <option value="ALL">🌍 Tous</option>
              <option value="spain">🇪🇸 Espagne</option>
              <option value="mexico">🇲🇽 Mexique</option>
            </select>
          </div>

          <div className="muted" style={{ marginLeft: "auto", fontSize: "12px" }}>
            💡 Sélectionne un onglet ci-dessous pour commencer
          </div>
        </div>
      </div>

      {/* NAVIGATION PAR ONGLETS */}
      <div className="card" style={{ padding: "12px", marginBottom: "24px" }}>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", 
          gap: "8px" 
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? "#1e3a5f" : "#0f1720",
                border: activeTab === tab.id ? `2px solid ${tab.color}` : "1px solid #334155",
                padding: "12px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "14px"
              }}
            >
              <span style={{ fontSize: "24px" }}>{tab.icon}</span>
              <span style={{ fontSize: "12px", fontWeight: activeTab === tab.id ? "bold" : "normal" }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* CONTENU SELON L'ONGLET ACTIF */}
      <div style={{ minHeight: "400px" }}>
        
        {activeTab === "home" && (
          <div className="vstack" style={{ gap: "16px" }}>
            
            {/* ACCUEIL - QUICK START */}
            <div className="card" style={{ background: "#1e3a5f" }}>
              <h2 style={{ margin: "0 0 16px 0" }}>👋 Bienvenue sur Spanish Sprint !</h2>
              <p className="muted">
                Ton application complète pour apprendre l'espagnol de manière progressive et efficace.
              </p>
              <div style={{ marginTop: "16px" }}>
                <strong>🚀 Par où commencer ?</strong>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginTop: "12px" }}>
                  <button 
                    onClick={() => setActiveTab("dashboard")}
                    className="card"
                    style={{ cursor: "pointer", background: "#064e3b", border: "1px solid #10b981" }}
                  >
                    <div style={{ fontSize: "32px" }}>📊</div>
                    <strong>Voir mes stats</strong>
                    <div className="muted" style={{ fontSize: "12px" }}>Progression et badges</div>
                  </button>
                  <button 
                    onClick={() => setActiveTab("smartReview")}
                    className="card"
                    style={{ cursor: "pointer", background: "#713f12", border: "1px solid #f59e0b" }}
                  >
                    <div style={{ fontSize: "32px" }}>🧠</div>
                    <strong>Révision Intelligente</strong>
                    <div className="muted" style={{ fontSize: "12px" }}>Mémorisation optimale</div>
                  </button>
                  <button 
                    onClick={() => setActiveTab("conjugation")}
                    className="card"
                    style={{ cursor: "pointer", background: "#1e3a5f", border: "1px solid #60a5fa" }}
                  >
                    <div style={{ fontSize: "32px" }}>⚡</div>
                    <strong>Conjugaison</strong>
                    <div className="muted" style={{ fontSize: "12px" }}>Apprendre progressivement</div>
                  </button>
                </div>
              </div>
            </div>

            {/* STATISTIQUES RAPIDES */}
            <div className="card" style={{ background: "#0b1220" }}>
              <h3 style={{ margin: "0 0 12px 0" }}>📊 Contenu disponible</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "16px", textAlign: "center" }}>
                <div>
                  <div style={{ fontSize: "28px", fontWeight: "bold", color: "#60a5fa" }}>55+</div>
                  <div className="muted" style={{ fontSize: "12px" }}>Audios</div>
                </div>
                <div>
                  <div style={{ fontSize: "28px", fontWeight: "bold", color: "#60a5fa" }}>50+</div>
                  <div className="muted" style={{ fontSize: "12px" }}>Textes</div>
                </div>
                <div>
                  <div style={{ fontSize: "28px", fontWeight: "bold", color: "#60a5fa" }}>200+</div>
                  <div className="muted" style={{ fontSize: "12px" }}>Flashcards</div>
                </div>
                <div>
                  <div style={{ fontSize: "28px", fontWeight: "bold", color: "#60a5fa" }}>67</div>
                  <div className="muted" style={{ fontSize: "12px" }}>Conjugaisons</div>
                </div>
                <div>
                  <div style={{ fontSize: "28px", fontWeight: "bold", color: "#60a5fa" }}>40+</div>
                  <div className="muted" style={{ fontSize: "12px" }}>Quiz vocab</div>
                </div>
                <div>
                  <div style={{ fontSize: "28px", fontWeight: "bold", color: "#60a5fa" }}>100+</div>
                  <div className="muted" style={{ fontSize: "12px" }}>Grammaire</div>
                </div>
              </div>
            </div>

            {/* ROUTINE RECOMMANDÉE */}
            <div className="card">
              <h3 style={{ margin: "0 0 12px 0" }}>🎓 Routine d'apprentissage recommandée</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
                <div className="card" style={{ background: "#1f2a37" }}>
                  <strong style={{ color: "#60a5fa" }}>☀️ Matin (15-20 min)</strong>
                  <ul style={{ fontSize: "14px", marginTop: "8px", paddingLeft: "20px" }}>
                    <li>📊 Consulter dashboard</li>
                    <li>🧠 Révision intelligente</li>
                    <li>🎧 2-3 exercices d'écoute</li>
                  </ul>
                </div>
                <div className="card" style={{ background: "#1f2a37" }}>
                  <strong style={{ color: "#f59e0b" }}>🌆 Après-midi (15-20 min)</strong>
                  <ul style={{ fontSize: "14px", marginTop: "8px", paddingLeft: "20px" }}>
                    <li>⚡ Conjugaison</li>
                    <li>📚 Grammaire</li>
                    <li>🎯 Quiz vocabulaire</li>
                  </ul>
                </div>
                <div className="card" style={{ background: "#1f2a37" }}>
                  <strong style={{ color: "#10b981" }}>🌙 Soir (10 min)</strong>
                  <ul style={{ fontSize: "14px", marginTop: "8px", paddingLeft: "20px" }}>
                    <li>🧠 Révision rapide</li>
                    <li>🎴 Flashcards</li>
                    <li>🏆 Vérifier badges</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RACCOURCIS CLAVIER */}
            <div className="card" style={{ background: "#1e3a5f" }}>
              <h3 style={{ margin: "0 0 12px 0" }}>⌨️ Raccourcis clavier</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", fontSize: "14px" }}>
                <div className="hstack" style={{ gap: "8px" }}>
                  <kbd style={{ padding: "4px 8px", background: "#0f1720", borderRadius: "4px", fontSize: "12px" }}>Entrée</kbd>
                  <span className="muted">Valider / Suivant</span>
                </div>
                <div className="hstack" style={{ gap: "8px" }}>
                  <kbd style={{ padding: "4px 8px", background: "#0f1720", borderRadius: "4px", fontSize: "12px" }}>Espace</kbd>
                  <span className="muted">Retourner carte</span>
                </div>
                <div className="hstack" style={{ gap: "8px" }}>
                  <kbd style={{ padding: "4px 8px", background: "#0f1720", borderRadius: "4px", fontSize: "12px" }}>← →</kbd>
                  <span className="muted">Navigation</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "smartReview" && <SmartReview cards={cards} level={level} country={country} />}
        {activeTab === "listening" && <Listening items={audios} level={level} country={country} />}
        {activeTab === "reading" && <Reading items={allTexts} level={level} country={country} />}
        {activeTab === "flashcards" && <Flashcards cards={cards} level={level} country={country} />}
        {activeTab === "conjugation" && <Conjugation level={level} country={country} />}
        {activeTab === "grammar" && <GrammarExplorer points={grammarPoints} initialLevel={level as any} />}
        {activeTab === "vocabQuiz" && <VocabQuiz level={level} />}
        {activeTab === "orthographe" && <Orthographe bank={exercises.orthographe} level={level} country={country} />}
        {activeTab === "dictee" && <Dictee items={exercises.dictee} level={level} country={country} />}
        {activeTab === "badges" && <Badges />}
        {activeTab === "planning" && (
          <div className="section">
            <DailyPlan />
            <HourCounter />
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div style={{ textAlign: "center", marginTop: "48px", padding: "16px", opacity: 0.5, fontSize: "12px" }}>
        Spanish Sprint v3.1 · Navigation par onglets + Flashcards améliorées 🚀
      </div>
    </main>
  );
}
