"use client";

import { useEffect } from "react";

export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    let lenis;

    const init = async () => {
      try {
        const LenisModule = await import("@studio-freight/lenis");
        const Lenis = LenisModule.default || LenisModule.Lenis;
        if (!Lenis) return;

        lenis = new Lenis({
          duration: 0.8,          // was 1.4 — much snappier now
          easing: (t) => t,       // linear = 1:1 with mouse wheel
          smoothWheel: true,
          wheelMultiplier: 1.2,   // natural feel
          touchMultiplier: 1.5,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (err) {
        // Lenis not available — native scroll used instead
      }
    };

    init();
    return () => { if (lenis) lenis.destroy(); };
  }, []);

  return <>{children}</>;
}