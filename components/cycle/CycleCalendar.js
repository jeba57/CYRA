"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DAYS_OF_WEEK = ["SU","MO","TU","WE","TH","FR","SA"];

const FLOW_STYLES = {
  0:"linear-gradient(135deg,#D96C7B,#C44569)",
  1:"linear-gradient(135deg,#C44569,#A4133C)",
  2:"linear-gradient(135deg,#E08A98,#C44569)",
  3:"linear-gradient(135deg,#F2B5BD,#E08A98)",
  4:"linear-gradient(135deg,#F9D6DB,#F2B5BD)",
  5:"linear-gradient(135deg,#FAE3E6,#F7CDD3)",
  6:"linear-gradient(135deg,#FCEBED,#F8DADF)",
  7:"linear-gradient(135deg,#FFF2F4,#FCE5E8)",
  8:"linear-gradient(135deg,#FFF5F6,#FDECEF)",
  9:"linear-gradient(135deg,#FFF8F9,#FEF2F4)",
};

const PHASE_INFO = {
  period:    { icon:"🩸", label:"Period Day",      color:"#C44569", bg:"linear-gradient(135deg,#FDE8E0,#F7D6D0)", border:"#E8A4A0", body:"Your uterus is shedding its lining. Estrogen and progesterone are at their lowest. Rest, warmth, and iron-rich foods will help restore you.", tips:["🍵 Warm ginger tea for cramps","🛁 Heat pad on lower belly","🥬 Iron-rich foods help","💤 Extra rest is healing"] },
  fertile:   { icon:"🌿", label:"Fertile Window",  color:"#3D9B8A", bg:"linear-gradient(135deg,#D4F5EF,#C8EEE8)", border:"#9DDDD0", body:"Estrogen is climbing and your body is preparing for ovulation. You may feel more social, creative, and energetic right now.",           tips:["🏃 Great time for cardio","🥗 Fresh vegetables and fruits","💬 Have important conversations","📚 Your brain is sharper now"] },
  ovulation: { icon:"✨", label:"Ovulation Day",    color:"#9B7BB8", bg:"linear-gradient(135deg,#EDE0F5,#E8E0F5)", border:"#9B7BB8", body:"Your LH hormone surges and an egg is released. This is your highest energy and confidence day of the entire cycle.",                    tips:["💪 High-intensity workout","🎯 Tackle your biggest goals","💃 Social events, presentations","🌟 You are at your most magnetic"] },
  normal:    { icon:"📅", label:"Regular Day",      color:"#6B4E6E", bg:"linear-gradient(135deg,#F5EDE6,#FDF8F3)", border:"#E8A4A0", body:"This day falls between your tracked phases. Your hormones are in transition — pay attention to your energy and mood.",                   tips:["💧 Stay hydrated","🌸 Check in with your body","☀️ Morning sunlight helps hormones","📓 Log how you feel"] },
};

function getDayStyle(type, isToday, flowIndex, preview) {
  const base = { aspectRatio:"1", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"50%", fontSize:"0.85rem", cursor:"pointer", transition:"all 0.25s ease", position:"relative", userSelect:"none", WebkitUserSelect:"none", border: isToday ? "2px solid #C8909A" : "2px solid transparent" };
  if (preview)          return { ...base, background:"rgba(200,144,154,0.18)", border:"2px dashed #C8909A", color:"#C44569" };
  if (type==="period")    return { ...base, background:FLOW_STYLES[flowIndex]||FLOW_STYLES[9], color:flowIndex>=7?"#C44569":"#fff", fontWeight:700 };
  if (type==="ovulation") return { ...base, background:"linear-gradient(135deg,#E8E0F5,#9B7BB8)", color:"#fff", fontWeight:700 };
  if (type==="fertile")   return { ...base, background:"linear-gradient(135deg,#C8EEE8,#9DDDD0)", color:"#3D2840", fontWeight:600 };
  return { ...base, color:"#6B4E6E" };
}

function detectIrregular(history) {
  if (history.length < 3) return false;
  const lengths = history.slice(-3).map(c=>c.cycleLength).filter(Boolean);
  if (lengths.length < 2) return false;
  return Math.max(...lengths) - Math.min(...lengths) > 7;
}

// ── Compact prediction row ──────────────────────────────────
function PredRow({ icon, label, value, color }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", padding:"0.55rem 0.75rem", background:"rgba(245,237,230,0.6)", borderRadius:"12px" }}>
      <span style={{ fontSize:"0.95rem", flexShrink:0 }}>{icon}</span>
      <span style={{ fontSize:"0.7rem", color:"#9B7B9E", fontWeight:600, minWidth:"80px" }}>{label}</span>
      <span style={{ fontSize:"0.88rem", fontWeight:700, color, fontFamily:"var(--font-cormorant),serif" }}>{value}</span>
    </div>
  );
}

export default function CycleCalendar() {
  const today      = new Date();
  const currentDay = today.getDate();

  const [previewStart,  setPreviewStart]  = useState(null);
  const [periodStart,   setPeriodStart]   = useState(null);
  const [periodEnd,     setPeriodEnd]     = useState(null);
  const [cycleHistory,  setCycleHistory]  = useState([]);
  const [cycleLength,   setCycleLength]   = useState(28);
  const [selectedDay,   setSelectedDay]   = useState(null);
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cycleData"));
      if (saved) { setPeriodStart(saved.periodStart); setPeriodEnd(saved.periodEnd); setCycleHistory(saved.cycleHistory||[]); setCycleLength(saved.cycleLength||28); }
    } catch(e) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("cycleData", JSON.stringify({ periodStart, periodEnd, cycleHistory, cycleLength })); } catch(e) {}
  }, [periodStart, periodEnd, cycleHistory, cycleLength]);

  function handleSingleClick(day) {
    setPreviewStart(day);
    setSelectedDay(prev => prev===day ? null : day);
  }

  function handleDoubleClick(day) {
    if (cycleHistory.length > 0) {
      const prev = cycleHistory[cycleHistory.length-1];
      const calc = day - prev.start;
      if (calc>=20 && calc<=40) {
        setCycleLength(calc);
        setCycleHistory(h => { const u=[...h]; u[u.length-1]={...u[u.length-1],cycleLength:calc}; return u; });
      }
    }
    setPeriodStart(day); setPeriodEnd(day+4);
    setPreviewStart(null); setSelectedDay(null);
  }

  function handleEndDate(day) {
    if (day >= periodStart) {
      setPeriodEnd(day);
      setCycleHistory(prev => [...prev.filter(c=>c.start!==periodStart), {start:periodStart,end:day,cycleLength}]);
      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 2500);
    }
  }

  function handleReset() { setPeriodStart(null); setPeriodEnd(null); setPreviewStart(null); setSelectedDay(null); }

  const periodDays        = periodStart!=null && periodEnd!=null ? Array.from({length:periodEnd-periodStart+1},(_,i)=>periodStart+i) : [];
  const activeCycleLength = cycleLength||28;
  const ovulationDay      = periodStart!=null ? periodStart+activeCycleLength-14 : null;
  const fertileDays       = ovulationDay!=null ? Array.from({length:6},(_,i)=>ovulationDay-3+i) : [];
  const nextPeriodDay     = periodStart!=null ? periodStart+activeCycleLength : null;
  const isIrregular       = detectIrregular(cycleHistory);
  const periodLength      = periodStart!=null && periodEnd!=null ? periodEnd-periodStart+1 : null;

  const days = [];
  for (let d=1; d<=31; d++) {
    let type="normal", flowIndex=null;
    if (periodDays.includes(d))       { type="period"; flowIndex=d-periodStart; }
    else if (d===ovulationDay)         { type="ovulation"; }
    else if (fertileDays.includes(d)) { type="fertile"; }
    days.push({ day:d, type, flowIndex, isToday:d===currentDay });
  }

  const clickedData = selectedDay ? days.find(d=>d.day===selectedDay) : null;
  const clickedInfo = clickedData ? { ...PHASE_INFO[clickedData.type], dayNum:selectedDay, flowDay:clickedData.flowIndex!=null?clickedData.flowIndex+1:null } : null;

  return (
    <div style={{ background:"radial-gradient(circle at top left,rgba(255,255,255,0.85),transparent 35%),radial-gradient(circle at right,rgba(232,224,245,0.7),transparent 40%),linear-gradient(135deg,#FDF8F3,#F8E5E7,#EDE0F5)", padding:"5.5rem 1.5rem 3rem", position:"relative", minHeight:"100vh" }}>

      <style>{`
        .cycle-layout { display:grid; grid-template-columns:1fr 320px; gap:1.25rem; max-width:1020px; margin:0 auto; }
        .cycle-left  { display:flex; flex-direction:column; gap:1rem; }
        .cycle-right { display:flex; flex-direction:column; gap:1rem; }
        .cycle-block { background:rgba(255,255,255,0.82); backdrop-filter:blur(14px); border:1px solid rgba(200,144,154,0.15); border-radius:18px; overflow:hidden; box-shadow:0 4px 20px rgba(61,40,64,0.06); }
        .cycle-block-header { display:flex; align-items:center; gap:0.5rem; padding:0.7rem 1.1rem; border-bottom:1px solid rgba(200,144,154,0.1); background:rgba(245,237,230,0.5); }
        .cycle-block-body { padding:1rem 1.1rem; }
        @media(max-width:860px) { .cycle-layout { grid-template-columns:1fr !important; } }
        @media(max-width:480px) { .end-row button { width:40px !important; height:40px !important; } }
      `}</style>

      {/* Premium ambient orb — matches home */}
      <motion.div
        style={{ position:"fixed", top:"-180px", right:"-180px", width:"420px", height:"420px", borderRadius:"50%", background:"radial-gradient(circle,rgba(232,224,245,0.45),transparent 70%)", pointerEvents:"none", zIndex:0 }}
        animate={{ scale:[1,1.06,1] }} transition={{ duration:9, repeat:Infinity, ease:"easeInOut" }}
      />
      <motion.div
        style={{ position:"fixed", bottom:"-120px", left:"-100px", width:"340px", height:"340px", borderRadius:"50%", background:"radial-gradient(circle,rgba(252,222,192,0.3),transparent 70%)", pointerEvents:"none", zIndex:0 }}
        animate={{ scale:[1,1.04,1] }} transition={{ duration:11, repeat:Infinity, ease:"easeInOut", delay:2 }}
      />

      {/* Page header */}
      <div style={{ maxWidth:"1020px", margin:"0 auto 1.5rem", position:"relative", zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"rgba(255,255,255,0.5)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.6)", borderRadius:"999px", padding:"0.38rem 0.95rem", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.06em", color:"#C8909A", marginBottom:"0.8rem" }}>
            MY CYCLE
          </div>
          <h1 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(1.7rem,2.8vw,2.4rem)", fontWeight:400, color:"#3D2840", marginBottom:"0.3rem" }}>
            Track your cycle, <em style={{ fontStyle:"italic", color:"#C8909A" }}>gently.</em>
          </h1>
          <p style={{ color:"#9B7B9E", fontSize:"0.82rem" }}>Single tap a day to learn about it · Double tap to log your period start</p>
        </motion.div>
      </div>

      {/* Irregular warning — compact */}
      <AnimatePresence>
        {isIrregular && (
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            style={{ maxWidth:"1020px", margin:"0 auto 1rem", background:"linear-gradient(135deg,#FFF4E8,#FCDEC0)", border:"1.5px solid #FCDEC0", borderRadius:"14px", padding:"0.75rem 1.1rem", display:"flex", gap:"0.65rem", alignItems:"center", position:"relative", zIndex:1 }}>
            <span>⚠️</span>
            <div>
              <span style={{ fontWeight:700, fontSize:"0.82rem", color:"#3D2840" }}>Irregular cycle detected — </span>
              <span style={{ fontSize:"0.78rem", color:"#6B4E6E" }}>your last 3 cycles vary by more than 7 days. Worth discussing with your doctor if it continues.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Two-column layout */}
      <div className="cycle-layout" style={{ position:"relative", zIndex:1 }}>

        {/* ── LEFT ── */}
        <div className="cycle-left">

          {/* Calendar */}
          <motion.div className="cycle-block" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}>
            <div className="cycle-block-header">
              <span style={{ fontSize:"0.9rem" }}></span>
              <span style={{ fontSize:"0.76rem", fontWeight:700, color:"#3D2840", letterSpacing:"0.04em" }}>June 2025</span>
            </div>
            <div className="cycle-block-body">
              {/* Day headers */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", textAlign:"center", marginBottom:"0.5rem" }}>
                {DAYS_OF_WEEK.map(d => <span key={d} style={{ fontSize:"0.62rem", fontWeight:700, color:"#9B7B9E", letterSpacing:"0.06em" }}>{d}</span>)}
              </div>
              {/* Day grid */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"3px" }}>
                {days.map((item,i) => (
                  <div key={i}
                    style={getDayStyle(item.type,item.isToday,item.flowIndex,previewStart===item.day)}
                    onClick={() => handleSingleClick(item.day)}
                    onDoubleClick={() => handleDoubleClick(item.day)}
                    title={item.type==="period"?`Period Day ${item.flowIndex+1}`:item.type==="ovulation"?"Ovulation ✨":item.type==="fertile"?"Fertile Window 🌿":"Normal Day — tap for info"}
                    onMouseEnter={(e)=>{ if(item.type==="normal"){e.currentTarget.style.background="#F7D6D0";e.currentTarget.style.transform="scale(1.1)";} }}
                    onMouseLeave={(e)=>{ if(item.type==="normal"){e.currentTarget.style.background="transparent";e.currentTarget.style.transform="scale(1)";} }}
                  >
                    {item.day}
                    {item.day===periodStart   && <div style={{ position:"absolute", top:"-5px", right:"-2px", fontSize:"0.55rem" }}>🩸</div>}
                    {item.day===ovulationDay  && <div style={{ position:"absolute", top:"-5px", right:"-2px", fontSize:"0.55rem" }}>✨</div>}
                    {item.day===nextPeriodDay && <div style={{ position:"absolute", top:"-5px", left:"-2px",  fontSize:"0.5rem"  }}>📅</div>}
                  </div>
                ))}
              </div>
              {/* Legend */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.55rem", marginTop:"0.85rem", paddingTop:"0.75rem", borderTop:"1px solid rgba(200,144,154,0.15)" }}>
                {[["#C44569","🩸 Period"],["#9DDDD0","🌿 Fertile"],["#9B7BB8","✨ Ovulation"],["#C8909A","📅 Next"]].map(([color,label])=>(
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:"0.3rem", fontSize:"0.64rem", color:"#6B4E6E" }}>
                    <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:color }} />{label}
                  </div>
                ))}
                <span style={{ fontSize:"0.6rem", color:"#9B7B9E", marginLeft:"auto" }}>👆 tap · ✌️ log</span>
              </div>
            </div>
          </motion.div>

          {/* Phase info popup — slides in below calendar, not inside it */}
          <AnimatePresence mode="wait">
            {clickedInfo && (
              <motion.div key={selectedDay}
                initial={{ opacity:0, y:8, scale:0.97 }}
                animate={{ opacity:1, y:0, scale:1 }}
                exit={{ opacity:0, y:-6, scale:0.97 }}
                transition={{ duration:0.25, ease:"easeOut" }}
                style={{ background:clickedInfo.bg, border:`1.5px solid ${clickedInfo.border}`, borderRadius:"18px", padding:"1.1rem 1.25rem", boxShadow:"0 8px 28px rgba(61,40,64,0.09)" }}
              >
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.6rem" }}>
                  <div>
                    <span style={{ fontSize:"0.64rem", fontWeight:700, color:clickedInfo.color, letterSpacing:"0.08em", textTransform:"uppercase", display:"block", marginBottom:"0.2rem" }}>
                      Day {clickedInfo.dayNum} · {clickedInfo.icon} {clickedInfo.label}{clickedInfo.flowDay ? ` ${clickedInfo.flowDay}` : ""}
                    </span>
                    <p style={{ fontSize:"0.82rem", color:"#6B4E6E", lineHeight:1.68, maxWidth:"420px" }}>{clickedInfo.body}</p>
                  </div>
                  <button onClick={()=>setSelectedDay(null)} style={{ background:"rgba(255,255,255,0.7)", border:"none", borderRadius:"50%", width:"24px", height:"24px", cursor:"pointer", fontSize:"0.7rem", color:"#6B4E6E", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", marginLeft:"0.75rem" }}>✕</button>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.35rem" }}>
                  {clickedInfo.tips.map((tip,i)=>(
                    <div key={i} style={{ background:"rgba(255,255,255,0.6)", borderRadius:"9px", padding:"0.45rem 0.65rem", fontSize:"0.72rem", color:"#3D2840", fontWeight:500 }}>{tip}</div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cycle history — compact rows */}
          {cycleHistory.length > 0 && (
            <div className="cycle-block">
              <div className="cycle-block-header">
                <span style={{ fontSize:"0.9rem" }}></span>
                <span style={{ fontSize:"0.76rem", fontWeight:700, color:"#3D2840" }}>Cycle History</span>
              </div>
              <div className="cycle-block-body" style={{ padding:"0.75rem 1.1rem" }}>
                {cycleHistory.slice(-4).reverse().map((c,i)=>(
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.45rem 0.65rem", background:i===0?"rgba(200,144,154,0.08)":"transparent", borderRadius:"10px", marginBottom:"0.3rem" }}>
                    <span style={{ fontSize:"0.76rem", color:"#3D2840", fontWeight:i===0?700:400 }}>{i===0?"🌸 Current":"Cycle "+(cycleHistory.length-i)} <span style={{ color:"#9B7B9E", fontWeight:400 }}>Day {c.start}→{c.end}</span></span>
                    <span style={{ fontSize:"0.74rem", fontWeight:700, color:"#C8909A" }}>{c.end-c.start+1}d{c.cycleLength?` / ${c.cycleLength}d`:""}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT ── */}
        <div className="cycle-right">

          {/* Predictions */}
          <motion.div className="cycle-block" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.15 }}>
            <div className="cycle-block-header">
              <span style={{ fontSize:"0.9rem" }}></span>
              <span style={{ fontSize:"0.76rem", fontWeight:700, color:"#3D2840" }}>Your Predictions</span>
            </div>
            <div className="cycle-block-body">
              {periodStart ? (
                <div style={{ display:"flex", flexDirection:"column", gap:"0.45rem" }}>
                  <PredRow icon="🩸" label="Period"        value={`Day ${periodStart}–${periodEnd}`}                           color="#C44569" />
                  <PredRow icon="🔄" label="Cycle Length"  value={`${activeCycleLength} days`}                                 color="#6B4E6E" />
                  <PredRow icon="🌿" label="Fertile"       value={`Day ${fertileDays[0]}–${fertileDays[fertileDays.length-1]}`} color="#3D9B8A" />
                  <PredRow icon="✨" label="Ovulation"      value={`Day ${ovulationDay}`}                                       color="#9B7BB8" />
                  <PredRow icon="📆" label="Next Period"   value={`Day ${nextPeriodDay}`}                                       color="#C8909A" />
                  <button onClick={handleReset}
                    style={{ marginTop:"0.35rem", background:"transparent", border:"1px solid rgba(200,144,154,0.3)", color:"#9B7B9E", padding:"0.48rem", borderRadius:"10px", fontSize:"0.74rem", fontWeight:600, cursor:"pointer", width:"100%", transition:"all 0.2s" }}
                    onMouseEnter={(e)=>{ e.currentTarget.style.background="#F7D6D0"; e.currentTarget.style.color="#C44569"; }}
                    onMouseLeave={(e)=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#9B7B9E"; }}>
                    🔄 Reset & log new period
                  </button>
                </div>
              ) : (
                <div style={{ textAlign:"center", padding:"1.25rem 0.5rem" }}>
                  <div style={{ fontSize:"1.8rem", marginBottom:"0.65rem" }}></div>
                  <p style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.1rem", color:"#3D2840", marginBottom:"0.35rem" }}>No cycle logged yet</p>
                  <p style={{ fontSize:"0.78rem", color:"#9B7B9E", lineHeight:1.65 }}>Double tap any day on the calendar to set your period start.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* End date picker — compact */}
          {periodStart && (
            <motion.div className="cycle-block" initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.3 }}>
              <div className="cycle-block-header">
                <span style={{ fontSize:"0.9rem" }}>🩸</span>
                <span style={{ fontSize:"0.76rem", fontWeight:700, color:"#3D2840" }}>Confirm Period End</span>
              </div>
              <div className="cycle-block-body">
                <p style={{ fontSize:"0.78rem", color:"#6B4E6E", marginBottom:"0.75rem" }}>
                  {savedFeedback ? "✅ Saved!" : "Tap the actual last day:"}
                </p>
                <div className="end-row" style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
                  {Array.from({length:10},(_,i)=>periodStart+i).map(day=>(
                    <button key={day} onClick={()=>handleEndDate(day)} style={{
                      width:"44px", height:"44px", borderRadius:"50%",
                      border:day===periodEnd?"none":"1.5px solid #E0C9CD",
                      background:day===periodEnd?"#C44569":"#fff",
                      color:day===periodEnd?"#fff":"#6B4E6E",
                      cursor:"pointer", display:"flex", flexDirection:"column",
                      alignItems:"center", justifyContent:"center", lineHeight:1,
                      transition:"all 0.2s",
                      boxShadow:day===periodEnd?"0 4px 14px rgba(196,69,105,0.35)":"0 2px 6px rgba(61,40,64,0.05)",
                      transform:day===periodEnd?"scale(1.1)":"scale(1)",
                    }}>
                      <span style={{ fontSize:"0.36rem", opacity:0.6, marginBottom:"1px", fontWeight:600 }}>{day-periodStart+1}th</span>
                      <span style={{ fontSize:"0.76rem", fontWeight:700 }}>{day}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* How to use — collapsible, compact */}
          <HowToUse />

        </div>
      </div>
    </div>
  );
}

function HowToUse() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background:"rgba(255,255,255,0.82)", backdropFilter:"blur(14px)", border:"1px solid rgba(200,144,154,0.15)", borderRadius:"18px", overflow:"hidden", boxShadow:"0 4px 20px rgba(61,40,64,0.06)" }}>
      <button onClick={()=>setOpen(o=>!o)} style={{ width:"100%", display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.7rem 1.1rem", background:"rgba(245,237,230,0.5)", border:"none", cursor:"pointer", textAlign:"left" }}>
        <span style={{ fontSize:"0.9rem" }}>💡</span>
        <span style={{ fontSize:"0.76rem", fontWeight:700, color:"#3D2840" }}>How to Use</span>
        <span style={{ marginLeft:"auto", fontSize:"0.7rem", color:"#9B7B9E" }}>{open?"▲":"▼"}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }} style={{ overflow:"hidden" }}>
            <div style={{ padding:"0.85rem 1.1rem", display:"flex", flexDirection:"column", gap:"0.6rem" }}>
              {[["1","👆","Single tap → see phase info + tips"],["2","✌️","Double tap → log period start"],["3","🩸","Tap circle → confirm period end"],["4","🔮","Predictions auto-update"]].map(([step,icon,text])=>(
                <div key={step} style={{ display:"flex", gap:"0.6rem", alignItems:"flex-start" }}>
                  <div style={{ width:"22px", height:"22px", borderRadius:"50%", background:"linear-gradient(135deg,#C8909A,#9B7BB8)", color:"#fff", fontSize:"0.65rem", fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{step}</div>
                  <p style={{ fontSize:"0.77rem", color:"#6B4E6E", lineHeight:1.6, paddingTop:"0.1rem" }}>{icon} {text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}