export const condicional = {
  metadata: {
    id: 'condicional',
    name: { fr: 'Conditionnel', en: 'Conditional' },
    description: { fr: 'Actions hypothétiques ou politesse', en: 'Hypothetical actions or politeness' },
    level: 'A2',
    usage: {
      fr: [
        'Hypothèses : "Con dinero, viajaría por el mundo" (Avec de l\'argent, je voyagerais dans le monde)',
        'Politesse : "¿Podrías ayudarme?" (Pourrais-tu m\'aider?)',
        'Conseils : "Yo no haría eso" (Moi je ne ferais pas ça)',
        'Futur du passé : "Dijo que vendría" (Il a dit qu\'il viendrait)'
      ],
      en: [
        'Hypotheses: "Con dinero, viajaría por el mundo" (With money, I would travel the world)',
        'Politeness: "¿Podrías ayudarme?" (Could you help me?)',
        'Advice: "Yo no haría eso" (I wouldn\'t do that)',
        'Future in the past: "Dijo que vendría" (He said he would come)'
      ]
    },
    examples: {
      fr: ['Me gustaría hablar con él', 'Comeríamos más verduras', 'Viviría en una isla', '¿Podrías repetir?'],
      en: ['I would like to speak with him', 'We would eat more vegetables', 'I would live on an island', 'Could you repeat?']
    },
    endings: {
      ar: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
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
    { id: 1, verb: 'hablar', verbType: 'ar' as const, pronoun: 0, prompt: { fr: 'Me gustaría ___ con él', en: 'I would like to ___ with him' }, answer: 'hablaría', meaning: { fr: 'J\'aimerais parler avec lui', en: 'I would like to speak with him' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 2, verb: 'comer', verbType: 'er' as const, pronoun: 3, prompt: { fr: 'Nosotros ___ más verduras', en: 'We ___ more vegetables' }, answer: 'comeríamos', meaning: { fr: 'Nous mangerions plus de légumes', en: 'We would eat more vegetables' }, difficulty: 'easy' as const, category: 'regular' }
  ]
};