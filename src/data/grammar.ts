// src/data/grammar.ts
// VERSION MINIMALE - N'importe AUCUN fichier manquant

// --- IMPORTS DES FICHIERS JSON QUI EXISTENT ---
import presenteRegulares from "./grammar_quizz/presente_regulares.json";
import presenteIrregulares from "./grammar_quizz/presente_irregulares.json";
import presenteProgresivo from "./grammar_quizz/presente_progresivo.json";
import serEstar from "./grammar_quizz/ser_estar.json";
import reflexivos from "./grammar_quizz/verbos_reflexivos.json";
import posesivos from "./grammar_quizz/posesivos.json";
import demostrativos from "./grammar_quizz/demostrativos.json";
import adjetivos from "./grammar_quizz/acuerdo_adjetivos.json";
import adverbiosFrecuencia from "./grammar_quizz/adverbios_frecuencia.json";
import cotidianoBasics from "./grammar_quizz/cotidiano_basics.json";
import futuroSimpleReg from "./grammar_quizz/futuro_simple_regulares.json";
import futuroSimpleIrreg from "./grammar_quizz/futuro_simple_irregulares.json";
import genero from "./grammar_quizz/genero_sustantivos.json";
import gustar from "./grammar_quizz/gustar.json";
import hayEstar from "./grammar_quizz/hay_estar.json";
import imperfecto from "./grammar_quizz/imperfecto.json";
import interrogativos from "./grammar_quizz/interrogatives.json";
import muyVsMucho from "./grammar_quizz/muy_vs_mucho.json";
import negacion from "./grammar_quizz/negacion.json";
import numeros from "./grammar_quizz/numeros.json";
import preposicionesLugar from "./grammar_quizz/preposiciones_lugar.json";

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

  // IMPARFAIT & FUTUR
  {
    id: "imperfecto",
    title: "Imparfait – actions habituelles",
    level: "A2",
    note: "Décrire des habitudes et situations passées.",
    data: imperfecto
  },
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
  },
{
  id: 'weather-expressions',
  level: 'A1',
  title: 'Parler de la météo',
  titleEs: 'Hablar del tiempo',
  description: 'Apprends à décrire le temps qu\'il fait en espagnol avec "hacer", "estar", "haber" et les verbes impersonnels.',
  
  theory: `
## 🌤️ Comment parler de la météo en espagnol

### 1. Avec le verbe HACER (faire)
- **Hace calor** = Il fait chaud
- **Hace frío** = Il fait froid
- **Hace sol** = Il fait soleil
- **Hace viento** = Il y a du vent
- **Hace buen tiempo** = Il fait beau
- **Hace mal tiempo** = Il fait mauvais

### 2. Avec le verbe ESTAR (être)
- **Está nublado** = C'est nuageux
- **Está despejado** = C'est dégagé
- **Está lloviendo** = Il pleut (en ce moment)
- **Está nevando** = Il neige (en ce moment)

### 3. Avec le verbe HABER (il y a)
- **Hay niebla** = Il y a du brouillard
- **Hay tormenta** = Il y a un orage
- **Hay nubes** = Il y a des nuages

### 4. Verbes impersonnels
- **Llueve** = Il pleut
- **Nieva** = Il neige
- **Graniza** = Il grêle

### 💡 Exemples pratiques
- **¿Qué tiempo hace hoy?** = Quel temps fait-il aujourd'hui ?
- **Hace mucho calor en verano** = Il fait très chaud en été
- **Está lloviendo mucho** = Il pleut beaucoup
- **Hay 25 grados** = Il fait 25 degrés
`,

  exercises: [
    {
      id: 'weather-1',
      type: 'fill',
      question: 'Complète avec le bon verbe et mot',
      prompt: 'En verano, ___ mucho ___. (Il fait très chaud)',
      answer: 'hace|calor',
      options: ['hace calor', 'está calor', 'hay calor', 'hace frío'],
      explanation: 'On utilise "HACE" + condition météo. "Hace calor" = Il fait chaud.'
    },
    {
      id: 'weather-2',
      type: 'fill',
      question: 'Complète la phrase',
      prompt: 'Hoy no hace sol, ___ nublado. (C\'est nuageux)',
      answer: 'está',
      options: ['está', 'hace', 'hay', 'es'],
      explanation: 'Avec "nublado" (nuageux), on utilise ESTAR : "Está nublado".'
    },
    {
      id: 'weather-3',
      type: 'fill',
      question: 'Quel verbe impersonnel ?',
      prompt: 'En invierno ___ mucho en las montañas. (Il neige)',
      answer: 'nieva',
      options: ['nieva', 'está nevando', 'hace nieve', 'hay nieve'],
      explanation: 'Verbe impersonnel : NEVAR → Nieva (il neige).'
    },
    {
      id: 'weather-4',
      type: 'translate',
      question: 'Traduis en espagnol',
      prompt: 'Il fait du vent aujourd\'hui',
      answer: 'hace viento hoy',
      explanation: 'Hace viento = Il fait du vent / Il y a du vent'
    },
    {
      id: 'weather-5',
      type: 'fill',
      question: 'Complète avec HABER',
      prompt: 'No veo nada, ___ mucha niebla. (Il y a du brouillard)',
      answer: 'hay',
      options: ['hay', 'hace', 'está', 'tiene'],
      explanation: 'HAY + niebla = Il y a du brouillard. "Hay" vient de HABER.'
    },
    {
      id: 'weather-6',
      type: 'fill',
      question: 'Quelle est la bonne forme ?',
      prompt: 'Mañana va a ___ buen tiempo. (Il fera beau)',
      answer: 'hacer',
      options: ['hacer', 'estar', 'haber', 'ser'],
      explanation: 'Après "va a", on met l\'infinitif : "Va a HACER buen tiempo".'
    },
    {
      id: 'weather-7',
      type: 'translate',
      question: 'Traduis en espagnol',
      prompt: 'Il pleut beaucoup',
      answer: 'llueve mucho',
      explanation: 'Verbe impersonnel LLOVER → Llueve (il pleut). "Llueve mucho" = Il pleut beaucoup.'
    },
    {
      id: 'weather-8',
      type: 'fill',
      question: 'Complète la question',
      prompt: '¿Qué tiempo ___ hoy? (Quel temps fait-il ?)',
      answer: 'hace',
      options: ['hace', 'está', 'hay', 'es'],
      explanation: 'La question classique : "¿Qué tiempo HACE?" = Quel temps fait-il ?'
    },
    {
      id: 'weather-9',
      type: 'translate',
      question: 'Traduis en espagnol',
      prompt: 'Il y a un orage',
      answer: 'hay tormenta',
      explanation: 'HAY + tormenta = Il y a un orage. "Tormenta" = orage/tempête.'
    },
    {
      id: 'weather-10',
      type: 'fill',
      question: 'Complète avec estar + gérondif',
      prompt: 'Ahora mismo ___ ___. (Il pleut en ce moment)',
      answer: 'está|lloviendo',
      options: ['está lloviendo', 'hace lluvia', 'llueve', 'hay lluvia'],
      explanation: 'Pour une action en cours : ESTAR + gérondif. "Está lloviendo" = Il est en train de pleuvoir.'
    }
  ],

  vocabulary: [
    { spanish: 'el tiempo', french: 'le temps (météo)', example: '¿Qué tiempo hace?' },
    { spanish: 'hace calor', french: 'il fait chaud', example: 'En verano hace mucho calor' },
    { spanish: 'hace frío', french: 'il fait froid', example: 'En invierno hace frío' },
    { spanish: 'hace sol', french: 'il fait soleil', example: 'Hoy hace sol' },
    { spanish: 'hace viento', french: 'il y a du vent', example: 'Hace mucho viento' },
    { spanish: 'llueve', french: 'il pleut', example: 'Está lloviendo ahora' },
    { spanish: 'nieva', french: 'il neige', example: 'En diciembre nieva' },
    { spanish: 'está nublado', french: 'c\'est nuageux', example: 'El cielo está nublado' },
    { spanish: 'hay niebla', french: 'il y a du brouillard', example: 'Por la mañana hay niebla' },
    { spanish: 'la temperatura', french: 'la température', example: 'La temperatura es de 20 grados' },
    { spanish: 'los grados', french: 'les degrés', example: 'Hace 30 grados' },
    { spanish: 'la lluvia', french: 'la pluie', example: 'Me gusta la lluvia' },
    { spanish: 'la nieve', french: 'la neige', example: 'La nieve es blanca' },
    { spanish: 'el viento', french: 'le vent', example: 'El viento es fuerte' },
    { spanish: 'la tormenta', french: 'l\'orage', example: 'Hay una tormenta' },
    { spanish: 'el pronóstico', french: 'la météo/prévisions', example: 'El pronóstico dice que lloverá' }
  ],

  tips: [
    '🌡️ Pour dire la température : "Hace 25 grados" (Il fait 25 degrés)',
    '☀️ "Hacer" s\'utilise pour les sensations : calor, frío, sol, viento',
    '☁️ "Estar" s\'utilise avec les adjectifs : nublado, despejado',
    '🌧️ Les verbes météo sont impersonnels (pas de sujet) : llueve, nieva',
    '⚡ "Hay" + nom = Il y a : hay tormenta, hay niebla, hay nubes'
  ]
}
];