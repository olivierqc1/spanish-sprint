export type Lesson = { theme: string; notes?: string; details: string[][] };


// Semaine 1 (A1→A2) — Jour 1 à 7
export const week1: Lesson[] = [
  {
    theme: "Présentation + SER / ESTAR / TENER",
    details: [
      ["Podcast lent: Coffee Break Spanish #1", "Shadowing 2x"],
      ["Salutations, chiffres 1–100, jours/mois, nationalités (40 mots)", "Anki: 2 paquets"],
      ["SER vs ESTAR vs TENER: 10 phrases/ verbe", "Verbes réguliers -AR au présent"],
      ["Monologue 60–90s: me llamo…, vivo…, me gusta…", "Enregistre et réécoute"],
      ["Revoir 50 cartes + 20 phrases de révision"],
    ],
  },
  {
    theme: "Verbes réguliers -ER/-IR, articles, genre/nombre",
    details: [
      ["Notes in Spanish Beginners #2"],
      ["Maison & nourriture (40 mots)"],
      ["Présent -ER/-IR, articles, pluriels"],
      ["Questions simples: ¿Qué te gusta?, ¿Dónde vives?"],
      ["Révision espacée Anki + dictée courte"],
    ],
  },
  {
    theme: "Pretérito perfecto + marcadores de tiempo",
    details: [
      ["Español Automático: mini-clip principiante"],
      ["Verbes fréquents (haber, ir, hacer, poder…)"],
      ["Pretérito perfecto (he comido…) + participes"],
      ["Raconter sa semaine (ayer, hoy, esta semana)"],
      ["Quiz grammaire 15 min"],
    ],
  },
  {
    theme: "Futur proche (ir a + inf.), gustar, verbes pronominaux",
    details: [
      ["Dialogue A1: projets du week-end"],
      ["Loisirs & sport (30 mots)"],
      ["ir a + inf., gustar, me/te/se"],
      ["Jeu de rôle: au café / au marché"],
      ["Anki + mini-dictée"],
    ],
  },
  {
    theme: "Journée type, horaire, prépositions de lieu",
    details: [
      ["Audio: routine quotidienne"],
      ["Temps/horaire (30 mots)"],
      ["prepositions en/a/por/para"],
      ["Décrire sa journée"],
      ["Révision cumulative"],
    ],
  },
  {
    theme: "Révision S1 + écoute longue (20–30 min)",
    details: [
      ["Podcast continu 20–30 min"],
      ["Vocab recap"],
      ["Test rapide A1→A2"],
      ["Conversation guidée 5 questions"],
      ["Flash review"],
    ],
  },
  {
    theme: "Jour léger / exposition culturelle",
    details: [
      ["Film/série VO + sous-titres ES"],
      ["Mots de la culture (20)"],
      ["Aucun nouveau point"],
      ["Parler du film 2 min"],
      ["Anki 15 min"],
    ],
  },
];


// Semaine 2 (Renforcer A2) — Temps du passé, descriptions, ville/voyage
export const week2: Lesson[] = [
  {
    theme: "Pretérito indefinido #1 (réguliers)",
    details: [
      ["Podcast: passé simple débutants"],
      ["Verbes -AR/-ER/-IR au pretérito"],
      ["Terminaisons régulières, accentuation"],
      ["Raconter hier (3–4 phrases)"],
      ["Cartes: verbes fréquents (15)"],
    ],
  },
  {
    theme: "Pretérito indefinido #2 (irréguliers)",
    details: [
      ["Audio: historias cortas"],
      ["estar, tener, ir/ser, hacer, poder, poner"],
      ["Table d’irréguliers + exercices"],
      ["Raconter un voyage passé"],
      ["Quiz 15 min + Anki"],
    ],
  },
  {
    theme: "Imperfecto vs Indefinido (contraste)",
    details: [
      ["Notes in Spanish: récit"],
      ["Adverbes de temps (siempre, antes, mientras…)"],
      ["Usages: description vs action ponctuelle"],
      ["Mini-histoire guidée"],
      ["Révision cartes + 10 phrases contraste"],
    ],
  },
  {
    theme: "Connecteurs & récit (porque, entonces, luego)",
    details: [
      ["Audio: cuento corto"],
      ["Connecteurs de narration (30)"],
      ["Réécriture d’un récit avec connecteurs"],
      ["Raconter une anecdote (90s)"],
      ["Dictée 5–7 lignes"],
    ],
  },
  {
    theme: "Ville & déplacements",
    details: [
      ["Compréhension: demander son chemin"],
      ["Vocab: transports, directions (40)"],
      ["por/para — révision de base"],
      ["Jeu de rôle: à la gare / au métro"],
      ["Anki + phrases utiles (10)"],
    ],
  },
  {
    theme: "Voyage: hébergement & restaurants",
    details: [
      ["Dialogue hôtel/resto"],
      ["Vocab: réservation, menu, plaintes (35)"],
      ["Imperativos (usted/ustedes) basiques"],
      ["Jeu de rôle: réserver, commander"],
      ["Révision S2 partielle"],
    ],
  },
  {
    theme: "S2 Checkpoint (léger)",
    details: [
      ["Écoute longue 25–30 min"],
      ["Vocab recap (listes faibles)"],
      ["Mini-test passé + connecteurs"],
      ["Conversation guidée (7 questions)"],
      ["Flash review + Anki 15 min"],
    ],
  },
];


// Stubs pour Semaine 3 et 4 (à compléter plus tard)
export const week3: Lesson[] = [
  {
    theme: "Semaine 3 — à compléter",
    details: [["Contenu à définir"]],
  },
];

export const week4: Lesson[] = [
  {
    theme: "Semaine 4 — à compléter",
    details: [["Contenu à définir"]],
  },
];


// Curriculum complet
export const curriculum = [week1, week2, week3, week4];
