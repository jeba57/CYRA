"use client";

import { motion } from "framer-motion";

export default function FeelingsHero() {
  return (
    <section style={{ minHeight:"50vh", background:"linear-gradient(135deg,#FDF8F3,#FDE8E0,#F5EEFF)", display:"flex", alignItems:"center", padding:"8rem 4rem 4rem", position:"relative", overflow:"hidden" }}>
      <motion.div style={{ position:"absolute", top:"-120px", right:"-120px", width:"450px", height:"450px", borderRadius:"50%", background:"radial-gradient(circle,rgba(247,214,208,0.5),transparent 70%)", pointerEvents:"none" }} animate={{ scale:[1,1.06,1] }} transition={{ duration:8, repeat:Infinity }} />
      <div style={{ position:"relative", zIndex:1, maxWidth:"650px" }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(255,255,255,0.38)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.55)", borderRadius:"50px", padding:"0.4rem 1.1rem", fontSize:"0.78rem", fontWeight:700, color:"#C8909A", letterSpacing:"0.06em", marginBottom:"1.5rem" }}>
          🌸 Today's Feelings
        </motion.div>
        <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}
          style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(2.5rem,4.5vw,3.8rem)", fontWeight:300, lineHeight:1.15, color:"#3D2840", marginBottom:"1rem" }}>
          How are you <em style={{ fontStyle:"italic", color:"#C8909A" }}>really</em> feeling?
        </motion.h1>
        <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
          style={{ fontSize:"1.05rem", color:"#6B4E6E", lineHeight:1.8 }}>
          No judgment here. Just a gentle space to check in with yourself, log your mood, and understand the patterns that make you, you.
        </motion.p>
      </div>
    </section>
  );
}
