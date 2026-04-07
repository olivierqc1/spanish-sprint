// src/data/catalan/grammar.ts
// Explications grammaticales du catalan — FR et EN

export interface GrammarRule {
  id: string;
  title: { fr: string; en: string };
  level: 'A1' | 'A2' | 'B1';
  summary: { fr: string; en: string };
  explanation: { fr: string; en: string };
  examples: Array<{ catalan: string; fr: string; en: string; note?: string }>;
  tips?: { fr: string; en: string };
}

export const catalanGrammarRules: GrammarRule[] = [

  // ─── ARTICLES ─────────────────────────────────────────────────────────────
  {
    id: 'articles-definits',
    title: { fr: 'Les articles définis', en: 'Definite articles' },
    level: 'A1',
    summary: {
      fr: 'el / la / els / les — selon le genre et le nombre',
      en: 'el / la / els / les — depending on gender and number',
    },
    explanation: {
      fr: `Le catalan a 4 articles définis :
- EL : masculin singulier → el gat (le chat)
- LA : féminin singulier → la porta (la porte)
- ELS : masculin pluriel → els gats (les chats)
- LES : féminin pluriel → les portes (les portes)

Attention : devant une voyelle ou h muet, EL devient L' et LA devient L'.
Ex : l'home (l'homme), l'amiga (l'amie)

Cas spécial : les noms propres de personnes prennent l'article en catalan.
Ex : en Pere (Pierre), la Maria (Marie)`,
      en: `Catalan has 4 definite articles:
- EL: masculine singular → el gat (the cat)
- LA: feminine singular → la porta (the door)
- ELS: masculine plural → els gats (the cats)
- LES: feminine plural → les portes (the doors)

Note: before a vowel or silent h, EL becomes L' and LA becomes L'.
Ex: l'home (the man), l'amiga (the friend)

Special case: people's proper names take the article in Catalan.
Ex: en Pere (Peter), la Maria (Mary)`,
    },
    examples: [
      { catalan: 'el cotxe', fr: 'la voiture', en: 'the car' },
      { catalan: 'la taula', fr: 'la table', en: 'the table' },
      { catalan: 'els nens', fr: 'les enfants', en: 'the children' },
      { catalan: 'les cases', fr: 'les maisons', en: 'the houses' },
      { catalan: "l'arbre", fr: "l'arbre", en: 'the tree', note: 'El → L\' devant voyelle' },
    ],
    tips: {
      fr: 'Astuce : le genre des noms catalans ressemble souvent au français. La taula (la table), el pa (le pain).',
      en: 'Tip: Catalan noun gender often resembles French. La taula (the table), el pa (the bread).',
    },
  },

  {
    id: 'articles-indefinits',
    title: { fr: 'Les articles indéfinis', en: 'Indefinite articles' },
    level: 'A1',
    summary: {
      fr: 'un / una / uns / unes',
      en: 'un / una / uns / unes',
    },
    explanation: {
      fr: `Les articles indéfinis :
- UN : masculin singulier → un gat (un chat)
- UNA : féminin singulier → una casa (une maison)
- UNS : masculin pluriel → uns amics (des amis)
- UNES : féminin pluriel → unes flors (des fleurs)

Devant une voyelle, UNA peut devenir UN par euphonie.
Ex : un amic (un ami) — mais aussi una amiga (une amie, toujours UNA au féminin)`,
      en: `Indefinite articles:
- UN: masculine singular → un gat (a cat)
- UNA: feminine singular → una casa (a house)
- UNS: masculine plural → uns amics (some friends)
- UNES: feminine plural → unes flors (some flowers)

Before a vowel, UNA may become UN for euphony.
Ex: un amic (a friend) — but una amiga (a friend, always UNA feminine)`,
    },
    examples: [
      { catalan: 'un home', fr: 'un homme', en: 'a man' },
      { catalan: 'una dona', fr: 'une femme', en: 'a woman' },
      { catalan: 'uns quants dies', fr: 'quelques jours', en: 'a few days' },
      { catalan: 'unes sabates', fr: 'des chaussures', en: 'some shoes' },
    ],
  },

  // ─── GENRE DES NOMS ───────────────────────────────────────────────────────
  {
    id: 'genre-noms',
    title: { fr: 'Le genre des noms', en: 'Noun gender' },
    level: 'A1',
    summary: {
      fr: 'Masculin / Féminin — règles et terminaisons',
      en: 'Masculine / Feminine — rules and endings',
    },
    explanation: {
      fr: `En catalan, chaque nom est masculin ou féminin.

MASCULIN — souvent terminé en consonne ou -e :
- el cotxe, el gat, el pa, el mar

FÉMININ — souvent terminé en -a :
- la casa, la porta, la taula, la dona

Formation du féminin à partir du masculin :
- Si le masc. finit en consonne → ajouter -a : amic → amiga
- Si le masc. finit en -e → remplacer par -a : mestre → mestra
- Si le masc. finit en -or → ajouter -a : professor → professora
- Cas irréguliers : home (homme) → dona (femme)`,
      en: `In Catalan, every noun is masculine or feminine.

MASCULINE — often ending in a consonant or -e:
- el cotxe, el gat, el pa, el mar

FEMININE — often ending in -a:
- la casa, la porta, la taula, la dona

Forming feminine from masculine:
- If masc. ends in consonant → add -a: amic → amiga
- If masc. ends in -e → replace with -a: mestre → mestra
- If masc. ends in -or → add -a: professor → professora
- Irregular: home (man) → dona (woman)`,
    },
    examples: [
      { catalan: 'el gat / la gata', fr: 'le chat / la chatte', en: 'the cat (m/f)' },
      { catalan: 'el professor / la professora', fr: 'le prof / la prof', en: 'the teacher (m/f)' },
      { catalan: "l'amic / l'amiga", fr: "l'ami / l'amie", en: 'the friend (m/f)' },
      { catalan: 'el noi / la noia', fr: 'le garçon / la fille', en: 'the boy / the girl' },
    ],
  },

  // ─── SER VS ESTAR ─────────────────────────────────────────────────────────
  {
    id: 'ser-vs-estar',
    title: { fr: 'Ser vs Estar', en: 'Ser vs Estar' },
    level: 'A1',
    summary: {
      fr: 'Deux façons de dire "être" — identité permanente vs état temporaire',
      en: 'Two ways to say "to be" — permanent identity vs temporary state',
    },
    explanation: {
      fr: `Le catalan comme l'espagnol a deux verbes "être" :

SER — identité, origine, profession, caractéristiques permanentes :
- Sóc canadenc. (Je suis canadien.)
- La Maria és metgessa. (Marie est médecin.)
- Barcelona és gran. (Barcelone est grande.)
- Són les tres. (Il est 3h.)

ESTAR — état temporaire, lieu, résultat d'une action :
- Estic cansat. (Je suis fatigué.)
- On estàs? (Où es-tu?)
- El cotxe està brut. (La voiture est sale.)
- Estem a Barcelona. (Nous sommes à Barcelone.)

TRUC : Si tu peux remplacer par "se trouver" → ESTAR. Si pas → SER.`,
      en: `Like Spanish, Catalan has two verbs meaning "to be":

SER — identity, origin, profession, permanent characteristics:
- Sóc canadenc. (I am Canadian.)
- La Maria és metgessa. (Maria is a doctor.)
- Barcelona és gran. (Barcelona is big.)
- Són les tres. (It's 3 o'clock.)

ESTAR — temporary state, location, result of an action:
- Estic cansat. (I am tired.)
- On estàs? (Where are you?)
- El cotxe està brut. (The car is dirty.)
- Estem a Barcelona. (We are in Barcelona.)

TRICK: If you can replace with "to be located" → ESTAR. Otherwise → SER.`,
    },
    examples: [
      { catalan: 'Sóc de Montreal.', fr: 'Je suis de Montréal.', en: 'I am from Montreal.', note: 'SER — origine' },
      { catalan: 'Estic content.', fr: 'Je suis content.', en: 'I am happy.', note: 'ESTAR — état' },
      { catalan: 'La sopa és bona.', fr: 'La soupe est bonne.', en: 'The soup is good.', note: 'SER — qualité' },
      { catalan: 'La sopa està freda.', fr: 'La soupe est froide.', en: 'The soup is cold.', note: 'ESTAR — état temporaire' },
      { catalan: 'Ell és alt.', fr: 'Il est grand.', en: 'He is tall.', note: 'SER — caractéristique physique' },
    ],
    tips: {
      fr: 'Les adjectifs de sentiment (content, trist, nerviós) vont toujours avec ESTAR.',
      en: 'Feeling adjectives (content, trist, nerviós) always go with ESTAR.',
    },
  },

  // ─── NÉGATION ─────────────────────────────────────────────────────────────
  {
    id: 'negacio',
    title: { fr: 'La négation', en: 'Negation' },
    level: 'A1',
    summary: {
      fr: 'No + verbe — simple et régulier',
      en: 'No + verb — simple and regular',
    },
    explanation: {
      fr: `La négation en catalan est simple : NO devant le verbe.

Structure : Sujet + NO + verbe + complément

Exemples :
- No parlo anglès. (Je ne parle pas anglais.)
- No tinc gana. (Je n'ai pas faim.)
- No és veritat. (Ce n'est pas vrai.)

Négations spéciales :
- MAI : jamais → No vaig mai al gimnàs. (Je ne vais jamais au gym.)
- RES : rien → No menjo res. (Je ne mange rien.)
- NINGÚ : personne → No ve ningú. (Personne ne vient.)
- TAMPOC : non plus → Jo tampoc. (Moi non plus.)

Note : En catalan, la double négation est correcte et obligatoire avec MAI, RES, NINGÚ.`,
      en: `Negation in Catalan is simple: NO before the verb.

Structure: Subject + NO + verb + complement

Examples:
- No parlo anglès. (I don't speak English.)
- No tinc gana. (I'm not hungry.)
- No és veritat. (It's not true.)

Special negations:
- MAI: never → No vaig mai al gimnàs. (I never go to the gym.)
- RES: nothing → No menjo res. (I eat nothing.)
- NINGÚ: nobody → No ve ningú. (Nobody comes.)
- TAMPOC: neither → Jo tampoc. (Me neither.)

Note: In Catalan, double negation is correct and required with MAI, RES, NINGÚ.`,
    },
    examples: [
      { catalan: 'No entenc.', fr: 'Je ne comprends pas.', en: "I don't understand." },
      { catalan: 'No ho sé.', fr: 'Je ne sais pas.', en: "I don't know." },
      { catalan: 'No vull res.', fr: 'Je ne veux rien.', en: 'I want nothing.' },
      { catalan: 'No ve mai.', fr: 'Il ne vient jamais.', en: 'He never comes.' },
    ],
  },

  // ─── PRONOMS PERSONALS ────────────────────────────────────────────────────
  {
    id: 'pronoms-subjecte',
    title: { fr: 'Les pronoms sujets', en: 'Subject pronouns' },
    level: 'A1',
    summary: {
      fr: 'jo / tu / ell-ella / nosaltres / vosaltres / ells-elles',
      en: 'jo / tu / ell-ella / nosaltres / vosaltres / ells-elles',
    },
    explanation: {
      fr: `Les pronoms sujets du catalan :

SINGULIER :
- Jo = je
- Tu = tu
- Ell = il / Ella = elle
- Vostè = vous (formel)

PLURIEL :
- Nosaltres = nous
- Vosaltres = vous (pluriel)
- Ells = ils / Elles = elles
- Vostès = vous (pluriel formel)

Important : En catalan parlé, les pronoms sujets sont souvent omis car la conjugaison indique la personne. Mais ils s'utilisent pour insister ou clarifier.

Ex : (Jo) parlo català. = Je parle catalan. (le "jo" est optionnel)`,
      en: `Catalan subject pronouns:

SINGULAR:
- Jo = I
- Tu = you (informal)
- Ell = he / Ella = she
- Vostè = you (formal)

PLURAL:
- Nosaltres = we
- Vosaltres = you (plural)
- Ells = they (m) / Elles = they (f)
- Vostès = you (plural formal)

Important: In spoken Catalan, subject pronouns are often omitted since the conjugation indicates the person. They're used for emphasis or clarification.

Ex: (Jo) parlo català. = I speak Catalan. (the "jo" is optional)`,
    },
    examples: [
      { catalan: 'Jo sóc canadenc.', fr: 'Je suis canadien.', en: 'I am Canadian.' },
      { catalan: 'Tu parles molt bé!', fr: 'Tu parles très bien!', en: 'You speak very well!' },
      { catalan: 'Ell treballa a Barcelona.', fr: 'Il travaille à Barcelone.', en: 'He works in Barcelona.' },
      { catalan: 'Nosaltres anem al mercat.', fr: 'Nous allons au marché.', en: 'We go to the market.' },
    ],
  },

  // ─── PLURIEL ──────────────────────────────────────────────────────────────
  {
    id: 'plural',
    title: { fr: 'La formation du pluriel', en: 'Forming the plural' },
    level: 'A1',
    summary: {
      fr: 'Règles de formation du pluriel des noms',
      en: 'Rules for forming noun plurals',
    },
    explanation: {
      fr: `Formation du pluriel en catalan :

1. NOM TERMINÉ EN VOYELLE → ajouter -S :
   casa → cases, cotxe → cotxes, noi → nois

2. NOM TERMINÉ EN CONSONNE → ajouter -S :
   gat → gats, home → homes (attention : home → homes, pas *homs)

3. NOM TERMINÉ EN -S, -X, -Z, -ST, -SC → ajouter -OS :
   braç → braços, peix → peixos, gust → gustos

4. NOM TERMINÉ EN -IG → ajouter -S (prononciation change) :
   desig → desigs

Cas irréguliers courants :
- home (homme) → homes
- dona (femme) → dones`,
      en: `Forming plurals in Catalan:

1. NOUN ENDING IN A VOWEL → add -S:
   casa → cases, cotxe → cotxes, noi → nois

2. NOUN ENDING IN A CONSONANT → add -S:
   gat → gats, home → homes

3. NOUN ENDING IN -S, -X, -Z, -ST, -SC → add -OS:
   braç → braços, peix → peixos, gust → gustos

4. NOUN ENDING IN -IG → add -S:
   desig → desigs

Common irregular plurals:
- home (man) → homes
- dona (woman) → dones`,
    },
    examples: [
      { catalan: 'un gat / dos gats', fr: 'un chat / deux chats', en: 'one cat / two cats' },
      { catalan: 'una casa / tres cases', fr: 'une maison / trois maisons', en: 'one house / three houses' },
      { catalan: 'el peix / els peixos', fr: 'le poisson / les poissons', en: 'the fish / the fishes' },
      { catalan: 'un cotxe / molts cotxes', fr: 'une voiture / beaucoup de voitures', en: 'a car / many cars' },
    ],
  },

  // ─── ADJECTIFS ────────────────────────────────────────────────────────────
  {
    id: 'adjectius-acord',
    title: { fr: 'L\'accord des adjectifs', en: 'Adjective agreement' },
    level: 'A1',
    summary: {
      fr: 'L\'adjectif s\'accorde en genre et en nombre avec le nom',
      en: 'Adjectives agree in gender and number with the noun',
    },
    explanation: {
      fr: `En catalan, l'adjectif s'accorde avec le nom qu'il qualifie.

MASCULIN SING → FÉMININ SING :
- grand → gran (pas de changement — adjectifs en -an, -en, -in, -on, -un)
- bonic → bonica (ajout de -a)
- petit → petita (ajout de -a)
- bo → bona (irrégulier)

SINGULIER → PLURIEL :
- Masculin : gran → grans, bonic → bonics
- Féminin : gran → grans, bonica → boniques

L'adjectif se place généralement APRÈS le nom :
- un gat negre (un chat noir)
- una casa gran (une grande maison)

Quelques adjectifs peuvent se placer avant pour nuancer :
- un bon home (un homme bien) — différent de un home bo (un homme bon)`,
      en: `In Catalan, adjectives agree with the noun they describe.

MASCULINE SING → FEMININE SING:
- gran → gran (no change for -an, -en, -in, -on, -un endings)
- bonic → bonica (add -a)
- petit → petita (add -a)
- bo → bona (irregular)

SINGULAR → PLURAL:
- Masculine: gran → grans, bonic → bonics
- Feminine: gran → grans, bonica → boniques

Adjectives generally come AFTER the noun:
- un gat negre (a black cat)
- una casa gran (a big house)

Some adjectives can go before for nuance:
- un bon home (a good man) — different from un home bo (a good/kind man)`,
    },
    examples: [
      { catalan: 'un gat negre / una gata negra', fr: 'un chat noir / une chatte noire', en: 'a black cat (m/f)' },
      { catalan: 'un noi alt / una noia alta', fr: 'un grand garçon / une grande fille', en: 'a tall boy / girl' },
      { catalan: 'uns cotxes vermells', fr: 'des voitures rouges', en: 'red cars' },
      { catalan: 'unes cases boniques', fr: 'de belles maisons', en: 'beautiful houses' },
    ],
    tips: {
      fr: 'Certains adjectifs sont invariables en genre : gran, feliç, triste, jove.',
      en: 'Some adjectives are invariable in gender: gran, feliç, triste, jove.',
    },
  },

  // ─── AVOIR FAIM/SOIF/FROID... ─────────────────────────────────────────────
  {
    id: 'tenir-expressions',
    title: { fr: 'Les expressions avec TENIR', en: 'Expressions with TENIR' },
    level: 'A1',
    summary: {
      fr: 'Tenir gana, tenir set, tenir fred... — comme "avoir" en français',
      en: 'Tenir gana, tenir set, tenir fred... — like "avoir" in French',
    },
    explanation: {
      fr: `En catalan, plusieurs sensations s'expriment avec TENIR (avoir) + nom, comme en français.

Expressions essentielles :
- Tenir gana = avoir faim
- Tenir set = avoir soif
- Tenir fred = avoir froid
- Tenir calor = avoir chaud
- Tenir son = avoir sommeil
- Tenir por = avoir peur
- Tenir pressa = être pressé
- Tenir raó = avoir raison
- Tenir mal de cap = avoir mal à la tête

Structure : Subjet + TENIR (conjugué) + nom
Ex : Tinc gana. (J'ai faim.) / Tens set? (Tu as soif?)`,
      en: `In Catalan, several sensations are expressed with TENIR (to have) + noun, like in French.

Essential expressions:
- Tenir gana = to be hungry
- Tenir set = to be thirsty
- Tenir fred = to be cold
- Tenir calor = to be hot
- Tenir son = to be sleepy
- Tenir por = to be afraid
- Tenir pressa = to be in a hurry
- Tenir raó = to be right
- Tenir mal de cap = to have a headache

Structure: Subject + TENIR (conjugated) + noun
Ex: Tinc gana. (I'm hungry.) / Tens set? (Are you thirsty?)`,
    },
    examples: [
      { catalan: 'Tinc molt de fred.', fr: "J'ai très froid.", en: "I'm very cold." },
      { catalan: 'Tens son?', fr: 'Tu as sommeil ?', en: 'Are you sleepy?' },
      { catalan: 'Ella té por dels gossos.', fr: 'Elle a peur des chiens.', en: "She's afraid of dogs." },
      { catalan: 'Tenim molta pressa.', fr: 'Nous sommes très pressés.', en: "We're in a big hurry." },
    ],
  },

  // ─── PRÉPOSITIONS ─────────────────────────────────────────────────────────
  {
    id: 'preposicions',
    title: { fr: 'Les prépositions essentielles', en: 'Essential prepositions' },
    level: 'A2',
    summary: {
      fr: 'A, de, en, amb, per, per a, cap a, fins a...',
      en: 'A, de, en, amb, per, per a, cap a, fins a...',
    },
    explanation: {
      fr: `Prépositions essentielles du catalan :

A — à, dans (lieu) :
- Visc a Barcelona. (J'habite à Barcelone.)
- Vaig a casa. (Je vais à la maison.)
- A + EL = AL : Vaig al mercat. (Je vais au marché.)
- A + ELS = ALS : Vaig als cinemes. (Je vais aux cinémas.)

DE — de (origine, possession) :
- Sóc de Montreal. (Je suis de Montréal.)
- La casa de la Maria. (La maison de Maria.)
- DE + EL = DEL : El cotxe del meu pare. (La voiture de mon père.)

AMB — avec :
- Vinc amb tu. (Je viens avec toi.)

PER — pour (motif, cause) / PER A — pour (destinataire) :
- Ho faig per tu. (Je le fais pour toi — grâce à toi)
- Ho faig per a tu. (Je le fais pour toi — c'est pour toi)

EN — en (temps, moyen de transport) :
- En cotxe. (En voiture.) / En dos minuts. (En deux minutes.)

FINS A — jusqu'à : Fins a la plaça. (Jusqu'à la place.)
CAP A — vers : Cap a casa. (Vers la maison.)`,
      en: `Essential Catalan prepositions:

A — at, to, in (location):
- Visc a Barcelona. (I live in Barcelona.)
- Vaig a casa. (I'm going home.)
- A + EL = AL: Vaig al mercat. (I'm going to the market.)
- A + ELS = ALS: Vaig als cinemes. (I'm going to the cinemas.)

DE — of, from (origin, possession):
- Sóc de Montreal. (I'm from Montreal.)
- La casa de la Maria. (Maria's house.)
- DE + EL = DEL: El cotxe del meu pare. (My father's car.)

AMB — with:
- Vinc amb tu. (I'm coming with you.)

PER — for (reason, cause) / PER A — for (recipient):
- Ho faig per tu. (I do it because of you)
- Ho faig per a tu. (I do it for you — it's for you)

EN — in (time, transport):
- En cotxe. (By car.) / En dos minuts. (In two minutes.)

FINS A — until, up to: Fins a la plaça. (Until the square.)
CAP A — towards: Cap a casa. (Towards home.)`,
    },
    examples: [
      { catalan: 'Vaig al supermercat.', fr: 'Je vais au supermarché.', en: "I'm going to the supermarket." },
      { catalan: 'Vinc del treball.', fr: 'Je viens du travail.', en: "I'm coming from work." },
      { catalan: 'Parlo amb la meva parella.', fr: 'Je parle avec mon/ma partenaire.', en: "I'm talking with my partner." },
      { catalan: 'Arribo en deu minuts.', fr: "J'arrive dans dix minutes.", en: 'I arrive in ten minutes.' },
    ],
  },
]; 
