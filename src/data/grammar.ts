// src/data/grammar.ts
// COMPLETE VERSION - All grammar points imported

// --- IMPORTS DES FICHIERS JSON ---
// Presente
import presenteRegulares from "./grammar_quizz/presente_regulares.json";
import presenteIrregulares from "./grammar_quizz/presente_irregulares.json";
import presenteProgresivo from "./grammar_quizz/presente_progresivo.json";

// Passé
import imperfecto from "./grammar_quizz/imperfecto.json";
import preteritoIndefinidoReg from "./grammar_quizz/preterito_indefinido_regulares.json";
import preteritoIndefinidoIrreg from "./grammar_quizz/preterito_indefinido_irregulares.json";
import pasadosComparacion from "./grammar_quizz/pasados_comparacion.json";

// Futur
import futuroSimpleReg from "./grammar_quizz/futuro_simple_regulares.json";
import futuroSimpleIrreg from "./grammar_quizz/futuro_simple_irregulares.json";

// Ser/Estar
import serEstar from "./grammar_quizz/ser_estar.json";
import hayEstar from "./grammar_quizz/hay_estar.json";

// Verbes
import reflexivos from "./grammar_quizz/verbos_reflexivos.json";
import gustar from "./grammar_quizz/gustar.json";

// Articles
import articulosDefinidos from "./grammar_quizz/articulos_definidos.json";
import articulosIndefinidos from "./grammar_quizz/articulos_indefinidos.json";

// Noms
import genero from "./grammar_quizz/genero_sustantivos.json";
import plural from "./grammar_quizz/plural.json";

// Pronoms
import pronombres from "./grammar_quizz/pronombres.json";
import pronombresComplemento from "./grammar_quizz/pronombres_complemento.json";
import pronombresRelativos from "./grammar_quizz/pronombres_relativos.json";
import posesivos from "./grammar_quizz/posesivos.json";
import demostrativos from "./grammar_quizz/demostrativos.json";

// Adjectifs
import adjetivos from "./grammar_quizz/acuerdo_adjetivos.json";
import comparativos from "./grammar_quizz/comparativos.json";
import superlativos from "./grammar_quizz/superlativos.json";

// Adverbes
import adverbiosFrecuencia from "./grammar_quizz/adverbios_frecuencia.json";
import muyVsMucho from "./grammar_quizz/muy_vs_mucho.json";

// Interrogation
import interrogativos from "./grammar_quizz/interrogatives.json";
import cualVsQue from "./grammar_quizz/cual_vs_que.json";

// Négation
import negacion from "./grammar_quizz/negacion.json";

// Prépositions
import preposicionDe from "./grammar_quizz/preposicion_de.json";
import preposicionesAEnDe from "./grammar_quizz/preposiciones_a_en_de.json";
import preposicionesLugar from "./grammar_quizz/preposiciones_lugar.json";
import porVsPara from "./grammar_quizz/por_vs_para.json";

// Pratique
import numeros from "./grammar_quizz/numeros.json";
import laHora from "./grammar_quizz/la_hora.json";
import cotidianoBasics from "./grammar_quizz/cotidiano_basics.json";
import weather from "./grammar_quizz/weather.json";

// --- TYPE ---
export type GrammarPoint = {
  id: string;
  title: string;
  level: "A1" | "A2" | "B1" | "A1-A2" | "A2-B1";
  note?: string;
  data: any;
};

// --- CONTENU ORGANISÉ PAR CATÉGORIE ---
export const grammarPoints: GrammarPoint[] = [
  // ========== VERBES - PRÉSENT ==========
  {
    id: "presente_regulares",
    title: "Présent – verbes réguliers (-ar, -er, -ir)",
    level: "A1",
    note: "Conjugaison des verbes réguliers au présent.",
    data: presenteRegulares
  },
  {
    id: "presente_irregulares",
    title: "Présent – verbes irréguliers (tener, ser, ir, hacer, venir, decir...)",
    level: "A1",
    note: "Conjugaison des principaux verbes irréguliers.",
    data: presenteIrregulares
  },
  {
    id: "presente_progresivo",
    title: "Présent progressif (estar + gérondif)",
    level: "A2",
    note: "Décrire des actions en cours.",
    data: presenteProgresivo
  },

  // ========== SER / ESTAR ==========
  {
    id: "ser_estar",
    title: "SER vs ESTAR – Les différences complètes",
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

  // ========== VERBES SPÉCIAUX ==========
  {
    id: "verbos_reflexivos",
    title: "Les verbes réflexifs",
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

  // ========== TEMPS DU PASSÉ ==========
  {
    id: "pasados_comparacion",
    title: "Passé composé vs Passé simple vs Imparfait",
    level: "A2",
    note: "Comprendre quand utiliser chaque temps.",
    data: pasadosComparacion
  },
  {
    id: "imperfecto",
    title: "Imparfait – actions habituelles et descriptions",
    level: "A2",
    note: "Décrire des habitudes et situations passées.",
    data: imperfecto
  },
  {
    id: "preterito_indefinido_regulares",
    title: "Passé simple – verbes réguliers",
    level: "A2",
    note: "Actions passées terminées.",
    data: preteritoIndefinidoReg
  },
  {
    id: "preterito_indefinido_irregulares",
    title: "Passé simple – verbes irréguliers",
    level: "A2",
    note: "Radicaux irréguliers.",
    data: preteritoIndefinidoIrreg
  },

  // ========== FUTUR ==========
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

  // ========== ARTICLES ==========
  {
    id: "articulos_definidos",
    title: "Articles définis (el, la, los, las)",
    level: "A1",
    note: "Les articles définis.",
    data: articulosDefinidos
  },
  {
    id: "articulos_indefinidos",
    title: "Articles indéfinis (un, una, unos, unas)",
    level: "A1",
    note: "Les articles indéfinis.",
    data: articulosIndefinidos
  },

  // ========== NOMS ==========
  {
    id: "genero",
    title: "Genre des noms (el / la)",
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

  // ========== PRONOMS ==========
  {
    id: "pronombres",
    title: "Pronoms personnels sujets",
    level: "A1",
    note: "yo, tú, él, ella...",
    data: pronombres
  },
  {
    id: "pronombres_complemento",
    title: "Pronoms compléments (COD et COI)",
    level: "A2",
    note: "me, te, lo, la, le...",
    data: pronombresComplemento
  },
  {
    id: "pronombres_relativos",
    title: "Pronoms relatifs (que, quien, donde, cual)",
    level: "A2",
    note: "Relier deux phrases.",
    data: pronombresRelativos
  },
  {
    id: "posesivos",
    title: "Les adjectifs et pronoms possessifs",
    level: "A1",
    note: "mi, tu, su...",
    data: posesivos
  },
  {
    id: "demostrativos",
    title: "Les démonstratifs (este, ese, aquel)",
    level: "A1",
    note: "este, ese, aquel...",
    data: demostrativos
  },

  // ========== ADJECTIFS ==========
  {
    id: "adjetivos",
    title: "Accord des adjectifs",
    level: "A1",
    note: "Accord en genre et en nombre.",
    data: adjetivos
  },
  {
    id: "comparativos",
    title: "Les comparatifs",
    level: "A2",
    note: "más que, tan como, menos que...",
    data: comparativos
  },
  {
    id: "superlativos",
    title: "Les superlatifs",
    level: "A2",
    note: "el más..., -ísimo...",
    data: superlativos
  },

  // ========== ADVERBES ==========
  {
    id: "adverbios_frecuencia",
    title: "Les adverbes de fréquence",
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

  // ========== INTERROGATION & NÉGATION ==========
  {
    id: "interrogativos",
    title: "Les mots interrogatifs",
    level: "A1",
    note: "¿Qué?, ¿Dónde?, ¿Cuándo?...",
    data: interrogativos
  },
  {
    id: "cual_vs_que",
    title: "CUÁL vs QUÉ (interrogatifs)",
    level: "A2",
    note: "Différences entre cuál et qué.",
    data: cualVsQue
  },
  {
    id: "negacion",
    title: "La négation en espagnol",
    level: "A1",
    note: "no, nada, nadie, nunca...",
    data: negacion
  },

  // ========== PRÉPOSITIONS ==========
  {
    id: "preposicion_de",
    title: "Préposition DE (possession, origine, matière, contenu)",
    level: "A1",
    note: "Usages de la préposition DE.",
    data: preposicionDe
  },
  {
    id: "preposiciones_a_en_de",
    title: "Prépositions A, EN, DE",
    level: "A1",
    note: "Les prépositions principales.",
    data: preposicionesAEnDe
  },
  {
    id: "preposiciones_lugar",
    title: "Les prépositions de lieu",
    level: "A1",
    note: "en, sobre, debajo de...",
    data: preposicionesLugar
  },
  {
    id: "por_vs_para",
    title: "POR vs PARA",
    level: "A2",
    note: "Différences entre por et para.",
    data: porVsPara
  },

  // ========== PRATIQUE QUOTIDIENNE ==========
  {
    id: "numeros",
    title: "Les nombres en espagnol (0–1000)",
    level: "A1",
    note: "Compter et exprimer des quantités.",
    data: numeros
  },
  {
    id: "la_hora",
    title: "L'heure en espagnol",
    level: "A1",
    note: "Dire l'heure.",
    data: laHora
  },
  {
    id: "cotidiano_basics",
    title: "Phrases et vocabulaire du quotidien",
    level: "A1",
    note: "Expressions courantes.",
    data: cotidianoBasics
  },
  {
    id: "weather",
    title: "Parler de la météo",
    level: "A1",
    note: "Décrire le temps qu'il fait.",
    data: weather
  }
];