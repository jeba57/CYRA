"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CYRA_SYSTEM = `You are CYRA, a warm and emotionally intelligent AI wellness companion for women. You specialise in:
- Menstrual cycle health and period tracking
- PCOS awareness and management  
- Hormonal wellness and mood patterns
- Phase-aware self-care (menstruation, follicular, ovulation, luteal)
- Indian and global wellness traditions
- Emotional support without judgment

Tone: warm, gentle, caring, like a knowledgeable friend. Never clinical or cold. Use soft language. Occasionally use gentle emojis like 🌸 💕 ☁️ 🌙 🌿. Keep responses concise (2-4 sentences unless more detail is genuinely needed). Never give medical diagnoses. Always suggest seeing a doctor for serious symptoms.`;

export default function ChatInterface() {
  const [messages,  setMessages]  = useState([
    { id:"0", role:"assistant", content:"Hey lovely 🌸 I'm CYRA. I'm here for you. How are you feeling today?" }
  ]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const bottomRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { id: Date.now().toString(), role:"user", content:text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      // Build messages for the API — exclude the welcome message from history
      const history = [...messages.slice(1), userMsg].map(m => ({
        role:    m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      }));

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model:      "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system:     CYRA_SYSTEM,
          messages:   history,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Something went wrong");
      }

      const reply = data.content?.[0]?.text || "I'm here for you 💕 Please try asking again.";
      setMessages(prev => [...prev, { id:(Date.now()+1).toString(), role:"assistant", content:reply }]);
    } catch (err) {
      setError("Having trouble connecting right now 💕 Please try again in a moment.");
      setMessages(prev => [...prev, {
        id:      (Date.now()+1).toString(),
        role:    "assistant",
        content: "I'm having a little trouble connecting right now 💕 Please try again in a moment. I'm always here for you.",
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ padding:"4rem 1.5rem", background:"#FDF8F3", position:"relative" }}>

      {/* Ambient glow */}
      <motion.div style={{ position:"absolute", top:"-100px", right:"-100px", width:"350px", height:"350px", borderRadius:"50%", background:"radial-gradient(circle,rgba(232,224,245,0.4),transparent 70%)", pointerEvents:"none" }} animate={{ scale:[1,1.06,1] }} transition={{ duration:9, repeat:Infinity }} />

      <div style={{ maxWidth:"760px", margin:"0 auto", position:"relative", zIndex:1 }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          style={{ borderRadius:"28px", overflow:"hidden", boxShadow:"0 24px 60px rgba(61,40,64,0.12)", border:"1px solid rgba(232,160,156,0.2)" }}>

          {/* Header */}
          <div style={{ background:"linear-gradient(135deg,#C8909A,#9B7BB8)", padding:"1.25rem 1.75rem", display:"flex", alignItems:"center", gap:"1rem" }}>
            <div style={{ width:"42px", height:"42px", borderRadius:"50%", overflow:"hidden", border:"2px solid rgba(255,255,255,0.3)", flexShrink:0 }}>
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&q=80" alt="CYRA AI" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
            <div>
              <h4 style={{ color:"#fff", fontSize:"0.95rem", fontWeight:700, margin:0 }}>CYRA AI</h4>
              <p style={{ color:"rgba(255,255,255,0.72)", fontSize:"0.73rem", margin:0 }}>Your wellness companion · Powered by Claude</p>
            </div>
            <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <motion.div
                animate={{ opacity:[1,0.4,1] }}
                transition={{ duration:2, repeat:Infinity }}
                style={{ width:"7px", height:"7px", borderRadius:"50%", background:loading?"#FCD34D":"#8EF5C8", boxShadow:loading?"0 0 8px #FCD34D":"0 0 8px #8EF5C8" }}
              />
              <span style={{ color:"rgba(255,255,255,0.7)", fontSize:"0.72rem" }}>{loading?"Thinking...":"Online"}</span>
            </div>
          </div>

          {/* Messages */}
          <div style={{ padding:"1.5rem", minHeight:"340px", maxHeight:"440px", overflowY:"auto", background:"#F5EDE6", display:"flex", flexDirection:"column", gap:"0.85rem" }}>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div key={msg.id}
                  initial={{ opacity:0, y:8, scale:0.97 }}
                  animate={{ opacity:1, y:0, scale:1 }}
                  transition={{ duration:0.28, ease:"easeOut" }}
                  style={{
                    maxWidth:"84%",
                    padding:"0.8rem 1.1rem",
                    borderRadius:"18px",
                    fontSize:"0.88rem",
                    lineHeight:1.68,
                    alignSelf:  msg.role==="user"     ? "flex-end"  : "flex-start",
                    background: msg.role==="user"     ? "linear-gradient(135deg,#C8909A,#9B7BB8)" : "#fff",
                    color:      msg.role==="user"     ? "#fff"      : "#3D2840",
                    borderBottomRightRadius: msg.role==="user"      ? "5px"  : "18px",
                    borderBottomLeftRadius:  msg.role==="assistant" ? "5px"  : "18px",
                    boxShadow:  msg.role==="assistant" ? "0 2px 12px rgba(61,40,64,0.07)" : "none",
                    whiteSpace: "pre-wrap",
                  }}>
                  {msg.content}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div key="typing"
                  initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                  style={{ alignSelf:"flex-start", background:"#fff", borderRadius:"18px", borderBottomLeftRadius:"5px", padding:"0.8rem 1.1rem", boxShadow:"0 2px 12px rgba(61,40,64,0.07)", display:"flex", gap:"5px", alignItems:"center" }}>
                  {[0,1,2].map(i => (
                    <motion.div key={i} style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#C8909A" }}
                      animate={{ y:[0,-5,0] }} transition={{ duration:0.55, repeat:Infinity, delay:i*0.15 }} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div style={{ padding:"0.75rem 1.5rem", background:"rgba(245,237,230,0.5)", borderTop:"1px solid rgba(232,160,156,0.12)", display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
            {["Why am I so tired?","Help with cramps 🩸","What phase am I in?","PCOS tips 🌿"].map(prompt => (
              <button key={prompt} onClick={() => { setInput(prompt); }}
                style={{ padding:"0.28rem 0.75rem", borderRadius:"50px", border:"1px solid rgba(200,144,154,0.25)", background:"#fff", color:"#6B4E6E", fontSize:"0.72rem", fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background="#F7D6D0"; e.currentTarget.style.borderColor="#C8909A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background="#fff"; e.currentTarget.style.borderColor="rgba(200,144,154,0.25)"; }}>
                {prompt}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding:"1rem 1.5rem", background:"#fff", borderTop:"1px solid rgba(232,160,156,0.15)", display:"flex", gap:"0.75rem", alignItems:"center" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==="Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask me anything about your cycle, mood, or wellness..."
              disabled={loading}
              style={{ flex:1, border:"1.5px solid rgba(232,160,156,0.3)", borderRadius:"50px", padding:"0.65rem 1rem", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.85rem", outline:"none", background: loading?"#F5EDE6":"#F5EDE6", color:"#3D2840", transition:"border-color 0.2s", opacity:loading?0.6:1 }}
              onFocus={(e) => e.target.style.borderColor="#C8909A"}
              onBlur={(e)  => e.target.style.borderColor="rgba(232,160,156,0.3)"}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}
              style={{ background: loading||!input.trim() ? "rgba(200,144,154,0.3)" : "linear-gradient(135deg,#C8909A,#9B7BB8)", border:"none", width:"40px", height:"40px", borderRadius:"50%", cursor: loading||!input.trim() ? "not-allowed" : "pointer", color:"#fff", fontSize:"1rem", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s", boxShadow: loading ? "none" : "0 4px 12px rgba(155,123,184,0.3)" }}
              onMouseEnter={(e) => { if(!loading && input.trim()) e.currentTarget.style.transform="scale(1.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="scale(1)"; }}>
              ➤
            </button>
          </div>
        </motion.div>

        {/* Privacy note */}
        <p style={{ textAlign:"center", fontSize:"0.72rem", color:"#9B7B9E", marginTop:"0.85rem" }}>
          🔒 Your conversations are private · Powered by Anthropic Claude
        </p>
      </div>
    </section>
  );
}