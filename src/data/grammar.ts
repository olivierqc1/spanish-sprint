// src/data/grammar.ts

// --- IMPORTS DES FICHIERS JSON ---
import presenteRegulares from "./grammar_quizz/presente_regulares.json";
import presenteIrregulares from "./grammar_quizz/presente_irregulares.json";
import presenteProgresivo from "./grammar_quizz/presente_progresivo.json";
import serEstar from "./grammar_quizz/ser_estar.json";
import reflexivos from "./grammar_quizz/verbos_reflexivos.json";
import pretIndefinidoReg from "./grammar_quizz/preterito_indefinido_regulares.json";
import pretIndefinidoIrreg from "./grammar_quizz/preterito_indefinido_irregulares.json";
import articulosDefinidos from "./grammar_quizz/articulos_definidos.json";
import articulosIndefinidos from "./grammar_quizz/articulos_indefinidos.json";
import genero from "./grammar_quizz/genero_sustantivos.json";
import plural from "./grammar_quizz/plural.json";
import pronombres from "./grammar_quizz/pronombres.json";
import posesivos from "./grammar_quizz/posesivos.json";
import demostrativos from "./grammar_quizz/demostrativos.json";
import adjetivos from "./grammar_quizz/acuerdo_adjetivos.json";
import comparativos from "./grammar_quizz/comparativos.json";
import superlativos from "./grammar_quizz/superlativos.json";

// --- TYPE ---
export type GrammarPoint = {
  id: string;
  title: string;
  level: "A1" | "A2" | "B1";
  note?: string;
  data: any; // les exercices JSON importés directement
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
    level: "A1",
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

  // VERBES REFLEXIVOS
  {
    id: "verbos_reflexivos",
    title: "Verbes pronominaux (reflexivos)",
    level: "A1",
    note: "Utilisation des verbes pronominaux.",
    data: reflexivos
  },

  // PRETÉRITO INDEFINIDO
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

  // NOM & ADJECTIF
  {
    id: "genero",
    title: "Genre des noms",
    level: "A1",
    note: "Masculin / féminin.",
    data: genero
  },
  {
    id: "plural",
    title: "Pluriel des noms",
    level: "A1",
    note: "Formation du pluriel.",
    data: plural
  },

  // PRONOMS
  {
    id: "pronombres",
    title: "Pronoms personnels",
    level: "A1",
    note: "yo, tú, él, nosotros...",
    data: pronombres
  },
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

  // ADJECTIFS + COMPARAISONS
  {
    id: "adjetivos",
    title: "Accord des adjectifs",
    level: "A1",
    note: "Accord en genre et en nombre.",
    data: adjetivos
  },
  {
    id: "comparativos",
    title: "Comparatifs",
    level: "A2",
    note: "Plus que, moins que, aussi que...",
    data: comparativos
  },
  {
    id: "superlativos",
    title: "Superlatifs",
    level: "A2",
    note: "Le plus, le moins, -ísimo...",
    data: superlativos
  }
];
