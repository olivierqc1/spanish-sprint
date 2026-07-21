// src/data/lectures.ts
// Textes courts de lecture (català A2-B1) avec glossaire mot->traduction FR.
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
    id: 'barcino',
    title: 'Barcino, la ciutat romana',
    level: 'A2-B1',
    theme: '🏛️ Història',
    paragraphs: [
      'Fa més de dos mil anys, els romans van fundar una petita ciutat a la costa catalana. Es deia Barcino i tenia unes muralles per protegir els habitants.',
      'Dins de les muralles hi havia un fòrum, uns temples i cases de pedra. Els carrers formaven una quadrícula molt ordenada, com era típic de les ciutats romanes.',
      "Encara avui, al barri Gòtic de Barcelona, es poden veure restes d'aquelles muralles i columnes antigues. Molts turistes hi passen pel costat sense saber que trepitgen dos mil anys d'història.",
      'Barcino va créixer a poc a poc i, amb els segles, es va convertir en la gran ciutat que coneixem: Barcelona.',
    ],
    glossary: {
      fundar: 'fonder',
      costa: 'côte',
      muralles: 'remparts',
      protegir: 'protéger',
      habitants: 'habitants',
      forum: 'forum',
      temples: 'temples',
      pedra: 'pierre',
      carrers: 'rues',
      quadricula: 'grille, quadrillage',
      ordenada: 'ordonnée',
      restes: 'vestiges',
      antigues: 'anciennes',
      costat: 'côté',
      trepitgen: 'ils foulent, piétinent',
      creixer: 'grandir',
      segles: 'siècles',
      coneixem: 'nous connaissons',
    },
    summaryPrompt: 'Resumeix el text en 3 frases: qui va fundar Barcino, com era, i què en queda avui.',
  },
  {
    id: 'trail',
    title: 'Córrer per la muntanya',
    level: 'A2-B1',
    theme: '🏃 Esport',
    paragraphs: [
      "El trail running és una manera de córrer per la muntanya, lluny de l'asfalt de la ciutat. A Catalunya i als Pirineus hi ha molts camins ideals per a aquest esport.",
      'Els corredors pugen i baixen per senders estrets, entre boscos, roques i rius. No és fàcil: cal força a les cames, però també cap i paciència.',
      'Moltes curses duren hores i els participants han de menjar i beure mentre corren. Quan arribes al cim, però, la vista ho val tot.',
      'Molts diuen que córrer per la natura és una manera de descansar la ment mentre canses el cos.',
    ],
    glossary: {
      correr: 'courir',
      muntanya: 'montagne',
      lluny: 'loin',
      camins: 'chemins',
      corredors: 'coureurs',
      pugen: 'ils montent',
      baixen: 'ils descendent',
      senders: 'sentiers',
      estrets: 'étroits',
      boscos: 'forêts',
      roques: 'rochers',
      cames: 'jambes',
      cap: 'tête',
      paciencia: 'patience',
      curses: 'courses',
      duren: 'durent',
      cim: 'sommet',
      vista: 'vue',
      descansar: 'reposer',
      ment: 'esprit',
      canses: 'tu fatigues',
      cos: 'corps',
    },
    summaryPrompt: 'Explica en 3 frases per què t\'agrada (o no) córrer per la muntanya.',
  },
  {
    id: 'vi',
    title: 'El vi català',
    level: 'A2-B1',
    theme: '🍷 Cultura',
    paragraphs: [
      'Catalunya té una llarga tradició de fer vi. Des de fa segles, els pagesos cultiven vinyes a comarques com el Priorat, el Penedès o l\'Empordà.',
      'Cada zona té un clima i una terra diferents, i això dona vins amb gustos molt variats. Al Penedès, per exemple, es fa el cava, un vi escumós famós arreu del món.',
      'Al Priorat, en canvi, la terra és pobra i pedregosa, i produeix vins negres forts i intensos.',
      'Fer bon vi demana temps i paciència: primer cal collir el raïm, després deixar-lo fermentar i, finalment, esperar mesos o anys abans de beure\'l.',
    ],
    glossary: {
      tradicio: 'tradition',
      pagesos: 'paysans, agriculteurs',
      cultiven: 'ils cultivent',
      vinyes: 'vignes',
      comarques: 'régions, comtés',
      terra: 'terre',
      gustos: 'goûts',
      escumos: 'pétillant',
      arreu: 'partout',
      pobra: 'pauvre',
      pedregosa: 'pierreuse',
      forts: 'forts',
      collir: 'récolter, cueillir',
      raim: 'raisin',
      fermentar: 'fermenter',
      esperar: 'attendre',
      beure: 'boire',
    },
    summaryPrompt: 'Compara dues zones de vi del text i digues quina t\'agradaria visitar.',
  },
];
