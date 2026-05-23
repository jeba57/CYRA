"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REMINDERS = [
  { icon:"🌸", title:"Check in with yourself", body:"How are you feeling today, lovely?" },
  { icon:"☁️", title:"Hydration reminder", body:"Have you had enough water today?" },
  { icon:"🧸", title:"Your body deserves care", body:"A small act of self-care goes a long way." },
];

export default function ReminderToast() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 120, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            position:       "fixed",
            bottom:         "2rem",
            right:          "2rem",
            background:     "rgba(255,255,255,0.96)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border:         "1px solid rgba(232,160,156,0.3)",
            borderRadius:   "20px",
            padding:        "1rem 1.4rem",
            boxShadow:      "0 20px 50px rgba(61,40,64,0.14)",
            maxWidth:       "280px",
            zIndex:         200,
            display:        "flex",
            gap:            "0.75rem",
            alignItems:     "flex-start",
          }}
        >
          <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{REMINDERS[current].icon}</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "0.83rem", color: "#3D2840", fontWeight: 700, marginBottom: "0.15rem" }}>
              {REMINDERS[current].title}
            </p>
            <span style={{ fontSize: "0.76rem", color: "#9B7B9E" }}>{REMINDERS[current].body}</span>
          </div>
          <button
            onClick={() => setVisible(false)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9B7B9E", fontSize: "1rem", flexShrink: 0, lineHeight: 1, padding: "0" }}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
