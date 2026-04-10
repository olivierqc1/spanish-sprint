"use client";

import { useState, useEffect } from 'react';

type Props = {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'ALL';
  country: string;
};

const CAT_PRONOUNS = ['jo','tu','ell/ella','nosaltres','vosaltres','ells/elles'];

const P_AR = {
  present:      ['parlo','parles','parla','parlem','parleu','parlen'],
  imperfect:    ['parlava','parlaves','parlava','parlàvem','parlàveu','parlaven'],
  future:       ['parlare','parlaras','parlara','parlarem','parlareu','parlaran'],
  periphrastic: ['vaig parlar','vas parlar','va parlar','vam parlar','vau parlar','van parlar'],
};
const P_ER = {
  present:      ['bec','beus','beu','bevem','beveu','beuen'],
  imperfect:    ['bevia','bevies','bevia','beviem','bevieu','bevien'],
  future:       ['beure','beuràs','beura','beurem','beureu','beuran'],
  periphrastic: ['vaig beure','vas beure','va beure','vam beure','vau beure','van beure'],
};
const P_IR = {
  present:      ['llegeixo','llegeixes','llegeix','llegim','llegiu','llegeixen'],
  imperfect:    ['llegia','llegies','llegia','llegiem','llegieu','llegien'],
  future:       ['llegire','llegiras','llegira','llegirem','llegireu','llegiran'],
  periphrastic: ['vaig llegir','vas llegir','va llegir','vam llegir','vau llegir','van llegir'],
};

const CAT_GROUPS_FR = [
  {
    name: 'Groupe 1 — verbes en -AR',
    color: '#3b82f6',
    desc: 'Le groupe le plus courant. Terminaisons au présent : -o, -es, -a, -em, -eu, -en.',
    examples: ['parlar = parler', 'treballar = travailler', 'comprar = acheter', 'estudiar = étudier'],
    verb: 'parlar',
    conj: P_AR,
  },
  {
    name: 'Groupe 2 — verbes en -RE ou -ER',
    color: '#10b981',
    desc: 'Attention : à la 3e personne du singulier, il n\'y a AUCUNE terminaison. Ex : ell beu (il boit).',
    examples: ['beure = boire', 'viure = vivre', 'vendre = vendre', 'correr = courir'],
    verb: 'beure',
    conj: P_ER,
  },
  {
    name: 'Groupe 3 — verbes en -IR',
    color: '#f59e0b',
    desc: 'La majorité des verbes en -IR ajoutent -eix- au singulier et à la 3e pluriel. Ex : jo llegeixo, ell llegeix, ells llegeixen. Exceptions sans -eix- : dormir, sortir.',
    examples: ['llegir = lire', 'servir = servir', 'patir = souffrir', 'dormir = dormir (sans -eix-)'],
    verb: 'llegir',
    conj: P_IR,
  },
];
const CAT_GROUPS_EN = [
  {
    name: 'Group 1 — -AR verbs',
    color: '#3b82f6',
    desc: 'The most common group. Present endings: -o, -es, -a, -em, -eu, -en.',
    examples: ['parlar = to speak', 'treballar = to work', 'comprar = to buy', 'estudiar = to study'],
    verb: 'parlar',
    conj: P_AR,
  },
  {
    name: 'Group 2 — -RE / -ER verbs',
    color: '#10b981',
    desc: 'Watch out: the 3rd person singular has NO ending at all. Ex: ell beu (he drinks).',
    examples: ['beure = to drink', 'viure = to live', 'vendre = to sell', 'correr = to run'],
    verb: 'beure',
    conj: P_ER,
  },
  {
    name: 'Group 3 — -IR verbs',
    color: '#f59e0b',
    desc: 'Most -IR verbs insert -eix- in the singular and 3rd plural. Ex: jo llegeixo, ell llegeix, ells llegeixen. Exceptions without -eix-: dormir, sortir.',
    examples: ['llegir = to read', 'servir = to serve', 'patir = to suffer', 'dormir = to sleep (no -eix-)'],
    verb: 'llegir',
    conj: P_IR,
  },
];

const CAT_IRREGULARS = [
  { verb: 'ser',   fr: 'etre (identite)',  en: 'to be (identity)',
    present: ['soc','ets','es','som','sou','son'],             note: 'Irregulier complet' },
  { verb: 'estar', fr: 'etre (etat)',      en: 'to be (state)',
    present: ['estic','estas','esta','estem','esteu','estan'], note: 'Irregulier sing.' },
  { verb: 'tenir', fr: 'avoir',            en: 'to have',
    present: ['tinc','tens','te','tenim','teniu','tenen'],     note: 'tinc / te' },
  { verb: 'anar',  fr: 'aller',            en: 'to go',
    present: ['vaig','vas','va','anem','aneu','van'],          note: 'Base passe periphr.' },
  { verb: 'fer',   fr: 'faire',            en: 'to do/make',
    present: ['faig','fas','fa','fem','feu','fan'],            note: 'faig (1sg)' },
  { verb: 'voler', fr: 'vouloir',          en: 'to want',
    present: ['vull','vols','vol','volem','voleu','volen'],    note: 'vull (1sg)' },
  { verb: 'poder', fr: 'pouvoir',          en: 'can',
    present: ['puc','pots','pot','podem','podeu','poden'],     note: 'puc (1sg)' },
  { verb: 'saber', fr: 'savoir',           en: 'to know',
    present: ['se','saps','sap','sabem','sabeu','saben'],      note: 'se (1sg)' },
  { verb: 'venir', fr: 'venir',            en: 'to come',
    present: ['vinc','vens','ve','venim','veniu','venen'],     note: 'vinc (1sg)' },
  { verb: 'dir',   fr: 'dire',             en: 'to say',
    present: ['dic','dius','diu','diem','dieu','diuen'],       note: 'dic (1sg)' },
];

const CAT_EXERCISES = [
  // PRESENT — regulars
  { pronoun: 'jo',         verb: 'parlar',    tense: 'present',   answer: 'parlo',        context: 'Jo ___ catala cada dia.' },
  { pronoun: 'tu',         verb: 'parlar',    tense: 'present',   answer: 'parles',       context: 'Tu ___ molt be.' },
  { pronoun: 'ell/ella',   verb: 'parlar',    tense: 'present',   answer: 'parla',        context: 'Ella ___ angles.' },
  { pronoun: 'nosaltres',  verb: 'parlar',    tense: 'present',   answer: 'parlem',       context: 'Nosaltres ___ catala a casa.' },
  { pronoun: 'vosaltres',  verb: 'parlar',    tense: 'present',   answer: 'parleu',       context: 'Vosaltres ___ massa rapid.' },
  { pronoun: 'ells/elles', verb: 'parlar',    tense: 'present',   answer: 'parlen',       context: 'Ells ___ amb els veins.' },
  { pronoun: 'jo',         verb: 'treballar', tense: 'present',   answer: 'treballo',     context: 'Jo ___ a Barcelona.' },
  { pronoun: 'tu',         verb: 'comprar',   tense: 'present',   answer: 'compres',      context: 'Tu ___ al mercat.' },
  { pronoun: 'ell/ella',   verb: 'estudiar',  tense: 'present',   answer: 'estudia',      context: 'Ell ___ medicina.' },
  { pronoun: 'nosaltres',  verb: 'cantar',    tense: 'present',   answer: 'cantem',       context: 'Nosaltres ___ cada dissabte.' },
  // PRESENT — group 2
  { pronoun: 'jo',         verb: 'beure',     tense: 'present',   answer: 'bec',          context: 'Jo ___ cafe cada mati.' },
  { pronoun: 'tu',         verb: 'beure',     tense: 'present',   answer: 'beus',         context: 'Tu ___ molta aigua.' },
  { pronoun: 'ell/ella',   verb: 'beure',     tense: 'present',   answer: 'beu',          context: 'Ell ___ llet al mati.' },
  { pronoun: 'nosaltres',  verb: 'vendre',    tense: 'present',   answer: 'venem',        context: 'Nosaltres ___ verdures.' },
  { pronoun: 'ells/elles', verb: 'correr',    tense: 'present',   answer: 'corren',       context: 'Ells ___ cada mati.' },
  // PRESENT — group 3 inchoative
  { pronoun: 'jo',         verb: 'llegir',    tense: 'present',   answer: 'llegeixo',     context: 'Jo ___ un llibre.' },
  { pronoun: 'tu',         verb: 'llegir',    tense: 'present',   answer: 'llegeixes',    context: 'Tu ___ molt.' },
  { pronoun: 'ell/ella',   verb: 'llegir',    tense: 'present',   answer: 'llegeix',      context: 'Ella ___ el diari.' },
  { pronoun: 'nosaltres',  verb: 'llegir',    tense: 'present',   answer: 'llegim',       context: 'Nosaltres ___ cada nit.' },
  { pronoun: 'ells/elles', verb: 'llegir',    tense: 'present',   answer: 'llegeixen',    context: 'Ells ___ molt be.' },
  // PRESENT — irregulars
  { pronoun: 'jo',         verb: 'ser',       tense: 'present',   answer: 'soc',          context: 'Jo ___ de Montreal.' },
  { pronoun: 'tu',         verb: 'ser',       tense: 'present',   answer: 'ets',          context: 'Tu ___ molt simpatica.' },
  { pronoun: 'ell/ella',   verb: 'ser',       tense: 'present',   answer: 'es',           context: 'Ella ___ de Barcelona.' },
  { pronoun: 'nosaltres',  verb: 'tenir',     tense: 'present',   answer: 'tenim',        context: 'Nosaltres ___ un gat.' },
  { pronoun: 'tu',         verb: 'tenir',     tense: 'present',   answer: 'tens',         context: 'Tu ___ un cotxe.' },
  { pronoun: 'jo',         verb: 'tenir',     tense: 'present',   answer: 'tinc',         context: 'Jo ___ vint-i-cinc anys.' },
  { pronoun: 'nosaltres',  verb: 'anar',      tense: 'present',   answer: 'anem',         context: 'Nosaltres ___ al mercat.' },
  { pronoun: 'vosaltres',  verb: 'fer',       tense: 'present',   answer: 'feu',          context: 'Vosaltres ___ molt be.' },
  { pronoun: 'ells/elles', verb: 'voler',     tense: 'present',   answer: 'volen',        context: 'Ells ___ aprendre catala.' },
  { pronoun: 'jo',         verb: 'poder',     tense: 'present',   answer: 'puc',          context: 'Jo no ___ venir dema.' },
  { pronoun: 'tu',         verb: 'saber',     tense: 'present',   answer: 'saps',         context: 'Tu ___ cuinar molt be.' },
  { pronoun: 'ell/ella',   verb: 'venir',     tense: 'present',   answer: 've',           context: 'Ell ___ cada divendres.' },
  { pronoun: 'jo',         verb: 'dir',       tense: 'present',   answer: 'dic',          context: 'Jo ___ la veritat.' },
  { pronoun: 'jo',         verb: 'estar',     tense: 'present',   answer: 'estic',        context: 'Jo ___ molt content.' },
  { pronoun: 'tu',         verb: 'estar',     tense: 'present',   answer: 'estas',        context: 'Tu ___ cansat?' },
  // PASSE PERIPHRASTIC
  { pronoun: 'jo',         verb: 'anar',      tense: 'passe',     answer: 'vaig anar',    context: 'Ahir, jo ___ a la platja.' },
  { pronoun: 'tu',         verb: 'menjar',    tense: 'passe',     answer: 'vas menjar',   context: 'Ahir, tu ___ pa.' },
  { pronoun: 'ell/ella',   verb: 'fer',       tense: 'passe',     answer: 'va fer',       context: 'Ahir, ell ___ els deures.' },
  { pronoun: 'nosaltres',  verb: 'parlar',    tense: 'passe',     answer: 'vam parlar',   context: 'Ahir, nosaltres ___ molt.' },
  { pronoun: 'vosaltres',  verb: 'vendre',    tense: 'passe',     answer: 'vau vendre',   context: 'Ahir, vosaltres ___ el cotxe.' },
  { pronoun: 'ells/elles', verb: 'arribar',   tense: 'passe',     answer: 'van arribar',  context: 'Ahir, ells ___ tard.' },
  { pronoun: 'jo',         verb: 'comprar',   tense: 'passe',     answer: 'vaig comprar', context: 'Ahir, jo ___ pa.' },
  { pronoun: 'tu',         verb: 'llegir',    tense: 'passe',     answer: 'vas llegir',   context: 'Ahir, tu ___ el llibre.' },
  { pronoun: 'ell/ella',   verb: 'beure',     tense: 'passe',     answer: 'va beure',     context: 'Ahir, ella ___ un cafe.' },
  // IMPARFAIT
  { pronoun: 'jo',         verb: 'treballar', tense: 'imparfait', answer: 'treballava',   context: 'Abans, jo ___ a Madrid.' },
  { pronoun: 'tu',         verb: 'ser',       tense: 'imparfait', answer: 'eres',         context: 'De petit, tu ___ timid.' },
  { pronoun: 'ell/ella',   verb: 'viure',     tense: 'imparfait', answer: 'vivia',        context: 'Abans, ell ___ a Valencia.' },
  { pronoun: 'nosaltres',  verb: 'parlar',    tense: 'imparfait', answer: 'parlàvem',     context: 'Abans, nosaltres ___ molt.' },
  { pronoun: 'ells/elles', verb: 'estudiar',  tense: 'imparfait', answer: 'estudiaven',   context: 'Abans, ells ___ junts.' },
  // FUTUR
  { pronoun: 'jo',         verb: 'parlar',    tense: 'futur',     answer: 'parlare',      context: 'Dema, jo ___ amb ell.' },
  { pronoun: 'tu',         verb: 'tenir',     tense: 'futur',     answer: 'tindras',      context: 'Dema, tu ___ temps.' },
  { pronoun: 'ell/ella',   verb: 'fer',       tense: 'futur',     answer: 'fara',         context: 'Dema, ella ___ una paella.' },
  { pronoun: 'nosaltres',  verb: 'anar',      tense: 'futur',     answer: 'anirem',       context: 'Dema, nosaltres ___ a la platja.' },
  { pronoun: 'vosaltres',  verb: 'treballar', tense: 'futur',     answer: 'treballareu',  context: 'Dema, vosaltres ___ molt.' },
  { pronoun: 'ells/elles', verb: 'arribar',   tense: 'futur',     answer: 'arribaran',    context: 'Dema, ells ___ a les vuit.' },
];

function CatalanSection({ language }: { language: 'fr' | 'en' }) {
  const [catMode, setCatMode] = useState<'theory' | 'irregular' | 'practice'>('theory');
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [selectedTense, setSelectedTense] = useState<
    'present' | 'imperfect' | 'future' | 'periphrastic'
  >('present');
  const [exIdx, setExIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [practiceFilter, setPracticeFilter] = useState('all');

  const filteredExercises = practiceFilter === 'all'
    ? CAT_EXERCISES
    : CAT_EXERCISES.filter(e => e.tense === practiceFilter);

  const ex = filteredExercises[exIdx % Math.max(filteredExercises.length, 1)] ?? CAT_EXERCISES[0];

  const groups = language === 'fr' ? CAT_GROUPS_FR : CAT_GROUPS_EN;
  const group = groups[selectedGroup];

  const tenseLabel = {
    fr: { present: 'Present', imperfect: 'Imparfait', future: 'Futur', periphrastic: 'Passe' },
    en: { present: 'Present', imperfect: 'Imperfect', future: 'Future', periphrastic: 'Past' },
  };

  const checkAnswer = () => {
    const ok = answer.trim().toLowerCase() === ex.answer.toLowerCase();
    setShowResult(true);
    setScore(p => ({ correct: p.correct + (ok ? 1 : 0), total: p.total + 1 }));
  };
  const nextEx = () => {
    setExIdx(i => (i + 1) % Math.max(filteredExercises.length, 1));
    setAnswer('');
    setShowResult(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl p-4 text-center">
        <p className="text-yellow-300 font-bold text-lg">Conjugacio catalana</p>
        <p className="text-slate-400 text-sm mt-1">
          {language === 'fr' ? '3 groupes verbaux + irreguliers' : '3 verb groups + irregulars'}
        </p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {[
          { key: 'theory',    label: language === 'fr' ? 'Groupes' : 'Groups' },
          { key: 'irregular', label: language === 'fr' ? 'Irreguliers' : 'Irregulars' },
          { key: 'practice',  label: language === 'fr' ? 'Pratique' : 'Practice' },
        ].map(tab => (
          <button key={tab.key} onClick={() => setCatMode(tab.key as typeof catMode)}
            className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
              catMode === tab.key
                ? 'bg-yellow-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {catMode === 'theory' && (
        <div className="space-y-4">
          {/* Sélecteur groupe */}
          <div className="flex gap-2">
            {groups.map((g, i) => (
              <button key={i} onClick={() => setSelectedGroup(i)}
                className="px-3 py-2 rounded-lg text-sm font-bold transition flex-1"
                style={{
                  background: selectedGroup === i ? g.color : '#1e293b',
                  color: 'white',
                  border: `2px solid ${g.color}`,
                }}>
                {i === 0 ? '-AR' : i === 1 ? '-RE/-ER' : '-IR'}
              </button>
            ))}
          </div>

          {/* Sélecteur temps */}
          <div className="flex gap-2">
            {(['present','imperfect','future','periphrastic'] as const).map(t => (
              <button key={t} onClick={() => setSelectedTense(t)}
                className="px-2 py-2 rounded-lg text-xs font-bold transition flex-1"
                style={{
                  background: selectedTense === t ? group.color : '#0f172a',
                  color: 'white',
                  border: `1px solid ${selectedTense === t ? group.color : '#334155'}`,
                }}>

                {tenseLabel[language][t]}
              </button>
            ))}
          </div>

          {/* Info groupe */}
          <div className="rounded-xl p-4 border"
            style={{ background: group.color + '18', borderColor: group.color + '55' }}>
            <h3 className="font-bold text-base mb-1" style={{ color: group.color }}>
              {group.name}
            </h3>
            <p className="text-slate-300 text-sm mb-2">{group.desc}</p>
            <div className="flex flex-col gap-1 mt-2">
              {group.examples.map((e, i) => (
                <span key={i} style={{
                  background: '#0f172a',
                  borderLeft: `3px solid ${group.color}`,
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  color: '#e2e8f0',
                }}>
                  {e}
                </span>
              ))}
            </div>
          </div>

          {/* Tableau conjugaison */}
          <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
            <thead>
              <tr style={{ background: group.color }}>
                <th style={{ padding: '12px 16px', color: '#fff', textAlign: 'left', fontWeight: 'bold', width: '45%' }}>
                  {language === 'fr' ? 'Pronom' : 'Pronoun'}
                </th>
                <th style={{ padding: '12px 16px', color: '#fff', textAlign: 'left', fontWeight: 'bold', width: '55%' }}>
                  {group.verb} — {tenseLabel[language][selectedTense]}
                </th>
              </tr>
            </thead>
            <tbody>
              {CAT_PRONOUNS.map((pron, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#0f172a' : '#1e293b' }}>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: '15px', whiteSpace: 'nowrap' }}>
                    {pron}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: 'bold', fontSize: '18px', color: group.color }}>
                    {group.conj[selectedTense][i]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedTense === 'periphrastic' && (
            <div className="p-3 bg-blue-950/30 border border-blue-800 rounded-lg">
              <p className="text-blue-300 text-xs">
                {language === 'fr'
                  ? 'Passe periphr. = anar (present) + infinitif. LE temps du passe oral.'
                  : 'Periphrastic past = anar (present) + infinitive. THE spoken past tense.'}
              </p>
            </div>
          )}
        </div>
      )}

      {catMode === 'irregular' && (
        <div className="space-y-4">
          <div className="bg-red-950/30 border border-red-800 rounded-xl p-3">
            <p className="text-red-300 text-sm">
              {language === 'fr'
                ? '10 verbes tres frequents, entierement irreguliers.'
                : '10 very frequent and fully irregular verbs.'}
            </p>
          </div>
          {CAT_IRREGULARS.map((v, i) => (
            <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155' }}>
              {/* Header verb */}
              <div style={{
                background: '#1e293b',
                padding: '10px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #334155',
              }}>
                <div>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fbbf24' }}>
                    {v.verb}
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '14px', marginLeft: '8px' }}>
                    {language === 'fr' ? v.fr : v.en}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: '#fb923c', background: '#1c0a00', padding: '2px 8px', borderRadius: '6px' }}>
                  {v.note}
                </span>
              </div>
              {/* Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {CAT_PRONOUNS.map((pron, j) => (
                    <tr key={j} style={{ background: j % 2 === 0 ? '#0f172a' : '#1e293b' }}>
                      <td style={{ padding: '10px 16px', color: '#94a3b8', fontSize: '14px', whiteSpace: 'nowrap', width: '45%' }}>
                        {pron}
                      </td>
                      <td style={{ padding: '10px 16px', fontWeight: 'bold', fontSize: '17px', color: '#fbbf24' }}>
                        {v.present[j]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {catMode === 'practice' && (
        <div className="space-y-4">
          {/* Filtre par temps */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all',       label: language === 'fr' ? 'Tous' : 'All' },
              { key: 'present',   label: language === 'fr' ? 'Présent' : 'Present' },
              { key: 'passe',     label: language === 'fr' ? 'Passé' : 'Past' },
              { key: 'imparfait', label: language === 'fr' ? 'Imparfait' : 'Imperfect' },
              { key: 'futur',     label: language === 'fr' ? 'Futur' : 'Future' },
            ].map(opt => {
              const count = opt.key === 'all'
                ? CAT_EXERCISES.length
                : CAT_EXERCISES.filter(e => e.tense === opt.key).length;
              const active = (practiceFilter === opt.key);
              return (
                <button key={opt.key}
                  onClick={() => { setPracticeFilter(opt.key); setExIdx(0); setAnswer(''); setShowResult(false); }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: active ? '#f59e0b' : '#1e293b',
                    color: active ? '#fff' : '#94a3b8',
                    fontSize: '13px',
                    fontWeight: active ? 'bold' : 'normal',
                    cursor: 'pointer',
                  }}>
                  {opt.label} <span style={{ opacity: 0.7 }}>({count})</span>
                </button>
              );
            })}
          </div>

          {/* Score */}
          <div style={{
            background: '#1e293b', borderRadius: '12px', padding: '12px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            border: '1px solid #334155',
          }}>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>Score</span>
            <span>
              <span style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '22px' }}>{score.correct}</span>
              <span style={{ color: '#64748b' }}> / {score.total}</span>
              <span style={{ color: '#64748b', fontSize: '12px', marginLeft: '8px' }}>
                ({filteredExercises.length > 0 ? (exIdx % filteredExercises.length) + 1 : 0}/{filteredExercises.length})
              </span>
            </span>
          </div>

          {filteredExercises.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#94a3b8', padding: '32px' }}>
              {language === 'fr' ? 'Aucun exercice pour ce temps.' : 'No exercises for this tense.'}
            </div>
          ) : (
            <div style={{
              background: '#1e293b', borderRadius: '16px', padding: '20px',
              border: '1px solid #334155', display: 'flex', flexDirection: 'column', gap: '16px',
            }}>
              {/* Contexte */}
              <div style={{
                background: '#422006', border: '1px solid #92400e',
                borderRadius: '10px', padding: '12px 16px',
              }}>
                <p style={{ color: '#fcd34d', fontSize: '11px', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {ex.tense}
                </p>
                <p style={{ color: '#fff', fontSize: '18px', fontStyle: 'italic' }}>
                  "{ex.context}"
                </p>
              </div>

              {/* Verbe à conjuguer */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '4px' }}>
                  {language === 'fr' ? 'Conjugue' : 'Conjugate'}
                </p>
                <p style={{ color: '#fbbf24', fontSize: '32px', fontWeight: 'bold' }}>{ex.verb}</p>
                <p style={{ color: '#cbd5e1', fontSize: '20px' }}>({ex.pronoun})</p>
              </div>

              {/* Input */}
              {!showResult ? (
                <>
                  <input type="text" value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && checkAnswer()}
                    placeholder="..."
                    style={{
                      width: '100%', padding: '14px', borderRadius: '10px',
                      border: '2px solid #334155', background: '#0f172a',
                      color: '#fff', fontSize: '22px', textAlign: 'center',
                      outline: 'none', boxSizing: 'border-box',
                    }}
                    autoFocus
                  />
                  <button onClick={checkAnswer} disabled={!answer.trim()}
                    style={{
                      width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
                      background: answer.trim() ? '#d97706' : '#374151',
                      color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer',
                    }}>
                    {language === 'fr' ? 'Vérifier' : 'Check'}
                  </button>
                </>
              ) : (
                <>
                  <div style={{
                    padding: '16px', borderRadius: '10px', textAlign: 'center',
                    background: answer.trim().toLowerCase() === ex.answer.toLowerCase() ? '#14532d' : '#450a0a',
                    border: `2px solid ${answer.trim().toLowerCase() === ex.answer.toLowerCase() ? '#16a34a' : '#dc2626'}`,
                  }}>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px',
                      color: answer.trim().toLowerCase() === ex.answer.toLowerCase() ? '#4ade80' : '#f87171' }}>
                      {answer.trim().toLowerCase() === ex.answer.toLowerCase()
                        ? '✓ Correct!' : '✗ Incorrect'}
                    </p>
                    {answer.trim().toLowerCase() !== ex.answer.toLowerCase() && (
                      <p style={{ color: '#4ade80', fontSize: '24px', fontWeight: 'bold' }}>
                        {ex.answer}
                      </p>
                    )}
                  </div>
                  <button onClick={nextEx}
                    style={{
                      width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
                      background: '#1d4ed8', color: '#fff', fontSize: '18px',
                      fontWeight: 'bold', cursor: 'pointer',
                    }}>
                    {language === 'fr' ? 'Suivant' : 'Next'} →
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================

// SPANISH DATA
// =============================================================================

const ALL_TENSES = [
  'presente','preterito_perfecto','imperativo','imperfecto',
  'futuro','preterito','condicional','pluscuamperfecto','subjuntivo_presente',
];
const TENSES_BY_LEVEL: Record<string, string[]> = {
  A1:  ['presente','preterito_perfecto','imperativo'],
  A2:  ['presente','preterito_perfecto','imperativo','imperfecto','futuro'],
  B1:  ['presente','preterito_perfecto','imperativo','imperfecto','futuro','preterito','condicional'],
  B2:  ALL_TENSES,
  C1:  ALL_TENSES,
  C2:  ALL_TENSES,
  ALL: ALL_TENSES,
};

const CTX_PRESENTE = [
  'Cada dia, yo ___','Ahora, tu ___','El ___ siempre',
  'Nosotros ___ juntos','Vosotros ___ bien','Ellos ___ mucho',
];
const CTX_PRET_PERF = [
  'Hoy, yo ___','Esta semana, tu ___','Este mes, el ___',
  'Este anio, nosotros ___','Ultimamente, vosotros ___','Recientemente, ellos ___',
];
const CTX_IMPERATIVO = [
  'Hazlo tu: ___','Digale usted: ___','Hagamos: ___',
  'Hablad vosotros: ___','Hablen ustedes: ___','Ven aqui tu: ___',
];
const CTX_PRETERITO = [
  'Ayer, yo ___','La semana pasada, tu ___','Hace dos dias, el ___',
  'El mes pasado, nosotros ___','Ese dia, vosotros ___','Anteayer, ellos ___',
];
const CTX_IMPERFECTO = [
  'De nino, yo ___','Antes, tu ___ siempre','En esa epoca, el ___',
  'Cada verano, nosotros ___','Los sabados, vosotros ___','De joven, ellos ___',
];
const CTX_FUTURO = [
  'Manana, yo ___','La semana que viene, tu ___','El mes proximo, el ___',
  'En un mes, nosotros ___','Pronto, vosotros ___','Algun dia, ellos ___',
];
const CTX_CONDICIONAL = [
  'En tu lugar, yo ___','Si pudieras, tu ___','El dijo que ___',
  'Con tiempo, nosotros ___','En esa situacion, vosotros ___','Con dinero, ellos ___',
];
const CTX_PLUSCUAM = [
  'Antes, yo ya ___','Cuando llegaste, tu ya ___','Cuando llegue, el ya ___',
  'Antes de salir, nosotros ya ___','Cuando llame, vosotros ya ___','Antes, ellos ya ___',
];
const CTX_SUBJUNTIVO = [
  'Espero que yo ___','Quiero que tu ___','Es importante que el ___',
  'Ojala nosotros ___','Dudo que vosotros ___','No creo que ellos ___',
];
const CTX: Record<string, string[]> = {
  presente:            CTX_PRESENTE,
  preterito_perfecto:  CTX_PRET_PERF,
  imperativo:          CTX_IMPERATIVO,
  preterito:           CTX_PRETERITO,
  imperfecto:          CTX_IMPERFECTO,
  futuro:              CTX_FUTURO,
  condicional:         CTX_CONDICIONAL,
  pluscuamperfecto:    CTX_PLUSCUAM,
  subjuntivo_presente: CTX_SUBJUNTIVO,
};

type ConjugationExercise = {
  id: number; verb: string; pronoun: number;
  tense: string; contextPhrase: string; answer: string;
};

const C1 = ['hablo','hablas','habla','hablamos','habláis','hablan'];
const C2 = ['como','comes','come','comemos','coméis','comen'];
const C3 = ['vivo','vives','vive','vivimos','vivís','viven'];
const C4 = ['soy','eres','es','somos','sois','son'];
const C5 = ['estoy','estás','está','estamos','estáis','están'];
const C6 = ['tengo','tienes','tiene','tenemos','tenéis','tienen'];
const C7 = ['hago','haces','hace','hacemos','hacéis','hacen'];
const C8 = ['voy','vas','va','vamos','vais','van'];
const C9 = ['vengo','vienes','viene','venimos','venís','vienen'];
const C10 = ['digo','dices','dice','decimos','decís','dicen'];

const PP1 = ['he hablado','has hablado','ha hablado','hemos hablado','habéis hablado','han hablado'];
const PP2 = ['he comido','has comido','ha comido','hemos comido','habéis comido','han comido'];
const PP3 = ['he vivido','has vivido','ha vivido','hemos vivido','habéis vivido','han vivido'];
const PP4 = ['he hecho','has hecho','ha hecho','hemos hecho','habéis hecho','han hecho'];
const PP5 = ['he visto','has visto','ha visto','hemos visto','habéis visto','han visto'];
const PP6 = ['he dicho','has dicho','ha dicho','hemos dicho','habéis dicho','han dicho'];
const PP7 = ['he puesto','has puesto','ha puesto','hemos puesto','habéis puesto','han puesto'];
const PP8 = ['he escrito','has escrito','ha escrito','hemos escrito','habéis escrito','han escrito'];

const PQ1a = ['habia hablado','habias hablado','habia hablado'];
const PQ1b = ['habiamos hablado','habiais hablado','habian hablado'];
const PQ1 = [...PQ1a, ...PQ1b];
const PQ2a = ['habia comido','habias comido','habia comido'];
const PQ2b = ['habiamos comido','habiais comido','habian comido'];
const PQ2 = [...PQ2a, ...PQ2b];
const PQ3a = ['habia vivido','habias vivido','habia vivido'];
const PQ3b = ['habiamos vivido','habiais vivido','habian vivido'];
const PQ3 = [...PQ3a, ...PQ3b];
const PQ4a = ['habia hecho','habias hecho','habia hecho'];
const PQ4b = ['habiamos hecho','habiais hecho','habian hecho'];
const PQ4 = [...PQ4a, ...PQ4b];
const PQ5a = ['habia visto','habias visto','habia visto'];
const PQ5b = ['habiamos visto','habiais visto','habian visto'];
const PQ5 = [...PQ5a, ...PQ5b];
const PQ6a = ['habia escrito','habias escrito','habia escrito'];
const PQ6b = ['habiamos escrito','habiais escrito','habian escrito'];
const PQ6 = [...PQ6a, ...PQ6b];

const verbsByTense: Record<string, Array<{ verb: string; conjugations: string[] }>> = {
  presente: [
    { verb: 'hablar', conjugations: C1 },
    { verb: 'comer',  conjugations: C2 },
    { verb: 'vivir',  conjugations: C3 },
    { verb: 'ser',    conjugations: C4 },
    { verb: 'estar',  conjugations: C5 },
    { verb: 'tener',  conjugations: C6 },
    { verb: 'hacer',  conjugations: C7 },
    { verb: 'ir',     conjugations: C8 },
    { verb: 'venir',  conjugations: C9 },
    { verb: 'decir',  conjugations: C10 },
  ],
  preterito_perfecto: [
    { verb: 'hablar',   conjugations: PP1 },
    { verb: 'comer',    conjugations: PP2 },
    { verb: 'vivir',    conjugations: PP3 },
    { verb: 'hacer',    conjugations: PP4 },
    { verb: 'ver',      conjugations: PP5 },
    { verb: 'decir',    conjugations: PP6 },
    { verb: 'poner',    conjugations: PP7 },
    { verb: 'escribir', conjugations: PP8 },
  ],
  imperativo: [
    { verb: 'hablar', conjugations: ['habla','hable','hablemos','hablad','hablen'] },
    { verb: 'comer',  conjugations: ['come','coma','comamos','comed','coman'] },
    { verb: 'vivir',  conjugations: ['vive','viva','vivamos','vivid','vivan'] },
    { verb: 'ser',    conjugations: ['se','sea','seamos','sed','sean'] },
    { verb: 'estar',  conjugations: ['esta','este','estemos','estad','esten'] },
    { verb: 'ir',     conjugations: ['ve','vaya','vamos','id','vayan'] },
    { verb: 'tener',  conjugations: ['ten','tenga','tengamos','tened','tengan'] },
    { verb: 'hacer',  conjugations: ['haz','haga','hagamos','haced','hagan'] },
  ],
  preterito: [
    { verb: 'hablar', conjugations: ['hable','hablaste','habló','hablamos','hablasteis','hablaron'] },
    { verb: 'comer',  conjugations: ['comi','comiste','comio','comimos','comisteis','comieron'] },
    { verb: 'vivir',  conjugations: ['vivi','viviste','vivio','vivimos','vivisteis','vivieron'] },
    { verb: 'ser',    conjugations: ['fui','fuiste','fue','fuimos','fuisteis','fueron'] },
    { verb: 'hacer',  conjugations: ['hice','hiciste','hizo','hicimos','hicisteis','hicieron'] },
    { verb: 'tener',  conjugations: ['tuve','tuviste','tuvo','tuvimos','tuvisteis','tuvieron'] },
    { verb: 'estar',  conjugations: ['estuve','estuviste','estuvo','estuvimos','estuvisteis','estuvieron'] },
  ],
  imperfecto: [
    { verb: 'hablar', conjugations: ['hablaba','hablabas','hablaba','hablábamos','hablabais','hablaban'] },
    { verb: 'comer',  conjugations: ['comia','comias','comia','comiamos','comiais','comian'] },
    { verb: 'vivir',  conjugations: ['vivia','vivias','vivia','viviamos','viviais','vivian'] },
    { verb: 'ser',    conjugations: ['era','eras','era','éramos','erais','eran'] },
    { verb: 'ir',     conjugations: ['iba','ibas','iba','ibamos','ibais','iban'] },
    { verb: 'ver',    conjugations: ['veia','veias','veia','veiamos','veiais','veian'] },
  ],
  futuro: [
    { verb: 'hablar', conjugations: ['hablare','hablaras','hablara','hablaremos','hablareis','hablaran'] },
    { verb: 'comer',  conjugations: ['comere','comeras','comera','comeremos','comereis','comeran'] },
    { verb: 'vivir',  conjugations: ['vivire','viviras','vivira','viviremos','vivireis','viviran'] },
    { verb: 'tener',  conjugations: ['tendre','tendras','tendra','tendremos','tendreis','tendran'] },
    { verb: 'poder',  conjugations: ['podre','podras','podra','podremos','podreis','podran'] },
    { verb: 'hacer',  conjugations: ['hare','haras','hara','haremos','hareis','haran'] },
    { verb: 'salir',  conjugations: ['saldre','saldras','saldra','saldremos','saldreis','saldran'] },
    { verb: 'venir',  conjugations: ['vendre','vendras','vendra','vendremos','vendreis','vendran'] },
  ],
  condicional: [
    { verb: 'hablar',
      conjugations: ['hablaria','hablarias','hablaria','hablariamos','hablariais','hablarian'] },
    { verb: 'comer',
      conjugations: ['comeria','comerias','comeria','comeriamos','comeriais','comerian'] },
    { verb: 'vivir',
      conjugations: ['viviria','vivirias','viviria','viviriamos','viviriais','vivirian'] },
    { verb: 'tener',
      conjugations: ['tendria','tendrias','tendria','tendriamos','tendriais','tendrian'] },
    { verb: 'poder',
      conjugations: ['podria','podrias','podria','podriamos','podriais','podrian'] },
    { verb: 'hacer',
      conjugations: ['haria','harias','haria','hariamos','hariais','harian'] },
  ],
  pluscuamperfecto: [
    { verb: 'hablar',   conjugations: PQ1 },
    { verb: 'comer',    conjugations: PQ2 },
    { verb: 'vivir',    conjugations: PQ3 },
    { verb: 'hacer',    conjugations: PQ4 },
    { verb: 'ver',      conjugations: PQ5 },
    { verb: 'escribir', conjugations: PQ6 },
  ],
  subjuntivo_presente: [
    { verb: 'hablar', conjugations: ['hable','hables','hable','hablemos','hableis','hablen'] },
    { verb: 'comer',  conjugations: ['coma','comas','coma','comamos','comais','coman'] },
    { verb: 'vivir',  conjugations: ['viva','vivas','viva','vivamos','vivais','vivan'] },
    { verb: 'ser',    conjugations: ['sea','seas','sea','seamos','seais','sean'] },
    { verb: 'estar',  conjugations: ['este','estes','este','estemos','esteis','esten'] },
    { verb: 'tener',  conjugations: ['tenga','tengas','tenga','tengamos','tengais','tengan'] },
    { verb: 'hacer',  conjugations: ['haga','hagas','haga','hagamos','hagais','hagan'] },
    { verb: 'ir',     conjugations: ['vaya','vayas','vaya','vayamos','vayais','vayan'] },
  ],
};

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

  const generateExercise = () => {
    const verbs = verbsByTense[selectedTense] || verbsByTense.presente;
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const isImp = selectedTense === 'imperativo';
    const idx = Math.floor(Math.random() * (isImp ? 5 : 6));
    const ctxArr = CTX[selectedTense] || CTX_PRESENTE;
    setCurrentExercise({
      id: Date.now(), verb: verb.verb, pronoun: idx,
      tense: selectedTense, contextPhrase: ctxArr[idx],
      answer: verb.conjugations[idx],
    });
    setUserAnswer('');
    setShowResult(false);
  };

  // useEffect AVANT le return conditionnel catalan
  useEffect(() => {
    if (mode === 'practice' && targetLanguage === 'spanish') generateExercise();
  }, [mode, selectedTense, targetLanguage]);

  // Return conditionnel APRES tous les hooks
  if (targetLanguage === 'catalan') return <CatalanSection language={language} />;

  const pronouns = ['yo','tu','el/ella','nosotros','vosotros','ellos/ellas'];
  const imperativePronouns = ['tu','usted','nosotros','vosotros','ustedes'];

  const tenses = {
    fr: {
      presente: 'Present', preterito_perfecto: 'Passe compose',
      imperativo: 'Imperatif', preterito: 'Passe simple',
      imperfecto: 'Imparfait', futuro: 'Futur',
      condicional: 'Conditionnel', pluscuamperfecto: 'Plus-que-parfait',
      subjuntivo_presente: 'Subjonctif',
    },
    en: {
      presente: 'Present', preterito_perfecto: 'Present Perfect',
      imperativo: 'Imperative', preterito: 'Preterite',
      imperfecto: 'Imperfect', futuro: 'Future',
      condicional: 'Conditional', pluscuamperfecto: 'Past Perfect',
      subjuntivo_presente: 'Subjunctive',
    },
  };

  const checkAnswer = () => {
    if (!currentExercise) return;
    const ok = userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase();
    setShowResult(true);
    setScore(p => ({ correct: p.correct + (ok ? 1 : 0), total: p.total + 1 }));
  };

  const t = language === 'fr'
    ? { theory: 'Theorie', practice: 'Pratique', score: 'Score',
        hint: 'Phrase :', conjugate: 'Conjugue', check: 'Verifier',
        next: 'Suivant', correct: 'Correct !', incorrect: 'Incorrect',
        answer: 'Bonne reponse', select: 'Choisis un temps' }
    : { theory: 'Theory', practice: 'Practice', score: 'Score',
        hint: 'Context:', conjugate: 'Conjugate', check: 'Check',
        next: 'Next', correct: 'Correct!', incorrect: 'Incorrect',
        answer: 'Correct answer', select: 'Choose a tense' };

  return (
    <div className="space-y-6">
      <div className="flex justify-center gap-2">
        <button onClick={() => setMode('theory')}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            mode === 'theory' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}>{t.theory}</button>
        <button onClick={() => setMode('practice')}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            mode === 'practice' ? 'bg-green-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
          }`}>{t.practice}</button>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <label className="block text-sm text-slate-400 mb-2">{t.select}</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(tenses[language])
            .filter(([key]) => availableTenses.includes(key))
            .map(([key, value]) => (
              <button key={key} onClick={() => setSelectedTense(key)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTense === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
                }`}>{value}</button>
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
                <div className="text-sm text-purple-300 mb-1">{t.hint}</div>
                <div className="text-lg font-semibold text-white italic">
                  "{currentExercise.contextPhrase}"
                </div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 mb-2">{t.conjugate}</div>
                <div className="text-4xl font-bold text-blue-400 mb-1">{currentExercise.verb}</div>
                <div className="text-2xl text-slate-300">
                  ({selectedTense === 'imperativo'
                    ? imperativePronouns[currentExercise.pronoun]
                    : pronouns[currentExercise.pronoun]})
                </div>
              </div>
              {!showResult ? (
                <>
                  <input type="text" value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && checkAnswer()}
                    placeholder="..."
                    className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-lg text-white text-center text-2xl focus:outline-none"
                    autoFocus />
                  <button onClick={checkAnswer} disabled={!userAnswer.trim()}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition text-xl">
                    {t.check}
                  </button>
                </>
              ) : (
                <>
                  <div className={`p-6 rounded-lg text-center ${
                    userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase()
                      ? 'bg-green-900 bg-opacity-30 border-2 border-green-600'
                      : 'bg-red-900 bg-opacity-30 border-2 border-red-600'
                  }`}>
                    <div className="text-3xl mb-4">
                      {userAnswer.trim().toLowerCase() === currentExercise.answer.toLowerCase()
                        ? t.correct : t.incorrect}
                    </div>
                    {userAnswer.trim().toLowerCase() !== currentExercise.answer.toLowerCase() && (
                      <div>
                        <div className="text-slate-400 mb-2">{t.answer}:</div>
                        <div className="text-3xl font-bold text-green-400">
                          {currentExercise.answer}
                        </div>
                      </div>
                    )}
                  </div>
                  <button onClick={generateExercise}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition text-xl">
                    {t.next} →
                  </button>
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-h-96 overflow-y-auto space-y-4">
          {verbsByTense[selectedTense]?.map((verb, idx) => (
            <div key={idx} className="bg-slate-900 rounded-lg p-4">
              <h4 className="text-xl font-bold text-white mb-3 capitalize">{verb.verb}</h4>
              <div className="grid grid-cols-2 gap-2">
                {(selectedTense === 'imperativo' ? imperativePronouns : pronouns).map((p, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-slate-800 rounded">
                    <span className="text-slate-400">{p}</span>
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
