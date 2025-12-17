export const imperfecto = {
  metadata: {
    id: 'imperfecto',
    name: { fr: 'Imparfait (Imperfecto)', en: 'Imperfect' },
    description: { fr: 'Actions répétées, habituelles ou en cours dans le passé', en: 'Repeated, habitual, or ongoing actions in the past' },
    level: 'A2',
    usage: {
      fr: [
        'Actions habituelles : "Cuando era niño, jugaba al fútbol" (Quand j\'étais enfant, je jouais au foot)',
        'Descriptions : "La casa era grande y tenía un jardín" (La maison était grande et avait un jardin)',
        'Actions en cours : "Mientras comía, leía el periódico" (Pendant que je mangeais, je lisais le journal)',
        'Heure dans le passé : "Eran las tres de la tarde" (Il était trois heures de l\'après-midi)'
      ],
      en: [
        'Habitual actions: "Cuando era niño, jugaba al fútbol" (When I was a child, I played soccer)',
        'Descriptions: "La casa era grande y tenía un jardín" (The house was big and had a garden)',
        'Ongoing actions: "Mientras comía, leía el periódico" (While I ate, I read the newspaper)',
        'Time in the past: "Eran las tres de la tarde" (It was three in the afternoon)'
      ]
    },
    examples: {
      fr: ['De niño, hablaba mucho', 'Siempre comíamos juntos', 'Vivía cerca del mar', 'Cada día estudiaba dos horas'],
      en: ['As a child, I talked a lot', 'We always ate together', 'I lived near the sea', 'Every day I studied two hours']
    },
    endings: {
      ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
      er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
      ir: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían']
    },
    verbExamples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  exercises: [
    { id: 1, verb: 'hablar', verbType: 'ar' as const, pronoun: 0, prompt: { fr: 'De niño, yo ___ mucho', en: 'As a child, I ___ a lot' }, answer: 'hablaba', meaning: { fr: 'Enfant, je parlais beaucoup', en: 'As a child, I talked a lot' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 2, verb: 'comer', verbType: 'er' as const, pronoun: 3, prompt: { fr: 'Nosotros ___ juntos', en: 'We ___ together' }, answer: 'comíamos', meaning: { fr: 'Nous mangions ensemble', en: 'We ate together' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 3, verb: 'vivir', verbType: 'ir' as const, pronoun: 0, prompt: { fr: 'Yo ___ cerca del mar', en: 'I ___ near the sea' }, answer: 'vivía', meaning: { fr: 'Je vivais près de la mer', en: 'I lived near the sea' }, difficulty: 'easy' as const, category: 'regular' }
  ]
};