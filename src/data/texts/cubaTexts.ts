// src/data/texts/cubaTexts.ts
import type { ReadingItem } from "./culturalTexts";

export const cubaA1: ReadingItem[] = [
  {
    id: "cuba-a1-001",
    country: "cuba",
    level: "A1",
    type: "dialogue",
    title: "En La Habana",
    excerpt:
      "— Buenos días. ¿De dónde eres?\n— Soy de La Habana. ¿Y tú?\n— Soy canadiense. Me llamo Olivier.\n— Mucho gusto. Yo me llamo Carlos. Bienvenido a Cuba.\n— Gracias. Cuba es muy bonita.",
    context: {
      fr: "Dialogue de présentation à La Havane, capitale de Cuba. Les Cubains sont connus pour leur chaleur et leur hospitalité.",
      en: "Introduction dialogue in Havana, Cuba's capital. Cubans are known for their warmth and hospitality.",
    },
    vocab: [
      "bienvenido — bienvenue",
      "bonita — jolie/belle",
      "mucho gusto — enchanté(e)",
    ],
    questions: {
      fr: ["D'où vient Carlos ?", "Comment s'appelle le Canadien ?"],
      en: ["Where is Carlos from?", "What is the Canadian's name?"],
    },
  },
  {
    id: "cuba-a1-002",
    country: "cuba",
    level: "A1",
    type: "story",
    title: "El café cubano",
    excerpt:
      "En Cuba, el café es muy importante. El café cubano es fuerte y dulce. La gente toma café por la mañana y por la tarde. Es una tradición cubana muy especial. El café se sirve en una taza pequeña. A los cubanos les gusta mucho el café.",
    context: {
      fr: "Le café cubain est un élément central de la culture de l'île. Le café serré sucré (café cubano) est servi dans de petites tasses.",
      en: "Cuban coffee is a central element of island culture. The sweet espresso-style coffee is served in small cups.",
    },
    vocab: [
      "fuerte — fort",
      "dulce — sucré / doux",
      "taza — tasse",
      "por la mañana — le matin",
    ],
    questions: {
      fr: ["Comment est le café cubain ?", "Quand les Cubains boivent-ils du café ?"],
      en: ["What is Cuban coffee like?", "When do Cubans drink coffee?"],
    },
  },
];

export const cubaA2: ReadingItem[] = [
  {
    id: "cuba-a2-001",
    country: "cuba",
    level: "A2",
    type: "article",
    title: "La música de Cuba",
    excerpt:
      "Cuba es famosa por su música. El son, la salsa y el bolero son géneros musicales cubanos. La música cubana mezcla ritmos africanos y españoles. Los músicos cubanos son muy talentosos. En las calles de La Habana siempre se escucha música. El famoso Buena Vista Social Club presentó la música cubana al mundo entero.",
    context: {
      fr: "La musique cubaine est mondialement reconnue. Le Buena Vista Social Club a contribué à faire connaître le son cubain traditionnel dans les années 1990.",
      en: "Cuban music is world-renowned. The Buena Vista Social Club helped introduce traditional Cuban son music to global audiences in the 1990s.",
    },
    vocab: [
      "mezcla — mélange / mélanger",
      "ritmos — rythmes",
      "talentosos — talentueux",
      "siempre — toujours",
    ],
    questions: {
      fr: ["Quels genres musicaux viennent de Cuba ?", "Quelles influences a la musique cubaine ?"],
      en: ["What musical genres come from Cuba?", "What influences does Cuban music have?"],
    },
  },
  {
    id: "cuba-a2-002",
    country: "cuba",
    level: "A2",
    type: "article",
    title: "Los carros clásicos de Cuba",
    excerpt:
      "En Cuba hay muchos carros clásicos americanos de los años 50. Estos carros son de colores brillantes: rojo, amarillo, azul y verde. Los cubanos los llaman 'almendrones'. Los turistas les encantan. Los dueños cuidan mucho sus carros porque son muy viejos. Los almendrones son parte de la identidad cubana.",
    context: {
      fr: "Les voitures américaines des années 1950 sont emblématiques de Cuba. Appelées 'almendrones', elles sont encore utilisées comme taxis et font partie du paysage culturel de l'île.",
      en: "American cars from the 1950s are iconic in Cuba. Called 'almendrones', they are still used as taxis and are part of the island's cultural landscape.",
    },
    vocab: [
      "brillantes — brillants / vifs",
      "almendrones — vieilles voitures américaines (argot cubain)",
      "dueños — propriétaires",
      "cuidan — ils prennent soin",
    ],
    questions: {
      fr: ["Comment appelle-t-on les vieilles voitures à Cuba ?", "Pourquoi les propriétaires prennent-ils soin de leurs voitures ?"],
      en: ["What are old cars called in Cuba?", "Why do owners take care of their cars?"],
    },
  },
];

export const cubaB1: ReadingItem[] = [
  {
    id: "cuba-b1-001",
    country: "cuba",
    level: "B1",
    type: "article",
    title: "La Revolución y la sociedad cubana",
    excerpt:
      "La Revolución Cubana de 1959 transformó profundamente la sociedad del país. Bajo el liderazgo de Fidel Castro, Cuba implementó un sistema socialista con educación y salud gratuitas para todos los ciudadanos. El país tiene una de las tasas de alfabetización más altas de América Latina. Sin embargo, las restricciones económicas y políticas han generado importantes flujos migratorios hacia Estados Unidos y otros países.",
    context: {
      fr: "La Révolution cubaine de 1959 a profondément marqué l'île. Le système socialiste a apporté des avancées en éducation et santé, mais aussi des restrictions politiques et économiques qui ont poussé beaucoup de Cubains à émigrer.",
      en: "The 1959 Cuban Revolution profoundly shaped the island. The socialist system brought advances in education and health, but also political and economic restrictions that drove many Cubans to emigrate.",
    },
    vocab: [
      "profundamente — profondément",
      "liderazgo — leadership",
      "alfabetización — alphabétisation",
      "flujos migratorios — flux migratoires",
    ],
    questions: {
      fr: [
        "Qu'est-ce que la Révolution cubaine a changé dans la société ?",
        "Quels sont les aspects positifs et négatifs mentionnés dans le texte ?",
      ],
      en: [
        "What did the Cuban Revolution change in society?",
        "What positive and negative aspects are mentioned in the text?",
      ],
    },
  },
];