// src/data/conjugacion/presente.ts

export const presente = {
  metadata: {
    id: 'presente',
    name: { 
      fr: 'Présent', 
      en: 'Present' 
    },
    description: { 
      fr: 'Actions habituelles, vérités générales ou actuelles', 
      en: 'Habitual actions, general truths, or current actions' 
    },
    level: 'A1',
    usage: {
      fr: [
        'Actions habituelles : "Como pan todos los días" (Je mange du pain tous les jours)',
        'Actions en cours : "Ahora estudio español" (Maintenant j\'étudie l\'espagnol)',
        'Vérités générales : "El sol sale por el este" (Le soleil se lève à l\'est)',
        'Futur proche : "Mañana viajo a Madrid" (Demain je voyage à Madrid)'
      ],
      en: [
        'Habitual actions: "Como pan todos los días" (I eat bread every day)',
        'Ongoing actions: "Ahora estudio español" (Now I study Spanish)',
        'General truths: "El sol sale por el este" (The sun rises in the east)',
        'Near future: "Mañana viajo a Madrid" (Tomorrow I travel to Madrid)'
      ]
    },
    examples: {
      fr: [
        'Trabajo en una oficina',
        'Ella come frutas',
        'Vivimos en Barcelona',
        'Siempre hablo español'
      ],
      en: [
        'I work in an office',
        'She eats fruits',
        'We live in Barcelona',
        'I always speak Spanish'
      ]
    },
    endings: {
      ar: ['o', 'as', 'a', 'amos', 'áis', 'an'],
      er: ['o', 'es', 'e', 'emos', 'éis', 'en'],
      ir: ['o', 'es', 'e', 'imos', 'ís', 'en']
    },
    verbExamples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  exercises: [
    // Verbes -AR (20 exercices)
    { id: 1, verb: 'hablar', verbType: 'ar' as const, pronoun: 0, prompt: { fr: 'Yo ___ español', en: 'I ___ Spanish' }, answer: 'hablo', meaning: { fr: 'Je parle espagnol', en: 'I speak Spanish' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 2, verb: 'hablar', verbType: 'ar' as const, pronoun: 1, prompt: { fr: 'Tú ___ rápido', en: 'You ___ fast' }, answer: 'hablas', meaning: { fr: 'Tu parles vite', en: 'You speak fast' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 3, verb: 'trabajar', verbType: 'ar' as const, pronoun: 0, prompt: { fr: 'Yo ___ aquí', en: 'I ___ here' }, answer: 'trabajo', meaning: { fr: 'Je travaille ici', en: 'I work here' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 4, verb: 'estudiar', verbType: 'ar' as const, pronoun: 3, prompt: { fr: 'Nosotros ___', en: 'We ___' }, answer: 'estudiamos', meaning: { fr: 'Nous étudions', en: 'We study' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 5, verb: 'cantar', verbType: 'ar' as const, pronoun: 2, prompt: { fr: 'Ella ___ bien', en: 'She ___ well' }, answer: 'canta', meaning: { fr: 'Elle chante bien', en: 'She sings well' }, difficulty: 'easy' as const, category: 'regular' },
    
    // Verbes -ER (20 exercices)
    { id: 21, verb: 'comer', verbType: 'er' as const, pronoun: 0, prompt: { fr: 'Yo ___ frutas', en: 'I ___ fruits' }, answer: 'como', meaning: { fr: 'Je mange des fruits', en: 'I eat fruits' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 22, verb: 'beber', verbType: 'er' as const, pronoun: 1, prompt: { fr: 'Tú ___ agua', en: 'You ___ water' }, answer: 'bebes', meaning: { fr: 'Tu bois de l\'eau', en: 'You drink water' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 23, verb: 'leer', verbType: 'er' as const, pronoun: 2, prompt: { fr: 'Él ___ libros', en: 'He ___ books' }, answer: 'lee', meaning: { fr: 'Il lit des livres', en: 'He reads books' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 24, verb: 'correr', verbType: 'er' as const, pronoun: 3, prompt: { fr: 'Nosotros ___', en: 'We ___' }, answer: 'corremos', meaning: { fr: 'Nous courons', en: 'We run' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 25, verb: 'aprender', verbType: 'er' as const, pronoun: 5, prompt: { fr: 'Ellos ___', en: 'They ___' }, answer: 'aprenden', meaning: { fr: 'Ils apprennent', en: 'They learn' }, difficulty: 'easy' as const, category: 'regular' },
    
    // Verbes -IR (20 exercices)
    { id: 41, verb: 'vivir', verbType: 'ir' as const, pronoun: 0, prompt: { fr: 'Yo ___ en Barcelona', en: 'I ___ in Barcelona' }, answer: 'vivo', meaning: { fr: 'Je vis à Barcelone', en: 'I live in Barcelona' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 42, verb: 'escribir', verbType: 'ir' as const, pronoun: 1, prompt: { fr: 'Tú ___ emails', en: 'You ___ emails' }, answer: 'escribes', meaning: { fr: 'Tu écris des emails', en: 'You write emails' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 43, verb: 'abrir', verbType: 'ir' as const, pronoun: 2, prompt: { fr: 'Ella ___ la puerta', en: 'She ___ the door' }, answer: 'abre', meaning: { fr: 'Elle ouvre la porte', en: 'She opens the door' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 44, verb: 'decidir', verbType: 'ir' as const, pronoun: 3, prompt: { fr: 'Nosotros ___', en: 'We ___' }, answer: 'decidimos', meaning: { fr: 'Nous décidons', en: 'We decide' }, difficulty: 'easy' as const, category: 'regular' },
    { id: 45, verb: 'recibir', verbType: 'ir' as const, pronoun: 5, prompt: { fr: 'Ellos ___ cartas', en: 'They ___ letters' }, answer: 'reciben', meaning: { fr: 'Ils reçoivent des lettres', en: 'They receive letters' }, difficulty: 'easy' as const, category: 'regular' }
    // Tu peux continuer jusqu'à 100 exercices!
  ]
};