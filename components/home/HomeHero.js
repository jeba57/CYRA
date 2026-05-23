"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=420&q=85", alt: "woman journaling softly", style: { top: 0, left: 10, width: 200, height: 260 }, rot: -3.5, dur: 6 },
  { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=420&q=85", alt: "hijabi woman smiling", style: { top: 25, left: 225, width: 178, height: 218 }, rot: 2.5, dur: 7.5 },
  { src: "https://images.unsplash.com/photo-1543169108-32ac15a21e05?w=420&q=85", alt: "curly hair woman reading", style: { top: 200, left: 50, width: 160, height: 200 }, rot: 1.5, dur: 8 },
  { src: "https://images.unsplash.com/photo-1588516903720-8ceb67f96d34?w=420&q=85", alt: "woman skincare routine", style: { top: 178, left: 222, width: 188, height: 232 }, rot: -2, dur: 6.8 },
  { src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=320&q=85", alt: "woman drinking warm tea", style: { top: 368, left: 142, width: 140, height: 166 }, rot: 3, dur: 7 },
];
const CHIPS = [
  { text: "🌸 Day 14 · Ovulation",  pos: { top: 12, right: 2 },   delay: 0 },
  { text: "💧 Hydration Goal Met!", pos: { top: 260, right: 0 },  delay: 1.2 },
  { text: "🌙 Mood: Peaceful ✦",    pos: { bottom: 50, left: 0 }, delay: 2.2 },
];

export default function HomeHero() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "center",
      padding: "8rem 4rem 5rem",
      gap: "4rem",
      background: "linear-gradient(135deg,#FDF8F3 0%,#FDE8E0 45%,#EDE0F5 100%)",
      position: "relative",
      overflow: "hidden",
    }}
      className="cyra-hero-section"
    >
      <style>{`
        @media (max-width: 900px) {
          .cyra-hero-section {
            grid-template-columns: 1fr !important;
            padding: 7rem 1.5rem 3rem !important;
            gap: 2rem !important;
            min-height: auto !important;
          }
          .cyra-hero-collage { display: none !important; }
        }
      `}</style>

      {/* Orbs */}
      <motion.div animate={{ x: [0,25,0], y: [0,-25,0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{ position:"absolute", top:"-200px", right:"-200px", width:"600px", height:"600px", borderRadius:"50%", background:"radial-gradient(circle,rgba(232,224,245,0.55),transparent 70%)", pointerEvents:"none" }} />
      <motion.div animate={{ x: [0,-20,0], y: [0,20,0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ position:"absolute", bottom:"-130px", left:"-110px", width:"450px", height:"450px", borderRadius:"50%", background:"radial-gradient(circle,rgba(252,222,192,0.45),transparent 70%)", pointerEvents:"none" }} />

      {/* Left */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(255,255,255,0.38)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.55)", borderRadius:"50px", padding:"0.4rem 1.1rem", fontSize:"0.78rem", fontWeight:700, color:"#C8909A", letterSpacing:"0.06em", marginBottom:"1.5rem" }}>
          🌸 Your Wellness Companion
        </motion.div>

        <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}
          style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(2.4rem,4.5vw,4.2rem)", fontWeight:300, lineHeight:1.15, color:"#3D2840", marginBottom:"1.1rem" }}>
          Your body deserves<br /><em style={{ fontStyle:"italic", color:"#C8909A" }}>softness too.</em>
        </motion.h1>

        <motion.p initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
          style={{ fontSize:"1.05rem", color:"#6B4E6E", lineHeight:1.8, maxWidth:"420px", marginBottom:"2rem" }}>
          Track your cycle, understand your feelings, and care for yourself — gently, without judgment, every single day.
        </motion.p>

        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.3 }}
          style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
          <Link href="/signup"><PrimaryBtn>🌸 Start Your Journey</PrimaryBtn></Link>
          <Link href="/my-cycle"><SecondaryBtn>☁️ Explore Features</SecondaryBtn></Link>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.7, delay:0.5 }}
          style={{ display:"flex", gap:"2rem", marginTop:"3rem", flexWrap:"wrap" }}>
          {[["50K+","Women"], ["4.9★","Rating"], ["100%","Private"]].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.6rem", fontWeight:600, color:"#3D2840" }}>{num}</div>
              <div style={{ fontSize:"0.78rem", color:"#9B7B9E", fontWeight:500 }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right collage — hidden on mobile via CSS */}
      <div className="cyra-hero-collage" style={{ position:"relative", height:"580px" }}>
        {PHOTOS.map((p, i) => (
          <motion.div key={i} style={{ position:"absolute", borderRadius:"22px", overflow:"hidden", boxShadow:"0 20px 55px rgba(61,40,64,0.16)", ...p.style }}
            animate={{ y:[0,-12,0] }} transition={{ duration:p.dur, repeat:Infinity, ease:"easeInOut", delay:i*0.4 }}
            whileHover={{ scale:1.03, zIndex:10 }}>
            <img src={p.src} alt={p.alt} style={{ width:"100%", height:"100%", objectFit:"cover", transform:`rotate(${p.rot}deg)`, display:"block" }} />
          </motion.div>
        ))}
        {CHIPS.map((c, i) => (
          <motion.div key={i} style={{ position:"absolute", background:"rgba(255,255,255,0.93)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.7)", borderRadius:"50px", padding:"0.5rem 1rem", fontSize:"0.74rem", fontWeight:700, color:"#3D2840", boxShadow:"0 8px 25px rgba(61,40,64,0.1)", whiteSpace:"nowrap", zIndex:5, ...c.pos }}
            animate={{ y:[0,-8,0] }} transition={{ duration:5, repeat:Infinity, ease:"easeInOut", delay:c.delay }}>
            {c.text}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PrimaryBtn({ children }) {
  return (
    <button style={{ background:"linear-gradient(135deg,#C8909A,#9B7BB8)", color:"#fff", border:"none", padding:"0.88rem 2rem", borderRadius:"50px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.95rem", fontWeight:700, cursor:"pointer", transition:"all 0.3s", boxShadow:"0 6px 20px rgba(155,123,184,0.35)" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(155,123,184,0.45)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(155,123,184,0.35)"; }}>
      {children}
    </button>
  );
}
function SecondaryBtn({ children }) {
  return (
    <button style={{ background:"transparent", color:"#C8909A", border:"1.5px solid #E8A4A0", padding:"0.88rem 2rem", borderRadius:"50px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.95rem", fontWeight:600, cursor:"pointer", transition:"all 0.3s" }}
      onMouseEnter={(e) => { e.currentTarget.style.background="#F7D6D0"; e.currentTarget.style.transform="translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background="transparent"; e.currentTarget.style.transform="translateY(0)"; }}>
      {children}
    </button>
  );
}