export const imperativo_afirmativo = {
  metadata: {
    id: 'imperativo_afirmativo',
    name: { fr: 'Impératif affirmatif', en: 'Affirmative Imperative' },
    description: { fr: 'Ordres, instructions, conseils directs', en: 'Direct commands, instructions, advice' },
    level: 'A2',
    usage: {
      fr: [
        'Ordres : "¡Habla más alto!" (Parle plus fort!)',
        'Instructions : "Come despacio" (Mange lentement)',
        'Conseils : "Vive la vida" (Vis la vie)',
        'Invitations : "Ven conmigo" (Viens avec moi)'
      ],
      en: [
        'Commands: "¡Habla más alto!" (Speak louder!)',
        'Instructions: "Come despacio" (Eat slowly)',
        'Advice: "Vive la vida" (Live life)',
        'Invitations: "Ven conmigo" (Come with me)'
      ]
    },
    examples: {
      fr: ['¡Habla claro!', '¡Come más!', '¡Vive feliz!', '¡Venid todos!'],
      en: ['Speak clearly!', 'Eat more!', 'Live happily!', 'Come everyone!']
    },
    endings: {
      ar: ['-', 'a', 'e', 'emos', 'ad', 'en'],
      er: ['-', 'e', 'a', 'amos', 'ed', 'an'],
      ir: ['-', 'e', 'a', 'amos', 'id', 'an']
    },
    verbExamples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  exercises: [
    { id: 1, verb: 'hablar', verbType: 'ar' as const, pronoun: 1, prompt: { fr: '¡___ más alto! (tú)', en: '___ louder! (you)' }, answer: 'habla', meaning: { fr: 'Parle plus fort!', en: 'Speak louder!' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 2, verb: 'comer', verbType: 'er' as const, pronoun: 4, prompt: { fr: '¡___ más! (vosotros)', en: '___ more! (you all)' }, answer: 'comed', meaning: { fr: 'Mangez plus!', en: 'Eat more!' }, difficulty: 'easy' as const, category: 'regular' }
  ]
};