"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem("cyra_users") || "[]");
      const user  = users.find(u => u.email === email);
      if (!user) { setError("No account found. Please sign up first."); setLoading(false); return; }

      // Update last visit
      const updated = users.map(u => u.email===email ? {...u, lastVisit:new Date().toISOString()} : u);
      localStorage.setItem("cyra_users", JSON.stringify(updated));
      localStorage.setItem("cyra_current_user", JSON.stringify({...user, lastVisit:new Date().toISOString()}));

      setTimeout(() => router.push("/my-cycle"), 600);
    } catch(err) {
      setError("Something went wrong. Try again."); setLoading(false);
    }
  }

  return (
    <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
      style={{ width:"100%", maxWidth:"420px" }}>
      <div style={{ background:"rgba(255,255,255,0.12)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.22)", borderRadius:"26px", padding:"2.5rem" }}>

        <div style={{ textAlign:"center", marginBottom:"1.75rem" }}>
          <span style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"2.2rem", fontWeight:600, color:"#FCDEC0", letterSpacing:"0.04em" }}>
            C<span style={{ color:"rgba(255,255,255,0.6)" }}>Y</span>RA
          </span>
          <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.5rem", fontWeight:300, color:"#fff", marginTop:"0.4rem", marginBottom:"0.25rem" }}>
            Welcome back, lovely. 🌸
          </h2>
          <p style={{ color:"rgba(255,255,255,0.55)", fontSize:"0.82rem" }}>Your journey continues where you left off</p>
        </div>

        {error && (
          <div style={{ background:"rgba(196,69,105,0.2)", border:"1px solid rgba(196,69,105,0.35)", borderRadius:"12px", padding:"0.7rem 1rem", marginBottom:"1.25rem", fontSize:"0.8rem", color:"#FFB5C5" }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[["Email","email","you@example.com",email,setEmail],["Password","password","••••••••",password,setPassword]].map(([label,type,ph,val,set])=>(
            <div key={label} style={{ marginBottom:"1.1rem" }}>
              <label style={{ display:"block", fontSize:"0.76rem", fontWeight:700, color:"rgba(255,255,255,0.7)", marginBottom:"0.45rem" }}>{label}</label>
              <input type={type} placeholder={ph} value={val} onChange={e=>set(e.target.value)} required
                style={{ width:"100%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"12px", padding:"0.7rem 1rem", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.88rem", color:"#fff", outline:"none", transition:"all 0.2s" }}
                onFocus={(e)=>{e.target.style.borderColor="rgba(255,255,255,0.5)";e.target.style.background="rgba(255,255,255,0.15)";}}
                onBlur={(e)=>{e.target.style.borderColor="rgba(255,255,255,0.2)";e.target.style.background="rgba(255,255,255,0.1)";}}
              />
            </div>
          ))}
          <button type="submit" disabled={loading}
            style={{ width:"100%", background:loading?"rgba(255,255,255,0.2)":"linear-gradient(135deg,#FCDEC0,#E8A4A0)", color:loading?"rgba(255,255,255,0.5)":"#3D2840", border:"none", padding:"0.88rem", borderRadius:"14px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.93rem", fontWeight:700, cursor:loading?"not-allowed":"pointer", transition:"all 0.3s", marginTop:"0.5rem" }}>
            {loading ? "Signing in..." : "Let's go 🌸"}
          </button>
        </form>

        <p style={{ textAlign:"center", marginTop:"1.5rem", fontSize:"0.8rem", color:"rgba(255,255,255,0.5)" }}>
          New to CYRA?{" "}
          <Link href="/signup" style={{ color:"#FCDEC0", fontWeight:700, textDecoration:"none" }}>Create account →</Link>
        </p>
      </div>
    </motion.div>
  );
}