"use client";

import { useState } from "react";
import LevelPicker, { type Level, type Country } from "@/components/LevelPicker";
import Listening from "@/components/Listening";
import Reading from "@/components/Reading";
import Flashcards from "@/components/Flashcards";

import { allTexts } from "@/data/texts";
import { audios } from "@/data/audio";
import { cards } from "@/data/cards";

export default function HomePage() {
  const [level, setLevel] = useState<Level>("A1");
  const [country, setCountry] = useState<Country>("ALL");
  const [sections, setSections] = useState({ listening: true, reading: true, flashcards: true });

  return (
    <main>
      <h1 style={{marginTop:0}}>Spanish Sprint</h1>
      <p className="muted">Choisis ton <strong>niveau</strong> et ton <strong>pays</strong>, puis pratique.</p>

      <LevelPicker
        level={level} onLevel={setLevel}
        country={country} onCountry={setCountry}
        sections={sections} onSections={setSections}
      />

      <div className="section">
        {sections.listening && (
          <Listening items={audios} level={level} country={country} />
        )}
        {sections.reading && (
          <Reading items={allTexts} level={level} country={country} />
        )}
      </div>

      {sections.flashcards && (
        <Flashcards cards={cards} level={level} country={country} />
      )}
    </main>
  );
}
