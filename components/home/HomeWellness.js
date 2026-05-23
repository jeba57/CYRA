"use client";

import { motion } from "framer-motion";

const PHOTOS = [
  { src:"https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=500&q=85", alt:"woman cooking healthy", label:"Nourishment" },
  { src:"https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&q=85", alt:"woman yoga self care", label:"Movement" },
  { src:"https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=500&q=85", alt:"woman reading cozy", label:"Rest" },
  { src:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=500&q=85", alt:"morning sunlight nature", label:"Sunlight" },
  { src:"https://images.unsplash.com/photo-1588516903720-8ceb67f96d34?w=500&q=85", alt:"woman skincare ritual", label:"Rituals" },
  { src:"https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=500&q=85", alt:"woman journaling peace", label:"Reflection" },
];

export default function HomeWellness() {
  return (
    <section style={{ padding:"5rem 4rem", background:"#fff" }}>
      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
        style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center", marginBottom:"4rem" }}>
        <div>
          <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8909A", marginBottom:"0.75rem" }}>
            🌼 Holistic Self-Care
          </p>
          <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, color:"#3D2840", marginBottom:"1rem" }}>
            Wellness that feels like{" "}
            <em style={{ fontStyle:"italic", color:"#C8909A" }}>coming home</em>
          </h2>
          <p style={{ color:"#6B4E6E", fontSize:"0.95rem", lineHeight:1.8, marginBottom:"1.5rem" }}>
            CYRA doesn't push hustle culture wellness. We believe in gentle, sustainable self-care that works with your hormones — not against them. Real women, real routines, real results.
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
            {["Phase-aware wellness recommendations", "Indian and global self-care practices", "Science-backed, emotionally delivered", "No toxic positivity, ever"].map(item => (
              <div key={item} style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
                <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#C8909A", flexShrink:0 }} />
                <span style={{ fontSize:"0.9rem", color:"#6B4E6E" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderRadius:"24px", overflow:"hidden", height:"360px", boxShadow:"0 24px 60px rgba(61,40,64,0.1)" }}>
          <img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=85" alt="woman peaceful wellness" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        </div>
      </motion.div>

      {/* Photo grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1rem" }}>
        {PHOTOS.map((p, i) => (
          <motion.div key={i}
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}
            style={{ borderRadius:"18px", overflow:"hidden", aspectRatio:"1", position:"relative", cursor:"pointer" }}
            onMouseEnter={(e) => { e.currentTarget.querySelector("img").style.transform="scale(1.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.querySelector("img").style.transform="scale(1)"; }}>
            <img src={p.src} alt={p.alt} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.5s ease" }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(61,40,64,0.55),transparent 55%)" }} />
            <span style={{ position:"absolute", bottom:"0.85rem", left:"0.85rem", color:"#fff", fontFamily:"var(--font-cormorant),serif", fontSize:"1.05rem", fontWeight:400 }}>
              {p.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
