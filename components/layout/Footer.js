"use client";

import Link from "next/link";
import { useState } from "react";

const COLS = [
  { title: "Pages", links: [["My Cycle", "/my-cycle"], ["Today's Feelings", "/feelings"], ["Care Tips", "/care-tips"], ["Ask CYRA AI", "/ask-cyra"], ["For You & Your Body", "/for-you"], ["Health Diary", "/diary"]] },
  { title: "Company", links: [["About Us", "#"], ["Blog", "#"], ["Careers", "#"], ["Press", "#"]] },
  { title: "Support", links: [["Help Center", "#"], ["Privacy Policy", "#"], ["Terms", "#"], ["Contact", "#"]] },
];

function FooterLink({ label, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      style={{
        color: hovered ? "#fff" : "rgba(255,255,255,0.55)",
        textDecoration: "none",
        fontSize: "0.8rem",
        transition: "color 0.2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  );
}

function SocialIcon({ emoji }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "34px", height: "34px", borderRadius: "50%",
        background: hovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", fontSize: "0.9rem", transition: "all 0.2s",
      }}
    >
      {emoji}
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#3D2840", padding: "3.5rem 3rem 2rem", color: "rgba(255,255,255,0.7)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2rem", marginBottom: "2.5rem" }}>
        <div>
          <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.9rem", color: "#fff", fontWeight: 600, display: "block", marginBottom: "0.75rem" }}>
            C<span style={{ color: "#9B7BB8" }}>Y</span>RA
          </span>
          <p style={{ fontSize: "0.83rem", lineHeight: 1.75, opacity: 0.7, maxWidth: "220px" }}>
            A gentle digital space built for women — with softness, science, and care.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
            {["🌸", "☁️", "🌙"].map((e, i) => (
              <SocialIcon key={i} emoji={e} />
            ))}
          </div>
        </div>

        {COLS.map(({ title, links }) => (
          <div key={title}>
            <h5 style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 700, marginBottom: "1rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {title}
            </h5>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {links.map(([label, href]) => (
                <li key={label}>
                  <FooterLink label={label} href={href} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontSize: "0.77rem", opacity: 0.4 }}>© 2025 CYRA · Made with 🌸 for every woman</p>
        <p style={{ fontSize: "0.77rem", opacity: 0.4 }}>Designed with softness · Powered by care</p>
      </div>
    </footer>
  );
}