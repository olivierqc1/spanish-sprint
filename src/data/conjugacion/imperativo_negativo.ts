export const imperativo_negativo = {
  metadata: {
    id: 'imperativo_negativo',
    name: { fr: 'Impératif négatif', en: 'Negative Imperative' },
    description: { fr: 'Interdictions, instructions négatives', en: 'Prohibitions, negative instructions' },
    level: 'A2',
    usage: {
      fr: [
        'Interdictions : "¡No hables así!" (Ne parle pas comme ça!)',
        'Conseils négatifs : "No comas tanto" (Ne mange pas autant)',
        'Avertissements : "No vivas con miedo" (Ne vis pas avec peur)',
        'Instructions : "No toques eso" (Ne touche pas ça)'
      ],
      en: [
        'Prohibitions: "¡No hables así!" (Don\'t speak like that!)',
        'Negative advice: "No comas tanto" (Don\'t eat so much)',
        'Warnings: "No vivas con miedo" (Don\'t live with fear)',
        'Instructions: "No toques eso" (Don\'t touch that)'
      ]
    },
    examples: {
      fr: ['¡No hables!', '¡No comas eso!', '¡No vivas solo!', '¡No corráis!'],
      en: ['Don\'t speak!', 'Don\'t eat that!', 'Don\'t live alone!', 'Don\'t run!']
    },
    endings: {
      ar: ['-', 'no -es', 'no -e', 'no -emos', 'no -éis', 'no -en'],
      er: ['-', 'no -as', 'no -a', 'no -amos', 'no -áis', 'no -an'],
      ir: ['-', 'no -as', 'no -a', 'no -amos', 'no -áis', 'no -an']
    },
    verbExamples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  exercises: [
    { id: 1, verb: 'hablar', verbType: 'ar' as const, pronoun: 1, prompt: { fr: '¡___ así! (tú)', en: '___ like that! (you)' }, answer: 'no hables', meaning: { fr: 'Ne parle pas comme ça!', en: 'Don\'t speak like that!' }, difficulty: 'medium' as const, category: 'regular' },
    { id: 2, verb: 'comer', verbType: 'er' as const, pronoun: 1, prompt: { fr: '¡___ eso! (tú)', en: '___ that! (you)' }, answer: 'no comas', meaning: { fr: 'Ne mange pas ça!', en: 'Don\'t eat that!' }, difficulty: 'medium' as const, category: 'regular' }
  ]
};