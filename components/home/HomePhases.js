"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHASES = [
  {
    name: "Menstruation", days: "Days 1–5", color: "#C8909A",
    bg: "linear-gradient(135deg,#FDE8E0,#F7D6D0)", icon: "🩸",
    img: "https://images.unsplash.com/photo-1612810806563-4cb8265cb7b0?w=400&q=80",
    desc: "Your body releases its lining. Honor this time with rest, warmth, and gentleness.",
    tips: ["🍵 Warm ginger tea", "🛁 Hot water bottle", "🧘 Child's pose", "💤 Extra sleep"],
    detail: "Estrogen and progesterone drop to their lowest. Your uterus contracts to shed its lining, which is why cramps happen. Iron-rich foods like spinach, lentils, and jaggery help replenish what's lost. This is not weakness — it's your body doing extraordinary work.",
  },
  {
    name: "Follicular", days: "Days 6–13", color: "#3D9B8A",
    bg: "linear-gradient(135deg,#D4F5EF,#C8EEE8)", icon: "🌱",
    img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&q=80",
    desc: "Estrogen rises, energy returns. A great time for new projects and creativity.",
    tips: ["🏃 Light cardio", "🥗 Fresh salads", "📚 Learn something", "🌟 Try something new"],
    detail: "FSH stimulates follicles in your ovaries. Estrogen rises and so does your mood, creativity, and physical strength. You may notice clearer skin, more confidence, and a desire to be social. Lean into this energy — your brain is literally more agile right now.",
  },
  {
    name: "Ovulation", days: "Day 14", color: "#9B7BB8",
    bg: "linear-gradient(135deg,#EDE0F5,#E8E0F5)", icon: "✨",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    desc: "Peak confidence and energy. You feel magnetic. Use this power wisely.",
    tips: ["💬 Important talks", "🏋️ Intense workouts", "💃 Social events", "🎯 Set big goals"],
    detail: "A surge in LH hormone triggers the release of an egg. Estrogen peaks, your voice is higher and more attractive, your face is naturally more symmetric, and your pain tolerance is highest. This is your biological superpower day. Schedule your most challenging or important tasks here.",
  },
  {
    name: "Luteal", days: "Days 15–28", color: "#B8924A",
    bg: "linear-gradient(135deg,#FFF4E8,#FCDEC0)", icon: "🍂",
    img: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&q=80",
    desc: "Progesterone rises. Slow down, nourish yourself, and prepare for next cycle.",
    tips: ["🍫 Dark chocolate", "📓 Journaling", "🧘 Gentle yoga", "🌙 Early bedtime"],
    detail: "Progesterone rises to prepare for possible implantation. If pregnancy doesn't occur, it drops sharply — causing PMS symptoms like bloating, mood swings, and fatigue. Magnesium-rich foods (dark chocolate, nuts, seeds) help enormously. Reduce caffeine and alcohol. Be gentle with yourself.",
  },
];

export default function HomePhases() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <section style={{ padding: "5rem 2rem", background: "linear-gradient(160deg,#F5EDE6,#FDF8F3)" }}>
      <style>{`
        .phases-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-top: 2.5rem;
        }
        @media (max-width: 1024px) {
          .phases-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .phases-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
        style={{ textAlign:"center", maxWidth:"600px", margin:"0 auto" }}>
        <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"#C8909A", marginBottom:"0.75rem" }}>🌙 The Four Phases</p>
        <h2 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"clamp(2rem,3.5vw,2.8rem)", fontWeight:300, lineHeight:1.2, color:"#3D2840", marginBottom:"1rem" }}>
          Your cycle is a <em style={{ fontStyle:"italic", color:"#C8909A" }}>superpower</em>
        </h2>
        <p style={{ color:"#6B4E6E", fontSize:"0.95rem", lineHeight:1.75 }}>
          Tap each phase to learn what's happening inside your body and how to work with it.
        </p>
      </motion.div>

      <div className="phases-grid" style={{ maxWidth: "1100px", margin: "2.5rem auto 0" }}>
        {PHASES.map((phase, i) => (
          <motion.div key={phase.name}
            initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.1 }}>
            <PhaseCard phase={phase} expanded={expandedIndex === i} onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PhaseCard({ phase, expanded, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{ borderRadius:"24px", overflow:"hidden", background:"#fff", boxShadow: expanded ? "0 24px 60px rgba(61,40,64,0.15)" : "0 8px 30px rgba(61,40,64,0.07)", border: expanded ? `2px solid ${phase.color}` : "1px solid rgba(232,160,156,0.12)", transition:"all 0.4s", cursor:"pointer" }}
      onMouseEnter={(e) => { if (!expanded) e.currentTarget.style.transform="translateY(-5px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; }}
    >
      <div style={{ height:"160px", overflow:"hidden", position:"relative" }}>
        <img src={phase.img} alt={phase.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.5s", transform: expanded ? "scale(1.05)" : "scale(1)" }} />
        <div style={{ position:"absolute", inset:0, background: expanded ? `${phase.bg.replace("linear-gradient","linear-gradient").split(",")[0]},rgba(0,0,0,0.1))` : phase.bg, opacity:0.55 }} />
        <div style={{ position:"absolute", top:"0.85rem", left:"0.85rem", background:"rgba(255,255,255,0.92)", backdropFilter:"blur(8px)", borderRadius:"50px", padding:"0.28rem 0.75rem", fontSize:"0.7rem", fontWeight:700, color:"#3D2840" }}>
          {phase.icon} {phase.days}
        </div>
        <div style={{ position:"absolute", bottom:"0.75rem", right:"0.75rem", background: expanded ? phase.color : "rgba(255,255,255,0.8)", color: expanded ? "#fff" : "#6B4E6E", borderRadius:"50%", width:"26px", height:"26px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.75rem", transition:"all 0.3s" }}>
          {expanded ? "−" : "+"}
        </div>
      </div>

      <div style={{ padding:"1.25rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"0.6rem" }}>
          <div style={{ width:"9px", height:"9px", borderRadius:"50%", background:phase.color }} />
          <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.2rem", fontWeight:600, color:"#3D2840" }}>{phase.name}</h3>
        </div>
        <p style={{ color:"#6B4E6E", fontSize:"0.82rem", lineHeight:1.65, marginBottom: expanded ? "1rem" : "0.85rem" }}>{phase.desc}</p>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity:0, height:0 }}
              animate={{ opacity:1, height:"auto" }}
              exit={{ opacity:0, height:0 }}
              transition={{ duration:0.35 }}
              style={{ overflow:"hidden" }}
            >
              <p style={{ fontSize:"0.8rem", color:"#3D2840", lineHeight:1.75, marginBottom:"1rem", background: "#F5EDE6", borderRadius:"12px", padding:"0.85rem", fontStyle:"italic" }}>
                {phase.detail}
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.45rem" }}>
                {phase.tips.map(tip => (
                  <span key={tip} style={{ background:phase.bg, color:"#3D2840", borderRadius:"50px", padding:"0.28rem 0.75rem", fontSize:"0.72rem", fontWeight:600, border:`1px solid ${phase.color}33` }}>{tip}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
