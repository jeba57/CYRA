"use client";

import { motion } from "framer-motion";

export default function CycleInsights() {
  return (
    <section style={{ padding:"4rem 4rem", background:"#fff" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center" }}>
        <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
          <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8909A", marginBottom:"0.75rem" }}>🌷 Cycle Insights</p>
          <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:300, color:"#3D2840", marginBottom:"1rem" }}>
            Patterns that help you <em style={{ fontStyle:"italic", color:"#C8909A" }}>understand yourself</em>
          </h2>
          <p style={{ color:"#6B4E6E", fontSize:"0.95rem", lineHeight:1.8, marginBottom:"2rem" }}>
            After 2–3 cycles, CYRA begins to surface personalised patterns — your typical cycle length, heaviest days, PMS patterns, and when you feel most energetic.
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            {[
              { icon:"📊", title:"Avg. cycle length", val:"28 days" },
              { icon:"🩸", title:"Avg. period length", val:"4–5 days" },
              { icon:"⚡", title:"Peak energy phase", val:"Ovulation" },
              { icon:"😔", title:"PMS pattern detected", val:"Days 24–28" },
            ].map(({ icon, title, val }) => (
              <div key={title} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.85rem 1.25rem", background:"#F5EDE6", borderRadius:"14px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                  <span style={{ fontSize:"1.1rem" }}>{icon}</span>
                  <span style={{ fontSize:"0.88rem", color:"#6B4E6E", fontWeight:500 }}>{title}</span>
                </div>
                <span style={{ fontSize:"0.88rem", fontWeight:700, color:"#C8909A" }}>{val}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          style={{ borderRadius:"24px", overflow:"hidden", height:"420px", boxShadow:"0 24px 60px rgba(61,40,64,0.1)" }}>
          <img src="https://images.unsplash.com/photo-1543169108-32ac15a21e05?w=600&q=85" alt="woman thoughtful wellness" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        </motion.div>
      </div>
    </section>
  );
}
