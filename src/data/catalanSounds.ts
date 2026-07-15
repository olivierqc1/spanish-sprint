// src/data/catalanSounds.ts
// Guide des sons catalans pour francophones.
// POUR AJOUTER DES SONS : ajoute une regle dans le bon groupe (ou un nouveau groupe).
// approx = prononciation approximative "a la francaise" affichee sous le mot.

export interface SoundExample {
  word: string;    // mot catalan
  approx: string;  // prononciation approximative pour un francophone
  fr: string;      // traduction
}

export interface SoundRule {
  id: string;
  title: string;   // la regle
  sound: string;   // le son produit
  tip: string;     // explication / truc mnemotechnique
  examples: SoundExample[];
}

export interface SoundGroup {
  id: string;
  icon: string;
  name: string;
  rules: SoundRule[];
}

export const catalanSounds: SoundGroup[] = [
  {
    id: 'gu-qu',
    icon: '🔑',
    name: 'GU et QU — u muette ou pas?',
    rules: [
      {
        id: 'gu-ei',
        title: 'GU + e/i → « g » dur, u MUETTE',
        sound: '/g/ comme dans « gare »',
        tip: "Comme en francais « guerre, guitare » : le u ne sert qu'a durcir le g.",
        examples: [
          { word: 'guerra', approx: 'guè-rra', fr: 'guerre' },
          { word: 'guia', approx: 'gui-e', fr: 'guide' },
          { word: 'guitarra', approx: 'gui-ta-rra', fr: 'guitare' },
          { word: 'aconseguir', approx: 'e-koun-se-gui', fr: 'obtenir' },
        ],
      },
      {
        id: 'gu-ao',
        title: 'GU + a/o → « gw », u PRONONCEE',
        sound: '/gw/ comme dans « Guadeloupe »',
        tip: 'Devant a ou o, le u se prononce toujours.',
        examples: [
          { word: 'guants', approx: 'gwans', fr: 'gants' },
          { word: 'aigua', approx: 'aï-gwe', fr: 'eau' },
          { word: 'guanyar', approx: 'gwe-gna', fr: 'gagner' },
          { word: 'llenguatge', approx: 'llen-gwad-je', fr: 'langage' },
        ],
      },
      {
        id: 'gu-trema',
        title: 'GÜ + e/i (trema) → « gw » quand meme',
        sound: '/gw/ — le trema « reveille » le u',
        tip: 'Le trema (¨) force la prononciation du u devant e/i.',
        examples: [
          { word: 'pingüí', approx: 'pin-gwi', fr: 'pingouin' },
          { word: 'llengües', approx: 'llen-gwes', fr: 'langues' },
          { word: 'aigüera', approx: 'aï-gwé-re', fr: 'evier' },
        ],
      },
      {
        id: 'qu-ei',
        title: 'QU + e/i → « k », u muette',
        sound: '/k/ comme dans « qui »',
        tip: 'Meme logique que gu : que/qui = ke/ki.',
        examples: [
          { word: 'què', approx: 'kè', fr: 'quoi' },
          { word: 'aquí', approx: 'e-ki', fr: 'ici' },
          { word: 'perquè', approx: 'per-kè', fr: 'parce que' },
        ],
      },
      {
        id: 'qu-ao',
        title: 'QU + a/o → « kw », u prononcee',
        sound: '/kw/ comme dans « aquarium »',
        tip: 'quatre = KWA-tre, pas « katre » !',
        examples: [
          { word: 'quatre', approx: 'kwa-tre', fr: 'quatre' },
          { word: 'quan', approx: 'kwan', fr: 'quand' },
          { word: 'quaranta', approx: 'kwe-ran-te', fr: 'quarante' },
        ],
      },
    ],
  },
  {
    id: 'g-j',
    icon: '🧀',
    name: 'G doux, J, TG/TJ',
    rules: [
      {
        id: 'g-ei',
        title: 'G + e/i → « j » francais',
        sound: '/ʒ/ comme dans « jour »',
        tip: 'gent = « jenn », exactement comme le francais « gens ».',
        examples: [
          { word: 'gent', approx: 'jenn', fr: 'gens' },
          { word: 'girar', approx: 'ji-ra', fr: 'tourner' },
          { word: 'genoll', approx: 'je-noll', fr: 'genou' },
        ],
      },
      {
        id: 'j-tout',
        title: 'J → toujours « j » francais',
        sound: '/ʒ/ — jamais la jota espagnole !',
        tip: "Gros piege si tu viens de l'espagnol : jo = « jou », pas « rro ».",
        examples: [
          { word: 'jo', approx: 'jou', fr: 'je / moi' },
          { word: 'jugar', approx: 'ju-ga', fr: 'jouer' },
          { word: 'juliol', approx: 'ju-li-ol', fr: 'juillet' },
        ],
      },
      {
        id: 'tg-tj',
        title: 'TG / TJ → « dj »',
        sound: '/dʒ/ comme dans « Djibouti »',
        tip: 'formatge = for-MAD-je, platja = PLAD-je.',
        examples: [
          { word: 'formatge', approx: 'four-mad-je', fr: 'fromage' },
          { word: 'platja', approx: 'plad-je', fr: 'plage' },
          { word: 'viatge', approx: 'bi-ad-je', fr: 'voyage' },
        ],
      },
    ],
  },
  {
    id: 'x-sons',
    icon: '❌',
    name: 'X — le son « ch »',
    rules: [
      {
        id: 'x-ch',
        title: 'X en debut de mot ou apres consonne → « ch »',
        sound: '/ʃ/ comme dans « chat »',
        tip: 'xandall = CHan-dall, Xavier = CHa-vier.',
        examples: [
          { word: 'xandall', approx: 'chen-dall', fr: 'survetement' },
          { word: 'xocolata', approx: 'chou-kou-la-te', fr: 'chocolat' },
          { word: 'xarxa', approx: 'char-che', fr: 'reseau / filet' },
        ],
      },
      {
        id: 'ix',
        title: '-IX- apres voyelle → « ch » (le i est quasi muet)',
        sound: '/ʃ/',
        tip: 'caixa = KA-che, baix = « bach ». Le i adoucit, on ne le detache pas.',
        examples: [
          { word: 'caixa', approx: 'ka-che', fr: 'caisse / boite' },
          { word: 'baix', approx: 'bach', fr: 'bas' },
          { word: 'conèixer', approx: 'kou-nè-che', fr: 'connaitre' },
        ],
      },
      {
        id: 'tx',
        title: 'TX → « tch »',
        sound: '/tʃ/ comme dans « tchèque »',
        tip: 'cotxe = KOT-che. En fin de mot aussi : despatx.',
        examples: [
          { word: 'cotxe', approx: 'kot-che', fr: 'voiture' },
          { word: 'caputxa', approx: 'ke-pout-che', fr: 'capuche' },
          { word: 'despatx', approx: 'des-patch', fr: 'bureau' },
        ],
      },
      {
        id: 'x-ks',
        title: 'X → « ks » dans les mots savants',
        sound: '/ks/',
        tip: 'taxi, èxit, examen — comme en francais.',
        examples: [
          { word: 'taxi', approx: 'tak-si', fr: 'taxi' },
          { word: 'èxit', approx: 'èk-sit', fr: 'succes' },
        ],
      },
      {
        id: 'ig-final',
        title: '-IG final → « tch »',
        sound: '/tʃ/',
        tip: 'maig = « match », puig = « poutch ». Tres surprenant au debut !',
        examples: [
          { word: 'maig', approx: 'match', fr: 'mai' },
          { word: 'mig', approx: 'mitch', fr: 'demi' },
          { word: 'safareig', approx: 'se-fe-retch', fr: 'salle de lavage' },
        ],
      },
    ],
  },
  {
    id: 'voyelles',
    icon: '🎵',
    name: 'Voyelles atones — la musique du catalan',
    rules: [
      {
        id: 'neutra',
        title: 'A / E atones → vocal neutra « e » sourd',
        sound: '/ə/ comme le e de « petit »',
        tip: "LA regle d'or de Barcelone : hors accent tonique, a et e deviennent le meme son neutre. casa = KA-ze.",
        examples: [
          { word: 'casa', approx: 'ka-ze', fr: 'maison' },
          { word: 'pare', approx: 'pa-re', fr: 'pere' },
          { word: 'Barcelona', approx: 'ber-se-lo-ne', fr: 'Barcelone' },
        ],
      },
      {
        id: 'o-atone',
        title: 'O atone → « ou »',
        sound: '/u/',
        tip: 'Hors accent tonique, o se prononce ou : posar = pou-ZA, Josep = Jou-ZÈP.',
        examples: [
          { word: 'posar', approx: 'pou-za', fr: 'mettre' },
          { word: 'dormir', approx: 'dour-mi', fr: 'dormir' },
          { word: 'content', approx: 'koun-tenn', fr: 'content' },
        ],
      },
    ],
  },
  {
    id: 'consonnes-finales',
    icon: '🤫',
    name: 'Lettres muettes en fin de mot',
    rules: [
      {
        id: 'r-final',
        title: 'R final des infinitifs → muet',
        sound: '(rien)',
        tip: 'parlar = par-LA, primer = pri-MÈ. Le r final se tait presque toujours.',
        examples: [
          { word: 'parlar', approx: 'per-la', fr: 'parler' },
          { word: 'menjar', approx: 'men-ja', fr: 'manger' },
          { word: 'primer', approx: 'pri-mè', fr: 'premier' },
        ],
      },
      {
        id: 't-final',
        title: 'T final apres N ou L → muet',
        sound: '(rien)',
        tip: 'molt = « mol », vint = « bin », sant = « san ».',
        examples: [
          { word: 'molt', approx: 'mol', fr: 'beaucoup' },
          { word: 'vint', approx: 'bin', fr: 'vingt' },
          { word: 'davant', approx: 'de-van', fr: 'devant' },
        ],
      },
    ],
  },
  {
    id: 'll-ny',
    icon: '👅',
    name: 'LL, L·L, NY et les autres',
    rules: [
      {
        id: 'll',
        title: 'LL → « ill » mouille',
        sound: '/ʎ/ comme dans « million » bien articule',
        tip: 'lluna = LLU-ne. Different du l simple, la langue touche le palais.',
        examples: [
          { word: 'lluna', approx: 'llu-ne', fr: 'lune' },
          { word: 'ull', approx: 'oull', fr: 'oeil' },
          { word: 'treball', approx: 'tre-ball', fr: 'travail' },
        ],
      },
      {
        id: 'ela-geminada',
        title: 'L·L (point volat) → l simple allonge',
        sound: '/l:/ — PAS mouille',
        tip: 'col·legi = kou-LÈ-ji. Le point separe : ce ne sont pas deux ll !',
        examples: [
          { word: 'col·legi', approx: 'kou-lè-ji', fr: 'ecole / college' },
          { word: 'il·lusió', approx: 'i-lu-zi-o', fr: 'illusion / joie' },
        ],
      },
      {
        id: 'ny',
        title: 'NY → « gn » francais',
        sound: '/ɲ/ comme dans « agneau »',
        tip: "C'est le ñ espagnol ecrit ny : Catalunya = ka-te-LOU-gne.",
        examples: [
          { word: 'Catalunya', approx: 'ke-te-lou-gne', fr: 'Catalogne' },
          { word: 'any', approx: 'agn', fr: 'annee' },
          { word: 'senyor', approx: 'se-gno', fr: 'monsieur' },
        ],
      },
      {
        id: 'b-v',
        title: 'B et V → meme son « b »',
        sound: '/b/ (betacisme)',
        tip: 'vi (vin) = « bi », cavall = ke-BALL. Comme en espagnol.',
        examples: [
          { word: 'vi', approx: 'bi', fr: 'vin' },
          { word: 'cavall', approx: 'ke-ball', fr: 'cheval' },
          { word: 'vambes', approx: 'bam-bes', fr: 'baskets' },
        ],
      },
      {
        id: 's-z',
        title: 'S entre voyelles → « z » / SS → « s »',
        sound: '/z/ vs /s/',
        tip: 'casa = ka-ZE mais tassa = ta-SSE. Comme en francais : poison / poisson.',
        examples: [
          { word: 'casa', approx: 'ka-ze', fr: 'maison' },
          { word: 'cosa', approx: 'ko-ze', fr: 'chose' },
          { word: 'tassa', approx: 'ta-sse', fr: 'tasse' },
        ],
      },
    ],
  },
];
