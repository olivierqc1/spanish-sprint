export const futuro_perfecto = {
  metadata: {
    id: 'futuro_perfecto',
    name: { fr: 'Futur antérieur (Futuro perfecto)', en: 'Future Perfect' },
    description: { fr: 'Action future avant une autre action future', en: 'Future action before another future action' },
    level: 'B1',
    usage: {
      fr: [
        'Antériorité future : "Cuando llegues, ya habré terminado" (Quand tu arriveras, j\'aurai déjà fini)',
        'Supposition passée : "Habrán llegado ya" (Ils seront déjà arrivés)',
        'Accomplissement futur : "En 2030 habré vivido aquí 10 años" (En 2030 j\'aurai vécu ici 10 ans)',
        'Probabilité au passé : "Habrán comido en el camino" (Ils auront mangé en chemin)'
      ],
      en: [
        'Future prior action: "Cuando llegues, ya habré terminado" (When you arrive, I will have finished)',
        'Past assumption: "Habrán llegado ya" (They will have arrived already)',
        'Future accomplishment: "En 2030 habré vivido aquí 10 años" (In 2030 I will have lived here 10 years)',
        'Past probability: "Habrán comido en el camino" (They will have eaten on the way)'
      ]
    },
    examples: {
      fr: ['Habré hablado con todos', 'Habremos comido antes', 'Habrán vivido 5 años aquí', 'Para entonces habré terminado'],
      en: ['I will have spoken with everyone', 'We will have eaten before', 'They will have lived here 5 years', 'By then I will have finished']
    },
    endings: {
      ar: ['habré -ado', 'habrás -ado', 'habrá -ado', 'habremos -ado', 'habréis -ado', 'habrán -ado'],
      er: ['habré -ido', 'habrás -ido', 'habrá -ido', 'habremos -ido', 'habréis -ido', 'habrán -ido'],
      ir: ['habré -ido', 'habrás -ido', 'habrá -ido', 'habremos -ido', 'habréis -ido', 'habrán -ido']
    },
    verbExamples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  exercises: [
    { id: 1, verb: 'hablar', verbType: 'ar' as const, pronoun: 0, prompt: { fr: 'Para entonces, yo ___ con todos', en: 'By then, I ___ with everyone' }, answer: 'habré hablado', meaning: { fr: 'D\'ici là, j\'aurai parlé avec tout le monde', en: 'By then, I will have spoken with everyone' }, difficulty: 'hard' as const, category: 'regular' }
  ]
};