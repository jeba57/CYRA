"use client";

import { motion } from "framer-motion";

const WEEKS = [
  { label:"Week 1", moods:[3,2,2,3,4,4,5], phase:"Menstruation" },
  { label:"Week 2", moods:[5,5,6,7,7,8,8], phase:"Follicular" },
  { label:"Week 3", moods:[9,9,8,8,7,7,6], phase:"Ovulation → Luteal" },
  { label:"Week 4", moods:[5,4,4,3,3,2,3], phase:"Luteal" },
];

export default function MoodTrends() {
  return (
    <section style={{ padding:"4rem 4rem", background:"#F5EDE6" }}>
      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>
        <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8909A", marginBottom:"0.75rem" }}>📊 Mood Trends</p>
        <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:300, color:"#3D2840", marginBottom:"2.5rem" }}>
          Your emotional <em style={{ fontStyle:"italic", color:"#C8909A" }}>landscape</em>
        </h2>

        <div style={{ background:"#fff", borderRadius:"24px", padding:"2rem", boxShadow:"0 8px 30px rgba(61,40,64,0.07)" }}>
          {WEEKS.map((week, wi) => (
            <div key={wi} style={{ marginBottom: wi < WEEKS.length-1 ? "2rem" : 0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.75rem" }}>
                <span style={{ fontSize:"0.83rem", fontWeight:700, color:"#3D2840" }}>{week.label}</span>
                <span style={{ fontSize:"0.72rem", color:"#9B7B9E", background:"#F5EDE6", padding:"0.2rem 0.75rem", borderRadius:"50px" }}>{week.phase}</span>
              </div>
              <div style={{ display:"flex", gap:"6px", alignItems:"flex-end", height:"60px" }}>
                {week.moods.map((val, di) => (
                  <motion.div key={di}
                    initial={{ height:0 }} whileInView={{ height:`${val*10}%` }} viewport={{ once:true }} transition={{ duration:0.6, delay:di*0.05 }}
                    style={{ flex:1, borderRadius:"5px 5px 0 0", background:val >= 7 ? "linear-gradient(180deg,#9B7BB8,#C8909A)" : val >= 5 ? "linear-gradient(180deg,#E8A4A0,#F7D6D0)" : "linear-gradient(180deg,#FCDEC0,#F5EDE6)", minHeight:"4px" }} />
                ))}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:"4px" }}>
                {["M","T","W","T","F","S","S"].map((d,i) => (
                  <span key={i} style={{ fontSize:"0.62rem", color:"#9B7B9E", textAlign:"center", flex:1 }}>{d}</span>
                ))}
              </div>
            </div>
          ))}
          <div style={{ borderTop:"1px solid rgba(232,160,156,0.2)", marginTop:"1.5rem", paddingTop:"1.25rem", display:"flex", gap:"1.5rem", flexWrap:"wrap" }}>
            {[["#9B7BB8","High (7–10)"],["#E8A4A0","Mid (5–6)"],["#FCDEC0","Low (1–4)"]].map(([color,label]) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.75rem", color:"#6B4E6E" }}>
                <div style={{ width:"10px", height:"10px", borderRadius:"2px", background:color }} />{label}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
