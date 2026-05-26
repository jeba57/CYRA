import { NextResponse } from "next/server";

export async function POST(req) {
  const { messages } = await req.json();
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:"You are CYRA, a warm AI wellness companion for women specialising in menstrual health, PCOS, and emotional wellness. Be gentle, warm, concise.", messages }),
  });
  const data = await res.json();
  return NextResponse.json({ reply: data.content?.[0]?.text || "I'm here for you 💕" });
}