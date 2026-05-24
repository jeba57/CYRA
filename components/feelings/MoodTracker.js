"use client";

// components/feelings/MoodTracker.js
import { useState } from "react";
import { motion } from "framer-motion";
import { useMoodLog } from "../../hooks/useMoodLog";

const MOODS = [
  { emoji:"😔", label:"Low"   },
  { emoji:"😐", label:"Meh"   },
  { emoji:"🙂", label:"Okay"  },
  { emoji:"😊", label:"Good"  },
  { emoji:"🥰", label:"Great" },
];

const TAGS = ["tired", "anxious", "bloated", "cramping", "happy", "energetic", "sad", "calm", "irritable", "motivated"];

export default function MoodTracker() {
  const { saveLog, saving, error } = useMoodLog();

  const [selected,  setSelected]  = useState(2);       // mood index 0-4
  const [energy,    setEnergy]     = useState(6);
  const [pain,      setPain]       = useState(2);
  const [notes,     setNotes]      = useState("");
  const [tags,      setTags]       = useState([]);
  const [saved,     setSaved]      = useState(false);
  const [saveError, setSaveError]  = useState("");

  function toggleTag(tag) {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  }

  async function handleSave() {
    setSaveError("");
    try {
      await saveLog({
        mood:   selected + 1,  // 1-5
        energy,
        pain,
        notes:  notes || null,
        tags,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setSaveError("Failed to save. Please try again.");
    }
  }

  return (
    <section style={{ padding:"3rem 1.5rem", background:"#F5EDE6" }}>
      <div style={{ maxWidth:"620px", margin:"0 auto" }}>
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.7 }}
          style={{ background:"#fff", borderRadius:"28px", padding:"2.5rem", boxShadow:"0 16px 50px rgba(61,40,64,0.08)" }}
        >
          <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.8rem", fontWeight:400, color:"#3D2840", marginBottom:"0.4rem" }}>
            Check in with yourself
          </h2>
          <p style={{ color:"#9B7B9E", fontSize:"0.85rem", marginBottom:"2rem" }}>
            Today · {new Date().toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long" })}
          </p>

          {/* Mood selector */}
          <label style={{ fontSize:"0.82rem", fontWeight:700, color:"#6B4E6E", display:"block", marginBottom:"0.85rem", letterSpacing:"0.03em" }}>
            Your mood right now
          </label>
          <div style={{ display:"flex", gap:"0.65rem", marginBottom:"2rem" }}>
            {MOODS.map((m, i) => (
              <div key={i} onClick={() => setSelected(i)}
                style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:"0.35rem", padding:"0.75rem 0.5rem", borderRadius:"16px", border:`2px solid ${selected===i?"#C8909A":"transparent"}`, background:selected===i?"#FDE8E0":"#F5EDE6", cursor:"pointer", transition:"all 0.25s" }}>
                <span style={{ fontSize:"1.6rem" }}>{m.emoji}</span>
                <span style={{ fontSize:"0.68rem", fontWeight:600, color:selected===i?"#C8909A":"#9B7B9E" }}>{m.label}</span>
              </div>
            ))}
          </div>

          {/* Sliders */}
          {[["Energy level", energy, setEnergy], ["Discomfort / pain", pain, setPain]].map(([label, val, setter]) => (
            <div key={label} style={{ marginBottom:"1.5rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.83rem", color:"#6B4E6E", marginBottom:"0.5rem" }}>
                <span>{label}</span>
                <span style={{ fontWeight:700, color:"#C8909A" }}>{val} / 10</span>
              </div>
              <input type="range" min="1" max="10" value={val}
                onChange={(e) => setter(Number(e.target.value))}
                style={{ width:"100%", accentColor:"#C8909A", height:"4px", borderRadius:"2px", cursor:"pointer" }} />
            </div>
          ))}

          {/* Tags */}
          <label style={{ fontSize:"0.82rem", fontWeight:700, color:"#6B4E6E", display:"block", marginBottom:"0.65rem" }}>
            How are you feeling? (select all that apply)
          </label>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.45rem", marginBottom:"1.5rem" }}>
            {TAGS.map(tag => (
              <button key={tag} onClick={() => toggleTag(tag)}
                style={{ padding:"0.35rem 0.85rem", borderRadius:"50px", fontSize:"0.78rem", fontWeight:600, cursor:"pointer", transition:"all 0.2s", border:"none",
                  background: tags.includes(tag) ? "linear-gradient(135deg,#C8909A,#9B7BB8)" : "#F5EDE6",
                  color:      tags.includes(tag) ? "#fff" : "#6B4E6E",
                }}>
                {tag}
              </button>
            ))}
          </div>

          {/* Notes */}
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything on your mind today? (optional) 🌸"
            rows={3}
            style={{ width:"100%", border:"1.5px solid rgba(232,160,156,0.3)", borderRadius:"14px", padding:"0.9rem 1rem", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.88rem", color:"#3D2840", resize:"none", outline:"none", background:"#F5EDE6", transition:"border-color 0.2s", marginBottom:"1.5rem" }}
            onFocus={(e) => e.target.style.borderColor="#C8909A"}
            onBlur={(e)  => e.target.style.borderColor="rgba(232,160,156,0.3)"}
          />

          {/* Error */}
          {saveError && (
            <p style={{ fontSize:"0.8rem", color:"#C44569", marginBottom:"0.75rem" }}>⚠️ {saveError}</p>
          )}

          {/* Save button */}
          <button onClick={handleSave} disabled={saving}
            style={{ width:"100%", background: saved ? "linear-gradient(135deg,#5CAE8C,#3D9B7A)" : saving ? "#E8E0F5" : "linear-gradient(135deg,#C8909A,#9B7BB8)", color: saving ? "#9B7B9E" : "#fff", border:"none", padding:"0.9rem", borderRadius:"14px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.95rem", fontWeight:700, cursor: saving ? "not-allowed" : "pointer", transition:"all 0.3s", boxShadow:"0 6px 18px rgba(155,123,184,0.3)" }}>
            {saved ? "✓ Saved! 🌸" : saving ? "Saving..." : "Save today's check-in"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}