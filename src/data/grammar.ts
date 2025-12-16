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
  },{
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
},{
  "id": "parecer_vs_parecerse_a",
  "title": {
    "fr": "PARECER vs PARECERSE A – Sembler et ressembler",
    "en": "PARECER vs PARECERSE A – To seem and to resemble"
  },
  "level": "A2",
  "note": {
    "fr": "⚙️ **PARECER** et **PARECERSE A** sont deux verbes différents avec des usages distincts.\n\n🔹 **1. PARECER = Sembler / Paraître (impression, opinion)**\n\n**Usage :** Exprimer une **impression** ou une **opinion** sur quelque chose/quelqu'un\n\n**Structures :**\n\n**A) PARECER + adjectif** (donner une impression)\n➡️ *Esta película parece interesante.* (Ce film semble intéressant.)\n➡️ *Juan parece cansado.* (Juan a l'air fatigué.)\n➡️ *La comida parece deliciosa.* (La nourriture a l'air délicieuse.)\n\n**B) PARECER + nom** (avoir l'air de)\n➡️ *Pareces un actor.* (Tu as l'air d'un acteur.)\n➡️ *Esto parece una broma.* (Ça a l'air d'une blague.)\n\n**C) PARECER QUE** (il semble que)\n➡️ *Parece que va a llover.* (Il semble qu'il va pleuvoir.)\n➡️ *Parece que está enfermo.* (Il semble qu'il est malade.)\n\n**D) ME PARECE (QUE)** (je trouve que, il me semble que)\n➡️ *Me parece buena idea.* (Je trouve que c'est une bonne idée.)\n➡️ *Me parece que tienes razón.* (Il me semble que tu as raison.)\n➡️ *¿Qué te parece?* (Qu'en penses-tu ?)\n\n💡 **Conjugaison de PARECER (présent) :**\n- (yo) parezco\n- (tú) pareces\n- (él/ella/usted) parece\n- (nosotros) parecemos\n- (vosotros) parecéis\n- (ellos/ellas/ustedes) parecen\n\n🔹 **2. PARECERSE A = Ressembler à (similarité physique/de caractère)**\n\n**Usage :** Exprimer une **ressemblance physique** ou de **caractère** entre deux personnes/choses\n\n**Structure :** sujet + SE + PARECE A + personne/chose\n\n➡️ *Me parezco a mi padre.* (Je ressemble à mon père.)\n➡️ *Te pareces a tu hermano.* (Tu ressembles à ton frère.)\n➡️ *Ana se parece a su madre.* (Ana ressemble à sa mère.)\n➡️ *Estos dos coches se parecen mucho.* (Ces deux voitures se ressemblent beaucoup.)\n➡️ *No me parezco a nadie de mi familia.* (Je ne ressemble à personne dans ma famille.)\n\n💡 **Conjugaison de PARECERSE (présent) :**\n- (yo) **me** parezco\n- (tú) **te** pareces\n- (él/ella/usted) **se** parece\n- (nosotros) **nos** parecemos\n- (vosotros) **os** parecéis\n- (ellos/ellas/ustedes) **se** parecen\n\n⚠️ **Attention :** PARECERSE est un verbe **pronominal** (avec SE)\n\n🔸 **Différence clé :**\n\n| PARECER | PARECERSE A |\n|---------|-------------|\n| Sembler, paraître (impression) | Ressembler à (similarité) |\n| Pareces cansado (Tu sembles fatigué) | Te pareces a tu padre (Tu ressembles à ton père) |\n| Opinion, impression | Ressemblance physique/caractère |\n| Pas de SE | Avec SE (verbe pronominal) |\n| Pas de A | Toujours avec A |\n\n💬 **Exemples comparatifs :**\n\n➡️ *Juan **parece** un actor.* (Juan a l'air d'un acteur - impression)\n➡️ *Juan **se parece a** Brad Pitt.* (Juan ressemble à Brad Pitt - ressemblance physique)\n\n➡️ *Esta casa **parece** vieja.* (Cette maison semble vieille - impression)\n➡️ *Esta casa **se parece a** la mía.* (Cette maison ressemble à la mienne - similarité)\n\n➡️ *Me **parece** interesante.* (Ça me semble intéressant - opinion)\n➡️ *Me **parezco a** mi hermana.* (Je ressemble à ma sœur - ressemblance)\n\n🔹 **Questions courantes :**\n\n**Avec PARECER :**\n- *¿Qué te parece?* → Qu'en penses-tu ?\n- *¿Cómo te parece esta idea?* → Comment trouves-tu cette idée ?\n- *¿Te parece bien?* → Ça te va ? / Tu es d'accord ?\n\n**Avec PARECERSE A :**\n- *¿A quién te pareces?* → À qui ressembles-tu ?\n- *¿Te pareces a tu madre o a tu padre?* → Tu ressembles à ta mère ou à ton père ?\n- *¿Se parecen mucho?* → Ils se ressemblent beaucoup ?\n\n🔹 **Expressions courantes :**\n\n**PARECER :**\n- *Al parecer...* → Apparemment...\n- *Me parece que sí/no.* → Je pense que oui/non.\n- *Parece mentira.* → C'est incroyable.\n- *Parece que fue ayer.* → On dirait que c'était hier.\n\n**PARECERSE A :**\n- *Se parecen como dos gotas de agua.* → Ils se ressemblent comme deux gouttes d'eau.\n- *No se parecen en nada.* → Ils ne se ressemblent en rien.\n\n💡 **Résumé :**\n\n✅ **PARECER** → Opinion, impression (sembler, paraître)\n  - *Pareces cansado.* (Tu sembles fatigué)\n  - *Me parece buena idea.* (Ça me semble une bonne idée)\n\n✅ **PARECERSE A** → Ressemblance physique/caractère (ressembler à)\n  - *Me parezco a mi madre.* (Je ressemble à ma mère)\n  - *Se parecen mucho.* (Ils se ressemblent beaucoup)\n\n⚠️ **Erreurs fréquentes :**\n- ❌ *Me parece a mi padre.* → ✅ *Me parezco a mi padre.*\n- ❌ *Te pareces cansado.* → ✅ *Pareces cansado.*\n- ❌ *Parece a su hermano.* → ✅ *Se parece a su hermano.*",
    "en": "⚙️ **PARECER** and **PARECERSE A** are two different verbs with distinct uses.\n\n🔹 **1. PARECER = To seem / To appear (impression, opinion)**\n\n**Usage:** To express an **impression** or **opinion** about something/someone\n\n**Structures:**\n\n**A) PARECER + adjective** (to give an impression)\n➡️ *Esta película parece interesante.* (This movie seems interesting.)\n➡️ *Juan parece cansado.* (Juan looks tired.)\n➡️ *La comida parece deliciosa.* (The food looks delicious.)\n\n**B) PARECER + noun** (to look like)\n➡️ *Pareces un actor.* (You look like an actor.)\n➡️ *Esto parece una broma.* (This looks like a joke.)\n\n**C) PARECER QUE** (it seems that)\n➡️ *Parece que va a llover.* (It seems like it's going to rain.)\n➡️ *Parece que está enfermo.* (It seems he's sick.)\n\n**D) ME PARECE (QUE)** (I think that, it seems to me that)\n➡️ *Me parece buena idea.* (I think it's a good idea.)\n➡️ *Me parece que tienes razón.* (It seems to me that you're right.)\n➡️ *¿Qué te parece?* (What do you think?)\n\n💡 **Conjugation of PARECER (present):**\n- (yo) parezco\n- (tú) pareces\n- (él/ella/usted) parece\n- (nosotros) parecemos\n- (vosotros) parecéis\n- (ellos/ellas/ustedes) parecen\n\n🔹 **2. PARECERSE A = To resemble / To look like (physical/character similarity)**\n\n**Usage:** To express a **physical resemblance** or **character similarity** between two people/things\n\n**Structure:** subject + SE + PARECE A + person/thing\n\n➡️ *Me parezco a mi padre.* (I look like my father.)\n➡️ *Te pareces a tu hermano.* (You look like your brother.)\n➡️ *Ana se parece a su madre.* (Ana looks like her mother.)\n➡️ *Estos dos coches se parecen mucho.* (These two cars look very similar.)\n➡️ *No me parezco a nadie de mi familia.* (I don't look like anyone in my family.)\n\n💡 **Conjugation of PARECERSE (present):**\n- (yo) **me** parezco\n- (tú) **te** pareces\n- (él/ella/usted) **se** parece\n- (nosotros) **nos** parecemos\n- (vosotros) **os** parecéis\n- (ellos/ellas/ustedes) **se** parecen\n\n⚠️ **Watch out:** PARECERSE is a **reflexive verb** (with SE)\n\n🔸 **Key difference:**\n\n| PARECER | PARECERSE A |\n|---------|-------------|\n| To seem, to appear (impression) | To resemble, to look like (similarity) |\n| Pareces cansado (You seem tired) | Te pareces a tu padre (You look like your father) |\n| Opinion, impression | Physical/character resemblance |\n| No SE | With SE (reflexive verb) |\n| No A | Always with A |\n\n💬 **Comparative examples:**\n\n➡️ *Juan **parece** un actor.* (Juan looks like an actor - impression)\n➡️ *Juan **se parece a** Brad Pitt.* (Juan looks like Brad Pitt - physical resemblance)\n\n➡️ *Esta casa **parece** vieja.* (This house seems old - impression)\n➡️ *Esta casa **se parece a** la mía.* (This house looks like mine - similarity)\n\n➡️ *Me **parece** interesante.* (It seems interesting to me - opinion)\n➡️ *Me **parezco a** mi hermana.* (I look like my sister - resemblance)\n\n🔹 **Common questions:**\n\n**With PARECER:**\n- *¿Qué te parece?* → What do you think?\n- *¿Cómo te parece esta idea?* → How do you find this idea?\n- *¿Te parece bien?* → Is that okay with you? / Do you agree?\n\n**With PARECERSE A:**\n- *¿A quién te pareces?* → Who do you look like?\n- *¿Te pareces a tu madre o a tu padre?* → Do you look like your mother or your father?\n- *¿Se parecen mucho?* → Do they look very alike?\n\n🔹 **Common expressions:**\n\n**PARECER:**\n- *Al parecer...* → Apparently...\n- *Me parece que sí/no.* → I think so/not.\n- *Parece mentira.* → It's unbelievable.\n- *Parece que fue ayer.* → It seems like it was yesterday.\n\n**PARECERSE A:**\n- *Se parecen como dos gotas de agua.* → They're like two peas in a pod.\n- *No se parecen en nada.* → They don't look alike at all.\n\n💡 **Summary:**\n\n✅ **PARECER** → Opinion, impression (to seem, to appear)\n  - *Pareces cansado.* (You seem tired)\n  - *Me parece buena idea.* (It seems like a good idea to me)\n\n✅ **PARECERSE A** → Physical/character resemblance (to look like)\n  - *Me parezco a mi madre.* (I look like my mother)\n  - *Se parecen mucho.* (They look very alike)\n\n⚠️ **Common mistakes:**\n- ❌ *Me parece a mi padre.* → ✅ *Me parezco a mi padre.*\n- ❌ *Te pareces cansado.* → ✅ *Pareces cansado.*\n- ❌ *Parece a su hermano.* → ✅ *Se parece a su hermano.*"
  },
  "drills": [
    { "prompt": "Juan ___ cansado. (semble)", "answer": "parece" },
    { "prompt": "Me ___ a mi padre. (ressemble)", "answer": "parezco" },
    { "prompt": "Esta película ___ interesante. (semble)", "answer": "parece" },
    { "prompt": "Te ___ a tu hermano. (ressembles)", "answer": "pareces" },
    { "prompt": "¿Qué te ___? (Qu'en penses-tu)", "answer": "parece" },
    { "prompt": "Ana se ___ a su madre. (ressemble)", "answer": "parece" },
    { "prompt": "Me ___ buena idea. (Je trouve que)", "answer": "parece" },
    { "prompt": "Nos ___ mucho. (Nous nous ressemblons)", "answer": "parecemos" },
    { "prompt": "___ que va a llover. (Il semble que)", "answer": "Parece" },
    { "prompt": "¿A quién te ___? (À qui ressembles-tu)", "answer": "pareces" },
    { "prompt": "La comida ___ deliciosa. (semble)", "answer": "parece" },
    { "prompt": "Ellos se ___ mucho. (se ressemblent)", "answer": "parecen" },
    { "prompt": "___ un actor. (Tu sembles être)", "answer": "Pareces" },
    { "prompt": "No me ___ a nadie. (Je ne ressemble à)", "answer": "parezco" },
    { "prompt": "Esta casa ___ vieja. (semble)", "answer": "parece" },
    { "prompt": "Esta casa se ___ a la mía. (ressemble)", "answer": "parece" },
    { "prompt": "Me ___ que tienes razón. (Il me semble que)", "answer": "parece" },
    { "prompt": "¿Te ___ a tu madre? (ressembles)", "answer": "pareces" },
    { "prompt": "___ una broma. (Ça semble être)", "answer": "Parece" },
    { "prompt": "Los hermanos se ___ como dos gotas de agua. (se ressemblent)", "answer": "parecen" },
    { "prompt": "¿Te ___ bien? (Ça te va)", "answer": "parece" },
    { "prompt": "Me ___ a mi abuela. (ressemble)", "answer": "parezco" },
    { "prompt": "___ que está enfermo. (Il semble que)", "answer": "Parece" },
    { "prompt": "Os ___ mucho. (Vous vous ressemblez)", "answer": "parecéis" },
    { "prompt": "¿Cómo te ___ esta idea? (Comment trouves-tu)", "answer": "parece" },
    { "prompt": "Se ___ a Brad Pitt. (Il ressemble à)", "answer": "parece" },
    { "prompt": "Al ___, está lloviendo. (Apparemment)", "answer": "parecer" },
    { "prompt": "No se ___ en nada. (Ils ne se ressemblent)", "answer": "parecen" },
    { "prompt": "Tu hermano ___ simpático. (semble)", "answer": "parece" },
    { "prompt": "¿A quién se ___ el bebé? (ressemble)", "answer": "parece" }
  ]
}
];