"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const PHASES = ["All", "Menstruation", "Follicular", "Ovulation", "Luteal"];

export default function TipsPhaseFilter() {
  const [active, setActive] = useState("All");
  return (
    <section style={{ padding:"2.5rem 4rem 0", background:"#fff" }}>
      <div style={{ display:"flex", gap:"0.6rem", flexWrap:"wrap" }}>
        {PHASES.map(p => (
          <button key={p} onClick={() => setActive(p)}
            style={{ background:active===p?"linear-gradient(135deg,#C8909A,#9B7BB8)":active===p?"#F7D6D0":"#F5EDE6", color:active===p?"#fff":"#6B4E6E", border:"none", padding:"0.5rem 1.2rem", borderRadius:"50px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.83rem", fontWeight:active===p?700:500, cursor:"pointer", transition:"all 0.25s" }}>
            {p}
          </button>
        ))}
      </div>
    </section>
  );
}
