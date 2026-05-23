"use client";

import { motion } from "framer-motion";

export default function HomeMission() {
  return (
    <section style={{ background:"linear-gradient(135deg,#3D2840,#6B3A7A)", padding:"5rem 4rem", overflow:"hidden", position:"relative" }}>
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}
        style={{ maxWidth:"800px", margin:"0 auto", textAlign:"center" }}>
        <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(252,222,192,0.8)", marginBottom:"1rem" }}>
          ✦ Our Mission
        </p>
        <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:300, fontStyle:"italic", color:"#fff", lineHeight:1.3, marginBottom:"1.5rem" }}>
          "Every woman deserves a space that understands her body as deeply as she does."
        </h2>
        <p style={{ color:"rgba(255,255,255,0.7)", fontSize:"1rem", lineHeight:1.8 }}>
          CYRA was built on the belief that women's health should feel supported, not clinical. We combine hormonal science with emotional intelligence to create a platform that genuinely cares.
        </p>
      </motion.div>

      {/* Floating pills */}
      <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"0.75rem", marginTop:"3rem" }}>
        {["🩸 Period Positive", "🌿 Hormone Aware", "🧠 Emotionally Intelligent", "🔒 Always Private", "💕 Zero Judgment"].map((tag) => (
          <div key={tag} style={{ background:"rgba(255,255,255,0.1)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:"50px", padding:"0.6rem 1.2rem", color:"rgba(255,255,255,0.88)", fontSize:"0.85rem", fontWeight:500 }}>
            {tag}
          </div>
        ))}
      </div>
    </section>
  );
}
