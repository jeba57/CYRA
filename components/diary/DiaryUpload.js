"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function DiaryUpload() {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    setUploaded(true);
    setTimeout(() => setUploaded(false), 3000);
  }

  return (
    <section style={{ padding:"3rem 4rem", background:"#fff" }}>
      <div style={{ maxWidth:"640px", margin:"0 auto" }}>
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragging ? "#C8909A" : "rgba(200,144,154,0.35)"}`,
            borderRadius: "24px",
            padding: "3rem 2rem",
            textAlign: "center",
            background: dragging ? "rgba(200,144,154,0.06)" : uploaded ? "rgba(92,174,140,0.06)" : "rgba(245,237,230,0.5)",
            cursor: "pointer",
            transition: "all 0.3s",
          }}>
          <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>{uploaded ? "✅" : "📂"}</div>
          <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.4rem", fontWeight:400, color:"#3D2840", marginBottom:"0.5rem" }}>
            {uploaded ? "Document uploaded!" : "Drop your document here"}
          </h3>
          <p style={{ fontSize:"0.85rem", color:"#9B7B9E", marginBottom:"1.5rem" }}>
            {uploaded ? "Your file has been saved securely 🌸" : "PDF, JPG, PNG — prescriptions, reports, or doctor notes"}
          </p>
          {!uploaded && (
            <button style={{ background:"linear-gradient(135deg,#C8909A,#9B7BB8)", color:"#fff", border:"none", padding:"0.7rem 1.75rem", borderRadius:"50px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.88rem", fontWeight:700, cursor:"pointer", transition:"all 0.3s", boxShadow:"0 4px 16px rgba(155,123,184,0.3)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; }}>
              Browse files
            </button>
          )}
          <p style={{ fontSize:"0.72rem", color:"#9B7B9E", marginTop:"1rem" }}>🔒 End-to-end encrypted · Never shared · Always private</p>
        </motion.div>
      </div>
    </section>
  );
}
