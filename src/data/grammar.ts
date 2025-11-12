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
  // PRESENTE
  // -----------------------
  {
    id: "presente_regulares",
    title: "Présent – verbes réguliers (-ar, -er, -ir)",
    level: "A1",
    note: "Conjugaison des verbes réguliers au présent.",
    src: "/src/data/grammar_quizz/presente_regulares.json"
  },
  {
    id: "presente_irregulares",
    title: "Présent – verbes irréguliers (tener, ser, ir, etc.)",
    level: "A1",
    note: "Conjugaison des principaux verbes irréguliers.",
    src: "/src/data/grammar_quizz/presente_irregulares.json"
  },
  {
    id: "presente_progresivo",
    title: "Présent progressif (estar + gerundio)",
    level: "A1",
    note: "Indique une action en cours : estoy comiendo, estás leyendo...",
    src: "/src/data/grammar_quizz/presente_progresivo.json"
  },

  // -----------------------
  // PASADO (pretérito e imperfecto)
  // -----------------------
  {
    id: "preterito_indefinido_regulares",
    title: "Passé simple – verbes réguliers (-ar, -er, -ir)",
    level: "A2",
    note: "Actions terminées dans le passé, régulières.",
    src: "/src/data/grammar_quizz/preterito_indefinido_regulares.json"
  },
  {
    id: "preterito_indefinido_irregulares",
    title: "Passé simple – verbes irréguliers (tener, ir, decir, etc.)",
    level: "A2",
    note: "Formes irrégulières du passé simple.",
    src: "/src/data/grammar_quizz/preterito_indefinido_irregulares.json"
  },
  {
    id: "imperfecto",
    title: "Imparfait – actions habituelles et descriptions",
    level: "A2",
    note: "Décrit des actions répétées ou des états dans le passé.",
    src: "/src/data/grammar_quizz/imperfecto.json"
  },

  // -----------------------
  // FUTURO
  // -----------------------
  {
    id: "futuro_simple_regulares",
    title: "Futur simple – verbes réguliers",
    level: "A2",
    note: "Formation du futur à partir de l’infinitif : hablaré, comeré...",
    src: "/src/data/grammar_quizz/futuro_simple_regulares.json"
  },
  {
    id: "futuro_simple_irregulares",
    title: "Futur simple – verbes irréguliers",
    level: "A2",
    note: "Radicaux irréguliers : tendr-, podr-, sabr-, har-, dir-, etc.",
    src: "/src/data/grammar_quizz/futuro_simple_irregulares.json"
  },

  // -----------------------
  // ARTÍCULOS ET GENRE
  // -----------------------
  {
    id: "genero_sustantivos",
    title: "Genre des noms (el / la)",
    level: "A1",
    note: "Règles générales et exceptions du genre des noms.",
    src: "/src/data/grammar_quizz/genero_sustantivos.json"
  },
  {
    id: "articulos_definidos",
    title: "Articles définis (el, la, los, las)",
    level: "A1",
    note: "Articles pour désigner quelque chose de connu.",
    src: "/src/data/grammar_quizz/articulos_definidos.json"
  },
  {
    id: "articulos_indefinidos",
    title: "Articles indéfinis (un, una, unos, unas)",
    level: "A1",
    note: "Articles pour parler de choses non précisées.",
    src: "/src/data/grammar_quizz/articulos_indefinidos.json"
  },

  // -----------------------
  // ADJETIVOS / ADVERBIOS
  // -----------------------
  {
    id: "acuerdo_adjetivos",
    title: "Accord des adjectifs",
    level: "A1",
    note: "Les adjectifs s’accordent en genre et en nombre avec le nom.",
    src: "/src/data/grammar_quizz/acuerdo_adjetivos.json"
  },
  {
    id: "adverbios_frecuencia",
    title: "Adverbes de fréquence",
    level: "A1",
    note: "Siempre, nunca, a veces, normalmente…",
    src: "/src/data/grammar_quizz/adverbios_frecuencia.json"
  },
  {
    id: "muy_vs_mucho",
    title: "Muy vs Mucho",
    level: "A1",
    note: "MUY modifie un adjectif/adverbe, MUCHO un nom ou un verbe.",
    src: "/src/data/grammar_quizz/muy_vs_mucho.json"
  },

  // -----------------------
  // PREPOSICIONES
  // -----------------------
  {
    id: "preposiciones_lugar",
    title: "Prépositions de lieu",
    level: "A1",
    note: "en, sobre, debajo de, entre, cerca de, lejos de, delante de, detrás de...",
    src: "/src/data/grammar_quizz/preposiciones_lugar.json"
  },
  {
    id: "preposicion_de",
    title: "Préposition DE (possession, origine, matière, contenu)",
    level: "A1",
    note: "Exprime la possession, l’origine, la matière ou le contenu.",
    src: "/src/data/grammar_quizz/preposicion_de.json"
  },

  // -----------------------
  // DEMOSTRATIVOS Y POSESIVOS
  // -----------------------
  {
    id: "demostrativos",
    title: "Les démonstratifs (este, ese, aquel)",
    level: "A1",
    note: "Expriment la distance : près (este), moyen (ese), loin (aquel).",
    src: "/src/data/grammar_quizz/demostrativos.json"
  },
  {
    id: "posesivos",
    title: "Les possessifs (mi, tu, su, nuestro...)",
    level: "A1",
    note: "Les possessifs s’accordent avec le nom possédé, pas avec le possesseur.",
    src: "/src/data/grammar_quizz/posesivos.json"
  },

  // -----------------------
  // VERBOS ESPECIALES Y USOS
  // -----------------------
  {
    id: "ser_estar",
    title: "Ser vs Estar",
    level: "A1",
    note: "SER = essence, ESTAR = état ou position.",
    src: "/src/data/grammar_quizz/ser_estar.json"
  },
  {
    id: "hay_estar",
    title: "Hay vs Estar",
    level: "A1",
    note: "HAY = il y a, ESTAR = se trouver à un endroit.",
    src: "/src/data/grammar_quizz/hay_estar.json"
  },
  {
    id: "gustar",
    title: "Gustar et verbes similaires",
    level: "A1",
    note: "Structure inversée : me gusta, te gustan, le gusta...",
    src: "/src/data/grammar_quizz/gustar.json"
  },

  // -----------------------
  // NEGACIÓN / INTERROGACIÓN
  // -----------------------
  {
    id: "negacion",
    title: "La négation",
    level: "A1",
    note: "no, nunca, nada, nadie, tampoco, ni… ni…",
    src: "/src/data/grammar_quizz/negacion.json"
  },
  {
    id: "interrogatives",
    title: "Les mots interrogatifs",
    level: "A1",
    note: "Qué, Quién, Dónde, Cuándo, Cómo, Por qué, Cuánto.",
    src: "/src/data/grammar_quizz/interrogatives.json"
  },

  // -----------------------
  // NUMEROS Y VOCABULARIO BÁSICO
  // -----------------------
  {
    id: "numeros",
    title: "Les nombres (0–1000)",
    level: "A1",
    note: "Nombres cardinaux, usages pour l’âge, le prix, la quantité.",
    src: "/src/data/grammar_quizz/numeros.json"
  },
  {
    id: "cotidiano_basics",
    title: "Phrases et vocabulaire du quotidien",
    level: "A1",
    note: "Formules de politesse et expressions courantes.",
    src: "/src/data/grammar_quizz/cotidiano_basics.json"
  }
];