"use client";

// components/diary/DiaryGrid.js
import { motion } from "framer-motion";
import { useDiary } from "../../hooks/useDiary";

function formatSize(bytes) {
  if (!bytes) return "—";
  if (bytes < 1024)        return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
}

export default function DiaryGrid() {
  const { files, grouped, loading, uploading, deleteFile, CATEGORY_META } = useDiary();

  if (loading) {
    return (
      <section style={{ padding:"2rem 1.5rem 5rem", background:"#FDF8F3" }}>
        <div style={{ maxWidth:"860px", margin:"0 auto", textAlign:"center", color:"#9B7B9E", fontSize:"0.88rem" }}>
          Loading your health diary...
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding:"2rem 1.5rem 5rem", background:"#FDF8F3" }}>
      <div style={{ maxWidth:"860px", margin:"0 auto" }}>

        {/* Category summary */}
        <div style={{ marginBottom:"2.5rem" }}>
          <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#C8909A", marginBottom:"1rem" }}>📁 Categories</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"1rem" }}>
            {Object.entries(CATEGORY_META).map(([key, { icon, label }]) => {
              const count = grouped[key]?.length || 0;
              return (
                <motion.div key={key}
                  initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4 }}
                  style={{ background:"#fff", borderRadius:"18px", padding:"1.25rem", border:"1px solid rgba(232,160,156,0.15)", cursor:"pointer", transition:"all 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(61,40,64,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                  <div style={{ fontSize:"1.5rem", marginBottom:"0.65rem" }}>{icon}</div>
                  <div style={{ fontSize:"0.85rem", fontWeight:700, color:"#3D2840", marginBottom:"0.2rem" }}>{label}</div>
                  <div style={{ fontSize:"0.75rem", color:count>0?"#C8909A":"#9B7B9E", fontWeight: count>0?700:400 }}>
                    {count > 0 ? `${count} file${count>1?"s":""}` : "No files yet"}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recent files */}
        {files.length > 0 ? (
          <div>
            <p style={{ fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#C8909A", marginBottom:"1rem" }}>🕐 All Files</p>
            <div style={{ background:"#fff", borderRadius:"20px", overflow:"hidden", border:"1px solid rgba(232,160,156,0.15)", boxShadow:"0 4px 20px rgba(61,40,64,0.06)" }}>
              {files.map((file, i) => {
                const meta = CATEGORY_META[file.category] || { icon:"📄", label: file.category };
                return (
                  <motion.div key={file.id}
                    initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay:i*0.05 }}
                    style={{ display:"flex", alignItems:"center", gap:"1rem", padding:"1rem 1.5rem", borderBottom: i<files.length-1 ? "1px solid rgba(232,160,156,0.1)" : "none", transition:"background 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.background="#F5EDE6"}
                    onMouseLeave={(e) => e.currentTarget.style.background="transparent"}>

                    <span style={{ fontSize:"1.4rem", flexShrink:0 }}>{meta.icon}</span>

                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontSize:"0.87rem", fontWeight:600, color:"#3D2840", marginBottom:"0.15rem", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {file.name}
                      </p>
                      <p style={{ fontSize:"0.72rem", color:"#9B7B9E" }}>
                        {meta.label} · {formatDate(file.uploadedAt)} · {formatSize(file.fileSize)}
                      </p>
                      {file.notes && <p style={{ fontSize:"0.72rem", color:"#9B7B9E", fontStyle:"italic" }}>{file.notes}</p>}
                    </div>

                    <div style={{ display:"flex", gap:"0.5rem", flexShrink:0 }}>
                      <a href={file.fileUrl} target="_blank" rel="noreferrer">
                        <button style={{ background:"transparent", border:"1px solid rgba(200,144,154,0.3)", color:"#C8909A", padding:"0.3rem 0.85rem", borderRadius:"50px", fontSize:"0.72rem", fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.background="#F7D6D0"}
                          onMouseLeave={(e) => e.currentTarget.style.background="transparent"}>
                          View
                        </button>
                      </a>
                      <button onClick={() => deleteFile(file.id)}
                        style={{ background:"transparent", border:"1px solid rgba(196,69,105,0.2)", color:"#C44569", padding:"0.3rem 0.7rem", borderRadius:"50px", fontSize:"0.72rem", fontWeight:600, cursor:"pointer", transition:"all 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background="rgba(196,69,105,0.06)"}
                        onMouseLeave={(e) => e.currentTarget.style.background="transparent"}>
                        ✕
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"3rem", background:"#fff", borderRadius:"20px", border:"1px solid rgba(232,160,156,0.15)" }}>
            <div style={{ fontSize:"2.5rem", marginBottom:"1rem" }}>📂</div>
            <p style={{ fontFamily:"var(--font-cormorant),serif", fontSize:"1.3rem", color:"#3D2840", marginBottom:"0.5rem" }}>No documents yet</p>
            <p style={{ fontSize:"0.85rem", color:"#9B7B9E" }}>Upload your first health document above to get started.</p>
          </div>
        )}
      </div>
    </section>
  );
}