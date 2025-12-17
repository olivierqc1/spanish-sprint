// src/data/conjugacion/preterito.ts

export const preterito = {
  metadata: {
    id: 'preterito',
    name: { 
      fr: 'Passé simple (Pretérito)', 
      en: 'Preterite' 
    },
    description: { 
      fr: 'Actions terminées et délimitées dans le passé', 
      en: 'Completed and delimited actions in the past' 
    },
    level: 'A2',
    usage: {
      fr: [
        'Actions ponctuelles terminées : "Ayer comí pizza" (Hier j\'ai mangé une pizza)',
        'Séquence d\'actions : "Me levanté, desayuné y salí" (Je me suis levé, j\'ai déjeuné et je suis sorti)',
        'Actions avec durée précise : "Viví en Madrid tres años" (J\'ai vécu à Madrid trois ans)',
        'Début ou fin d\'une action : "La película empezó a las 8" (Le film a commencé à 8h)'
      ],
      en: [
        'Single completed actions: "Ayer comí pizza" (Yesterday I ate pizza)',
        'Sequence of actions: "Me levanté, desayuné y salí" (I got up, had breakfast and left)',
        'Actions with specific duration: "Viví en Madrid tres años" (I lived in Madrid for three years)',
        'Beginning or end of action: "La película empezó a las 8" (The movie started at 8)'
      ]
    },
    examples: {
      fr: [
        'Ayer hablé con María',
        'Comimos en ese restaurante',
        'Vivieron en España',
        'El año pasado estudié francés'
      ],
      en: [
        'Yesterday I spoke with María',
        'We ate at that restaurant',
        'They lived in Spain',
        'Last year I studied French'
      ]
    },
    endings: {
      ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
      er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
      ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron']
    },
    verbExamples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  exercises: [
    { id: 1, verb: 'hablar', verbType: 'ar' as const, pronoun: 0, prompt: { fr: 'Yo ___ ayer', en: 'I ___ yesterday' }, answer: 'hablé', meaning: { fr: 'J\'ai parlé hier', en: 'I spoke yesterday' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 2, verb: 'hablar', verbType: 'ar' as const, pronoun: 1, prompt: { fr: 'Tú ___ con María', en: 'You ___ with María' }, answer: 'hablaste', meaning: { fr: 'Tu as parlé avec María', en: 'You spoke with María' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 3, verb: 'trabajar', verbType: 'ar' as const, pronoun: 2, prompt: { fr: 'Él ___ todo el día', en: 'He ___ all day' }, answer: 'trabajó', meaning: { fr: 'Il a travaillé toute la journée', en: 'He worked all day' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 4, verb: 'comer', verbType: 'er' as const, pronoun: 0, prompt: { fr: 'Yo ___ pizza', en: 'I ___ pizza' }, answer: 'comí', meaning: { fr: 'J\'ai mangé une pizza', en: 'I ate pizza' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 5, verb: 'vivir', verbType: 'ir' as const, pronoun: 3, prompt: { fr: 'Nosotros ___ en Madrid', en: 'We ___ in Madrid' }, answer: 'vivimos', meaning: { fr: 'Nous avons vécu à Madrid', en: 'We lived in Madrid' }, difficulty: 'easy' as const, category: 'regular' }
  ]
};