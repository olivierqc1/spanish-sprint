// Définir le type localement
export type GrammarPoint = {
  id: string;
  title: { fr: string; en: string };
  level: string;
  note: { fr: string; en: string };
  country: string;
  jsonPath: string;
};

export const grammarPoints: GrammarPoint[] = [
  {
    id: "presente_regulares",
    title: { 
      fr: "Présent – verbes réguliers (-ar, -er, -ir)",
      en: "Present tense – regular verbs (-ar, -er, -ir)"
    },
    level: "A1",
    note: {
      fr: "Conjugaison des verbes réguliers au présent.",
      en: "Conjugation of regular verbs in the present tense."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/presente_regulares.json"
  },
  {
    id: "presente_irregulares",
    title: {
      fr: "Présent – verbes irréguliers (tener, ser, ir, hacer, venir, decir...)",
      en: "Present tense – irregular verbs (tener, ser, ir, hacer, venir, decir...)"
    },
    level: "A1",
    note: {
      fr: "Conjugaison des principaux verbes irréguliers au présent.",
      en: "Conjugation of main irregular verbs in the present tense."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/presente_irregulares.json"
  },
  {
    id: "ser_estar",
    title: {
      fr: "SER vs ESTAR – Les différences complètes",
      en: "SER vs ESTAR – Complete differences"
    },
    level: "A1-A2",
    note: {
      fr: "Comprendre quand utiliser SER ou ESTAR.",
      en: "Understanding when to use SER or ESTAR."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/ser_estar.json"
  },
  {
    id: "hay_estar",
    title: {
      fr: "HAY vs ESTAR",
      en: "HAY vs ESTAR"
    },
    level: "A1-A2",
    note: {
      fr: "Différence entre HAY (il y a) et ESTAR (être situé).",
      en: "Difference between HAY (there is/are) and ESTAR (to be located)."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/hay_estar.json"
  },
  {
    id: "gustar",
    title: {
      fr: "GUSTAR et verbes similaires",
      en: "GUSTAR and similar verbs"
    },
    level: "A1-A2",
    note: {
      fr: "Structure du verbe GUSTAR (plaire) et verbes similaires.",
      en: "Structure of the verb GUSTAR (to like) and similar verbs."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/gustar.json"
  },
  {
    id: "articulos_definidos",
    title: {
      fr: "Articles définis (el, la, los, las)",
      en: "Definite articles (el, la, los, las)"
    },
    level: "A1",
    note: {
      fr: "Usage des articles définis en espagnol.",
      en: "Usage of definite articles in Spanish."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/articulos_definidos.json"
  },
  {
    id: "articulos_indefinidos",
    title: {
      fr: "Articles indéfinis (un, una, unos, unas)",
      en: "Indefinite articles (un, una, unos, unas)"
    },
    level: "A1",
    note: {
      fr: "Usage des articles indéfinis en espagnol.",
      en: "Usage of indefinite articles in Spanish."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/articulos_indefinidos.json"
  },
  {
    id: "genero_sustantivos",
    title: {
      fr: "Genre des noms (el / la)",
      en: "Gender of nouns (el / la)"
    },
    level: "A1",
    note: {
      fr: "Règles pour déterminer le genre des noms.",
      en: "Rules for determining the gender of nouns."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/genero_sustantivos.json"
  },
  {
    id: "plural",
    title: {
      fr: "Pluriel des noms",
      en: "Plural of nouns"
    },
    level: "A1",
    note: {
      fr: "Formation du pluriel en espagnol.",
      en: "Formation of the plural in Spanish."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/plural.json"
  },
  {
    id: "acuerdo_adjetivos",
    title: {
      fr: "Accord des adjectifs",
      en: "Agreement of adjectives"
    },
    level: "A1",
    note: {
      fr: "Accord des adjectifs en genre et en nombre.",
      en: "Agreement of adjectives in gender and number."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/acuerdo_adjetivos.json"
  },
  {
    id: "demostrativos",
    title: {
      fr: "Les démonstratifs (este, ese, aquel)",
      en: "Demonstratives (este, ese, aquel)"
    },
    level: "A1",
    note: {
      fr: "Adjectifs et pronoms démonstratifs.",
      en: "Demonstrative adjectives and pronouns."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/demostrativos.json"
  },
  {
    id: "posesivos",
    title: {
      fr: "Les adjectifs et pronoms possessifs",
      en: "Possessive adjectives and pronouns"
    },
    level: "A1-A2",
    note: {
      fr: "Adjectifs possessifs (mi, tu, su) et pronoms possessifs.",
      en: "Possessive adjectives (mi, tu, su) and possessive pronouns."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/posesivos.json"
  },
  {
    id: "pronombres_posesivos",
    title: {
      fr: "Pronoms possessifs (mío, tuyo, suyo...)",
      en: "Possessive pronouns (mío, tuyo, suyo...)"
    },
    level: "A2",
    note: {
      fr: "Utilisation des pronoms possessifs détachés.",
      en: "Use of standalone possessive pronouns."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/pronombres_posesivos.json"
  },
  {
    id: "pronombres",
    title: {
      fr: "Pronoms personnels sujets",
      en: "Subject personal pronouns"
    },
    level: "A1",
    note: {
      fr: "Pronoms personnels sujets (yo, tú, él...).",
      en: "Subject personal pronouns (yo, tú, él...)."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/pronombres.json"
  },
  {
    id: "pronombres_complemento",
    title: {
      fr: "Pronoms compléments (COD et COI)",
      en: "Object pronouns (direct and indirect)"
    },
    level: "A2",
    note: {
      fr: "Pronoms compléments d'objet direct et indirect.",
      en: "Direct and indirect object pronouns."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/pronombres_complemento.json"
  },
  {
    id: "pronombres_relativos",
    title: {
      fr: "Pronoms relatifs (que, quien, donde, cual)",
      en: "Relative pronouns (que, quien, donde, cual)"
    },
    level: "A2-B1",
    note: {
      fr: "Pronoms relatifs pour relier deux propositions.",
      en: "Relative pronouns to connect two clauses."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/pronombres_relativos.json"
  },
  {
    id: "preposiciones_a_en_de",
    title: {
      fr: "Prépositions A, EN, DE",
      en: "Prepositions A, EN, DE"
    },
    level: "A1-A2",
    note: {
      fr: "Utilisation des prépositions principales.",
      en: "Use of main prepositions."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/preposiciones_a_en_de.json"
  },
  {
    id: "preposicion_de",
    title: {
      fr: "Préposition DE (possession, origine, matière, contenu)",
      en: "Preposition DE (possession, origin, material, content)"
    },
    level: "A1",
    note: {
      fr: "Les différents usages de la préposition DE.",
      en: "Different uses of the preposition DE."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/preposicion_de.json"
  },
  {
    id: "preposiciones_lugar",
    title: {
      fr: "Les prépositions de lieu",
      en: "Prepositions of place"
    },
    level: "A1-A2",
    note: {
      fr: "Prépositions pour indiquer la position.",
      en: "Prepositions to indicate position."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/preposiciones_lugar.json"
  },
  {
    id: "por_vs_para",
    title: {
      fr: "POR vs PARA",
      en: "POR vs PARA"
    },
    level: "A2",
    note: {
      fr: "Différence entre POR et PARA.",
      en: "Difference between POR and PARA."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/por_vs_para.json"
  },
  {
    id: "muy_vs_mucho",
    title: {
      fr: "MUY vs MUCHO",
      en: "MUY vs MUCHO"
    },
    level: "A1-A2",
    note: {
      fr: "Différence entre MUY et MUCHO.",
      en: "Difference between MUY and MUCHO."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/muy_vs_mucho.json"
  },
  {
    id: "negacion",
    title: {
      fr: "La négation en espagnol",
      en: "Negation in Spanish"
    },
    level: "A1-A2",
    note: {
      fr: "Formation de la négation (no, nada, nadie, nunca...).",
      en: "Formation of negation (no, nada, nadie, nunca...)."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/negacion.json"
  },
  {
    id: "interrogativos",
    title: {
      fr: "Les mots interrogatifs",
      en: "Interrogative words"
    },
    level: "A1-A2",
    note: {
      fr: "Mots interrogatifs (qué, quién, dónde, cuándo...).",
      en: "Interrogative words (qué, quién, dónde, cuándo...)."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/interrogatives.json"
  },
  {
    id: "cual_vs_que",
    title: {
      fr: "CUÁL vs QUÉ (interrogatifs)",
      en: "CUÁL vs QUÉ (interrogatives)"
    },
    level: "A2",
    note: {
      fr: "Différence entre CUÁL et QUÉ dans les questions.",
      en: "Difference between CUÁL and QUÉ in questions."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/cual_vs_que.json"
  },
  {
    id: "comparativos",
    title: {
      fr: "Les comparatifs",
      en: "Comparatives"
    },
    level: "A2",
    note: {
      fr: "Comparatifs de supériorité, égalité et infériorité.",
      en: "Comparatives of superiority, equality, and inferiority."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/comparativos.json"
  },
  {
    id: "superlativos",
    title: {
      fr: "Les superlatifs",
      en: "Superlatives"
    },
    level: "A2",
    note: {
      fr: "Superlatifs relatifs et absolus.",
      en: "Relative and absolute superlatives."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/superlativos.json"
  },
  {
    id: "numeros",
    title: {
      fr: "Les nombres en espagnol (0–1000)",
      en: "Numbers in Spanish (0–1000)"
    },
    level: "A1",
    note: {
      fr: "Nombres cardinaux de 0 à 1000.",
      en: "Cardinal numbers from 0 to 1000."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/numeros.json"
  },
  {
    id: "numeros_ordinales",
    title: {
      fr: "Les nombres ordinaux (primero, segundo, tercero...)",
      en: "Ordinal numbers (primero, segundo, tercero...)"
    },
    level: "A1",
    note: {
      fr: "Nombres ordinaux et leur utilisation.",
      en: "Ordinal numbers and their use."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/numeros_ordinales.json"
  },
  {
    id: "la_hora",
    title: {
      fr: "L'heure en espagnol",
      en: "Telling time in Spanish"
    },
    level: "A1",
    note: {
      fr: "Comment dire l'heure en espagnol.",
      en: "How to tell time in Spanish."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/la_hora.json"
  },
  {
    id: "weather",
    title: {
      fr: "Parler de la météo",
      en: "Talking about the weather"
    },
    level: "A1",
    note: {
      fr: "Expressions pour parler du temps qu'il fait.",
      en: "Expressions for talking about the weather."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/weather.json"
  },
  {
    id: "verbos_reflexivos",
    title: {
      fr: "Les verbes réflexifs",
      en: "Reflexive verbs"
    },
    level: "A1-A2",
    note: {
      fr: "Verbes pronominaux (levantarse, ducharse...).",
      en: "Reflexive verbs (levantarse, ducharse...)."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/verbos_reflexivos.json"
  },
  {
    id: "presente_progresivo",
    title: {
      fr: "Le présent progressif (estar + gérondif)",
      en: "Present progressive (estar + gerund)"
    },
    level: "A2",
    note: {
      fr: "Formation et utilisation du présent progressif.",
      en: "Formation and use of the present progressive."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/presente_progresivo.json"
  },
  {
    id: "preterito_indefinido_regulares",
    title: {
      fr: "Passé simple – verbes réguliers (-ar, -er, -ir)",
      en: "Preterite – regular verbs (-ar, -er, -ir)"
    },
    level: "A2",
    note: {
      fr: "Conjugaison des verbes réguliers au passé simple.",
      en: "Conjugation of regular verbs in the preterite."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/preterito_indefinido_regulares.json"
  },
  {
    id: "preterito_indefinido_irregulares",
    title: {
      fr: "Passé simple – verbes irréguliers",
      en: "Preterite – irregular verbs"
    },
    level: "A2",
    note: {
      fr: "Conjugaison des verbes irréguliers au passé simple.",
      en: "Conjugation of irregular verbs in the preterite."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/preterito_indefinido_irregulares.json"
  },
  {
    id: "preterito_irregulares_visual",
    title: {
      fr: "Passé simple – Verbes irréguliers (Pretérito Indefinido)",
      en: "Preterite – Irregular verbs (Pretérito Indefinido)"
    },
    level: "A2",
    note: {
      fr: "Version visuelle détaillée des verbes irréguliers au passé simple.",
      en: "Detailed visual version of irregular verbs in the preterite."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/preterito_irregulares_bilingual.json"
  },
  {
    id: "imperfecto",
    title: {
      fr: "Imparfait – actions habituelles et descriptions",
      en: "Imperfect – habitual actions and descriptions"
    },
    level: "A2",
    note: {
      fr: "Conjugaison et utilisation de l'imparfait.",
      en: "Conjugation and use of the imperfect."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/imperfecto.json"
  },
  {
    id: "pasados_comparacion",
    title: {
      fr: "Passé composé vs Passé simple vs Imparfait",
      en: "Present perfect vs Preterite vs Imperfect"
    },
    level: "A2",
    note: {
      fr: "Différences entre les temps du passé.",
      en: "Differences between past tenses."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/pasados_comparacion.json"
  },
  {
    id: "futuro_simple_regulares",
    title: {
      fr: "Futur simple – verbes réguliers",
      en: "Simple future – regular verbs"
    },
    level: "A2",
    note: {
      fr: "Formation du futur simple pour les verbes réguliers.",
      en: "Formation of the simple future for regular verbs."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/futuro_simple_regulares.json"
  },
  {
    id: "futuro_simple_irregulares",
    title: {
      fr: "Futur simple – verbes irréguliers",
      en: "Simple future – irregular verbs"
    },
    level: "A2",
    note: {
      fr: "Radicaux irréguliers au futur simple.",
      en: "Irregular stems in the simple future."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/futuro_simple_irregulares.json"
  },
  {
    id: "cuesta_costar",
    title: {
      fr: "Le verbe COSTAR (cuesta) - Prix et difficulté",
      en: "The verb COSTAR (cuesta) - Price and difficulty"
    },
    level: "A2",
    note: {
      fr: "Les deux sens du verbe COSTAR (coûter / être difficile).",
      en: "The two meanings of the verb COSTAR (to cost / to be difficult)."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/cuesta_costar.json"
  },
  {
    id: "ser_vs_sentirse",
    title: {
      fr: "SER vs SENTIRSE - Les différences",
      en: "SER vs SENTIRSE - The differences"
    },
    level: "A2",
    note: {
      fr: "Différence entre SER (être) et SENTIRSE (se sentir).",
      en: "Difference between SER (to be) and SENTIRSE (to feel)."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/ser_vs_sentirse.json"
  },
  {
    id: "adverbios_frecuencia",
    title: {
      fr: "Les adverbes de fréquence",
      en: "Adverbs of frequency"
    },
    level: "A1-A2",
    note: {
      fr: "Adverbes de fréquence (siempre, nunca, a veces...).",
      en: "Adverbs of frequency (siempre, nunca, a veces...)."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/adverbios_frecuencia.json"
  },
  {
    id: "direcciones",
    title: {
      fr: "Donner et comprendre des directions",
      en: "Giving and understanding directions"
    },
    level: "A1",
    note: {
      fr: "Vocabulaire et expressions pour donner des directions.",
      en: "Vocabulary and expressions for giving directions."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/direcciones.json"
  },
  {
    id: "cotidiano_basics",
    title: {
      fr: "Phrases et vocabulaire du quotidien",
      en: "Everyday phrases and vocabulary"
    },
    level: "A1",
    note: {
      fr: "Expressions courantes pour la vie de tous les jours.",
      en: "Common expressions for everyday life."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/cotidiano_basics.json"
  },
  {
    id: "participios_como_adjetivos",
    title: {
      fr: "Participes passés comme adjectifs (estar + participio)",
      en: "Past participles as adjectives (estar + participio)"
    },
    level: "A2",
    note: {
      fr: "Utilisation des participes passés avec ESTAR pour décrire un état.",
      en: "Using past participles with ESTAR to describe a state."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/participios_como_adjetivos.json"
  },
  {
    id: "desde_vs_desde_hace",
    title: {
      fr: "DESDE vs DESDE HACE – Exprimer la durée",
      en: "DESDE vs DESDE HACE – Expressing duration"
    },
    level: "A2",
    note: {
      fr: "Différence entre DESDE (point précis) et DESDE HACE (durée).",
      en: "Difference between DESDE (specific point) and DESDE HACE (duration)."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/desde_vs_desde_hace.json"
  },
  {
    id: "parecer_vs_parecerse_a",
    title: {
      fr: "PARECER vs PARECERSE A – Sembler et ressembler",
      en: "PARECER vs PARECERSE A – To seem and to resemble"
    },
    level: "A2",
    note: {
      fr: "Différence entre PARECER (sembler) et PARECERSE A (ressembler à).",
      en: "Difference between PARECER (to seem) and PARECERSE A (to look like)."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/parecer_vs_parecerse_a.json"
  }, // 📋 CODE À AJOUTER DANS src/data/grammar.ts
// Copie ces 3 entrées à la fin du tableau grammarPoints, juste avant le dernier ]

  {
    id: "llevar_usos",
    title: {
      fr: "Le verbe LLEVAR - Multiples usages",
      en: "The verb LLEVAR - Multiple uses"
    },
    level: "A2",
    note: {
      fr: "Les différents sens du verbe LLEVAR (porter, emmener, durée, gérer).",
      en: "Different meanings of the verb LLEVAR (to carry, to take, duration, to manage)."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/llevar_usos.json"
  },
  {
    id: "caer_usos",
    title: {
      fr: "Le verbe CAER - Tomber et ses usages",
      en: "The verb CAER - To fall and its uses"
    },
    level: "A2",
    note: {
      fr: "Le verbe CAER (tomber, plaire/déplaire, se rendre compte).",
      en: "The verb CAER (to fall, to like/dislike, to realize)."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/caer_usos.json"
  },
  {
    id: "chocar_usos",
    title: {
      fr: "Le verbe CHOCAR - Heurter et choquer",
      en: "The verb CHOCAR - To crash and to shock"
    },
    level: "A2",
    note: {
      fr: "Le verbe CHOCAR (heurter, choquer, toper/trinquer, conflit).",
      en: "The verb CHOCAR (to crash, to shock, to high-five/toast, conflict)."
    },
    country: "all",
    jsonPath: "/data/grammar_quizz/chocar_usos.json"
  }
];