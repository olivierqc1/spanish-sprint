// src/data/conjugacion/negativo.ts
// Remplace [NOM_TEMPS] par: preterito, imperfecto, futuro, etc.

export const [NOM_TEMPS] = {
  metadata: {
    id: '[nom_temps]',
    name: { 
      fr: '[Nom en français]', 
      en: '[Name in English]' 
    },
    description: { 
      fr: '[Description en français]', 
      en: '[Description in English]' 
    },
    level: 'A2', // A1, A2, B1, etc.
    usage: {
      fr: [
        'Usage 1 en français avec exemple',
        'Usage 2 en français avec exemple',
        'Usage 3 en français avec exemple',
        'Usage 4 en français avec exemple'
      ],
      en: [
        'Usage 1 in English with example',
        'Usage 2 in English with example',
        'Usage 3 in English with example',
        'Usage 4 in English with example'
      ]
    },
    examples: {
      fr: [
        'Exemple de phrase 1',
        'Exemple de phrase 2',
        'Exemple de phrase 3',
        'Exemple de phrase 4'
      ],
      en: [
        'Example sentence 1',
        'Example sentence 2',
        'Example sentence 3',
        'Example sentence 4'
      ]
    },
    endings: {
      ar: ['terminaison1', 'terminaison2', 'terminaison3', 'terminaison4', 'terminaison5', 'terminaison6'],
      er: ['terminaison1', 'terminaison2', 'terminaison3', 'terminaison4', 'terminaison5', 'terminaison6'],
      ir: ['terminaison1', 'terminaison2', 'terminaison3', 'terminaison4', 'terminaison5', 'terminaison6']
    },
    verbExamples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  exercises: [
    // EXEMPLE D'EXERCICE - Duplique ce format jusqu'à 100 exercices!
    { 
      id: 1, 
      verb: 'hablar', 
      verbType: 'ar' as const, 
      pronoun: 0, 
      prompt: { fr: 'Yo ___ español', en: 'I ___ Spanish' }, 
      answer: 'hablé', // Adapte selon le temps
      meaning: { fr: 'J\'ai parlé espagnol', en: 'I spoke Spanish' }, 
      difficulty: 'easy' as const, 
      category: 'regular' 
    },
    // Ajoute plus d'exercices ici (jusqu'à 100!)
  ]
};