// src/data/readingTexts/cuba.ts

import type { ReadingText } from './types';

export const cubaTexts: ReadingText[] = [
  {
    id: 'cub_a1_1',
    title: 'La música en La Habana',
    level: 'A1',
    country: 'cuba',
    type: 'story',
    excerpt: 'La Habana es la capital de Cuba. En las calles, siempre hay música. Mi tío toca la guitarra y canta canciones de Buena Vista Social Club. Los turistas bailan salsa en las plazas. Mi abuela dice que la música es el alma de Cuba. Por la noche, vamos al Malecón a escuchar a los músicos. Es muy bonito.',
    context: {
      fr: 'Texte sur l\'importance de la musique à La Havane, capitale cubaine connue pour sa vie musicale.',
      en: 'Text about the importance of music in Havana, Cuban capital known for its musical life.'
    },
    vocab: [
      'calle - rue',
      'tocar - jouer (instrument)',
      'canción - chanson',
      'bailar - danser',
      'alma - âme',
      'Malecón - front de mer de La Havane',
      'bonito - joli'
    ],
    questions: {
      fr: [
        'Que fait l\'oncle ?',
        'Où dansent les touristes ?',
        'Que dit la grand-mère sur la musique ?',
        'Où vont-ils la nuit ?'
      ],
      en: [
        'What does the uncle do?',
        'Where do tourists dance?',
        'What does grandmother say about music?',
        'Where do they go at night?'
      ]
    }
  },

  {
    id: 'cub_a2_1',
    title: 'Los coches clásicos de Cuba',
    level: 'A2',
    country: 'cuba',
    type: 'article',
    excerpt: 'En Cuba hay miles de coches americanos de los años 50. Son Chevrolet, Ford, Cadillac de colores brillantes. Se llaman "almendrones". Llegaron antes de la revolución de 1959. Por el embargo, los cubanos no pudieron importar coches nuevos. Por eso, mantienen y reparan los viejos. Ahora estos coches son símbolos de Cuba. Los turistas los usan para paseos por La Habana. Los mecánicos cubanos son muy creativos. Fabrican piezas a mano cuando no hay repuestos. Es parte de la identidad cubana.',
    context: {
      fr: 'Article sur les voitures américaines classiques à Cuba, devenues symbole du pays.',
      en: 'Article about classic American cars in Cuba, which have become a symbol of the country.'
    },
    vocab: [
      'almendrón - vieille voiture américaine (Cuba)',
      'revolución - révolution',
      'embargo - embargo',
      'mantener - maintenir',
      'reparar - réparer',
      'pieza - pièce',
      'repuesto - pièce de rechange'
    ],
    questions: {
      fr: [
        'De quand datent ces voitures ?',
        'Pourquoi Cuba a-t-il gardé ces voitures ?',
        'Comment les appelle-t-on ?',
        'Que font les mécaniciens cubains ?'
      ],
      en: [
        'When are these cars from?',
        'Why has Cuba kept these cars?',
        'What are they called?',
        'What do Cuban mechanics do?'
      ]
    }
  }
];