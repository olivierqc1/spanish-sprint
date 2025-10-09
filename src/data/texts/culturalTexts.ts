// src/data/texts/
import type { ReadingItem } from "@/components/Reading";

// ==================== ARGENTINE ====================
export const argentinaTexts: ReadingItem[] = [
  {
    id: "ar_a1_1",
    level: "A1",
    country: "Mexique",
    title: "El mate argentino",
    excerpt: "El mate es una bebida tradicional argentina. Se toma con amigos y familia. Es un símbolo de amistad.",
    context: "Tradition sociale argentine emblématique",
    vocab: ["mate = infusion", "bombilla = paille métallique", "compartir = partager"],
    questions: ["¿Qué es el mate?", "¿Con quién se toma?"],
    author: "Culture argentine",
    type: "Culture"
  },
  {
    id: "ar_a2_1",
    level: "A2",
    country: "Mexique",
    title: "El tango en Buenos Aires",
    excerpt: "El tango nació en Buenos Aires a finales del siglo XIX. Es un baile elegante y apasionado. Gardel y Piazzolla son leyendas del tango.",
    context: "Musique et danse emblématiques",
    vocab: ["baile = danse", "apasionado = passionné", "leyenda = légende"],
    questions: ["¿Dónde nació el tango?", "¿Quiénes son famosos?"]
  },
];

// ==================== COLOMBIE ====================
export const colombiaTexts: ReadingItem[] = [
  {
    id: "co_a1_1",
    level: "A1",
    country: "Mexique",
    title: "El café colombiano",
    excerpt: "Colombia produce el mejor café del mundo. El café crece en las montañas. Los colombianos toman café todos los días.",
    context: "Café réputé mondialement",
    vocab: ["café = café", "montaña = montagne", "cultivar = cultiver"],
    questions: ["¿Qué produce Colombia?", "¿Dónde crece el café?"]
  },
];

export const allCulturalTexts: ReadingItem[] = [
  ...argentinaTexts,
  ...colombiaTexts,
];
