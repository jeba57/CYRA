"use client";

import { motion } from "framer-motion";

const FEATURES = [
  { icon:"🩺", title:"Period & PCOS Guidance", body:"Answers about symptoms, cycle irregularities, and what to expect — backed by real medical knowledge, delivered gently." },
  { icon:"💕", title:"Emotional Support", body:"When you feel low, overwhelmed, or just need to be heard — CYRA AI holds space for you without judgment, always." },
  { icon:"🌿", title:"Phase-Aware Wellness Tips", body:"Food, movement, sleep, and mindfulness suggestions based on where you are in your cycle right now." },
  { icon:"📋", title:"Symptom Logging", body:"Ask CYRA to log your symptoms, notes, or reminders in natural language — no forms, no friction." },
  { icon:"🔒", title:"Completely Private", body:"Your conversations are never shared, sold, or used for ads. What you share with CYRA stays with CYRA." },
  { icon:"🌍", title:"Indian & Global Wellness", body:"From ginger chai to ashwagandha — CYRA understands both evidence-based medicine and traditional wellness wisdom." },
];

export default function AskFeatures() {
  return (
    <section style={{ padding:"5rem 4rem", background:"#F5EDE6" }}>
      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
        style={{ textAlign:"center", marginBottom:"3rem" }}>
        <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8909A", marginBottom:"0.75rem" }}>✦ What CYRA Can Do</p>
        <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:300, color:"#3D2840" }}>
          More than a chatbot,<br /><em style={{ fontStyle:"italic", color:"#C8909A" }}>a companion</em>
        </h2>
      </motion.div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1.25rem" }}>
        {FEATURES.map((f, i) => (
          <motion.div key={i}
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}
            style={{ background:"#fff", borderRadius:"20px", padding:"1.75rem", border:"1px solid rgba(232,160,156,0.15)", transition:"all 0.35s", cursor:"default" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(61,40,64,0.09)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
            <div style={{ width:"44px", height:"44px", borderRadius:"14px", background:"linear-gradient(135deg,#F7D6D0,#E8E0F5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem", marginBottom:"1rem" }}>{f.icon}</div>
            <h4 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.15rem", fontWeight:600, color:"#3D2840", marginBottom:"0.5rem" }}>{f.title}</h4>
            <p style={{ fontSize:"0.85rem", color:"#9B7B9E", lineHeight:1.7 }}>{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
