// src/data/readingTexts/venezuela.ts

import type { ReadingText } from './types';

export const venezuelaTexts: ReadingText[] = [
  {
    id: 'ven_a1_1',
    title: 'Las arepas venezolanas',
    level: 'A1',
    country: 'venezuela',
    type: 'story',
    excerpt: 'En Venezuela, comemos arepas todos los días. Son como tortillas hechas de maíz. Mi mamá las prepara por la mañana. Yo las como con queso, carne mechada o perico. Las arepas son deliciosas y fáciles de hacer. En mi familia, cada persona tiene su arepa favorita. La mía es la reina pepiada con pollo y aguacate.',
    context: {
      fr: 'Description des arepas, plat national vénézuélien fait de farine de maïs. Vocabulaire spécifique (perico, reina pepiada).',
      en: 'Description of arepas, Venezuelan national dish made from corn flour. Specific vocabulary (perico, reina pepiada).'
    },
    vocab: [
      'arepa - galette de maïs vénézuélienne',
      'maíz - maïs',
      'carne mechada - viande effilochée',
      'perico - œufs brouillés (Ven)',
      'reina pepiada - arepa au poulet/avocat',
      'aguacate - avocat'
    ],
    questions: {
      fr: [
        'Qu\'est-ce qu\'une arepa ?',
        'Avec quoi les mange-t-il ?',
        'Quelle est sa arepa favorite ?',
        'Quand la maman prépare-t-elle les arepas ?'
      ],
      en: [
        'What is an arepa?',
        'What does he eat them with?',
        'What is his favorite arepa?',
        'When does mom prepare the arepas?'
      ]
    }
  },

  {
    id: 'ven_a2_1',
    title: 'El Salto Ángel',
    level: 'A2',
    country: 'venezuela',
    type: 'article',
    excerpt: 'El Salto Ángel es la cascada más alta del mundo. Está en Venezuela, en el Parque Nacional Canaima. Mide 979 metros de altura. El agua cae desde el tepuy Auyantepui. Un tepuy es una montaña con la cima plana. El aviador estadounidense Jimmie Angel la descubrió en 1933. Por eso lleva su nombre. Los indígenas pemón la llaman "Kerepakupai Merú" que significa "salto del lugar más profundo". La cascada es tan alta que el agua se convierte en neblina antes de llegar al suelo.',
    context: {
      fr: 'Description du Salto Ángel, plus haute cascade du monde située au Venezuela.',
      en: 'Description of Angel Falls, the world\'s highest waterfall located in Venezuela.'
    },
    vocab: [
      'cascada - cascade',
      'medir - mesurer',
      'altura - hauteur',
      'tepuy - montagne à sommet plat',
      'cima - sommet',
      'neblina - brume',
      'suelo - sol'
    ],
    questions: {
      fr: [
        'Où se trouve le Salto Ángel ?',
        'Quelle est sa hauteur ?',
        'Qui l\'a découvert ?',
        'Que signifie son nom indigène ?'
      ],
      en: [
        'Where is Angel Falls located?',
        'What is its height?',
        'Who discovered it?',
        'What does its indigenous name mean?'
      ]
    }
  }
];