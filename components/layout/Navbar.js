"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "My Cycle",        href: "/my-cycle"  },
  { label: "Today's Feelings",href: "/feelings"  },
  { label: "CYRA AI",     href: "/ask-cyra"  },
  { label: "For You & Your Body", href: "/for-you" },
  { label: "Health Diary",    href: "/diary"     },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position:             "fixed",
        top: 0, left: 0, right: 0,
        zIndex:               100,
        height:               "64px",
        display:              "flex",
        alignItems:           "center",
        padding:              "0 1.5rem",
        backdropFilter:       "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background:           scrolled ? "rgba(253,248,243,0.97)" : "rgba(253,248,243,0.88)",
        borderBottom:         "1px solid rgba(232,160,156,0.15)",
        boxShadow:            scrolled ? "0 4px 30px rgba(61,40,64,0.08)" : "none",
        transition:           "all 0.35s ease",
        gap:                  "1.5rem",
      }}
    >
      {/* Admin icon — left side */}
      <Link href="/admin" title="Admin Panel">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
          style={{
            width:          "34px",
            height:         "34px",
            borderRadius:   "10px",
            background:     pathname === "/admin"
              ? "linear-gradient(135deg,#C8909A,#9B7BB8)"
              : "rgba(200,144,154,0.12)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            fontSize:       "1rem",
            cursor:         "pointer",
            flexShrink:     0,
            border:         pathname === "/admin" ? "none" : "1px solid rgba(200,144,154,0.25)",
            transition:     "all 0.25s",
          }}
        >
          ⚙️
        </motion.div>
      </Link>

      {/* Logo — center anchor */}
      <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
        <motion.span
          whileHover={{ scale: 1.02 }}
          style={{
            fontFamily:    "var(--font-cormorant), serif",
            fontSize:      "1.8rem",
            fontWeight:    600,
            color:         "#C8909A",
            letterSpacing: "0.04em",
            cursor:        "pointer",
            userSelect:    "none",
          }}
        >
          C<span style={{ color: "#9B7BB8" }}>Y</span>RA
        </motion.span>
      </Link>

      {/* Desktop nav links */}
      <div
        style={{
          flex:       1,
          display:    "flex",
          alignItems: "center",
          justifyContent: "center",
          gap:        "0.15rem",
        }}
        className="hidden lg:flex"
      >
        {NAV_LINKS.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <NavLink key={href} href={href} active={active}>
              {label}
            </NavLink>
          );
        })}
      </div>

      {/* Auth buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginLeft: "auto", flexShrink: 0 }}
        className="hidden lg:flex"
      >
        <Link href="/login">
          <button style={{
            background:   "transparent",
            border:       "1.5px solid #E8A4A0",
            color:        "#C8909A",
            padding:      "0.4rem 1rem",
            borderRadius: "50px",
            fontFamily:   "var(--font-nunito), sans-serif",
            fontSize:     "0.82rem",
            fontWeight:   600,
            cursor:       "pointer",
            transition:   "all 0.25s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#F7D6D0"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button style={{
            background:   "linear-gradient(135deg,#C8909A,#9B7BB8)",
            color:        "#fff",
            border:       "none",
            padding:      "0.45rem 1.1rem",
            borderRadius: "50px",
            fontFamily:   "var(--font-nunito), sans-serif",
            fontSize:     "0.82rem",
            fontWeight:   700,
            cursor:       "pointer",
            transition:   "all 0.3s",
            boxShadow:    "0 4px 14px rgba(155,123,184,0.3)",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 22px rgba(155,123,184,0.42)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(155,123,184,0.3)"; }}
          >
            Get Started ✦
          </button>
        </Link>
      </div>

      {/* Hamburger */}
      <button
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(v => !v)}
        style={{
          marginLeft:    "auto",
          display:       "flex",
          flexDirection: "column",
          gap:           "5px",
          background:    "none",
          border:        "none",
          cursor:        "pointer",
          padding:       "4px",
        }}
        className="flex lg:hidden"
      >
        {[0,1,2].map(i => (
          <HamBar key={i} open={menuOpen} index={i} />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              position:             "absolute",
              top:                  "72px",
              left:                 "1rem",
              right:                "1rem",
              background:           "rgba(253,248,243,0.98)",
              backdropFilter:       "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border:               "1px solid rgba(232,160,156,0.2)",
              borderRadius:         "20px",
              padding:              "1.25rem",
              boxShadow:            "0 20px 50px rgba(61,40,64,0.12)",
              display:              "flex",
              flexDirection:        "column",
              gap:                  "0.2rem",
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} style={{ textDecoration: "none" }}>
                <div style={{
                  padding:      "0.65rem 0.9rem",
                  borderRadius: "12px",
                  color:        pathname === href ? "#C8909A" : "#6B4E6E",
                  background:   pathname === href ? "rgba(200,144,154,0.1)" : "transparent",
                  fontWeight:   pathname === href ? 700 : 500,
                  fontSize:     "0.9rem",
                  transition:   "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#F7D6D0"; e.currentTarget.style.color = "#C8909A"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = pathname === href ? "rgba(200,144,154,0.1)" : "transparent"; e.currentTarget.style.color = pathname === href ? "#C8909A" : "#6B4E6E"; }}
                >
                  {label}
                </div>
              </Link>
            ))}
            <div style={{ height: "1px", background: "rgba(232,160,156,0.2)", margin: "0.5rem 0" }} />
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Link href="/login" style={{ flex: 1 }}>
                <button style={{ width: "100%", background: "transparent", border: "1.5px solid #E8A4A0", color: "#C8909A", padding: "0.6rem", borderRadius: "50px", fontFamily: "var(--font-nunito), sans-serif", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>Login</button>
              </Link>
              <Link href="/signup" style={{ flex: 1 }}>
                <button style={{ width: "100%", background: "linear-gradient(135deg,#C8909A,#9B7BB8)", color: "#fff", border: "none", padding: "0.6rem", borderRadius: "50px", fontFamily: "var(--font-nunito), sans-serif", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}>Get Started ✦</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ href, active, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    // Wrap in span so hover handlers are never on <Link> directly
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", display: "inline-block" }}
    >
      <Link
        href={href}
        style={{
          textDecoration: "none",
          color:          active ? "#C8909A" : hovered ? "#C8909A" : "#6B4E6E",
          fontSize:       "0.8rem",
          fontWeight:     active ? 700 : 500,
          padding:        "0.4rem 0.6rem",
          borderRadius:   "8px",
          background:     active ? "rgba(200,144,154,0.1)" : hovered ? "rgba(200,144,154,0.06)" : "transparent",
          transition:     "all 0.22s",
          whiteSpace:     "nowrap",
          display:        "inline-block",
        }}
      >
        {children}
        {active && (
          <motion.span
            layoutId="nav-dot"
            style={{
              position:  "absolute",
              bottom:    "2px",
              left:      "50%",
              transform: "translateX(-50%)",
              width:     "4px",
              height:    "4px",
              borderRadius: "50%",
              background: "#C8909A",
            }}
          />
        )}
      </Link>
    </span>
  );
}

function HamBar({ open, index }) {
  const styles = {
    0: { transform: open ? "rotate(45deg) translate(5px,5px)" : "none", width: "22px" },
    1: { transform: open ? "scaleX(0)" : "scaleX(1)", width: "16px", opacity: open ? 0 : 1 },
    2: { transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none", width: "22px" },
  };
  return (
    <span style={{
      display: "block", height: "2px", background: "#C8909A",
      borderRadius: "2px", transition: "all 0.3s ease",
      transformOrigin: "center", ...styles[index],
    }} />
  );
}