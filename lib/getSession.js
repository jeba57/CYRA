// lib/getSession.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { NextResponse } from "next/server";

/**
 * Get session in an API route.
 * Returns { session, userId } or a 401 NextResponse if not authenticated.
 */
export async function requireAuth(req) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      error: NextResponse.json(
        { error: "Unauthorised. Please log in." },
        { status: 401 }
      ),
    };
  }

  return { session, userId: session.user.id };
}