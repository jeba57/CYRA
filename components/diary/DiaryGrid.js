"use client";

import { motion } from "framer-motion";

const CATEGORIES = [
  { icon:"💊", title:"Prescriptions", count:3, color:"#FCDEC0", desc:"Medicine names, dosage & schedules" },
  { icon:"🩸", title:"Blood Reports", count:2, color:"#F7D6D0", desc:"Hemoglobin, thyroid, hormones & more" },
  { icon:"🔬", title:"Ultrasounds", count:1, color:"#E8E0F5", desc:"PCOS scans and pelvic imaging" },
  { icon:"🩺", title:"Doctor Notes", count:4, color:"#C8EEE8", desc:"Consultation summaries & advice" },
  { icon:"📋", title:"Lab Tests", count:2, color:"#FFF0C8", desc:"HbA1c, iron panel, vitamin levels" },
  { icon:"📷", title:"Medicine Photos", count:5, color:"#F7D6D0", desc:"Photos of medicine packets & labels" },
];

const RECENT = [
  { name:"Gynec prescription.pdf", date:"22 May 2025", type:"💊", size:"245 KB" },
  { name:"CBC Blood Report.pdf", date:"18 May 2025", type:"🩸", size:"1.2 MB" },
  { name:"USG Pelvis Report.pdf", date:"10 May 2025", type:"🔬", size:"3.4 MB" },
  { name:"Dr. Sharma notes.jpg", date:"5 May 2025", type:"🩺", size:"580 KB" },
];

export default function DiaryGrid() {
  return (
    <section style={{ padding:"2rem 4rem 5rem", background:"#FDF8F3" }}>
      <div style={{ marginBottom:"3rem" }}>
        <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8909A", marginBottom:"0.75rem" }}>📁 Categories</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1rem" }}>
          {CATEGORIES.map((cat, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.07 }}
              style={{ background:"#fff", borderRadius:"18px", padding:"1.4rem", border:"1px solid rgba(232,160,156,0.15)", cursor:"pointer", transition:"all 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 12px 30px rgba(61,40,64,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ width:"42px", height:"42px", borderRadius:"12px", background:cat.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.25rem", marginBottom:"0.85rem" }}>{cat.icon}</div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <h4 style={{ fontSize:"0.9rem", fontWeight:700, color:"#3D2840", marginBottom:"0.25rem" }}>{cat.title}</h4>
                  <p style={{ fontSize:"0.75rem", color:"#9B7B9E" }}>{cat.desc}</p>
                </div>
                <span style={{ background:"rgba(200,144,154,0.12)", color:"#C8909A", borderRadius:"50px", padding:"0.15rem 0.55rem", fontSize:"0.72rem", fontWeight:700, flexShrink:0, marginLeft:"0.5rem" }}>{cat.count}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8909A", marginBottom:"1rem" }}>🕐 Recently Added</p>
        <div style={{ background:"#fff", borderRadius:"20px", overflow:"hidden", border:"1px solid rgba(232,160,156,0.15)", boxShadow:"0 4px 20px rgba(61,40,64,0.06)" }}>
          {RECENT.map((doc, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.07 }}
              style={{ display:"flex", alignItems:"center", gap:"1rem", padding:"1rem 1.5rem", borderBottom: i < RECENT.length-1 ? "1px solid rgba(232,160,156,0.12)" : "none", cursor:"pointer", transition:"background 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.background="#F5EDE6"}
              onMouseLeave={(e) => e.currentTarget.style.background="transparent"}>
              <span style={{ fontSize:"1.4rem", flexShrink:0 }}>{doc.type}</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:"0.87rem", fontWeight:600, color:"#3D2840", marginBottom:"0.15rem" }}>{doc.name}</p>
                <p style={{ fontSize:"0.73rem", color:"#9B7B9E" }}>{doc.date} · {doc.size}</p>
              </div>
              <button style={{ background:"transparent", border:"1px solid rgba(200,144,154,0.3)", color:"#C8909A", padding:"0.3rem 0.85rem", borderRadius:"50px", fontSize:"0.72rem", fontWeight:600, cursor:"pointer", transition:"all 0.2s", flexShrink:0 }}
                onMouseEnter={(e) => e.currentTarget.style.background="#F7D6D0"}
                onMouseLeave={(e) => e.currentTarget.style.background="transparent"}>
                View
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
