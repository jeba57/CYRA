"use client";

import { motion } from "framer-motion";

export default function CycleHero() {
  return (
    <section
      style={{
        padding: "5rem 4rem 7rem",
        background:
"radial-gradient(circle at top left, rgba(255,255,255,0.75), transparent 40%), linear-gradient(135deg,#FDF8F3,#F8E5E7,#EDE0F5)",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* SOFT GLOW */}

      <motion.div
        style={{
          position: "absolute",
          top: "-180px",
          right: "-180px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(232,224,245,0.55),transparent 70%)",
          pointerEvents: "none",
        }}

        animate={{
          scale: [1, 1.05, 1],
        }}

        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      {/* CONTENT */}

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >

        {/* TAG */}

        <motion.div

          initial={{
            opacity: 0,
            y: 12,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.5,
          }}

          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",

            background:
              "rgba(255,255,255,0.42)",

            backdropFilter: "blur(12px)",

            border:
              "1px solid rgba(255,255,255,0.6)",

            borderRadius: "999px",

            padding: "0.45rem 1rem",

            fontSize: "0.76rem",

            fontWeight: 700,

            letterSpacing: "0.06em",

            color: "#C8909A",

            marginBottom: "1rem",
          }}
        >
          🌙 MY CYCLE
        </motion.div>

        {/* SMALL TITLE */}

        <motion.h1

          initial={{
            opacity: 0,
            y: 16,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.6,
            delay: 0.1,
          }}

          style={{
            fontFamily:
              "var(--font-cormorant),serif",

            fontSize:
              "clamp(1.8rem,3vw,2.5rem)",

            fontWeight: 400,

            lineHeight: 1.2,

            color: "#3D2840",

            marginBottom: "0.8rem",
          }}
        >
          Track your cycle gently.
        </motion.h1>

        {/* SMALL DESCRIPTION */}

        <motion.p

          initial={{
            opacity: 0,
            y: 16,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.6,
            delay: 0.2,
          }}

          style={{
            fontSize: "0.92rem",

            color: "#6B4E6E",

            lineHeight: 1.7,

            maxWidth: "500px",
          }}
        >
          Understand your rhythm,
          period days, fertile window,
          and ovulation in one calm space.
        </motion.p>

      </div>
    </section>
  );
}