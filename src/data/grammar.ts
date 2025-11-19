// src/data/grammar.ts

// --- IMPORTS DES FICHIERS JSON QUI EXISTENT DÉJÀ ---
import presenteRegulares from "./grammar_quizz/presente_regulares.json";
import presenteIrregulares from "./grammar_quizz/presente_irregulares.json";
import presenteProgresivo from "./grammar_quizz/presente_progresivo.json";
import serEstar from "./grammar_quizz/ser_estar.json";
import reflexivos from "./grammar_quizz/verbos_reflexivos.json";
import articulosDefinidos from "./grammar_quizz/articulos_definidos.json";
import articulosIndefinidos from "./grammar_quizz/articulos_indefinidos.json";
import genero from "./grammar_quizz/genero_sustantivos.json";
import posesivos from "./grammar_quizz/posesivos.json";
import demostrativos from "./grammar_quizz/demostrativos.json";
import adjetivos from "./grammar_quizz/acuerdo_adjetivos.json";
import adverbiosFrecuencia from "./grammar_quizz/adverbios_frecuencia.json";
import cotidianoBasics from "./grammar_quizz/cotidiano_basics.json";
import futuroSimpleReg from "./grammar_quizz/futuro_simple_regulares.json";
import futuroSimpleIrreg from "./grammar_quizz/futuro_simple_irregulares.json";
import gustar from "./grammar_quizz/gustar.json";
import hayEstar from "./grammar_quizz/hay_estar.json";
import imperfecto from "./grammar_quizz/imperfecto.json";
import interrogativos from "./grammar_quizz/interrogatives.json";
import muyVsMucho from "./grammar_quizz/muy_vs_mucho.json";
import negacion from "./grammar_quizz/negacion.json";
import numeros from "./grammar_quizz/numeros.json";
import preposicionDe from "./grammar_quizz/preposicion_de.json";
import preposicionesLugar from "./grammar_quizz/preposiciones_lugar.json";
import pretIndefinidoReg from "./grammar_quizz/preterito_indefinido_regulares.json";
import pretIndefinidoIrreg from "./grammar_quizz/preterito_indefinido_irregulares.json";

// --- TYPE ---
export type GrammarPoint = {
  id: string;
  title: string;
  level: "A1" | "A2" | "B1";
  note?: string;
  data: any;
};

// --- CONTENU ---
export const grammarPoints: GrammarPoint[] = [
  // PRESENTE
  {
    id: "presente_regulares",
    title: "Présent – verbes réguliers (-ar, -er, -ir)",
    level: "A1",
    note: "Conjugaison des verbes réguliers au présent.",
    data: presenteRegulares
  },
  {
    id: "presente_irregulares",
    title: "Présent – verbes irréguliers (tener, ser, ir, etc.)",
    level: "A1",
    note: "Conjugaison des principaux verbes irréguliers.",
    data: presenteIrregulares
  },
  {
    id: "presente_progresivo",
    title: "Présent progressif (estar + gerundio)",
    level: "A2",
    note: "Décrire des actions en cours.",
    data: presenteProgresivo
  },

  // SER / ESTAR
  {
    id: "ser_estar",
    title: "Ser vs Estar",
    level: "A1",
    note: "Différences entre ser et estar.",
    data: serEstar
  },
  {
    id: "hay_estar",
    title: "HAY vs ESTAR",
    level: "A1",
    note: "Exprimer l'existence vs la localisation.",
    data: hayEstar
  },

  // VERBES
  {
    id: "verbos_reflexivos",
    title: "Verbes pronominaux (reflexivos)",
    level: "A1",
    note: "Utilisation des verbes pronominaux.",
    data: reflexivos
  },
  {
    id: "gustar",
    title: "GUSTAR et verbes similaires",
    level: "A1",
    note: "Structure inversée : me gusta...",
    data: gustar
  },

  // PRETÉRITO
  {
    id: "indefinido_regulares",
    title: "Passé simple – verbes réguliers",
    level: "A2",
    note: "Conjugaison du passé simple.",
    data: pretIndefinidoReg
  },
  {
    id: "indefinido_irregulares",
    title: "Passé simple – verbes irréguliers",
    level: "A2",
    note: "Verbes irréguliers du passé simple.",
    data: pretIndefinidoIrreg
  },
  {
    id: "imperfecto",
    title: "Imparfait – actions habituelles",
    level: "A2",
    note: "Décrire des habitudes et situations passées.",
    data: imperfecto
  },

  // FUTUR
  {
    id: "futuro_simple_regulares",
    title: "Futur simple – verbes réguliers",
    level: "A2",
    note: "Actions futures.",
    data: futuroSimpleReg
  },
  {
    id: "futuro_simple_irregulares",
    title: "Futur simple – verbes irréguliers",
    level: "A2",
    note: "Radicaux irréguliers au futur.",
    data: futuroSimpleIrreg
  },

  // ARTICLES
  {
    id: "articulos_definidos",
    title: "Articles définis (el, la, los, las)",
    level: "A1",
    note: "Le, la, les en espagnol.",
    data: articulosDefinidos
  },
  {
    id: "articulos_indefinidos",
    title: "Articles indéfinis (un, una, unos, unas)",
    level: "A1",
    note: "Un, une, des en espagnol.",
    data: articulosIndefinidos
  },

  // NOMS
  {
    id: "genero",
    title: "Genre des noms (el / la)",
    level: "A1",
    note: "Masculin / féminin.",
    data: genero
  },

  // PRONOMS
  {
    id: "posesivos",
    title: "Adjectifs possessifs",
    level: "A1",
    note: "mi, tu, su...",
    data: posesivos
  },
  {
    id: "demostrativos",
    title: "Adjectifs démonstratifs",
    level: "A1",
    note: "este, ese, aquel...",
    data: demostrativos
  },

  // ADJECTIFS
  {
    id: "adjetivos",
    title: "Accord des adjectifs",
    level: "A1",
    note: "Accord en genre et en nombre.",
    data: adjetivos
  },

  // ADVERBES
  {
    id: "adverbios_frecuencia",
    title: "Adverbes de fréquence",
    level: "A1",
    note: "siempre, a veces, nunca...",
    data: adverbiosFrecuencia
  },
  {
    id: "muy_vs_mucho",
    title: "MUY vs MUCHO",
    level: "A1",
    note: "Différences d'usage.",
    data: muyVsMucho
  },

  // INTERROGATION & NÉGATION
  {
    id: "interrogativos",
    title: "Mots interrogatifs",
    level: "A1",
    note: "¿Qué?, ¿Dónde?, ¿Cuándo?...",
    data: interrogativos
  },
  {
    id: "negacion",
    title: "La négation",
    level: "A1",
    note: "no, nada, nadie, nunca...",
    data: negacion
  },

  // PRÉPOSITIONS
  {
    id: "preposicion_de",
    title: "Préposition DE",
    level: "A1",
    note: "Possession, origine, matière.",
    data: preposicionDe
  },
  {
    id: "preposiciones_lugar",
    title: "Prépositions de lieu",
    level: "A1",
    note: "en, sobre, debajo de...",
    data: preposicionesLugar
  },

  // NOMBRES & QUOTIDIEN
  {
    id: "numeros",
    title: "Les nombres (0-1000)",
    level: "A1",
    note: "Compter et exprimer des quantités.",
    data: numeros
  },
  {
    id: "cotidiano_basics",
    title: "Phrases du quotidien",
    level: "A1",
    note: "Expressions courantes.",
    data: cotidianoBasics
  }
];
