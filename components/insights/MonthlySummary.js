"use client";

// components/insights/MonthlySummary.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function avg(arr) {
  if (!arr.length) return null;
  return +(arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(1);
}

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function MonthlySummary() {
  const [summary, setSummary] = useState(null);
  const [cyra,    setCyra]    = useState(null);

  useEffect(() => {
    try {
      const logs  = JSON.parse(localStorage.getItem("moodLogs")  || "[]");
      const cd    = JSON.parse(localStorage.getItem("cycleData") || "{}");
      const now   = new Date();
      const month = now.getMonth();
      const year  = now.getFullYear();

      // Current month logs
      const thisMonth = logs.filter(l => {
        const d = new Date(l.date);
        return d.getMonth()===month && d.getFullYear()===year;
      });

      // Last month logs
      const lastMonthDate = new Date(year, month-1, 1);
      const lastMonth = logs.filter(l => {
        const d = new Date(l.date);
        return d.getMonth()===lastMonthDate.getMonth() && d.getFullYear()===lastMonthDate.getFullYear();
      });

      const streak = (() => {
        let s = 0;
        for (let i = 0; i < 60; i++) {
          const d = new Date(); d.setDate(d.getDate()-i);
          if (logs.some(l=>l.date===d.toISOString().split("T")[0])) s++;
          else break;
        }
        return s;
      })();

      const avgMoodThis  = avg(thisMonth.map(l=>l.mood));
      const avgMoodLast  = avg(lastMonth.map(l=>l.mood));
      const moodDelta    = avgMoodThis && avgMoodLast ? +(avgMoodThis - avgMoodLast).toFixed(1) : null;

      const topTag = (() => {
        const counts = {};
        thisMonth.forEach(l => (l.tags||[]).forEach(t => counts[t]=(counts[t]||0)+1));
        const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
        return sorted[0]?.[0] || null;
      })();

      const bestMoodDay = thisMonth.reduce((best, l) => (!best||l.mood>best.mood) ? l : best, null);

      // Next period prediction
      const ps  = cd.periodStart;
      const cl  = cd.cycleLength || 28;
      const nextPeriod = ps ? ps + cl : null;
      const daysAway   = nextPeriod ? nextPeriod - now.getDate() : null;

      // CYRA insight message
      let message = "";
      if (thisMonth.length === 0) {
        message = "Start logging your feelings daily — after 7 days I'll have your first insight ready for you. 🌸";
      } else if (avgMoodThis >= 4) {
        message = `You had a strong month emotionally — your average mood was ${avgMoodThis}/5. That's something to be proud of. 🌸`;
      } else if (avgMoodThis < 3) {
        message = `This month felt heavy, and that's okay. Your average mood was ${avgMoodThis}/5. Being here and tracking is already a form of self-care. 💕`;
      } else {
        message = `You showed up ${thisMonth.length} times this month. Each check-in builds a clearer picture of your body's rhythms. 🌷`;
      }

      if (moodDelta > 0.5) message += ` Your mood improved by ${moodDelta} points compared to last month.`;
      if (moodDelta < -0.5) message += ` Your mood dipped by ${Math.abs(moodDelta)} points vs last month — worth paying attention to.`;

      setSummary({
        monthName:    MONTH_NAMES[month],
        year,
        thisMonth,
        totalLogs:    thisMonth.length,
        avgMood:      avgMoodThis,
        avgEnergy:    avg(thisMonth.map(l=>l.energy)),
        avgPain:      avg(thisMonth.map(l=>l.pain)),
        moodDelta,
        streak,
        topTag,
        bestMoodDay,
        nextPeriod,
        daysAway,
      });
      setCyra(message);
    } catch(e) {}
  }, []);

  if (!summary) return null;

  return (
    <section style={{ padding:"0 1.5rem 5rem", background:"#fff" }}>
      <div style={{ maxWidth:"1040px", margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem" }}>

            {/* Monthly summary card */}
            <div style={{ background:"linear-gradient(135deg,#3D2840,#6B3A7A)", borderRadius:"22px", padding:"1.75rem" }}>
              <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.25rem", fontWeight:400, color:"rgba(255,255,255,0.9)", marginBottom:"1.25rem" }}>
                {summary.monthName} {summary.year}
              </h3>
              {[
                ["📅", "Days tracked",   `${summary.totalLogs} / ${new Date(summary.year,new Date().getMonth()+1,0).getDate()}`],
                ["😊", "Average mood",   summary.avgMood   ? `${summary.avgMood}/5`    : "—"],
                ["⚡", "Average energy", summary.avgEnergy ? `${summary.avgEnergy}/10`  : "—"],
                ["💧", "Average pain",   summary.avgPain   ? `${summary.avgPain}/10`    : "—"],
                ["🔥", "Current streak", `${summary.streak} days`],
                ["🏷️", "Top feeling",    summary.topTag || "—"],
              ].map(([icon, label, val]) => (
                <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.55rem 0", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.65)", display:"flex", alignItems:"center", gap:"0.45rem" }}>{icon} {label}</span>
                  <span style={{ fontSize:"0.82rem", fontWeight:700, color:"#FCDEC0" }}>{val}</span>
                </div>
              ))}
              {summary.moodDelta !== null && (
                <div style={{ marginTop:"0.85rem", padding:"0.55rem 0.85rem", background:"rgba(255,255,255,0.08)", borderRadius:"10px", fontSize:"0.76rem", color:"rgba(255,255,255,0.75)" }}>
                  {summary.moodDelta > 0
                    ? `📈 Mood improved +${summary.moodDelta} vs last month`
                    : summary.moodDelta < 0
                    ? `📉 Mood dipped ${summary.moodDelta} vs last month`
                    : `➡️ Mood stable vs last month`}
                </div>
              )}
            </div>

            {/* Right column */}
            <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>

              {/* CYRA note */}
              <div style={{ background:"#F5EDE6", borderRadius:"18px", padding:"1.4rem", flex:1 }}>
                <div style={{ display:"flex", gap:"0.75rem", alignItems:"flex-start" }}>
                  <div style={{ width:"36px", height:"36px", borderRadius:"50%", overflow:"hidden", flexShrink:0, border:"2px solid rgba(200,144,154,0.3)" }}>
                    <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80" alt="CYRA" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                  <div>
                    <span style={{ fontSize:"0.68rem", fontWeight:700, color:"#C8909A", display:"block", marginBottom:"0.35rem", letterSpacing:"0.06em" }}>
                      CYRA · {summary.monthName} Summary
                    </span>
                    <p style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.05rem", fontStyle:"italic", color:"#3D2840", lineHeight:1.55 }}>
                      "{cyra}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Next cycle predictions */}
              <div style={{ background:"linear-gradient(135deg,#FDE8E0,#F7D6D0)", borderRadius:"18px", padding:"1.25rem", border:"1px solid rgba(232,160,156,0.2)" }}>
                <h4 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.05rem", fontWeight:600, color:"#3D2840", marginBottom:"0.75rem" }}>
                  Next Cycle Predictions
                </h4>
                {summary.nextPeriod ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:"0.45rem" }}>
                    {[
                      ["🩸", "Next period",    `Day ${summary.nextPeriod}`,      summary.daysAway>0?`in ${summary.daysAway} days`:"soon"],
                      ["✨", "Ovulation",       `Day ${summary.nextPeriod - 14}`, "peak energy"],
                      ["🌿", "Fertile window",  `Day ${summary.nextPeriod-19}–${summary.nextPeriod-14}`, "6-day window"],
                    ].map(([icon, label, val, sub]) => (
                      <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:"0.78rem" }}>
                        <span style={{ color:"#6B4E6E" }}>{icon} {label}</span>
                        <div style={{ textAlign:"right" }}>
                          <span style={{ fontWeight:700, color:"#C8909A", display:"block" }}>{val}</span>
                          <span style={{ fontSize:"0.65rem", color:"#9B7B9E" }}>{sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize:"0.78rem", color:"#9B7B9E", fontStyle:"italic" }}>Log your period in My Cycle to see predictions here.</p>
                )}
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}