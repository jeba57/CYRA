"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function avg(arr) {
  if (!arr.length) return null;
  return +(arr.reduce((s,v)=>s+v,0)/arr.length).toFixed(1);
}

export default function AdminDashboard() {
  const [d, setD] = useState(null);

  useEffect(() => {
    try {
      const mood   = JSON.parse(localStorage.getItem("moodLogs")  || "[]");
      const cycle  = JSON.parse(localStorage.getItem("cycleData") || "{}");
      const users  = JSON.parse(localStorage.getItem("cyra_users") || "[]");
      const history = cycle.cycleHistory || [];

      // streak
      let streak = 0;
      for (let i=0;i<60;i++) {
        const d2=new Date(); d2.setDate(d2.getDate()-i);
        if (mood.some(l=>l.date===d2.toISOString().split("T")[0])) streak++;
        else break;
      }

      setD({
        totalLogs: mood.length,
        avgMood:   avg(mood.map(l=>l.mood)),
        avgEnergy: avg(mood.map(l=>l.energy)),
        avgPain:   avg(mood.map(l=>l.pain)),
        streak,
        cycles:    history.length,
        cycleLen:  cycle.cycleLength||28,
        users,
        recentMoods: mood.slice(-5).reverse(),
      });
    } catch(e){}
  }, []);

  if (!d) return <div style={{padding:"6rem",textAlign:"center",color:"#9B7B9E"}}>Loading...</div>;

  const stats = [
    {icon:"📋",label:"Mood Logs",    value:d.totalLogs,              color:"#C8909A"},
    {icon:"😊",label:"Avg Mood",     value:d.avgMood?`${d.avgMood}/5`:"—", color:"#9B7BB8"},
    {icon:"⚡",label:"Avg Energy",   value:d.avgEnergy?`${d.avgEnergy}/10`:"—", color:"#3D9B8A"},
    {icon:"💧",label:"Avg Pain",     value:d.avgPain?`${d.avgPain}/10`:"—",   color:"#C44569"},
    {icon:"🌙",label:"Cycles Logged",value:d.cycles,                 color:"#9B7BB8"},
    {icon:"🔥",label:"Streak",       value:`${d.streak}d`,           color:"#B8924A"},
  ];

  return (
    <div style={{padding:"3rem 2rem 5rem",maxWidth:"1000px",margin:"0 auto"}}>

      {/* Header */}
      <div style={{marginBottom:"2rem"}}>
        <p style={{fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:"#C8909A",marginBottom:"0.3rem"}}>⚙️ ADMIN PANEL</p>
        <h1 style={{fontFamily:"var(--font-cormorant),serif",fontSize:"2rem",fontWeight:600,color:"#3D2840"}}>Your Wellness Dashboard</h1>
        <p style={{fontSize:"0.78rem",color:"#9B7B9E"}}>{new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})} · All data from your personal logs</p>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(148px,1fr))",gap:"1rem",marginBottom:"1.75rem"}}>
        {stats.map(s=>(
          <motion.div key={s.label} whileHover={{y:-3}}
            style={{background:"#fff",borderRadius:"18px",padding:"1.1rem 1.25rem",border:"1px solid rgba(200,144,154,0.13)",boxShadow:"0 3px 16px rgba(61,40,64,0.06)"}}>
            <span style={{fontSize:"1.3rem",display:"block",marginBottom:"0.45rem"}}>{s.icon}</span>
            <div style={{fontFamily:"var(--font-cormorant),serif",fontSize:"1.6rem",fontWeight:600,color:s.color}}>{s.value}</div>
            <div style={{fontSize:"0.73rem",fontWeight:700,color:"#6B4E6E"}}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Registered users */}
      <div style={{background:"#fff",borderRadius:"22px",overflow:"hidden",border:"1px solid rgba(200,144,154,0.13)",boxShadow:"0 3px 16px rgba(61,40,64,0.05)",marginBottom:"1.5rem"}}>
        <div style={{padding:"1rem 1.5rem",background:"rgba(245,237,230,0.5)",borderBottom:"1px solid rgba(200,144,154,0.1)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <h3 style={{fontFamily:"var(--font-cormorant),serif",fontSize:"1.1rem",fontWeight:500,color:"#3D2840",margin:0}}>Registered Users</h3>
            <p style={{fontSize:"0.72rem",color:"#9B7B9E",marginTop:"0.1rem"}}>{d.users.length} user{d.users.length!==1?"s":""} signed up</p>
          </div>
        </div>
        {d.users.length > 0 ? (
          <div>
            {/* Table header */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",padding:"0.6rem 1.5rem",borderBottom:"1px solid rgba(200,144,154,0.07)"}}>
              {["Name","Email","Joined","Last Visit"].map(h=>(
                <span key={h} style={{fontSize:"0.65rem",fontWeight:700,color:"#9B7B9E",letterSpacing:"0.04em",textTransform:"uppercase"}}>{h}</span>
              ))}
            </div>
            {d.users.map((u,i)=>(
              <div key={i}
                style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",padding:"0.75rem 1.5rem",borderBottom:i<d.users.length-1?"1px solid rgba(200,144,154,0.07)":"none",transition:"background 0.2s"}}
                onMouseEnter={(e)=>e.currentTarget.style.background="#F5EDE6"}
                onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}>
                <div style={{display:"flex",alignItems:"center",gap:"0.6rem"}}>
                  <div style={{width:"28px",height:"28px",borderRadius:"50%",background:"linear-gradient(135deg,#F7D6D0,#E8E0F5)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",fontWeight:700,color:"#C8909A",flexShrink:0}}>
                    {(u.name||u.email||"?")[0].toUpperCase()}
                  </div>
                  <span style={{fontSize:"0.8rem",fontWeight:600,color:"#3D2840"}}>{u.name||"—"}</span>
                </div>
                <span style={{fontSize:"0.76rem",color:"#6B4E6E",alignSelf:"center"}}>{u.email||"—"}</span>
                <span style={{fontSize:"0.74rem",color:"#9B7B9E",alignSelf:"center"}}>{u.joinedAt ? new Date(u.joinedAt).toLocaleDateString("en-IN",{day:"numeric",month:"short"}) : "—"}</span>
                <span style={{fontSize:"0.74rem",color:"#9B7B9E",alignSelf:"center"}}>{u.lastVisit ? new Date(u.lastVisit).toLocaleDateString("en-IN",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}) : "—"}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{padding:"2.5rem",textAlign:"center"}}>
            <p style={{fontSize:"0.85rem",color:"#9B7B9E",marginBottom:"0.5rem"}}>No users registered yet.</p>
            <p style={{fontSize:"0.78rem",color:"#9B7B9E"}}>Users are tracked when they sign up via the Signup page.</p>
          </div>
        )}
      </div>

      {/* Recent mood check-ins */}
      <div style={{background:"#F5EDE6",borderRadius:"22px",padding:"1.4rem 1.75rem",border:"1px solid rgba(200,144,154,0.12)"}}>
        <h3 style={{fontFamily:"var(--font-cormorant),serif",fontSize:"1.1rem",fontWeight:500,color:"#3D2840",marginBottom:"0.2rem"}}>Recent Check-ins</h3>
        <p style={{fontSize:"0.72rem",color:"#9B7B9E",marginBottom:"1rem"}}>Your last 5 mood logs</p>
        {d.recentMoods.length > 0 ? (
          <div style={{display:"flex",flexDirection:"column",gap:"0.5rem"}}>
            {d.recentMoods.map((l,i)=>{
              const e=["","😔","😐","🙂","😊","🥰"][l.mood]||"🙂";
              return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:"0.75rem",padding:"0.6rem 0.85rem",background:"#fff",borderRadius:"12px"}}>
                  <span style={{fontSize:"1.2rem"}}>{e}</span>
                  <div style={{flex:1}}>
                    <span style={{fontSize:"0.8rem",fontWeight:600,color:"#3D2840"}}>{l.date}</span>
                    <span style={{fontSize:"0.72rem",color:"#9B7B9E",marginLeft:"0.75rem"}}>Energy {l.energy}/10 · Pain {l.pain}/10</span>
                  </div>
                  {(l.tags||[]).slice(0,2).map(t=>(
                    <span key={t} style={{fontSize:"0.68rem",background:"rgba(200,144,154,0.12)",color:"#C8909A",borderRadius:"50px",padding:"0.15rem 0.55rem",fontWeight:600}}>{t}</span>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{fontSize:"0.8rem",color:"#9B7B9E",fontStyle:"italic"}}>No check-ins yet. Start in Today's Feelings.</p>
        )}
      </div>
    </div>
  );
}