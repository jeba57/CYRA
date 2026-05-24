"use client";

import { useEffect } from "react";

export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    // Native smooth scroll is always buttery — no JS overhead
    document.documentElement.style.scrollBehavior = "smooth";

    // Remove any previously set Lenis styles that cause lag
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return <>{children}</>;
}