"use client";

// components/insights/MoodTrends.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export default function MoodTrends() {
  const [weeks,   setWeeks]   = useState([]);
  const [metric,  setMetric]  = useState("mood");
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    try {
      const logs = JSON.parse(localStorage.getItem("moodLogs") || "[]");
      if (logs.length === 0) { setHasData(false); return; }
      setHasData(true);

      // Build last 4 weeks of data
      const built = Array.from({ length: 4 }, (_, wi) => {
        // wi=0 is oldest week, wi=3 is current week
        const weekDays = Array.from({ length: 7 }, (_, di) => {
          const d = new Date();
          d.setDate(d.getDate() - ((3 - wi) * 7) - (6 - di));
          const key = d.toISOString().split("T")[0];
          const log = logs.find(l => l.date === key);
          return { date: key, logged: !!log, mood: log?.mood||0, energy: log?.energy||0, pain: log?.pain||0 };
        });
        // Determine dominant cycle phase for this week
        const cd    = JSON.parse(localStorage.getItem("cycleData") || "{}");
        const ps    = cd.periodStart;
        const cl    = cd.cycleLength || 28;
        let phase   = "—";
        if (ps) {
          const midDay   = weekDays[3];
          const today    = new Date();
          const startDate = new Date(today.getFullYear(), today.getMonth(), ps);
          const diff     = Math.floor((new Date(midDay.date) - startDate) / 86400000) + 1;
          const dOC      = ((diff % cl) + cl) % cl || cl;
          if (dOC <= 5)       phase = "🩸 Menstruation";
          else if (dOC <= 13) phase = "🌱 Follicular";
          else if (dOC <= 16) phase = "✨ Ovulation";
          else                phase = "🍂 Luteal";
        }
        return { label: `Week ${wi + 1}`, phase, days: weekDays };
      });
      setWeeks(built);
    } catch(e) {}
  }, []);

  const maxVal = metric === "mood" ? 5 : 10;
  const metricColor = { mood:"#C8909A", energy:"#9B7BB8", pain:"#C44569" };
  const metricLabel = { mood:"Mood (1–5)", energy:"Energy (1–10)", pain:"Pain (1–10)" };

  if (!hasData) return null; // hide entirely if no data — InsightsDashboard shows empty state

  return (
    <section style={{ padding:"0 1.5rem 3rem", background:"#fff" }}>
      <div style={{ maxWidth:"1040px", margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          style={{ background:"#F5EDE6", borderRadius:"22px", padding:"1.5rem 1.75rem", border:"1px solid rgba(200,144,154,0.12)" }}>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"0.75rem", marginBottom:"1.25rem" }}>
            <div>
              <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.2rem", fontWeight:500, color:"#3D2840", marginBottom:"0.15rem" }}>
                Weekly Emotional Landscape
              </h3>
              <p style={{ fontSize:"0.74rem", color:"#9B7B9E", lineHeight:1.55 }}>
                Your last 4 weeks of daily logs — each bar is one day, height = your logged {metricLabel[metric]}
              </p>
            </div>
            {/* Metric toggle */}
            <div style={{ display:"flex", gap:"0.35rem" }}>
              {["mood","energy","pain"].map(m => (
                <button key={m} onClick={() => setMetric(m)}
                  style={{ padding:"0.3rem 0.75rem", borderRadius:"50px", border:"none", cursor:"pointer", fontSize:"0.72rem", fontWeight:600, transition:"all 0.2s",
                    background: metric===m ? metricColor[m] : "rgba(200,144,154,0.1)",
                    color:      metric===m ? "#fff" : "#9B7B9E",
                  }}>
                  {m.charAt(0).toUpperCase()+m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {weeks.map((week, wi) => (
            <div key={wi} style={{ marginBottom: wi < weeks.length - 1 ? "1.5rem" : 0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.6rem" }}>
                <span style={{ fontSize:"0.78rem", fontWeight:700, color:"#3D2840" }}>{week.label}</span>
                <span style={{ fontSize:"0.68rem", color:"#9B7B9E", background:"rgba(200,144,154,0.1)", padding:"0.15rem 0.6rem", borderRadius:"50px" }}>{week.phase}</span>
              </div>
              <div style={{ display:"flex", gap:"5px", alignItems:"flex-end", height:"64px" }}>
                {week.days.map((day, di) => {
                  const val = day[metric];
                  const pct = val ? (val / maxVal) * 100 : 0;
                  return (
                    <div key={di} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", height:"100%" }} title={day.logged ? `${DAYS[di]}: ${val}/${maxVal}` : `${DAYS[di]}: not logged`}>
                      <div style={{ width:"100%", flex:1, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
                        <motion.div
                          initial={{ height:0 }}
                          whileInView={{ height: day.logged ? `${Math.max(pct,3)}%` : "3%" }}
                          viewport={{ once:true }}
                          transition={{ duration:0.6, delay:di*0.04+wi*0.08, ease:"easeOut" }}
                          style={{
                            width:"100%", borderRadius:"4px 4px 0 0", minHeight:"3px",
                            background: !day.logged
                              ? "rgba(200,144,154,0.12)"
                              : `linear-gradient(180deg,${metricColor[metric]},${metricColor[metric]}88)`,
                            cursor:"pointer",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display:"flex", gap:"5px" }}>
                {DAYS.map(d => <div key={d} style={{ flex:1, textAlign:"center", fontSize:"0.58rem", color:"#9B7B9E", marginTop:"3px" }}>{d[0]}</div>)}
              </div>
            </div>
          ))}

          <div style={{ display:"flex", gap:"1rem", marginTop:"1rem", paddingTop:"0.85rem", borderTop:"1px solid rgba(200,144,154,0.15)", flexWrap:"wrap" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.35rem", fontSize:"0.68rem", color:"#6B4E6E" }}>
              <div style={{ width:"10px", height:"10px", borderRadius:"3px", background:metricColor[metric] }} /> Logged day
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.35rem", fontSize:"0.68rem", color:"#6B4E6E" }}>
              <div style={{ width:"10px", height:"10px", borderRadius:"3px", background:"rgba(200,144,154,0.12)", border:"1px solid rgba(200,144,154,0.2)" }} /> No log
            </div>
            <span style={{ fontSize:"0.68rem", color:"#9B7B9E", marginLeft:"auto" }}>Taller bar = higher {metric}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}