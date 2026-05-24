// app/layout.js
import { Nunito, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "../components/layout/SmoothScrollProvider";
import { AuthSessionProvider } from "../components/layout/SessionProvider";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "CYRA — Hormonal Wellness for Women",
  description: "Track your cycle, understand your feelings, and care for yourself gently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${cormorant.variable}`}>
      <body style={{ fontFamily: "var(--font-nunito), sans-serif" }}>
        {/* AuthSessionProvider makes useSession() work everywhere */}
        <AuthSessionProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}