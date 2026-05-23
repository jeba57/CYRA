"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const MOODS = [{ emoji:"😔", label:"Low" }, { emoji:"😐", label:"Meh" }, { emoji:"🙂", label:"Okay" }, { emoji:"😊", label:"Good" }, { emoji:"🥰", label:"Great" }];

export default function MoodTracker() {
  const [selected, setSelected] = useState(2);
  const [energy, setEnergy]     = useState(6);
  const [pain, setPain]         = useState(2);
  const [saved, setSaved]       = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <section style={{ padding:"4rem 4rem", background:"#F5EDE6" }}>
      <div style={{ maxWidth:"640px", margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          style={{ background:"#fff", borderRadius:"28px", padding:"2.5rem", boxShadow:"0 16px 50px rgba(61,40,64,0.08)" }}>
          <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.8rem", fontWeight:400, color:"#3D2840", marginBottom:"0.4rem" }}>Check in with yourself</h2>
          <p style={{ color:"#9B7B9E", fontSize:"0.88rem", marginBottom:"2rem" }}>Today · {new Date().toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long" })}</p>

          <label style={{ fontSize:"0.82rem", fontWeight:700, color:"#6B4E6E", display:"block", marginBottom:"0.85rem", letterSpacing:"0.03em" }}>Your mood right now</label>
          <div style={{ display:"flex", gap:"0.75rem", marginBottom:"2rem" }}>
            {MOODS.map((m, i) => (
              <div key={i} onClick={() => setSelected(i)}
                style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"0.35rem", padding:"0.75rem 0.5rem", borderRadius:"16px", border:`2px solid ${selected===i?"#C8909A":"transparent"}`, background:selected===i?"#FDE8E0":"#F5EDE6", cursor:"pointer", transition:"all 0.25s" }}>
                <span style={{ fontSize:"1.6rem" }}>{m.emoji}</span>
                <span style={{ fontSize:"0.68rem", fontWeight:600, color:selected===i?"#C8909A":"#9B7B9E" }}>{m.label}</span>
              </div>
            ))}
          </div>

          {[["Energy level", energy, setEnergy], ["Discomfort / pain", pain, setPain]].map(([label, val, setter]) => (
            <div key={label} style={{ marginBottom:"1.5rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.83rem", color:"#6B4E6E", marginBottom:"0.5rem" }}>
                <span>{label}</span><span style={{ fontWeight:700, color:"#C8909A" }}>{val} / 10</span>
              </div>
              <input type="range" min="1" max="10" value={val} onChange={(e) => setter(Number(e.target.value))}
                style={{ width:"100%", accentColor:"#C8909A", height:"4px", borderRadius:"2px", cursor:"pointer" }} />
            </div>
          ))}

          <textarea placeholder="Anything on your mind today? (optional) 🌸" rows={3}
            style={{ width:"100%", border:"1.5px solid rgba(232,160,156,0.3)", borderRadius:"14px", padding:"0.9rem 1rem", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.88rem", color:"#3D2840", resize:"none", outline:"none", background:"#F5EDE6", transition:"border-color 0.2s", marginBottom:"1.5rem" }}
            onFocus={(e) => e.target.style.borderColor="#C8909A"}
            onBlur={(e) => e.target.style.borderColor="rgba(232,160,156,0.3)"} />

          <button onClick={handleSave}
            style={{ width:"100%", background:saved?"linear-gradient(135deg,#5CAE8C,#3D9B7A)":"linear-gradient(135deg,#C8909A,#9B7BB8)", color:"#fff", border:"none", padding:"0.9rem", borderRadius:"14px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.95rem", fontWeight:700, cursor:"pointer", transition:"all 0.3s", boxShadow:"0 6px 18px rgba(155,123,184,0.3)" }}>
            {saved ? "✓ Saved! 🌸" : "Save today's check-in"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
