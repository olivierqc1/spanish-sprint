export type Drill = { id: string; prompt: string; answer?: string };
export const grammarPoints: GrammarPoint[] = [
{
id: "presente_basico",
level: "A1",
topic: "Présent indicatif — verbes réguliers -AR/-ER/-IR",
explanation: "Conjugue -o, -as/-es, -a/-e, -amos/-emos/-imos, -áis/-éis/-ís, -an/-en.",
patterns: ["hablar, comer, vivir"],
drills: [
{ id: "d1", prompt: "Yo ____ (hablar) español cada día.", answer: "hablo" },
{ id: "d2", prompt: "Nosotros ____ (comer) temprano.", answer: "comemos" },
{ id: "d3", prompt: "Ellos ____ (vivir) en Perú.", answer: "viven" },
{ id: "d4", prompt: "Tú ____ (hablar) francés, ¿no?", answer: "hablas" },
{ id: "d5", prompt: "Ella ____ (comer) en casa.", answer: "come" },
],
},
{
id: "ser_estar_basico",
level: "A1",
topic: "SER vs ESTAR (valeurs de base)",
explanation: "SER: essence/origine/profession/heure; ESTAR: état/lieu.",
drills: [
{ id: "d1", prompt: "Madrid ____ en España.", answer: "está" },
{ id: "d2", prompt: "Yo ____ canadiense.", answer: "soy" },
{ id: "d3", prompt: "Hoy ____ cansado.", answer: "estoy" },
{ id: "d4", prompt: "¿Qué hora ____?", answer: "es" },
],
},
{
id: "perfecto_basico",
level: "A2",
topic: "Pretérito perfecto — haber + participio",
explanation: "he/has/ha/hemos/habéis/han + -ado/-ido ; irréguliers: hecho, visto, dicho, puesto…",
drills: [
{ id: "d1", prompt: "Yo ____ (ver) la película.", answer: "he visto" },
{ id: "d2", prompt: "¿____ (hacer, tú) la tarea?", answer: "has hecho" },
{ id: "d3", prompt: "Nosotros ____ (comer) ya.", answer: "hemos comido" },
],
},
{
id: "indefinido_irreg",
level: "A2",
topic: "Pretérito indefinido — irréguliers communes",
explanation: "estuve, tuve, fui/ser, hice, pude, puse…",
drills: [
{ id: "d1", prompt: "Ayer yo ____ (ir) al cine.", answer: "fui" },
{ id: "d2", prompt: "Ellos ____ (tener) un problema.", answer: "tuvieron" },
{ id: "d3", prompt: "Nosotros ____ (estar) en Madrid.", answer: "estuvimos" },
],
},
{
id: "futuro_cond",
level: "B1",
topic: "Futuro y Condicional — formas básicas",
explanation: "Futur: cantaré; Cond.: cantaría. Irrég.: haré/haría, podré/podría, tendré/tendría…",
drills: [
{ id: "d1", prompt: "Mañana ____ (hacer, yo) deporte.", answer: "haré" },
{ id: "d2", prompt: "Con más tiempo, ____ (poder, nosotros) viajar.", answer: "podríamos" },
{ id: "d3", prompt: "¿Qué ____ (decir, tú) en su lugar?", answer: "dirías" },
],
},
];