"use client";

import { motion } from "framer-motion";

export default function AskHero() {
  return (
    <section style={{ minHeight:"50vh", background:"linear-gradient(135deg,#3D2840,#6B3A7A,#9B7BB8)", display:"flex", alignItems:"center", padding:"8rem 4rem 4rem", position:"relative", overflow:"hidden" }}>
      <motion.div style={{ position:"absolute", top:"-150px", right:"-150px", width:"500px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle,rgba(252,222,192,0.12),transparent 70%)", pointerEvents:"none" }} animate={{ scale:[1,1.08,1] }} transition={{ duration:9, repeat:Infinity }} />
      <div style={{ position:"relative", zIndex:1, maxWidth:"650px" }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(255,255,255,0.12)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"50px", padding:"0.4rem 1.1rem", fontSize:"0.78rem", fontWeight:700, color:"rgba(252,222,192,0.9)", letterSpacing:"0.06em", marginBottom:"1.5rem" }}>
          🧸 Ask CYRA AI
        </motion.div>
        <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}
          style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(2.5rem,4.5vw,3.8rem)", fontWeight:300, lineHeight:1.15, color:"#fff", marginBottom:"1rem" }}>
          An AI that listens<br /><em style={{ fontStyle:"italic", color:"#FCDEC0" }}>with warmth.</em>
        </motion.h1>
        <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
          style={{ fontSize:"1.05rem", color:"rgba(255,255,255,0.75)", lineHeight:1.8 }}>
          CYRA AI is designed to feel like a knowledgeable friend — never clinical, never cold. Available 24/7, completely private.
        </motion.p>
      </div>
    </section>
  );
}
