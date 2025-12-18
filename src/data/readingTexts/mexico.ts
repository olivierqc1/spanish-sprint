// src/data/readingTexts/mexico.ts

import type { ReadingText } from './types';

export const mexicoTexts: ReadingText[] = [
  {
    id: 'mex_a1_1',
    title: 'El mercado',
    level: 'A1',
    country: 'mexico',
    type: 'story',
    excerpt: 'Me gusta ir al mercado los sábados. Hay muchas frutas y verduras frescas. Mi mamá compra jitomates, chiles y elotes. También compramos pan dulce y tortillas. El señor del puesto es muy amable. Siempre dice "¿Qué va a llevar, güerita?" Mi mamá paga con billetes de cien pesos. Es mi actividad favorita del fin de semana.',
    context: {
      fr: 'Description d\'un marché mexicain traditionnel avec vocabulaire spécifique au Mexique (jitomate, güerita).',
      en: 'Description of a traditional Mexican market with Mexico-specific vocabulary (jitomate, güerita).'
    },
    vocab: [
      'mercado - marché',
      'jitomate - tomate (Mx)',
      'elote - épi de maïs',
      'pan dulce - pain sucré',
      'güerita - blonde (Mx, diminutif affectueux)',
      'puesto - stand/étal',
      'amable - aimable'
    ],
    questions: {
      fr: [
        'Quel jour va-t-elle au marché ?',
        'Que dit le vendeur ?',
        'Avec quoi paie la maman ?',
        'Qu\'achètent-elles au marché ?'
      ],
      en: [
        'What day does she go to the market?',
        'What does the vendor say?',
        'What does mom pay with?',
        'What do they buy at the market?'
      ]
    }
  },

  {
    id: 'mex_a2_1',
    title: 'El Día de Muertos',
    level: 'A2',
    country: 'mexico',
    type: 'article',
    excerpt: 'El Día de Muertos es una tradición mexicana muy importante. Se celebra el 1 y 2 de noviembre. Las familias ponen ofrendas con fotos, flores de cempasúchil, pan de muerto y la comida favorita de sus difuntos. No es un día triste, sino una celebración alegre. Creemos que los espíritus de nuestros seres queridos nos visitan. En el cementerio, decoramos las tumbas y contamos historias sobre nuestros antepasados.',
    context: {
      fr: 'Explication de la fête des Morts, tradition emblématique du Mexique reconnue par l\'UNESCO.',
      en: 'Explanation of the Day of the Dead, an iconic Mexican tradition recognized by UNESCO.'
    },
    vocab: [
      'ofrenda - offrande',
      'cempasúchil - œillet d\'Inde (fleur orange)',
      'difunto - défunt',
      'ser querido - être cher',
      'tumba - tombe',
      'antepasado - ancêtre',
      'espíritu - esprit'
    ],
    questions: {
      fr: [
        'Quand se célèbre le Jour des Morts ?',
        'Que mettent les familles sur les offrandes ?',
        'Est-ce une fête triste ?',
        'Que fait-on au cimetière ?'
      ],
      en: [
        'When is the Day of the Dead celebrated?',
        'What do families put on the offerings?',
        'Is it a sad celebration?',
        'What is done at the cemetery?'
      ]
    }
  },

  {
    id: 'mex_a2_2',
    title: 'Los tacos al pastor',
    level: 'A2',
    country: 'mexico',
    type: 'article',
    excerpt: 'Los tacos al pastor son uno de los platillos más populares de México. Vienen de la Ciudad de México pero ahora se comen en todo el país. La carne se cocina en un trompo vertical, como el kebab. Se sirve con piña, cilantro, cebolla y salsa. El nombre viene de los pastores libaneses que llegaron a México en el siglo XX. Es una fusión perfecta de culturas. Un buen taco al pastor debe tener tortilla recién hecha.',
    context: {
      fr: 'Description des tacos al pastor, plat emblématique de Mexico qui combine influences mexicaines et libanaises.',
      en: 'Description of tacos al pastor, iconic Mexico City dish combining Mexican and Lebanese influences.'
    },
    vocab: [
      'platillo - plat',
      'trompo - broche verticale',
      'piña - ananas',
      'cilantro - coriandre',
      'cebolla - oignon',
      'recién hecha - fraîchement faite',
      'fusión - fusion'
    ],
    questions: {
      fr: [
        'D\'où viennent les tacos al pastor ?',
        'Comment est cuite la viande ?',
        'Quelle influence étrangère y a-t-il ?',
        'Avec quoi sont-ils servis ?'
      ],
      en: [
        'Where do tacos al pastor come from?',
        'How is the meat cooked?',
        'What foreign influence is there?',
        'What are they served with?'
      ]
    }
  }
];