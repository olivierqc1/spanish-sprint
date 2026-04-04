// src/data/words/catalan/B1.ts

export interface CatalanCardB1 {
  id: string;
  front: string;
  back: string;
  backEn?: string;
  level: 'B1';
  country: 'catalonia';
  category: string;
}

export const catalanWordsB1: CatalanCardB1[] = [

  // ─── CONNECTORS AVANÇATS ──────────────────────────────────────────────────
  { id: 'cat-b1-001', front: 'tot i que',      back: 'bien que / même si',         backEn: 'even though',       level: 'B1', country: 'catalonia', category: 'connector' },
  { id: 'cat-b1-002', front: 'malgrat que',    back: 'malgré que / bien que',      backEn: 'despite / although', level: 'B1', country: 'catalonia', category: 'connector' },
  { id: 'cat-b1-003', front: 'per tant',       back: 'donc / par conséquent',      backEn: 'therefore',         level: 'B1', country: 'catalonia', category: 'connector' },
  { id: 'cat-b1-004', front: 'tanmateix',      back: 'cependant / pourtant',       backEn: 'however',           level: 'B1', country: 'catalonia', category: 'connector' },
  { id: 'cat-b1-005', front: 'a més a més',    back: 'de plus / en outre',         backEn: 'furthermore',       level: 'B1', country: 'catalonia', category: 'connector' },
  { id: 'cat-b1-006', front: 'és a dir',       back: "c'est-à-dire",               backEn: 'that is to say',    level: 'B1', country: 'catalonia', category: 'connector' },
  { id: 'cat-b1-007', front: 'en canvi',       back: 'par contre / en revanche',   backEn: 'on the other hand', level: 'B1', country: 'catalonia', category: 'connector' },
  { id: 'cat-b1-008', front: 'per exemple',    back: 'par exemple',                backEn: 'for example',       level: 'B1', country: 'catalonia', category: 'connector' },

  // ─── VOCABULARI ADMINISTRATIU (BARCELONA ESPECÍFIC) ───────────────────────
  { id: 'cat-b1-009', front: "l'ajuntament",          back: 'la mairie',                          backEn: 'city hall',              level: 'B1', country: 'catalonia', category: 'administratiu' },
  { id: 'cat-b1-010', front: 'la generalitat',        back: 'le gouvernement régional catalan',   backEn: 'Catalan regional government', level: 'B1', country: 'catalonia', category: 'administratiu' },
  { id: 'cat-b1-011', front: 'el padró municipal',    back: "le registre de résidence",           backEn: 'municipal register',     level: 'B1', country: 'catalonia', category: 'administratiu' },
  { id: 'cat-b1-012', front: "l'empadronament",       back: "l'inscription au registre",          backEn: 'registration of residence', level: 'B1', country: 'catalonia', category: 'administratiu' },
  { id: 'cat-b1-013', front: 'el permís de residència', back: 'le permis de résidence (TIE)',    backEn: 'residence permit',       level: 'B1', country: 'catalonia', category: 'administratiu' },
  { id: 'cat-b1-014', front: 'el NIE',               back: 'numéro d\'identité étranger',        backEn: 'foreigner ID number',    level: 'B1', country: 'catalonia', category: 'administratiu' },
  { id: 'cat-b1-015', front: 'la cita prèvia',        back: 'le rendez-vous préalable',           backEn: 'prior appointment',      level: 'B1', country: 'catalonia', category: 'administratiu' },
  { id: 'cat-b1-016', front: 'el tràmit',             back: 'la démarche administrative',         backEn: 'administrative procedure', level: 'B1', country: 'catalonia', category: 'administratiu' },

  // ─── VERBS B1 ─────────────────────────────────────────────────────────────
  { id: 'cat-b1-017', front: 'aconseguir',    back: 'réussir à / obtenir',       backEn: 'to achieve / obtain',  level: 'B1', country: 'catalonia', category: 'verb' },
  { id: 'cat-b1-018', front: 'proposar',      back: 'proposer',                  backEn: 'to propose',           level: 'B1', country: 'catalonia', category: 'verb' },
  { id: 'cat-b1-019', front: 'decidir',       back: 'décider',                   backEn: 'to decide',            level: 'B1', country: 'catalonia', category: 'verb' },
  { id: 'cat-b1-020', front: 'millorar',      back: 'améliorer / s\'améliorer',  backEn: 'to improve',           level: 'B1', country: 'catalonia', category: 'verb' },
  { id: 'cat-b1-021', front: 'canviar',       back: 'changer',                   backEn: 'to change',            level: 'B1', country: 'catalonia', category: 'verb' },
  { id: 'cat-b1-022', front: 'dependre',      back: 'dépendre',                  backEn: 'to depend',            level: 'B1', country: 'catalonia', category: 'verb' },
  { id: 'cat-b1-023', front: 'afegir',        back: 'ajouter',                   backEn: 'to add',               level: 'B1', country: 'catalonia', category: 'verb' },
  { id: 'cat-b1-024', front: 'descriure',     back: 'décrire',                   backEn: 'to describe',          level: 'B1', country: 'catalonia', category: 'verb' },
  { id: 'cat-b1-025', front: 'comparar',      back: 'comparer',                  backEn: 'to compare',           level: 'B1', country: 'catalonia', category: 'verb' },
  { id: 'cat-b1-026', front: 'resumir',       back: 'résumer',                   backEn: 'to summarize',         level: 'B1', country: 'catalonia', category: 'verb' },

  // ─── ADJECTIUS B1 ────────────────────────────────────────────────────────
  { id: 'cat-b1-027', front: 'actual',              back: 'actuel(le)',           backEn: 'current',       level: 'B1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-b1-028', front: 'adequat / adequada',  back: 'adéquat(e)',           backEn: 'adequate',      level: 'B1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-b1-029', front: 'complex / complexa',  back: 'complexe',             backEn: 'complex',       level: 'B1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-b1-030', front: 'necessari / necessària', back: 'nécessaire',        backEn: 'necessary',     level: 'B1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-b1-031', front: 'possible',            back: 'possible',             backEn: 'possible',      level: 'B1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-b1-032', front: 'probable',            back: 'probable',             backEn: 'probable',      level: 'B1', country: 'catalonia', category: 'adjectiu' },

  // ─── CULTURA CATALANA ─────────────────────────────────────────────────────
  { id: 'cat-b1-033', front: 'la sardana',         back: 'danse traditionnelle catalane (cercle)',  backEn: 'traditional Catalan circle dance', level: 'B1', country: 'catalonia', category: 'cultura' },
  { id: 'cat-b1-034', front: 'els castellers',     back: 'les faiseurs de tours humaines',          backEn: 'human tower builders',             level: 'B1', country: 'catalonia', category: 'cultura' },
  { id: 'cat-b1-035', front: "la diada",           back: 'la fête nationale catalane (11 sept.)',   backEn: 'Catalan national day (Sept. 11)',   level: 'B1', country: 'catalonia', category: 'cultura' },
  { id: 'cat-b1-036', front: "l'estelada",         back: 'le drapeau indépendantiste catalan',      backEn: 'Catalan independence flag',         level: 'B1', country: 'catalonia', category: 'cultura' },
  { id: 'cat-b1-037', front: 'el barri gòtic',     back: 'le quartier gothique (Barcelone)',        backEn: 'Gothic Quarter (Barcelona)',        level: 'B1', country: 'catalonia', category: 'cultura' },
  { id: 'cat-b1-038', front: 'el modernisme',      back: 'le modernisme (mouvement Gaudí)',         backEn: 'Catalan Modernism (Gaudí era)',     level: 'B1', country: 'catalonia', category: 'cultura' },
  { id: 'cat-b1-039', front: 'la rambla',          back: 'la Rambla (avenue piétonne)',             backEn: 'La Rambla (pedestrian avenue)',     level: 'B1', country: 'catalonia', category: 'cultura' },
  { id: 'cat-b1-040', front: 'el mercat de la boqueria', back: 'le marché de la Boqueria',         backEn: 'La Boqueria market',               level: 'B1', country: 'catalonia', category: 'cultura' },

  // ─── EXPRESSIONS IDIOMÀTIQUES ─────────────────────────────────────────────
  { id: 'cat-b1-041', front: 'anar al gra',          back: 'aller droit au but',           backEn: 'to get to the point',     level: 'B1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-b1-042', front: 'fer el salt',           back: 'faire le grand saut',          backEn: 'to take the plunge',      level: 'B1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-b1-043', front: 'no hi ha res a fer',    back: "il n'y a rien à faire",        backEn: 'nothing to be done',      level: 'B1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-b1-044', front: 'ser del país',          back: 'être du pays / être catalan',  backEn: 'to be a local',           level: 'B1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-b1-045', front: 'fer bondat',            back: 'se tenir bien / être sage',    backEn: 'to behave well',          level: 'B1', country: 'catalonia', category: 'expressió' },
];

export default catalanWordsB1;