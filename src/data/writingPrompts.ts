// src/data/writingPrompts.ts
// Banque de sujets d'écriture en català. Un sujet différent chaque jour
// (rotation basée sur la date), avec le thème grammatical visé.

export type WritingPrompt = {
  ca: string;   // la consigne, en català
  theme: string; // point grammatical travaillé
};

export const WRITING_PROMPTS: WritingPrompt[] = [
  { ca: "Explica què vas fer ahir, del matí fins a la nit.", theme: "Passats (perfet / perifràstic)" },
  { ca: "Descriu casa teva i el teu barri, a prop de la Sagrada Família.", theme: "Present, descripció, lloc" },
  { ca: "Com serà la teva vida quan comencis el màster a la UB?", theme: "Futur" },
  { ca: "Si guanyessis 10.000 €, què faries?", theme: "Condicional + si" },
  { ca: "Explica una cursa de muntanya, de la sortida fins al cim.", theme: "Passats + lèxic" },
  { ca: "Descriu la teva rutina del matí i canvia els noms per pronoms febles.", theme: "Pronoms febles" },
  { ca: "Quan eres petit al Quebec, com era la teva vida?", theme: "Imperfet" },
  { ca: "Recomana a un amic tres coses que hagi de fer a Barcelona.", theme: "Subjuntiu (que faci, que visiti)" },
  { ca: "Explica per què has decidit aprendre català.", theme: "Perfet + opinió" },
  { ca: "Descriu el teu grup de música preferit i per què t'agrada.", theme: "Present, gustos" },
  { ca: "Compara la vida a Barcelona i a Montreal.", theme: "Comparatius" },
  { ca: "Explica un problema que hagis tingut amb el pis o el propietari.", theme: "Passats + subjuntiu" },
  { ca: "Què faràs aquest cap de setmana? I què vas fer el passat?", theme: "Futur vs passat" },
  { ca: "Dona la teva opinió: és millor viure a ciutat o al camp?", theme: "Argumentació + connectors" },
  { ca: "Explica la història romana de Barcelona (Barcino) en 8 frases.", theme: "Passat + història" },
  { ca: "Descriu un viatge que has fet i què vas veure.", theme: "Passats + lèxic viatge" },
  { ca: "Escriu una carta a un amic per convèncer-lo de venir a viure a Catalunya.", theme: "Futur + subjuntiu + arguments" },
  { ca: "Explica què faries si no haguessis de treballar durant un any.", theme: "Condicional" },
  { ca: "Descriu el teu plat preferit i com es prepara.", theme: "Present + imperatiu / pronoms" },
  { ca: "Explica una tradició del Quebec a algú que no la coneix.", theme: "Present + explicació" },
  { ca: "Què és el que més t'agrada i el que menys t'agrada de Barcelona?", theme: "El que + opinió" },
  { ca: "Explica com ha canviat el teu català d'ençà que vas arribar.", theme: "Perfet + imperfet (contrast)" },
  { ca: "Imagina que ets guia turístic: descriu un recorregut pel barri Gòtic.", theme: "Imperatiu / futur + lloc" },
  { ca: "Explica una decisió important que hagis pres i per què.", theme: "Passats + subjuntiu" },
  { ca: "Descriu com serà un dia perfecte per a tu d'aquí a cinc anys.", theme: "Futur" },
  { ca: "Parla d'un llibre o una pel·lícula que t'hagi marcat.", theme: "Passats + subjuntiu relatiu" },
  { ca: "Explica els avantatges i inconvenients de fer running a la muntanya.", theme: "Connectors + argumentació" },
  { ca: "Escriu sobre el vi català: quins coneixes i quins t'agraden.", theme: "Present + gustos + lèxic" },
  { ca: "Explica què has après aquesta setmana estudiant català.", theme: "Perfet" },
  { ca: "Si poguessis viure en qualsevol època de la història, quina triaries?", theme: "Condicional + subjuntiu" },
];

// Jour de l'année -> index stable pour toute la journée.
function dayIndex(d = new Date()): number {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

export function getTodayWritingPrompt(d = new Date()): WritingPrompt {
  return WRITING_PROMPTS[dayIndex(d) % WRITING_PROMPTS.length];
}

// Les n prochains sujets (aujourd'hui inclus), pour donner un aperçu.
export function getUpcomingPrompts(n = 5): WritingPrompt[] {
  const base = dayIndex();
  const out: WritingPrompt[] = [];
  for (let i = 0; i < n; i++) {
    out.push(WRITING_PROMPTS[(base + i) % WRITING_PROMPTS.length]);
  }
  return out;
}
