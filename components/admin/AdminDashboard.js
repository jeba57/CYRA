"use client";

import { motion } from "framer-motion";

const STATS = [
  { icon:"👩", label:"Active Users",       value:"2,847", change:"+12%", up:true },
  { icon:"🌸", label:"Mood Logs Today",    value:"1,423", change:"+8%",  up:true },
  { icon:"🤖", label:"AI Conversations",   value:"309",   change:"+22%", up:true },
  { icon:"📖", label:"Reports Uploaded",   value:"88",    change:"+5%",  up:true },
  { icon:"💊", label:"Prescriptions Saved","value":"214", change:"+3%",  up:true },
  { icon:"⭐", label:"Satisfaction Score", value:"98.2%", change:"+0.4%",up:true },
];

const ACTIVITY = [
  { dot:"#C8909A", text:"New signup — Priya M. · 2 min ago" },
  { dot:"#9B7BB8", text:"AI conversation flagged · 5 min ago" },
  { dot:"#5CAE8C", text:"Report uploaded — Aisha K. · 8 min ago" },
  { dot:"#FCDEC0", text:"100 mood logs milestone reached · 15 min ago" },
  { dot:"#E8A4A0", text:"PCOS support query spike detected · 22 min ago" },
  { dot:"#9DDDD0", text:"New signup — Fatima R. · 30 min ago" },
];

const BARS = [55,70,45,85,100,78,62];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export default function AdminDashboard() {
  return (
    <div style={{ padding:"3rem 3rem 4rem" }}>
      {/* Header */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
        style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"2.5rem", flexWrap:"wrap", gap:"1rem" }}>
        <div>
          <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8909A", marginBottom:"0.3rem" }}>⚙️ Admin Panel</p>
          <h1 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"2rem", fontWeight:600, color:"#3D2840" }}>Wellness Dashboard</h1>
        </div>
        <div style={{ display:"flex", gap:"0.75rem" }}>
          <button style={{ background:"#fff", border:"1.5px solid rgba(200,144,154,0.3)", color:"#6B4E6E", padding:"0.55rem 1.25rem", borderRadius:"50px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.83rem", fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}>
            May 2025
          </button>
          <button style={{ background:"linear-gradient(135deg,#C8909A,#9B7BB8)", color:"#fff", border:"none", padding:"0.55rem 1.4rem", borderRadius:"50px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.83rem", fontWeight:700, cursor:"pointer", boxShadow:"0 4px 14px rgba(155,123,184,0.3)" }}>
            Export Report
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
        {STATS.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:i*0.07 }}
            style={{ background:"#fff", borderRadius:"18px", padding:"1.4rem", border:"1px solid rgba(232,160,156,0.15)", transition:"all 0.3s", cursor:"default" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(61,40,64,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
            <span style={{ fontSize:"1.4rem", display:"block", marginBottom:"0.6rem" }}>{s.icon}</span>
            <div style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.7rem", fontWeight:600, color:"#3D2840" }}>{s.value}</div>
            <div style={{ fontSize:"0.75rem", color:"#9B7B9E", fontWeight:500, margin:"0.2rem 0" }}>{s.label}</div>
            <div style={{ fontSize:"0.72rem", color:s.up?"#5CAE8C":"#E8A4A0", fontWeight:700 }}>{s.up?"↑":"↓"} {s.change} this week</div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:"1.25rem", marginBottom:"2rem" }}>
        {/* Bar chart */}
        <div style={{ background:"#fff", borderRadius:"20px", padding:"1.75rem", border:"1px solid rgba(232,160,156,0.15)" }}>
          <h4 style={{ fontSize:"0.88rem", fontWeight:700, color:"#6B4E6E", marginBottom:"1.5rem" }}>Weekly User Activity</h4>
          <div style={{ display:"flex", alignItems:"flex-end", gap:"8px", height:"100px" }}>
            {BARS.map((h, i) => (
              <motion.div key={i}
                initial={{ height:0 }} animate={{ height:`${h}%` }} transition={{ duration:0.7, delay:i*0.07 }}
                style={{ flex:1, borderRadius:"6px 6px 0 0", background:h===100?"linear-gradient(180deg,#9B7BB8,#C8909A)":h>=75?"linear-gradient(180deg,#C8909A,#E8A4A0)":"linear-gradient(180deg,#E8A4A0,#F7D6D0)", cursor:"pointer", transition:"filter 0.2s", minHeight:"4px" }}
                onMouseEnter={(e)=>e.currentTarget.style.filter="brightness(1.1)"}
                onMouseLeave={(e)=>e.currentTarget.style.filter="brightness(1)"} />
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:"0.5rem" }}>
            {DAYS.map(d => <span key={d} style={{ fontSize:"0.68rem", color:"#9B7B9E", textAlign:"center", flex:1 }}>{d}</span>)}
          </div>
        </div>

        {/* Activity */}
        <div style={{ background:"#fff", borderRadius:"20px", padding:"1.75rem", border:"1px solid rgba(232,160,156,0.15)" }}>
          <h4 style={{ fontSize:"0.88rem", fontWeight:700, color:"#6B4E6E", marginBottom:"1.25rem" }}>Recent Activity</h4>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem" }}>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"0.7rem", fontSize:"0.78rem", color:"#6B4E6E" }}>
                <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:a.dot, flexShrink:0, marginTop:"4px" }} />
                <span>{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users table */}
      <div style={{ background:"#fff", borderRadius:"20px", border:"1px solid rgba(232,160,156,0.15)", overflow:"hidden" }}>
        <div style={{ padding:"1.25rem 1.75rem", borderBottom:"1px solid rgba(232,160,156,0.12)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h4 style={{ fontSize:"0.88rem", fontWeight:700, color:"#6B4E6E" }}>Recent Users</h4>
          <button style={{ background:"transparent", border:"1px solid rgba(200,144,154,0.3)", color:"#C8909A", padding:"0.3rem 0.9rem", borderRadius:"50px", fontSize:"0.75rem", fontWeight:600, cursor:"pointer" }}>View all</button>
        </div>
        {[
          { name:"Priya Mehta",    email:"priya@email.com",    phase:"Follicular", mood:"😊", joined:"Today" },
          { name:"Aisha Khan",     email:"aisha@email.com",    phase:"Luteal",     mood:"😐", joined:"Yesterday" },
          { name:"Fatima Reza",    email:"fatima@email.com",   phase:"Menstruation",mood:"😔",joined:"2 days ago" },
          { name:"Sara Thomas",    email:"sara@email.com",     phase:"Ovulation",  mood:"🥰", joined:"3 days ago" },
          { name:"Deepa Nair",     email:"deepa@email.com",    phase:"Follicular", mood:"😊", joined:"5 days ago" },
        ].map((user, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:"1rem", padding:"0.9rem 1.75rem", borderBottom:i<4?"1px solid rgba(232,160,156,0.08)":"none", transition:"background 0.2s", cursor:"pointer" }}
            onMouseEnter={(e)=>e.currentTarget.style.background="#F5EDE6"}
            onMouseLeave={(e)=>e.currentTarget.style.background="transparent"}>
            <div style={{ width:"36px", height:"36px", borderRadius:"50%", background:"linear-gradient(135deg,#F7D6D0,#E8E0F5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.85rem", fontWeight:700, color:"#C8909A", flexShrink:0 }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:"0.85rem", fontWeight:600, color:"#3D2840" }}>{user.name}</p>
              <p style={{ fontSize:"0.72rem", color:"#9B7B9E" }}>{user.email}</p>
            </div>
            <span style={{ fontSize:"0.72rem", background:"rgba(200,144,154,0.1)", color:"#C8909A", padding:"0.2rem 0.7rem", borderRadius:"50px", fontWeight:600 }}>{user.phase}</span>
            <span style={{ fontSize:"1.1rem" }}>{user.mood}</span>
            <span style={{ fontSize:"0.72rem", color:"#9B7B9E", minWidth:"70px", textAlign:"right" }}>{user.joined}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
