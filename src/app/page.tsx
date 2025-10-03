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
import DailyPlan from "@/components/Dailyplan";
import HourCounter from "@/components/HourCounter";

import { allTexts } from "@/data/texts";
import { audios } from "@/data/audio";
import { cards } from "@/data/cards";
import { exercises } from "@/data/exercices";

export default function HomePage() {
  const [level, setLevel] = useState<Level>("A1");
  const [country, setCountry] = useState<Country>("ALL");
  const [sections, setSections] = useState({
    listening: true,
    reading: true,
    flashcards: true,
    orthographe: true,
    dictee: true,
    conjugation: true,
    vocabQuiz: true,
    planning: false,
  });

  return (
    <main>
      <h1 style={{ marginTop: 0 }}>🇪🇸 Spanish Sprint</h1>
      <p className="muted">
        <strong>Apprends l'espagnol</strong> avec des exercices variés : écoute, lecture, vocabulaire, conjugaison, dictée et plus encore !
      </p>

      <LevelPicker
        level={level}
        onLevel={setLevel}
        country={country}
        onCountry={setCountry}
        sections={sections}
        onSections={setSections}
      />

      {/* SECTION PLANNING & SUIVI */}
      {sections.planning && (
        <div className="section">
          <DailyPlan />
          <HourCounter />
        </div>
      )}

      {/* SECTION PRINCIPALE - ÉCOUTE & LECTURE */}
      <div className="section">
        {sections.listening && (
          <Listening items={audios} level={level} country={country} />
        )}
        {sections.reading && (
          <Reading items={allTexts} level={level} country={country} />
        )}
      </div>

      {/* SECTION GRAMMAIRE & CONJUGAISON */}
      <div className="section">
        {sections.conjugation && (
          <Conjugation level={level} country={country} />
        )}
        {sections.vocabQuiz && (
          <VocabQuiz level={level} />
        )}
      </div>

      {/* SECTION ORTHOGRAPHE & DICTÉE */}
      <div className="section">
        {sections.orthographe && (
          <Orthographe
            bank={exercises.orthographe}
            level={level}
            country={country}
          />
        )}
        {sections.dictee && (
          <Dictee
            items={exercises.dictee}
            level={level}
            country={country}
          />
        )}
      </div>

      {/* SECTION FLASHCARDS (pleine largeur) */}
      {sections.flashcards && (
        <Flashcards cards={cards} level={level} country={country} />
      )}

      {/* FOOTER INFO */}
      <div className="card" style={{ marginTop: "32px", background: "#0b1220" }}>
        <h3 style={{ margin: "0 0 12px 0" }}>📚 Comment utiliser Spanish Sprint</h3>
        <div className="muted vstack" style={{ gap: "8px" }}>
          <p><strong>1. Choisis ton niveau</strong> (A1, A2, B1) et ton <strong>pays</strong> (Espagne/Mexique) pour filtrer le contenu.</p>
          <p><strong>2. Active les modules</strong> qui t'intéressent : écoute, lecture, conjugaison, vocabulaire, etc.</p>
          <p><strong>3. Pratique quotidiennement</strong> : 20-60 minutes par jour donnent les meilleurs résultats.</p>
          <p><strong>4. Varie les exercices</strong> pour travailler toutes les compétences : compréhension orale, lecture, grammaire, vocabulaire.</p>
          <p><strong>💡 Astuce</strong> : Commence par l'écoute et la lecture, puis renforce avec la conjugaison et le vocabulaire !</p>
        </div>
      </div>

      {/* STATISTIQUES */}
      <div className="card" style={{ textAlign: "center", background: "#1e3a5f" }}>
        <h3 style={{ margin: "0 0 12px 0" }}>📊 Contenu disponible</h3>
        <div className="hstack" style={{ justifyContent: "space-around", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#60a5fa" }}>50+</div>
            <div className="muted">Audios</div>
          </div>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#60a5fa" }}>50+</div>
            <div className="muted">Textes</div>
          </div>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#60a5fa" }}>200+</div>
            <div className="muted">Flashcards</div>
          </div>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#60a5fa" }}>60+</div>
            <div className="muted">Conjugaisons</div>
          </div>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#60a5fa" }}>40+</div>
            <div className="muted">Quiz vocab</div>
          </div>
        </div>
      </div>
    </main>
  );
}
