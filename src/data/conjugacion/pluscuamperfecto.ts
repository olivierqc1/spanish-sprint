export const pluscuamperfecto = {
  metadata: {
    id: 'pluscuamperfecto',
    name: { fr: 'Plus-que-parfait (Pluscuamperfecto)', en: 'Pluperfect' },
    description: { fr: 'Action passée avant une autre action passée', en: 'Past action before another past action' },
    level: 'B1',
    usage: {
      fr: [
        'Antériorité : "Cuando llegué, ya habían comido" (Quand je suis arrivé, ils avaient déjà mangé)',
        'Expérience passée : "Nunca había hablado español antes" (Je n\'avais jamais parlé espagnol avant)',
        'Regret : "Ojalá hubiera estudiado más" (J\'aurais aimé avoir étudié plus)',
        'Cause passée : "Estaba cansado porque había trabajado mucho" (J\'étais fatigué parce que j\'avais beaucoup travaillé)'
      ],
      en: [
        'Prior action: "Cuando llegué, ya habían comido" (When I arrived, they had already eaten)',
        'Past experience: "Nunca había hablado español antes" (I had never spoken Spanish before)',
        'Regret: "Ojalá hubiera estudiado más" (I wish I had studied more)',
        'Past cause: "Estaba cansado porque había trabajado mucho" (I was tired because I had worked a lot)'
      ]
    },
    examples: {
      fr: ['Ya había hablado con él', 'No habíamos comido antes', 'Habían vivido allí', 'Nunca había visto eso'],
      en: ['I had already spoken with him', 'We hadn\'t eaten before', 'They had lived there', 'I had never seen that']
    },
    endings: {
      ar: ['había -ado', 'habías -ado', 'había -ado', 'habíamos -ado', 'habíais -ado', 'habían -ado'],
      er: ['había -ido', 'habías -ido', 'había -ido', 'habíamos -ido', 'habíais -ido', 'habían -ido'],
      ir: ['había -ido', 'habías -ido', 'había -ido', 'habíamos -ido', 'habíais -ido', 'habían -ido']
    },
    verbExamples: {
      ar: { verb: 'hablar', meaning: { fr: 'parler', en: 'to speak' } },
      er: { verb: 'comer', meaning: { fr: 'manger', en: 'to eat' } },
      ir: { verb: 'vivir', meaning: { fr: 'vivre', en: 'to live' } }
    }
  },
  exercises: [
    { id: 1, verb: 'hablar', verbType: 'ar' as const, pronoun: 0, prompt: { fr: 'Ya yo ___ con él', en: 'I had already ___ with him' }, answer: 'había hablado', meaning: { fr: 'J\'avais déjà parlé avec lui', en: 'I had already spoken with him' }, difficulty: 'medium' as const, category: 'regular' }
  ]
};