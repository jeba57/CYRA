"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupForm() {
  const router = useRouter();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!name||!email||!password) { setError("All fields required."); return; }
    if (password.length < 6)      { setError("Password must be at least 6 characters."); return; }
    setLoading(true);

    try {
      // Save user to localStorage so admin can see them
      const users = JSON.parse(localStorage.getItem("cyra_users") || "[]");
      const exists = users.find(u => u.email === email);
      if (exists) { setError("Account already exists. Please sign in."); setLoading(false); return; }

      const newUser = {
        name, email,
        joinedAt:  new Date().toISOString(),
        lastVisit: new Date().toISOString(),
      };
      localStorage.setItem("cyra_users", JSON.stringify([...users, newUser]));
      localStorage.setItem("cyra_current_user", JSON.stringify(newUser));

      setTimeout(() => { router.push("/my-cycle"); }, 600);
    } catch(err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
      style={{ width:"100%", maxWidth:"460px" }}>

      {/* Card */}
      <div style={{ background:"rgba(255,255,255,0.12)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:"1px solid rgba(255,255,255,0.22)", borderRadius:"26px", padding:"2.5rem" }}>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:"1.75rem" }}>
          <span style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"2.2rem", fontWeight:600, color:"#FCDEC0", letterSpacing:"0.04em" }}>
            C<span style={{ color:"rgba(255,255,255,0.6)" }}>Y</span>RA
          </span>
          <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.5rem", fontWeight:300, color:"#fff", marginTop:"0.4rem", marginBottom:"0.25rem" }}>
            Begin your journey 🌷
          </h2>
          <p style={{ color:"rgba(255,255,255,0.55)", fontSize:"0.82rem" }}>Free forever · No credit card needed</p>
        </div>

        {error && (
          <div style={{ background:"rgba(196,69,105,0.2)", border:"1px solid rgba(196,69,105,0.35)", borderRadius:"12px", padding:"0.7rem 1rem", marginBottom:"1.25rem", fontSize:"0.8rem", color:"#FFB5C5" }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            ["Your name","text",    "What shall we call you?", name,     setName],
            ["Email",   "email",   "you@example.com",          email,    setEmail],
            ["Password","password","Min. 6 characters",        password, setPassword],
          ].map(([label,type,ph,val,set]) => (
            <div key={label} style={{ marginBottom:"1.1rem" }}>
              <label style={{ display:"block", fontSize:"0.76rem", fontWeight:700, color:"rgba(255,255,255,0.7)", marginBottom:"0.45rem", letterSpacing:"0.03em" }}>{label}</label>
              <input type={type} placeholder={ph} value={val} onChange={e=>set(e.target.value)} required
                style={{ width:"100%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:"12px", padding:"0.7rem 1rem", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.88rem", color:"#fff", outline:"none", transition:"all 0.2s" }}
                onFocus={(e)=>{e.target.style.borderColor="rgba(255,255,255,0.5)";e.target.style.background="rgba(255,255,255,0.15)";}}
                onBlur={(e)=>{e.target.style.borderColor="rgba(255,255,255,0.2)";e.target.style.background="rgba(255,255,255,0.1)";}}
              />
            </div>
          ))}

          <button type="submit" disabled={loading}
            style={{ width:"100%", background:loading?"rgba(255,255,255,0.2)":"linear-gradient(135deg,#FCDEC0,#E8A4A0)", color:loading?"rgba(255,255,255,0.5)":"#3D2840", border:"none", padding:"0.88rem", borderRadius:"14px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.93rem", fontWeight:700, cursor:loading?"not-allowed":"pointer", transition:"all 0.3s", marginTop:"0.5rem", boxShadow:"0 6px 18px rgba(0,0,0,0.15)" }}>
            {loading ? "Creating account..." : "Create account 🌸"}
          </button>
        </form>

        <p style={{ textAlign:"center", marginTop:"1.5rem", fontSize:"0.8rem", color:"rgba(255,255,255,0.5)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color:"#FCDEC0", fontWeight:700, textDecoration:"none" }}>Sign in →</Link>
        </p>
      </div>
    </motion.div>
  );
}