"use client";

// components/admin/AdminDashboard.js
// Admin reads from localStorage (all user data lives there until you add a real DB)
// You are the admin — this shows YOUR data + simulated platform overview

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function avg(arr) {
  if (!arr.length) return null;
  return +(arr.reduce((s,v)=>s+v,0)/arr.length).toFixed(1);
}

function StatCard({ icon, label, value, sub, color="#C8909A", delta }) {
  return (
    <motion.div whileHover={{ y:-3 }}
      style={{ background:"#fff", borderRadius:"18px", padding:"1.25rem 1.4rem", border:"1px solid rgba(200,144,154,0.13)", boxShadow:"0 3px 16px rgba(61,40,64,0.06)" }}>
      <span style={{ fontSize:"1.5rem", display:"block", marginBottom:"0.55rem" }}>{icon}</span>
      <div style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.65rem", fontWeight:600, color, marginBottom:"0.15rem" }}>{value}</div>
      <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#6B4E6E" }}>{label}</div>
      {sub   && <div style={{ fontSize:"0.67rem", color:"#9B7B9E", marginTop:"0.15rem" }}>{sub}</div>}
      {delta && <div style={{ fontSize:"0.68rem", color:"#5CAE8C", fontWeight:700, marginTop:"0.3rem" }}>{delta}</div>}
    </motion.div>
  );
}

export default function AdminDashboard() {
  const [data,      setData]      = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [barMetric, setBarMetric] = useState("mood");
  const [users, setUsers] = useState([]);

  useEffect(() => {

  async function loadDashboard() {

    try {

      // FETCH DATABASE DATA
      const moodRes = await fetch("/api/mood?days=365");
      const moodData = await moodRes.json();

      const cycleRes = await fetch("/api/cycle");
      const cycleData = await cycleRes.json();

      // CONVERT DATABASE → LOCAL VARIABLES
      const moodRaw = moodData.logs || [];

      const cycleRaw = {
        cycleHistory: cycleData.cycles || [],
        cycleLength:
          cycleData.cycles?.[0]?.cycleLength || 28,

        periodStart:
          cycleData.cycles?.[0]
            ? new Date(cycleData.cycles[0].periodStart).getDate()
            : null,

        periodEnd:
          cycleData.cycles?.[0]?.periodEnd
            ? new Date(cycleData.cycles[0].periodEnd).getDate()
            : null,
      };

      // YOUR EXISTING ANALYTICS CODE
      const now = new Date();

    

    
      // ── Mood stats ─────────────────────────────────────────
      const thisMonth = moodRaw.filter(l => {
        const d = new Date(l.date);
        return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
      });
      const allTime = moodRaw;

      let streak = 0;
      for (let i = 0; i < 60; i++) {
        const d = new Date(); d.setDate(d.getDate()-i);
        if (moodRaw.some(l=>l.date===d.toISOString().split("T")[0])) streak++;
        else break;
      }

      // ── Cycle stats ────────────────────────────────────────
      const history       = cycleRaw.cycleHistory || [];
      const cycleLength   = cycleRaw.cycleLength  || 28;
      const periodStart   = cycleRaw.periodStart;
      const periodEnd     = cycleRaw.periodEnd;
      const ovulationDay  = periodStart ? periodStart + cycleLength - 14 : null;
      const nextPeriod    = periodStart ? periodStart + cycleLength : null;
      const cycleLengths  = history.filter(c=>c.cycleLength).map(c=>c.cycleLength);
      const isIrregular   = cycleLengths.length>=3 && (Math.max(...cycleLengths)-Math.min(...cycleLengths))>7;

      // ── Monthly chart data ─────────────────────────────────
      const monthlyChart = Array.from({length:6},(_,i)=>{
        const d    = new Date(now.getFullYear(), now.getMonth()-(5-i), 1);
        const logs = moodRaw.filter(l=>{ const ld=new Date(l.date); return ld.getMonth()===d.getMonth()&&ld.getFullYear()===d.getFullYear(); });
        return { label:MONTH_NAMES[d.getMonth()], mood:avg(logs.map(l=>l.mood))||0, energy:avg(logs.map(l=>l.energy))||0, pain:avg(logs.map(l=>l.pain))||0, count:logs.length };
      });

      // ── Tag frequency ──────────────────────────────────────
      const tagCounts = {};
      moodRaw.forEach(l=>(l.tags||[]).forEach(t=>tagCounts[t]=(tagCounts[t]||0)+1));
      const topTags = Object.entries(tagCounts).sort((a,b)=>b[1]-a[1]).slice(0,6);

      // ── Recent activity feed (from mood logs) ─────────────
      const recentActivity = moodRaw.slice(-5).reverse().map(l=>({
        date: l.date,
        mood: l.mood,
        tags: (l.tags||[]).slice(0,2),
      }));

      setData({
        // Mood
        totalLogs:    allTime.length,
        thisMonthLogs:thisMonth.length,
        avgMood:      avg(allTime.map(l=>l.mood)),
        avgEnergy:    avg(allTime.map(l=>l.energy)),
        avgPain:      avg(allTime.map(l=>l.pain)),
        streak,
        topTags,
        recentActivity,
        monthlyChart,
        // Cycle
        cyclesLogged: history.length,
        cycleLength,
        periodStart,
        periodEnd,
        ovulationDay,
        nextPeriod,
        isIrregular,
        cycleLengths,
        history: history.slice().reverse().slice(0,6),
      });
    } catch(e) { console.error(e); }
  }
  loadDashboard();
}, []);

  if (!data) return (
    <div style={{ padding:"6rem 3rem", textAlign:"center", color:"#9B7B9E" }}>
      <div style={{ fontSize:"2rem", marginBottom:"1rem" }}>⏳</div>
      <p>Loading your dashboard...</p>
    </div>
  );

  const tabs = [
    { id:"overview", label:"📊 Overview" },
    { id:"cycle",    label:"🌙 Cycle"    },
    { id:"mood",     label:"🌸 Mood"     },
    { id:"activity", label:"📋 Activity" },
  ];

  return (
    <div style={{ padding:"3rem 2rem 5rem", maxWidth:"1100px", margin:"0 auto" }}>

      {/* Header */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
        style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"2rem", flexWrap:"wrap", gap:"1rem" }}>
        <div>
          <p style={{ fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8909A", marginBottom:"0.3rem" }}>⚙️ ADMIN PANEL</p>
          <h1 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"2rem", fontWeight:600, color:"#3D2840", marginBottom:"0.25rem" }}>Your Wellness Dashboard</h1>
          <p style={{ fontSize:"0.78rem", color:"#9B7B9E" }}>All data from your personal CYRA logs · {new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}</p>
        </div>
        <div style={{ background:"linear-gradient(135deg,rgba(200,144,154,0.1),rgba(155,123,184,0.1))", borderRadius:"16px", padding:"0.75rem 1.25rem", textAlign:"center" }}>
          <div style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.5rem", fontWeight:600, color:"#C8909A" }}>{data.streak}</div>
          <div style={{ fontSize:"0.68rem", color:"#9B7B9E", fontWeight:600 }}>day streak 🔥</div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:"0.4rem", marginBottom:"1.75rem", flexWrap:"wrap" }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setActiveTab(t.id)}
            style={{ padding:"0.5rem 1.1rem", borderRadius:"50px", border:"none", cursor:"pointer", fontSize:"0.8rem", fontWeight:600, transition:"all 0.2s",
              background:activeTab===t.id?"linear-gradient(135deg,#C8909A,#9B7BB8)":"rgba(200,144,154,0.1)",
              color:activeTab===t.id?"#fff":"#6B4E6E",
              boxShadow:activeTab===t.id?"0 4px 14px rgba(155,123,184,0.3)":"none",
            }}>
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── OVERVIEW TAB ── */}
        {activeTab==="overview" && (
          <motion.div key="overview" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>

            {/* Irregular alert */}
            {data.isIrregular && (
              <div style={{ background:"linear-gradient(135deg,#FFF4E8,#FCDEC0)", border:"1.5px solid #FCDEC0", borderRadius:"14px", padding:"0.85rem 1.1rem", marginBottom:"1.5rem", display:"flex", gap:"0.65rem", alignItems:"flex-start" }}>
                <span>⚠️</span>
                <div>
                  <p style={{ fontWeight:700, fontSize:"0.82rem", color:"#3D2840", marginBottom:"0.15rem" }}>Irregular cycle detected</p>
                  <p style={{ fontSize:"0.76rem", color:"#6B4E6E" }}>Your last 3 cycles: {data.cycleLengths.slice(-3).join(", ")} days. Variation &gt; 7 days detected.</p>
                </div>
              </div>
            )}

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(155px,1fr))", gap:"1rem", marginBottom:"1.75rem" }}>
              <StatCard icon="📋" label="Total Mood Logs"   value={data.totalLogs}     color="#C8909A" sub="all time"              delta={data.thisMonthLogs?`${data.thisMonthLogs} this month`:null} />
              <StatCard icon="😊" label="Avg Mood"          value={data.avgMood?`${data.avgMood}/5`:"—"}   color="#9B7BB8" sub="all time average" />
              <StatCard icon="⚡" label="Avg Energy"        value={data.avgEnergy?`${data.avgEnergy}/10`:"—"} color="#3D9B8A" sub="all time average" />
              <StatCard icon="💧" label="Avg Pain"          value={data.avgPain?`${data.avgPain}/10`:"—"}   color="#C44569" sub="all time average" />
              <StatCard icon="🌙" label="Cycles Tracked"    value={data.cyclesLogged}  color="#9B7BB8" sub={data.cycleLength?`avg ${data.cycleLength}d cycle`:null} />
              <StatCard icon="🔥" label="Current Streak"    value={`${data.streak}d`} color="#B8924A" sub="consecutive days" delta={data.streak>=7?"🎉 7+ days!":null} />
            </div>

            {/* 6-month chart */}
            <div style={{ background:"#F5EDE6", borderRadius:"22px", padding:"1.5rem 1.75rem", border:"1px solid rgba(200,144,154,0.12)", marginBottom:"1.5rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.25rem", flexWrap:"wrap", gap:"0.75rem" }}>
                <div>
                  <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.15rem", fontWeight:500, color:"#3D2840", marginBottom:"0.1rem" }}>6-Month Activity</h3>
                  <p style={{ fontSize:"0.72rem", color:"#9B7B9E" }}>Monthly log count + average {barMetric}</p>
                </div>
                <div style={{ display:"flex", gap:"0.35rem" }}>
                  {["mood","energy","pain"].map(m=>(
                    <button key={m} onClick={()=>setBarMetric(m)}
                      style={{ padding:"0.28rem 0.7rem", borderRadius:"50px", border:"none", cursor:"pointer", fontSize:"0.7rem", fontWeight:600, transition:"all 0.2s",
                        background:barMetric===m?"#C8909A":"rgba(200,144,154,0.12)",
                        color:barMetric===m?"#fff":"#9B7B9E",
                      }}>
                      {m.charAt(0).toUpperCase()+m.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"flex-end", gap:"8px", height:"90px", marginBottom:"0.5rem" }}>
                {data.monthlyChart.map((m,i)=>{
                  const val    = m[barMetric];
                  const maxVal = barMetric==="mood"?5:10;
                  const pct    = val ? (val/maxVal)*100 : 0;
                  const isMax  = data.monthlyChart.reduce((mx,d)=>d[barMetric]>mx?d[barMetric]:mx,0)===val && val>0;
                  return (
                    <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", height:"100%" }}>
                      <div style={{ width:"100%", flex:1, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
                        <motion.div
                          initial={{ height:0 }} whileInView={{ height:`${Math.max(pct,2)}%` }} viewport={{ once:true }}
                          transition={{ duration:0.7, delay:i*0.07, ease:"easeOut" }}
                          title={`${m.label}: ${val||"no data"}`}
                          style={{ width:"100%", borderRadius:"5px 5px 0 0", background:isMax?"linear-gradient(180deg,#9B7BB8,#C8909A)":val>0?"linear-gradient(180deg,#E8A4A0,#F7D6D0)":"rgba(200,144,154,0.1)", minHeight:"3px", cursor:"pointer" }}
                          onMouseEnter={(e)=>e.currentTarget.style.filter="brightness(1.1)"}
                          onMouseLeave={(e)=>e.currentTarget.style.filter="brightness(1)"}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display:"flex", gap:"8px" }}>
                {data.monthlyChart.map(m=><div key={m.label} style={{ flex:1, textAlign:"center", fontSize:"0.62rem", color:"#9B7B9E" }}>{m.label}</div>)}
              </div>
            </div>

            {/* Top feelings tags */}
            {data.topTags.length > 0 && (
              <div style={{ background:"#F5EDE6", borderRadius:"22px", padding:"1.4rem 1.75rem", border:"1px solid rgba(200,144,154,0.12)" }}>
                <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.15rem", fontWeight:500, color:"#3D2840", marginBottom:"0.25rem" }}>Most Frequent Feelings</h3>
                <p style={{ fontSize:"0.72rem", color:"#9B7B9E", marginBottom:"1rem" }}>Tags you've selected most often in your daily check-ins</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                  {data.topTags.map(([tag,count])=>(
                    <div key={tag} style={{ display:"flex", alignItems:"center", gap:"0.4rem", background:"#fff", borderRadius:"50px", padding:"0.35rem 0.85rem", border:"1px solid rgba(200,144,154,0.2)" }}>
                      <span style={{ fontSize:"0.78rem", fontWeight:600, color:"#6B4E6E" }}>{tag}</span>
                      <span style={{ fontSize:"0.65rem", fontWeight:700, color:"#C8909A", background:"rgba(200,144,154,0.12)", borderRadius:"50px", padding:"0.1rem 0.45rem" }}>{count}×</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ── CYCLE TAB ── */}
        {activeTab==="cycle" && (
          <motion.div key="cycle" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.25rem", marginBottom:"1.25rem" }}>
              <div style={{ background:"linear-gradient(135deg,#3D2840,#6B3A7A)", borderRadius:"22px", padding:"1.75rem" }}>
                <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.2rem", color:"rgba(255,255,255,0.9)", fontWeight:400, marginBottom:"1.25rem" }}>Current Cycle</h3>
                {data.periodStart ? (
                  [
                    ["🩸","Period Start",   `Day ${data.periodStart}`],
                    ["📅","Period End",     `Day ${data.periodEnd||data.periodStart+4}`],
                    ["🔄","Cycle Length",   `${data.cycleLength} days`],
                    ["✨","Ovulation",       `Day ${data.ovulationDay}`],
                    ["📆","Next Period",    `Day ${data.nextPeriod}`],
                    ["🌿","Fertile Window", `Day ${data.ovulationDay-3}–${data.ovulationDay}`],
                  ].map(([icon,label,val])=>(
                    <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.5rem 0", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
                      <span style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.65)" }}>{icon} {label}</span>
                      <span style={{ fontSize:"0.8rem", fontWeight:700, color:"#FCDEC0" }}>{val}</span>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.55)", fontStyle:"italic" }}>No cycle logged yet. Go to My Cycle to start tracking.</p>
                )}
              </div>
              <div style={{ background:"#F5EDE6", borderRadius:"22px", padding:"1.75rem", border:"1px solid rgba(200,144,154,0.12)" }}>
                <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.2rem", color:"#3D2840", fontWeight:400, marginBottom:"0.25rem" }}>Cycle Analytics</h3>
                <p style={{ fontSize:"0.72rem", color:"#9B7B9E", marginBottom:"1.1rem" }}>Based on {data.history.length} logged cycles</p>
                {data.cycleLengths.length > 0 ? (
                  <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
                    {[
                      ["Shortest cycle", `${Math.min(...data.cycleLengths)} days`],
                      ["Longest cycle",  `${Math.max(...data.cycleLengths)} days`],
                      ["Average cycle",  `${Math.round(data.cycleLengths.reduce((s,v)=>s+v,0)/data.cycleLengths.length)} days`],
                      ["Irregular?",     data.isIrregular?"⚠️ Yes — see above":"✅ Regular pattern"],
                    ].map(([label,val])=>(
                      <div key={label} style={{ display:"flex", justifyContent:"space-between", padding:"0.5rem 0.75rem", background:"#fff", borderRadius:"12px" }}>
                        <span style={{ fontSize:"0.78rem", color:"#6B4E6E" }}>{label}</span>
                        <span style={{ fontSize:"0.78rem", fontWeight:700, color:"#C8909A" }}>{val}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize:"0.78rem", color:"#9B7B9E", fontStyle:"italic" }}>Log 2+ cycles to see analytics.</p>
                )}
              </div>
            </div>

            {/* Cycle history table */}
            {data.history.length > 0 && (
              <div style={{ background:"#fff", borderRadius:"22px", overflow:"hidden", border:"1px solid rgba(200,144,154,0.13)", boxShadow:"0 3px 16px rgba(61,40,64,0.05)" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", padding:"0.7rem 1.25rem", background:"rgba(245,237,230,0.8)", borderBottom:"1px solid rgba(200,144,154,0.1)" }}>
                  {["Cycle","Period Days","Flow Length","Cycle Length"].map(h=>(
                    <span key={h} style={{ fontSize:"0.67rem", fontWeight:700, color:"#9B7B9E", letterSpacing:"0.04em", textTransform:"uppercase" }}>{h}</span>
                  ))}
                </div>
                {data.history.map((c,i)=>(
                  <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", padding:"0.7rem 1.25rem", borderBottom:i<data.history.length-1?"1px solid rgba(200,144,154,0.07)":"none", background:i===0?"rgba(200,144,154,0.04)":"transparent" }}>
                    <span style={{ fontSize:"0.78rem", fontWeight:i===0?700:400, color:"#3D2840" }}>{i===0?"🌸 Current":`#${data.history.length-i}`}</span>
                    <span style={{ fontSize:"0.76rem", color:"#6B4E6E" }}>Day {c.start}–{c.end}</span>
                    <span style={{ fontSize:"0.76rem", color:"#C44569", fontWeight:600 }}>{c.end-c.start+1} days</span>
                    <span style={{ fontSize:"0.76rem", color:c.cycleLength?"#9B7BB8":"#9B7B9E", fontWeight:c.cycleLength?600:400 }}>{c.cycleLength?`${c.cycleLength}d`:"—"}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ── MOOD TAB ── */}
        {activeTab==="mood" && (
          <motion.div key="mood" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"1rem", marginBottom:"1.5rem" }}>
              <StatCard icon="😊" label="All-Time Avg Mood"   value={data.avgMood?`${data.avgMood}/5`:"—"}    color="#C8909A" sub="across all logs" />
              <StatCard icon="⚡" label="All-Time Avg Energy" value={data.avgEnergy?`${data.avgEnergy}/10`:"—"} color="#9B7BB8" sub="across all logs" />
              <StatCard icon="💧" label="All-Time Avg Pain"   value={data.avgPain?`${data.avgPain}/10`:"—"}    color="#C44569" sub="across all logs" />
              <StatCard icon="📋" label="Total Check-ins"     value={data.totalLogs}                            color="#6B4E6E" sub={`${data.thisMonthLogs} this month`} />
            </div>

            {/* Mood distribution */}
            {data.totalLogs > 0 && (
              <div style={{ background:"#F5EDE6", borderRadius:"22px", padding:"1.5rem 1.75rem", border:"1px solid rgba(200,144,154,0.12)" }}>
                <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.15rem", fontWeight:500, color:"#3D2840", marginBottom:"0.2rem" }}>Monthly Mood Trend</h3>
                <p style={{ fontSize:"0.72rem", color:"#9B7B9E", marginBottom:"1.25rem" }}>Average mood score per month — purple = your best month</p>
                <div style={{ display:"flex", alignItems:"flex-end", gap:"8px", height:"80px", marginBottom:"0.5rem" }}>
                  {data.monthlyChart.map((m,i)=>{
                    const pct = m.mood ? (m.mood/5)*100 : 0;
                    const isMax = data.monthlyChart.reduce((mx,d)=>d.mood>mx?d.mood:mx,0)===m.mood && m.mood>0;
                    return (
                      <div key={i} style={{ flex:1, height:"100%", display:"flex", flexDirection:"column", justifyContent:"flex-end" }} title={`${m.label}: ${m.mood||"no data"}`}>
                        <motion.div initial={{ height:0 }} whileInView={{ height:`${Math.max(pct,2)}%` }} viewport={{ once:true }} transition={{ duration:0.7, delay:i*0.07 }}
                          style={{ width:"100%", borderRadius:"5px 5px 0 0", background:isMax?"linear-gradient(180deg,#9B7BB8,#C8909A)":m.mood>0?"linear-gradient(180deg,#E8A4A0,#F7D6D0)":"rgba(200,144,154,0.1)", minHeight:"3px" }} />
                      </div>
                    );
                  })}
                </div>
                <div style={{ display:"flex", gap:"8px" }}>
                  {data.monthlyChart.map(m=><div key={m.label} style={{ flex:1, textAlign:"center", fontSize:"0.62rem", color:"#9B7B9E" }}>{m.label}</div>)}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ── ACTIVITY TAB ── */}
        {activeTab==="activity" && (
          <motion.div key="activity" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
            <div style={{ background:"#fff", borderRadius:"22px", overflow:"hidden", border:"1px solid rgba(200,144,154,0.13)", boxShadow:"0 3px 16px rgba(61,40,64,0.05)" }}>
              <div style={{ padding:"1.1rem 1.5rem", background:"rgba(245,237,230,0.5)", borderBottom:"1px solid rgba(200,144,154,0.1)" }}>
                <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.15rem", fontWeight:500, color:"#3D2840", margin:0 }}>Recent Check-ins</h3>
                <p style={{ fontSize:"0.72rem", color:"#9B7B9E", marginTop:"0.15rem" }}>Your last {data.recentActivity.length} mood logs</p>
              </div>

              {data.recentActivity.length > 0 ? (
                data.recentActivity.map((log,i)=>{
                  const moodEmoji = ["","😔","😐","🙂","😊","🥰"][log.mood]||"🙂";
                  return (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:"1rem", padding:"0.9rem 1.5rem", borderBottom:i<data.recentActivity.length-1?"1px solid rgba(200,144,154,0.07)":"none", transition:"background 0.2s" }}
                      onMouseEnter={(e)=>e.currentTarget.style.background="#F5EDE6"}
                      onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}>
                      <span style={{ fontSize:"1.4rem", flexShrink:0 }}>{moodEmoji}</span>
                      <div style={{ flex:1 }}>
                        <p style={{ fontSize:"0.82rem", fontWeight:600, color:"#3D2840", marginBottom:"0.15rem" }}>{log.date}</p>
                        <p style={{ fontSize:"0.72rem", color:"#9B7B9E" }}>Mood {log.mood}/5 {log.tags.length>0?`· ${log.tags.join(", ")}`:""}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ padding:"3rem", textAlign:"center" }}>
                  <p style={{ color:"#9B7B9E", fontSize:"0.85rem" }}>No check-ins yet. Start in Today's Feelings.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}