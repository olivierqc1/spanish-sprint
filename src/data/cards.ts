import type { Card } from "@/components/Flashcards";

export const cards: Card[] = [
  // A1 Espagne
  { id:"es-a1-1", front:"casa", back:"maison", level:"A1", tag:"vocab", country:"Espagne" },
  { id:"es-a1-2", front:"pan", back:"pain", level:"A1", tag:"alimentation", country:"Espagne" },
  { id:"es-a1-3", front:"tren", back:"train", level:"A1", tag:"transport", country:"Espagne" },
  // A2 Espagne
  { id:"es-a2-1", front:"anoche", back:"hier soir", level:"A2", tag:"temps", country:"Espagne" },
  { id:"es-a2-2", front:"fuimos", back:"nous sommes allés", level:"A2", tag:"passé", country:"Espagne" },
  // A1 Mexique
  { id:"mx-a1-1", front:"camión", back:"bus (MX)", level:"A1", tag:"transport", country:"Mexique" },
  { id:"mx-a1-2", front:"frijoles", back:"haricots", level:"A1", tag:"alimentation", country:"Mexique" },
  // A2 Mexique
  { id:"mx-a2-1", front:"mole", back:"sauce traditionnelle", level:"A2", tag:"gastronomie", country:"Mexique" },
  // B1 mixtes
  { id:"es-b1-1", front:"hidalgo", back:"gentilhomme", level:"B1", tag:"littérature", country:"Espagne" },
  { id:"mx-b1-1", front:"mestizaje", back:"métissage", level:"B1", tag:"idée", country:"Mexique" },
  // génériques
  { id:"g-a1-1", front:"hola", back:"bonjour", level:"A1", tag:"base" },
  { id:"g-a2-1", front:"mientras", back:"pendant que", level:"A2", tag:"connecteur" },
  { id:"g-b1-1", front:"sin embargo", back:"cependant", level:"B1", tag:"connecteur" }
];
