import type { OrthoItem } from "@/components/Orthographe";
import type { DicteeItem } from "@/components/Dictee";

// même silence
const SILENT_MP3 = "data:audio/mpeg;base64,//uQZAAAAAAAAAAAAAAAAAAAAAA";

const orthographe: OrthoItem[] = [
  { id:"o-es-a1-1", level:"A1", country:"Espagne", prompt:"Buenos ___ (jours) : buenos ___", answer:"días", hint:"accent sur í" },
  { id:"o-es-a1-2", level:"A1", country:"Espagne", prompt:"¿Cómo te ___ (appelles-tu)?", answer:"llamas" },
  { id:"o-mx-a1-1", level:"A1", country:"Mexique", prompt:"Me gusta el ___ (café) de olla.", answer:"café" },
  { id:"o-es-a2-1", level:"A2", country:"Espagne", prompt:"Anoche ___ (nous avons dîné) tapas.", answer:"cenamos" },
  { id:"o-mx-a2-1", level:"A2", country:"Mexique", prompt:"El 16 de septiembre ___ (nous crions) ¡Viva México!", answer:"gritamos" },
  { id:"o-es-b1-1", level:"B1", country:"Espagne", prompt:"Un ___ (gentilhomme) salió de La Mancha.", answer:"hidalgo" },
];

const dictee: DicteeItem[] = [
  { id:"d-es-a1-1", level:"A1", country:"Espagne", title:"Saludos", audio:SILENT_MP3, transcript:"Hola, me llamo Ana. Soy de Sevilla." },
  { id:"d-mx-a1-1", level:"A1", country:"Mexique", title:"En el mercado", audio:SILENT_MP3, transcript:"Quiero tortillas y frijoles, por favor." },
  { id:"d-es-a2-1", level:"A2", country:"Espagne", title:"Un fin de semana", audio:SILENT_MP3, transcript:"El sábado fuimos a Sevilla y visitamos la catedral." },
  { id:"d-mx-a2-1", level:"A2", country:"Mexique", title:"Mariachis", audio:SILENT_MP3, transcript:"En la plaza tocan mariachis con guitarras y trompetas." },
  { id:"d-es-b1-1", level:"B1", country:"Espagne", title:"Movida", audio:SILENT_MP3, transcript:"En los años ochenta, Madrid vivió una revolución cultural." }
];

export const exercises = { orthographe, dictee };
