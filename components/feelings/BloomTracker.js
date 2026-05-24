"use client";

// components/feelings/BloomTracker.js
import { motion } from "framer-motion";
import { useMoodLog } from "../../hooks/useMoodLog";

export default function BloomTracker() {
  const { bloomData, stats, loading } = useMoodLog(30);

  const streak = bloomData.filter((_, i) => {
    // count from today backwards
    for (let j = bloomData.length - 1; j >= 0; j--) {
      if (!bloomData[j].logged) break;
    }
    return false;
  }).length;

  // Calculate streak properly
  let currentStreak = 0;
  for (let i = bloomData.length - 1; i >= 0; i--) {
    if (bloomData[i].logged) currentStreak++;
    else break;
  }

  const totalLogged = bloomData.filter(d => d.logged).length;

  if (loading) {
    return (
      <section style={{ padding:"3rem 1.5rem", background:"#fff" }}>
        <div style={{ maxWidth:"620px", margin:"0 auto", background:"#F5EDE6", borderRadius:"28px", padding:"2.5rem", textAlign:"center" }}>
          <p style={{ color:"#9B7B9E", fontSize:"0.88rem" }}>Loading your bloom streak...</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding:"3rem 1.5rem", background:"#fff" }}>
      <div style={{ maxWidth:"620px", margin:"0 auto" }}>
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }} transition={{ duration:0.7 }}
          style={{ background:"#F5EDE6", borderRadius:"28px", padding:"2.5rem" }}
        >
          {/* Header */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.5rem" }}>
            <div>
              <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.5rem", fontWeight:600, color:"#3D2840", marginBottom:"0.2rem" }}>
                Your Bloom Streak 🌸
              </h3>
              <p style={{ fontSize:"0.83rem", color:"#9B7B9E" }}>
                Last 30 days · {totalLogged} days logged
              </p>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"2rem", fontWeight:600, color:"#C8909A" }}>
                {currentStreak}
              </div>
              <div style={{ fontSize:"0.72rem", color:"#9B7B9E", fontWeight:600 }}>day streak 🔥</div>
            </div>
          </div>

          {/* Bloom grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(15,1fr)", gap:"4px" }}>
            {bloomData.map((d, i) => (
              <motion.div key={i}
                initial={{ scale:0 }} whileInView={{ scale:1 }}
                viewport={{ once:true }}
                transition={{ duration:0.3, delay:i*0.015 }}
                title={`Day ${i+1}${d.logged ? ` — Mood: ${d.mood}/5` : " — Not logged"}`}
                style={{
                  aspectRatio: "1", borderRadius:"4px", cursor:"pointer", transition:"all 0.3s",
                  background: !d.logged
                    ? "#fff"
                    : d.mood >= 4
                    ? "linear-gradient(135deg,#C8909A,#9B7BB8)"
                    : d.mood >= 3
                    ? "linear-gradient(135deg,#E8A4A0,#C8909A)"
                    : "linear-gradient(135deg,#F9D6DB,#E8A4A0)",
                  boxShadow: d.mood >= 4 && d.logged ? "0 0 6px rgba(200,144,154,0.4)" : "none",
                  border: !d.logged ? "1px solid rgba(232,160,156,0.2)" : "none",
                }}
              />
            ))}
          </div>

          {/* Legend */}
          <div style={{ display:"flex", gap:"1rem", marginTop:"1.25rem", flexWrap:"wrap" }}>
            {[
              ["linear-gradient(135deg,#C8909A,#9B7BB8)", "Great mood (4-5)"],
              ["linear-gradient(135deg,#E8A4A0,#C8909A)", "Okay mood (3)"],
              ["linear-gradient(135deg,#F9D6DB,#E8A4A0)", "Low mood (1-2)"],
              ["#fff border", "Not logged"],
            ].map(([bg, label]) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:"0.4rem", fontSize:"0.72rem", color:"#6B4E6E" }}>
                <div style={{ width:"12px", height:"12px", borderRadius:"3px", background: bg.includes("border") ? "transparent" : bg, border: bg.includes("border") ? "1px solid rgba(232,160,156,0.3)" : "none" }} />
                {label}
              </div>
            ))}
          </div>

          {/* Stats row */}
          {stats && (
            <div style={{ display:"flex", gap:"1rem", marginTop:"1.5rem", paddingTop:"1.25rem", borderTop:"1px solid rgba(200,144,154,0.2)", flexWrap:"wrap" }}>
              {[
                ["😊", "Avg mood",   stats.avgMood   ? `${stats.avgMood}/5`   : "—"],
                ["⚡", "Avg energy", stats.avgEnergy ? `${stats.avgEnergy}/10` : "—"],
                ["💧", "Avg pain",   stats.avgPain   ? `${stats.avgPain}/10`   : "—"],
              ].map(([icon, label, val]) => (
                <div key={label} style={{ background:"rgba(255,255,255,0.7)", borderRadius:"12px", padding:"0.6rem 0.9rem", display:"flex", alignItems:"center", gap:"0.5rem" }}>
                  <span style={{ fontSize:"1rem" }}>{icon}</span>
                  <div>
                    <span style={{ fontSize:"0.65rem", color:"#9B7B9E", display:"block", fontWeight:600 }}>{label}</span>
                    <span style={{ fontSize:"0.88rem", fontWeight:700, color:"#C8909A" }}>{val}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}