"use client";
import { useId } from "react";

export type Level = "A1" | "A2" | "B1" | "ALL";
export type Country = "spain" | "mexico" | "ALL";

type Sections = {
  listening: boolean;
  reading: boolean;
  flashcards: boolean;
  orthographe: boolean;
  dictee: boolean;
  conjugation: boolean;
  vocabQuiz: boolean;
  planning: boolean;
};

export default function LevelPicker({
  level,
  onLevel,
  country,
  onCountry,
  sections,
  onSections,
}: {
  level: Level;
  onLevel: (l: Level) => void;
  country: Country;
  onCountry: (c: Country) => void;
  sections: Sections;
  onSections: (s: Sections) => void;
}) {
  const id = useId();

  const toggleAll = () => {
    const allActive = Object.values(sections).every(v => v);
    const newSections = Object.keys(sections).reduce((acc, key) => {
      acc[key as keyof Sections] = !allActive;
      return acc;
    }, {} as Sections);
    onSections(newSections);
  };

  const activeCount = Object.values(sections).filter(Boolean).length;

  return (
    <div className="card vstack">
      <div className="hstack" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <strong>👋 Bienvenue ! Configure ta pratique</strong>
        <span className="muted">{activeCount} module{activeCount > 1 ? 's' : ''} activé{activeCount > 1 ? 's' : ''}</span>
      </div>

      {/* NIVEAU & PAYS */}
      <div className="hstack" style={{ flexWrap: "wrap", gap: "16px" }}>
        <div className="hstack">
          <label className="muted" style={{ minWidth: "60px" }}>Niveau</label>
          <select 
            value={level} 
            onChange={e => onLevel(e.target.value as Level)}
            style={{ minWidth: "100px" }}
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
            onChange={e => onCountry(e.target.value as Country)}
            style={{ minWidth: "120px" }}
          >
            <option value="ALL">🌍 Tous</option>
            <option value="spain">🇪🇸 Espagne</option>
            <option value="mexico">🇲🇽 Mexique</option>
          </select>
        </div>

        <button 
          onClick={toggleAll}
          style={{ marginLeft: "auto" }}
        >
          {Object.values(sections).every(v => v) ? "Tout désactiver" : "Tout activer"}
        </button>
      </div>

      <hr style={{ margin: "8px 0" }} />

      {/* MODULES PRINCIPAUX */}
      <div>
        <div className="muted" style={{ fontSize: "12px", marginBottom: "8px" }}>
          <strong>Modules principaux</strong> · Compréhension & Expression
        </div>
        <div className="hstack" style={{ flexWrap: "wrap", gap: "12px" }}>
          <label htmlFor={`${id}-listening`} className="hstack" style={{ cursor: "pointer" }}>
            <input
              id={`${id}-listening`}
              type="checkbox"
              checked={sections.listening}
              onChange={e => onSections({ ...sections, listening: e.target.checked })}
            />
            <span>🎧 Écoute</span>
          </label>

          <label htmlFor={`${id}-reading`} className="hstack" style={{ cursor: "pointer" }}>
            <input
              id={`${id}-reading`}
              type="checkbox"
              checked={sections.reading}
              onChange={e => onSections({ ...sections, reading: e.target.checked })}
            />
            <span>📖 Lecture</span>
          </label>

          <label htmlFor={`${id}-flashcards`} className="hstack" style={{ cursor: "pointer" }}>
            <input
              id={`${id}-flashcards`}
              type="checkbox"
              checked={sections.flashcards}
              onChange={e => onSections({ ...sections, flashcards: e.target.checked })}
            />
            <span>🎴 Flashcards</span>
          </label>
        </div>
      </div>

      <hr style={{ margin: "8px 0" }} />

      {/* MODULES GRAMMAIRE */}
      <div>
        <div className="muted" style={{ fontSize: "12px", marginBottom: "8px" }}>
          <strong>Grammaire & Vocabulaire</strong> · Renforcement
        </div>
        <div className="hstack" style={{ flexWrap: "wrap", gap: "12px" }}>
          <label htmlFor={`${id}-conjugation`} className="hstack" style={{ cursor: "pointer" }}>
            <input
              id={`${id}-conjugation`}
              type="checkbox"
              checked={sections.conjugation}
              onChange={e => onSections({ ...sections, conjugation: e.target.checked })}
            />
            <span>⚡ Conjugaison</span>
          </label>

          <label htmlFor={`${id}-vocabQuiz`} className="hstack" style={{ cursor: "pointer" }}>
            <input
              id={`${id}-vocabQuiz`}
              type="checkbox"
              checked={sections.vocabQuiz}
              onChange={e => onSections({ ...sections, vocabQuiz: e.target.checked })}
            />
            <span>🎯 Quiz Vocab</span>
          </label>

          <label htmlFor={`${id}-orthographe`} className="hstack" style={{ cursor: "pointer" }}>
            <input
              id={`${id}-orthographe`}
              type="checkbox"
              checked={sections.orthographe}
              onChange={e => onSections({ ...sections, orthographe: e.target.checked })}
            />
            <span>✍️ Orthographe</span>
          </label>

          <label htmlFor={`${id}-dictee`} className="hstack" style={{ cursor: "pointer" }}>
            <input
              id={`${id}-dictee`}
              type="checkbox"
              checked={sections.dictee}
              onChange={e => onSections({ ...sections, dictee: e.target.checked })}
            />
            <span>🎤 Dictée</span>
          </label>
        </div>
      </div>

      <hr style={{ margin: "8px 0" }} />

      {/* MODULES PLANNING */}
      <div>
        <div className="muted" style={{ fontSize: "12px", marginBottom: "8px" }}>
          <strong>Planning & Suivi</strong> · Organisation
        </div>
        <div className="hstack" style={{ flexWrap: "wrap", gap: "12px" }}>
          <label htmlFor={`${id}-planning`} className="hstack" style={{ cursor: "pointer" }}>
            <input
              id={`${id}-planning`}
              type="checkbox"
              checked={sections.planning}
              onChange={e => onSections({ ...sections, planning: e.target.checked })}
            />
            <span>📅 Plan quotidien & Compteur</span>
          </label>
        </div>
      </div>

      {/* AIDE RAPIDE */}
      <div className="card" style={{ background: "#0b1220", marginTop: "8px" }}>
        <div className="muted" style={{ fontSize: "12px" }}>
          <strong>💡 Conseil :</strong> Pour progresser rapidement, active au moins 3-4 modules et pratique 30 minutes par jour. 
          Combine écoute + lecture + conjugaison pour des résultats optimaux !
        </div>
      </div>
    </div>
  );
}
