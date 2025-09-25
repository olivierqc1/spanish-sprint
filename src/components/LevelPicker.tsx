"use client";
import { useId } from "react";

export type Level = "A1" | "A2" | "B1" | "ALL";
export type Country = "spain" | "mexico" | "ALL";

export default function LevelPicker({
  level, onLevel, country, onCountry,
  sections, onSections
}: {
  level: Level; onLevel: (l: Level) => void;
  country: Country; onCountry: (c: Country) => void;
  sections: { listening: boolean; reading: boolean; flashcards: boolean; orthographe: boolean; dictee: boolean };
  onSections: (s: { listening: boolean; reading: boolean; flashcards: boolean; orthographe: boolean; dictee: boolean }) => void;
}) {
  const id = useId();
  return (
    <div className="card vstack">
      <div className="hstack" style={{justifyContent:"space-between"}}>
        <strong>Bienvenue 👋 Choisis ta pratique</strong>
        <span className="muted">Niveau & pays filtrent toutes les activités</span>
      </div>
      <div className="hstack" style={{flexWrap:"wrap"}}>
        <label className="muted">Niveau</label>
        <select value={level} onChange={e => onLevel(e.target.value as Level)}>
          <option>A1</option><option>A2</option><option>B1</option><option>ALL</option>
        </select>

        <label className="muted">Pays</label>
        <select value={country} onChange={e => onCountry(e.target.value as Country)}>
          <option value="ALL">Tous</option>
          <option value="spain">Espagne</option>
          <option value="mexico">Mexique</option>
        </select>

        <span className="muted">Modules</span>
        <label htmlFor={`${id}-l`} className="hstack">
          <input id={`${id}-l`} type="checkbox" checked={sections.listening}
                 onChange={e => onSections({...sections, listening: e.target.checked})}/> Écoute
        </label>
        <label htmlFor={`${id}-r`} className="hstack">
          <input id={`${id}-r`} type="checkbox" checked={sections.reading}
                 onChange={e => onSections({...sections, reading: e.target.checked})}/> Lecture
        </label>
        <label htmlFor={`${id}-f`} className="hstack">
          <input id={`${id}-f`} type="checkbox" checked={sections.flashcards}
                 onChange={e => onSections({...sections, flashcards: e.target.checked})}/> Flashcards
        </label>
        <label htmlFor={`${id}-o`} className="hstack">
          <input id={`${id}-o`} type="checkbox" checked={sections.orthographe}
                 onChange={e => onSections({...sections, orthographe: e.target.checked})}/> Orthographe
        </label>
        <label htmlFor={`${id}-d`} className="hstack">
          <input id={`${id}-d`} type="checkbox" checked={sections.dictee}
                 onChange={e => onSections({...sections, dictee: e.target.checked})}/> Dictée
        </label>
      </div>
    </div>
  );
}
