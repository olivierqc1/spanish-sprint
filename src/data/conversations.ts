// src/data/conversations.ts
import { getAudioUrl } from "@/lib/supabase";

export type ConversationLine = {
  speaker: "A" | "B";
  speakerName: string;
  text: string;
  audioFilename: string;
};

export type ConversationQuestion = {
  question: string;
  type: "choice" | "text";
  options?: string[];
  correctAnswer: string;
  explanation?: string;
};

export type Conversation = {
  id: string;
  level: "A1" | "A2" | "B1" | "B2";
  country: "Espagne" | "Mexique" | "Argentine" | "Colombie";
  title: string;
  context: string;
  lines: ConversationLine[];
  questions: ConversationQuestion[];
  vocabulary: string[];
};

export const conversations: Conversation[] = [
  {
    id: "conv_es_a1_cafe",
    level: "A1",
    country: "Espagne",
    title: "Au café",
    context: "Deux amis commandent au café",
    lines: [
      {
        speaker: "A",
        speakerName: "Carlos",
        text: "Hola María, ¿cómo estás?",
        audioFilename: "conv_es_a1_cafe_01.mp3"
      },
      {
        speaker: "B",
        speakerName: "María",
        text: "Muy bien, gracias. ¿Y tú?",
        audioFilename: "conv_es_a1_cafe_02.mp3"
      },
      {
        speaker: "A",
        speakerName: "Carlos",
        text: "Bien también. ¿Qué vas a tomar?",
        audioFilename: "conv_es_a1_cafe_03.mp3"
      },
      {
        speaker: "B",
        speakerName: "María",
        text: "Un café con leche y un croissant, por favor.",
        audioFilename: "conv_es_a1_cafe_04.mp3"
      },
      {
        speaker: "A",
        speakerName: "Carlos",
        text: "Para mí, un zumo de naranja.",
        audioFilename: "conv_es_a1_cafe_05.mp3"
      }
    ],
    questions: [
      {
        question: "¿Qué va a tomar María?",
        type: "choice",
        options: [
          "Un café con leche y un croissant",
          "Un zumo de naranja",
          "Un té",
          "Nada"
        ],
        correctAnswer: "Un café con leche y un croissant"
      },
      {
        question: "¿Qué va a tomar Carlos?",
        type: "choice",
        options: [
          "Un café",
          "Un té",
          "Un zumo de naranja",
          "Un croissant"
        ],
        correctAnswer: "Un zumo de naranja"
      },
      {
        question: "¿Cómo se siente María?",
        type: "text",
        correctAnswer: "muy bien",
        explanation: "María responde 'Muy bien, gracias'"
      }
    ],
    vocabulary: [
      "café con leche = café au lait",
      "croissant = croissant",
      "zumo = jus",
      "tomar = prendre (consommer)"
    ]
  },
  
  {
    id: "conv_mx_a1_mercado",
    level: "A1",
    country: "Mexique",
    title: "Au marché",
    context: "Acheter des fruits au marché mexicain",
    lines: [
      {
        speaker: "A",
        speakerName: "Cliente",
        text: "Buenos días. ¿Cuánto cuestan los aguacates?",
        audioFilename: "conv_mx_a1_mercado_01.mp3"
      },
      {
        speaker: "B",
        speakerName: "Vendedor",
        text: "Treinta pesos el kilo, güerito.",
        audioFilename: "conv_mx_a1_mercado_02.mp3"
      },
      {
        speaker: "A",
        speakerName: "Cliente",
        text: "Dame dos kilos, por favor. ¿Y los mangos?",
        audioFilename: "conv_mx_a1_mercado_03.mp3"
      },
      {
        speaker: "B",
        speakerName: "Vendedor",
        text: "Los mangos están a veinte pesos el kilo.",
        audioFilename: "conv_mx_a1_mercado_04.mp3"
      },
      {
        speaker: "A",
        speakerName: "Cliente",
        text: "Perfecto, un kilo de mangos también.",
        audioFilename: "conv_mx_a1_mercado_05.mp3"
      }
    ],
    questions: [
      {
        question: "¿Cuánto cuestan los aguacates?",
        type: "choice",
        options: ["20 pesos", "25 pesos", "30 pesos", "35 pesos"],
        correctAnswer: "30 pesos"
      },
      {
        question: "¿Cuántos kilos de aguacates compra?",
        type: "text",
        correctAnswer: "dos",
        explanation: "El cliente dice 'Dame dos kilos'"
      },
      {
        question: "¿Qué más compra el cliente?",
        type: "choice",
        options: ["Naranjas", "Mangos", "Papayas", "Plátanos"],
        correctAnswer: "Mangos"
      }
    ],
    vocabulary: [
      "aguacate = avocat",
      "güerito = mon ami (familier MX)",
      "dame = donne-moi",
      "mangos = mangues"
    ]
  },

  {
    id: "conv_es_a2_hotel",
    level: "A2",
    country: "Espagne",
    title: "Réservation d'hôtel",
    context: "Réserver une chambre d'hôtel par téléphone",
    lines: [
      {
        speaker: "A",
        speakerName: "Recepcionista",
        text: "Hotel Sol y Mar, buenas tardes.",
        audioFilename: "conv_es_a2_hotel_01.mp3"
      },
      {
        speaker: "B",
        speakerName: "Cliente",
        text: "Buenas tardes. Quería reservar una habitación para el fin de semana.",
        audioFilename: "conv_es_a2_hotel_02.mp3"
      },
      {
        speaker: "A",
        speakerName: "Recepcionista",
        text: "Perfecto. ¿Para cuántas personas?",
        audioFilename: "conv_es_a2_hotel_03.mp3"
      },
      {
        speaker: "B",
        speakerName: "Cliente",
        text: "Para dos personas. Una habitación doble con vistas al mar, si es posible.",
        audioFilename: "conv_es_a2_hotel_04.mp3"
      },
      {
        speaker: "A",
        speakerName: "Recepcionista",
        text: "Sí, tenemos disponibilidad. ¿Cuántas noches?",
        audioFilename: "conv_es_a2_hotel_05.mp3"
      },
      {
        speaker: "B",
        speakerName: "Cliente",
        text: "Dos noches, del viernes al domingo.",
        audioFilename: "conv_es_a2_hotel_06.mp3"
      }
    ],
    questions: [
      {
        question: "¿Para cuántas personas es la reserva?",
        type: "choice",
        options: ["Una", "Dos", "Tres", "Cuatro"],
        correctAnswer: "Dos"
      },
      {
        question: "¿Qué tipo de habitación quiere?",
        type: "text",
        correctAnswer: "doble con vistas al mar",
        explanation: "El cliente pide 'una habitación doble con vistas al mar'"
      },
      {
        question: "¿Cuántas noches va a quedarse?",
        type: "choice",
        options: ["Una noche", "Dos noches", "Tres noches", "Una semana"],
        correctAnswer: "Dos noches"
      }
    ],
    vocabulary: [
      "quería = je voudrais",
      "habitación = chambre",
      "vistas al mar = vue sur la mer",
      "disponibilidad = disponibilité"
    ]
  }
];

export function getConversationWithAudioUrls(conversation: Conversation): Conversation {
  return {
    ...conversation,
    lines: conversation.lines.map(line => ({
      ...line,
      audioUrl: getAudioUrl(line.audioFilename)
    }))
  };
        }
