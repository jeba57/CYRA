"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupForm() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  return (
    <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
      style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"center", width:"100%", maxWidth:"900px" }}>

      {/* Photo */}
      <div style={{ borderRadius:"24px", overflow:"hidden", height:"520px", position:"relative" }} className="hidden md:block">
        <img src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=700&q=85" alt="woman smiling wellness" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(61,40,64,0.65),transparent 55%)" }} />
        <div style={{ position:"absolute", bottom:"2rem", left:"2rem", right:"2rem" }}>
          <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"2.2rem", fontWeight:300, color:"#fff", lineHeight:1.2, marginBottom:"0.5rem" }}>
            Begin your<br /><em style={{ fontStyle:"italic", color:"#FCDEC0" }}>wellness journey.</em> 🌷
          </h2>
          <p style={{ color:"rgba(255,255,255,0.72)", fontSize:"0.88rem", lineHeight:1.65 }}>Join thousands of women who've found comfort and clarity in CYRA.</p>
        </div>
      </div>

      {/* Form */}
      <div style={{ background:"rgba(255,255,255,0.12)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"26px", padding:"2.5rem" }}>
        <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.8rem", fontWeight:400, color:"#fff", marginBottom:"0.4rem" }}>Create account</h3>
        <p style={{ color:"rgba(255,255,255,0.6)", fontSize:"0.85rem", marginBottom:"2rem" }}>Free forever. No credit card needed. 🌸</p>

        {[["Your name","text","What shall we call you?",name,setName],["Email","email","you@example.com",email,setEmail],["Password","password","Create a strong password",password,setPassword]].map(([label,type,ph,val,set]) => (
          <div key={label} style={{ marginBottom:"1.2rem" }}>
            <label style={{ display:"block", fontSize:"0.78rem", fontWeight:700, color:"rgba(255,255,255,0.75)", marginBottom:"0.5rem", letterSpacing:"0.03em" }}>{label}</label>
            <input type={type} placeholder={ph} value={val} onChange={e=>set(e.target.value)}
              style={{ width:"100%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"12px", padding:"0.75rem 1rem", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.88rem", color:"#fff", outline:"none", transition:"all 0.2s" }}
              onFocus={(e)=>{ e.target.style.borderColor="rgba(255,255,255,0.5)"; e.target.style.background="rgba(255,255,255,0.15)"; }}
              onBlur={(e)=>{ e.target.style.borderColor="rgba(255,255,255,0.2)"; e.target.style.background="rgba(255,255,255,0.1)"; }} />
          </div>
        ))}

        <button style={{ width:"100%", background:"linear-gradient(135deg,#FCDEC0,#E8A4A0)", color:"#3D2840", border:"none", padding:"0.9rem", borderRadius:"14px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.95rem", fontWeight:700, cursor:"pointer", transition:"all 0.3s", marginTop:"0.5rem", boxShadow:"0 6px 18px rgba(0,0,0,0.15)" }}
          onMouseEnter={(e)=>{ e.currentTarget.style.transform="translateY(-2px)"; }}
          onMouseLeave={(e)=>{ e.currentTarget.style.transform="translateY(0)"; }}>
          Begin your journey 🌷
        </button>

        <p style={{ textAlign:"center", marginTop:"1.5rem", fontSize:"0.8rem", color:"rgba(255,255,255,0.55)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color:"#FCDEC0", fontWeight:700, textDecoration:"none" }}>Sign in →</Link>
        </p>
      </div>
    </motion.div>
  );
}
