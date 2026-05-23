"use client";

import { motion } from "framer-motion";

export default function MonthlySummary() {
  return (
    <section style={{ padding:"4rem 4rem 5rem", background:"#fff" }}>
      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
        <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8909A", marginBottom:"0.75rem" }}>🌷 Monthly Summary</p>
        <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:300, color:"#3D2840", marginBottom:"2.5rem" }}>
          May 2025 — <em style={{ fontStyle:"italic", color:"#C8909A" }}>how you did</em>
        </h2>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem" }}>
          {/* Summary card */}
          <div style={{ background:"linear-gradient(135deg,#3D2840,#6B3A7A)", borderRadius:"24px", padding:"2rem", color:"#fff" }}>
            <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.4rem", fontWeight:400, marginBottom:"1.25rem", color:"rgba(255,255,255,0.9)" }}>This month in review</h3>
            {[
              ["📅","Days tracked","22 / 31"],
              ["😊","Average mood","6.4 / 10"],
              ["⚡","Average energy","5.8 / 10"],
              ["🌸","Wellness tips read","14"],
              ["🤖","AI conversations","8"],
            ].map(([icon, label, val]) => (
              <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.6rem 0", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.72)", display:"flex", alignItems:"center", gap:"0.5rem" }}><span>{icon}</span>{label}</span>
                <span style={{ fontSize:"0.85rem", fontWeight:700, color:"#FCDEC0" }}>{val}</span>
              </div>
            ))}
          </div>

          {/* CYRA note */}
          <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            <div style={{ background:"#F5EDE6", borderRadius:"20px", padding:"1.75rem", flex:1 }}>
              <div style={{ display:"flex", gap:"0.75rem", alignItems:"flex-start", marginBottom:"1rem" }}>
                <div style={{ width:"38px", height:"38px", borderRadius:"50%", overflow:"hidden", flexShrink:0 }}>
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80" alt="CYRA" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
                <div>
                  <span style={{ fontSize:"0.78rem", fontWeight:700, color:"#C8909A" }}>CYRA AI · Monthly Note</span>
                  <p style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.1rem", fontStyle:"italic", color:"#3D2840", lineHeight:1.5, marginTop:"0.3rem" }}>
                    "You showed up for yourself 22 times this month. That's something to be genuinely proud of, lovely. 🌸"
                  </p>
                </div>
              </div>
              <p style={{ fontSize:"0.85rem", color:"#6B4E6E", lineHeight:1.7 }}>
                Your luteal phase (days 22–28) showed increased pain scores. Consider adding magnesium-rich foods and reducing caffeine next cycle. Your follicular phase energy is consistently your highest — that's a great window for important tasks.
              </p>
            </div>

            <div style={{ background:"linear-gradient(135deg,#FDE8E0,#F7D6D0)", borderRadius:"20px", padding:"1.5rem" }}>
              <h4 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.1rem", fontWeight:600, color:"#3D2840", marginBottom:"0.75rem" }}>Next cycle prediction</h4>
              {[["🩸","Period starts","June 3–5"],["✨","Ovulation","June 17"],["🌼","Fertile window","June 13–18"]].map(([icon, label, date]) => (
                <div key={label} style={{ display:"flex", justifyContent:"space-between", fontSize:"0.83rem", padding:"0.35rem 0" }}>
                  <span style={{ color:"#6B4E6E" }}>{icon} {label}</span>
                  <span style={{ fontWeight:700, color:"#C8909A" }}>{date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
