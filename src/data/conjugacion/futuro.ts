export const futuro = {
  metadata: {
    id: 'futuro',
    name: { fr: 'Futur simple (Futuro)', en: 'Simple Future' },
    description: { fr: 'Actions futures ou suppositions sur le présent', en: 'Future actions or assumptions about the present' },
    level: 'A2',
    usage: {
      fr: [
        'Actions futures : "Mañana hablaré con él" (Demain je parlerai avec lui)',
        'Promesses : "Te llamaré esta noche" (Je t\'appellerai ce soir)',
        'Probabilité au présent : "Serán las tres" (Il doit être trois heures)',
        'Prédictions : "El año que viene viajaremos mucho" (L\'année prochaine nous voyagerons beaucoup)'
      ],
      en: [
        'Future actions: "Mañana hablaré con él" (Tomorrow I will speak with him)',
        'Promises: "Te llamaré esta noche" (I will call you tonight)',
        'Probability in present: "Serán las tres" (It must be three o\'clock)',
        'Predictions: "El año que viene viajaremos mucho" (Next year we will travel a lot)'
      ]
    },
    examples: {
      fr: ['El próximo año hablaré mejor español', 'Comeremos a las dos', 'Viviré en Madrid', '¿Vendrás a la fiesta?'],
      en: ['Next year I will speak Spanish better', 'We will eat at two', 'I will live in Madrid', 'Will you come to the party?']
    },
    endings: {
      ar: ['é', 'ás', 'á', 'emos', 'éis', 'án'],
      er: ['é', 'ás', 'á', 'emos', 'éis', 'án'],
      ir: ['é', 'ás', 'á', 'emos', 'éis', 'án']
    },
    verbExamples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  exercises: [
    { id: 1, verb: 'hablar', verbType: 'ar' as const, pronoun: 0, prompt: { fr: 'Mañana yo ___ con él', en: 'Tomorrow I ___ with him' }, answer: 'hablaré', meaning: { fr: 'Demain je parlerai avec lui', en: 'Tomorrow I will speak with him' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 2, verb: 'comer', verbType: 'er' as const, pronoun: 3, prompt: { fr: 'Nosotros ___ a las dos', en: 'We ___ at two' }, answer: 'comeremos', meaning: { fr: 'Nous mangerons à deux heures', en: 'We will eat at two' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 3, verb: 'vivir', verbType: 'ir' as const, pronoun: 1, prompt: { fr: '¿Tú ___ en Madrid?', en: 'Will you ___ in Madrid?' }, answer: 'vivirás', meaning: { fr: 'Tu vivras à Madrid?', en: 'Will you live in Madrid?' }, difficulty: 'easy' as const, category: 'regular' }
  ]
};