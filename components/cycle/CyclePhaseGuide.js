"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHASES = [
  { icon:"🩸", name:"Menstruation", days:"Days 1–5", color:"#C8909A", bg:"rgba(200,144,154,0.1)",
    hormone:"Estrogen & progesterone drop to lowest", energy:"Low — rest is essential",
    mood:"Reflective, introverted, sensitive", bestFor:"Rest, journaling, warm foods, gentle walks",
    detail:"Your uterus sheds its lining. Prostaglandins cause the contractions you feel as cramps. Iron, magnesium, and warmth are your best friends right now." },
  { icon:"🌱", name:"Follicular", days:"Days 6–13", color:"#3D9B8A", bg:"rgba(157,221,208,0.1)",
    hormone:"Estrogen rises steadily", energy:"Rising — you have more fuel",
    mood:"Optimistic, motivated, social", bestFor:"New projects, socialising, learning, cardio",
    detail:"FSH stimulates follicles in your ovaries. Estrogen builds the uterine lining back up. Your brain is sharper and your mood is lighter — lean into it." },
  { icon:"✨", name:"Ovulation", days:"Day 14", color:"#9B7BB8", bg:"rgba(155,123,184,0.1)",
    hormone:"LH surge, estrogen peaks sharply", energy:"Peak — you feel unstoppable",
    mood:"Confident, magnetic, extroverted", bestFor:"Big presentations, dates, intense workouts",
    detail:"An egg is released from the follicle. Your voice is more attractive, your face more symmetric, your pain tolerance highest. This is your biological superpower day." },
  { icon:"🍂", name:"Luteal", days:"Days 15–28", color:"#B8924A", bg:"rgba(252,222,192,0.25)",
    hormone:"Progesterone rises, then drops sharply", energy:"Declining — honor the slowdown",
    mood:"Introspective, sensitive, detail-oriented", bestFor:"Creative work, admin tasks, gentle movement",
    detail:"Progesterone prepares the uterus for possible implantation. When it drops near the end, PMS symptoms appear. Magnesium and B6 help significantly." },
];

export default function CyclePhaseGuide() {
  const [selected, setSelected] = useState(null);

  return (
    <section style={{ padding: "4rem 1.5rem", background: "linear-gradient(160deg,#F5EDE6,#FDF8F3)" }}>
      <style>{`
        .phase-guide-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        @media (max-width: 900px) {
          .phase-guide-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .phase-guide-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
        style={{ textAlign:"center", marginBottom:"2rem", maxWidth:"500px", margin:"0 auto 2rem" }}>
        <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8909A", marginBottom:"0.75rem" }}>✦ Phase Guide</p>
        <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:300, color:"#3D2840" }}>
          Tap a phase to learn more
        </h2>
      </motion.div>

      <div className="phase-guide-grid" style={{ maxWidth:"1000px", margin:"0 auto" }}>
        {PHASES.map((p, i) => (
          <motion.div key={p.name}
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }}
            onClick={() => setSelected(selected === i ? null : i)}
            style={{
              background: selected === i ? `linear-gradient(135deg,${p.color}18,${p.color}08)` : "#fff",
              borderRadius:"20px", padding:"1.5rem",
              border: selected === i ? `2px solid ${p.color}` : `1px solid ${p.color}22`,
              transition:"all 0.35s", cursor:"pointer",
              boxShadow: selected === i ? `0 12px 40px ${p.color}30` : "0 4px 16px rgba(61,40,64,0.06)",
            }}
            onMouseEnter={(e) => { if (selected !== i) { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 35px ${p.color}25`; } }}
            onMouseLeave={(e) => { if (selected !== i) { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(61,40,64,0.06)"; } }}
          >
            <div style={{ width:"42px", height:"42px", borderRadius:"14px", background:p.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.25rem", marginBottom:"0.85rem" }}>{p.icon}</div>

            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.4rem" }}>
              <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:p.color }} />
              <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.1rem", fontWeight:600, color:"#3D2840" }}>{p.name}</h3>
            </div>
            <p style={{ fontSize:"0.7rem", color:p.color, fontWeight:700, marginBottom:"0.85rem", letterSpacing:"0.04em" }}>{p.days}</p>

            {/* Always-visible basics */}
            <div style={{ display:"flex", flexDirection:"column", gap:"0.35rem", fontSize:"0.78rem" }}>
              <div style={{ display:"flex", gap:"0.5rem" }}>
                <span style={{ color:"#9B7B9E", fontWeight:600, minWidth:"58px" }}>Energy:</span>
                <span style={{ color:"#6B4E6E" }}>{p.energy.split("—")[0]}</span>
              </div>
              <div style={{ display:"flex", gap:"0.5rem" }}>
                <span style={{ color:"#9B7B9E", fontWeight:600, minWidth:"58px" }}>Mood:</span>
                <span style={{ color:"#6B4E6E" }}>{p.mood.split(",")[0]}</span>
              </div>
            </div>

            {/* Expanded detail */}
            <AnimatePresence>
              {selected === i && (
                <motion.div
                  initial={{ opacity:0, height:0 }}
                  animate={{ opacity:1, height:"auto" }}
                  exit={{ opacity:0, height:0 }}
                  transition={{ duration:0.3 }}
                  style={{ overflow:"hidden", marginTop:"1rem", paddingTop:"1rem", borderTop:`1px solid ${p.color}33` }}
                >
                  <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem", fontSize:"0.78rem", marginBottom:"0.85rem" }}>
                    {[["Hormone", p.hormone], ["Best For", p.bestFor]].map(([k,v]) => (
                      <div key={k} style={{ display:"flex", gap:"0.5rem" }}>
                        <span style={{ color:"#9B7B9E", fontWeight:700, minWidth:"68px" }}>{k}:</span>
                        <span style={{ color:"#3D2840" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize:"0.78rem", color:"#6B4E6E", lineHeight:1.7, background:"rgba(255,255,255,0.7)", borderRadius:"10px", padding:"0.75rem", fontStyle:"italic" }}>
                    {p.detail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}