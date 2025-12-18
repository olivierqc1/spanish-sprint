// src/data/readingTexts/argentina.ts

import type { ReadingText } from './types';

export const argentinaTexts: ReadingText[] = [
  {
    id: 'arg_a1_1',
    title: 'Mi barrio porteño',
    level: 'A1',
    country: 'argentina',
    type: 'story',
    excerpt: 'Vivo en Buenos Aires, en el barrio de Palermo. Me encanta caminar por las calles con árboles. Cerca de mi casa hay una parrilla donde se come el mejor asado. Los domingos voy al parque a tomar mate con mis amigos. También hay muchas librerías y cafés. Mi vecino tiene un perro lindo. Palermo es un barrio muy tranquilo y hermoso.',
    context: {
      fr: 'Description d\'un quartier de Buenos Aires avec vocabulaire argentin (parrilla, mate, lindo).',
      en: 'Description of a Buenos Aires neighborhood with Argentine vocabulary (parrilla, mate, lindo).'
    },
    vocab: [
      'barrio - quartier',
      'porteño - de Buenos Aires',
      'parrilla - restaurant de grillades argentin',
      'asado - barbecue argentin',
      'mate - maté (boisson)',
      'lindo - joli (Arg)',
      'hermoso - magnifique'
    ],
    questions: {
      fr: [
        'Dans quel quartier habite-t-il ?',
        'Que fait-il le dimanche ?',
        'Qu\'y a-t-il près de chez lui ?',
        'Comment est le quartier ?'
      ],
      en: [
        'In which neighborhood does he live?',
        'What does he do on Sundays?',
        'What is near his house?',
        'How is the neighborhood?'
      ]
    }
  },

  {
    id: 'arg_a2_1',
    title: 'El tango argentino',
    level: 'A2',
    country: 'argentina',
    type: 'article',
    excerpt: 'El tango nació en Buenos Aires a finales del siglo XIX. Es una danza y también un género musical. Carlos Gardel es el cantante de tango más famoso de la historia. El tango cuenta historias de amor, nostalgia y la vida en los barrios. Los bailarines llevan ropa elegante: los hombres trajes y las mujeres vestidos con tajos. Hoy el tango es Patrimonio Cultural de la Humanidad. En la Boca, un barrio de Buenos Aires, hay espectáculos de tango en la calle.',
    context: {
      fr: 'Histoire du tango argentin, danse emblématique de Buenos Aires reconnue par l\'UNESCO.',
      en: 'History of Argentine tango, emblematic Buenos Aires dance recognized by UNESCO.'
    },
    vocab: [
      'nacer - naître',
      'danza - danse',
      'nostalgia - nostalgie',
      'traje - costume',
      'tajo - fente (dans une robe)',
      'patrimonio - patrimoine',
      'espectáculo - spectacle'
    ],
    questions: {
      fr: [
        'Où est né le tango ?',
        'Qui est Carlos Gardel ?',
        'De quoi parlent les tangos ?',
        'Quel quartier est célèbre pour le tango ?'
      ],
      en: [
        'Where was tango born?',
        'Who is Carlos Gardel?',
        'What do tangos talk about?',
        'Which neighborhood is famous for tango?'
      ]
    }
  },

  {
    id: 'arg_a2_2',
    title: 'El mate, más que una bebida',
    level: 'A2',
    country: 'argentina',
    type: 'article',
    excerpt: 'El mate es la bebida nacional de Argentina. Se prepara con yerba mate y agua caliente en un recipiente especial. Se toma con una bombilla de metal. Tomar mate es un ritual social. Los argentinos lo comparten con familia y amigos en cualquier momento del día. Hay reglas: el cebador prepara el mate y lo pasa a cada persona. No se agradece hasta el final. Decir "gracias" significa que no querés más. El mate representa la amistad y la hospitalidad argentina.',
    context: {
      fr: 'Explication du maté argentin, boisson traditionnelle et rituel social important.',
      en: 'Explanation of Argentine mate, traditional drink and important social ritual.'
    },
    vocab: [
      'yerba mate - herbe à maté',
      'recipiente - récipient',
      'bombilla - paille métallique',
      'cebador - celui qui prépare le maté',
      'pasar - passer',
      'agradecer - remercier',
      'hospitalidad - hospitalité'
    ],
    questions: {
      fr: [
        'Avec quoi se prépare le mate ?',
        'Qu\'est-ce qu\'une bombilla ?',
        'Que signifie dire "gracias" ?',
        'Que représente le mate ?'
      ],
      en: [
        'What is mate prepared with?',
        'What is a bombilla?',
        'What does saying "gracias" mean?',
        'What does mate represent?'
      ]
    }
  }
];