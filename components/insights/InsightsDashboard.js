"use client";

import { motion } from "framer-motion";

const STATS = [
  { icon:"🌙", label:"Avg. Cycle Length", value:"28 days", sub:"Regular — great!" },
  { icon:"🩸", label:"Avg. Period Length", value:"4.5 days", sub:"Within normal range" },
  { icon:"⚡", label:"Peak Energy Phase", value:"Ovulation", sub:"Day 13–15" },
  { icon:"😊", label:"Best Mood Days", value:"Days 8–13", sub:"Follicular phase" },
  { icon:"😔", label:"PMS Window", value:"Days 24–28", sub:"Luteal phase" },
  { icon:"🔥", label:"Current Streak", value:"12 days", sub:"Keep going! 🌸" },
];

export default function InsightsDashboard() {
  return (
    <section style={{ padding:"4rem 4rem", background:"#fff" }}>
      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
        <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8909A", marginBottom:"0.75rem" }}>✦ Your Overview</p>
        <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:300, color:"#3D2840", marginBottom:"2.5rem" }}>
          This month's <em style={{ fontStyle:"italic", color:"#C8909A" }}>highlights</em>
        </h2>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1rem" }}>
          {STATS.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.07 }}
              style={{ background:"#F5EDE6", borderRadius:"20px", padding:"1.5rem", border:"1px solid rgba(232,160,156,0.12)", transition:"all 0.3s", cursor:"default" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 12px 30px rgba(61,40,64,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
              <span style={{ fontSize:"1.5rem", display:"block", marginBottom:"0.75rem" }}>{s.icon}</span>
              <div style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.6rem", fontWeight:600, color:"#3D2840", marginBottom:"0.2rem" }}>{s.value}</div>
              <div style={{ fontSize:"0.8rem", fontWeight:700, color:"#6B4E6E", marginBottom:"0.2rem" }}>{s.label}</div>
              <div style={{ fontSize:"0.72rem", color:"#C8909A", fontWeight:600 }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
