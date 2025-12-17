export const subjuntivo_presente = {
  metadata: {
    id: 'subjuntivo_presente',
    name: { fr: 'Subjonctif présent', en: 'Present Subjunctive' },
    description: { fr: 'Doute, souhait, émotion, demande', en: 'Doubt, wish, emotion, request' },
    level: 'B1',
    usage: {
      fr: [
        'Souhait : "Espero que vengas" (J\'espère que tu viennes)',
        'Doute : "Dudo que sea verdad" (Je doute que ce soit vrai)',
        'Émotion : "Me alegra que estés aquí" (Je suis content que tu sois ici)',
        'Ordre indirect : "Quiero que hables con él" (Je veux que tu parles avec lui)'
      ],
      en: [
        'Wish: "Espero que vengas" (I hope you come)',
        'Doubt: "Dudo que sea verdad" (I doubt it\'s true)',
        'Emotion: "Me alegra que estés aquí" (I\'m glad you\'re here)',
        'Indirect command: "Quiero que hables con él" (I want you to speak with him)'
      ]
    },
    examples: {
      fr: ['Es importante que hables español', 'No creo que coma mucho', 'Ojalá que vivamos juntos', 'Espero que vengas pronto'],
      en: ['It\'s important that you speak Spanish', 'I don\'t think he eats much', 'I hope we live together', 'I hope you come soon']
    },
    endings: {
      ar: ['e', 'es', 'e', 'emos', 'éis', 'en'],
      er: ['a', 'as', 'a', 'amos', 'áis', 'an'],
      ir: ['a', 'as', 'a', 'amos', 'áis', 'an']
    },
    verbExamples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  exercises: [
    { id: 1, verb: 'hablar', verbType: 'ar' as const, pronoun: 1, prompt: { fr: 'Espero que tú ___ español', en: 'I hope you ___ Spanish' }, answer: 'hables', meaning: { fr: 'J\'espère que tu parles espagnol', en: 'I hope you speak Spanish' }, difficulty: 'medium' as const, category: 'regular' },
    { id: 2, verb: 'comer', verbType: 'er' as const, pronoun: 2, prompt: { fr: 'No creo que él ___ mucho', en: 'I don\'t think he ___ much' }, answer: 'coma', meaning: { fr: 'Je ne crois pas qu\'il mange beaucoup', en: 'I don\'t think he eats much' }, difficulty: 'medium' as const, category: 'regular' }
  ]
};