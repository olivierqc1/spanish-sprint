"use client";
import { useId } from "react";

export type Level = "A1" | "A2" | "B1" | "ALL";
export type Country = "spain" | "mexico" | "argentina" | "colombia" | "peru" | "chile" | "cuba" | "venezuela" | "ALL";

export type Sections = {
  listening: boolean;
  reading: boolean;
  flashcards: boolean;
  orthographe: boolean;
  dictee: boolean;
  conjugation: boolean;
  vocabQuiz: boolean;
  smartReview: boolean;
  planning: boolean;
  grammar: boolean;
  dashboard: boolean;
  badges: boolean;
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
        <strong>👋 Configuration</strong>
        <span className="muted">{activeCount} module{activeCount > 1 ? 's' : ''} activé{activeCount > 1 ? 's' : ''}</span>
      </div>

      {/* NIVEAU & PAYS */}
      <div className="hstack" style={{ flexWrap: "wrap", gap: "16px" }}>
        <div className="hstack">
          <label className="muted" style={{ minWidth: "60px" }}>Niveau</label>
          <select 
            value={level} 
            onChange={e => onLevel(e.target.value as Level)}
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
            onChange={e => onCountry(e.target.value as Country)}
            style={{ minWidth: "200px" }}
          >
            <option value="ALL">🌍 Tous les pays</option>
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

        <button 
          onClick={toggleAll}
          style={{ marginLeft: "auto" }}
        >
          {Object.values(sections).every(v => v) ? "Tout désactiver" : "Tout activer"}
        </button>
      </div>

      <hr style={{ margin: "8px 0" }} />

      {/* INFO CULTURELLE */}
      <div className="card" style={{ background: "#1e3a5f", fontSize: "12px" }}>
        <strong>🌎 Découvre la diversité hispanophone !</strong>
        <p style={{ marginTop: "8px", marginBottom: 0 }}>
          Explore les cultures, traditions et particularités de 8 pays hispanophones. 
          Chaque pays a son propre vocabulaire, expressions et richesses culturelles.
        </p>
      </div>

      <hr style={{ margin: "8px 0" }} />

      {/* STATISTIQUES & PROGRESSION */}
      <div>
        <div className="muted" style={{ fontSize: "12px", marginBottom: "8px" }}>
          <strong>📊 Statistiques & Progression</strong>
        </div>
        <div className="hstack" style={{ flexWrap: "wrap", gap: "12px" }}>
          <label htmlFor={`${id}-dashboard`} className="hstack" style={{ cursor: "pointer" }}>
            <input
              id={`${id}-dashboard`}
              type="checkbox"
              checked={sections.dashboard}
              onChange={e => onSections({ ...sections, dashboard: e.target.checked })}
            />
            <span>📊 Dashboard</span>
          </label>

          <label htmlFor={`${id}-badges`} className="hstack" style={{ cursor: "pointer" }}>
            <input
              id={`${id}-badges`}
              type="checkbox"
              checked={sections.badges}
              onChange={e => onSections({ ...sections, badges: e.target.checked })}
            />
            <span>🏆 Badges</span>
          </label>
        </div>
      </div>

      <hr style={{ margin: "8px 0" }} />

      {/* RÉVISION INTELLIGENTE */}
      <div>
        <div className="muted" style={{ fontSize: "12px", marginBottom: "8px" }}>
          <strong>🧠 Révision Intelligente</strong>
        </div>
        <div className="hstack" style={{ flexWrap: "wrap", gap: "12px" }}>
          <label htmlFor={`${id}-smartReview`} className="hstack" style={{ cursor: "pointer" }}>
            <input
              id={`${id}-smartReview`}
              type="checkbox"
              checked={sections.smartReview}
              onChange={e => onSections({ ...sections, smartReview: e.target.checked })}
            />
            <span>🧠 Révision SRS</span>
          </label>
        </div>
      </div>

      <hr style={{ margin: "8px 0" }} />

      {/* MODULES PRINCIPAUX */}
      <div>
        <div className="muted" style={{ fontSize: "12px", marginBottom: "8px" }}>
          <strong>Modules principaux</strong>
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
          <strong>Grammaire & Vocabulaire</strong>
        </div>
        <div className="hstack" style={{ flexWrap: "wrap", gap: "12px" }}>
          <label htmlFor={`${id}-grammar`} className="hstack" style={{ cursor: "pointer" }}>
            <input
              id={`${id}-grammar`}
              type="checkbox"
              checked={sections.grammar}
              onChange={e => onSections({ ...sections, grammar: e.target.checked })}
            />
            <span>📚 Grammaire</span>
          </label>

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
          <strong>Planning & Suivi</strong>
        </div>
        <div className="hstack" style={{ flexWrap: "wrap", gap: "12px" }}>
          <label htmlFor={`${id}-planning`} className="hstack" style={{ cursor: "pointer" }}>
            <input
              id={`${id}-planning`}
              type="checkbox"
              checked={sections.planning}
              onChange={e => onSections({ ...sections, planning: e.target.checked })}
            />
            <span>📅 Planning</span>
          </label>
        </div>
      </div>
    </div>
  );
}