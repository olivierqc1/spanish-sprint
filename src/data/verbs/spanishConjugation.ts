// src/data/verbs/spanishConjugation.ts
// POUR AJOUTER DES VERBES ESPAGNOLS : c'est ICI et seulement ici.
//   - verbsByTense : les verbes disponibles par temps
//   - CTX : les phrases de contexte par temps
//   - TENSES_BY_LEVEL : quels temps sont proposes a chaque niveau

export const ALL_TENSES = [
  'presente','preterito_perfecto','imperativo','imperfecto',
  'futuro','preterito','condicional','pluscuamperfecto','subjuntivo_presente',
];
export const TENSES_BY_LEVEL: Record<string, string[]> = {
  A1:  ['presente','preterito_perfecto','imperativo'],
  A2:  ['presente','preterito_perfecto','imperativo','imperfecto','futuro'],
  B1:  ['presente','preterito_perfecto','imperativo','imperfecto','futuro','preterito','condicional'],
  B2:  ALL_TENSES,
  C1:  ALL_TENSES,
  C2:  ALL_TENSES,
  ALL: ALL_TENSES,
};

export const CTX_PRESENTE = [
  'Cada dia, yo ___','Ahora, tu ___','El ___ siempre',
  'Nosotros ___ juntos','Vosotros ___ bien','Ellos ___ mucho',
];
export const CTX_PRET_PERF = [
  'Hoy, yo ___','Esta semana, tu ___','Este mes, el ___',
  'Este anio, nosotros ___','Ultimamente, vosotros ___','Recientemente, ellos ___',
];
export const CTX_IMPERATIVO = [
  'Hazlo tu: ___','Digale usted: ___','Hagamos: ___',
  'Hablad vosotros: ___','Hablen ustedes: ___','Ven aqui tu: ___',
];
export const CTX_PRETERITO = [
  'Ayer, yo ___','La semana pasada, tu ___','Hace dos dias, el ___',
  'El mes pasado, nosotros ___','Ese dia, vosotros ___','Anteayer, ellos ___',
];
export const CTX_IMPERFECTO = [
  'De nino, yo ___','Antes, tu ___ siempre','En esa epoca, el ___',
  'Cada verano, nosotros ___','Los sabados, vosotros ___','De joven, ellos ___',
];
export const CTX_FUTURO = [
  'Manana, yo ___','La semana que viene, tu ___','El mes proximo, el ___',
  'En un mes, nosotros ___','Pronto, vosotros ___','Algun dia, ellos ___',
];
export const CTX_CONDICIONAL = [
  'En tu lugar, yo ___','Si pudieras, tu ___','El dijo que ___',
  'Con tiempo, nosotros ___','En esa situacion, vosotros ___','Con dinero, ellos ___',
];
export const CTX_PLUSCUAM = [
  'Antes, yo ya ___','Cuando llegaste, tu ya ___','Cuando llegue, el ya ___',
  'Antes de salir, nosotros ya ___','Cuando llame, vosotros ya ___','Antes, ellos ya ___',
];
export const CTX_SUBJUNTIVO = [
  'Espero que yo ___','Quiero que tu ___','Es importante que el ___',
  'Ojala nosotros ___','Dudo que vosotros ___','No creo que ellos ___',
];
export const CTX: Record<string, string[]> = {
  presente:            CTX_PRESENTE,
  preterito_perfecto:  CTX_PRET_PERF,
  imperativo:          CTX_IMPERATIVO,
  preterito:           CTX_PRETERITO,
  imperfecto:          CTX_IMPERFECTO,
  futuro:              CTX_FUTURO,
  condicional:         CTX_CONDICIONAL,
  pluscuamperfecto:    CTX_PLUSCUAM,
  subjuntivo_presente: CTX_SUBJUNTIVO,
};

export type ConjugationExercise = {
  id: number; verb: string; pronoun: number;
  tense: string; contextPhrase: string; answer: string;
};

const C1 = ['hablo','hablas','habla','hablamos','habláis','hablan'];
const C2 = ['como','comes','come','comemos','coméis','comen'];
const C3 = ['vivo','vives','vive','vivimos','vivís','viven'];
const C4 = ['soy','eres','es','somos','sois','son'];
const C5 = ['estoy','estás','está','estamos','estáis','están'];
const C6 = ['tengo','tienes','tiene','tenemos','tenéis','tienen'];
const C7 = ['hago','haces','hace','hacemos','hacéis','hacen'];
const C8 = ['voy','vas','va','vamos','vais','van'];
const C9 = ['vengo','vienes','viene','venimos','venís','vienen'];
const C10 = ['digo','dices','dice','decimos','decís','dicen'];

const PP1 = ['he hablado','has hablado','ha hablado','hemos hablado','habéis hablado','han hablado'];
const PP2 = ['he comido','has comido','ha comido','hemos comido','habéis comido','han comido'];
const PP3 = ['he vivido','has vivido','ha vivido','hemos vivido','habéis vivido','han vivido'];
const PP4 = ['he hecho','has hecho','ha hecho','hemos hecho','habéis hecho','han hecho'];
const PP5 = ['he visto','has visto','ha visto','hemos visto','habéis visto','han visto'];
const PP6 = ['he dicho','has dicho','ha dicho','hemos dicho','habéis dicho','han dicho'];
const PP7 = ['he puesto','has puesto','ha puesto','hemos puesto','habéis puesto','han puesto'];
const PP8 = ['he escrito','has escrito','ha escrito','hemos escrito','habéis escrito','han escrito'];

const PQ1a = ['habia hablado','habias hablado','habia hablado'];
const PQ1b = ['habiamos hablado','habiais hablado','habian hablado'];
const PQ1 = [...PQ1a, ...PQ1b];
const PQ2a = ['habia comido','habias comido','habia comido'];
const PQ2b = ['habiamos comido','habiais comido','habian comido'];
const PQ2 = [...PQ2a, ...PQ2b];
const PQ3a = ['habia vivido','habias vivido','habia vivido'];
const PQ3b = ['habiamos vivido','habiais vivido','habian vivido'];
const PQ3 = [...PQ3a, ...PQ3b];
const PQ4a = ['habia hecho','habias hecho','habia hecho'];
const PQ4b = ['habiamos hecho','habiais hecho','habian hecho'];
const PQ4 = [...PQ4a, ...PQ4b];
const PQ5a = ['habia visto','habias visto','habia visto'];
const PQ5b = ['habiamos visto','habiais visto','habian visto'];
const PQ5 = [...PQ5a, ...PQ5b];
const PQ6a = ['habia escrito','habias escrito','habia escrito'];
const PQ6b = ['habiamos escrito','habiais escrito','habian escrito'];
const PQ6 = [...PQ6a, ...PQ6b];

export const verbsByTense: Record<string, Array<{ verb: string; conjugations: string[] }>> = {
  presente: [
    { verb: 'hablar', conjugations: C1 },
    { verb: 'comer',  conjugations: C2 },
    { verb: 'vivir',  conjugations: C3 },
    { verb: 'ser',    conjugations: C4 },
    { verb: 'estar',  conjugations: C5 },
    { verb: 'tener',  conjugations: C6 },
    { verb: 'hacer',  conjugations: C7 },
    { verb: 'ir',     conjugations: C8 },
    { verb: 'venir',  conjugations: C9 },
    { verb: 'decir',  conjugations: C10 },
  ],
  preterito_perfecto: [
    { verb: 'hablar',   conjugations: PP1 },
    { verb: 'comer',    conjugations: PP2 },
    { verb: 'vivir',    conjugations: PP3 },
    { verb: 'hacer',    conjugations: PP4 },
    { verb: 'ver',      conjugations: PP5 },
    { verb: 'decir',    conjugations: PP6 },
    { verb: 'poner',    conjugations: PP7 },
    { verb: 'escribir', conjugations: PP8 },
  ],
  imperativo: [
    { verb: 'hablar', conjugations: ['habla','hable','hablemos','hablad','hablen'] },
    { verb: 'comer',  conjugations: ['come','coma','comamos','comed','coman'] },
    { verb: 'vivir',  conjugations: ['vive','viva','vivamos','vivid','vivan'] },
    { verb: 'ser',    conjugations: ['se','sea','seamos','sed','sean'] },
    { verb: 'estar',  conjugations: ['esta','este','estemos','estad','esten'] },
    { verb: 'ir',     conjugations: ['ve','vaya','vamos','id','vayan'] },
    { verb: 'tener',  conjugations: ['ten','tenga','tengamos','tened','tengan'] },
    { verb: 'hacer',  conjugations: ['haz','haga','hagamos','haced','hagan'] },
  ],
  preterito: [
    { verb: 'hablar', conjugations: ['hable','hablaste','habló','hablamos','hablasteis','hablaron'] },
    { verb: 'comer',  conjugations: ['comi','comiste','comio','comimos','comisteis','comieron'] },
    { verb: 'vivir',  conjugations: ['vivi','viviste','vivio','vivimos','vivisteis','vivieron'] },
    { verb: 'ser',    conjugations: ['fui','fuiste','fue','fuimos','fuisteis','fueron'] },
    { verb: 'hacer',  conjugations: ['hice','hiciste','hizo','hicimos','hicisteis','hicieron'] },
    { verb: 'tener',  conjugations: ['tuve','tuviste','tuvo','tuvimos','tuvisteis','tuvieron'] },
    { verb: 'estar',  conjugations: ['estuve','estuviste','estuvo','estuvimos','estuvisteis','estuvieron'] },
  ],
  imperfecto: [
    { verb: 'hablar', conjugations: ['hablaba','hablabas','hablaba','hablábamos','hablabais','hablaban'] },
    { verb: 'comer',  conjugations: ['comia','comias','comia','comiamos','comiais','comian'] },
    { verb: 'vivir',  conjugations: ['vivia','vivias','vivia','viviamos','viviais','vivian'] },
    { verb: 'ser',    conjugations: ['era','eras','era','éramos','erais','eran'] },
    { verb: 'ir',     conjugations: ['iba','ibas','iba','ibamos','ibais','iban'] },
    { verb: 'ver',    conjugations: ['veia','veias','veia','veiamos','veiais','veian'] },
  ],
  futuro: [
    { verb: 'hablar', conjugations: ['hablare','hablaras','hablara','hablaremos','hablareis','hablaran'] },
    { verb: 'comer',  conjugations: ['comere','comeras','comera','comeremos','comereis','comeran'] },
    { verb: 'vivir',  conjugations: ['vivire','viviras','vivira','viviremos','vivireis','viviran'] },
    { verb: 'tener',  conjugations: ['tendre','tendras','tendra','tendremos','tendreis','tendran'] },
    { verb: 'poder',  conjugations: ['podre','podras','podra','podremos','podreis','podran'] },
    { verb: 'hacer',  conjugations: ['hare','haras','hara','haremos','hareis','haran'] },
    { verb: 'salir',  conjugations: ['saldre','saldras','saldra','saldremos','saldreis','saldran'] },
    { verb: 'venir',  conjugations: ['vendre','vendras','vendra','vendremos','vendreis','vendran'] },
  ],
  condicional: [
    { verb: 'hablar',
      conjugations: ['hablaria','hablarias','hablaria','hablariamos','hablariais','hablarian'] },
    { verb: 'comer',
      conjugations: ['comeria','comerias','comeria','comeriamos','comeriais','comerian'] },
    { verb: 'vivir',
      conjugations: ['viviria','vivirias','viviria','viviriamos','viviriais','vivirian'] },
    { verb: 'tener',
      conjugations: ['tendria','tendrias','tendria','tendriamos','tendriais','tendrian'] },
    { verb: 'poder',
      conjugations: ['podria','podrias','podria','podriamos','podriais','podrian'] },
    { verb: 'hacer',
      conjugations: ['haria','harias','haria','hariamos','hariais','harian'] },
  ],
  pluscuamperfecto: [
    { verb: 'hablar',   conjugations: PQ1 },
    { verb: 'comer',    conjugations: PQ2 },
    { verb: 'vivir',    conjugations: PQ3 },
    { verb: 'hacer',    conjugations: PQ4 },
    { verb: 'ver',      conjugations: PQ5 },
    { verb: 'escribir', conjugations: PQ6 },
  ],
  subjuntivo_presente: [
    { verb: 'hablar', conjugations: ['hable','hables','hable','hablemos','hableis','hablen'] },
    { verb: 'comer',  conjugations: ['coma','comas','coma','comamos','comais','coman'] },
    { verb: 'vivir',  conjugations: ['viva','vivas','viva','vivamos','vivais','vivan'] },
    { verb: 'ser',    conjugations: ['sea','seas','sea','seamos','seais','sean'] },
    { verb: 'estar',  conjugations: ['este','estes','este','estemos','esteis','esten'] },
    { verb: 'tener',  conjugations: ['tenga','tengas','tenga','tengamos','tengais','tengan'] },
    { verb: 'hacer',  conjugations: ['haga','hagas','haga','hagamos','hagais','hagan'] },
    { verb: 'ir',     conjugations: ['vaya','vayas','vaya','vayamos','vayais','vayan'] },
  ],
};
