"use client";

// components/layout/SessionProvider.js
// Wrap your entire app with this so useSession() works in every component

import { SessionProvider } from "next-auth/react";

export function AuthSessionProvider({ children, session }) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}