import type { ReadingItem } from "./culturalTexts";

export const spainA2: ReadingItem[] = [
  {
    id: "es_a2_1",
    level: "A2",
    country: "Espagne",
    title: "Un week-end à Séville",
    excerpt: "El sábado fuimos a Sevilla y visitamos la catedral.",
    context: "Séville, capitale andalouse, célèbre pour sa cathédrale.",
    vocab: ["sábado = samedi", "fuimos = nous sommes allés", "catedral = cathédrale"],
    questions: ["Où sont-ils allés ?", "Quel temps verbal ?"]
  },
  {
    id: "es_a2_2",
    level: "A2",
    country: "Espagne",
    title: "Tapas avec des amis",
    excerpt: "Anoche cenamos tapas: tortilla, jamón y calamares.",
    context: "Les tapas sont des petits plats à partager.",
    vocab: ["anoche = hier soir", "tortilla = omelette", "calamares = calamars"],
    questions: ["Que mangent-ils ?", "Quand ?"]
  }
// ─── À COLLER dans src/data/texts/spainTexts.ts (ou le fichier textes Espagne) ───
// Ajoute ces entrées dans le tableau spainB1 (ou crée-le s'il n'existe pas encore)

export const spainB1_verbos_cambio: ReadingItem[] = [
  {
    id: "es_b1_cambio_1",
    level: "B1",
    country: "Espagne",
    title: "La transformación de Marcos",
    excerpt:
      "Marcos era un chico tranquilo y tímido cuando llegó a la universidad. Al principio se sentía perdido entre tanta gente. Pero poco a poco, gracias al teatro universitario, se fue haciendo más seguro de sí mismo. Sus amigos notaron que se había vuelto más sociable y divertido. Sin embargo, cuando suspendió los exámenes de enero, se puso muy nervioso y se quedó sin dormir varios días. Al final aprobó todo en junio y, según él, se convirtió en otra persona.",
    context:
      "Ce texte illustre les différents verbes de changement en contexte narratif réel : hacerse, volverse, ponerse, quedarse, sentirse, convertirse en.",
    vocab: [
      "tranquilo = calme",
      "tímido = timide",
      "seguro de sí mismo = confiant",
      "suspendió = a échoué à (un examen)",
      "aprobó = a réussi",
      "se fue haciendo = est progressivement devenu"
    ],
    questions: [
      "¿Cómo era Marcos al principio?",
      "¿Qué verbo usarías para describir su cambio de personalidad?",
      "¿Por qué se quedó sin dormir?",
      "¿Cuál es la diferencia entre 'se puso nervioso' y 'se volvió nervioso'?"
    ]
  },
  {
    id: "es_b1_cambio_2",
    level: "B1",
    country: "Espagne",
    title: "El camino de Ana",
    excerpt:
      "Ana nunca pensó en la política hasta los treinta años. Después de leer mucho y viajar por distintos países, se fue haciendo activista de forma gradual. Su familia decía que se había vuelto «demasiado radical», pero ella se sentía más libre que nunca. Un día, en una manifestación, se quedó atrapada entre la policía y los manifestantes y se puso muy asustada. Aquella experiencia la marcó. Con el tiempo, se convirtió en una de las voces más respetadas del movimiento.",
    context:
      "Texte narratif autour d'une trajectoire personnelle et politique, utilisant naturellement les verbos de cambio.",
    vocab: [
      "activista = militante",
      "manifestación = manifestation",
      "manifestantes = manifestants",
      "atrapada = piégée",
      "marcó = a marquée",
      "voces = voix"
    ],
    questions: [
      "¿Cómo se hizo activista Ana?",
      "¿Por qué se puso asustada?",
      "¿Qué diferencia hay entre 'se hizo activista' y 'se volvió radical'?",
      "¿Con qué verbo describes que ella se sentía libre?"
    ]
  }
];

];
