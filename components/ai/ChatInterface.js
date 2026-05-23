"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOT_REPLIES = [
  "I hear you 💕 That makes complete sense. Your feelings are always valid here.",
  "During your follicular phase, try adding iron-rich foods like spinach and lentils 🌿 Your body rebuilds iron during this time.",
  "It's okay to take it slow today ☁️ Rest is not laziness — it's wisdom. Your body is asking for care.",
  "Cramps on day 1–2 are typically the most intense. A warm compress on your lower belly + ginger tea can make a real difference 🍵",
  "For PCOS support, reducing refined sugar and adding cinnamon to your diet can help regulate blood sugar and hormones 🌿",
  "Sending you so much gentleness right now 🌷 You're doing better than you think. Be patient with yourself.",
  "That's completely normal for the luteal phase. Progesterone tends to make us more emotional and introspective. Honor that 🌙",
];

let replyIndex = 0;

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { role:"bot", text:"Hey lovely 🌸 I'm CYRA. I'm here for you. How are you feeling today?" },
  ]);
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, typing]);

  function send() {
    if (!input.trim()) return;
    const userMsg = { role:"user", text:input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role:"bot", text:BOT_REPLIES[replyIndex++ % BOT_REPLIES.length] }]);
      setTyping(false);
    }, 1100);
  }

  return (
    <section style={{ padding:"4rem 4rem", background:"#FDF8F3" }}>
      <div style={{ maxWidth:"760px", margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          style={{ borderRadius:"28px", overflow:"hidden", boxShadow:"0 24px 60px rgba(61,40,64,0.12)", border:"1px solid rgba(232,160,156,0.2)" }}>

          {/* Header */}
          <div style={{ background:"linear-gradient(135deg,#C8909A,#9B7BB8)", padding:"1.25rem 1.75rem", display:"flex", alignItems:"center", gap:"1rem" }}>
            <div style={{ width:"42px", height:"42px", borderRadius:"50%", overflow:"hidden", border:"2px solid rgba(255,255,255,0.3)", flexShrink:0 }}>
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80" alt="CYRA AI" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
            <div>
              <h4 style={{ color:"#fff", fontSize:"0.95rem", fontWeight:700, margin:0 }}>CYRA AI</h4>
              <p style={{ color:"rgba(255,255,255,0.72)", fontSize:"0.73rem", margin:0 }}>Your wellness companion</p>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#8EF5C8", boxShadow:"0 0 8px #8EF5C8" }} />
              <span style={{ color:"rgba(255,255,255,0.7)", fontSize:"0.72rem" }}>Online</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{ padding:"1.5rem", minHeight:"320px", maxHeight:"420px", overflowY:"auto", background:"#F5EDE6", display:"flex", flexDirection:"column", gap:"0.85rem" }}>
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div key={i}
                  initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }}
                  style={{ maxWidth:"82%", padding:"0.75rem 1.1rem", borderRadius:"18px", fontSize:"0.88rem", lineHeight:1.65, alignSelf:msg.role==="user"?"flex-end":"flex-start",
                    background:msg.role==="user"?"linear-gradient(135deg,#C8909A,#9B7BB8)":"#fff",
                    color:msg.role==="user"?"#fff":"#3D2840",
                    borderBottomRightRadius:msg.role==="user"?"5px":"18px",
                    borderBottomLeftRadius:msg.role==="bot"?"5px":"18px",
                    boxShadow:msg.role==="bot"?"0 2px 12px rgba(61,40,64,0.06)":"none" }}>
                  {msg.text}
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                  style={{ alignSelf:"flex-start", background:"#fff", borderRadius:"18px", borderBottomLeftRadius:"5px", padding:"0.75rem 1.1rem", boxShadow:"0 2px 12px rgba(61,40,64,0.06)", display:"flex", gap:"4px", alignItems:"center" }}>
                  {[0,1,2].map(i => (
                    <motion.div key={i} style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#C8909A" }}
                      animate={{ y:[0,-5,0] }} transition={{ duration:0.5, repeat:Infinity, delay:i*0.15 }} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding:"1rem 1.5rem", background:"#fff", borderTop:"1px solid rgba(232,160,156,0.18)", display:"flex", gap:"0.75rem", alignItems:"center" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter" && send()}
              placeholder="Ask me anything about your cycle, mood, or wellness..."
              style={{ flex:1, border:"1.5px solid rgba(232,160,156,0.3)", borderRadius:"50px", padding:"0.6rem 1rem", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.85rem", outline:"none", background:"#F5EDE6", color:"#3D2840", transition:"border-color 0.2s" }}
              onFocus={(e) => e.target.style.borderColor="#C8909A"}
              onBlur={(e) => e.target.style.borderColor="rgba(232,160,156,0.3)"} />
            <button onClick={send}
              style={{ background:"linear-gradient(135deg,#C8909A,#9B7BB8)", border:"none", width:"38px", height:"38px", borderRadius:"50%", cursor:"pointer", color:"#fff", fontSize:"1rem", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", boxShadow:"0 4px 12px rgba(155,123,184,0.3)" }}
              onMouseEnter={(e) => e.currentTarget.style.transform="scale(1.1)"}
              onMouseLeave={(e) => e.currentTarget.style.transform="scale(1)"}>
              ➤
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
