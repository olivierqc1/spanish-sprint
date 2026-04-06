// src/components/Conjugation.tsx
"use client";

import { useState, useEffect } from 'react';

type Props = {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'ALL';
  country: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION CATALAN
// ─────────────────────────────────────────────────────────────────────────────

const CAT_PRONOUNS = ['jo', 'tu', 'ell/ella', 'nosaltres', 'vosaltres', 'ells/elles'];

const CAT_GROUPS = {
  fr: [
    {
      name: 'Groupe 1 — verbes en -AR',
      color: '#3b82f6',
      desc: 'Le plus courant. Présent : -o, -es, -a, -em, -eu, -en. Imparfait : -ava/-aves/-ava/-àvem/-àveu/-aven.',
      examples: ['parlar (parler)', 'treballar (travailler)', 'comprar (acheter)', 'estudiar (étudier)'],
      verb: 'parlar',
      conj: {
        present:   ['parlo','parles','parla','parlem','parleu','parlen'],
        imperfect: ['parlava','parlaves','parlava','parlàvem','parlàveu','parlaven'],
        future:    ['parlaré','parlaràs','parlarà','parlarem','parlareu','parlaran'],
        periphrastic: ['vaig parlar','vas parlar','va parlar','vam parlar','vau parlar','van parlar'],
      },
    },
    {
      name: 'Groupe 2 — verbes en -RE / -ER',
      color: '#10b981',
      desc: 'Présent : -o, -s, Ø (3e sg sans terminaison), -em, -eu, -en. Imparfait : -ia/-ies/-ia/-íem/-íeu/-ien.',
      examples: ['beure (boire)', 'viure (vivre)', 'vendre (vendre)', 'córrer (courir)'],
      verb: 'beure',
      conj: {
        present:   ['bec','beus','beu','bevem','beveu','beuen'],
        imperfect: ['bevia','bevies','bevia','bevíem','bevíeu','bevien'],
        future:    ['beuré','beuràs','beurà','beurem','beureu','beuran'],
        periphrastic: ['vaig beure','vas beure','va beure','vam beure','vau beure','van beure'],
      },
    },
    {
      name: 'Groupe 3 — verbes en -IR',
      color: '#f59e0b',
      desc: '2 sous-groupes : (a) PUR — dormir, sortir → -o/-s/Ø/-im/-iu/-en. (b) INCOATIF (majorité) — llegir, patir → -eixo/-eixes/-eix/-im/-iu/-eixen. L\'infixe -eix- apparaît au singulier et 3e pluriel.',
      examples: ['dormir (dormir) — pur', 'sortir (sortir) — pur', 'llegir (lire) — incoatif', 'servir (servir) — incoatif'],
      verb: 'llegir (incoatif)',
      conj: {
        present:   ['llegeixo','llegeixes','llegeix','llegim','llegiu','llegeixen'],
        imperfect: ['llegia','llegies','llegia','llegíem','llegíeu','llegien'],
        future:    ['llegiré','llegiràs','llegirà','llegirem','llegireu','llegiran'],
        periphrastic: ['vaig llegir','vas llegir','va llegir','vam llegir','vau llegir','van llegir'],
      },
    },
  ],
  en: [
    {
      name: 'Group 1 — -AR verbs',
      color: '#3b82f6',
      desc: 'Most common. Present: -o, -es, -a, -em, -eu, -en. Imperfect: -ava/-aves/-ava/-àvem/-àveu/-aven.',
      examples: ['parlar (to speak)', 'treballar (to work)', 'comprar (to buy)', 'estudiar (to study)'],
      verb: 'parlar',
      conj: {
        present:   ['parlo','parles','parla','parlem','parleu','parlen'],
        imperfect: ['parlava','parlaves','parlava','parlàvem','parlàveu','parlaven'],
        future:    ['parlaré','parlaràs','parlarà','parlarem','parlareu','parlaran'],
        periphrastic: ['vaig parlar','vas parlar','va parlar','vam parlar','vau parlar','van parlar'],
      },
    },
    {
      name: 'Group 2 — -RE / -ER verbs',
      color: '#10b981',
      desc: 'Present: -o, -s, Ø (3rd sg no ending), -em, -eu, -en. Imperfect: -ia/-ies/-ia/-íem/-íeu/-ien.',
      examples: ['beure (to drink)', 'viure (to live)', 'vendre (to sell)', 'córrer (to run)'],
      verb: 'beure',
      conj: {
        present:   ['bec','beus','beu','bevem','beveu','beuen'],
        imperfect: ['bevia','bevies','bevia','bevíem','bevíeu','bevien'],
        future:    ['beuré','beuràs','beurà','beurem','beureu','beuran'],
        periphrastic: ['vaig beure','vas beure','va beure','vam beure','vau beure','van beure'],
      },
    },
    {
      name: 'Group 3 — -IR verbs',
      color: '#f59e0b',
      desc: '2 subgroups: (a) PURE — dormir, sortir → -o/-s/Ø/-im/-iu/-en. (b) INCHOATIVE (majority) — llegir, patir → -eixo/-eixes/-eix/-im/-iu/-eixen. The -eix- infix appears in singular + 3rd plural.',
      examples: ['dormir (to sleep) — pure', 'sortir (to go out) — pure', 'llegir (to read) — inchoative', 'servir (to serve) — inchoative'],
      verb: 'llegir (inchoative)',
      conj: {
        present:   ['llegeixo','llegeixes','llegeix','llegim','llegiu','llegeixen'],
        imperfect: ['llegia','llegies','llegia','llegíem','llegíeu','llegien'],
        future:    ['llegiré','llegiràs','llegirà','llegirem','llegireu','llegiran'],
        periphrastic: ['vaig llegir','vas llegir','va llegir','vam llegir','vau llegir','van llegir'],
      },
    },
  ],
};

const CAT_IRREGULARS = [
  { verb: 'ser',    fr: 'être (identité)',  en: 'to be (identity)',  present: ['sóc','ets','és','som','sou','són'],          note: 'Entièrement irrégulier' },
  { verb: 'estar',  fr: 'être (état/lieu)', en: 'to be (state/loc)',  present: ['estic','estàs','està','estem','esteu','estan'], note: 'Irrégulier au singulier' },
  { verb: 'tenir',  fr: 'avoir',            en: 'to have',           present: ['tinc','tens','té','tenim','teniu','tenen'],    note: 'tinc / té' },
  { verb: 'anar',   fr: 'aller',            en: 'to go',             present: ['vaig','vas','va','anem','aneu','van'],         note: 'Base du passé périphrastique' },
  { verb: 'fer',    fr: 'faire',            en: 'to do/make',        present: ['faig','fas','fa','fem','feu','fan'],           note: 'faig (1sg)' },
  { verb: 'voler',  fr: 'vouloir',          en: 'to want',           present: ['vull','vols','vol','volem','voleu','volen'],   note: 'vull (1sg)' },
  { verb: 'poder',  fr: 'pouvoir',          en: 'can',               present: ['puc','pots','pot','podem','podeu','poden'],    note: 'puc (1sg)' },
  { verb: 'saber',  fr: 'savoir',           en: 'to know',           present: ['sé','saps','sap','sabem','sabeu','saben'],     note: 'sé (1sg)' },
  { verb: 'venir',  fr: 'venir',            en: 'to come',           present: ['vinc','véns','ve','venim','veniu','vénen'],    note: 'vinc (1sg)' },
  { verb: 'dir',    fr: 'dire',             en: 'to say',            present: ['dic','dius','diu','diem','dieu','diuen'],      note: 'dic (1sg)' },
];

const CAT_EXERCISES = [
  { pronoun: 'jo',         verb: 'parlar',    tense: 'present',      answer: 'parlo',        context: 'Jo ___ català cada dia.' },
  { pronoun: 'tu',         verb: 'tenir',     tense: 'present',      answer: 'tens',         context: 'Tu ___ un gat.' },
  { pronoun: 'ell/ella',   verb: 'ser',       tense: 'present',      answer: 'és',           context: 'Ella ___ de Barcelona.' },
  { pronoun: 'nosaltres',  verb: 'anar',      tense: 'present',      answer: 'anem',         context: 'Nosaltres ___ al mercat.' },
  { pronoun: 'vosaltres',  verb: 'fer',       tense: 'present',      answer: 'feu',          context: 'Vosaltres ___ molt bé.' },
  { pronoun: 'ells/elles', verb: 'voler',     tense: 'present',      answer: 'volen',        context: 'Ells ___ aprendre català.' },
  { pronoun: 'jo',         verb: 'anar',      tense: 'passé',        answer: 'vaig anar',    context: 'Ahir, jo ___ a la platja.' },
  { pronoun: 'tu',         verb: 'menjar',    tense: 'passé',        answer: 'vas menjar',   context: 'Ahir, tu ___ pa amb tomàquet.' },
  { pronoun: 'ell/ella',   verb: 'fer',       tense: 'passé',        answer: 'va fer',       context: 'Ahir, ell ___ els deures.' },
  { pronoun: 'nosaltres',  verb: 'parlar',    tense: 'passé',        answer: 'vam parlar',   context: 'Ahir, nosaltres ___ molt.' },
  { pronoun: 'jo',         verb: 'treballar', tense: 'imparfait',    answer: 'treballava',   context: 'Abans, jo ___ a Madrid.' },
  { pronoun: 'tu',         verb: 'ser',       tense: 'imparfait',    answer: 'eres',         context: 'Quan eres petit, tu ___ molt tímid.' },
  { pronoun: 'jo',         verb: 'parlar',    tense: 'futur',        answer: 'parlaré',      context: 'Demà, jo ___ amb el professor.' },
  { pronoun: 'tu',         verb: 'tenir',     tense: 'futur',        answer: 'tindràs',      context: 'Demà, tu ___ temps lliure.' },
  { pronoun: 'ell/ella',   verb: 'fer',       tense: 'futur',        answer: 'farà',         context: 'Demà, ella ___ una paella.' },
];

function CatalanSection({ language }: { language: 'fr' | 'en' }) {
  const [catMode, setCatMode] = useState<'theory' | 'irregular' | 'practice'>('theory');
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedTense, setSelectedTense] = useState<'present' | 'imperfect' | 'future' | 'periphrastic'>('present');
  const [exIdx, setExIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const groups = CAT_GROUPS[language];
  const group = groups[selectedGroup];
  const ex = CAT_EXERCISES[exIdx];

  const tenseKey = {
    present: 'present', imperfect: 'imperfect', future: 'future', periphrastic: 'periphrastic',
  } as const;

  const tenseLabel = {
    fr: { present: 'Présent', imperfect: 'Imparfait', future: 'Futur', periphrastic: 'Passé' },
    en: { present: 'Present', imperfect: 'Imperfect', future: 'Future', periphrastic: 'Past' },
  };

  const checkAnswer = () => {
    const ok = answer.trim().toLowerCase() === ex.answer.toLowerCase();
    setShowResult(true);
    setScore(p => ({ correct: p.correct + (ok ? 1 : 0), total: p.total + 1 }));
  };

  const nextEx = () => {
    setExIdx(i => (i + 1) % CAT_EXERCISES.length);
    setAnswer('');
    setShowResult(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-4 text-center">
        <p className="text-yellow-300 font-bold text-lg">🟡 Conjugació catalana</p>
        <p className="text-slate-400 text-sm mt-1">
          {language === 'fr' ? '3 groupes verbaux + irréguliers essentiels' : '3 verb groups + essential irregulars'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'theory',   label: language === 'fr' ? '📚 Groupes' : '📚 Groups' },
          { key: 'irregular', label: language === 'fr' ? '⚠️ Irréguliers' : '⚠️ Irregulars' },
          { key: 'practice', label: language === 'fr' ? '✍️ Pratique' : '✍️ Practice' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setCatMode(tab.key as typeof catMode)}
            className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
              catMode === tab.key ? 'bg-yellow-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Theory */}
      {catMode === 'theory' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {groups.map((g, i) => (
              <button
                key={i}
                onClick={() => setSelectedGroup(i)}
                className="px-3 py-2 rounded-lg text-sm font-bold transition flex-1"
                style={{ background: selectedGroup === i ? g.color : '#1e293b', color: 'white', border: `2px solid ${g.color}` }}
              >
                {i === 0 ? '-AR' : i === 1 ? '-RE/-ER' : '-IR'}
              </button>
            ))}
          </div>

          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-lg font-bold mb-2" style={{ color: group.color }}>{group.name}</h3>
            <p className="text-slate-300 text-sm mb-4">{group.desc}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {group.examples.map((ex, i) => (
                <span key={i} className="px-2 py-1 bg-slate-900 rounded text-xs text-slate-200">{ex}</span>
              ))}
            </div>

            {/* Tense selector */}
            <div className="flex gap-2 flex-wrap mb-4">
              {(['present','imperfect','future','periphrastic'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTense(t)}
                  className="px-3 py-1 rounded text-xs font-bold transition"
                  style={{ background: selectedTense === t ? group.color : '#0f172a', color: 'white' }}
                >
                  {tenseLabel[language][t]}
                </button>
              ))}
            </div>

            {/* Conjugation table */}
            <p className="text-xs text-slate-400 mb-2">{language === 'fr' ? `Exemple : ${group.verb}` : `Example: ${group.verb}`}</p>
            {CAT_PRONOUNS.map((pron, i) => (
              <div key={i} className="flex justify-between items-center p-2 bg-slate-900 rounded mb-1">
                <span className="text-slate-400 text-sm w-28">{pron}</span>
                <span className="font-mono text-sm font-bold" style={{ color: group.color }}>
                  {group.conj[tenseKey[selectedTense]][i]}
                </span>
              </div>
            ))}

            {selectedTense === 'periphrastic' && (
              <div className="mt-3 p-3 bg-blue-950/30 border border-blue-800 rounded-lg">
                <p className="text-blue-300 text-xs">
                  {language === 'fr'
                    ? '💡 Passé périphrastique = anar (présent) + infinitif. C\'est LE temps du passé en catalan parlé.'
                    : '💡 Periphrastic past = anar (present) + infinitive. This is THE past tense in spoken Catalan.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Irregulars */}
      {catMode === 'irregular' && (
        <div className="space-y-3">
          <div className="bg-red-950/30 border border-red-800 rounded-xl p-3">
            <p className="text-red-300 text-sm">
              {language === 'fr'
                ? '⚠️ Ces 10 verbes sont très fréquents et entièrement irréguliers. Priorité absolue.'
                : '⚠️ These 10 verbs are very frequent and fully irregular. Top priority.'}
            </p>
          </div>
          {CAT_IRREGULARS.map((v, i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-lg font-bold text-yellow-400">{v.verb}</span>
                  <span className="text-slate-400 text-sm ml-2">{language === 'fr' ? v.fr : v.en}</span>
                </div>
                <span className="text-xs text-orange-400">{v.note}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {CAT_PRONOUNS.map((pron, j) => (
                  <div key={j} className="flex justify-between p-1 bg-slate-900 rounded text-sm">
                    <span className="text-slate-400">{pron}</span>
                    <span className="font-mono text-yellow-300">{v.present[j]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Practice */}
      {catMode === 'practice' && (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-xl p-3 text-center border border-slate-700">
            <span className="text-slate-400">{language === 'fr' ? 'Score' : 'Score'}: </span>
            <span className="text-green-400 font-bold text-xl">{score.correct}</span>
            <span className="text-slate-500"> / {score.total}</span>
            <span className="text-slate-500 ml-2 text-sm">({exIdx + 1}/{CAT_EXERCISES.length})</span>
          </div>

          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 space-y-4">
            <div className="bg-yellow-950/30 border border-yellow-800 rounded-lg p-3">
              <p className="text-white text-lg font-semibold italic">"{ex.context}"</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-1">{language === 'fr' ? 'Conjugue' : 'Conjugate'}</p>
              <p className="text-3xl font-bold text-yellow-400">{ex.verb}</p>
              <p className="text-xl text-slate-300">({ex.pronoun})</p>
              <p className="text-xs text-slate-500 mt-1">{ex.tense}</p>
            </div>

            {!showResult ? (
              <>
                <input
                  type="text"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && checkAnswer()}
                  placeholder="..."
                  className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-lg text-white text-center text-2xl focus:border-yellow-500 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={checkAnswer}
                  disabled={!answer.trim()}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition text-xl"
                >
                  {language === 'fr' ? 'Vérifier' : 'Check'}
                </button>
              </>
            ) : (
              <>
                <div className={`p-5 rounded-lg text-center ${
                  answer.trim().toLowerCase() === ex.answer.toLowerCase()
                    ? 'bg-green-900/30 border-2 border-green-600'
                    : 'bg-red-900/30 border-2 border-red-600'
                }`}>
                  <div className="text-2xl mb-2">
                    {answer.trim().toLowerCase() === ex.answer.toLowerCase() ? '✅ Correct!' : '❌ Incorrect'}
                  </div>
                  {answer.trim().toLowerCase() !== ex.answer.toLowerCase() && (
                    <p className="text-2xl font-bold text-green-400">{ex.answer}</p>
                  )}
                </div>
                <button onClick={nextEx} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition text-xl">
                  {language === 'fr' ? 'Suivant →' : 'Next →'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION ESPAGNOL — données
// ─────────────────────────────────────────────────────────────────────────────

const TENSES_BY_LEVEL: Record<string, string[]> = {
  A1: ['presente', 'preterito_perfecto', 'imperativo'],
  A2: ['presente', 'preterito_perfecto', 'imperativo', 'imperfecto', 'futuro'],
  B1: ['presente', 'preterito_perfecto', 'imperativo', 'imperfecto', 'futuro', 'preterito', 'condicional'],
  B2: ['presente', 'preterito_perfecto', 'imperativo', 'imperfecto', 'futuro', 'preterito', 'condicional', 'pluscuamperfecto', 'subjuntivo_presente'],
  C1: ['presente', 'preterito_perfecto', 'imperativo', 'imperfecto', 'futuro', 'preterito', 'condicional', 'pluscuamperfecto', 'subjuntivo_presente'],
  C2: ['presente', 'preterito_perfecto', 'imperativo', 'imperfecto', 'futuro', 'preterito', 'condicional', 'pluscuamperfecto', 'subjuntivo_presente'],
  ALL: ['presente', 'preterito_perfecto', 'imperativo', 'imperfecto', 'futuro', 'preterito', 'condicional', 'pluscuamperfecto', 'subjuntivo_presente'],
};

const CONTEXT_PHRASES: Record<string, string[]> = {
  presente: ['Todos los días, yo ___','Ahora mismo, tú ___','Generalmente, él ___','Nosotros ___ siempre','Vosotros ___ a menudo','Ellos ___ cada día'],
  preterito_perfecto: ['Hoy, yo ___','Esta semana, tú ___','Este mes, él ___','Este año, nosotros ___','Últimamente, vosotros ___','Recientemente, ellos ___'],
  imperativo: ['¡___ ahora! (

type ConjugationExercise = { id: number; verb: string; pronoun: number; tense: string; contextPhrase: string; answer: string };

const verbsByTense: Record<string, Array<{verb: string; conjugations: string[]}>> = {
  presente: [
    { verb: 'hablar', conjugations: ['hablo','hablas','habla','hablamos','habláis','hablan'] },
    { verb: 'comer',  conjugations: ['como','comes','come','comemos','coméis','comen'] },
    { verb: 'vivir',  conjugations: ['vivo','vives','vive','vivimos','vivís','viven'] },
    { verb: 'ser',    conjugations: ['soy','eres','es','somos','sois','son'] },
    { verb: 'estar',  conjugations: ['estoy','estás','está','estamos','estáis','están'] },
    { verb: 'tener',  conjugations: ['tengo','tienes','tiene','tenemos','tenéis','tienen'] },
    { verb: 'hacer',  conjugations: ['hago','haces','hace','hacemos','hacéis','hacen'] },
    { verb: 'ir',     conjugations: ['voy','vas','va','vamos','vais','van'] },
    { verb: 'venir',  conjugations: ['vengo','vienes','viene','venimos','venís','vienen'] },
    { verb: 'decir',  conjugations: ['digo','dices','dice','decimos','decís','dicen'] },
  ],
  preterito_perfecto: [
    { verb: 'hablar',  conjugations: ['he hablado','has hablado','ha hablado','hemos hablado','habéis hablado','han hablado'] },
    { verb: 'comer',   conjugations: ['he comido','has comido','ha comido','hemos comido','habéis comido','han comido'] },
    { verb: 'vivir',   conjugations: ['he vivido','has vivido','ha vivido','hemos vivido','habéis vivido','han vivido'] },
    { verb: 'hacer',   conjugations: ['he hecho','has hecho','ha hecho','hemos hecho','habéis hecho','han hecho'] },
    { verb: 'ver',     conjugations: ['he visto','has visto','ha visto','hemos visto','habéis visto','han visto'] },
    { verb: 'decir',   conjugations: ['he dicho','has dicho','ha dicho','hemos dicho','habéis dicho','han dicho'] },
    { verb: 'poner',   conjugations: ['he puesto','has puesto','ha puesto','hemos puesto','habéis puesto','han puesto'] },
    { verb: 'escribir',conjugations: ['he escrito','has escrito','ha escrito','hemos escrito','habéis escrito','han escrito'] },
  ],
  imperativo: [
    { verb: 'hablar', conjugations: ['habla','hable','hablemos','hablad','hablen'] },
    { verb: 'comer',  conjugations: ['come','coma','comamos','comed','coman'] },
    { verb: 'vivir',  conjugations: ['vive','viva','vivamos','vivid','vivan'] },
    { verb: 'ser',    conjugations: ['sé','sea','seamos','sed','sean'] },
    { verb: 'estar',  conjugations: ['está','esté','estemos','estad','estén'] },
    { verb: 'ir',     conjugations: ['ve','vaya','vamos','id','vayan'] },
    { verb: 'tener',  conjugations: ['ten','tenga','tengamos','tened','tengan'] },
    { verb: 'hacer',  conjugations: ['haz','haga','hagamos','haced','hagan'] },
  ],
  preterito: [
    { verb: 'hablar', conjugations: ['hablé','hablaste','habló','hablamos','hablasteis','hablaron'] },
    { verb: 'comer',  conjugations: ['comí','comiste','comió','comimos','comisteis','comieron'] },
    { verb: 'vivir',  conjugations: ['viví','viviste','vivió','vivimos','vivisteis','vivieron'] },
    { verb: 'ser',    conjugations: ['fui','fuiste','fue','fuimos','fuisteis','fueron'] },
    { verb: 'ir',     conjugations: ['fui','fuiste','fue','fuimos','fuisteis','fueron'] },
    { verb: 'hacer',  conjugations: ['hice','hiciste','hizo','hicimos','hicisteis','hicieron'] },
    { verb: 'tener',  conjugations: ['tuve','tuviste','tuvo','tuvimos','tuvisteis','tuvieron'] },
    { verb: 'estar',  conjugations: ['estuve','estuviste','estuvo','estuvimos','estuvisteis','estuvieron'] },
  ],
  imperfecto: [
    { verb: 'hablar', conjugations: ['hablaba','hablabas','hablaba','hablábamos','hablabais','hablaban'] },
    { verb: 'comer',  conjugations: ['comía','comías','comía','comíamos','comíais','comían'] },
    { verb: 'vivir',  conjugations: ['vivía','vivías','vivía','vivíamos','vivíais','vivían'] },
    { verb: 'ser',    conjugations: ['era','eras','era','éramos','erais','eran'] },
    { verb: 'ir',     conjugations: ['iba','ibas','iba','íbamos','ibais','iban'] },
    { verb: 'ver',    conjugations: ['veía','veías','veía','veíamos','veíais','veían'] },
  ],
  futuro: [
    { verb: 'hablar', conjugations: ['hablaré','hablarás','hablará','hablaremos','hablaréis','hablarán'] },
    { verb: 'comer',  conjugations: ['comeré','comerás','comerá','comeremos','comeréis','comerán'] },
    { verb: 'vivir',  conjugations: ['viviré','vivirás','vivirá','viviremos','viviréis','vivirán'] },
    { verb: 'tener',  conjugations: ['tendré','tendrás','tendrá','tendremos','tendréis','tendrán'] },
    { verb: 'poder',  conjugations: ['podré','podrás','podrá','podremos','podréis','podrán'] },
    { verb: 'hacer',  conjugations: ['haré','harás','hará','haremos','haréis','harán'] },
    { verb: 'salir',  conjugations: ['saldré','saldrás','saldrá','saldremos','saldréis','saldrán'] },
    { verb: 'venir',  conjugations: ['vendré','vendrás','vendrá','vendremos','vendréis','vendrán'] },
  ],
  condicional: [
    { verb: 'hablar', conjugations: ['hablaría','hablarías','hablaría','hablaríamos','hablaríais','hablarían'] },
    { verb: 'comer',  conjugations: ['comería','comerías','comería','comeríamos','comeríais','comerían'] },
    { verb: 'vivir',  conjugations: ['viviría','vivirías','viviría','viviríamos','viviríais','vivirían'] },
    { verb: 'tener',  conjugations: ['tendría','tendrías','tendría','tendríamos','tendríais','tendrían'] },
    { verb: 'poder',  conjugations: ['podría','podrías','podría','podríamos','podríais','podrían'] },
    { verb: 'hacer',  conjugations: ['haría','harías','haría','haríamos','haríais','harían'] },
  ],
  pluscuamperfecto: [
    { verb: 'hablar',  conjugations: ['había hablado','habías hablado','había hablado','habíamos hablado','habíais hablado','habían hablado'] },
    { verb: 'comer',   conjugations: ['había comido','habías comido','había comido','habíamos comido','habíais comido','habían comido'] },
    { verb: 'vivir',   conjugations: ['había vivido','habías vivido','había vivido','habíamos vivido','habíais vivido','habían vivido'] },
    { verb: 'hacer',   conjugations: ['había hecho','habías hecho','había hecho','habíamos hecho','habíais hecho','habían hecho'] },
    { verb: 'ver',     conjugations: ['había visto','habías visto','había visto','habíamos visto','habíais visto','habían visto'] },
    { verb: 'decir',   conjugations: ['había dicho','habías dicho','había dicho','habíamos dicho','habíais dicho','habían dicho'] },
    { verb: 'escribir',conjugations: ['había escrito','habías escrito','había escrito','habíamos escrito','habíais escrito','habían escrito'] },
  ],
  subjuntivo_presente: [
    { verb: 'hablar', conjugations: ['hable','hables','hable','hablemos','habléis','hablen'] },
    { verb: 'comer',  conjugations: ['coma','comas','coma','comamos','comáis','coman'] },
    { verb: 'vivir',  conjugations: ['viva','vivas','viva','vivamos','viváis','vivan'] },
    { verb: 'ser',    conjugations: ['sea','seas','sea','seamos','seáis','sean'] },
    { verb: 'estar',  conjugations: ['esté','estés','esté','estemos','estéis','estén'] },
    { verb: 'tener',  conjugations: ['tenga','tengas','tenga','tengamos','tengáis','tengan'] },
    { verb: 'hacer',  conjugations: ['haga','hagas','haga','hagamos','hagáis','hagan'] },
    { verb: 'ir',     conjugations: ['vaya','vayas','vaya','vayamos','vayáis','vayan'] },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function Conjugation({ level }: Props) {
  const [mode, setMode] = useState<'theory' | 'practice'>('practice');
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');
  const [targetLanguage, setTargetLanguage] = useState<'spanish' | 'catalan'>('spanish');
  const [selectedTense, setSelectedTense] = useState('presente');
  const [currentExercise, setCurrentExercise] = useState<ConjugationExercise | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const availableTenses = TENSES_BY_LEVEL[level] || TENSES_BY_LEVEL.A1;

  useEffect(() => {
    const saved = localStorage.getItem('spanish-sprint-language');
    if (saved === 'fr' || saved === 'en') setLanguage(saved as 'fr' | 'en');
    const target = localStorage.getItem('iberian-sprint-target-language');
    if (target === 'catalan') setTargetLanguage('catalan');
  }, []);

  useEffect(() => {
    if (!availableTenses.includes(selectedTense)) setSelectedTense('presente');
  }, [level, availableTenses, selectedTense]);

  // ── Si catalan, déléguer à CatalanSection ──
  if (targetLanguage === 'catalan') {
    return <CatalanSection language={language} />;
  }

  // ── Espagnol ──
  const pronouns = ['yo', 'tú', 'él/ella', 'nosotros', 'vosotros', 'ellos/ellas'];
  const imperativePronouns = ['tú', 'usted', 'nosotros', 'vosotros', 'ustedes'];

  const tenses = {
    fr: {
      presente: '🔵 Présent', preterito_perfecto: '🟢 Passé composé', imperativo: '🟡 Impératif',
      preterito: '🟢 Passé simple', imperfecto: '🟠 Imparfait', futuro: '🟣 Futur',
      condicional: '🟣 Conditionnel', pluscuamperfecto: '🔴 Plus-que-parfait', subjuntivo_presente: '🔴 Subjonctif',
    },
    en: {
      presente: '🔵 Present', preterito_perfecto: '🟢 Present Perfect', imperativo: '🟡 Imperative',
      preterito: '🟢 Preterite', imperfecto: '🟠 Imperfect', futuro: '🟣 Future',
      condicional: '🟣 Conditional', pluscuamperfecto: '🔴 Past Perfect', subjuntivo_presente: '🔴 Subjunctive',
    },
  };

  const generateExercise = () => {
    const verbs = verbsByTense[selectedTense] || verbsByTense.presente;
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const isImperative = selectedTense === 'imperativo';
    const pronounIndex = isImperative ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * 6);
    const contextPhrases = CONTEXT_PHRASES[selectedTense] || CONTEXT_PHRASES.presente;
    setCurrentExercise({ id: Date.now(), verb: verb.verb, pronoun: pronounIndex, tense: selectedTense, contextPhrase: contextPhrases[pronounIndex], answer: verb.conjugations[pronounIndex] });
    setUserAnswer('');
    setShowResult(false);
  };

  useEffect(() => { if (mode === 'practice') generateExercise(); }, [mode, selectedTense]);

  const checkAnswer = () => {
    if (!currentExercise) return;
    const isCorrect = userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase();
    setShowResult(true);
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));
  };

  const t = {
    fr: { theory: '📚 Théorie', practice: '✍️ Pratique', score: 'Score', contextHint: '💡 Phrase :', conjugate: 'Conjugue', check: 'Vérifier', next: 'Suivant', correct: '✅ Correct !', incorrect: '❌ Incorrect', correctAnswer: 'La bonne réponse était', selectTense: 'Choisis un temps' },
    en: { theory: '📚 Theory', practice: '✍️ Practice', score: 'Score', contextHint: '💡 Context:', conjugate: 'Conjugate', check: 'Check', next: 'Next', correct: '✅ Correct!', incorrect: '❌ Incorrect', correctAnswer: 'The correct answer was', selectTense: 'Choose a tense' },
  }[language];

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2">
        <button onClick={() => setMode('theory')} className={`px-6 py-3 rounded-lg font-bold transition ${mode === 'theory' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>{t.theory}</button>
        <button onClick={() => setMode('practice')} className={`px-6 py-3 rounded-lg font-bold transition ${mode === 'practice' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>{t.practice}</button>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <label className="block text-sm text-slate-400 mb-2">{t.selectTense}</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(tenses[language]).filter(([key]) => availableTenses.includes(key)).map(([key, value]) => (
            <button key={key} onClick={() => setSelectedTense(key)} className={`px-4 py-2 rounded-lg font-semibold transition ${selectedTense === key ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-700'}`}>{value}</button>
          ))}
        </div>
      </div>

      {mode === 'practice' ? (
        <>
          <div className="bg-slate-800 rounded-xl p-4 text-center border border-slate-700">
            <span className="text-slate-400">{t.score}: </span>
            <span className="text-green-400 font-bold text-2xl">{score.correct}</span>
            <span className="text-slate-500"> / </span>
            <span className="font-bold text-2xl">{score.total}</span>
          </div>

          {currentExercise && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-4">
              <div className="bg-purple-900 bg-opacity-30 border border-purple-600 rounded-lg p-4">
                <div className="text-sm text-purple-300 mb-1">{t.contextHint}</div>
                <div className="text-lg font-semibold text-white italic">"{currentExercise.contextPhrase}"</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 mb-2">{t.conjugate}</div>
                <div className="text-4xl font-bold text-blue-400 mb-1">{currentExercise.verb}</div>
                <div className="text-2xl text-slate-300">({selectedTense === 'imperativo' ? imperativePronouns[currentExercise.pronoun] : pronouns[currentExercise.pronoun]})</div>
              </div>
              {!showResult ? (
                <>
                  <input type="text" value={userAnswer} onChange={e => setUserAnswer(e.target.value)} onKeyPress={e => e.key === 'Enter' && checkAnswer()} placeholder="..." className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-lg text-white text-center text-2xl focus:border-blue-500 focus:outline-none" autoFocus />
                  <button onClick={checkAnswer} disabled={!userAnswer.trim()} className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition text-xl">{t.check}</button>
                </>
              ) : (
                <>
                  <div className={`p-6 rounded-lg text-center ${userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase() ? 'bg-green-900 bg-opacity-30 border-2 border-green-600' : 'bg-red-900 bg-opacity-30 border-2 border-red-600'}`}>
                    <div className="text-3xl mb-4">{userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase() ? t.correct : t.incorrect}</div>
                    {userAnswer.trim().toLowerCase() !== currentExercise.answer.toLowerCase() && (
                      <div><div className="text-slate-400 mb-2">{t.correctAnswer}:</div><div className="text-3xl font-bold text-green-400">{currentExercise.answer}</div></div>
                    )}
                  </div>
                  <button onClick={generateExercise} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition text-xl">{t.next} →</button>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-h-[70vh] overflow-y-auto space-y-4">
          {verbsByTense[selectedTense]?.map((verb, idx) => (
            <div key={idx} className="bg-slate-900 rounded-lg p-4">
              <h4 className="text-xl font-bold text-white mb-3 capitalize">{verb.verb}</h4>
              <div className="grid grid-cols-2 gap-2">
                {(selectedTense === 'imperativo' ? imperativePronouns : pronouns).map((pronoun, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-slate-800 rounded">
                    <span className="text-slate-400">{pronoun}</span>
                    <span className="font-mono text-green-400">{verb.conjugations[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
