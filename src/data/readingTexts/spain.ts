// src/data/readingTexts/spain.ts

import type { ReadingText } from './types';

export const spainTexts: ReadingText[] = [
  {
    id: 'esp_a1_1',
    title: 'Mi familia',
    level: 'A1',
    country: 'spain',
    type: 'story',
    excerpt: 'Hola, me llamo María. Tengo una familia grande. Mi padre se llama José y mi madre se llama Carmen. Tengo dos hermanos: Juan y Pedro. Juan tiene diez años y Pedro tiene ocho años. También tengo una hermana pequeña, Ana. Ella tiene cinco años. Vivimos en Madrid, en un piso grande. Me gusta mucho mi familia.',
    context: {
      fr: 'Un texte simple sur la famille en Espagne, utilisant le présent et le vocabulaire de base.',
      en: 'A simple text about family in Spain, using present tense and basic vocabulary.'
    },
    vocab: [
      'familia - famille',
      'padre - père',
      'madre - mère',
      'hermano - frère',
      'hermana - sœur',
      'vivir - vivre',
      'piso - appartement'
    ],
    questions: {
      fr: [
        'Comment s\'appelle la narratrice ?',
        'Combien de frères a María ?',
        'Où habite la famille ?',
        'Quel âge a Ana ?'
      ],
      en: [
        'What is the narrator\'s name?',
        'How many brothers does María have?',
        'Where does the family live?',
        'How old is Ana?'
      ]
    }
  },
  
  {
    id: 'esp_a2_1',
    title: 'Un día en Barcelona',
    level: 'A2',
    country: 'spain',
    type: 'story',
    excerpt: 'Ayer fui a Barcelona con mis amigos. Tomamos el tren por la mañana y llegamos a las diez. Primero, visitamos la Sagrada Familia. ¡Es increíble! Después, caminamos por Las Ramblas y comimos paella en un restaurante típico. Por la tarde, fuimos a la playa y tomamos el sol. Regresamos a casa muy cansados pero contentos. Fue un día perfecto.',
    context: {
      fr: 'Un récit au passé d\'une journée à Barcelone, avec monuments célèbres et activités touristiques.',
      en: 'A past tense account of a day in Barcelona, with famous monuments and tourist activities.'
    },
    vocab: [
      'ayer - hier',
      'tren - train',
      'visitar - visiter',
      'increíble - incroyable',
      'playa - plage',
      'cansado - fatigué',
      'regresar - retourner'
    ],
    questions: {
      fr: [
        'Quel moyen de transport ont-ils pris ?',
        'Qu\'ont-ils mangé ?',
        'Où sont-ils allés l\'après-midi ?',
        'Comment se sentaient-ils en rentrant ?'
      ],
      en: [
        'What transport did they take?',
        'What did they eat?',
        'Where did they go in the afternoon?',
        'How did they feel when returning?'
      ]
    }
  },

  {
    id: 'esp_a2_2',
    title: 'La Tomatina',
    level: 'A2',
    country: 'spain',
    type: 'article',
    excerpt: 'La Tomatina es una fiesta española muy especial. Se celebra en Buñol, un pueblo de Valencia, el último miércoles de agosto. Miles de personas lanzan tomates en las calles. La fiesta empezó en 1945 cuando unos jóvenes comenzaron una pelea de tomates. Ahora es famosa en todo el mundo. Participan más de 20.000 personas cada año. Después de la batalla, los bomberos limpian las calles con agua.',
    context: {
      fr: 'Description de la Tomatina, célèbre festival espagnol de bataille de tomates.',
      en: 'Description of La Tomatina, famous Spanish tomato fight festival.'
    },
    vocab: [
      'celebrar - célébrer',
      'pueblo - village',
      'lanzar - lancer',
      'pelea - bagarre',
      'bombero - pompier',
      'limpiar - nettoyer'
    ],
    questions: {
      fr: [
        'Où se célèbre la Tomatina ?',
        'Quand a-t-elle commencé ?',
        'Combien de personnes participent ?',
        'Qui nettoie les rues après ?'
      ],
      en: [
        'Where is La Tomatina celebrated?',
        'When did it start?',
        'How many people participate?',
        'Who cleans the streets after?'
      ]
    }
  }
];