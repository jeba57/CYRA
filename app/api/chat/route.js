// app/api/chat/route.js
// Using Google Gemini API - FREE, no credit card needed
// Get key: https://aistudio.google.com -> Get API Key

import { NextResponse } from "next/server";

const CYRA_SYSTEM = `You are CYRA, a warm and emotionally intelligent AI wellness companion for women. You specialise in menstrual cycle health, PCOS, hormonal wellness, and emotional support.

Tone: warm, gentle, caring — like a knowledgeable best friend. Never clinical or cold.
- Keep responses to 2-4 sentences unless more detail is genuinely needed
- Use soft emojis occasionally: 🌸 💕 ☁️ 🌙 🌿 🩸
- Never diagnose. For serious symptoms always suggest seeing a doctor
- Connect physical symptoms to hormonal context when relevant
- Validate feelings before giving advice
- Be personalised based on the user's cycle data if provided`;

export async function POST(req) {
  try {
    const { messages, cycleContext } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    // Build the full prompt with cycle context
    const systemText = cycleContext
      ? `${CYRA_SYSTEM}\n\n--- User's current cycle data ---\n${cycleContext}`
      : CYRA_SYSTEM;

    // Gemini uses a different format — convert messages
    // First message needs the system prompt prepended
    const geminiContents = messages.map((m, i) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{
        text: i === 0 && m.role === "user"
          ? `${systemText}\n\nUser: ${m.content}`
          : m.content
      }]
    }));

    // If first message is from assistant (welcome), skip it
    const filteredContents = geminiContents.filter(m => {
      // Keep all user messages and model responses except welcome
      return true;
    });

    // For single message or start of conversation
    const lastUserMessage = messages[messages.length - 1];
    const conversationHistory = messages.slice(0, -1);

    // Build Gemini request
    const geminiMessages = [];

    // Add conversation history
    for (const msg of conversationHistory) {
      if (msg.role === "user" || msg.role === "assistant") {
        geminiMessages.push({
          role:  msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        });
      }
    }

    // Add current user message with system context on first turn
    const isFirstTurn = conversationHistory.filter(m => m.role === "user").length === 0;
    geminiMessages.push({
      role: "user",
      parts: [{
        text: isFirstTurn
          ? `${systemText}\n\nUser message: ${lastUserMessage.content}`
          : lastUserMessage.content
      }],
    });

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents:         geminiMessages,
          generationConfig: {
            maxOutputTokens: 400,
            temperature:     0.8,
          },
          safetySettings: [
            { category:"HARM_CATEGORY_HARASSMENT",        threshold:"BLOCK_NONE" },
            { category:"HARM_CATEGORY_HATE_SPEECH",       threshold:"BLOCK_NONE" },
            { category:"HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold:"BLOCK_NONE" },
            { category:"HARM_CATEGORY_DANGEROUS_CONTENT", threshold:"BLOCK_NONE" },
          ],
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Gemini error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Gemini API error" },
        { status: res.status }
      );
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.error("No reply from Gemini:", JSON.stringify(data));
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });

  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}