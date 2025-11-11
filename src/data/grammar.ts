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
