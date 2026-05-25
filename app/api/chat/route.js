// app/api/chat/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAuth } from "../../../lib/getSession";

const BOT_RESPONSES = [
  "I hear you 💕 That makes complete sense. Your feelings are always valid here.",
  "During your follicular phase, try adding iron-rich foods like spinach and lentils 🌿",
  "It's okay to take it slow today ☁️ Rest is not laziness — it's wisdom.",
  "Cramps on day 1–2 are typically the most intense. A warm compress helps a lot 🍵",
  "For PCOS support, reducing refined sugar can help regulate blood sugar and hormones 🌿",
  "Sending you so much gentleness right now 🌷 You're doing better than you think.",
  "That's completely normal for the luteal phase. Honor how you feel 🌙",
  "Hydration is so important right now — aim for 8–10 glasses of warm water 💧",
  "Gentle movement like yoga or walking can really help with energy and mood 🧘",
  "Your symptoms sound like typical PMS — tracking them helps you prepare next cycle 📊",
];

let responseIndex = 0;

// GET — fetch chat history
export async function GET(req) {
  const { error, userId } = await requireAuth(req);
  if (error) return error;

  try {
    // Get or create session
    let session = await prisma.chatSession.findFirst({
      where:   { userId },
      orderBy: { createdAt: "desc" },
      include: { messages: { orderBy: { createdAt: "asc" }, take: 50 } },
    });

    if (!session) {
      session = await prisma.chatSession.create({
        data: { userId },
        include: { messages: true },
      });
    }

    return NextResponse.json({ session });
  } catch (err) {
    console.error("Chat GET error:", err);
    return NextResponse.json({ error: "Failed to load chat" }, { status: 500 });
  }
}

// POST — send a message + get bot reply
export async function POST(req) {
  const { error, userId } = await requireAuth(req);
  if (error) return error;

  try {
    const { message, sessionId } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Get or create session
    let session;
    if (sessionId) {
      session = await prisma.chatSession.findUnique({ where: { id: sessionId } });
    }
    if (!session) {
      session = await prisma.chatSession.create({ data: { userId } });
    }

    // Save user message
    const userMessage = await prisma.chatMessage.create({
      data: { sessionId: session.id, role: "user", content: message },
    });

    // Generate bot reply
    const botReply = BOT_RESPONSES[responseIndex++ % BOT_RESPONSES.length];

    // Save bot message
    const botMessage = await prisma.chatMessage.create({
      data: { sessionId: session.id, role: "bot", content: botReply },
    });

    return NextResponse.json({
      userMessage,
      botMessage,
      sessionId: session.id,
    });
  } catch (err) {
    console.error("Chat POST error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}