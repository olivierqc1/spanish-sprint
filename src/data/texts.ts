export type ReadingItem = {
id: string;
title: string;
author: string;
level: "A1" | "A2" | "B1";
type: "poème" | "fable" | "article" | "dialogue";
excerpt: string; // court extrait (domaine public ou très court)
glosses?: { [word: string]: string };
prompts?: string[]; // petites questions de compréhension / production
};


export const readings: ReadingItem[] = [
{
id: "dialogo_cafe_a1",
title: "En el café",
author: "Anónimo",
level: "A1",
type: "dialogue",
excerpt: "—Buenos días. ¿Qué desea? —Un café con leche, por favor. —¿Algo más? —Sí, una tostada. —Enseguida.",
glosses: { desea: "désirez‑vous", tostada: "toast" },
prompts: ["Qui commande quoi?", "Joue la scène avec un ami."],
},
{
id: "becquer_rima_xxi_a2",
title: "Rima XXI (extrait)",
author: "Gustavo Adolfo Bécquer (1836–1870)",
level: "A2",
type: "poème",
excerpt: "¿Qué es poesía? —dices mientras clavas
en mi pupila tu pupila azul—.
¿Qué es poesía? ¿Y tú me lo preguntas?
Poesía... eres tú.",
glosses: { pupila: "pupille", clavar: "fixer (regard)" },
prompts: ["Repère les verbes au présent.", "Récite le poème en marquant le rythme."],
},
{
id: "samaniego_uvas_a2",
title: "La zorra y las uvas (extrait)",
author: "Félix María de Samaniego (1745–1801)",
level: "A2",
type: "fable",
excerpt: "Una zorra, con hambre, vio colgar de una parra unos racimos de uvas... Probó a cogerlos; mas cansada, sin lograrlo, se fue diciendo: '¡No están maduras!'.",
glosses: { zorra: "renarde", parra: "treille", racimos: "grappes" },
prompts: ["Raconte l’histoire au pretérito.", "Quelle est la morale?"],
},
{
];