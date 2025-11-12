// src/data/grammar.ts

export type GrammarPoint = {
  id: string;
  title: string;
  level: "A1" | "A2" | "B1";
  note?: string;
  src: string;
};

export const grammarPoints: GrammarPoint[] = [
  // -----------------------
  // Présent
  // -----------------------
  {
    id: "presente_regulares",
    title: "Présent – verbes réguliers (-ar, -er, -ir)",
    level: "A1",
    note: "Conjugaison de base au présent pour les verbes réguliers.",
    src: "/src/data/grammar_quizz/presente_regulares.json"
  },
  {
    id: "presente_irregulares",
    title: "Présent – verbes irréguliers (tener, ser, ir, etc.)",
    level: "A1",
    note: "Verbes irréguliers fréquents : ser, estar, ir, tener, venir, hacer...",
    src: "/src/data/grammar_quizz/presente_irregulares.json"
  },

  // -----------------------
  // Passé simple (indefinido)
  // -----------------------
  {
    id: "preterito_indefinido_regulares",
    title: "Passé simple – verbes réguliers",
    level: "A2",
    note: "Formes en -é, -aste, -ó, etc. pour -ar, -er, -ir.",
    src: "/src/data/grammar_quizz/preterito_indefinido_regulares.json"
  },
  {
    id: "preterito_indefinido_irregulares",
    title: "Passé simple – verbes irréguliers",
    level: "A2",
    note: "Dar, ver, ir, ser, estar, tener, venir, decir...",
    src: "/src/data/grammar_quizz/preterito_indefinido_irregulares.json"
  },

  // -----------------------
  // Imparfait
  // -----------------------
  {
    id: "imperfecto",
    title: "Imparfait – actions habituelles dans le passé",
    level: "A2",
    note: "Terminaisons -aba / -ía, expressions de durée et d’habitude.",
    src: "/src/data/grammar_quizz/imperfecto.json"
  },

  // -----------------------
  // Futur simple
  // -----------------------
  {
    id: "futuro_simple_regulares",
    title: "Futur simple – verbes réguliers",
    level: "A2",
    note: "Formation : infinitif + é, ás, á, emos, éis, án.",
    src: "/src/data/grammar_quizz/futuro_simple_regulares.json"
  },
  {
    id: "futuro_simple_irregulares",
    title: "Futur simple – verbes irréguliers",
    level: "A2",
    note: "Tendrás, haré, vendré, sabré, podré...",
    src: "/src/data/grammar_quizz/futuro_simple_irregulares.json"
  },

  // -----------------------
  // Vie quotidienne
  // -----------------------
  {
    id: "cotidiano_basics",
    title: "Phrases et vocabulaire du quotidien",
    level: "A1",
    note: "Formules de politesse, routines, expressions courantes.",
    src: "/src/data/grammar_quizz/cotidiano_basics.json"
  },

  // -----------------------
  // Genre et articles
  // -----------------------
  {
    id: "genero_sustantivos",
    title: "Genre des noms (el/la)",
    level: "A1",
    note: "Règles générales de genre et exceptions.",
    src: "/src/data/grammar_quizz/genero_sustantivos.json"
  },
  {
    id: "articulos_definidos",
    title: "Articles définis (el, la, los, las)",
    level: "A1",
    note: "Articles utilisés pour parler de choses connues.",
    src: "/src/data/grammar_quizz/articulos_definidos.json"
  },
  {
    id: "articulos_indefinidos",
    title: "Articles indéfinis (un, una, unos, unas)",
    level: "A1",
    note: "Articles utilisés pour parler de choses non précisées.",
    src: "/src/data/grammar_quizz/articulos_indefinidos.json"
  },
  {
    id: "acuerdo_adjetivos",
    title: "Accord des adjectifs",
    level: "A1",
    note: "Les adjectifs s’accordent en genre et en nombre avec le nom.",
    src: "/src/data/grammar_quizz/acuerdo_adjetivos.json"
  },

  // -----------------------
  // Prépositions et démonstratifs
  // -----------------------
  {
    id: "preposicion_de",
    title: "Préposition DE (possession, origine, matière)",
    level: "A1",
    note: "Utilisation de 'de' avec contraction obligatoire (del).",
    src: "/src/data/grammar_quizz/preposicion_de.json"
  },
  {
    id: "demostrativos",
    title: "Démonstratifs (este, ese, aquel)",
    level: "A1",
    note: "Exprimer la distance : près (este), moyen (ese), loin (aquel).",
    src: "/src/data/grammar_quizz/demostrativos.json"
  },

  // -----------------------
  // Autres points A1
  // -----------------------
  {
    id: "ser_estar",
    title: "Ser vs Estar",
    level: "A1",
    note: "SER pour l’essence, ESTAR pour l’état ou la position.",
    src: "/src/data/grammar_quizz/ser_estar.json"
  },
  {
    id: "gustar",
    title: "Gustar et verbes similaires",
    level: "A1",
    note: "Structure inverse : me gusta, te gusta, le gustan...",
    src: "/src/data/grammar_quizz/gustar.json"
  },
  {
    id: "hay_estar",
    title: "Hay vs Estar",
    level: "A1",
    note: "HAY = il y a, ESTAR = se trouver à un endroit.",
    src: "/src/data/grammar_quizz/hay_estar.json"
  },
  {
    id: "adverbios_frecuencia",
    title: "Adverbes de fréquence",
    level: "A1",
    note: "Siempre, nunca, a veces, normalmente…",
    src: "/src/data/grammar_quizz/adverbios_frecuencia.json"
  },
  {
    id: "numeros",
    title: "Les nombres (0–1000)",
    level: "A1",
    note: "Nombres cardinaux et usage en contexte (âge, prix...).",
    src: "/src/data/grammar_quizz/numeros.json"
  }
];