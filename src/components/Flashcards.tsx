"use client";
import { useEffect, useState } from "react";


type Card = { front: string; back: string };
const defaultSeed: Card[] = [
{ front: "ser", back: "être (essence) — soy, eres, es, somos, sois, son" },
{ front: "estar", back: "être (état/lieu) — estoy, estás, está, estamos, estáis, están" },
{ front: "tener", back: "avoir — tengo, tienes, tiene, tenemos, tenéis, tienen" },
{ front: "me gusta", back: "j’aime (singulier) / me gustan (pluriel)" },
{ front: "ayer / hoy / mañana", back: "hier / aujourd’hui / demain" },
];


export default function Flashcards() {
const [cards, setCards] = useState<Card[]>([]);
const [i, setI] = useState(0);
const [show, setShow] = useState(false);
const [front, setFront] = useState("");
const [back, setBack] = useState("");


// Charger depuis localStorage
useEffect(()=>{
const saved = localStorage.getItem("flashcards_custom");
if (saved) {
try {
setCards(JSON.parse(saved));
} catch {
setCards(defaultSeed);
}
} else {
setCards(defaultSeed);
}
}, []);


function addCard() {
if (!front.trim() || !back.trim()) return;
const newCards = [...cards, { front, back }];
setCards(newCards);
localStorage.setItem("flashcards_custom", JSON.stringify(newCards));
setFront("");
setBack("");
}


const cur = cards[i % (cards.length||1)];


return (
<div className="card vstack">
<div className="hstack" style={{ justifyContent:'space-between' }}>
<strong>Flashcards</strong>
<span className="badge">{cards.length? i+1:0}/{cards.length}</span>
</div>
{cur && (
<div style={{ fontSize:22, minHeight: 60 }}>
{show ? cur.back : cur.front}
</div>
)}
<div className="hstack">
<button onClick={()=> setShow(s=>!s)} className="badge">{show?"Cacher":"Montrer"}</button>
<button onClick={()=> { setI((i+1)%cards.length); setShow(false);} } className="badge">Suivante →</button>
</div>
<hr />
<div className="vstack">
);
}