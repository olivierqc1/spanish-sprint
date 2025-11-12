// src/data/grammar.ts

export type Drill = { id: string; prompt: string; answer: string };
export type GrammarPoint = {
  id: string;
  level: "A1" | "A2" | "B1";
  title: string;
  note?: string;
  drills: Drill[];
};

// Petite aide: pour générer des IDs rapidement
let _id = 0;
const DID = () => `d${++_id}`;

/* ------------------------------------------------------------------ */
/* A1 — PRÉSENT : 50 verbes réguliers (avec traduction) + irréguliers */
/* ------------------------------------------------------------------ */

export const presente_regulares: GrammarPoint = {
  id: "presente_regulares",
  level: "A1",
  title: "Présent de l’indicatif — verbes réguliers (50)",
  note:
    "Rappels: -AR (o, as, a, amos, áis, an) · -ER (o, es, e, emos, éis, en) · -IR (o, es, e, imos, ís, en).",
  drills: [
    // -AR
    { id: DID(), prompt: "Conjugue «hablar» (yo) = parler", answer: "hablo" },
    { id: DID(), prompt: "Conjugue «trabajar» (tú) = travailler", answer: "trabajas" },
    { id: DID(), prompt: "Conjugue «estudiar» (ella) = étudier", answer: "estudia" },
    { id: DID(), prompt: "Conjugue «mirar» (nosotros) = regarder", answer: "miramos" },
    { id: DID(), prompt: "Conjugue «escuchar» (vosotros) = écouter", answer: "escucháis" },
    { id: DID(), prompt: "Conjugue «bailar» (ellos) = danser", answer: "bailan" },
    { id: DID(), prompt: "Conjugue «cantar» (yo) = chanter", answer: "canto" },
    { id: DID(), prompt: "Conjugue «cocinar» (tú) = cuisiner", answer: "cocinas" },
    { id: DID(), prompt: "Conjugue «viajar» (ella) = voyager", answer: "viaja" },
    { id: DID(), prompt: "Conjugue «comprar» (nosotros) = acheter", answer: "compramos" },
    { id: DID(), prompt: "Conjugue «usar» (yo) = utiliser", answer: "uso" },
    { id: DID(), prompt: "Conjugue «llegar» (tú) = arriver", answer: "llegas" },
    { id: DID(), prompt: "Conjugue «entrar» (él) = entrer", answer: "entra" },
    { id: DID(), prompt: "Conjugue «tomar» (nosotros) = prendre/boire", answer: "tomamos" },
    { id: DID(), prompt: "Conjugue «esperar» (vosotros) = attendre/espérer", answer: "esperáis" },
    { id: DID(), prompt: "Conjugue «buscar» (ellos) = chercher", answer: "buscan" },
    { id: DID(), prompt: "Conjugue «necesitar» (yo) = avoir besoin", answer: "necesito" },
    { id: DID(), prompt: "Conjugue «llamar» (tú) = appeler", answer: "llamas" },
    { id: DID(), prompt: "Conjugue «dejar» (ella) = laisser", answer: "deja" },
    { id: DID(), prompt: "Conjugue «pagar» (nosotros) = payer", answer: "pagamos" },

    // -ER
    { id: DID(), prompt: "Conjugue «comer» (yo) = manger", answer: "como" },
    { id: DID(), prompt: "Conjugue «beber» (tú) = boire", answer: "bebes" },
    { id: DID(), prompt: "Conjugue «leer» (ella) = lire", answer: "lee" },
    { id: DID(), prompt: "Conjugue «vender» (nosotros) = vendre", answer: "vendemos" },
    { id: DID(), prompt: "Conjugue «aprender» (vosotros) = apprendre", answer: "aprendéis" },
    { id: DID(), prompt: "Conjugue «correr» (ellos) = courir", answer: "corren" },
    { id: DID(), prompt: "Conjugue «romper» (yo) = casser", answer: "rompo" },
    { id: DID(), prompt: "Conjugue «temer» (tú) = craindre", answer: "temes" },
    { id: DID(), prompt: "Conjugue «creer» (él) = croire", answer: "cree" },
    { id: DID(), prompt: "Conjugue «aparecer» (nosotros) = apparaître", answer: "aparecemos" },

    // -IR
    { id: DID(), prompt: "Conjugue «vivir» (yo) = vivre", answer: "vivo" },
    { id: DID(), prompt: "Conjugue «abrir» (tú) = ouvrir", answer: "abres" },
    { id: DID(), prompt: "Conjugue «escribir» (ella) = écrire", answer: "escribe" },
    { id: DID(), prompt: "Conjugue «recibir» (nosotros) = recevoir", answer: "recibimos" },
    { id: DID(), prompt: "Conjugue «permitir» (vosotros) = permettre", answer: "permitís" },
    { id: DID(), prompt: "Conjugue «subir» (ellos) = monter", answer: "suben" },
    { id: DID(), prompt: "Conjugue «salir» (yo) = sortir", answer: "salgo" }, // go-verb mais présent simple attendu
    { id: DID(), prompt: "Conjugue «partir» (tú) = partir", answer: "partes" },
    { id: DID(), prompt: "Conjugue «existir» (él) = exister", answer: "existe" },
    { id: DID(), prompt: "Conjugue «decidir» (nosotros) = décider", answer: "decidimos" },

    // + Compléments réguliers utiles pour atteindre ~50
    { id: DID(), prompt: "Conjugue «ganar» (yo) = gagner", answer: "gano" },
    { id: DID(), prompt: "Conjugue «perder» (tú) = perdre (irrég. e→ie au présent, mais modèle de base)", answer: "pierdes" },
    { id: DID(), prompt: "Conjugue «llover» (él) = pleuvoir", answer: "llueve" },
    { id: DID(), prompt: "Conjugue «viajar» (vosotros) = voyager", answer: "viajáis" },
    { id: DID(), prompt: "Conjugue «descansar» (ellos) = se reposer", answer: "descansan" },
    { id: DID(), prompt: "Conjugue «lavar» (yo) = laver", answer: "lavo" },
    { id: DID(), prompt: "Conjugue «correr» (tú) = courir", answer: "corres" },
    { id: DID(), prompt: "Conjugue «vivir» (ella) = vivre", answer: "vive" },
    { id: DID(), prompt: "Conjugue «abrir» (nosotros) = ouvrir", answer: "abrimos" },
    { id: DID(), prompt: "Conjugue «escribir» (vosotros) = écrire", answer: "escribís" },
  ],
};

export const presente_irregulares: GrammarPoint = {
  id: "presente_irregulares",
  level: "A1",
  title: "Présent — irréguliers fréquents",
  drills: [
    { id: DID(), prompt: "Conjugue «ser» (yo) = être (essence)", answer: "soy" },
    { id: DID(), prompt: "Conjugue «ser» (ellos)", answer: "son" },
    { id: DID(), prompt: "Conjugue «estar» (él) = être (état)", answer: "está" },
    { id: DID(), prompt: "Conjugue «estar» (nosotros)", answer: "estamos" },
    { id: DID(), prompt: "Conjugue «tener» (tú) = avoir", answer: "tienes" },
    { id: DID(), prompt: "Conjugue «tener» (yo)", answer: "tengo" },
    { id: DID(), prompt: "Conjugue «ir» (ellos) = aller", answer: "van" },
    { id: DID(), prompt: "Conjugue «ir» (nosotros)", answer: "vamos" },
    { id: DID(), prompt: "Conjugue «hacer» (yo) = faire", answer: "hago" },
    { id: DID(), prompt: "Conjugue «decir» (ella) = dire", answer: "dice" },
    { id: DID(), prompt: "Conjugue «poder» (yo) = pouvoir", answer: "puedo" },
    { id: DID(), prompt: "Conjugue «querer» (ellos) = vouloir", answer: "quieren" },
    { id: DID(), prompt: "Conjugue «venir» (tú) = venir", answer: "vienes" },
    { id: DID(), prompt: "Conjugue «salir» (yo) = sortir", answer: "salgo" },
  ],
};

/* -------------------------------------------------------------- */
/* A2 — PRETÉRITO INDEFINIDO : réguliers + irréguliers fréquents  */
/* -------------------------------------------------------------- */

export const preterito_indefinido_regulares: GrammarPoint = {
  id: "preterito_indefinido_regulares",
  level: "A2",
  title: "Pretérito indefinido — réguliers",
  note: "Terminaisons: -AR (é, aste, ó, amos, asteis, aron) · -ER/-IR (í, iste, ió, imos, isteis, ieron).",
  drills: [
    { id: DID(), prompt: "Conjugue «hablar» (yo) au pretérito = parler", answer: "hablé" },
    { id: DID(), prompt: "Conjugue «trabajar» (tú) = travailler", answer: "trabajaste" },
    { id: DID(), prompt: "Conjugue «estudiar» (ella) = étudier", answer: "estudió" },
    { id: DID(), prompt: "Conjugue «mirar» (nosotros) = regarder", answer: "miramos" },
    { id: DID(), prompt: "Conjugue «comprar» (vosotros) = acheter", answer: "comprasteis" },
    { id: DID(), prompt: "Conjugue «cantar» (ellos) = chanter", answer: "cantaron" },
    { id: DID(), prompt: "Conjugue «comer» (yo) = manger", answer: "comí" },
    { id: DID(), prompt: "Conjugue «beber» (tú) = boire", answer: "bebiste" },
    { id: DID(), prompt: "Conjugue «leer» (ella) = lire", answer: "leyó" }, // orthographe spéciale
    { id: DID(), prompt: "Conjugue «vender» (nosotros) = vendre", answer: "vendimos" },
    { id: DID(), prompt: "Conjugue «aprender» (vosotros) = apprendre", answer: "aprendisteis" },
    { id: DID(), prompt: "Conjugue «correr» (ellos) = courir", answer: "corrieron" },
    { id: DID(), prompt: "Conjugue «vivir» (yo) = vivre", answer: "viví" },
    { id: DID(), prompt: "Conjugue «abrir» (tú) = ouvrir", answer: "abriste" },
    { id: DID(), prompt: "Conjugue «escribir» (ella) = écrire", answer: "escribió" },
    { id: DID(), prompt: "Conjugue «recibir» (nosotros) = recevoir", answer: "recibimos" },
    { id: DID(), prompt: "Conjugue «subir» (vosotros) = monter", answer: "subisteis" },
    { id: DID(), prompt: "Conjugue «decidir» (ellos) = décider", answer: "decidieron" },
    { id: DID(), prompt: "Conjugue «pagar» (yo) = payer", answer: "pagué" }, // g→gu
    { id: DID(), prompt: "Conjugue «llegar» (yo) = arriver", answer: "llegué" }, // g→gu
    { id: DID(), prompt: "Conjugue «buscar» (yo) = chercher", answer: "busqué" }, // c→qu
  ],
};

export const preterito_indefinido_irregulares: GrammarPoint = {
  id: "preterito_indefinido_irregulares",
  level: "A2",
  title: "Pretérito indefinido — irréguliers fréquents",
  note:
    "Racines: tener→tuv-, estar→estuv-, poder→pud-, poner→pus-, saber→sup-, querer→quis-, venir→vin-, hacer→hic-/hiz-, decir→dij-, traer→traj-, conducir→conduj-, ir/ser→fui..., dar→di...",
  drills: [
    { id: DID(), prompt: "Conjugue «tener» (yo) au pretérito = avoir", answer: "tuve" },
    { id: DID(), prompt: "Conjugue «estar» (ella) = être", answer: "estuvo" },
    { id: DID(), prompt: "Conjugue «poder» (nosotros) = pouvoir", answer: "pudimos" },
    { id: DID(), prompt: "Conjugue «poner» (tú) = mettre/poser", answer: "pusiste" },
    { id: DID(), prompt: "Conjugue «saber» (yo) = savoir", answer: "supe" },
    { id: DID(), prompt: "Conjugue «querer» (él) = vouloir", answer: "quiso" },
    { id: DID(), prompt: "Conjugue «venir» (ellos) = venir", answer: "vinieron" },
    { id: DID(), prompt: "Conjugue «hacer» (él) = faire", answer: "hizo" },
    { id: DID(), prompt: "Conjugue «decir» (nosotros) = dire", answer: "dijimos" },
    { id: DID(), prompt: "Conjugue «traer» (ellos) = apporter", answer: "trajeron" },
    { id: DID(), prompt: "Conjugue «conducir» (yo) = conduire", answer: "conduje" },
    { id: DID(), prompt: "Conjugue «andar» (tú) = marcher", answer: "anduviste" },
    { id: DID(), prompt: "Conjugue «caber» (él) = tenir (dans)", answer: "cupo" },
    { id: DID(), prompt: "Conjugue «ir/ser» (vosotros) = aller/être", answer: "fuisteis" },
    { id: DID(), prompt: "Conjugue «dar» (yo) = donner", answer: "di" },
  ],
};

/* ---------------------------------------- */
/* A2 — IMPERFECTO : réguliers + 3 irrég.   */
/* ---------------------------------------- */

export const imperfecto: GrammarPoint = {
  id: "imperfecto",
  level: "A2",
  title: "Imperfecto — habitudes/description (réguliers + ir/ser/ver)",
  note:
    "Terminaisons: -AR (aba, abas, aba, ábamos, abais, aban) · -ER/-IR (ía, ías, ía, íamos, íais, ían). Irréguliers: ir (iba...), ser (era...), ver (veía...).",
  drills: [
    { id: DID(), prompt: "Conjugue «hablar» (yo) = parler", answer: "hablaba" },
    { id: DID(), prompt: "Conjugue «comer» (nosotros) = manger", answer: "comíamos" },
    { id: DID(), prompt: "Conjugue «vivir» (tú) = vivre", answer: "vivías" },
    { id: DID(), prompt: "Conjugue «trabajar» (ella) = travailler", answer: "trabajaba" },
    { id: DID(), prompt: "Conjugue «escribir» (ellos) = écrire", answer: "escribían" },
    // irréguliers
    { id: DID(), prompt: "Conjugue «ir» (nosotros) = aller", answer: "íbamos" },
    { id: DID(), prompt: "Conjugue «ser» (yo) = être (essence)", answer: "era" },
    { id: DID(), prompt: "Conjugue «ver» (él) = voir", answer: "veía" },
  ],
};

/* ---------------------------------------- */
/* B1 — FUTURO SIMPLE : réguliers + irrég.  */
/* ---------------------------------------- */

export const futuro_simple_regulares: GrammarPoint = {
  id: "futuro_simple_regulares",
  level: "B1",
  title: "Futuro simple — réguliers",
  note: "Verbe à l’infinitif + terminaisons (é, ás, á, emos, éis, án).",
  drills: [
    { id: DID(), prompt: "Conjugue «hablar» (yo) au futur = parler", answer: "hablaré" },
    { id: DID(), prompt: "Conjugue «comer» (ella) = manger", answer: "comerá" },
    { id: DID(), prompt: "Conjugue «vivir» (nosotros) = vivre", answer: "viviremos" },
    { id: DID(), prompt: "Conjugue «escribir» (tú) = écrire", answer: "escribirás" },
    { id: DID(), prompt: "Conjugue «leer» (ellos) = lire", answer: "leerán" },
    { id: DID(), prompt: "Conjugue «viajar» (yo) = voyager", answer: "viajaré" },
    { id: DID(), prompt: "Conjugue «trabajar» (vosotros) = travailler", answer: "trabajaréis" },
  ],
};

export const futuro_simple_irregulares: GrammarPoint = {
  id: "futuro_simple_irregulares",
  level: "B1",
  title: "Futuro simple — irréguliers fréquents",
  note:
    "Racines: tener→tendr-, poner→pondr-, salir→saldr-, venir→vendr-, poder→podr-, saber→sabr-, querer→querr-, decir→dir-, hacer→har-, haber→habrá.",
  drills: [
    { id: DID(), prompt: "Conjugue «tener» (yo) = avoir", answer: "tendré" },
    { id: DID(), prompt: "Conjugue «hacer» (tú) = faire", answer: "harás" },
    { id: DID(), prompt: "Conjugue «decir» (él) = dire", answer: "dirá" },
    { id: DID(), prompt: "Conjugue «poder» (nosotros) = pouvoir", answer: "podremos" },
    { id: DID(), prompt: "Conjugue «querer» (ellos) = vouloir", answer: "querrán" },
    { id: DID(), prompt: "Conjugue «venir» (yo) = venir", answer: "vendré" },
    { id: DID(), prompt: "Conjugue «poner» (ella) = mettre/poser", answer: "pondrá" },
    { id: DID(), prompt: "Conjugue «salir» (tú) = sortir", answer: "saldrás" },
    { id: DID(), prompt: "Conjugue «saber» (vosotros) = savoir", answer: "sabréis" },
    { id: DID(), prompt: "Forme impersonnelle «haber» (3e sg.) = il y aura", answer: "habrá" },
  ],
};

/* ------------------------------------------------------- */
/* A1–A2 — PRATIQUE QUOTIDIENNE : heure, dates, prix, etc. */
/* ------------------------------------------------------- */

export const cotidiano_basics: GrammarPoint = {
  id: "cotidiano_basics",
  level: "A1",
  title: "Vie quotidienne — l’heure, dates, prix, directions, café",
  note:
    "Exercices de communication pratique. Réponds en espagnol. Les réponses sont des modèles usuels.",
  drills: [
    // HEURE
    { id: DID(), prompt: "Il est 1h (quelle heure ?) →", answer: "Es la una." },
    { id: DID(), prompt: "Il est 3h15 →", answer: "Son las tres y cuarto." },
    { id: DID(), prompt: "Il est 7h30 →", answer: "Son las siete y media." },
    { id: DID(), prompt: "Il est 9h45 →", answer: "Son las diez menos cuarto." },
    { id: DID(), prompt: "À quelle heure ouvre-t-il ? (modèle) →", answer: "¿A qué hora abre?" },

    // DATES
    { id: DID(), prompt: "Nous sommes le 5 mai →", answer: "Es el cinco de mayo." },
    { id: DID(), prompt: "Mon anniversaire est le 12 août →", answer: "Mi cumpleaños es el doce de agosto." },
    { id: DID(), prompt: "Aujourd’hui c’est lundi →", answer: "Hoy es lunes." },
    { id: DID(), prompt: "Demain c’est mercredi →", answer: "Mañana es miércoles." },

    // PRIX & ACHATS
    { id: DID(), prompt: "Combien ça coûte ? →", answer: "¿Cuánto cuesta?" },
    { id: DID(), prompt: "C’est 7,50 € →", answer: "Cuesta siete con cincuenta." },
    { id: DID(), prompt: "Je voudrais payer en carte →", answer: "Quisiera pagar con tarjeta." },
    { id: DID(), prompt: "Avez-vous un reçu ? →", answer: "¿Tiene recibo?" },

    // CAFÉ/RESTAURANT
    { id: DID(), prompt: "Un café au lait, s’il vous plaît →", answer: "Un café con leche, por favor." },
    { id: DID(), prompt: "L’addition, s’il vous plaît →", answer: "La cuenta, por favor." },
    { id: DID(), prompt: "De l’eau plate / gazeuse →", answer: "Agua sin gas / con gas." },
    { id: DID(), prompt: "Sans sucre, merci →", answer: "Sin azúcar, gracias." },

    // DIRECTIONS
    { id: DID(), prompt: "Où est le métro ? →", answer: "¿Dónde está el metro?" },
    { id: DID(), prompt: "Tournez à droite →", answer: "Gire a la derecha." },
    { id: DID(), prompt: "Toujours tout droit →", answer: "Siga todo recto." },
    { id: DID(), prompt: "C’est loin ? →", answer: "¿Está lejos?" },
    { id: DID(), prompt: "J’ai besoin d’un taxi →", answer: "Necesito un taxi." },

    // HÔTEL & VOYAGE
    { id: DID(), prompt: "J’ai une réservation au nom de… →", answer: "Tengo una reserva a nombre de…" },
    { id: DID(), prompt: "À quelle heure est le check-out ? →", answer: "¿A qué hora es el check-out?" },
    { id: DID(), prompt: "Où est la gare routière ? →", answer: "¿Dónde está la estación de autobuses?" },

    // PETITES URGENCES
    { id: DID(), prompt: "Aidez-moi, s’il vous plaît →", answer: "Ayúdeme, por favor." },
    { id: DID(), prompt: "J’ai perdu mon portefeuille →", answer: "Perdí mi cartera." },
    { id: DID(), prompt: "J’ai besoin d’un médecin →", answer: "Necesito un médico." },
  ],
};
/* ------------------------------------------------------- */
/* A1 — GENRE : Masculin et Féminin                        */
/* ------------------------------------------------------- */

export const genero_sustantivos: GrammarPoint = {
  id: "genero_sustantivos",
  level: "A1",
  title: "Le genre des noms — masculin et féminin",
  note: `
📚 LE GENRE DES NOMS EN ESPAGNOL

En espagnol, TOUS les noms ont un genre : masculin ou féminin.

🔵 MASCULIN (EL)
Généralement terminés par :
• -O : el libro, el gato, el vino, el museo
• -OR : el profesor, el doctor, el amor
• -AJE : el viaje, el garaje, el mensaje
• Jours/mois : el lunes, el enero
• Fleuves/mers : el Sena, el Mediterráneo
• Nombres/lettres : el tres, el A

🔴 FÉMININ (LA)
Généralement terminés par :
• -A : la casa, la mesa, la playa, la comida
• -CIÓN/-SIÓN : la canción, la televisión
• -DAD/-TAD : la ciudad, la libertad
• -EZ : la vez, la nuez
• -TRIZ : la actriz, la directriz

⚠️ EXCEPTIONS IMPORTANTES :
• el día (jour) - masculin !
• el mapa (carte) - masculin !
• el problema - masculin !
• el sistema - masculin !
• el planeta - masculin !
• el idioma (langue) - masculin !
• el programa - masculin !

• la mano (main) - féminin !
• la foto (photo) - féminin !
• la moto - féminin !
• la radio - féminin !

💡 CHANGEMENTS DE GENRE :
• el profesor → la profesora
• el alumno → la alumna
• el gato → la gata
• el doctor → la doctora
• el niño → la niña
  `,
  drills: [
    // TERMINAISON -O (masculin)
    { id: DID(), prompt: "livre → ___ libro (el ou la ?)", answer: "el" },
    { id: DID(), prompt: "chat → ___ gato", answer: "el" },
    { id: DID(), prompt: "vin → ___ vino", answer: "el" },
    { id: DID(), prompt: "musée → ___ museo", answer: "el" },
    { id: DID(), prompt: "garçon → ___ niño", answer: "el" },
    { id: DID(), prompt: "appartement → ___ piso", answer: "el" },
    { id: DID(), prompt: "ami → ___ amigo", answer: "el" },

    // TERMINAISON -A (féminin)
    { id: DID(), prompt: "maison → ___ casa (el ou la ?)", answer: "la" },
    { id: DID(), prompt: "table → ___ mesa", answer: "la" },
    { id: DID(), prompt: "plage → ___ playa", answer: "la" },
    { id: DID(), prompt: "nourriture → ___ comida", answer: "la" },
    { id: DID(), prompt: "fille → ___ niña", answer: "la" },
    { id: DID(), prompt: "amie → ___ amiga", answer: "la" },
    { id: DID(), prompt: "fenêtre → ___ ventana", answer: "la" },

    // TERMINAISON -OR (masculin)
    { id: DID(), prompt: "professeur → ___ profesor", answer: "el" },
    { id: DID(), prompt: "docteur → ___ doctor", answer: "el" },
    { id: DID(), prompt: "amour → ___ amor", answer: "el" },
    { id: DID(), prompt: "couleur → ___ color", answer: "el" },

    // TERMINAISON -CIÓN/-SIÓN (féminin)
    { id: DID(), prompt: "chanson → ___ canción", answer: "la" },
    { id: DID(), prompt: "télévision → ___ televisión", answer: "la" },
    { id: DID(), prompt: "station → ___ estación", answer: "la" },
    { id: DID(), prompt: "situation → ___ situación", answer: "la" },
    { id: DID(), prompt: "passion → ___ pasión", answer: "la" },

    // TERMINAISON -DAD (féminin)
    { id: DID(), prompt: "ville → ___ ciudad", answer: "la" },
    { id: DID(), prompt: "liberté → ___ libertad", answer: "la" },
    { id: DID(), prompt: "université → ___ universidad", answer: "la" },
    { id: DID(), prompt: "qualité → ___ calidad", answer: "la" },

    // EXCEPTIONS MASCULINES en -A
    { id: DID(), prompt: "jour → ___ día (EXCEPTION !)", answer: "el" },
    { id: DID(), prompt: "carte → ___ mapa (EXCEPTION !)", answer: "el" },
    { id: DID(), prompt: "problème → ___ problema (EXCEPTION !)", answer: "el" },
    { id: DID(), prompt: "système → ___ sistema (EXCEPTION !)", answer: "el" },
    { id: DID(), prompt: "planète → ___ planeta (EXCEPTION !)", answer: "el" },
    { id: DID(), prompt: "langue/idiome → ___ idioma (EXCEPTION !)", answer: "el" },
    { id: DID(), prompt: "programme → ___ programa (EXCEPTION !)", answer: "el" },

    // EXCEPTIONS FÉMININES en -O
    { id: DID(), prompt: "main → ___ mano (EXCEPTION !)", answer: "la" },
    { id: DID(), prompt: "photo → ___ foto (EXCEPTION !)", answer: "la" },
    { id: DID(), prompt: "moto → ___ moto (EXCEPTION !)", answer: "la" },
    { id: DID(), prompt: "radio → ___ radio (EXCEPTION !)", answer: "la" },

    // PAIRES MASCULIN/FÉMININ
    { id: DID(), prompt: "le professeur (homme) → ___ profesor", answer: "el" },
    { id: DID(), prompt: "la professeure (femme) → ___ profesora", answer: "la" },
    { id: DID(), prompt: "l'élève (garçon) → ___ alumno", answer: "el" },
    { id: DID(), prompt: "l'élève (fille) → ___ alumna", answer: "la" },
    { id: DID(), prompt: "le chat (mâle) → ___ gato", answer: "el" },
    { id: DID(), prompt: "la chatte → ___ gata", answer: "la" },
  ],
};

/* ------------------------------------------------------- */
/* A1 — ARTICLES DÉFINIS : el, la, los, las                */
/* ------------------------------------------------------- */

export const articulos_definidos: GrammarPoint = {
  id: "articulos_definidos",
  level: "A1",
  title: "Articles définis — el, la, los, las (le, la, les)",
  note: `
📚 LES ARTICLES DÉFINIS EN ESPAGNOL

Les articles définis désignent quelque chose de PRÉCIS, de CONNU.

┌────────────────────────────────────────┐
│          │ MASCULIN  │ FÉMININ        │
├────────────────────────────────────────┤
│ SINGULIER│ EL        │ LA             │
│          │ el libro  │ la casa        │
├────────────────────────────────────────┤
│ PLURIEL  │ LOS       │ LAS            │
│          │ los libros│ las casas      │
└────────────────────────────────────────┘

🔹 UTILISATION :
• Choses spécifiques : El libro que compré (le livre que j'ai acheté)
• Généralisations : El agua es importante (l'eau est importante)
• Parties du corps : Me duele la cabeza (j'ai mal à la tête)
• Jours de la semaine : El lunes voy al cine (lundi je vais au cinéma)
• Langues après "hablar" : Hablo el español (je parle espagnol)

⚠️ CONTRACTION OBLIGATOIRE :
• a + el = AL : Voy al cine (Je vais au cinéma)
• de + el = DEL : Vengo del trabajo (Je viens du travail)

❌ PAS de contraction avec la/los/las :
• a la, de la, a los, de los, a las, de las
  `,
  drills: [
    // SINGULIER MASCULIN (EL)
    { id: DID(), prompt: "le livre → ___ libro", answer: "el" },
    { id: DID(), prompt: "le chat → ___ gato", answer: "el" },
    { id: DID(), prompt: "le chien → ___ perro", answer: "el" },
    { id: DID(), prompt: "le jour → ___ día", answer: "el" },
    { id: DID(), prompt: "le soleil → ___ sol", answer: "el" },
    { id: DID(), prompt: "le professeur → ___ profesor", answer: "el" },

    // SINGULIER FÉMININ (LA)
    { id: DID(), prompt: "la maison → ___ casa", answer: "la" },
    { id: DID(), prompt: "la table → ___ mesa", answer: "la" },
    { id: DID(), prompt: "la fille → ___ niña", answer: "la" },
    { id: DID(), prompt: "la lune → ___ luna", answer: "la" },
    { id: DID(), prompt: "la main → ___ mano", answer: "la" },
    { id: DID(), prompt: "la ville → ___ ciudad", answer: "la" },

    // PLURIEL MASCULIN (LOS)
    { id: DID(), prompt: "les livres → ___ libros", answer: "los" },
    { id: DID(), prompt: "les chats → ___ gatos", answer: "los" },
    { id: DID(), prompt: "les chiens → ___ perros", answer: "los" },
    { id: DID(), prompt: "les jours → ___ días", answer: "los" },
    { id: DID(), prompt: "les professeurs → ___ profesores", answer: "los" },

    // PLURIEL FÉMININ (LAS)
    { id: DID(), prompt: "les maisons → ___ casas", answer: "las" },
    { id: DID(), prompt: "les tables → ___ mesas", answer: "las" },
    { id: DID(), prompt: "les filles → ___ niñas", answer: "las" },
    { id: DID(), prompt: "les mains → ___ manos", answer: "las" },
    { id: DID(), prompt: "les villes → ___ ciudades", answer: "las" },

    // CONTRACTION A + EL = AL
    { id: DID(), prompt: "Je vais au cinéma → Voy ___ cine (a + el = ?)", answer: "al" },
    { id: DID(), prompt: "Je vais au parc → Voy ___ parque (a + el = ?)", answer: "al" },
    { id: DID(), prompt: "Je vais au marché → Voy ___ mercado (a + el = ?)", answer: "al" },
    
    // CONTRACTION DE + EL = DEL
    { id: DID(), prompt: "Je viens du travail → Vengo ___ trabajo (de + el = ?)", answer: "del" },
    { id: DID(), prompt: "Le livre du professeur → El libro ___ profesor (de + el = ?)", answer: "del" },
    { id: DID(), prompt: "La porte du bureau → La puerta ___ despacho (de + el = ?)", answer: "del" },

    // PAS DE CONTRACTION avec LA/LOS/LAS
    { id: DID(), prompt: "Je vais à la plage → Voy ___ playa (a + la, pas de contraction)", answer: "a la" },
    { id: DID(), prompt: "Je viens de la maison → Vengo ___ casa (de + la)", answer: "de la" },
    { id: DID(), prompt: "Je vais aux magasins → Voy ___ tiendas (a + las)", answer: "a las" },

    // PHRASES AVEC ARTICLES
    { id: DID(), prompt: "L'eau est importante → ___ agua es importante", answer: "el" },
    { id: DID(), prompt: "J'aime le café → Me gusta ___ café", answer: "el" },
    { id: DID(), prompt: "Les enfants jouent → ___ niños juegan", answer: "los" },
    { id: DID(), prompt: "Les fleurs sont belles → ___ flores son bonitas", answer: "las" },
  ],
};

/* ------------------------------------------------------- */
/* A1 — ARTICLES INDÉFINIS : un, una, unos, unas           */
/* ------------------------------------------------------- */

export const articulos_indefinidos: GrammarPoint = {
  id: "articulos_indefinidos",
  level: "A1",
  title: "Articles indéfinis — un, una, unos, unas (un, une, des)",
  note: `
📚 LES ARTICLES INDÉFINIS EN ESPAGNOL

Les articles indéfinis désignent quelque chose de NON-SPÉCIFIQUE, d'INDÉTERMINÉ.

┌────────────────────────────────────────┐
│          │ MASCULIN  │ FÉMININ        │
├────────────────────────────────────────┤
│ SINGULIER│ UN        │ UNA            │
│          │ un libro  │ una casa       │
├────────────────────────────────────────┤
│ PLURIEL  │ UNOS      │ UNAS           │
│          │ unos libros│unas casas     │
│          │ (quelques)│ (quelques)     │
└────────────────────────────────────────┘

🔹 UTILISATION :
• Un objet parmi d'autres : Tengo un libro (j'ai un livre)
• Première mention : Veo una casa (je vois une maison)
• Approximation au pluriel : Unos diez años (environ dix ans)

🔸 DIFFÉRENCE UN vs UNO :
• UN + nom : un libro, un día
• UNO seul (sans nom) : Tengo uno (j'en ai un)

⚠️ OMISSION de l'article :
En espagnol, on OMET l'article indéfini après SER + profession/nationalité :
✅ Soy profesor (Je suis professeur) - PAS "un profesor"
✅ Es médico (Il est médecin) - PAS "un médico"
✅ Somos estudiantes (Nous sommes étudiants)

MAIS si qualifié :
✅ Es un buen profesor (C'est un bon professeur)
  `,
  drills: [
    // SINGULIER MASCULIN (UN)
    { id: DID(), prompt: "un livre → ___ libro", answer: "un" },
    { id: DID(), prompt: "un chat → ___ gato", answer: "un" },
    { id: DID(), prompt: "un chien → ___ perro", answer: "un" },
    { id: DID(), prompt: "un ami → ___ amigo", answer: "un" },
    { id: DID(), prompt: "un jour → ___ día", answer: "un" },
    { id: DID(), prompt: "un problème → ___ problema", answer: "un" },

    // SINGULIER FÉMININ (UNA)
    { id: DID(), prompt: "une maison → ___ casa", answer: "una" },
    { id: DID(), prompt: "une table → ___ mesa", answer: "una" },
    { id: DID(), prompt: "une fille → ___ niña", answer: "una" },
    { id: DID(), prompt: "une amie → ___ amiga", answer: "una" },
    { id: DID(), prompt: "une main → ___ mano", answer: "una" },
    { id: DID(), prompt: "une ville → ___ ciudad", answer: "una" },

    // PLURIEL MASCULIN (UNOS)
    { id: DID(), prompt: "quelques livres → ___ libros", answer: "unos" },
    { id: DID(), prompt: "quelques chats → ___ gatos", answer: "unos" },
    { id: DID(), prompt: "quelques amis → ___ amigos", answer: "unos" },
    { id: DID(), prompt: "environ dix jours → ___ diez días", answer: "unos" },

    // PLURIEL FÉMININ (UNAS)
    { id: DID(), prompt: "quelques maisons → ___ casas", answer: "unas" },
    { id: DID(), prompt: "quelques tables → ___ mesas", answer: "unas" },
    { id: DID(), prompt: "quelques filles → ___ niñas", answer: "unas" },
    { id: DID(), prompt: "environ cinq heures → ___ cinco horas", answer: "unas" },

    // UN vs UNO
    { id: DID(), prompt: "un livre → ___ libro (avec nom)", answer: "un" },
    { id: DID(), prompt: "J'en ai un → Tengo ___ (sans nom)", answer: "uno" },
    { id: DID(), prompt: "un jour → ___ día (avec nom)", answer: "un" },

    // OMISSION après SER
    { id: DID(), prompt: "Je suis professeur → Soy ___ (profession, pas d'article !)", answer: "profesor" },
    { id: DID(), prompt: "Il est médecin → Es ___ (pas d'article !)", answer: "médico" },
    { id: DID(), prompt: "Elle est étudiante → Es ___ (pas d'article !)", answer: "estudiante" },
    { id: DID(), prompt: "Nous sommes ingénieurs → Somos ___ (pas d'article !)", answer: "ingenieros" },

    // MAIS avec adjectif
    { id: DID(), prompt: "C'est un bon professeur → Es ___ buen profesor (avec adjectif)", answer: "un" },
    { id: DID(), prompt: "C'est une bonne amie → Es ___ buena amiga", answer: "una" },

    // PHRASES COMPLÈTES
    { id: DID(), prompt: "J'ai un chien → Tengo ___ perro", answer: "un" },
    { id: DID(), prompt: "Je veux une voiture → Quiero ___ coche", answer: "un" },
    { id: DID(), prompt: "Il y a des livres → Hay ___ libros", answer: "unos" },
    { id: DID(), prompt: "Je vois des filles → Veo ___ niñas", answer: "unas" },
  ],
};

/* ------------------------------------------------------- */
/* A1 — ACCORD DES ADJECTIFS                               */
/* ------------------------------------------------------- */

export const acuerdo_adjetivos: GrammarPoint = {
  id: "acuerdo_adjetivos",
  level: "A1",
  title: "Accord des adjectifs — masculin/féminin, singulier/pluriel",
  note: `
📚 L'ACCORD DES ADJECTIFS EN ESPAGNOL

Les adjectifs s'accordent TOUJOURS en genre (M/F) et en nombre (S/P) avec le nom.

┌──────────────────────────────────────────────────────┐
│ ADJECTIFS en -O/-A (majorité)                        │
├──────────────────────────────────────────────────────┤
│ Masculin singulier  │ -O   │ el gato blanco         │
│ Féminin singulier   │ -A   │ la casa blanca         │
│ Masculin pluriel    │ -OS  │ los gatos blancos      │
│ Féminin pluriel     │ -AS  │ las casas blancas      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ ADJECTIFS en -E (invariables au genre)               │
├──────────────────────────────────────────────────────┤
│ Masculin/Féminin S  │ -E   │ el/la estudiante grande│
│ Masculin/Féminin P  │ -ES  │ los/las estudiantes    │
│                     │      │ grandes                │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ ADJECTIFS en CONSONNE (nationalités, etc.)           │
├──────────────────────────────────────────────────────┤
│ Masculin singulier  │ -    │ el chico español       │
│ Féminin singulier   │ +A   │ la chica española      │
│ Masculin pluriel    │ +ES  │ los chicos españoles   │
│ Féminin pluriel     │ +AS  │ las chicas españolas   │
└──────────────────────────────────────────────────────┘

🔹 EXEMPLES COURANTS :
• bonito/a (joli/e) : un perro bonito, una casa bonita
• alto/a (grand/e) : un chico alto, una chica alta
• pequeño/a (petit/e) : un gato pequeño, una mesa pequeña
• grande (grand/e) : un libro grande, una casa grande
• inteligente : un niño inteligente, una niña inteligente
• feliz (heureux/se) : un día feliz, una mujer feliz

⚠️ POSITION :
En général, l'adjectif se place APRÈS le nom :
• Un libro interesante (un livre intéressant)
• Una casa grande (une grande maison)

Exceptions (avant le nom) :
• bueno/a (bon/ne) → buen (devant nom masc. sing.)
• malo/a (mauvais/e) → mal (devant nom masc. sing.)
• Un buen libro (un bon livre)
• Un mal día (un mauvais jour)
  `,
  drills: [
    // ADJECTIFS EN -O/-A (accord de base)
    { id: DID(), prompt: "un chat blanc → un gato ___ (blanco/blanca)", answer: "blanco" },
    { id: DID(), prompt: "une maison blanche → una casa ___ (blanco/blanca)", answer: "blanca" },
    { id: DID(), prompt: "des chats blancs → unos gatos ___ (blancos/blancas)", answer: "blancos" },
    { id: DID(), prompt: "des maisons blanches → unas casas ___ (blancos/blancas)", answer: "blancas" },

    { id: DID(), prompt: "un garçon petit → un niño ___ (pequeño/pequeña)", answer: "pequeño" },
    { id: DID(), prompt: "une fille petite → una niña ___ (pequeño/pequeña)", answer: "pequeña" },
    { id: DID(), prompt: "des garçons petits → unos niños ___ (pequeños/pequeñas)", answer: "pequeños" },
    { id: DID(), prompt: "des filles petites → unas niñas ___ (pequeños/pequeñas)", answer: "pequeñas" },

    { id: DID(), prompt: "un livre intéressant → un libro ___ (interesante)", answer: "interesante" },
    { id: DID(), prompt: "une maison intéressante → una casa ___ (interesante)", answer: "interesante" },
    { id: DID(), prompt: "des livres intéressants → unos libros ___ (interesantes)", answer: "interesantes" },

    // NATIONALITÉS
    { id: DID(), prompt: "un garçon espagnol → un chico ___ (español/española)", answer: "español" },
    { id: DID(), prompt: "une fille espagnole → una chica ___ (español/española)", answer: "española" },
    { id: DID(), prompt: "des garçons espagnols → unos chicos ___ (españoles/españolas)", answer: "españoles" },
    { id: DID(), prompt: "des filles espagnoles → unas chicas ___ (españoles/españolas)", answer: "españolas" },

    { id: DID(), prompt: "un homme français → un hombre ___ (francés/francesa)", answer: "francés" },
    { id: DID(), prompt: "une femme française → una mujer ___ (francés/francesa)", answer: "francesa" },

    // COULEURS
    { id: DID(), prompt: "un chat noir → un gato ___ (negro/negra)", answer: "negro" },
    { id: DID(), prompt: "une voiture noire → un coche ___ (negro/negra)", answer: "negro" },
    { id: DID(), prompt: "une maison rouge → una casa ___ (rojo/roja)", answer: "roja" },
    { id: DID(), prompt: "des fleurs rouges → unas flores ___ (rojos/rojas)", answer: "rojas" },

    // ADJECTIFS INVARIABLES EN GENRE (-E)
    { id: DID(), prompt: "un garçon intelligent → un niño ___ (inteligente)", answer: "inteligente" },
    { id: DID(), prompt: "une fille intelligente → una niña ___ (inteligente)", answer: "inteligente" },
    { id: DID(), prompt: "une grande maison → una casa ___ (grande)", answer: "grande" },
    { id: DID(), prompt: "un grand livre → un libro ___ (grande)", answer: "grande" },

    // ADJECTIFS SPÉCIAUX : BUENO/MALO
    { id: DID(), prompt: "un bon livre → un ___ libro (buen/bueno)", answer: "buen" },
    { id: DID(), prompt: "un livre bon → un libro ___ (buen/bueno)", answer: "bueno" },
    { id: DID(), prompt: "une bonne maison → una ___ casa (buena)", answer: "buena" },
    { id: DID(), prompt: "un mauvais jour → un ___ día (mal/malo)", answer: "mal" },

    // PHRASES COMPLÈTES
    { id: DID(), prompt: "J'ai un chat noir → Tengo un gato ___ (negro/negra)", answer: "negro" },
    { id: DID(), prompt: "J'aime la maison blanche → Me gusta la casa ___ (blanco/blanca)", answer: "blanca" },
    { id: DID(), prompt: "Les filles sont grandes → Las niñas son ___ (grandes)", answer: "grandes" },
    { id: DID(), prompt: "C'est une femme intelligente → Es una mujer ___ (inteligente)", answer: "inteligente" },
  ],
};

// Ajoute ces nouveaux points de grammaire à l'export principal
export const grammarPoints: GrammarPoint[] = [
  // ... (garde tous les points existants)
  
  // NOUVEAUX : Genre et articles
  genero_sustantivos,
  articulos_definidos,
  articulos_indefinidos,
  acuerdo_adjetivos,
];
/* ------------------------------------------------------- */
/* A1 — PRÉPOSITION "DE" : possession, origine, matière    */
/* ------------------------------------------------------- */

export const preposicion_de: GrammarPoint = {
  id: "preposicion_de",
  level: "A1",
  title: "La préposition DE — possession, origine, matière",
  note: `
📚 RÉCAPITULATIF DE LA PRÉPOSITION "DE"

1️⃣ POSSESSION (de qui ?)
   • de + NOM PROPRE (sans article) : El libro de María (le livre de María)
   • de + ARTICLE + NOM : El libro del profesor (le livre du professeur)
   
   ⚠️ CONTRACTION OBLIGATOIRE : de + el = del
   ✅ El coche del médico (la voiture du médecin)
   ❌ El coche de el médico (FAUX!)
   
   Mais : de + la / de + los / de + las (PAS de contraction)
   ✅ La casa de la profesora
   ✅ Los juguetes de los niños

2️⃣ ORIGINE (d'où ?)
   • Ser + de + LIEU : Soy de Francia (Je suis de France)
   • Venir + de + LIEU : Vengo de Madrid (Je viens de Madrid)
   
   Exemples :
   • Soy de México (pays sans article)
   • El vino es de España
   • Somos de la ciudad de París (avec article si précisé)

3️⃣ MATIÈRE (en quoi c'est fait ?)
   • de + MATÉRIAU : Una mesa de madera (une table en bois)
   
   Exemples :
   • Un anillo de oro (une bague en or)
   • Una botella de vidrio (une bouteille en verre)
   • Zapatos de cuero (chaussures en cuir)

4️⃣ EXPRESSIONS COURANTES
   • Un vaso de agua (un verre d'eau)
   • Una taza de café (une tasse de café)
   • El profesor de español (le professeur d'espagnol)
   • La puerta del dormitorio (la porte de la chambre)

🎯 RÈGLE D'OR : de + el = del (TOUJOURS!)
  `,
  drills: [
    // POSSESSION - avec contraction del
    { id: DID(), prompt: "Le livre du professeur → El libro ___ profesor (de + el = ?)", answer: "del" },
    { id: DID(), prompt: "Les clés du directeur → Las llaves ___ director (de + el = ?)", answer: "del" },
    { id: DID(), prompt: "La voiture de la voisine → El coche ___ vecina (de + la)", answer: "de la" },
    { id: DID(), prompt: "Le chien des enfants → El perro ___ niños (de + los)", answer: "de los" },
    { id: DID(), prompt: "La maison des parents → La casa ___ padres (de + los)", answer: "de los" },
    { id: DID(), prompt: "Les jouets de l'enfant → Los juguetes ___ niño (de + el = ?)", answer: "del" },
    
    // POSSESSION - sans article (noms propres)
    { id: DID(), prompt: "Le livre de María → El libro ___ María (nom propre)", answer: "de" },
    { id: DID(), prompt: "Le chien de Juan → El perro ___ Juan", answer: "de" },
    { id: DID(), prompt: "La voiture de Pedro → El coche ___ Pedro", answer: "de" },

    // ORIGINE
    { id: DID(), prompt: "Je suis de France → Soy ___ Francia", answer: "de" },
    { id: DID(), prompt: "Elle est de Madrid → Es ___ Madrid", answer: "de" },
    { id: DID(), prompt: "Ils sont du Mexique → Son ___ México", answer: "de" },
    { id: DID(), prompt: "Ce vin est d'Espagne → Este vino es ___ España", answer: "de" },

    // MATIÈRE
    { id: DID(), prompt: "Une table en bois → Una mesa ___ madera", answer: "de" },
    { id: DID(), prompt: "Un bracelet en or → Un brazalete ___ oro", answer: "de" },
    { id: DID(), prompt: "Une bouteille en verre → Una botella ___ vidrio", answer: "de" },
    { id: DID(), prompt: "Des chaussures en cuir → Zapatos ___ cuero", answer: "de" },

    // CONTRACTION OBLIGATOIRE DE + EL = DEL
    { id: DID(), prompt: "Le centre de la ville → El centro ___ ciudad (de + la)", answer: "de la" },
    { id: DID(), prompt: "Le début du film → El comienzo ___ película (de + la)", answer: "de la" },
    { id: DID(), prompt: "La fin du livre → El final ___ libro (de + el = ?)", answer: "del" },
    { id: DID(), prompt: "L'ami du garçon → El amigo ___ chico (de + el = ?)", answer: "del" },
    { id: DID(), prompt: "Le toit de la maison → El techo ___ casa (de + la)", answer: "de la" },
    { id: DID(), prompt: "La porte du bureau → La puerta ___ despacho (de + el = ?)", answer: "del" },
    { id: DID(), prompt: "Le propriétaire de l'appartement → El dueño ___ apartamento (de + el = ?)", answer: "del" },

    // EXPRESSIONS COURANTES
    { id: DID(), prompt: "Un verre d'eau → Un vaso ___ agua", answer: "de" },
    { id: DID(), prompt: "Un cours d'espagnol → Una clase ___ español", answer: "de" },
    { id: DID(), prompt: "Le professeur de maths → El profesor ___ matemáticas", answer: "de" },
    { id: DID(), prompt: "La porte de la chambre → La puerta ___ dormitorio (de + el = ?)", answer: "del" },
    { id: DID(), prompt: "Un morceau de pain → Un trozo ___ pan", answer: "de" },
    { id: DID(), prompt: "La couleur du ciel → El color ___ cielo (de + el = ?)", answer: "del" },
  ],
};

/* ------------------------------------------------------- */
/* A1-A2 — DÉMONSTRATIFS : este/ese/aquel                  */
/* ------------------------------------------------------- */

export const demostrativos: GrammarPoint = {
  id: "demostrativos",
  level: "A1",
  title: "Démonstratifs — este/ese/aquel (ce, cet, cette)",
  note: `
📚 RÉCAPITULATIF DES DÉMONSTRATIFS ESPAGNOLS

Les démonstratifs indiquent la DISTANCE entre celui qui parle et l'objet.

┌─────────────────────────────────────────────────────────────┐
│ DISTANCE │ MASCULIN  │ FÉMININ   │ MASCULIN  │ FÉMININ     │
│          │ SINGULIER │ SINGULIER │ PLURIEL   │ PLURIEL     │
├─────────────────────────────────────────────────────────────┤
│ PRÈS     │ este      │ esta      │ estos     │ estas       │
│ (ici)    │ ce...ci   │ cette...ci│ ces...ci  │ ces...ci    │
├─────────────────────────────────────────────────────────────┤
│ MOYEN    │ ese       │ esa       │ esos      │ esas        │
│ (là)     │ ce...là   │ cette...là│ ces...là  │ ces...là    │
├─────────────────────────────────────────────────────────────┤
│ LOIN     │ aquel     │ aquella   │ aquellos  │ aquellas    │
│ (là-bas) │ ce...là-bas│cette...là│ces...là-bas│ces...là-bas│
└─────────────────────────────────────────────────────────────┘

🔹 ESTE (près de moi) 👋
   • Este libro (ce livre-ci que je tiens)
   • Esta casa (cette maison-ci où je suis)
   • Estos zapatos (ces chaussures-ci que je porte)
   • Estas llaves (ces clés-ci dans ma main)

🔸 ESE (distance moyenne) 👉
   • Ese coche (cette voiture-là près de toi)
   • Esa mesa (cette table-là à quelques mètres)
   • Esos niños (ces enfants-là que tu vois)
   • Esas flores (ces fleurs-là dans le jardin)

🔹 AQUEL (loin) 👈🏔️
   • Aquel edificio (ce bâtiment là-bas)
   • Aquella montaña (cette montagne au loin)
   • Aquellos días (ces jours-là, dans le passé)
   • Aquellas nubes (ces nuages là-bas à l'horizon)

⚠️ ACCORD OBLIGATOIRE avec le nom :
   ✅ Este libro (masculin singulier)
   ✅ Esta mesa (féminin singulier)
   ✅ Estos libros (masculin pluriel)
   ✅ Estas mesas (féminin pluriel)

💡 ASTUCE : 
   • ESTE = près de moi (je peux le toucher)
   • ESE = près de toi (tu peux le toucher)
   • AQUEL = loin de nous deux (personne ne peut le toucher)
  `,
  drills: [
    // ESTE (près, masculin singulier)
    { id: DID(), prompt: "Ce livre (près) → ___ libro", answer: "este" },
    { id: DID(), prompt: "Ce garçon (près) → ___ chico", answer: "este" },
    { id: DID(), prompt: "Ce café (près) → ___ café", answer: "este" },
    { id: DID(), prompt: "Ce pain (près, el pan) → ___ pan", answer: "este" },

    // ESTA (près, féminin singulier)
    { id: DID(), prompt: "Cette maison (près) → ___ casa", answer: "esta" },
    { id: DID(), prompt: "Cette table (près) → ___ mesa", answer: "esta" },
    { id: DID(), prompt: "Cette pomme (près, la manzana) → ___ manzana", answer: "esta" },
    { id: DID(), prompt: "Cette voiture (près, el coche) → ___ coche", answer: "este" },

    // ESTOS (près, masculin pluriel)
    { id: DID(), prompt: "Ces livres (près) → ___ libros", answer: "estos" },
    { id: DID(), prompt: "Ces garçons (près) → ___ chicos", answer: "estos" },

    // ESTAS (près, féminin pluriel)
    { id: DID(), prompt: "Ces maisons (près) → ___ casas", answer: "estas" },
    { id: DID(), prompt: "Ces tables (près) → ___ mesas", answer: "estas" },

    // ESE (distance moyenne, masculin singulier)
    { id: DID(), prompt: "Ce livre (là, moyen) → ___ libro", answer: "ese" },
    { id: DID(), prompt: "Ce garçon (là) → ___ chico", answer: "ese" },
    { id: DID(), prompt: "Ce parc (là, el parque) → ___ parque", answer: "ese" },

    // ESA (distance moyenne, féminin singulier)
    { id: DID(), prompt: "Cette maison (là) → ___ casa", answer: "esa" },
    { id: DID(), prompt: "Cette fleur (là, la flor) → ___ flor", answer: "esa" },
    { id: DID(), prompt: "Cette rue (là, la calle) → ___ calle", answer: "esa" },

    // ESOS/ESAS (distance moyenne, pluriel)
    { id: DID(), prompt: "Ces livres (là) → ___ libros", answer: "esos" },
    { id: DID(), prompt: "Ces maisons (là) → ___ casas", answer: "esas" },

    // AQUEL (loin, masculin singulier)
    { id: DID(), prompt: "Ce bâtiment (là-bas, loin) → ___ edificio", answer: "aquel" },
    { id: DID(), prompt: "Ce jour (là, loin dans le temps) → ___ día", answer: "aquel" },

    // AQUELLA (loin, féminin singulier)
    { id: DID(), prompt: "Cette montagne (là-bas) → ___ montaña", answer: "aquella" },
    { id: DID(), prompt: "Cette époque (là) → ___ época", answer: "aquella" },

    // AQUELLOS/AQUELLAS (loin, pluriel)
    { id: DID(), prompt: "Ces arbres (là-bas, los árboles) → ___ árboles", answer: "aquellos" },
    { id: DID(), prompt: "Ces années (là, los años) → ___ años", answer: "aquellos" },

    // PHRASES COMPLÈTES
    { id: DID(), prompt: "Je veux ce pain (près, el pan) → Quiero ___ pan", answer: "este" },
    { id: DID(), prompt: "J'aime cette robe (près, el vestido) → Me gusta ___ vestido", answer: "este" },
    { id: DID(), prompt: "Ces chaussures (là) sont belles (los zapatos) → ___ zapatos son bonitos", answer: "esos" },
    { id: DID(), prompt: "Cette montagne (là-bas) est haute → ___ montaña es alta", answer: "aquella" },
    { id: DID(), prompt: "Ces livres (près) sont intéressants → ___ libros son interesantes", answer: "estos" },
  ],
};

/* --------------------- */
/* EXPORT PRINCIPAL      */
/* --------------------- */

export const grammarPoints: GrammarPoint[] = [
  // Présent
  presente_regulares,
  presente_irregulares,

  // Passé simple
  preterito_indefinido_regulares,
  preterito_indefinido_irregulares,

  // Imparfait
  imperfecto,

  // Futur
  futuro_simple_regulares,
  futuro_simple_irregulares,

  // Pratique quotidienne
  cotidiano_basics,
];
