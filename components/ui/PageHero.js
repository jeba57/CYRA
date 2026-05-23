"use client";

import { motion } from "framer-motion";

export function PageHero({ badge, title, titleEm, subtitle, bgFrom = "#FDF8F3", bgTo = "#EDE0F5", dark = false, image }) {
  const textColor = dark ? "#fff" : "#3D2840";
  const subColor  = dark ? "rgba(255,255,255,0.72)" : "#6B4E6E";
  const badgeStyle = dark
    ? { background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.2)", color:"rgba(252,222,192,0.9)" }
    : { background:"rgba(255,255,255,0.38)", border:"1px solid rgba(255,255,255,0.55)", color:"#C8909A" };

  return (
    <section style={{ minHeight:"50vh", background:`linear-gradient(135deg,${bgFrom},${bgTo})`, display:"flex", alignItems:"center", padding:"8rem 4rem 4rem", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"relative", zIndex:1, maxWidth:"650px" }}>
        {badge && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
            style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", borderRadius:"50px", padding:"0.4rem 1.1rem", fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.06em", marginBottom:"1.5rem", ...badgeStyle }}>
            {badge}
          </motion.div>
        )}
        <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}
          style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(2.5rem,4.5vw,3.8rem)", fontWeight:300, lineHeight:1.15, color:textColor, marginBottom:"1rem" }}>
          {title}<br /><em style={{ fontStyle:"italic", color: dark ? "#FCDEC0" : "#C8909A" }}>{titleEm}</em>
        </motion.h1>
        {subtitle && (
          <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
            style={{ fontSize:"1.05rem", color:subColor, lineHeight:1.8 }}>
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
