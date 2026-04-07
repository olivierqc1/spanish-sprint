// src/data/catalan/pronunciation.ts
// Guide de prononciation du catalan — FR et EN

export interface PronunciationRule {
  id: string;
  title: { fr: string; en: string };
  symbol: string;
  description: { fr: string; en: string };
  examples: Array<{ word: string; ipa?: string; fr: string; en: string }>;
  tips?: { fr: string; en: string };
}

export const catalanPronunciationRules: PronunciationRule[] = [

  // ─── VOYELLES ─────────────────────────────────────────────────────────────
  {
    id: 'vocal-a',
    title: { fr: 'La voyelle A', en: 'The vowel A' },
    symbol: 'a / ə',
    description: {
      fr: `En catalan, le A se prononce différemment selon sa position :

- A TONIQUE (syllabe accentuée) : son "a" ouvert, comme en français dans "patte"
  Ex : casa [kaza], taula [taula]

- A ATONE (syllabe non accentuée) : son "e" réduit, comme le schwa anglais
  Ex : porta [pɔrtə], casa se dit [kazə] (le dernier a est réduit)

C'est une des grandes difficultés du catalan : les voyelles atones se réduisent.
A et E atones → schwa [ə]`,
      en: `In Catalan, A is pronounced differently depending on its position:

- STRESSED A (accented syllable): open "a" sound, like in English "father"
  Ex: casa [kaza], taula [taula]

- UNSTRESSED A (unaccented syllable): reduced "e" sound, like English schwa
  Ex: porta [pɔrtə], the final a in casa is [ə]

This is one of Catalan's main difficulties: unstressed vowels reduce.
Unstressed A and E → schwa [ə]`,
    },
    examples: [
      { word: 'taula', ipa: '[taulə]', fr: 'table', en: 'table' },
      { word: 'casa', ipa: '[kazə]', fr: 'maison', en: 'house' },
      { word: 'parla', ipa: '[parlə]', fr: 'il/elle parle', en: 'he/she speaks' },
    ],
    tips: {
      fr: 'Écoute les Barcelonins — le A final de beaucoup de mots sonne comme "e".',
      en: 'Listen to Barcelona locals — the final A of many words sounds like "e".',
    },
  },

  {
    id: 'vocal-e',
    title: { fr: 'La voyelle E', en: 'The vowel E' },
    symbol: 'e / ɛ / ə',
    description: {
      fr: `Le E catalan a trois prononciations possibles :

1. E FERMÉ [e] : comme le é français → bé (bien), tres (trois)
2. E OUVERT [ɛ] : comme le è français → mel (miel), terra (terre)
3. E ATONE [ə] : réduit comme le A atone → pares (parents)

La distinction fermé/ouvert dépend du dialecte et du mot.
En barcelonais (catalan central), cette distinction est maintenue.`,
      en: `Catalan E has three possible pronunciations:

1. CLOSED E [e]: like French é → bé (good), tres (three)
2. OPEN E [ɛ]: like French è → mel (honey), terra (land)
3. UNSTRESSED E [ə]: reduced → pares (parents)

The closed/open distinction depends on dialect and word.
In Barcelonan (central Catalan), this distinction is maintained.`,
    },
    examples: [
      { word: 'bé', ipa: '[be]', fr: 'bien', en: 'well / good' },
      { word: 'mel', ipa: '[mɛl]', fr: 'miel', en: 'honey' },
      { word: 'terra', ipa: '[tɛrə]', fr: 'terre', en: 'earth / land' },
    ],
  },

  // ─── CONSONNES SPÉCIALES ──────────────────────────────────────────────────
  {
    id: 'll-l',
    title: { fr: 'L et LL — la L geminada', en: 'L and LL — the geminated L' },
    symbol: 'l·l',
    description: {
      fr: `Le catalan distingue trois sons liés à la lettre L :

1. L simple : son "l" normal → la (la), llet (lait)

2. LL (L mouillée) : son "y/ll" comme en espagnol → lluna (lune), llegir (lire)
   En catalan central, LL se prononce comme "j" en français (pas comme l'espagnol)

3. L·L (L geminada — L double avec point médian) : double L articulée
   → col·legi [kol·le'ʒi] (collège), intel·ligent (intelligent)
   C'est une L longue, clairement distincte.

Astuce : L·L ressemble à la double-L italienne dans "mille".`,
      en: `Catalan distinguishes three L-related sounds:

1. Simple L: normal "l" sound → la (the), llet (milk)

2. LL (palatal L): in central Catalan, pronounced like French "j" (not like Spanish)
   → lluna (moon), llegir (to read)

3. L·L (geminated L — double L with middle dot): double articulated L
   → col·legi [kol·le'ʒi] (college), intel·ligent (intelligent)
   It's a long L, clearly distinct.

Tip: L·L resembles the double-L in Italian "mille".`,
    },
    examples: [
      { word: 'lluna', ipa: '[ʎunə]', fr: 'lune', en: 'moon' },
      { word: 'llegir', ipa: '[ʎəʒi]', fr: 'lire', en: 'to read' },
      { word: 'col·legi', ipa: '[kol·leʒi]', fr: 'collège', en: 'school / college' },
      { word: 'paral·lel', ipa: '[pəral·lɛl]', fr: 'parallèle', en: 'parallel' },
    ],
  },

  {
    id: 'ny',
    title: { fr: 'NY — le son gn/ni', en: 'NY — the gn/ni sound' },
    symbol: 'ny',
    description: {
      fr: `NY en catalan se prononce comme le "gn" français dans "agneau" ou le "ni" dans "montagne".

C'est l'équivalent du ñ espagnol ou du gn italien.

Exemples :
- any (année) → [aɲ]
- Catalunya → [kətaluɲə]
- senyor (monsieur) → [səɲo]`,
      en: `NY in Catalan is pronounced like "ny" in "canyon" or "ni" in "onion".

It's equivalent to Spanish ñ or Italian gn.

Examples:
- any (year) → [aɲ]
- Catalunya → [kətaluɲə]
- senyor (mister) → [səɲo]`,
    },
    examples: [
      { word: 'any', ipa: '[aɲ]', fr: 'an / année', en: 'year' },
      { word: 'bany', ipa: '[baɲ]', fr: 'bain / salle de bain', en: 'bath / bathroom' },
      { word: 'senyor', ipa: '[səɲo]', fr: 'monsieur', en: 'mister / sir' },
      { word: 'Catalunya', ipa: '[kətaluɲə]', fr: 'Catalogne', en: 'Catalonia' },
    ],
  },

  {
    id: 'tx-tg',
    title: { fr: 'TX et TG — le son "tch"', en: 'TX and TG — the "ch" sound' },
    symbol: 'tx / tg',
    description: {
      fr: `TX et TG se prononcent tous les deux comme "tch" (affriquée palatale sourde).

TX : devant toutes les voyelles → cotxe, fletxa
TG : devant e et i uniquement → metge, viatge

Exemples :
- cotxe (voiture) → [koʧə]
- metge (médecin) → [meʧə]
- viatge (voyage) → [bjaʧə]
- fletxa (flèche) → [fleʧə]`,
      en: `TX and TG are both pronounced like "ch" in "church" (voiceless palatal affricate).

TX: before any vowel → cotxe, fletxa
TG: before e and i only → metge, viatge

Examples:
- cotxe (car) → [koʧə]
- metge (doctor) → [meʧə]
- viatge (journey) → [bjaʧə]
- fletxa (arrow) → [fleʧə]`,
    },
    examples: [
      { word: 'cotxe', ipa: '[koʧə]', fr: 'voiture', en: 'car' },
      { word: 'metge', ipa: '[meʧə]', fr: 'médecin', en: 'doctor' },
      { word: 'viatge', ipa: '[bjaʧə]', fr: 'voyage', en: 'journey / trip' },
      { word: 'despatx', ipa: '[dəspaʧ]', fr: 'bureau', en: 'office' },
    ],
  },

  {
    id: 'ig',
    title: { fr: 'IG final — le son "tch"', en: 'Final IG — the "ch" sound' },
    symbol: '-ig',
    description: {
      fr: `La terminaison -IG en fin de mot se prononce "tch" comme TX et TG.

C'est une particularité orthographique du catalan.

Exemples :
- mig (demi) → [miʧ]
- lleig (laid) → [ʎeʧ]
- passeig (promenade) → [pəseʧ]
- desig (désir) → [dəziʧ]`,
      en: `The ending -IG at the end of a word is pronounced "ch" like TX and TG.

This is an orthographic particularity of Catalan.

Examples:
- mig (half) → [miʧ]
- lleig (ugly) → [ʎeʧ]
- passeig (promenade) → [pəseʧ]
- desig (desire) → [dəziʧ]`,
    },
    examples: [
      { word: 'mig', ipa: '[miʧ]', fr: 'demi / mi-', en: 'half' },
      { word: 'lleig', ipa: '[ʎeʧ]', fr: 'laid / moche', en: 'ugly' },
      { word: 'passeig', ipa: '[pəseʧ]', fr: 'promenade', en: 'promenade / walk' },
    ],
  },

  {
    id: 'ce-ci',
    title: { fr: 'C devant E et I', en: 'C before E and I' },
    symbol: 'c (+ e/i)',
    description: {
      fr: `En catalan, C devant E ou I se prononce "s" (comme en français).

- CE → [sə] : cel (ciel), cerca (chercher)
- CI → [si] : cinema, civil

C devant A, O, U se prononce "k" :
- casa [kaza], cotxe [koʧə], curs [kurs]

La cédille (ç) se prononce toujours "s" :
- plaça [plasə], braç [bras]`,
      en: `In Catalan, C before E or I is pronounced "s".

- CE → [sə]: cel (sky), cerca (search)
- CI → [si]: cinema, civil

C before A, O, U is pronounced "k":
- casa [kaza], cotxe [koʧə], curs [kurs]

The cedilla (ç) is always pronounced "s":
- plaça [plasə], braç [bras]`,
    },
    examples: [
      { word: 'cel', ipa: '[sɛl]', fr: 'ciel', en: 'sky' },
      { word: 'plaça', ipa: '[plasə]', fr: 'place', en: 'square' },
      { word: 'braç', ipa: '[bras]', fr: 'bras', en: 'arm' },
      { word: 'cerca', ipa: '[sɛrkə]', fr: 'cherche', en: 'searches / looks for' },
    ],
  },

  {
    id: 'consonants-finals',
    title: { fr: 'Les consonnes finales', en: 'Final consonants' },
    symbol: 'B/P, D/T, G/K',
    description: {
      fr: `En catalan, les consonnes finales sont sonorisées ou assourdies :

ASSORDIMENT (finale) : les consonnes sonores deviennent sourdes en fin de mot :
- B → P : club [klup], arab [ɛrap]
- D → T : fred [frɛt] (froid), amic → amics
- G → K : llarg [ʎark] (long), greig [ɡreik]
- V → F : actiu [əktif] (actif)
- Z → S : realitz [rəəlits]

Cela signifie que "fred" (froid) se prononce [frɛt] avec un T final.
Et "llarg" (long) se prononce [ʎark] avec un K.`,
      en: `In Catalan, final consonants are devoiced:

DEVOICING (final position): voiced consonants become voiceless at end of word:
- B → P: club [klup], arab [ɛrap]
- D → T: fred [frɛt] (cold), amic → amics
- G → K: llarg [ʎark] (long)
- V → F: actiu [əktif] (active)
- Z → S: realitz [rəəlits]

So "fred" (cold) is pronounced [frɛt] with a final T.
And "llarg" (long) is pronounced [ʎark] with a final K.`,
    },
    examples: [
      { word: 'fred', ipa: '[frɛt]', fr: 'froid', en: 'cold' },
      { word: 'llarg', ipa: '[ʎark]', fr: 'long', en: 'long' },
      { word: 'club', ipa: '[klup]', fr: 'club', en: 'club' },
      { word: 'sud', ipa: '[sut]', fr: 'sud', en: 'south' },
    ],
    tips: {
      fr: 'Les paires minimal: fred/fret (froid/direct) — se prononcent pareil !',
      en: 'Minimal pairs: fred/fret (cold/fast) can sound similar — context matters!',
    },
  },

  {
    id: 'accent-tonic',
    title: { fr: 'L\'accent tonique', en: 'Stress accent' },
    symbol: "accent",
    description: {
      fr: `En catalan, l'accent aigu (é) et l'accent grave (è, à) servent à indiquer :

1. La voyelle accentuée quand elle n'est pas à sa position habituelle
2. La qualité de la voyelle (ouverte ou fermée)

Règles générales d'accentuation (sans accent écrit) :
- Mots finissant en voyelle, -en, -es : accent sur l'avant-dernière syllabe
  Ex : taula [TAU-la], parlen [PAR-len]
- Mots finissant en consonne (sauf -en, -es) : accent sur la dernière syllabe
  Ex : català [ca-ta-LA], camí [ca-MI]

L'accent écrit indique une exception à ces règles ou distingue des homophones.
Ex : sóc (je suis) vs soc (socle), és (il est) vs es (pronom)`,
      en: `In Catalan, the acute accent (é) and grave accent (è, à) indicate:

1. The stressed vowel when it's not in its default position
2. The vowel quality (open or closed)

General stress rules (without written accent):
- Words ending in vowel, -en, -es: stress on second-to-last syllable
  Ex: taula [TAU-la], parlen [PAR-len]
- Words ending in consonant (except -en, -es): stress on last syllable
  Ex: català [ca-ta-LA], camí [ca-MI]

Written accent marks an exception or distinguishes homophones.
Ex: sóc (I am) vs soc (base), és (he/she is) vs es (pronoun)`,
    },
    examples: [
      { word: 'català', ipa: '[kəta.LA]', fr: 'catalan', en: 'Catalan' },
      { word: 'àpat', ipa: "[A.pət]", fr: 'repas', en: 'meal' },
      { word: 'café', ipa: '[kə.FE]', fr: 'café', en: 'coffee shop' },
      { word: 'música', ipa: "[MU.zi.kə]", fr: 'musique', en: 'music' },
    ],
  },
];
