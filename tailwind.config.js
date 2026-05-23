/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush:    "#F7D6D0",
        cream:    "#FDF8F3",
        lavender: "#E8E0F5",
        peach:    "#FCDEC0",
        rose:     "#E8A4A0",
        dusty:    "#C8909A",
        "cyra-purple":  "#9B7BB8",
        warm:     "#F5EDE6",
        "text-dark": "#3D2840",
        "text-mid":  "#6B4E6E",
        "text-soft": "#9B7B9E",
      },
      fontFamily: {
        sans:  ["var(--font-nunito)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-mid":  "float 8s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "fade-up":    "fadeUp 0.8s ease both",
        "slide-in":   "slideIn 0.5s ease both",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(200,144,154,0.3)" },
          "50%":      { boxShadow: "0 0 40px rgba(155,123,184,0.5)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { transform: "translateX(120%)", opacity: "0" },
          to:   { transform: "translateX(0)",    opacity: "1" },
        },
      },
      boxShadow: {
        soft:   "0 8px 30px rgba(61,40,64,0.08)",
        medium: "0 16px 50px rgba(61,40,64,0.12)",
        heavy:  "0 24px 70px rgba(61,40,64,0.18)",
        glow:   "0 0 30px rgba(200,144,154,0.25)",
      },
      backgroundImage: {
        "hero-gradient":    "linear-gradient(135deg,#FDF8F3 0%,#FDE8E0 45%,#EDE0F5 100%)",
        "auth-gradient":    "linear-gradient(135deg,#3D2840,#6B3A7A,#9B7BB8)",
        "dusty-to-purple":  "linear-gradient(135deg,#C8909A,#9B7BB8)",
        "rose-to-dusty":    "linear-gradient(135deg,#E8A4A0,#C8909A)",
        "peach-to-rose":    "linear-gradient(135deg,#FCDEC0,#E8A4A0)",
      },
    },
  },
  plugins: [],
};
