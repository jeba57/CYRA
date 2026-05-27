"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useDiary, CATEGORY_META } from "../../hooks/useDiary";

const CATEGORIES = Object.entries(CATEGORY_META).map(([value, { icon, label }]) => ({ value, icon, label }));

export default function DiaryUpload() {
  const { uploadFile, uploading } = useDiary();
  const fileInputRef = useRef(null);

  const [dragging, setDragging] = useState(false);
  const [category, setCategory] = useState("prescription");
  const [notes,    setNotes]    = useState("");
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState("");

  async function handleFile(file) {
    if (!file) return;
    setError("");

    // Validate type
    const allowed = ["application/pdf","image/jpeg","image/jpg","image/png","image/webp","image/heic","image/heif"];
    if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|jpg|jpeg|png|webp|heic|heif)$/i)) {
      setError("Only PDF, JPG, PNG, and WEBP files are supported.");
      return;
    }

    // Size limit for localStorage
    if (file.size > 2 * 1024 * 1024) {
      setError("File is too large. Please use files under 2MB for local storage.");
      return;
    }

    try {
      await uploadFile(file, category, notes || null);
      setSuccess(true);
      setNotes("");
      fileInputRef.current.value = "";
      setTimeout(() => setSuccess(false), 3000);
    } catch(err) {
      setError(err.message || "Upload failed. Please try again.");
    }
  }

  return (
    <section style={{ padding:"3rem 1.5rem", background:"#fff" }}>
      <div style={{ maxWidth:"640px", margin:"0 auto" }}>
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}>

          {/* Category */}
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
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
            onClick={() => !uploading && fileInputRef.current?.click()}
            style={{
              border:       `2px dashed ${dragging?"#C8909A":success?"#5CAE8C":"rgba(200,144,154,0.35)"}`,
              borderRadius: "24px",
              padding:      "2.5rem 2rem",
              textAlign:    "center",
              background:   dragging?"rgba(200,144,154,0.06)":success?"rgba(92,174,140,0.06)":"rgba(245,237,230,0.5)",
              cursor:       uploading?"not-allowed":"pointer",
              transition:   "all 0.3s",
            }}>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif"
              onChange={(e) => handleFile(e.target.files[0])}
              style={{ display:"none" }}
            />
            <div style={{ fontSize:"2.2rem", marginBottom:"0.85rem" }}>
              {uploading ? "⏳" : success ? "✅" : "📂"}
            </div>
            <h3 style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.3rem", fontWeight:400, color:"#3D2840", marginBottom:"0.4rem" }}>
              {uploading ? "Saving..." : success ? "Saved!" : "Drop or tap to upload"}
            </h3>
            <p style={{ fontSize:"0.82rem", color:"#9B7B9E", marginBottom:success?"0":"1.25rem" }}>
              {success ? "Your document has been saved 🌸" : "PDF, JPG, PNG, WEBP — max 2MB"}
            </p>
            {!uploading && !success && (
              <button style={{ background:"linear-gradient(135deg,#C8909A,#9B7BB8)", color:"#fff", border:"none", padding:"0.65rem 1.6rem", borderRadius:"50px", fontFamily:"var(--font-nunito),sans-serif", fontSize:"0.85rem", fontWeight:700, cursor:"pointer", boxShadow:"0 4px 16px rgba(155,123,184,0.28)" }}>
                Browse files
              </button>
            )}
            <p style={{ fontSize:"0.7rem", color:"#9B7B9E", marginTop:"0.85rem" }}>🔒 Stored locally on your device · Never shared</p>
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
              placeholder="Optional notes (e.g. Dr. Sharma visit, May 2025)..."
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