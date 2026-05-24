"use client";

// components/diary/DiaryUpload.js
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useDiary } from "../../hooks/useDiary";

const CATEGORIES = [
  { value:"prescription",   label:"Prescription",   icon:"💊" },
  { value:"blood_report",   label:"Blood Report",   icon:"🩸" },
  { value:"ultrasound",     label:"Ultrasound",     icon:"🔬" },
  { value:"doctor_notes",   label:"Doctor Notes",   icon:"🩺" },
  { value:"lab_test",       label:"Lab Test",       icon:"📋" },
  { value:"medicine_photo", label:"Medicine Photo", icon:"📷" },
];

export default function DiaryUpload() {
  const { uploadFile, uploading } = useDiary();
  const fileInputRef = useRef(null);

  const [dragging,  setDragging]  = useState(false);
  const [category,  setCategory]  = useState("prescription");
  const [notes,     setNotes]     = useState("");
  const [success,   setSuccess]   = useState(false);
  const [error,     setError]     = useState("");

  async function handleFile(file) {
    if (!file) return;
    setError("");
    try {
      await uploadFile(file, category, notes || null);
      setSuccess(true);
      setNotes("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleInputChange(e) {
    const file = e.target.files[0];
    if (file) handleFile(file);
  }

  return (
    <section style={{ padding:"3rem 1.5rem", background:"#fff" }}>
      <div style={{ maxWidth:"640px", margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>

          {/* Category selector */}
          <div style={{ marginBottom:"1.25rem" }}>
            <label style={{ display:"block", fontSize:"0.8rem", fontWeight:700, color:"#6B4E6E", marginBottom:"0.65rem", letterSpacing:"0.04em" }}>
              Document type
            </label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
              {CATEGORIES.map(cat => (
                <button key={cat.value} onClick={() => setCategory(cat.value)}
                  style={{ display:"flex", alignItems:"center", gap:"0.4rem", padding:"0.45rem 0.9rem", borderRadius:"50px", border:"none", cursor:"pointer", transition:"all 0.2s", fontSize:"0.8rem", fontWeight:600,
                    background: category===cat.value ? "linear-gradient(135deg,#C8909A,#9B7BB8)" : "#F5EDE6",
                    color:      category===cat.value ? "#fff" : "#6B4E6E",
                  }}>
                  <span>{cat.icon}</span>{cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragging ? "#C8909A" : success ? "#5CAE8C" : "rgba(200,144,154,0.35)"}`,
              borderRadius: "24px",
              padding: "3rem 2rem",
              textAlign: "center",
              background: dragging ? "rgba(200,144,154,0.06)" : success ? "rgba(92,174,140,0.06)" : "rgba(245,237,230,0.5)",
              cursor: uploading ? "not-allowed" : "pointer",
              transition: "all 0.3s",
            }}
          >
            <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,.heic" onChange={handleInputChange} style={{ display:"none" }} />
            <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>
              {uploading ? "⏳" : success ? "✅" : "📂"}
            </div>
            <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.4rem", fontWeight:400, color:"#3D2840", marginBottom:"0.5rem" }}>
              {uploading ? "Uploading..." : success ? "Document uploaded!" : "Drop your document here"}
            </h3>
            <p style={{ fontSize:"0.85rem", color:"#9B7B9E", marginBottom: success ? 0 : "1.5rem" }}>
              {success ? "Your file has been saved securely 🌸" : "PDF, JPG, PNG — up to 10MB"}
            </p>
            {!uploading && !success && (
              <button style={{ background:"linear-gradient(135deg,#C8909A,#9B7BB8)", color:"#fff", border:"none", padding:"0.7rem 1.75rem", borderRadius:"50px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.88rem", fontWeight:700, cursor:"pointer", boxShadow:"0 4px 16px rgba(155,123,184,0.3)" }}>
                Browse files
              </button>
            )}
            <p style={{ fontSize:"0.72rem", color:"#9B7B9E", marginTop:"1rem" }}>🔒 End-to-end encrypted · Never shared · Always private</p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ marginTop:"0.75rem", background:"rgba(196,69,105,0.08)", border:"1px solid rgba(196,69,105,0.2)", borderRadius:"12px", padding:"0.75rem 1rem", fontSize:"0.82rem", color:"#C44569" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Notes */}
          {!success && (
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Optional notes about this document..."
              rows={2}
              style={{ width:"100%", marginTop:"1rem", border:"1.5px solid rgba(232,160,156,0.3)", borderRadius:"14px", padding:"0.85rem 1rem", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.85rem", color:"#3D2840", resize:"none", outline:"none", background:"#F5EDE6", transition:"border-color 0.2s" }}
              onFocus={(e) => e.target.style.borderColor="#C8909A"}
              onBlur={(e)  => e.target.style.borderColor="rgba(232,160,156,0.3)"}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}