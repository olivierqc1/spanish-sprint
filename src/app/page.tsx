// src/app/page.tsx
"use client";

import { useState, useMemo } from "react";
import LevelPicker, { type Level, type Country, type Sections } from "@/components/LevelPicker";
import Dashboard from "@/components/Dashboard";
import Listening from "@/components/Listening";
import Reading from "@/components/Reading";
import Flashcards from "@/components/Flashcards";
import SmartReview from "@/components/SmartReview";
import Badges from "@/components/Badges";
import Conjugation from "@/components/Conjugation";
import VocabQuiz from "@/components/VocabQuiz";
import Orthographe from "@/components/Orthographe";
import Dictee from "@/components/Dictee";
import DailyPlan from "@/components/Dailyplan";
import GrammarExplorer from "@/components/GrammarExplorer";

// Data imports
import { wordsA1 } from "@/data/words/A1";
import { wordsA2 } from "@/data/words/A2";
import { wordsB1 } from "@/data/words/B1";
import { grammarPoints } from "@/data/grammar";

// Mock data (à remplacer par tes vraies données)
const MOCK_AUDIOS = [
  {
    id: 1,
    title: "Presentación personal",
    audioUrl: "/audio/presentacion.mp3",
    transcript: "Hola, me llamo María. Tengo 25 años y soy de Madrid.",
    level: "A1" as Level,
    country: "spain" as Country,
  },
];

const MOCK_TEXTS = [
  {
    id: 1,
    title: "Mi familia",
    text: "Mi familia es pequeña. Tengo un hermano y una hermana.",
    level: "A1" as Level,
    country: "spain" as Country,
  },
];

const MOCK_ORTHO = [
  {
    id: "o1",
    level: "A1" as const,
    country: "Espagne" as const,
    prompt: "Complète : Buenos d__as",
    answer: "días",
    hint: "Accent aigu sur le i"
  }
];

const MOCK_DICTEE = [
  {
    id: "d1",
    level: "A1" as const,
    country: "Espagne" as const,
    title: "Salutations",
    audio: "/audio/hola.mp3",
    transcript: "Hola, buenos días"
  }
];

export default function Home() {
  // State
  const [level, setLevel] = useState<Level>("A1");
  const [country, setCountry] = useState<Country>("ALL");
  const [sections, setSections] = useState<Sections>({
    listening: true,
    reading: true,
    flashcards: true,
    orthographe: false,
    dictee: false,
    conjugation: true,
    vocabQuiz: true,
    smartReview: true,
    planning: false,
    grammar: false,
    dashboard: true,
    badges: true,
  });

  // Computed - Cartes de vocabulaire
  const allCards = useMemo(() => {
    const cards = [...wordsA1, ...wordsA2, ...wordsB1];
    return cards.filter(card => {
      const levelMatch = level === "ALL" || card.level === level;
      const countryMatch = country === "ALL" || card.country === country;
      return levelMatch && countryMatch;
    });
  }, [level, country]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="container mx-auto p-5 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Spanish Sprint 🚀
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Apprends l'espagnol de manière immersive et efficace
          </p>
        </header>

        {/* Configuration */}
        <div className="mb-8">
          <LevelPicker
            level={level}
            onLevel={setLevel}
            country={country}
            onCountry={setCountry}
            sections={sections}
            onSections={setSections}
          />
        </div>

        {/* Modules actifs */}
        <div className="space-y-8">
          {/* Dashboard */}
          {sections.dashboard && (
            <section id="dashboard" className="scroll-mt-20">
              <Dashboard />
            </section>
          )}

          {/* Écoute */}
          {sections.listening && (
            <section id="listening" className="scroll-mt-20">
              <Listening items={MOCK_AUDIOS} level={level} country={country} />
            </section>
          )}

          {/* Lecture */}
          {sections.reading && (
            <section id="reading" className="scroll-mt-20">
              <Reading items={MOCK_TEXTS} level={level} country={country} />
            </section>
          )}

          {/* Flashcards */}
          {sections.flashcards && (
            <section id="flashcards" className="scroll-mt-20">
              <Flashcards level={level} country={country} />
            </section>
          )}

          {/* Conjugaison */}
          {sections.conjugation && (
            <section id="conjugation" className="scroll-mt-20">
              <Conjugation level={level} country={country} />
            </section>
          )}

          {/* Quiz Vocabulaire */}
          {sections.vocabQuiz && (
            <section id="vocab-quiz" className="scroll-mt-20">
              <VocabQuiz level={level} />
            </section>
          )}

          {/* Orthographe */}
          {sections.orthographe && (
            <section id="orthographe" className="scroll-mt-20">
              <Orthographe bank={MOCK_ORTHO} level={level} country={country} />
            </section>
          )}

          {/* Dictée */}
          {sections.dictee && (
            <section id="dictee" className="scroll-mt-20">
              <Dictee items={MOCK_DICTEE} level={level} country={country} />
            </section>
          )}

          {/* Révision intelligente */}
          {sections.smartReview && (
            <section id="smart-review" className="scroll-mt-20">
              <SmartReview cards={allCards} level={level} country={country} />
            </section>
          )}

          {/* Grammaire */}
          {sections.grammar && (
            <section id="grammar" className="scroll-mt-20">
              <GrammarExplorer points={grammarPoints} initialLevel={level as any} />
            </section>
          )}

          {/* Planning */}
          {sections.planning && (
            <section id="planning" className="scroll-mt-20">
              <DailyPlan />
            </section>
          )}

          {/* Badges */}
          {sections.badges && (
            <section id="badges" className="scroll-mt-20">
              <Badges />
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>Spanish Sprint © 2025 - Apprends l'espagnol avec plaisir</p>
        </footer>
      </div>
    </div>
  );
}