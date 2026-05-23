"use client";

import { motion } from "framer-motion";

const FILLED  = [1,2,4,5,6,8,9,10,11,12,14,15,16,17,18,19,20,21,22];
const GLOWING = [10,11,12,19,20,21];

export default function BloomTracker() {
  return (
    <section style={{ padding:"4rem 4rem", background:"#fff" }}>
      <div style={{ maxWidth:"640px", margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          style={{ background:"#F5EDE6", borderRadius:"28px", padding:"2.5rem" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.5rem" }}>
            <div>
              <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.5rem", fontWeight:600, color:"#3D2840", marginBottom:"0.2rem" }}>Your Bloom Streak 🌸</h3>
              <p style={{ fontSize:"0.83rem", color:"#9B7B9E" }}>May 2025 · 19 days logged</p>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"2rem", fontWeight:600, color:"#C8909A" }}>12</div>
              <div style={{ fontSize:"0.72rem", color:"#9B7B9E", fontWeight:600 }}>day streak 🔥</div>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(15,1fr)", gap:"4px" }}>
            {Array.from({ length:30 }, (_, i) => i + 1).map(day => (
              <motion.div key={day}
                initial={{ scale:0 }} whileInView={{ scale:1 }} viewport={{ once:true }} transition={{ duration:0.3, delay:day*0.02 }}
                title={`Day ${day}`}
                style={{
                  aspectRatio:"1", borderRadius:"4px", cursor:"pointer", transition:"all 0.3s",
                  background: GLOWING.includes(day) ? "linear-gradient(135deg,#C8909A,#9B7BB8)" : FILLED.includes(day) ? "linear-gradient(135deg,#E8A4A0,#C8909A)" : "#fff",
                  boxShadow: GLOWING.includes(day) ? "0 0 6px rgba(200,144,154,0.5)" : "none",
                }} />
            ))}
          </div>

          <div style={{ display:"flex", gap:"1rem", marginTop:"1.5rem", flexWrap:"wrap" }}>
            {[["linear-gradient(135deg,#C8909A,#9B7BB8)","Glowing streak"],["linear-gradient(135deg,#E8A4A0,#C8909A)","Logged day"],["#fff","Missed day"]].map(([bg, label]) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.75rem", color:"#6B4E6E" }}>
                <div style={{ width:"12px", height:"12px", borderRadius:"3px", background:bg, border:label==="Missed day"?"1px solid rgba(232,160,156,0.3)":"none" }} />{label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
