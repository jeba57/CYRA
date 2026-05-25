"use client";

// components/feelings/MoodTracker.js
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOODS = [
  { emoji:"😔", label:"Low",   value:1 },
  { emoji:"😐", label:"Meh",   value:2 },
  { emoji:"🙂", label:"Okay",  value:3 },
  { emoji:"😊", label:"Good",  value:4 },
  { emoji:"🥰", label:"Great", value:5 },
];

const TAGS = ["tired","anxious","bloated","cramping","happy","energetic","sad","calm","irritable","motivated"];

// What consistent tracking unlocks — shown as motivational context
const WHY_TRACK = [
  { icon:"🔮", text:"Predict your mood swings before they hit" },
  { icon:"📊", text:"See how your feelings shift with your cycle" },
  { icon:"🧠", text:"Spot patterns that reveal your body's rhythms" },
  { icon:"💊", text:"Build evidence to share with your doctor" },
];

export default function MoodTracker() {
  const [selected,  setSelected]  = useState(2);
  const [energy,    setEnergy]    = useState(6);
  const [pain,      setPain]      = useState(2);
  const [notes,     setNotes]     = useState("");
  const [tags,      setTags]      = useState([]);
  const [saved,     setSaved]     = useState(false);
  const [streak,    setStreak]    = useState(0);
  const [showWhy,   setShowWhy]   = useState(false);
  const [todayDone, setTodayDone] = useState(false);

 useEffect(() => {
  async function loadMoodLogs() {
    try {
      const res = await fetch("/api/mood?days=30");
      const data = await res.json();

      const logs = data.logs || [];

      const todayKey = new Date().toISOString().split("T")[0];

      setTodayDone(
        logs.some(
          (l) =>
            new Date(l.date).toISOString().split("T")[0] === todayKey
        )
      );

      // Calculate streak
      let s = 0;

      for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);

        const k = d.toISOString().split("T")[0];

        if (
          logs.some(
            (l) =>
              new Date(l.date).toISOString().split("T")[0] === k
          )
        ) {
          s++;
        } else {
          break;
        }
      }

      setStreak(s);
    } catch (e) {
      console.error("Failed to load mood logs", e);
    }
  }

  loadMoodLogs();
}, [saved]);

  function toggleTag(tag) {
    setTags(prev => prev.includes(tag) ? prev.filter(t=>t!==tag) : [...prev, tag]);
  }

  async function handleSave() {
  try {
    const res = await fetch("/api/mood", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood: selected + 1,
        energy,
        pain,
        notes,
        tags,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to save");
    }

    setSaved(true);
    setTodayDone(true);

    setTimeout(() => setSaved(false), 2500);
  } catch (e) {
    console.error("Save failed", e);
  }
}
  return (
    <section style={{ padding:"3rem 1.5rem", background:"#F5EDE6", position:"relative" }}>

      {/* Ambient glow — matches premium feel */}
      <motion.div style={{ position:"absolute", top:"-80px", right:"-80px", width:"300px", height:"300px", borderRadius:"50%", background:"radial-gradient(circle,rgba(232,224,245,0.35),transparent 70%)", pointerEvents:"none" }} animate={{ scale:[1,1.05,1] }} transition={{ duration:8, repeat:Infinity }} />

      <div style={{ maxWidth:"680px", margin:"0 auto", position:"relative", zIndex:1 }}>

        {/* Section header with streak + why it matters */}
        <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ marginBottom:"1.25rem" }}>

          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"0.75rem", marginBottom:"0.75rem" }}>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", background:"rgba(200,144,154,0.12)", borderRadius:"999px", padding:"0.3rem 0.85rem", fontSize:"0.72rem", fontWeight:700, color:"#C8909A", marginBottom:"0.6rem" }}>
                🌸 TODAY'S FEELINGS
              </div>
              <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(1.6rem,2.5vw,2.2rem)", fontWeight:300, color:"#3D2840", lineHeight:1.2, marginBottom:"0.35rem" }}>
                How are you <em style={{ fontStyle:"italic", color:"#C8909A" }}>really</em> feeling?
              </h2>
              <p style={{ fontSize:"0.83rem", color:"#9B7B9E", lineHeight:1.6, maxWidth:"420px" }}>
                30 seconds a day builds months of insight. Your feelings have patterns — CYRA helps you see them.
              </p>
            </div>

            {/* Streak badge */}
            {streak > 0 && (
              <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ type:"spring", stiffness:200 }}
                style={{ background:"linear-gradient(135deg,#C8909A,#9B7BB8)", borderRadius:"16px", padding:"0.6rem 1rem", textAlign:"center", minWidth:"72px", boxShadow:"0 4px 16px rgba(155,123,184,0.3)" }}>
                <div style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.5rem", fontWeight:600, color:"#fff" }}>{streak}</div>
                <div style={{ fontSize:"0.62rem", color:"rgba(255,255,255,0.8)", fontWeight:600 }}>day streak 🔥</div>
              </motion.div>
            )}
          </div>

          {/* Why track — collapsible motivational block */}
          <button onClick={()=>setShowWhy(o=>!o)}
            style={{ background:"transparent", border:"1px solid rgba(200,144,154,0.25)", borderRadius:"10px", padding:"0.45rem 0.85rem", fontSize:"0.76rem", color:"#9B7B9E", cursor:"pointer", display:"flex", alignItems:"center", gap:"0.4rem", transition:"all 0.2s" }}
            onMouseEnter={(e)=>e.currentTarget.style.background="#F7D6D0"}
            onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}>
            💡 Why track your feelings daily? {showWhy?"▲":"▼"}
          </button>

          <AnimatePresence>
            {showWhy && (
              <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }} style={{ overflow:"hidden" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem", marginTop:"0.6rem" }}>
                  {WHY_TRACK.map(({ icon, text }) => (
                    <div key={text} style={{ background:"rgba(255,255,255,0.7)", borderRadius:"12px", padding:"0.6rem 0.85rem", display:"flex", gap:"0.5rem", alignItems:"flex-start" }}>
                      <span style={{ fontSize:"1rem", flexShrink:0 }}>{icon}</span>
                      <span style={{ fontSize:"0.76rem", color:"#6B4E6E", lineHeight:1.55 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Already checked in today */}
        {todayDone && !saved && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ background:"rgba(92,174,140,0.1)", border:"1px solid rgba(92,174,140,0.3)", borderRadius:"14px", padding:"0.75rem 1rem", marginBottom:"1rem", fontSize:"0.82rem", color:"#3D9B7A", display:"flex", alignItems:"center", gap:"0.5rem" }}>
            ✅ <strong>You've already checked in today.</strong> You can update your entry below if needed.
          </motion.div>
        )}

        {/* Main check-in card */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }}
          style={{ background:"#fff", borderRadius:"22px", padding:"1.75rem", boxShadow:"0 12px 40px rgba(61,40,64,0.08)", border:"1px solid rgba(200,144,154,0.12)" }}>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem" }}>
            <div>
              <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.25rem", fontWeight:500, color:"#3D2840", marginBottom:"0.1rem" }}>Today's Check-in</h3>
              <p style={{ color:"#9B7B9E", fontSize:"0.75rem" }}>{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}</p>
            </div>
            {saved && <span style={{ fontSize:"0.8rem", color:"#5CAE8C", fontWeight:700 }}>✓ Saved!</span>}
          </div>

          {/* Mood selector */}
          <p style={{ fontSize:"0.76rem", fontWeight:700, color:"#6B4E6E", letterSpacing:"0.04em", marginBottom:"0.65rem" }}>MOOD</p>
          <div style={{ display:"flex", gap:"0.55rem", marginBottom:"1.5rem" }}>
            {MOODS.map((m,i)=>(
              <div key={i} onClick={()=>setSelected(i)}
                style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"0.28rem", padding:"0.6rem 0.25rem", borderRadius:"14px", border:`2px solid ${selected===i?"#C8909A":"transparent"}`, background:selected===i?"#FDE8E0":"#F5EDE6", cursor:"pointer", transition:"all 0.22s" }}>
                <span style={{ fontSize:"1.4rem" }}>{m.emoji}</span>
                <span style={{ fontSize:"0.62rem", fontWeight:600, color:selected===i?"#C8909A":"#9B7B9E" }}>{m.label}</span>
              </div>
            ))}
          </div>

          {/* Sliders — compact */}
          {[["⚡ Energy", energy, setEnergy, "#9B7BB8"], ["💧 Pain / discomfort", pain, setPain, "#C8909A"]].map(([label, val, setter, accent])=>(
            <div key={label} style={{ marginBottom:"1.1rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.76rem", color:"#6B4E6E", marginBottom:"0.4rem", fontWeight:600 }}>
                <span>{label}</span>
                <span style={{ color:accent, fontWeight:700 }}>{val}/10</span>
              </div>
              <input type="range" min="1" max="10" value={val} onChange={e=>setter(Number(e.target.value))}
                style={{ width:"100%", accentColor:accent, height:"4px", borderRadius:"2px", cursor:"pointer" }} />
            </div>
          ))}

          {/* Tags */}
          <p style={{ fontSize:"0.76rem", fontWeight:700, color:"#6B4E6E", letterSpacing:"0.04em", marginBottom:"0.55rem" }}>HOW ARE YOU FEELING? <span style={{ fontWeight:400, color:"#9B7B9E" }}>(select all that apply)</span></p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.38rem", marginBottom:"1.1rem" }}>
            {TAGS.map(tag=>(
              <button key={tag} onClick={()=>toggleTag(tag)}
                style={{ padding:"0.28rem 0.75rem", borderRadius:"50px", fontSize:"0.74rem", fontWeight:600, cursor:"pointer", transition:"all 0.2s", border:"none", background:tags.includes(tag)?"linear-gradient(135deg,#C8909A,#9B7BB8)":"#F5EDE6", color:tags.includes(tag)?"#fff":"#6B4E6E" }}>
                {tag}
              </button>
            ))}
          </div>

          {/* Notes */}
          <textarea value={notes} onChange={e=>setNotes(e.target.value)}
            placeholder="Anything on your mind? (optional) 🌸"
            rows={2}
            style={{ width:"100%", border:"1.5px solid rgba(232,160,156,0.25)", borderRadius:"12px", padding:"0.75rem 0.9rem", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.84rem", color:"#3D2840", resize:"none", outline:"none", background:"#F5EDE6", transition:"border-color 0.2s", marginBottom:"1.1rem" }}
            onFocus={(e)=>e.target.style.borderColor="#C8909A"}
            onBlur={(e)=>e.target.style.borderColor="rgba(232,160,156,0.25)"}
          />

          {/* Save */}
          <button onClick={handleSave}
            style={{ width:"100%", background:saved?"linear-gradient(135deg,#5CAE8C,#3D9B7A)":"linear-gradient(135deg,#C8909A,#9B7BB8)", color:"#fff", border:"none", padding:"0.82rem", borderRadius:"12px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.9rem", fontWeight:700, cursor:"pointer", transition:"all 0.3s", boxShadow:"0 5px 16px rgba(155,123,184,0.28)" }}>
            {saved ? "✓ Saved! See your insights →" : "Save check-in"}
          </button>
        </motion.div>

        {/* What you unlock after 7 days */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}
          style={{ marginTop:"1rem", background:"linear-gradient(135deg,rgba(155,123,184,0.08),rgba(200,144,154,0.06))", border:"1px solid rgba(155,123,184,0.15)", borderRadius:"16px", padding:"1rem 1.25rem" }}>
          <p style={{ fontSize:"0.76rem", fontWeight:700, color:"#9B7BB8", letterSpacing:"0.06em", marginBottom:"0.6rem" }}>✨ WHAT YOU UNLOCK WITH CONSISTENT LOGGING</p>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
            {[
              ["7 days",  "See your first mood pattern emerge"],
              ["14 days", "CYRA identifies your PMS window"],
              ["1 month", "Full cycle mood map — your body's emotional blueprint"],
              ["3 months","Predict your best and hardest days before they arrive"],
            ].map(([days, unlock])=>(
              <div key={days} style={{ display:"flex", gap:"0.75rem", alignItems:"center" }}>
                <span style={{ fontSize:"0.7rem", fontWeight:700, color:"#C8909A", minWidth:"52px" }}>{days}</span>
                <span style={{ fontSize:"0.76rem", color:"#6B4E6E", lineHeight:1.5 }}>→ {unlock}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}