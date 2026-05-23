"use client";

import { motion } from "framer-motion";
import { WELLNESS_TIPS } from "../../constants/tips";

export default function TipsGrid() {
  return (
    <section style={{ padding:"3rem 4rem 5rem", background:"#fff" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"1.5rem" }}>
        {WELLNESS_TIPS.map((tip, i) => (
          <motion.div key={i}
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:(i%4)*0.08 }}
            style={{ background:"#fff", borderRadius:"22px", overflow:"hidden", border:"1px solid rgba(232,160,156,0.15)", boxShadow:"0 4px 20px rgba(61,40,64,0.06)", transition:"all 0.4s", cursor:"pointer" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(61,40,64,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(61,40,64,0.06)"; }}>
            <div style={{ height:"160px", overflow:"hidden" }}>
              <img src={tip.img} alt={tip.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.5s" }}
                onMouseEnter={(e) => e.target.style.transform="scale(1.06)"}
                onMouseLeave={(e) => e.target.style.transform="scale(1)"} />
            </div>
            <div style={{ padding:"1.25rem 1.4rem" }}>
              <span style={{ fontSize:"0.68rem", fontWeight:700, color:"#C8909A", letterSpacing:"0.08em", textTransform:"uppercase", display:"block", marginBottom:"0.4rem" }}>{tip.phase}</span>
              <h4 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.1rem", fontWeight:600, color:"#3D2840", marginBottom:"0.5rem" }}>{tip.title}</h4>
              <p style={{ fontSize:"0.82rem", color:"#9B7B9E", lineHeight:1.65 }}>{tip.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}