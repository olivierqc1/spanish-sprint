// src/data/words/catalan/A1_p1.ts

export interface CatalanCard {
  id: string;
  front: string;
  back: string;
  backEn?: string;
  level: 'A1';
  country: 'catalonia';
  category: string;
}

export const catalanWordsA1P1: CatalanCard[] = [

  // ─── SALUTACIONS ─────────────────────────────────────────────────────────
  { id: 'cat-a1-001', front: 'Bon dia',                  back: 'Bonjour (matin)',            backEn: 'Good morning',           level: 'A1', country: 'catalonia', category: 'salutació' },
  { id: 'cat-a1-002', front: 'Bona tarda',               back: 'Bon après-midi',             backEn: 'Good afternoon',         level: 'A1', country: 'catalonia', category: 'salutació' },
  { id: 'cat-a1-003', front: 'Bona nit',                 back: 'Bonne nuit / Bonsoir',       backEn: 'Good night / evening',   level: 'A1', country: 'catalonia', category: 'salutació' },
  { id: 'cat-a1-004', front: 'Hola',                     back: 'Salut / Bonjour',            backEn: 'Hello / Hi',             level: 'A1', country: 'catalonia', category: 'salutació' },
  { id: 'cat-a1-005', front: 'Adéu',                     back: 'Au revoir',                  backEn: 'Goodbye',                level: 'A1', country: 'catalonia', category: 'salutació' },
  { id: 'cat-a1-006', front: 'Fins aviat',               back: 'À bientôt',                  backEn: 'See you soon',           level: 'A1', country: 'catalonia', category: 'salutació' },
  { id: 'cat-a1-007', front: 'Fins demà',                back: 'À demain',                   backEn: 'See you tomorrow',       level: 'A1', country: 'catalonia', category: 'salutació' },
  { id: 'cat-a1-008', front: 'Com estàs?',               back: 'Comment tu vas ?',           backEn: 'How are you?',           level: 'A1', country: 'catalonia', category: 'salutació' },
  { id: 'cat-a1-009', front: 'Molt bé, gràcies',         back: 'Très bien, merci',           backEn: 'Very well, thank you',   level: 'A1', country: 'catalonia', category: 'salutació' },
  { id: 'cat-a1-010', front: 'I tu?',                    back: 'Et toi ?',                   backEn: 'And you?',               level: 'A1', country: 'catalonia', category: 'salutació' },

  // ─── EXPRESSIONS ESSENCIALS ───────────────────────────────────────────────
  { id: 'cat-a1-011', front: 'Gràcies',                  back: 'Merci',                      backEn: 'Thank you',              level: 'A1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-a1-012', front: 'Moltes gràcies',           back: 'Merci beaucoup',             backEn: 'Thank you very much',    level: 'A1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-a1-013', front: 'De res',                   back: 'De rien',                    backEn: "You're welcome",         level: 'A1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-a1-014', front: 'Si us plau',               back: "S'il vous plaît",            backEn: 'Please',                 level: 'A1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-a1-015', front: 'Perdona',                  back: 'Pardon / Excuse-moi',        backEn: 'Excuse me',              level: 'A1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-a1-016', front: 'Ho sento',                 back: 'Je suis désolé(e)',          backEn: 'I am sorry',             level: 'A1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-a1-017', front: 'Sí',                       back: 'Oui',                        backEn: 'Yes',                    level: 'A1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-a1-018', front: 'No',                       back: 'Non',                        backEn: 'No',                     level: 'A1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-a1-019', front: 'No entenc',                back: 'Je ne comprends pas',        backEn: "I don't understand",     level: 'A1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-a1-020', front: 'Pots repetir?',            back: 'Tu peux répéter ?',          backEn: 'Can you repeat?',        level: 'A1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-a1-021', front: 'Parles català?',           back: 'Tu parles catalan ?',        backEn: 'Do you speak Catalan?',  level: 'A1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-a1-022', front: 'Parlo una mica de català', back: 'Je parle un peu catalan',    backEn: 'I speak a little Catalan', level: 'A1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-a1-023', front: 'On és...?',                back: 'Où est... ?',                backEn: 'Where is...?',           level: 'A1', country: 'catalonia', category: 'expressió' },
  { id: 'cat-a1-024', front: 'Quant costa?',             back: 'Combien ça coûte ?',         backEn: 'How much does it cost?', level: 'A1', country: 'catalonia', category: 'expressió' },

  // ─── VERBS ────────────────────────────────────────────────────────────────
  { id: 'cat-a1-025', front: 'ser',        back: 'être (identité/origine)',  backEn: 'to be (identity)',       level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-026', front: 'estar',      back: 'être (état/lieu)',         backEn: 'to be (state/location)', level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-027', front: 'tenir',      back: 'avoir',                    backEn: 'to have',                level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-028', front: 'anar',       back: 'aller',                    backEn: 'to go',                  level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-029', front: 'venir',      back: 'venir',                    backEn: 'to come',                level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-030', front: 'parlar',     back: 'parler',                   backEn: 'to speak',               level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-031', front: 'menjar',     back: 'manger',                   backEn: 'to eat',                 level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-032', front: 'beure',      back: 'boire',                    backEn: 'to drink',               level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-033', front: 'voler',      back: 'vouloir',                  backEn: 'to want',                level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-034', front: 'poder',      back: 'pouvoir',                  backEn: 'can / to be able to',    level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-035', front: 'fer',        back: 'faire',                    backEn: 'to do / make',           level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-036', front: 'dir',        back: 'dire',                     backEn: 'to say',                 level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-037', front: 'viure',      back: 'vivre / habiter',          backEn: 'to live',                level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-038', front: 'treballar',  back: 'travailler',               backEn: 'to work',                level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-039', front: 'estudiar',   back: 'étudier',                  backEn: 'to study',               level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-040', front: 'necessitar', back: 'avoir besoin de',          backEn: 'to need',                level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-041', front: 'comprar',    back: 'acheter',                  backEn: 'to buy',                 level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-042', front: 'agafar',     back: 'prendre / attraper',       backEn: 'to take / catch',        level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-043', front: 'saber',      back: 'savoir',                   backEn: 'to know (facts)',        level: 'A1', country: 'catalonia', category: 'verb' },
  { id: 'cat-a1-044', front: 'conèixer',   back: 'connaître',                backEn: 'to know (people)',       level: 'A1', country: 'catalonia', category: 'verb' },

  // ─── NOMBRES ─────────────────────────────────────────────────────────────
  { id: 'cat-a1-045', front: 'zero',       back: 'zéro',        backEn: 'zero',         level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-046', front: 'un / una',   back: 'un / une',    backEn: 'one',          level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-047', front: 'dos / dues', back: 'deux',        backEn: 'two',          level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-048', front: 'tres',       back: 'trois',       backEn: 'three',        level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-049', front: 'quatre',     back: 'quatre',      backEn: 'four',         level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-050', front: 'cinc',       back: 'cinq',        backEn: 'five',         level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-051', front: 'sis',        back: 'six',         backEn: 'six',          level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-052', front: 'set',        back: 'sept',        backEn: 'seven',        level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-053', front: 'vuit',       back: 'huit',        backEn: 'eight',        level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-054', front: 'nou',        back: 'neuf',        backEn: 'nine',         level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-055', front: 'deu',        back: 'dix',         backEn: 'ten',          level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-056', front: 'onze',       back: 'onze',        backEn: 'eleven',       level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-057', front: 'dotze',      back: 'douze',       backEn: 'twelve',       level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-058', front: 'vint',       back: 'vingt',       backEn: 'twenty',       level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-059', front: 'cent',       back: 'cent',        backEn: 'one hundred',  level: 'A1', country: 'catalonia', category: 'nombre' },
  { id: 'cat-a1-060', front: 'mil',        back: 'mille',       backEn: 'one thousand', level: 'A1', country: 'catalonia', category: 'nombre' },

  // ─── COLORS ──────────────────────────────────────────────────────────────
  { id: 'cat-a1-061', front: 'vermell / vermella', back: 'rouge',         backEn: 'red',    level: 'A1', country: 'catalonia', category: 'color' },
  { id: 'cat-a1-062', front: 'blau / blava',       back: 'bleu(e)',       backEn: 'blue',   level: 'A1', country: 'catalonia', category: 'color' },
  { id: 'cat-a1-063', front: 'groc / groga',       back: 'jaune',         backEn: 'yellow', level: 'A1', country: 'catalonia', category: 'color' },
  { id: 'cat-a1-064', front: 'verd / verda',       back: 'vert(e)',       backEn: 'green',  level: 'A1', country: 'catalonia', category: 'color' },
  { id: 'cat-a1-065', front: 'negre / negra',      back: 'noir(e)',       backEn: 'black',  level: 'A1', country: 'catalonia', category: 'color' },
  { id: 'cat-a1-066', front: 'blanc / blanca',     back: 'blanc(he)',     backEn: 'white',  level: 'A1', country: 'catalonia', category: 'color' },
  { id: 'cat-a1-067', front: 'taronja',            back: 'orange',        backEn: 'orange', level: 'A1', country: 'catalonia', category: 'color' },
  { id: 'cat-a1-068', front: 'rosa',               back: 'rose',          backEn: 'pink',   level: 'A1', country: 'catalonia', category: 'color' },
  { id: 'cat-a1-069', front: 'gris / grisa',       back: 'gris(e)',       backEn: 'grey',   level: 'A1', country: 'catalonia', category: 'color' },
  { id: 'cat-a1-070', front: 'marró',              back: 'marron / brun', backEn: 'brown',  level: 'A1', country: 'catalonia', category: 'color' },

  // ─── MENJAR I BEGUDA ─────────────────────────────────────────────────────
  { id: 'cat-a1-071', front: 'el pa',              back: 'le pain',                           backEn: 'bread',             level: 'A1', country: 'catalonia', category: 'menjar' },
  { id: 'cat-a1-072', front: "l'aigua",            back: "l'eau",                             backEn: 'water',             level: 'A1', country: 'catalonia', category: 'menjar' },
  { id: 'cat-a1-073', front: 'el cafè',            back: 'le café',                           backEn: 'coffee',            level: 'A1', country: 'catalonia', category: 'menjar' },
  { id: 'cat-a1-074', front: 'el vi',              back: 'le vin',                            backEn: 'wine',              level: 'A1', country: 'catalonia', category: 'menjar' },
  { id: 'cat-a1-075', front: 'la cervesa',         back: 'la bière',                          backEn: 'beer',              level: 'A1', country: 'catalonia', category: 'menjar' },
];
// src/data/words/catalan/A1_p2.ts
import type { CatalanCard } from './A1_p1';
import { catalanWordsA1P1 } from './A1_p1';

const catalanWordsA1P2: CatalanCard[] = [

  // ─── MENJAR I BEGUDA (suite) ──────────────────────────────────────────────
  { id: 'cat-a1-076', front: 'la llet',            back: 'le lait',                           backEn: 'milk',              level: 'A1', country: 'catalonia', category: 'menjar' },
  { id: 'cat-a1-077', front: 'la carn',            back: 'la viande',                         backEn: 'meat',              level: 'A1', country: 'catalonia', category: 'menjar' },
  { id: 'cat-a1-078', front: 'el peix',            back: 'le poisson',                        backEn: 'fish',              level: 'A1', country: 'catalonia', category: 'menjar' },
  { id: 'cat-a1-079', front: 'la fruita',          back: 'le fruit',                          backEn: 'fruit',             level: 'A1', country: 'catalonia', category: 'menjar' },
  { id: 'cat-a1-080', front: 'la verdura',         back: 'le légume',                         backEn: 'vegetable',         level: 'A1', country: 'catalonia', category: 'menjar' },
  { id: 'cat-a1-081', front: 'el formatge',        back: 'le fromage',                        backEn: 'cheese',            level: 'A1', country: 'catalonia', category: 'menjar' },
  { id: 'cat-a1-082', front: "l'oli d'oliva",      back: "l'huile d'olive",                   backEn: 'olive oil',         level: 'A1', country: 'catalonia', category: 'menjar' },
  { id: 'cat-a1-083', front: 'el pa amb tomàquet', back: 'pain frotté à la tomate et huile',  backEn: 'bread with tomato', level: 'A1', country: 'catalonia', category: 'menjar' },
  { id: 'cat-a1-084', front: 'la crema catalana',  back: 'crème brûlée catalane',             backEn: 'Catalan cream',     level: 'A1', country: 'catalonia', category: 'menjar' },
  { id: 'cat-a1-085', front: 'els escalivats',     back: 'légumes grillés (poivrons, aubergines)', backEn: 'roasted vegetables', level: 'A1', country: 'catalonia', category: 'menjar' },

  // ─── FAMILIA ─────────────────────────────────────────────────────────────
  { id: 'cat-a1-086', front: 'el pare',    back: 'le père',       backEn: 'father',      level: 'A1', country: 'catalonia', category: 'familia' },
  { id: 'cat-a1-087', front: 'la mare',    back: 'la mère',       backEn: 'mother',      level: 'A1', country: 'catalonia', category: 'familia' },
  { id: 'cat-a1-088', front: 'el germà',   back: 'le frère',      backEn: 'brother',     level: 'A1', country: 'catalonia', category: 'familia' },
  { id: 'cat-a1-089', front: 'la germana', back: 'la sœur',       backEn: 'sister',      level: 'A1', country: 'catalonia', category: 'familia' },
  { id: 'cat-a1-090', front: "l'avi",      back: 'le grand-père', backEn: 'grandfather', level: 'A1', country: 'catalonia', category: 'familia' },
  { id: 'cat-a1-091', front: "l'àvia",     back: 'la grand-mère', backEn: 'grandmother', level: 'A1', country: 'catalonia', category: 'familia' },
  { id: 'cat-a1-092', front: 'el fill',    back: 'le fils',       backEn: 'son',         level: 'A1', country: 'catalonia', category: 'familia' },
  { id: 'cat-a1-093', front: 'la filla',   back: 'la fille',      backEn: 'daughter',    level: 'A1', country: 'catalonia', category: 'familia' },
  { id: 'cat-a1-094', front: "l'amic",     back: "l'ami",         backEn: 'friend (m)',  level: 'A1', country: 'catalonia', category: 'familia' },
  { id: 'cat-a1-095', front: "l'amiga",    back: "l'amie",        backEn: 'friend (f)',  level: 'A1', country: 'catalonia', category: 'familia' },

  // ─── TEMPS ───────────────────────────────────────────────────────────────
  { id: 'cat-a1-096', front: 'avui',      back: "aujourd'hui",  backEn: 'today',      level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-097', front: 'ahir',      back: 'hier',         backEn: 'yesterday',  level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-098', front: 'demà',      back: 'demain',       backEn: 'tomorrow',   level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-099', front: 'ara',       back: 'maintenant',   backEn: 'now',        level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-100', front: 'sempre',    back: 'toujours',     backEn: 'always',     level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-101', front: 'mai',       back: 'jamais',       backEn: 'never',      level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-102', front: 'el matí',   back: 'le matin',     backEn: 'morning',    level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-103', front: 'la tarda',  back: "l'après-midi", backEn: 'afternoon',  level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-104', front: 'la nit',    back: 'la nuit',      backEn: 'night',      level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-105', front: 'dilluns',   back: 'lundi',        backEn: 'Monday',     level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-106', front: 'dimarts',   back: 'mardi',        backEn: 'Tuesday',    level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-107', front: 'dimecres',  back: 'mercredi',     backEn: 'Wednesday',  level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-108', front: 'dijous',    back: 'jeudi',        backEn: 'Thursday',   level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-109', front: 'divendres', back: 'vendredi',     backEn: 'Friday',     level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-110', front: 'dissabte',  back: 'samedi',       backEn: 'Saturday',   level: 'A1', country: 'catalonia', category: 'temps' },
  { id: 'cat-a1-111', front: 'diumenge',  back: 'dimanche',     backEn: 'Sunday',     level: 'A1', country: 'catalonia', category: 'temps' },

  // ─── LLOC ────────────────────────────────────────────────────────────────
  { id: 'cat-a1-112', front: 'aquí',               back: 'ici',                 backEn: 'here',           level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-113', front: 'allà',               back: 'là-bas',              backEn: 'there',          level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-114', front: 'a la dreta',         back: 'à droite',            backEn: 'to the right',   level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-115', front: "a l'esquerra",       back: 'à gauche',            backEn: 'to the left',    level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-116', front: 'tot recte',          back: 'tout droit',          backEn: 'straight ahead', level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-117', front: 'a prop',             back: 'près',                backEn: 'near',           level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-118', front: 'lluny',              back: 'loin',                backEn: 'far',            level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-119', front: 'el carrer',          back: 'la rue',              backEn: 'street',         level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-120', front: 'la plaça',           back: 'la place',            backEn: 'square',         level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-121', front: "l'estació de metro", back: 'la station de métro', backEn: 'metro station',  level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-122', front: "l'hospital",         back: "l'hôpital",           backEn: 'hospital',       level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-123', front: 'la farmàcia',        back: 'la pharmacie',        backEn: 'pharmacy',       level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-124', front: 'el supermercat',     back: 'le supermarché',      backEn: 'supermarket',    level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-125', front: 'la platja',          back: 'la plage',            backEn: 'beach',          level: 'A1', country: 'catalonia', category: 'lloc' },
  { id: 'cat-a1-126', front: "l'aeroport",         back: "l'aéroport",          backEn: 'airport',        level: 'A1', country: 'catalonia', category: 'lloc' },

  // ─── ADJECTIUS ───────────────────────────────────────────────────────────
  { id: 'cat-a1-127', front: 'gran',              back: 'grand(e)',           backEn: 'big',       level: 'A1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-a1-128', front: 'petit / petita',   back: 'petit(e)',           backEn: 'small',     level: 'A1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-a1-129', front: 'bo / bona',        back: 'bon(ne)',            backEn: 'good',      level: 'A1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-a1-130', front: 'dolent / dolenta', back: 'mauvais(e)',         backEn: 'bad',       level: 'A1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-a1-131', front: 'bonic / bonica',   back: 'beau / belle',      backEn: 'beautiful', level: 'A1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-a1-132', front: 'lleig / lletja',   back: 'laid(e)',            backEn: 'ugly',      level: 'A1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-a1-133', front: 'nou / nova',        back: 'nouveau / nouvelle', backEn: 'new',       level: 'A1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-a1-134', front: 'vell / vella',      back: 'vieux / vieille',   backEn: 'old',       level: 'A1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-a1-135', front: 'car / cara',         back: 'cher / chère',      backEn: 'expensive', level: 'A1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-a1-136', front: 'barat / barata',    back: 'pas cher',           backEn: 'cheap',     level: 'A1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-a1-137', front: 'calent / calenta',  back: 'chaud(e)',           backEn: 'hot',       level: 'A1', country: 'catalonia', category: 'adjectiu' },
  { id: 'cat-a1-138', front: 'fred / freda',      back: 'froid(e)',           backEn: 'cold',      level: 'A1', country: 'catalonia', category: 'adjectiu' },

  // ─── FRASES DEL QUOTIDIÀ ─────────────────────────────────────────────────
  { id: 'cat-a1-139', front: 'Un cafè, si us plau',      back: "Un café, s'il vous plaît",  backEn: 'A coffee, please',     level: 'A1', country: 'catalonia', category: 'frase' },
  { id: 'cat-a1-140', front: 'Puc pagar amb targeta?',   back: 'Je peux payer par carte ?', backEn: 'Can I pay by card?',   level: 'A1', country: 'catalonia', category: 'frase' },
  { id: 'cat-a1-141', front: 'Quin preu té?',            back: 'Quel est le prix ?',         backEn: 'What is the price?',   level: 'A1', country: 'catalonia', category: 'frase' },
  { id: 'cat-a1-142', front: 'Tinc una reserva',         back: "J'ai une réservation",      backEn: 'I have a reservation', level: 'A1', country: 'catalonia', category: 'frase' },
  { id: 'cat-a1-143', front: "M'agrada molt",            back: "J'aime beaucoup ça",        backEn: 'I like it a lot',      level: 'A1', country: 'catalonia', category: 'frase' },
  { id: 'cat-a1-144', front: "No m'agrada",              back: "Je n'aime pas ça",          backEn: "I don't like it",      level: 'A1', country: 'catalonia', category: 'frase' },
  { id: 'cat-a1-145', front: 'Sóc canadenc / canadenca', back: 'Je suis canadien(ne)',      backEn: 'I am Canadian',        level: 'A1', country: 'catalonia', category: 'frase' },
  { id: 'cat-a1-146', front: 'Visc a Barcelona',         back: "J'habite à Barcelone",      backEn: 'I live in Barcelona',  level: 'A1', country: 'catalonia', category: 'frase' },
  { id: 'cat-a1-147', front: 'Em dic...',                back: "Je m'appelle...",           backEn: 'My name is...',        level: 'A1', country: 'catalonia', category: 'frase' },
  { id: 'cat-a1-148', front: 'Tinc... anys',             back: "J'ai... ans",               backEn: 'I am ... years old',   level: 'A1', country: 'catalonia', category: 'frase' },
  { id: 'cat-a1-149', front: 'Tinc gana',                back: "J'ai faim",                 backEn: 'I am hungry',          level: 'A1', country: 'catalonia', category: 'frase' },
  { id: 'cat-a1-150', front: 'Tinc set',                 back: "J'ai soif",                 backEn: 'I am thirsty',         level: 'A1', country: 'catalonia', category: 'frase' },
];

// Export combiné — c'est cet export que le reste du projet utilise
export const catalanWordsA1 = [...catalanWordsA1P1, ...catalanWordsA1P2];
export default catalanWordsA1;
