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
    smartReview: true,
    planning: false,
    grammar: true,        // ← NOUVEAU
    dashboard: true,      // ← NOUVEAU
    badges: false,        // ← NOUVEAU
  });

  return (
    <main>
      <h1 style={{ marginTop: 0 }}>🇪🇸 Spanish Sprint</h1>
      <p className="muted">
        <strong>Apprends l'espagnol</strong> avec des exercices variés : écoute, lecture, vocabulaire, conjugaison, dictée, 
        <strong> révision intelligente</strong> et plus encore !
      </p>

      <LevelPicker
        level={level}
        onLevel={setLevel}
        country={country}
        onCountry={setCountry}
        sections={sections}
        onSections={setSections}
      />

      {/* SECTION DASHBOARD & BADGES */}
      {(sections.dashboard || sections.badges) && (
        <div className="section">
          {sections.dashboard && <Dashboard />}
          {sections.badges && <Badges />}
        </div>
      )}

      {/* SECTION RÉVISION INTELLIGENTE (PRIORITAIRE) */}
      {sections.smartReview && (
        <SmartReview cards={cards} level={level} country={country} />
      )}

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
        {sections.grammar && (
          <GrammarExplorer points={grammarPoints} initialLevel={level as any} />
        )}
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
          <p><strong>1. Consulte ton tableau de bord</strong> 📊 pour voir tes statistiques et badges</p>
          <p><strong>2. Commence par la Révision Intelligente</strong> 🧠 : Le système optimise automatiquement ta mémorisation !</p>
          <p><strong>3. Pratique quotidiennement</strong> : 20-60 minutes par jour donnent les meilleurs résultats.</p>
          <p><strong>4. Varie les exercices</strong> pour travailler toutes les compétences : compréhension orale, lecture, grammaire, vocabulaire.</p>
          <p><strong>💡 Astuce</strong> : Utilise les raccourcis clavier (Entrée, Espace, Flèches) pour naviguer plus rapidement !</p>
        </div>
      </div>

      {/* RACCOURCIS CLAVIER */}
      <div className="card" style={{ background: "#1e3a5f", marginTop: "16px" }}>
        <h3 style={{ margin: "0 0 12px 0" }}>⌨️ Raccourcis clavier</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", fontSize: "14px" }}>
          <div className="hstack" style={{ gap: "8px" }}>
            <kbd style={{ padding: "2px 6px", background: "#0f1720", borderRadius: "4px", fontSize: "12px" }}>Entrée</kbd>
            <span className="muted">Valider / Suivant</span>
          </div>
          <div className="hstack" style={{ gap: "8px" }}>
            <kbd style={{ padding: "2px 6px", background: "#0f1720", borderRadius: "4px", fontSize: "12px" }}>Espace</kbd>
            <span className="muted">Retourner carte</span>
          </div>
          <div className="hstack" style={{ gap: "8px" }}>
            <kbd style={{ padding: "2px 6px", background: "#0f1720", borderRadius: "4px", fontSize: "12px" }}>← →</kbd>
            <span className="muted">Navigation</span>
          </div>
          <div className="hstack" style={{ gap: "8px" }}>
            <kbd style={{ padding: "2px 6px", background: "#0f1720", borderRadius: "4px", fontSize: "12px" }}>1-5</kbd>
            <span className="muted">Révision (qualité)</span>
          </div>
        </div>
      </div>

      {/* EXPLICATION RÉVISION INTELLIGENTE */}
      <div className="card" style={{ background: "#1e3a5f", marginTop: "16px" }}>
        <h3 style={{ margin: "0 0 12px 0" }}>🧠 Qu'est-ce que la Révision Intelligente ?</h3>
        <div className="muted vstack" style={{ gap: "8px" }}>
          <p>
            Un système de <strong>répétition espacée</strong> qui analyse tes performances et programme automatiquement 
            tes révisions au moment optimal.
          </p>
          <div className="hstack" style={{ gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
            <div className="badge" style={{ padding: "8px 12px" }}>
              📈 Rétention +150%
            </div>
            <div className="badge" style={{ padding: "8px 12px" }}>
              ⏱️ Temps économisé 50%
            </div>
            <div className="badge" style={{ padding: "8px 12px" }}>
              🎯 Mémorisation ciblée
            </div>
          </div>
          <p style={{ marginTop: "12px" }}>
            <strong>Comment ça marche ?</strong> Les cartes difficiles reviennent souvent, les cartes faciles s'espacent. 
            Tu révises juste avant d'oublier = mémorisation maximale !
          </p>
        </div>
      </div>

      {/* STATISTIQUES */}
      <div className="card" style={{ textAlign: "center", background: "#1e3a5f", marginTop: "16px" }}>
        <h3 style={{ margin: "0 0 12px 0" }}>📊 Contenu disponible</h3>
        <div className="hstack" style={{ justifyContent: "space-around", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#60a5fa" }}>55+</div>
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
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#60a5fa" }}>67</div>
            <div className="muted">Conjugaisons</div>
          </div>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#60a5fa" }}>40+</div>
            <div className="muted">Quiz vocab</div>
          </div>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#60a5fa" }}>100+</div>
            <div className="muted">Points grammaire</div>
          </div>
        </div>
      </div>

      {/* CONSEILS D'UTILISATION */}
      <div className="card" style={{ background: "#0b1220", marginTop: "16px" }}>
        <h3 style={{ margin: "0 0 12px 0" }}>🎓 Routine d'apprentissage recommandée</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
          <div className="card" style={{ background: "#1f2a37" }}>
            <strong style={{ color: "#60a5fa" }}>☀️ Matin (15-20 min)</strong>
            <ul style={{ fontSize: "14px", marginTop: "8px", paddingLeft: "20px" }}>
              <li>📊 Consulter dashboard</li>
              <li>🧠 Révision intelligente (priorité)</li>
              <li>🎧 2-3 exercices d'écoute</li>
              <li>📖 1-2 textes de lecture</li>
            </ul>
          </div>
          <div className="card" style={{ background: "#1f2a37" }}>
            <strong style={{ color: "#f59e0b" }}>🌆 Midi/Après-midi (15-20 min)</strong>
            <ul style={{ fontSize: "14px", marginTop: "8px", paddingLeft: "20px" }}>
              <li>⚡ Conjugaison (5-10 verbes)</li>
              <li>📚 Points de grammaire</li>
              <li>🎯 Quiz vocabulaire</li>
              <li>✍️ Orthographe/Dictée</li>
            </ul>
          </div>
          <div className="card" style={{ background: "#1f2a37" }}>
            <strong style={{ color: "#10b981" }}>🌙 Soir (10 min)</strong>
            <ul style={{ fontSize: "14px", marginTop: "8px", paddingLeft: "20px" }}>
              <li>🧠 Révision rapide (5 min)</li>
              <li>🎴 Flashcards (5 min)</li>
              <li>🏆 Vérifier nouveaux badges</li>
              <li>📊 Consulter tes stats</li>
            </ul>
          </div>
        </div>
        <div className="muted" style={{ marginTop: "16px", textAlign: "center", fontSize: "14px" }}>
          <strong>💡 Règle d'or :</strong> Régularité &gt; Intensité | 20 min/jour &gt; 3h le dimanche
        </div>
      </div>

      {/* VERSION */}
      <div style={{ textAlign: "center", marginTop: "32px", padding: "16px", opacity: 0.5, fontSize: "12px" }}>
        Spanish Sprint v3.0 · Révision intelligente (SRS) + Dashboard + Badges + Grammaire + Raccourcis clavier 🚀
      </div>
    </main>
  );
      }
