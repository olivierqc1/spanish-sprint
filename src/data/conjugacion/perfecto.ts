export const perfecto = {
  metadata: {
    id: 'perfecto',
    name: { fr: 'Passé composé (Pretérito perfecto)', en: 'Present Perfect' },
    description: { fr: 'Actions récentes ou liées au présent', en: 'Recent actions or connected to present' },
    level: 'A2',
    usage: {
      fr: [
        'Actions récentes : "Hoy he hablado con María" (Aujourd\'hui j\'ai parlé avec María)',
        'Expérience de vie : "He vivido en España" (J\'ai vécu en Espagne)',
        'Actions non terminées : "Esta semana hemos comido mucho" (Cette semaine nous avons beaucoup mangé)',
        'Résultat présent : "He perdido las llaves" (J\'ai perdu les clés)'
      ],
      en: [
        'Recent actions: "Hoy he hablado con María" (Today I have spoken with María)',
        'Life experience: "He vivido en España" (I have lived in Spain)',
        'Unfinished time: "Esta semana hemos comido mucho" (This week we have eaten a lot)',
        'Present result: "He perdido las llaves" (I have lost the keys)'
      ]
    },
    examples: {
      fr: ['He hablado con el jefe', 'Hemos comido juntos', 'Han vivido aquí', '¿Has terminado?'],
      en: ['I have spoken with the boss', 'We have eaten together', 'They have lived here', 'Have you finished?']
    },
    endings: {
      ar: ['he -ado', 'has -ado', 'ha -ado', 'hemos -ado', 'habéis -ado', 'han -ado'],
      er: ['he -ido', 'has -ido', 'ha -ido', 'hemos -ido', 'habéis -ido', 'han -ido'],
      ir: ['he -ido', 'has -ido', 'ha -ido', 'hemos -ido', 'habéis -ido', 'han -ido']
    },
    verbExamples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  exercises: [
    { id: 1, verb: 'hablar', verbType: 'ar' as const, pronoun: 0, prompt: { fr: 'Hoy yo ___ con María', en: 'Today I ___ with María' }, answer: 'he hablado', meaning: { fr: 'Aujourd\'hui j\'ai parlé avec María', en: 'Today I have spoken with María' }, difficulty: 'medium' as const, category: 'regular' },
    { id: 2, verb: 'comer', verbType: 'er' as const, pronoun: 3, prompt: { fr: 'Nosotros ___ juntos', en: 'We ___ together' }, answer: 'hemos comido', meaning: { fr: 'Nous avons mangé ensemble', en: 'We have eaten together' }, difficulty: 'medium' as const, category: 'regular' }
  ]
};