export const subjuntivo_imperfecto = {
  metadata: {
    id: 'subjuntivo_imperfecto',
    name: { fr: 'Subjonctif imparfait', en: 'Imperfect Subjunctive' },
    description: { fr: 'Souhait ou doute dans le passé', en: 'Past wish or doubt' },
    level: 'B2',
    usage: {
      fr: [
        'Souhait passé : "Quería que vinieras" (Je voulais que tu viennes)',
        'Condition irréelle : "Si tuviera dinero, viajaría" (Si j\'avais de l\'argent, je voyagerais)',
        'Après "como si" : "Habla como si supiera todo" (Il parle comme s\'il savait tout)',
        'Politesse extrême : "Quisiera hablar con usted" (Je voudrais parler avec vous)'
      ],
      en: [
        'Past wish: "Quería que vinieras" (I wanted you to come)',
        'Unreal condition: "Si tuviera dinero, viajaría" (If I had money, I would travel)',
        'After "como si": "Habla como si supiera todo" (He talks as if he knew everything)',
        'Extreme politeness: "Quisiera hablar con usted" (I would like to speak with you)'
      ]
    },
    examples: {
      fr: ['Si hablara mejor, conseguiría el trabajo', 'Dudaba que comiera tanto', 'Me gustaría que viviéramos cerca', 'Como si fuera fácil'],
      en: ['If I spoke better, I would get the job', 'I doubted he ate so much', 'I would like us to live nearby', 'As if it were easy']
    },
    endings: {
      ar: ['ara', 'aras', 'ara', 'áramos', 'arais', 'aran'],
      er: ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran'],
      ir: ['iera', 'ieras', 'iera', 'iéramos', 'ierais', 'ieran']
    },
    verbExamples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  exercises: [
    { id: 1, verb: 'hablar', verbType: 'ar' as const, pronoun: 0, prompt: { fr: 'Si yo ___ mejor...', en: 'If I ___ better...' }, answer: 'hablara', meaning: { fr: 'Si je parlais mieux', en: 'If I spoke better' }, difficulty: 'hard' as const, category: 'regular' },
    { id: 2, verb: 'comer', verbType: 'er' as const, pronoun: 2, prompt: { fr: 'Dudaba que él ___ tanto', en: 'I doubted he ___ so much' }, answer: 'comiera', meaning: { fr: 'Je doutais qu\'il mange autant', en: 'I doubted he ate so much' }, difficulty: 'hard' as const, category: 'regular' }
  ]
};