"use client";
import { useState } from "react";


export default function HourCounter() {
const [minutes, setMinutes] = useState(0);
return (
<div className="card vstack">
<div className="hstack" style={{ justifyContent:'space-between' }}>
<strong>Compteur d’étude</strong>
<span className="badge">{(minutes/60).toFixed(2)} h</span>
</div>
<input
type="range" min={0} max={480} value={minutes}
onChange={(e)=> setMinutes(parseInt(e.target.value))}
/>
<div className="muted">Glisse pour noter ton temps (0–480 min)</div>
</div>
);
}
