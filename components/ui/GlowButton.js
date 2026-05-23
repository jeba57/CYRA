"use client";

import { useState } from "react";
import Link from "next/link";

export function GlowButton({ href, onClick, children, variant = "primary", style = {} }) {
  const [hovered, setHovered] = useState(false);

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.4rem",
    padding: "0.6rem 1.4rem",
    borderRadius: "50px",
    fontFamily: "var(--font-nunito), sans-serif",
    fontSize: "0.85rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
    textDecoration: "none",
    border: "none",
  };

  const variants = {
    primary: {
      background: "linear-gradient(135deg,#C8909A,#9B7BB8)",
      color: "#fff",
      boxShadow: hovered ? "0 8px 28px rgba(155,123,184,0.45)" : "0 4px 18px rgba(155,123,184,0.32)",
      transform: hovered ? "translateY(-2px)" : "translateY(0)",
    },
    secondary: {
      background: hovered ? "#F7D6D0" : "transparent",
      color: "#C8909A",
      border: "1.5px solid #E8A4A0",
      transform: hovered ? "translateY(-1px)" : "translateY(0)",
    },
    ghost: {
      background: hovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.12)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.25)",
    },
  };

  const combined = { ...base, ...variants[variant], ...style };

  // Wrap Link in a span that handles hover state — never put handlers on <Link> directly
  if (href) {
    return (
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "inline-block" }}
      >
        <Link href={href} style={combined}>
          {children}
        </Link>
      </span>
    );
  }

  return (
    <button
      style={combined}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}