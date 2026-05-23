"use client";

import { motion } from "framer-motion";

const TOPICS = [
  {
    img:   "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&q=85",
    tag:   "🩸 Period Health",
    title: "Understanding your menstrual cycle",
    body:  "Your cycle is more than just your period. It's a 28-day hormonal symphony that affects your energy, mood, skin, and metabolism — and understanding it is one of the most empowering things you can do.",
  },
  {
    img:   "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&q=85",
    tag:   "🧬 PCOS Awareness",
    title: "PCOS: You are not alone",
    body:  "1 in 10 women have PCOS. It affects periods, hormones, and metabolism. CYRA provides gentle, evidence-based guidance to help you manage symptoms and understand your unique body.",
  },
  {
    img:   "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=85",
    tag:   "💆 Emotional Wellness",
    title: "Hormones and your emotional health",
    body:  "Mood swings before your period aren't weakness — they're biology. Estrogen, progesterone, and serotonin dance together through your cycle, and CYRA helps you understand and navigate them gently.",
  },
];

export default function HomeEducation() {
  return (
    <section style={{ padding:"5rem 4rem", background:"#FDF8F3" }}>
      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
        style={{ textAlign:"center", marginBottom:"3.5rem" }}>
        <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8909A", marginBottom:"0.75rem" }}>
          ✦ Menstrual Health Education
        </p>
        <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, color:"#3D2840" }}>
          Know your body,{" "}
          <em style={{ fontStyle:"italic", color:"#C8909A" }}>love your body</em>
        </h2>
      </motion.div>

      <div style={{ display:"flex", flexDirection:"column", gap:"5rem" }}>
        {TOPICS.map((t, i) => (
          <motion.div key={i}
            initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.8, delay:0.1 }}
            style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center" }}>

            <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
              <div style={{ borderRadius:"24px", overflow:"hidden", height:"340px", boxShadow:"0 24px 60px rgba(61,40,64,0.12)", position:"relative" }}>
                <img src={t.img} alt={t.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(61,40,64,0.3),transparent 60%)" }} />
              </div>
            </div>

            <div style={{ order: i % 2 === 0 ? 2 : 1 }}>
              <span style={{ display:"inline-block", background:"rgba(200,144,154,0.12)", color:"#C8909A", borderRadius:"50px", padding:"0.35rem 1rem", fontSize:"0.78rem", fontWeight:700, marginBottom:"1rem", letterSpacing:"0.04em" }}>
                {t.tag}
              </span>
              <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(1.5rem,2.5vw,2rem)", fontWeight:400, color:"#3D2840", lineHeight:1.3, marginBottom:"1rem" }}>
                {t.title}
              </h3>
              <p style={{ color:"#6B4E6E", fontSize:"0.95rem", lineHeight:1.8 }}>{t.body}</p>
              <button style={{ marginTop:"1.5rem", background:"transparent", border:"1.5px solid #E8A4A0", color:"#C8909A", padding:"0.6rem 1.4rem", borderRadius:"50px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.85rem", fontWeight:600, cursor:"pointer", transition:"all 0.25s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background="#F7D6D0"; e.currentTarget.style.transform="translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background="transparent"; e.currentTarget.style.transform="translateY(0)"; }}>
                Learn more →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
