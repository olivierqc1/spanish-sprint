// src/data/lectures.ts
// Textes courts de lecture (català A2→B2) avec glossaire mot->traduction FR.
// Les clés du glossaire sont en minuscules ; l'app normalise accents/ponctuation.

export type Lectura = {
  id: string;
  title: string;
  level: string;
  theme: string;
  paragraphs: string[];
  glossary: Record<string, string>;
  summaryPrompt: string;
};

export const lectures: Lectura[] = [
  {
    "id": "barcino",
    "title": "Barcino, la ciutat romana",
    "level": "A2-B1",
    "theme": "🏛️ Història",
    "paragraphs": [
      "Fa més de dos mil anys, els romans van fundar una petita ciutat a la costa catalana. Es deia Barcino i tenia unes muralles per protegir els habitants.",
      "Dins de les muralles hi havia un fòrum, uns temples i cases de pedra. Els carrers formaven una quadrícula molt ordenada, com era típic de les ciutats romanes.",
      "Encara avui, al barri Gòtic de Barcelona, es poden veure restes d'aquelles muralles i columnes antigues. Molts turistes hi passen pel costat sense saber que trepitgen dos mil anys d'història.",
      "Barcino va créixer a poc a poc i, amb els segles, es va convertir en la gran ciutat que coneixem: Barcelona."
    ],
    "glossary": {
      "fundar": "fonder",
      "costa": "côte",
      "muralles": "remparts",
      "protegir": "protéger",
      "habitants": "habitants",
      "forum": "forum",
      "temples": "temples",
      "pedra": "pierre",
      "carrers": "rues",
      "quadricula": "grille, quadrillage",
      "ordenada": "ordonnée",
      "restes": "vestiges",
      "antigues": "anciennes",
      "costat": "côté",
      "trepitgen": "ils foulent, piétinent",
      "creixer": "grandir",
      "segles": "siècles",
      "coneixem": "nous connaissons"
    },
    "summaryPrompt": "Resumeix el text en 3 frases: qui va fundar Barcino, com era, i què en queda avui."
  },
  {
    "id": "trail",
    "title": "Córrer per la muntanya",
    "level": "A2-B1",
    "theme": "🏃 Esport",
    "paragraphs": [
      "El trail running és una manera de córrer per la muntanya, lluny de l'asfalt de la ciutat. A Catalunya i als Pirineus hi ha molts camins ideals per a aquest esport.",
      "Els corredors pugen i baixen per senders estrets, entre boscos, roques i rius. No és fàcil: cal força a les cames, però també cap i paciència.",
      "Moltes curses duren hores i els participants han de menjar i beure mentre corren. Quan arribes al cim, però, la vista ho val tot.",
      "Molts diuen que córrer per la natura és una manera de descansar la ment mentre canses el cos."
    ],
    "glossary": {
      "correr": "courir",
      "muntanya": "montagne",
      "lluny": "loin",
      "camins": "chemins",
      "corredors": "coureurs",
      "pugen": "ils montent",
      "baixen": "ils descendent",
      "senders": "sentiers",
      "estrets": "étroits",
      "boscos": "forêts",
      "roques": "rochers",
      "cames": "jambes",
      "cap": "tête",
      "paciencia": "patience",
      "curses": "courses",
      "duren": "durent",
      "cim": "sommet",
      "vista": "vue",
      "descansar": "reposer",
      "ment": "esprit",
      "canses": "tu fatigues",
      "cos": "corps"
    },
    "summaryPrompt": "Explica en 3 frases per què t'agrada (o no) córrer per la muntanya."
  },
  {
    "id": "vi",
    "title": "El vi català",
    "level": "A2-B1",
    "theme": "🍷 Cultura",
    "paragraphs": [
      "Catalunya té una llarga tradició de fer vi. Des de fa segles, els pagesos cultiven vinyes a comarques com el Priorat, el Penedès o l'Empordà.",
      "Cada zona té un clima i una terra diferents, i això dona vins amb gustos molt variats. Al Penedès, per exemple, es fa el cava, un vi escumós famós arreu del món.",
      "Al Priorat, en canvi, la terra és pobra i pedregosa, i produeix vins negres forts i intensos.",
      "Fer bon vi demana temps i paciència: primer cal collir el raïm, després deixar-lo fermentar i, finalment, esperar mesos o anys abans de beure'l."
    ],
    "glossary": {
      "tradicio": "tradition",
      "pagesos": "paysans, agriculteurs",
      "cultiven": "ils cultivent",
      "vinyes": "vignes",
      "comarques": "régions, comtés",
      "terra": "terre",
      "gustos": "goûts",
      "escumos": "pétillant",
      "arreu": "partout",
      "pobra": "pauvre",
      "pedregosa": "pierreuse",
      "forts": "forts",
      "collir": "récolter, cueillir",
      "raim": "raisin",
      "fermentar": "fermenter",
      "esperar": "attendre",
      "beure": "boire"
    },
    "summaryPrompt": "Compara dues zones de vi del text i digues quina t'agradaria visitar."
  },
  {
    "id": "catalunya_medieval",
    "title": "Catalunya a l'edat mitjana",
    "level": "A2-B1",
    "theme": "🏛️ Història",
    "paragraphs": [
      "A l'edat mitjana, Barcelona era la capital d'un comtat important. Els comtes de Barcelona van guanyar poder a poc a poc i van unir moltes terres sota el seu domini.",
      "Al segle XII, el comtat es va unir amb el regne d'Aragó i va néixer la Corona d'Aragó. Aquesta unió va fer créixer el poder de Catalunya al Mediterrani.",
      "El rei Jaume I, conegut com 'el Conqueridor', va prendre les illes de Mallorca i la ciutat de València als musulmans durant el segle XIII.",
      "Durant molts anys, els vaixells catalans van comerciar per tot el Mediterrani, i la llengua i la cultura catalanes es van estendre lluny de casa."
    ],
    "glossary": {
      "edat mitjana": "moyen âge",
      "comtat": "comté",
      "comtes": "comtes",
      "poder": "pouvoir",
      "unir": "unir",
      "terres": "terres",
      "domini": "domination",
      "regne": "royaume",
      "unio": "union",
      "creixer": "grandir",
      "rei": "roi",
      "conegut": "connu",
      "prendre": "prendre, conquérir",
      "illes": "îles",
      "musulmans": "musulmans",
      "vaixells": "navires",
      "comerciar": "commercer",
      "estendre": "s'étendre",
      "lluny": "loin"
    },
    "summaryPrompt": "Explica en 3 frases com Barcelona va guanyar poder a l'edat mitjana."
  },
  {
    "id": "catala_segle_xx",
    "title": "El català al segle XX",
    "level": "B1-B2",
    "theme": "🏛️ Història",
    "paragraphs": [
      "El segle XX va ser dur per a la llengua catalana. Durant la dictadura del general Franco (1939-1975), l'ús públic del català va quedar prohibit en molts àmbits: a l'escola, als mitjans de comunicació i a l'administració.",
      "Malgrat la repressió, molta gent va continuar parlant català a casa i el va mantenir viu. Escriptors i músics van fer un paper clau per conservar la llengua.",
      "Amb la fi de la dictadura i l'arribada de la democràcia, el català va recuperar l'estatus oficial. L'any 1983 es va aprovar una llei per normalitzar-ne l'ús.",
      "Avui, el català s'ensenya a les escoles i s'utilitza als mitjans, tot i que conviu de prop amb el castellà. La seva situació encara genera debat."
    ],
    "glossary": {
      "dur": "dur, difficile",
      "segle": "siècle",
      "dictadura": "dictature",
      "us": "usage",
      "prohibit": "interdit",
      "ambits": "domaines",
      "mitjans": "médias",
      "malgrat": "malgré",
      "repressio": "répression",
      "mantenir": "maintenir",
      "viu": "vivant",
      "escriptors": "écrivains",
      "paper": "rôle",
      "clau": "clé",
      "conservar": "conserver",
      "fi": "fin",
      "arribada": "arrivée",
      "recuperar": "récupérer",
      "estatus": "statut",
      "llei": "loi",
      "aprovar": "approuver",
      "conviu": "cohabite",
      "castella": "castillan",
      "genera": "génère",
      "debat": "débat"
    },
    "summaryPrompt": "Resumeix què va passar amb el català durant i després de la dictadura."
  },
  {
    "id": "paisos_catalans",
    "title": "On es parla català",
    "level": "A2-B1",
    "theme": "🗺️ Països Catalans",
    "paragraphs": [
      "El català no es parla només a Catalunya. També és la llengua de molta gent al País Valencià, a les illes Balears i a la ciutat de l'Alguer, a l'illa italiana de Sardenya.",
      "A França, al sud, hi ha una zona anomenada Catalunya Nord on encara es parla català. I a l'Aragó, en una franja de pobles a prop de Catalunya, també.",
      "El cas més especial és Andorra: és l'únic estat del món on el català és l'única llengua oficial. Andorra és un país petit als Pirineus, entre Espanya i França.",
      "En total, uns deu milions de persones entenen el català. Per això, sovint es parla dels 'Països Catalans' per referir-se a tots aquests territoris."
    ],
    "glossary": {
      "nomes": "seulement",
      "illes": "îles",
      "illa": "île",
      "anomenada": "appelée",
      "sud": "sud",
      "franja": "bande, frange",
      "pobles": "villages",
      "a prop": "près",
      "cas": "cas",
      "unic": "unique, seul",
      "estat": "État",
      "oficial": "officielle",
      "pais": "pays",
      "entenen": "comprennent",
      "milions": "millions",
      "sovint": "souvent",
      "referir-se": "se référer",
      "territoris": "territoires"
    },
    "summaryPrompt": "Fes una llista dels llocs on es parla català i digues quin et sorprèn més."
  },
  {
    "id": "andorra_alguer",
    "title": "Andorra i l'Alguer",
    "level": "B1",
    "theme": "🗺️ Països Catalans",
    "paragraphs": [
      "Andorra i l'Alguer són dos llocs on el català té una història curiosa. Andorra és un microestat als Pirineus, governat per dos caps d'estat alhora: el bisbe de la Seu d'Urgell i el president de França. És una herència de l'edat mitjana.",
      "Gràcies a la seva independència, Andorra ha pogut mantenir el català com a llengua oficial sense competència. Molts andorrans, però, també parlen castellà, francès i portuguès per la gran quantitat de turistes.",
      "L'Alguer, en canvi, és una ciutat de Sardenya, a Itàlia. Al segle XIV, el rei Pere el Cerimoniós hi va enviar colons catalans, i la llengua hi va arrelar.",
      "Avui, pocs algueresos parlen encara el català, però la ciutat conserva el sobrenom de 'la Barceloneta' i molts carrers tenen noms en les dues llengües."
    ],
    "glossary": {
      "llocs": "lieux",
      "curiosa": "curieuse",
      "microestat": "micro-État",
      "governat": "gouverné",
      "caps": "chefs",
      "alhora": "en même temps",
      "bisbe": "évêque",
      "herencia": "héritage",
      "competencia": "concurrence",
      "quantitat": "quantité",
      "enviar": "envoyer",
      "colons": "colons",
      "arrelar": "prendre racine",
      "pocs": "peu",
      "conserva": "conserve",
      "sobrenom": "surnom",
      "carrers": "rues"
    },
    "summaryPrompt": "Explica què fa especial cadascun dels dos llocs."
  },
  {
    "id": "diners_basics",
    "title": "Els diners de cada dia",
    "level": "A2",
    "theme": "💶 Economia",
    "paragraphs": [
      "Cada mes, moltes persones reben un sou per la seva feina. Amb aquests diners han de pagar el lloguer, el menjar, la llum i moltes altres coses.",
      "És important fer un pressupost: escriure quant guanyes i quant gastes. Així saps si pots estalviar una part per al futur o per a un imprevist.",
      "Molta gent guarda els diners en un banc, en un compte. Alguns bancs paguen un petit interès pels diners que hi tens, però normalment és molt baix.",
      "Estalviar no sempre és fàcil, sobretot en una ciutat cara com Barcelona. Però tenir uns diners estalviats dona tranquil·litat quan arriben despeses inesperades."
    ],
    "glossary": {
      "reben": "reçoivent",
      "sou": "salaire",
      "feina": "travail",
      "diners": "argent",
      "pagar": "payer",
      "lloguer": "loyer",
      "llum": "électricité",
      "pressupost": "budget",
      "guanyes": "tu gagnes",
      "gastes": "tu dépenses",
      "estalviar": "épargner",
      "imprevist": "imprévu",
      "guarda": "garde",
      "compte": "compte",
      "interes": "intérêt",
      "baix": "bas",
      "cara": "chère",
      "despeses": "dépenses",
      "inesperades": "inattendues"
    },
    "summaryPrompt": "Escriu el teu pressupost del mes en 4 frases: què entra i què surt."
  },
  {
    "id": "borsa_inversio",
    "title": "La borsa i la inversió",
    "level": "B1-B2",
    "theme": "💶 Economia",
    "paragraphs": [
      "Quan una persona té diners estalviats, pot deixar-los al banc o intentar fer-los créixer amb una inversió. Una de les maneres més conegudes és comprar accions a la borsa.",
      "Una acció és una petita part d'una empresa. Si l'empresa va bé i creix, el valor de l'acció puja i pots vendre-la més cara. Però si va malament, pots perdre diners.",
      "Per això, invertir sempre comporta un risc. Els experts recomanen no posar tots els diners en una sola empresa, sinó repartir-los: és el que s'anomena diversificar.",
      "La majoria d'inversors saben que, a curt termini, els mercats pugen i baixen molt. Per això molts prefereixen invertir pensant a llarg termini, amb paciència."
    ],
    "glossary": {
      "estalviats": "épargnés",
      "deixar": "laisser",
      "creixer": "croître",
      "inversio": "investissement",
      "accions": "actions",
      "borsa": "bourse",
      "empresa": "entreprise",
      "valor": "valeur",
      "puja": "monte",
      "vendre": "vendre",
      "perdre": "perdre",
      "comporta": "comporte",
      "risc": "risque",
      "experts": "experts",
      "repartir": "répartir",
      "diversificar": "diversifier",
      "majoria": "majorité",
      "inversors": "investisseurs",
      "curt termini": "court terme",
      "mercats": "marchés",
      "baixen": "baissent",
      "llarg termini": "long terme",
      "paciencia": "patience"
    },
    "summaryPrompt": "Explica amb les teves paraules què vol dir diversificar i per què és útil."
  }
];
