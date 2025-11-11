"use client";

import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import Listening from "@/components/Listening";
import Reading from "@/components/Reading";
import ConversationPractice from "@/components/ConversationPractice";
import Flashcards from "@/components/Flashcards";
import SmartReview from "@/components/SmartReview";
import Badges from "@/components/Badges";

type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
type Country = "ALL" | "spain" | "mexico" | "argentina";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [level, setLevel] = useState<Level>("A1");
  const [country, setCountry] = useState<Country>("ALL");

  const audios = [
    {
      id: 1,
      title: "Presentación personal",
      audioUrl: "/audio/presentacion.mp3",
      transcript: "Hola, me llamo María. Tengo 25 años y soy de Madrid.",
      level: "A1" as Level,
      country: "spain" as Country,
    },
    {
      id: 2,
      title: "En el restaurante",
      audioUrl: "/audio/restaurante.mp3",
      transcript: "Buenas tardes. ¿Qué desea ordenar?",
      level: "A2" as Level,
      country: "mexico" as Country,
    },
    {
      id: 3,
      title: "Conversación en la calle",
      audioUrl: "/audio/calle.mp3",
      transcript: "Disculpe, ¿sabe dónde está la estación de tren?",
      level: "B1" as Level,
      country: "argentina" as Country,
    },
  ];

  const allTexts = [
    {
      id: 1,
      title: "Mi familia",
      text: "Mi familia es pequeña. Tengo un hermano y una hermana.",
      level: "A1" as Level,
      country: "spain" as Country,
    },
    {
      id: 2,
      title: "El mercado",
      text: "Fui al mercado a comprar frutas y verduras frescas.",
      level: "A2" as Level,
      country: "mexico" as Country,
    },
    {
      id: 3,
      title: "La cultura argentina",
      text: "Argentina es conocida por su tango y su deliciosa carne asada.",
      level: "B1" as Level,
      country: "argentina" as Country,
    },
  ];

  const cards = [
    {
      id: "1",
      front: "Hola",
      back: "Hello",
      level: "A1" as Level,
      country: "ALL" as Country,
    },
    {
      id: "2",
      front: "Gracias",
      back: "Thank you",
      level: "A1" as Level,
      country: "ALL" as Country,
    },
    {
      id: "3",
      front: "Por favor",
      back: "Please",
      level: "A1" as Level,
      country: "ALL" as Country,
    },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Spanish Sprint 🚀
      </h1>

      {/* Sélecteurs de niveau et pays */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label
            htmlFor="level-select"
            style={{ marginRight: "10px", fontWeight: "bold" }}
          >
            Niveau:
          </label>
          <select
            id="level-select"
            value={level}
            onChange={(e) => setLevel(e.target.value as Level)}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          >
            <option value="A1">A1 - Débutant</option>
            <option value="A2">A2 - Élémentaire</option>
            <option value="B1">B1 - Intermédiaire</option>
            <option value="B2">B2 - Intermédiaire avancé</option>
            <option value="C1">C1 - Avancé</option>
            <option value="C2">C2 - Maîtrise</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="country-select"
            style={{ marginRight: "10px", fontWeight: "bold" }}
          >
            Pays:
          </label>
          <select
            id="country-select"
            value={country}
            onChange={(e) => setCountry(e.target.value as Country)}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          >
            <option value="ALL">Tous les pays</option>
            <option value="spain">Espagne 🇪🇸</option>
            <option value="mexico">Mexique 🇲🇽</option>
            <option value="argentina">Argentine 🇦🇷</option>
          </select>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setActiveTab("dashboard")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "dashboard" ? "#007bff" : "#f0f0f0",
            color: activeTab === "dashboard" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          📊 Tableau de bord
        </button>
        <button
          onClick={() => setActiveTab("listening")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "listening" ? "#007bff" : "#f0f0f0",
            color: activeTab === "listening" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🎧 Écoute
        </button>
        <button
          onClick={() => setActiveTab("reading")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "reading" ? "#007bff" : "#f0f0f0",
            color: activeTab === "reading" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          📖 Lecture
        </button>
        <button
          onClick={() => setActiveTab("conversations")}
          style={{
            padding: "10px 20px",
            backgroundColor:
              activeTab === "conversations" ? "#007bff" : "#f0f0f0",
            color: activeTab === "conversations" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          💬 Conversations
        </button>
        <button
          onClick={() => setActiveTab("flashcards")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "flashcards" ? "#007bff" : "#f0f0f0",
            color: activeTab === "flashcards" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🗂️ Flashcards
        </button>
        <button
          onClick={() => setActiveTab("smartreview")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "smartreview" ? "#007bff" : "#f0f0f0",
            color: activeTab === "smartreview" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🧠 Révision
        </button>
        <button
          onClick={() => setActiveTab("badges")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "badges" ? "#007bff" : "#f0f0f0",
            color: activeTab === "badges" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🏅 Badges
        </button>
      </div>

      <div style={{ minHeight: "400px" }}>
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "listening" && <Listening items={audios} level={level} country={country} />}
        {activeTab === "reading" && <Reading items={allTexts} level={level} country={country} />}
        {activeTab === "conversations" && <ConversationPractice level={level} country={country} />}
        {activeTab === "flashcards" && <Flashcards level={level} country={country} />}
        {activeTab === "smartreview" && <SmartReview cards={cards} level={level} country={country} />}
        {activeTab === "badges" && <Badges />}
      </div>
    </div>
  );
}
