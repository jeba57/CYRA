"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeCTA() {
  return (
    <section style={{ padding:"6rem 4rem", background:"linear-gradient(135deg,#3D2840,#6B3A7A,#9B7BB8)", position:"relative", overflow:"hidden", textAlign:"center" }}>
      <motion.div style={{ position:"absolute", top:"-100px", left:"-100px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle,rgba(252,222,192,0.15),transparent 70%)", pointerEvents:"none" }} animate={{ scale:[1,1.1,1] }} transition={{ duration:8, repeat:Infinity }} />
      <motion.div style={{ position:"absolute", bottom:"-80px", right:"-80px", width:"350px", height:"350px", borderRadius:"50%", background:"radial-gradient(circle,rgba(232,224,245,0.15),transparent 70%)", pointerEvents:"none" }} animate={{ scale:[1,1.08,1] }} transition={{ duration:10, repeat:Infinity }} />

      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
        <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(252,222,192,0.8)", marginBottom:"1rem" }}>
          🌸 Begin Your Journey
        </p>
        <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(2.2rem,4vw,3.5rem)", fontWeight:300, color:"#fff", lineHeight:1.2, marginBottom:"1.25rem" }}>
          You deserve to understand<br /><em style={{ fontStyle:"italic", color:"#FCDEC0" }}>your own body.</em>
        </h2>
        <p style={{ color:"rgba(255,255,255,0.72)", fontSize:"1rem", lineHeight:1.8, maxWidth:"500px", margin:"0 auto 2.5rem" }}>
          Join thousands of women who've found comfort, clarity, and community in CYRA. Your cycle, your feelings, your story — all in one gentle space.
        </p>
        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/signup">
            <button style={{ background:"linear-gradient(135deg,#FCDEC0,#E8A4A0)", color:"#3D2840", border:"none", padding:"0.9rem 2.2rem", borderRadius:"50px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"1rem", fontWeight:700, cursor:"pointer", transition:"all 0.3s", boxShadow:"0 6px 20px rgba(0,0,0,0.2)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 12px 30px rgba(0,0,0,0.25)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.2)"; }}>
              🌸 Start Free Today
            </button>
          </Link>
          <Link href="/my-cycle">
            <button style={{ background:"rgba(255,255,255,0.12)", color:"#fff", border:"1.5px solid rgba(255,255,255,0.3)", padding:"0.9rem 2.2rem", borderRadius:"50px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"1rem", fontWeight:600, cursor:"pointer", transition:"all 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background="rgba(255,255,255,0.12)"; }}>
              ☁️ Explore Features
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
