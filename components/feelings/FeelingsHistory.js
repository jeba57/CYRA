"use client";

import { motion } from "framer-motion";

const HISTORY = [
  { date:"Today, May 22", mood:"😊", energy:7, pain:2, note:"Feeling light and calm today." },
  { date:"Yesterday, May 21", mood:"🙂", energy:5, pain:4, note:"Lower back ache, but manageable." },
  { date:"May 20", mood:"😔", energy:3, pain:7, note:"Heavy cramps. Stayed home." },
  { date:"May 19", mood:"😔", energy:4, pain:6, note:"Period started. Very tired." },
  { date:"May 18", mood:"🙂", energy:6, pain:1, note:"Good day overall." },
];

export default function FeelingsHistory() {
  return (
    <section style={{ padding:"4rem 4rem", background:"#F5EDE6" }}>
      <div style={{ maxWidth:"640px", margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
          <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.75rem", fontWeight:400, color:"#3D2840", marginBottom:"1.5rem" }}>
            Your recent check-ins
          </h3>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem" }}>
            {HISTORY.map((h, i) => (
              <motion.div key={i} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.08 }}
                style={{ background:"#fff", borderRadius:"18px", padding:"1.25rem 1.5rem", border:"1px solid rgba(232,160,156,0.15)", display:"flex", gap:"1rem", alignItems:"flex-start" }}>
                <span style={{ fontSize:"1.6rem", flexShrink:0 }}>{h.mood}</span>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.4rem" }}>
                    <span style={{ fontSize:"0.78rem", fontWeight:700, color:"#9B7B9E" }}>{h.date}</span>
                    <div style={{ display:"flex", gap:"0.75rem" }}>
                      <span style={{ fontSize:"0.72rem", color:"#6B4E6E" }}>⚡ {h.energy}/10</span>
                      <span style={{ fontSize:"0.72rem", color:"#6B4E6E" }}>💧 Pain {h.pain}/10</span>
                    </div>
                  </div>
                  <p style={{ fontSize:"0.85rem", color:"#6B4E6E", lineHeight:1.5 }}>{h.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
