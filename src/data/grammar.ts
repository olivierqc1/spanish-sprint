// src/data/grammar.ts
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
    title: { fr: "Présent – verbes réguliers (-ar, -er, -ir)", en: "Present tense – regular verbs (-ar, -er, -ir)" },
    level: "A1",
    note: { fr: "Conjugaison des verbes réguliers au présent.", en: "Conjugation of regular verbs in the present tense." },
    country: "all",
    jsonPath: "/data/grammar_quizz/presente_regulares.json"
  },
  {
    id: "presente_irregulares",
    title: { fr: "Présent – verbes irréguliers (tener, ser, ir, hacer, venir, decir...)", en: "Present tense – irregular verbs (tener, ser, ir, hacer, venir, decir...)" },
    level: "A1",
    note: { fr: "Conjugaison des principaux verbes irréguliers au présent.", en: "Conjugation of main irregular verbs in the present tense." },
    country: "all",
    jsonPath: "/data/grammar_quizz/presente_irregulares.json"
  },
  {
    id: "ser_estar",
    title: { fr: "SER vs ESTAR – Les différences complètes", en: "SER vs ESTAR – Complete differences" },
    level: "A1-A2",
    note: { fr: "Comprendre quand utiliser SER ou ESTAR.", en: "Understanding when to use SER or ESTAR." },
    country: "all",
    jsonPath: "/data/grammar_quizz/ser_estar.json"
  },
  {
    id: "hay_estar",
    title: { fr: "HAY vs ESTAR", en: "HAY vs ESTAR" },
    level: "A1-A2",
    note: { fr: "Différence entre HAY (il y a) et ESTAR (être situé).", en: "Difference between HAY (there is/are) and ESTAR (to be located)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/hay_estar.json"
  },
  {
    id: "gustar",
    title: { fr: "GUSTAR et verbes similaires", en: "GUSTAR and similar verbs" },
    level: "A1-A2",
    note: { fr: "Structure du verbe GUSTAR (plaire) et verbes similaires.", en: "Structure of the verb GUSTAR (to like) and similar verbs." },
    country: "all",
    jsonPath: "/data/grammar_quizz/gustar.json"
  },
  {
    id: "articulos_definidos",
    title: { fr: "Articles définis (el, la, los, las)", en: "Definite articles (el, la, los, las)" },
    level: "A1",
    note: { fr: "Usage des articles définis en espagnol.", en: "Usage of definite articles in Spanish." },
    country: "all",
    jsonPath: "/data/grammar_quizz/articulos_definidos.json"
  },
  {
    id: "articulos_indefinidos",
    title: { fr: "Articles indéfinis (un, una, unos, unas)", en: "Indefinite articles (un, una, unos, unas)" },
    level: "A1",
    note: { fr: "Usage des articles indéfinis en espagnol.", en: "Usage of indefinite articles in Spanish." },
    country: "all",
    jsonPath: "/data/grammar_quizz/articulos_indefinidos.json"
  },
  {
    id: "genero_sustantivos",
    title: { fr: "Genre des noms (el / la)", en: "Gender of nouns (el / la)" },
    level: "A1",
    note: { fr: "Règles pour déterminer le genre des noms.", en: "Rules for determining the gender of nouns." },
    country: "all",
    jsonPath: "/data/grammar_quizz/genero_sustantivos.json"
  },
  {
    id: "plural",
    title: { fr: "Pluriel des noms", en: "Plural of nouns" },
    level: "A1",
    note: { fr: "Formation du pluriel en espagnol.", en: "Formation of the plural in Spanish." },
    country: "all",
    jsonPath: "/data/grammar_quizz/plural.json"
  },
  {
    id: "acuerdo_adjetivos",
    title: { fr: "Accord des adjectifs", en: "Agreement of adjectives" },
    level: "A1",
    note: { fr: "Accord des adjectifs en genre et en nombre.", en: "Agreement of adjectives in gender and number." },
    country: "all",
    jsonPath: "/data/grammar_quizz/acuerdo_adjetivos.json"
  },
  {
    id: "demostrativos",
    title: { fr: "Les démonstratifs (este, ese, aquel)", en: "Demonstratives (este, ese, aquel)" },
    level: "A1",
    note: { fr: "Adjectifs et pronoms démonstratifs.", en: "Demonstrative adjectives and pronouns." },
    country: "all",
    jsonPath: "/data/grammar_quizz/demostrativos.json"
  },
  {
    id: "posesivos",
    title: { fr: "Les adjectifs et pronoms possessifs", en: "Possessive adjectives and pronouns" },
    level: "A1-A2",
    note: { fr: "Adjectifs possessifs (mi, tu, su) et pronoms possessifs.", en: "Possessive adjectives (mi, tu, su) and possessive pronouns." },
    country: "all",
    jsonPath: "/data/grammar_quizz/posesivos.json"
  },
  {
    id: "pronombres_posesivos",
    title: { fr: "Pronoms possessifs (mío, tuyo, suyo...)", en: "Possessive pronouns (mío, tuyo, suyo...)" },
    level: "A2",
    note: { fr: "Utilisation des pronoms possessifs détachés.", en: "Use of standalone possessive pronouns." },
    country: "all",
    jsonPath: "/data/grammar_quizz/pronombres_posesivos.json"
  },
  {
    id: "pronombres",
    title: { fr: "Pronoms personnels sujets", en: "Subject personal pronouns" },
    level: "A1",
    note: { fr: "Pronoms personnels sujets (yo, tú, él...).", en: "Subject personal pronouns (yo, tú, él...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/pronombres.json"
  },
  {
    id: "pronombres_complemento",
    title: { fr: "Pronoms compléments (COD et COI)", en: "Object pronouns (direct and indirect)" },
    level: "A2",
    note: { fr: "Pronoms compléments d'objet direct et indirect.", en: "Direct and indirect object pronouns." },
    country: "all",
    jsonPath: "/data/grammar_quizz/pronombres_complemento.json"
  },
  {
    id: "pronombres_relativos",
    title: { fr: "Pronoms relatifs (que, quien, donde, cual)", en: "Relative pronouns (que, quien, donde, cual)" },
    level: "A2-B1",
    note: { fr: "Pronoms relatifs pour relier deux propositions.", en: "Relative pronouns to connect two clauses." },
    country: "all",
    jsonPath: "/data/grammar_quizz/pronombres_relativos.json"
  },
  {
    id: "preposiciones_a_en_de",
    title: { fr: "Prépositions A, EN, DE", en: "Prepositions A, EN, DE" },
    level: "A1-A2",
    note: { fr: "Utilisation des prépositions principales.", en: "Use of main prepositions." },
    country: "all",
    jsonPath: "/data/grammar_quizz/preposiciones_a_en_de.json"
  },
  {
    id: "preposicion_de",
    title: { fr: "Préposition DE (possession, origine, matière, contenu)", en: "Preposition DE (possession, origin, material, content)" },
    level: "A1",
    note: { fr: "Les différents usages de la préposition DE.", en: "Different uses of the preposition DE." },
    country: "all",
    jsonPath: "/data/grammar_quizz/preposicion_de.json"
  },
  {
    id: "preposiciones_lugar",
    title: { fr: "Les prépositions de lieu", en: "Prepositions of place" },
    level: "A1-A2",
    note: { fr: "Prépositions pour indiquer la position.", en: "Prepositions to indicate position." },
    country: "all",
    jsonPath: "/data/grammar_quizz/preposiciones_lugar.json"
  },
  {
    id: "por_vs_para",
    title: { fr: "POR vs PARA", en: "POR vs PARA" },
    level: "A2",
    note: { fr: "Différence entre POR et PARA.", en: "Difference between POR and PARA." },
    country: "all",
    jsonPath: "/data/grammar_quizz/por_vs_para.json"
  },
  {
    id: "muy_vs_mucho",
    title: { fr: "MUY vs MUCHO", en: "MUY vs MUCHO" },
    level: "A1-A2",
    note: { fr: "Différence entre MUY et MUCHO.", en: "Difference between MUY and MUCHO." },
    country: "all",
    jsonPath: "/data/grammar_quizz/muy_vs_mucho.json"
  },
  {
    id: "negacion",
    title: { fr: "La négation en espagnol", en: "Negation in Spanish" },
    level: "A1-A2",
    note: { fr: "Formation de la négation (no, nada, nadie, nunca...).", en: "Formation of negation (no, nada, nadie, nunca...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/negacion.json"
  },
  {
    id: "interrogativos",
    title: { fr: "Les mots interrogatifs", en: "Interrogative words" },
    level: "A1-A2",
    note: { fr: "Mots interrogatifs (qué, quién, dónde, cuándo...).", en: "Interrogative words (qué, quién, dónde, cuándo...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/interrogatives.json"
  },
  {
    id: "cual_vs_que",
    title: { fr: "CUÁL vs QUÉ (interrogatifs)", en: "CUÁL vs QUÉ (interrogatives)" },
    level: "A2",
    note: { fr: "Différence entre CUÁL et QUÉ dans les questions.", en: "Difference between CUÁL and QUÉ in questions." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cual_vs_que.json"
  },
  {
    id: "comparativos",
    title: { fr: "Les comparatifs", en: "Comparatives" },
    level: "A2",
    note: { fr: "Comparatifs de supériorité, égalité et infériorité.", en: "Comparatives of superiority, equality, and inferiority." },
    country: "all",
    jsonPath: "/data/grammar_quizz/comparativos.json"
  },
  {
    id: "superlativos",
    title: { fr: "Les superlatifs", en: "Superlatives" },
    level: "A2",
    note: { fr: "Superlatifs relatifs et absolus.", en: "Relative and absolute superlatives." },
    country: "all",
    jsonPath: "/data/grammar_quizz/superlativos.json"
  },
  {
    id: "numeros",
    title: { fr: "Les nombres en espagnol (0–1000)", en: "Numbers in Spanish (0–1000)" },
    level: "A1",
    note: { fr: "Nombres cardinaux de 0 à 1000.", en: "Cardinal numbers from 0 to 1000." },
    country: "all",
    jsonPath: "/data/grammar_quizz/numeros.json"
  },
  {
    id: "numeros_ordinales",
    title: { fr: "Les nombres ordinaux (primero, segundo, tercero...)", en: "Ordinal numbers (primero, segundo, tercero...)" },
    level: "A1",
    note: { fr: "Nombres ordinaux et leur utilisation.", en: "Ordinal numbers and their use." },
    country: "all",
    jsonPath: "/data/grammar_quizz/numeros_ordinales.json"
  },
  {
    id: "la_hora",
    title: { fr: "L'heure en espagnol", en: "Telling time in Spanish" },
    level: "A1",
    note: { fr: "Comment dire l'heure en espagnol.", en: "How to tell time in Spanish." },
    country: "all",
    jsonPath: "/data/grammar_quizz/la_hora.json"
  },
  {
    id: "weather",
    title: { fr: "Parler de la météo", en: "Talking about the weather" },
    level: "A1",
    note: { fr: "Expressions pour parler du temps qu'il fait.", en: "Expressions for talking about the weather." },
    country: "all",
    jsonPath: "/data/grammar_quizz/weather.json"
  },
  {
    id: "verbos_reflexivos",
    title: { fr: "Les verbes réflexifs", en: "Reflexive verbs" },
    level: "A1-A2",
    note: { fr: "Verbes pronominaux (levantarse, ducharse...).", en: "Reflexive verbs (levantarse, ducharse...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/verbos_reflexivos.json"
  },
  {
    id: "presente_progresivo",
    title: { fr: "Le présent progressif (estar + gérondif)", en: "Present progressive (estar + gerund)" },
    level: "A2",
    note: { fr: "Formation et utilisation du présent progressif.", en: "Formation and use of the present progressive." },
    country: "all",
    jsonPath: "/data/grammar_quizz/presente_progresivo.json"
  },
  {
    id: "preterito_indefinido_regulares",
    title: { fr: "Passé simple – verbes réguliers (-ar, -er, -ir)", en: "Preterite – regular verbs (-ar, -er, -ir)" },
    level: "A2",
    note: { fr: "Conjugaison des verbes réguliers au passé simple.", en: "Conjugation of regular verbs in the preterite." },
    country: "all",
    jsonPath: "/data/grammar_quizz/preterito_indefinido_regulares.json"
  },
  {
    id: "preterito_indefinido_irregulares",
    title: { fr: "Passé simple – verbes irréguliers", en: "Preterite – irregular verbs" },
    level: "A2",
    note: { fr: "Conjugaison des verbes irréguliers au passé simple.", en: "Conjugation of irregular verbs in the preterite." },
    country: "all",
    jsonPath: "/data/grammar_quizz/preterito_indefinido_irregulares.json"
  },
  {
    id: "preterito_irregulares_visual",
    title: { fr: "Passé simple – Verbes irréguliers (visuel bilingue)", en: "Preterite – Irregular verbs (bilingual visual)" },
    level: "A2",
    note: { fr: "Version visuelle détaillée des verbes irréguliers au passé simple.", en: "Detailed visual version of irregular verbs in the preterite." },
    country: "all",
    jsonPath: "/data/grammar_quizz/preterito_irregulares_bilingual.json"
  },
  {
    id: "imperfecto",
    title: { fr: "Imparfait – actions habituelles et descriptions", en: "Imperfect – habitual actions and descriptions" },
    level: "A2",
    note: { fr: "Conjugaison et utilisation de l'imparfait.", en: "Conjugation and use of the imperfect." },
    country: "all",
    jsonPath: "/data/grammar_quizz/imperfecto.json"
  },
  {
    id: "pasados_comparacion",
    title: { fr: "Passé composé vs Passé simple vs Imparfait", en: "Present perfect vs Preterite vs Imperfect" },
    level: "A2",
    note: { fr: "Différences entre les temps du passé.", en: "Differences between past tenses." },
    country: "all",
    jsonPath: "/data/grammar_quizz/pasados_comparacion.json"
  },
  {
    id: "imperfecto_vs_indefinido",
    title: { fr: "Imparfait vs Passé simple — lequel choisir?", en: "Imperfect vs Preterite — which one to use?" },
    level: "A2",
    note: { fr: "Différence entre l'imparfait (hablaba) et le passé simple (hablé).", en: "Difference between the imperfect (hablaba) and the preterite (hablé)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/imperfecto_vs_indefinido.json"
  },
  {
    id: "futuro_simple_regulares",
    title: { fr: "Futur simple – verbes réguliers", en: "Simple future – regular verbs" },
    level: "A2",
    note: { fr: "Formation du futur simple pour les verbes réguliers.", en: "Formation of the simple future for regular verbs." },
    country: "all",
    jsonPath: "/data/grammar_quizz/futuro_simple_regulares.json"
  },
  {
    id: "futuro_simple_irregulares",
    title: { fr: "Futur simple – verbes irréguliers", en: "Simple future – irregular verbs" },
    level: "A2",
    note: { fr: "Radicaux irréguliers au futur simple.", en: "Irregular stems in the simple future." },
    country: "all",
    jsonPath: "/data/grammar_quizz/futuro_simple_irregulares.json"
  },
  {
    id: "cuesta_costar",
    title: { fr: "Le verbe COSTAR (cuesta) - Prix et difficulté", en: "The verb COSTAR (cuesta) - Price and difficulty" },
    level: "A2",
    note: { fr: "Les deux sens du verbe COSTAR (coûter / être difficile).", en: "The two meanings of the verb COSTAR (to cost / to be difficult)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cuesta_costar.json"
  },
  {
    id: "ser_vs_sentirse",
    title: { fr: "SER vs SENTIRSE - Les différences", en: "SER vs SENTIRSE - The differences" },
    level: "A2",
    note: { fr: "Différence entre SER (être) et SENTIRSE (se sentir).", en: "Difference between SER (to be) and SENTIRSE (to feel)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/ser_vs_sentirse.json"
  },
  {
    id: "adverbios_frecuencia",
    title: { fr: "Les adverbes de fréquence", en: "Adverbs of frequency" },
    level: "A1-A2",
    note: { fr: "Adverbes de fréquence (siempre, nunca, a veces...).", en: "Adverbs of frequency (siempre, nunca, a veces...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/adverbios_frecuencia.json"
  },
  {
    id: "direcciones",
    title: { fr: "Donner et comprendre des directions", en: "Giving and understanding directions" },
    level: "A1",
    note: { fr: "Vocabulaire et expressions pour donner des directions.", en: "Vocabulary and expressions for giving directions." },
    country: "all",
    jsonPath: "/data/grammar_quizz/direcciones.json"
  },
  {
    id: "cotidiano_basics",
    title: { fr: "Phrases et vocabulaire du quotidien", en: "Everyday phrases and vocabulary" },
    level: "A1",
    note: { fr: "Expressions courantes pour la vie de tous les jours.", en: "Common expressions for everyday life." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cotidiano_basics.json"
  },
  {
    id: "participios_como_adjetivos",
    title: { fr: "Participes passés comme adjectifs (estar + participio)", en: "Past participles as adjectives (estar + participio)" },
    level: "A2",
    note: { fr: "Utilisation des participes passés avec ESTAR pour décrire un état.", en: "Using past participles with ESTAR to describe a state." },
    country: "all",
    jsonPath: "/data/grammar_quizz/participios_como_adjetivos.json"
  },
  {
    id: "desde_vs_desde_hace",
    title: { fr: "DESDE vs DESDE HACE – Exprimer la durée", en: "DESDE vs DESDE HACE – Expressing duration" },
    level: "A2",
    note: { fr: "Différence entre DESDE (point précis) et DESDE HACE (durée).", en: "Difference between DESDE (specific point) and DESDE HACE (duration)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/desde_vs_desde_hace.json"
  },
  {
    id: "parecer_vs_parecerse_a",
    title: { fr: "PARECER vs PARECERSE A – Sembler et ressembler", en: "PARECER vs PARECERSE A – To seem and to resemble" },
    level: "A2",
    note: { fr: "Différence entre PARECER (sembler) et PARECERSE A (ressembler à).", en: "Difference between PARECER (to seem) and PARECERSE A (to look like)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/parecer_vs_parecerse_a.json"
  },
  {
    id: "llevar_usos",
    title: { fr: "Le verbe LLEVAR - Multiples usages", en: "The verb LLEVAR - Multiple uses" },
    level: "A2",
    note: { fr: "Les différents sens du verbe LLEVAR (porter, emmener, durée, gérer).", en: "Different meanings of the verb LLEVAR (to carry, to take, duration, to manage)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/llevar_usos.json"
  },
  {
    id: "caer_usos",
    title: { fr: "Le verbe CAER - Tomber et ses usages", en: "The verb CAER - To fall and its uses" },
    level: "A2",
    note: { fr: "Le verbe CAER (tomber, plaire/déplaire, se rendre compte).", en: "The verb CAER (to fall, to like/dislike, to realize)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/caer_usos.json"
  },
  {
    id: "chocar_usos",
    title: { fr: "Le verbe CHOCAR - Heurter et choquer", en: "The verb CHOCAR - To crash and to shock" },
    level: "A2",
    note: { fr: "Le verbe CHOCAR (heurter, choquer, toper/trinquer, conflit).", en: "The verb CHOCAR (to crash, to shock, to high-five/toast, conflict)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/chocar_usos.json"
  },
  {
    id: "seguir_gerundio",
    title: { fr: "Seguir + Gérondif – Continuer à faire quelque chose", en: "Seguir + Gerund – To keep doing something" },
    level: "A2",
    note: { fr: "Structure seguir + gérondif pour exprimer qu'une action continue.", en: "Seguir + gerund structure to express that an action continues." },
    country: "all",
    jsonPath: "/data/grammar_quizz/seguir_gerundio.json"
  },
  {
    id: "ya_todavia",
    title: { fr: "Ya, todavía, ya no, aún no, todavía no", en: "Ya, todavía, ya no, aún no, todavía no" },
    level: "A2",
    note: { fr: "Adverbes temporels pour exprimer le déjà, le encore, le ne plus et le pas encore.", en: "Temporal adverbs to express already, still, no longer, and not yet." },
    country: "all",
    jsonPath: "/data/grammar_quizz/ya_todavia.json"
  },

// ─── PÉRIPHRASES VERBALES ───────────────────────────────────────────────────
  {
    id: "perifrasas_introduccion",
    title: { fr: "Périphrases verbales – Introduction", en: "Verbal periphrases – Introduction" },
    level: "A2",
    note: { fr: "Vue d'ensemble des périphrases verbales espagnoles.", en: "Overview of Spanish verbal periphrases." },
    country: "all",
    jsonPath: "/data/grammar_quizz/perifrasas_introduccion.json"
  },
  {
    id: "llevar_gerundio",
    title: { fr: "Llevar + gérondif – Exprimer la durée en cours", en: "Llevar + gerund – Expressing ongoing duration" },
    level: "A2",
    note: { fr: "Llevar + gérondif pour dire depuis combien de temps on fait quelque chose.", en: "Llevar + gerund to say how long you have been doing something." },
    country: "all",
    jsonPath: "/data/grammar_quizz/llevar_gerundio.json"
  },
  {
    id: "acabar_de",
    title: { fr: "Acabar de + infinitif – Venir de faire", en: "Acabar de + infinitive – To have just done" },
    level: "A2",
    note: { fr: "Acabar de + infinitif pour exprimer un passé très récent.", en: "Acabar de + infinitive for a very recent past." },
    country: "all",
    jsonPath: "/data/grammar_quizz/acabar_de.json"
  },
  {
    id: "dejar_de",
    title: { fr: "Dejar de + infinitif – Arrêter de faire", en: "Dejar de + infinitive – To stop doing" },
    level: "A2",
    note: { fr: "Dejar de + infinitif pour exprimer l'arrêt d'une habitude ou action.", en: "Dejar de + infinitive to express stopping a habit or action." },
    country: "all",
    jsonPath: "/data/grammar_quizz/dejar_de.json"
  },
  {
    id: "empezar_a",
    title: { fr: "Empezar a / Comenzar a + infinitif – Commencer à", en: "Empezar a / Comenzar a + infinitive – To start doing" },
    level: "A2",
    note: { fr: "Empezar a + infinitif pour exprimer le début d'une action.", en: "Empezar a + infinitive to express the beginning of an action." },
    country: "all",
    jsonPath: "/data/grammar_quizz/empezar_a.json"
  },
  {
    id: "volver_a",
    title: { fr: "Volver a + infinitif – Refaire, recommencer", en: "Volver a + infinitive – To do again, to redo" },
    level: "A2",
    note: { fr: "Volver a + infinitif pour exprimer la répétition d'une action.", en: "Volver a + infinitive to express repetition of an action." },
    country: "all",
    jsonPath: "/data/grammar_quizz/volver_a.json"
  },
  {
    id: "terminar_de",
    title: { fr: "Terminar de + infinitif – Finir de faire", en: "Terminar de + infinitive – To finish doing" },
    level: "A2",
    note: { fr: "Terminar de + infinitif pour exprimer la fin d'une tâche.", en: "Terminar de + infinitive to express the completion of a task." },
    country: "all",
    jsonPath: "/data/grammar_quizz/terminar_de.json"
  },
  {
    id: "perifrasas_mixtas",
    title: { fr: "Périphrases verbales – Exercices mixtes", en: "Verbal periphrases – Mixed exercises" },
    level: "B1",
    note: { fr: "Exercices mélangeant toutes les périphrases verbales vues.", en: "Exercises mixing all verbal periphrases studied." },
    country: "all",
    jsonPath: "/data/grammar_quizz/perifrasas_mixtas.json"
  },

  // ─── IMPÉRATIF ESPAGNOL ─────────────────────────────────────────────────────
  {
    id: "imperativo_afirmativo",
    title: { fr: "Impératif affirmatif (regular + irréguliers)", en: "Affirmative imperative (regular + irregular)" },
    level: "A2",
    note: { fr: "Formes de l'impératif affirmatif : habla, haz, ve, ven, di, ten, sé, pon, sal...", en: "Affirmative imperative forms: habla, haz, ve, ven, di, ten, sé, pon, sal..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/imperativo_afirmativo.json"
  },
  {
    id: "imperativo_negativo",
    title: { fr: "Impératif négatif (no + subjonctif)", en: "Negative imperative (no + subjunctive)" },
    level: "A2",
    note: { fr: "L'impératif négatif = no + subjonctif présent (no hables, no hagas, no vayas...).", en: "Negative imperative = no + present subjunctive (no hables, no hagas, no vayas...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/imperativo_negativo.json"
  },
  {
    id: "recordar_vs_acordarse",
    title: { fr: "RECORDAR vs ACORDARSE – Se souvenir", en: "RECORDAR vs ACORDARSE – To remember" },
    level: "A2",
    note: { fr: "Différence entre RECORDAR (transitif direct) et ACORDARSE (pronominal + de).", en: "Difference between RECORDAR (transitive) and ACORDARSE (reflexive + de)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/recordar_vs_acordarse.json"
  },
  {
    id: "acentuacion_reglas",
    title: { fr: "Les accents en espagnol – Agudas, Llanas, Esdrújulas", en: "Spanish accents – Agudas, Llanas, Esdrújulas" },
    level: "A2",
    note: { fr: "Règles d'accentuation : agudas (dernière syllabe), llanas (avant-dernière), esdrújulas (antépénultième).", en: "Accent rules: agudas (last syllable), llanas (second-to-last), esdrújulas (third-to-last)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/acentuacion_reglas.json"
  },

  // ─── B1 ────────────────────────────────────────────────────────────────────
  {
    id: "subjuntivo_presente",
    title: { fr: "Subjonctif présent – Formation et usages", en: "Present subjunctive – Formation and uses" },
    level: "B1",
    note: { fr: "Formation du subjonctif présent et principaux contextes d'utilisation.", en: "Formation of the present subjunctive and main contexts of use." },
    country: "all",
    jsonPath: "/data/grammar_quizz/subjuntivo_presente.json"
  },
  {
    id: "condicional",
    title: { fr: "Conditionnel – Formation et usages", en: "Conditional – Formation and uses" },
    level: "B1",
    note: { fr: "Formation du conditionnel et ses usages (conseil, hypothèse, politesse).", en: "Formation of the conditional and its uses (advice, hypothesis, politeness)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/condicional.json"
  },
  {
    id: "futuro_perfecto",
    title: { fr: "Futur antérieur", en: "Future perfect" },
    level: "B1",
    note: { fr: "Formation et usage du futur antérieur (habré + participio).", en: "Formation and use of the future perfect (habré + participio)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/futuro_perfecto.json"
  },
  {
    id: "pluscuamperfecto",
    title: { fr: "Plus-que-parfait (había + participio)", en: "Past perfect (había + participio)" },
    level: "B1",
    note: { fr: "Formation et usage du plus-que-parfait.", en: "Formation and use of the past perfect." },
    country: "all",
    jsonPath: "/data/grammar_quizz/pluscuamperfecto.json"
  },
  {
    id: "oraciones_condicionales",
    title: { fr: "Phrases conditionnelles (si + indicatif/subjonctif)", en: "Conditional sentences (si + indicative/subjunctive)" },
    level: "B1",
    note: { fr: "Les trois types de phrases conditionnelles en espagnol.", en: "The three types of conditional sentences in Spanish." },
    country: "all",
    jsonPath: "/data/grammar_quizz/oraciones_condicionales.json"
  },
  {
    id: "estilo_indirecto",
    title: { fr: "Le discours indirect", en: "Indirect speech" },
    level: "B1",
    note: { fr: "Rapporter les paroles de quelqu'un (dijo que, preguntó si...).", en: "Reporting someone's words (dijo que, preguntó si...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/estilo_indirecto.json"
  },
  {
    id: "voz_pasiva",
    title: { fr: "La voix passive (ser + participio)", en: "The passive voice (ser + participio)" },
    level: "B1",
    note: { fr: "Formation et usage de la voix passive en espagnol.", en: "Formation and use of the passive voice in Spanish." },
    country: "all",
    jsonPath: "/data/grammar_quizz/voz_pasiva.json"
  },
  {
    id: "se_pasivo_impersonal",
    title: { fr: "SE passif et impersonnel", en: "Passive and impersonal SE" },
    level: "B1",
    note: { fr: "Utilisation de SE pour exprimer le passif et l'impersonnel.", en: "Use of SE for passive and impersonal constructions." },
    country: "all",
    jsonPath: "/data/grammar_quizz/se_pasivo_impersonal.json"
  },

  // ─── GRAMMAIRE CATALANE ────────────────────────────────────────────────────
  {
    id: "cat_articles",
    title: { fr: "Catalan — Articles (el, la, els, les, l')", en: "Catalan — Articles (el, la, els, les, l')" },
    level: "A1",
    note: { fr: "Articles définis et indéfinis du catalan.", en: "Catalan definite and indefinite articles." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_articles.json"
  },
  {
    id: "cat_ser_estar",
    title: { fr: "Catalan — SER vs ESTAR", en: "Catalan — SER vs ESTAR" },
    level: "A1",
    note: { fr: "Deux façons de dire être en catalan.", en: "Two ways to say to be in Catalan." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_ser_estar.json"
  },
  {
    id: "cat_tenir",
    title: { fr: "Catalan — TENIR (avoir) et expressions", en: "Catalan — TENIR (to have) and expressions" },
    level: "A1",
    note: { fr: "Avoir faim, soif, froid, peur... avec TENIR.", en: "To be hungry, thirsty, cold, afraid... with TENIR." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_tenir.json"
  },
  {
    id: "cat_adjectius",
    title: { fr: "Catalan — Accord des adjectifs", en: "Catalan — Adjective agreement" },
    level: "A1",
    note: { fr: "Accord en genre et en nombre des adjectifs catalans.", en: "Catalan adjective agreement in gender and number." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_adjectius.json"
  },
  {
    id: "cat_negacio",
    title: { fr: "Catalan — La négation (no, mai, res, ningú...)", en: "Catalan — Negation (no, mai, res, ningú...)" },
    level: "A1",
    note: { fr: "Négation simple et renforcée en catalan.", en: "Simple and reinforced negation in Catalan." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_negacio.json"
  },
  {
    id: "cat_interrogatius",
    title: { fr: "Catalan — Mots interrogatifs (qui, què, on, quan...)", en: "Catalan — Question words (qui, què, on, quan...)" },
    level: "A1",
    note: { fr: "Les mots interrogatifs essentiels du catalan.", en: "Essential Catalan question words." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_interrogatius.json"
  },
  {
    id: "cat_preposicions",
    title: { fr: "Catalan — Prépositions (a, de, amb, per, en...)", en: "Catalan — Prepositions (a, de, amb, per, en...)" },
    level: "A2",
    note: { fr: "Les prépositions essentielles du catalan.", en: "Essential Catalan prepositions." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_preposicions.json"
  },
  {
    id: "cat_pronoms",
    title: { fr: "Catalan — Pronoms compléments (em, et, el, la, hi, en...)", en: "Catalan — Object pronouns (em, et, el, la, hi, en...)" },
    level: "A2",
    note: { fr: "Les pronoms faibles du catalan.", en: "Catalan weak/clitic pronouns." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_pronoms.json"
  },
  {
    id: "cat_recordar_vs_recordarse",
    title: { fr: "Catalan — RECORDAR vs RECORDAR-SE – Se souvenir", en: "Catalan — RECORDAR vs RECORDAR-SE – To remember" },
    level: "A1-A2",
    note: { fr: "Différence entre RECORDAR (transitif) et RECORDAR-SE DE (pronominal) en catalan.", en: "Difference between RECORDAR (transitive) and RECORDAR-SE DE (reflexive) in Catalan." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_recordar_vs_recordarse.json"
  },
  {
    id: "cat_imperatiu_afirmatiu",
    title: { fr: "Catalan — Impératif affirmatif (regular + irréguliers)", en: "Catalan — Affirmative imperative (regular + irregular)" },
    level: "A2",
    note: { fr: "Formes de l'impératif affirmatif en catalan : parla, fes, vés, vine, digues...", en: "Catalan affirmative imperative forms: parla, fes, vés, vine, digues..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_imperatiu_afirmatiu.json"
  },
  {
    id: "cat_imperatiu_negatiu",
    title: { fr: "Catalan — Impératif négatif (no + subjonctif)", en: "Catalan — Negative imperative (no + subjunctive)" },
    level: "A2",
    note: { fr: "L'impératif négatif en catalan = no + subjonctif présent (no parlis, no facis, no vagis...).", en: "Catalan negative imperative = no + present subjunctive (no parlis, no facis, no vagis...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_imperatiu_negatiu.json"
  },
{
    id: "imperfecto_positivo_negativo",
    title: { fr: "Imparfait – Affirmatif vs Négatif", en: "Imperfect – Affirmative vs Negative" },
    level: "A2",
    note: { fr: "Conjugaison de l'imparfait en version affirmative et négative.", en: "Imperfect conjugation in affirmative and negative form." },
    country: "all",
    jsonPath: "/data/grammar_quizz/imperfecto_positivo_negativo.json"
  },
  {
    id: "lo_usos",
    title: { fr: "LO – Lo mismo, lo que, lo de, lo + adjectif", en: "LO – Lo mismo, lo que, lo de, lo + adjective" },
    level: "A2",
    note: { fr: "Les différentes constructions avec l'article neutre LO.", en: "The different constructions with the neutral article LO." },
    country: "all",
    jsonPath: "/data/grammar_quizz/lo_usos.json"
  },
{
    id: "estilo_indirecto_que_si",
    title: { fr: "Discours indirect – QUE vs SI", en: "Indirect speech – QUE vs SI" },
    level: "B1",
    note: { fr: "Rapporter des affirmations (que) et des questions oui/non (si) au discours indirect.", en: "Reporting statements (que) and yes/no questions (si) in indirect speech." },
    country: "all",
    jsonPath: "/data/grammar_quizz/estilo_indirecto_que_si.json"
  },
  {
    id: "interrogativos_tilde",
    title: { fr: "Accent diacritique – cuando/qué/cómo/dónde", en: "Diacritical accent – cuando/qué/cómo/dónde" },
    level: "A2",
    note: { fr: "Interrogatifs avec accent (¿cuándo?, ¿qué?) vs relatifs/conjonctions sans accent (cuando, que).", en: "Interrogatives with accent vs relatives/conjunctions without accent." },
    country: "all",
    jsonPath: "/data/grammar_quizz/interrogativos_tilde.json"
  },
  {
    id: "futuro_si_condicional",
    title: { fr: "Futur – Si + présent + futur simple", en: "Future – Si + present + simple future" },
    level: "B1",
    note: { fr: "Condition réelle au futur : si + présent de l'indicatif + futur simple.", en: "Real future condition: si + present indicative + simple future." },
    country: "all",
    jsonPath: "/data/grammar_quizz/futuro_si_condicional.json"
  },
  {
    id: "conectores_narrativos",
    title: { fr: "Connecteurs narratifs et d'opposition", en: "Narrative and opposition connectors" },
    level: "B1",
    note: { fr: "Alors, de repente, al final, aunque, sin embargo, por eso, así que...", en: "entonces, de repente, al final, aunque, sin embargo, por eso, así que..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/conectores_narrativos.json"
  },
  {
    id: "verbos_comunicacion",
    title: { fr: "Verbes de communication + prépositions", en: "Communication verbs + prepositions" },
    level: "B1",
    note: { fr: "Despedirse de, felicitar por, invitar a, pedir que, dar las gracias por...", en: "Despedirse de, felicitar por, invitar a, pedir que, dar las gracias por..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/verbos_comunicacion.json"
  },
{
    id: "estilo_indirecto_que_si",
    title: { fr: "Discours indirect – QUE vs SI", en: "Indirect speech – QUE vs SI" },
    level: "B1",
    note: { fr: "Rapporter des affirmations (que) et des questions oui/non (si) au discours indirect.", en: "Reporting statements (que) and yes/no questions (si) in indirect speech." },
    country: "all",
    jsonPath: "/data/grammar_quizz/estilo_indirecto_que_si.json"
  },
  {
    id: "interrogativos_tilde",
    title: { fr: "Accent diacritique – cuando/qué/cómo/dónde", en: "Diacritical accent – cuando/qué/cómo/dónde" },
    level: "A2",
    note: { fr: "Interrogatifs avec accent (¿cuándo?, ¿qué?) vs relatifs/conjonctions sans accent (cuando, que).", en: "Interrogatives with accent vs relatives/conjunctions without accent." },
    country: "all",
    jsonPath: "/data/grammar_quizz/interrogativos_tilde.json"
  },
  {
    id: "futuro_si_condicional",
    title: { fr: "Futur – Si + présent + futur simple", en: "Future – Si + present + simple future" },
    level: "B1",
    note: { fr: "Condition réelle au futur : si + présent de l'indicatif + futur simple.", en: "Real future condition: si + present indicative + simple future." },
    country: "all",
    jsonPath: "/data/grammar_quizz/futuro_si_condicional.json"
  },
  {
    id: "conectores_narrativos",
    title: { fr: "Connecteurs narratifs et d'opposition", en: "Narrative and opposition connectors" },
    level: "B1",
    note: { fr: "Alors, de repente, al final, aunque, sin embargo, por eso, así que...", en: "entonces, de repente, al final, aunque, sin embargo, por eso, así que..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/conectores_narrativos.json"
  },
  {
    id: "verbos_comunicacion",
    title: { fr: "Verbes de communication + prépositions", en: "Communication verbs + prepositions" },
    level: "B1",
    note: { fr: "Despedirse de, felicitar por, invitar a, pedir que, dar las gracias por...", en: "Despedirse de, felicitar por, invitar a, pedir que, dar las gracias por..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/verbos_comunicacion.json"
  },
  {
    id: "imperfecto_positivo_negativo",
    title: { fr: "Imparfait – Affirmatif vs Négatif", en: "Imperfect – Affirmative vs Negative" },
    level: "A2",
    note: { fr: "Conjugaison de l'imparfait en version affirmative et négative.", en: "Imperfect conjugation in affirmative and negative form." },
    country: "all",
    jsonPath: "/data/grammar_quizz/imperfecto_positivo_negativo.json"
  },
  {
    id: "lo_usos",
    title: { fr: "LO – Lo mismo, lo que, lo de, lo + adjectif", en: "LO – Lo mismo, lo que, lo de, lo + adjective" },
    level: "A2",
    note: { fr: "Les différentes constructions avec l'article neutre LO.", en: "The different constructions with the neutral article LO." },
    country: "all",
    jsonPath: "/data/grammar_quizz/lo_usos.json"
  },
  // ─── NOUVEAUX B1 ────────────────────────────────────────────────────────────
  {
    id: "subjuntivo_deseos_sentimientos",
    title: { fr: "Subjonctif – Désirs et sentiments (querer que, esperar que...)", en: "Subjunctive – Wishes and feelings (querer que, esperar que...)" },
    level: "B1",
    note: { fr: "Subjonctif après les verbes de désir, souhait et sentiment (querer que, alegrarse de que...).", en: "Subjunctive after verbs of desire, wish, and feeling (querer que, alegrarse de que...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/subjuntivo_deseos_sentimientos.json"
  },
  {
    id: "subjuntivo_valoracion",
    title: { fr: "Subjonctif – Valorisation (es importante que, es necesario que...)", en: "Subjunctive – Value judgements (es importante que, es necesario que...)" },
    level: "B1",
    note: { fr: "Subjonctif après les expressions impersonnelles de valorisation et d'obligation.", en: "Subjunctive after impersonal expressions of value and obligation." },
    country: "all",
    jsonPath: "/data/grammar_quizz/subjuntivo_valoracion.json"
  },
  {
    id: "condicional_hipotesis",
    title: { fr: "Conditionnel – Hypothèses irréelles (si + imparfait subj. + conditionnel)", en: "Conditional – Unreal hypotheses (si + imperfect subj. + conditional)" },
    level: "B1",
    note: { fr: "Hypothèse irréelle : si + imparfait du subjonctif + conditionnel simple.", en: "Unreal hypothesis: si + imperfect subjunctive + conditional." },
    country: "all",
    jsonPath: "/data/grammar_quizz/condicional_hipotesis.json"
  },
  {
    id: "pluscuamperfecto_uso",
    title: { fr: "Plus-que-parfait – Antériorité dans le passé", en: "Past perfect – Anteriority in the past" },
    level: "B1",
    note: { fr: "Había + participio pour exprimer une action antérieure à une autre dans le passé.", en: "Había + participle to express an action prior to another past action." },
    country: "all",
    jsonPath: "/data/grammar_quizz/pluscuamperfecto_uso.json"
  },
  {
    id: "marcadores_discurso",
    title: { fr: "Marqueurs du discours – por un lado, en resumen, es decir...", en: "Discourse markers – por un lado, en resumen, es decir..." },
    level: "B1",
    note: { fr: "Structurer, reformuler et conclure un discours : además, sin embargo, es decir, en resumen...", en: "Structure, reformulate and conclude a discourse: además, sin embargo, es decir, en resumen..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/marcadores_discurso.json"
  },
  {
    id: "oraciones_relativas_subjuntivo",
    title: { fr: "Relatives – Indicatif vs Subjonctif (busco a alguien que...)", en: "Relative clauses – Indicative vs Subjunctive (busco a alguien que...)" },
    level: "B1",
    note: { fr: "Indicatif pour un antécédent connu, subjonctif pour un antécédent inconnu ou hypothétique.", en: "Indicative for known referent, subjunctive for unknown or hypothetical referent." },
    country: "all",
    jsonPath: "/data/grammar_quizz/oraciones_relativas_subjuntivo.json"
  },
  {
    id: "se_impersonal_pasivo",
    title: { fr: "SE impersonnel et passif (se habla, se dice, se venden...)", en: "Impersonal and passive SE (se habla, se dice, se venden...)" },
    level: "B1",
    note: { fr: "SE impersonnel (on parle) et SE passif (se venden pisos) – accord du verbe avec le sujet.", en: "Impersonal SE (one speaks) and passive SE (pisos se venden) – verb agrees with subject." },
    country: "all",
    jsonPath: "/data/grammar_quizz/se_impersonal_pasivo.json"
  },
  {
    id: "gerundio_usos",
    title: { fr: "Le gérondif – Usages et périphrases (estar, llevar, seguir, ir...)", en: "The gerund – Uses and periphrases (estar, llevar, seguir, ir...)" },
    level: "B1",
    note: { fr: "Estar/llevar/seguir/ir + gérondif, et gérondif de manière ou simultanéité.", en: "Estar/llevar/seguir/ir + gerund, and gerund of manner or simultaneity." },
    country: "all",
    jsonPath: "/data/grammar_quizz/gerundio_usos.json"
  },
  // ─── CATALAN A1 (nouveaux) ───────────────────────────────────────────────────
  {
    id: "cat_present_regulars",
    title: { fr: "Catalan — Présent – verbes réguliers (-ar, -er, -ir/-re)", en: "Catalan — Present tense – regular verbs (-ar, -er, -ir/-re)" },
    level: "A1",
    note: { fr: "Conjugaison des verbes réguliers au présent en catalan : parlar, córrer, obrir.", en: "Conjugation of regular verbs in the Catalan present: parlar, córrer, obrir." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_present_regulars.json"
  },
  {
    id: "cat_present_irregulars",
    title: { fr: "Catalan — Présent – verbes irréguliers (ser, anar, fer, tenir, venir...)", en: "Catalan — Present tense – irregular verbs (ser, anar, fer, tenir, venir...)" },
    level: "A1",
    note: { fr: "Les principaux verbes irréguliers au présent : ser, estar, anar, fer, tenir, venir, dir, poder, voler, saber.", en: "Key irregular verbs in the Catalan present: ser, estar, anar, fer, tenir, venir, dir, poder, voler, saber." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_present_irregulars.json"
  },
  {
    id: "cat_plural_genere",
    title: { fr: "Catalan — Genre et pluriel des noms", en: "Catalan — Gender and plural of nouns" },
    level: "A1",
    note: { fr: "Genre (masculin/féminin) et formation du pluriel en catalan (-s, -es, -os).", en: "Gender and plural formation in Catalan (-s, -es, -os)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_plural_genere.json"
  },
  {
    id: "cat_demostratius_possessius",
    title: { fr: "Catalan — Démonstratifs et possessifs", en: "Catalan — Demonstratives and possessives" },
    level: "A1",
    note: { fr: "Démonstratifs (aquest, aquell) et possessifs (el meu, la teva, el seu...) en catalan.", en: "Catalan demonstratives (aquest, aquell) and possessives (el meu, la teva, el seu...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_demostratius_possessius.json"
  },

  // ─── CATALAN A2 (nouveaux) ───────────────────────────────────────────────────
  {
    id: "cat_passat_perifrasic",
    title: { fr: "Catalan — Passé périphrastique (vaig + infinitif)", en: "Catalan — Periphrastic past (vaig + infinitive)" },
    level: "A2",
    note: { fr: "Le temps du passé principal en catalan : vaig/vas/va/vam/vau/van + infinitif.", en: "The main past tense in Catalan: vaig/vas/va/vam/vau/van + infinitive." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_passat_perifrasic.json"
  },
  {
    id: "cat_imperfet",
    title: { fr: "Catalan — Imparfait (parlava, menjava...)", en: "Catalan — Imperfect tense (parlava, menjava...)" },
    level: "A2",
    note: { fr: "L'imparfait catalan pour les habitudes passées et descriptions.", en: "Catalan imperfect for past habits and descriptions." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_imperfet.json"
  },
  {
    id: "cat_futur",
    title: { fr: "Catalan — Futur simple (parlaré, menjaré...)", en: "Catalan — Simple future (parlaré, menjaré...)" },
    level: "A2",
    note: { fr: "Le futur simple en catalan : infinitif + terminaisons -é, -às, -à, -em, -eu, -an.", en: "Catalan simple future: infinitive + endings -é, -às, -à, -em, -eu, -an." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_futur.json"
  },
  {
    id: "cat_comparatius",
    title: { fr: "Catalan — Comparatifs et superlatifs", en: "Catalan — Comparatives and superlatives" },
    level: "A2",
    note: { fr: "més...que, menys...que, tan...com, millor, pitjor, superlatif en -íssim.", en: "més...que, menys...que, tan...com, millor, pitjor, superlative in -íssim." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_comparatius.json"
  },
  {
    id: "cat_verbs_reflexius",
    title: { fr: "Catalan — Verbes réflexifs (aixecar-se, dutxar-se...)", en: "Catalan — Reflexive verbs (aixecar-se, dutxar-se...)" },
    level: "A2",
    note: { fr: "Verbes réflexifs et pronoms : em, et, es, ens, us, es.", en: "Reflexive verbs and pronouns: em, et, es, ens, us, es." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_verbs_reflexius.json"
  },

  // ─── CATALAN B1 (nouveaux) ───────────────────────────────────────────────────
  {
    id: "cat_subjuntiu_present",
    title: { fr: "Catalan — Subjonctif présent (parli, mengi, obri...)", en: "Catalan — Present subjunctive (parli, mengi, obri...)" },
    level: "B1",
    note: { fr: "Formation et usages du subjonctif présent catalan : désirs, valorisation, impératif négatif.", en: "Formation and uses of the Catalan present subjunctive: desires, value judgements, negative imperative." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_subjuntiu_present.json"
  },
  {
    id: "cat_condicional",
    title: { fr: "Catalan — Conditionnel (parlaria, menjaria...)", en: "Catalan — Conditional (parlaria, menjaria...)" },
    level: "B1",
    note: { fr: "Conditionnel catalan pour les hypothèses, la politesse et les conseils.", en: "Catalan conditional for hypotheses, politeness, and advice." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_condicional.json"
  },
  {
    id: "cat_connectors_discurs",
    title: { fr: "Catalan — Connecteurs du discours (però, tot i que, per tant...)", en: "Catalan — Discourse connectors (però, tot i que, per tant...)" },
    level: "B1",
    note: { fr: "Connecteurs catalans pour structurer le discours : opposition, cause, conséquence, résumé.", en: "Catalan connectors for discourse structure: opposition, cause, consequence, summary." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_connectors_discurs.json"
  },
  {
    id: "cat_perifrasies_verbals",
    title: { fr: "Catalan — Périphrases verbales (estar + gerundi, acabar de, anar a...)", en: "Catalan — Verbal periphrases (estar + gerund, acabar de, anar a...)" },
    level: "B1",
    note: { fr: "Les périphrases verbales catalanes : estar+gerundi, anar a, acabar de, deixar de, haver de...", en: "Catalan verbal periphrases: estar+gerund, anar a, acabar de, deixar de, haver de..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_perifrasies_verbals.json"
  },
// ─── CATALAN A1 ───────────────────────────────────────────────────────────
  {
    id: "cat_present_regulars",
    title: { fr: "Catalan — Présent – verbes réguliers (-ar, -er, -ir/-re)", en: "Catalan — Present tense – regular verbs (-ar, -er, -ir/-re)" },
    level: "A1",
    note: { fr: "Conjugaison des verbes réguliers au présent en catalan : parlar, córrer, obrir.", en: "Conjugation of regular verbs in the Catalan present: parlar, córrer, obrir." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_present_regulars.json"
  },
  {
    id: "cat_present_irregulars",
    title: { fr: "Catalan — Présent – verbes irréguliers (ser, anar, fer, tenir, venir...)", en: "Catalan — Present tense – irregular verbs (ser, anar, fer, tenir, venir...)" },
    level: "A1",
    note: { fr: "Les principaux verbes irréguliers au présent en catalan.", en: "Key irregular verbs in the Catalan present." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_present_irregulars.json"
  },
  {
    id: "cat_plural_genere",
    title: { fr: "Catalan — Genre et pluriel des noms", en: "Catalan — Gender and plural of nouns" },
    level: "A1",
    note: { fr: "Genre (masculin/féminin) et formation du pluriel en catalan (-s, -es, -os).", en: "Gender and plural formation in Catalan (-s, -es, -os)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_plural_genere.json"
  },
  {
    id: "cat_demostratius_possessius",
    title: { fr: "Catalan — Démonstratifs et possessifs", en: "Catalan — Demonstratives and possessives" },
    level: "A1",
    note: { fr: "Démonstratifs (aquest, aquell) et possessifs (el meu, la teva...) en catalan.", en: "Catalan demonstratives (aquest, aquell) and possessives (el meu, la teva...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_demostratius_possessius.json"
  },

  // ─── CATALAN A2 ───────────────────────────────────────────────────────────
  {
    id: "cat_passat_perifrasic",
    title: { fr: "Catalan — Passé périphrastique (vaig + infinitif)", en: "Catalan — Periphrastic past (vaig + infinitive)" },
    level: "A2",
    note: { fr: "Le temps du passé principal en catalan : vaig/vas/va/vam/vau/van + infinitif.", en: "The main past tense in Catalan: vaig/vas/va/vam/vau/van + infinitive." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_passat_perifrasic.json"
  },
  {
    id: "cat_imperfet",
    title: { fr: "Catalan — Imparfait (parlava, menjava...)", en: "Catalan — Imperfect tense (parlava, menjava...)" },
    level: "A2",
    note: { fr: "L'imparfait catalan pour les habitudes passées et descriptions.", en: "Catalan imperfect for past habits and descriptions." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_imperfet.json"
  },
  {
    id: "cat_futur",
    title: { fr: "Catalan — Futur simple (parlaré, menjaré...)", en: "Catalan — Simple future (parlaré, menjaré...)" },
    level: "A2",
    note: { fr: "Le futur simple en catalan : infinitif + terminaisons -é, -às, -à, -em, -eu, -an.", en: "Catalan simple future: infinitive + endings -é, -às, -à, -em, -eu, -an." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_futur.json"
  },
  {
    id: "cat_comparatius",
    title: { fr: "Catalan — Comparatifs et superlatifs", en: "Catalan — Comparatives and superlatives" },
    level: "A2",
    note: { fr: "més...que, menys...que, tan...com, millor, pitjor, superlatif en -íssim.", en: "més...que, menys...que, tan...com, millor, pitjor, superlative in -íssim." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_comparatius.json"
  },
  {
    id: "cat_verbs_reflexius",
    title: { fr: "Catalan — Verbes réflexifs (aixecar-se, dutxar-se...)", en: "Catalan — Reflexive verbs (aixecar-se, dutxar-se...)" },
    level: "A2",
    note: { fr: "Verbes réflexifs et pronoms : em, et, es, ens, us, es.", en: "Reflexive verbs and pronouns: em, et, es, ens, us, es." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_verbs_reflexius.json"
  },

  // ─── CATALAN B1 ───────────────────────────────────────────────────────────
  {
    id: "cat_subjuntiu_present",
    title: { fr: "Catalan — Subjonctif présent (parli, mengi, obri...)", en: "Catalan — Present subjunctive (parli, mengi, obri...)" },
    level: "B1",
    note: { fr: "Formation et usages du subjonctif présent catalan.", en: "Formation and uses of the Catalan present subjunctive." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_subjuntiu_present.json"
  },
  {
    id: "cat_condicional",
    title: { fr: "Catalan — Conditionnel (parlaria, menjaria...)", en: "Catalan — Conditional (parlaria, menjaria...)" },
    level: "B1",
    note: { fr: "Conditionnel catalan pour les hypothèses, la politesse et les conseils.", en: "Catalan conditional for hypotheses, politeness, and advice." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_condicional.json"
  },
  {
    id: "cat_connectors_discurs",
    title: { fr: "Catalan — Connecteurs du discours (però, tot i que, per tant...)", en: "Catalan — Discourse connectors (però, tot i que, per tant...)" },
    level: "B1",
    note: { fr: "Connecteurs catalans pour structurer le discours : opposition, cause, conséquence.", en: "Catalan connectors for discourse structure: opposition, cause, consequence." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_connectors_discurs.json"
  },
  {
    id: "cat_perifrasies_verbals",
    title: { fr: "Catalan — Périphrases verbales (estar + gerundi, acabar de, anar a...)", en: "Catalan — Verbal periphrases (estar + gerund, acabar de, anar a...)" },
    level: "B1",
    note: { fr: "Les périphrases verbales catalanes : estar+gerundi, anar a, acabar de, deixar de, haver de...", en: "Catalan verbal periphrases: estar+gerund, anar a, acabar de, deixar de, haver de..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_perifrasies_verbals.json"
  },
{
    id: "subjuntivo_imperfecto",
    title: { fr: "Subjonctif imparfait – Formation et usages (hablara, comiera...)", en: "Imperfect subjunctive – Formation and uses (hablara, comiera...)" },
    level: "B1",
    note: { fr: "Formation (3e pl. indéfini - ron + ra) et usages : si + subj. imp., discours indirect passé, désirs.", en: "Formation and uses: si + imperfect subj., indirect speech, past wishes." },
    country: "all",
    jsonPath: "/data/grammar_quizz/subjuntivo_imperfecto.json"
  },
  {
    id: "subjuntivo_perfecto",
    title: { fr: "Subjonctif passé – Haya + participio", en: "Perfect subjunctive – Haya + participle" },
    level: "B1",
    note: { fr: "Subjonctif passé : haya + participio pour une action passée dans un contexte subjonctif.", en: "Perfect subjunctive: haya + participle for past actions in subjunctive contexts." },
    country: "all",
    jsonPath: "/data/grammar_quizz/subjuntivo_perfecto.json"
  },{
    id: "futuro_simple_completo",
    title: { fr: "Futur simple – Réguliers + Irréguliers (complet)", en: "Simple future – Regular + Irregular (complete)" },
    level: "A2",
    note: { fr: "Futur simple réguliers + tous les irréguliers : haré, diré, pondré, tendré, vendré, saldré...", en: "Simple future regular + all irregulars: haré, diré, pondré, tendré, vendré, saldré..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/futuro_simple_completo.json"
  },
{
    id: "superlativos_exclamativas",
    title: { fr: "Superlatifs en -ísimo et phrases exclamatives (¡qué...! ¡tan...!)", en: "Superlatives in -ísimo and exclamatory sentences" },
    level: "B1",
    note: { fr: "Superlatifs absolus (-ísimo/a) + exclamatives ¡Qué bonito! / ¡Qué piso más caro!", en: "Absolute superlatives (-ísimo/a) + exclamatives ¡Qué bonito! / ¡Qué piso más caro!" },
    country: "all",
    jsonPath: "/data/grammar_quizz/superlativos_exclamativas.json"
  },
  {
    id: "verbos_emociones_subj",
    title: { fr: "Émotions + que + subjonctif (me fascina, me encanta, odio, no aguanto...)", en: "Emotions + que + subjunctive (me fascina, me encanta, odio, no aguanto...)" },
    level: "B1",
    note: { fr: "me fascina/encanta/odio/no aguanto + sustantivo/infinitivo ou + que + subjonctif.", en: "me fascina/encanta/odio/no aguanto + noun/infinitive or + que + subjunctive." },
    country: "all",
    jsonPath: "/data/grammar_quizz/verbos_emociones_subj.json"
  },
  {
    id: "verbos_cambio",
    title: { fr: "Verbes de changement (hacerse, ponerse, quedarse, volverse, sentirse...)", en: "Verbs of change (hacerse, ponerse, quedarse, volverse, sentirse...)" },
    level: "B1",
    note: { fr: "ponerse (état temporaire), quedarse (résultat inattendu), hacerse (progressif), volverse (caractère), sentirse, convertirse en.", en: "ponerse, quedarse, hacerse, volverse, sentirse, convertirse en — each with distinct nuance." },
    country: "all",
    jsonPath: "/data/grammar_quizz/verbos_cambio.json"
  },
  {
    id: "futuro_compuesto",
    title: { fr: "Futur antérieur – Habré + participio", en: "Future perfect – Habré + participle" },
    level: "B1",
    note: { fr: "Habré + participio : action accomplie avant un moment futur, ou hypothèse sur le passé récent.", en: "Habré + participle: action completed before a future moment, or hypothesis about recent past." },
    country: "all",
    jsonPath: "/data/grammar_quizz/futuro_compuesto.json"
  },
  {
    id: "es_injusto_valoracion",
    title: { fr: "Valorisation – Es injusto/una vergüenza/está bien/mal + inf/que + subjonctif", en: "Value judgements – Es injusto/una vergüenza/está bien/mal + inf/que + subjunctive" },
    level: "B1",
    note: { fr: "es injusto/una vergüenza/inaceptable/está bien/mal/me parece + infinitif ou + que + subjonctif.", en: "es injusto/una vergüenza/está bien/mal/me parece + infinitive or + que + subjunctive." },
    country: "all",
    jsonPath: "/data/grammar_quizz/es_injusto_valoracion.json"
  },
  {
    id: "aunque_y_eso_que",
    title: { fr: "Aunque, y eso que, aun así – Concession et contraste", en: "Aunque, y eso que, aun así – Concession and contrast" },
    level: "B1",
    note: { fr: "aunque + indicatif (réel) vs subjonctif (hypothétique), y eso que, aun así, a pesar de (que), sin embargo.", en: "aunque + indicative (real) vs subjunctive (hypothetical), y eso que, aun así, a pesar de (que)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/aunque_y_eso_que.json"
  },
{
    id: "cat_presentacio_practica",
    title: { fr: "Catalan — Pratiquer sa présentation personnelle", en: "Catalan — Practising your personal introduction" },
    level: "A1",
    note: { fr: "Em dic, Sóc de, Tinc anys, Visc a... des de fa, Treballo en, M'agrada, La meva llengua materna és...", en: "Em dic, Sóc de, Tinc anys, Visc a... des de fa, Treballo en, M'agrada, La meva llengua materna és..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_presentacio_practica.json"
  },
{
    id: "cat_portar_dur_tenir",
    title: { fr: "Catalan — Portar, dur, tenir, aguantar – Porter, tenir, apporter...", en: "Catalan — Portar, dur, tenir, aguantar – To carry, hold, bring..." },
    level: "A1-A2",
    note: { fr: "portar/dur (porter/apporter), tenir (avoir/tenir dans la main), aguantar (tenir/supporter), agafar (prendre), sostenir (soutenir).", en: "portar/dur (carry/bring), tenir (have/hold), aguantar (hold/bear), agafar (grab), sostenir (support)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_portar_dur_tenir.json"
  },
{
    id: "cat_pronoms_cod_coi",
    title: { fr: "Catalan — Pronoms COD et COI (em, et, el, la, li, ens, us, els, les...)", en: "Catalan — Direct and indirect object pronouns" },
    level: "A2",
    note: { fr: "COD : el/la/els/les/ho/em/et/ens/us. COI : li (ell/ella), els (ells). hi=y, en=en.", en: "COD: el/la/els/les/ho/em/et/ens/us. COI: li (ell/ella), els (ells). hi=there, en=some." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_pronoms_cod_coi.json"
  },

{
    id: "cat_dir_se_reflexius",
    title: { fr: "Catalan — Dir-se et verbes réflexifs (em, et, es, ens, us, es)", en: "Catalan — Dir-se and reflexive verbs (em, et, es, ens, us, es)" },
    level: "A1",
    note: { fr: "Dir-se (s'appeler) + pronoms réfléchis : em dic, et dius, es diu, ens diem, us dieu, es diuen.", en: "Dir-se (to be called) + reflexive pronouns: em dic, et dius, es diu, ens diem, us dieu, es diuen." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_dir_se_reflexius.json"
  },
// ═══════════════════════════════════════════════════════════════════════════
// AJOUTS À COLLER dans src/data/grammar.ts
// Colle ce bloc AVANT le ]; final du tableau grammarPoints
// ═══════════════════════════════════════════════════════════════════════════

  // ─── NOUVEAUX FICHIERS SESSION DU JOUR ────────────────────────────────────

  // Espagnol B1
  {
    id: "verbos_cambios",
    title: { fr: "Verbes de changement (hacerse, ponerse, quedarse, volverse, sentirse...)", en: "Verbs of change (hacerse, ponerse, quedarse, volverse, sentirse...)" },
    level: "B1",
    note: { fr: "ponerse (état temporaire), quedarse (résultat subi), hacerse (progressif), volverse (caractère), sentirse, convertirse en.", en: "ponerse, quedarse, hacerse, volverse, sentirse, convertirse en — each with distinct nuance." },
    country: "all",
    jsonPath: "/data/grammar_quizz/verbos_cambios.json"
  },

  // Catalan A1
  {
    id: "cat_hora",
    title: { fr: "Catalan — L'heure (Quina hora és?)", en: "Catalan — Telling time (Quina hora és?)" },
    level: "A1",
    note: { fr: "Demander et dire l'heure en catalan. És la una / Són les dues / i quart / i mitja / menys quart / en punt.", en: "Asking and telling the time in Catalan." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_hora.json"
  },

  // Catalan A1-A2
  {
    id: "cat_direccions_lloc",
    title: { fr: "Catalan — Prépositions de lieu et directions (a l'esquerra, a la dreta...)", en: "Catalan — Prepositions of place and directions" },
    level: "A1-A2",
    note: { fr: "Prépositions spatiales et vocabulaire pour donner des directions en catalan.", en: "Spatial prepositions and directions in Catalan." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_direccions_lloc.json"
  },

  // Catalan A2
  {
    id: "cat_present_perfet",
    title: { fr: "Catalan — Passé composé (he, has, ha... + participi)", en: "Catalan — Present perfect (he, has, ha... + participi)" },
    level: "A2",
    note: { fr: "Formation du passé composé catalan avec HAVER + participe. Participes réguliers et irréguliers (fet, dit, vist, vingut...).", en: "Catalan present perfect with HAVER + participle. Regular and irregular past participles." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_present_perfet.json"
  },

  // Catalan B1
  {
    id: "cat_plusquamperfet",
    title: { fr: "Catalan — Plus-que-parfait (havia + participi) et futur périphrastique (anar a + inf)", en: "Catalan — Pluperfect (havia + participi) and periphrastic future (anar a + inf)" },
    level: "B1",
    note: { fr: "Havia + participi pour l'antériorité dans le passé. Anar a + infinitif pour le futur immédiat.", en: "Havia + participi for past anteriority. Anar a + infinitive for immediate future." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_plusquamperfet.json"
  },

{
  id: "cat_hora",
  title: { fr: "Catalan — L'heure (Quina hora és?)", en: "Catalan — Telling time (Quina hora és?)" },
  level: "A1",
  note: { fr: "Demander et dire l'heure en catalan.", en: "Asking and telling the time in Catalan." },
  country: "all",
  jsonPath: "/data/grammar_quizz/cat_hora.json"
},
{
    id: "haber_vs_tener",
    title: { fr: "HABER vs TENER – Auxiliaire et possession", en: "HABER vs TENER – Auxiliary and possession" },
    level: "A2",
    note: { fr: "Différence entre HABER (auxiliaire) et TENER (avoir/posséder).", en: "Difference between HABER (auxiliary verb) and TENER (to have/possess)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/haber_vs_tener.json"
  },
{
  id: "relativas_indicativo_subjuntivo_vida",
  title: { fr: "Relatives – Indicatif vs Subjonctif dans la vie quotidienne", en: "Relative clauses – Indicative vs Subjunctive in everyday life" },
  level: "B1",
  note: { fr: "Automatiser le choix indicatif/subjonctif dans des situations réelles.", en: "Automating the indicative/subjunctive choice in real-life situations." },
  country: "all",
  jsonPath: "/data/grammar_quizz/relativas_indicativo_subjuntivo_vida.json"
},
{
    id: "cat_accions_quotidianes",
    title: { fr: "Catalan — Les actions quotidiennes (la routine au présent)", en: "Catalan — Daily actions (daily routine in the present)" },
    level: "A1-A2",
    note: { fr: "Vocabulaire de la routine quotidienne en catalan, conjugué au présent : es lleva, es dutxa, esmorza, fa la migdiada, surt a córrer, llegeix...", en: "Daily routine vocabulary in Catalan, conjugated in the present: es lleva, es dutxa, esmorza, fa la migdiada, surt a córrer, llegeix..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_accions_quotidianes.json"
  },
{
    id: "cat_present_reflexius",
    title: { fr: "Catalan — Verbes réflexifs au présent (conjugaison complète)", en: "Catalan — Reflexive verbs in the present (full conjugation)" },
    level: "A1-A2",
    note: { fr: "Conjuguer les verbes pronominaux aux 6 personnes : em llevo, et lleves, es lleva, ens llevem, us lleveu, es lleven. Inclut vestir-se (incoatiu) et l'élision m'/t'/s'.", en: "Conjugating reflexive verbs across all 6 persons, including vestir-se (inchoative) and m'/t'/s' elision." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_present_reflexius.json"
  },
  {
    id: "cat_rutines_diaries",
    title: { fr: "Catalan — Routines quotidiennes II (saisons, météo, AMB, fréquence)", en: "Catalan — Daily routines II (seasons, weather, AMB, frequency)" },
    level: "A2",
    note: { fr: "Mois et saisons, météo (fa fred, neva, plou), préposition AMB (companyia/manera/instrument), adverbes de fréquence et l'horari.", en: "Months and seasons, weather, the preposition AMB, frequency adverbs, and schedules." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_rutines_diaries.json"
  },
{
    id: "cat_pronom_en",
    title: { fr: "Catalan — Le pronom EN / N' (la quantité)", en: "Catalan — The pronoun EN / N' (quantity)" },
    level: "A2",
    note: { fr: "Le pronom EN pour remplacer une quantité (En tinc 25), avec apostrophe devant voyelle ou h muet (N'hi ha dues).", en: "The pronoun EN to replace a quantity, with apostrophe before vowels (N'hi ha dues)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_pronom_en.json"
  },
  {
    id: "cat_adreca_en_a",
    title: { fr: "Catalan — L'adresse : préposition EN vs A", en: "Catalan — The address: preposition EN vs A" },
    level: "A2",
    note: { fr: "Choisir EN (en un carrer, rue inconnue) ou A (al carrer Major, rue connue) pour dire où on habite.", en: "Choosing EN (unknown street) or A (known street) to say where you live." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_adreca_en_a.json"
  },
  {
    id: "cat_nombres_100_1000",
    title: { fr: "Catalan — Les nombres de 100 à 1000", en: "Catalan — Numbers from 100 to 1000" },
    level: "A1",
    note: { fr: "Les centaines (cent, dos-cents, tres-cents...) et leur combinaison (cent quaranta-tres, dos-cents noranta-u).", en: "Hundreds (cent, dos-cents...) and how to combine them." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_nombres_100_1000.json"
  },
  {
    id: "cat_parts_casa",
    title: { fr: "Catalan — Les parties de la maison et les objets", en: "Catalan — Parts of the house and objects" },
    level: "A1",
    note: { fr: "Vocabulaire des pièces (la cuina, el dormitori, el menjador...) et des objets de la maison (el llit, la nevera...).", en: "Vocabulary for rooms and household objects." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_parts_casa.json"
  },
  {
    id: "cat_habitatge",
    title: { fr: "Catalan — Le logement (types, lieu, caractéristiques)", en: "Catalan — Housing (types, location, characteristics)" },
    level: "A2",
    note: { fr: "Types de logement (de lloguer, pis compartit), localisation (als afores, al centre) et caractéristiques (gran/petit, moblat/buit, amb ascensor).", en: "Housing types, location, and characteristics vocabulary." },
    country: "all",
    jsonPath: "/data/grammar_quizz/cat_habitatge.json"
  },
{
    id: "verbos_usos_inesperados",
    title: { fr: "Verbes au sens inattendu (tocar, tomar, quedar...)", en: "Verbs with unexpected meanings (tocar, tomar, quedar...)" },
    level: "A2-B1",
    note: { fr: "Verbes courants dont le sens surprend un francophone (tocar = jouer, tomar = boire, quedar = avoir rendez-vous...).", en: "Common verbs with surprising meanings (tocar = to play, tomar = to drink, quedar = to arrange to meet...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/verbos_usos_inesperados.json"
  },
{
    id: "voz_pasiva_se_b2",
    title: { fr: "Voix passive et SE (passif / impersonnel) — B2.1", en: "Passive voice and SE (passive / impersonal) — B2.1" },
    level: "B2",
    note: { fr: "Passive avec ser, passive réfléchie (se venden) et se impersonnel.", en: "Passive with ser, reflexive passive (se venden) and impersonal se." },
    country: "all",
    jsonPath: "/data/grammar_quizz/voz_pasiva_se_b2.json"
  },
  {
    id: "opinion_indicativo_subjuntivo_b2",
    title: { fr: "Opinion : indicatif ou subjonctif — B2.1", en: "Opinion: indicative or subjunctive — B2.1" },
    level: "B2",
    note: { fr: "Affirmer (indicatif) vs nier / valoriser / douter (subjonctif).", en: "Asserting (indicative) vs denying / evaluating / doubting (subjunctive)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/opinion_indicativo_subjuntivo_b2.json"
  },
  {
    id: "estilo_indirecto_pasado_b2",
    title: { fr: "Discours rapporté et subjonctif imparfait — B2.1", en: "Reported speech and imperfect subjunctive — B2.1" },
    level: "B2",
    note: { fr: "Recul des temps et subjonctif imparfait (pidió que viniera, si tuviera...).", en: "Tense backshift and imperfect subjunctive (pidió que viniera, si tuviera...)." },
    country: "all",
    jsonPath: "/data/grammar_quizz/estilo_indirecto_pasado_b2.json"
  },
  {
    id: "conectores_argumentacion_b2",
    title: { fr: "Connecteurs et argumentation — B2.1", en: "Connectors and argumentation — B2.1" },
    level: "B2",
    note: { fr: "Opposition, cause/conséquence, ajout : sin embargo, por lo tanto, aunque...", en: "Opposition, cause/effect, addition: sin embargo, por lo tanto, aunque..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/conectores_argumentacion_b2.json"
  },
  {
    id: "perifrasis_verbales_b2",
    title: { fr: "Périphrases verbales — B2.1", en: "Verb periphrases — B2.1" },
    level: "B2",
    note: { fr: "ir a, acabar de, volver a, dejar de, llevar/seguir + gérondif...", en: "ir a, acabar de, volver a, dejar de, llevar/seguir + gerund..." },
    country: "all",
    jsonPath: "/data/grammar_quizz/perifrasis_verbales_b2.json"
  },
];