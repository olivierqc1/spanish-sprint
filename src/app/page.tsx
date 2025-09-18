import DailyPlan from "@/components/DailyPlan";
import Flashcards from "@/components/Flashcards";
import HourCounter from "@/components/HourCounter";
import Reading from "@/components/Reading";
import GrammarExplorer from "@/components/GrammarExplorer";


export default function Page() {
return (
<main className="vstack" style={{ gap: 16 }}>
<DailyPlan />
<div className="hstack" style={{ alignItems:'stretch' }}>
<div style={{ flex: 1 }}><Flashcards /></div>
<div style={{ flex: 1 }}><HourCounter /></div>
</div>
<Reading />
<GrammarExplorer />
<div className="card muted">
Astuce: réduis l’écriture aux 5 phrases clés. Focus vocabulaire + écoute + oral au début.
</div>
</main>
);
}