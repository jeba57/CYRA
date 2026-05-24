// app/api/mood/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAuth } from "../../../lib/getSession";

// GET — fetch mood logs (last 30 days by default)
export async function GET(req) {
  const { error, userId } = await requireAuth(req);
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get("days") || "30");
    const from = new Date();
    from.setDate(from.getDate() - days);

    const logs = await prisma.moodLog.findMany({
      where: {
        userId,
        date: { gte: from },
      },
      orderBy: { date: "desc" },
    });

    // Compute summary stats
    const avgMood   = logs.length ? +(logs.reduce((s, l) => s + l.mood,   0) / logs.length).toFixed(1) : null;
    const avgEnergy = logs.length ? +(logs.reduce((s, l) => s + l.energy, 0) / logs.length).toFixed(1) : null;
    const avgPain   = logs.length ? +(logs.reduce((s, l) => s + l.pain,   0) / logs.length).toFixed(1) : null;

    return NextResponse.json({
      logs,
      stats: { avgMood, avgEnergy, avgPain, totalLogs: logs.length },
    });
  } catch (err) {
    console.error("Mood GET error:", err);
    return NextResponse.json({ error: "Failed to fetch mood logs" }, { status: 500 });
  }
}

// POST — save today's mood log
export async function POST(req) {
  const { error, userId } = await requireAuth(req);
  if (error) return error;

  try {
    const { mood, energy, pain, notes, tags } = await req.json();

    if (!mood || !energy || !pain) {
      return NextResponse.json({ error: "Mood, energy and pain are required" }, { status: 400 });
    }

    // Check if a log already exists for today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const existing = await prisma.moodLog.findFirst({
      where: {
        userId,
        date: { gte: todayStart, lte: todayEnd },
      },
    });

    let log;
    if (existing) {
      log = await prisma.moodLog.update({
        where: { id: existing.id },
        data: { mood, energy, pain, notes: notes || null, tags: tags || [] },
      });
    } else {
      log = await prisma.moodLog.create({
        data: {
          userId,
          mood,
          energy,
          pain,
          notes: notes || null,
          tags:  tags  || [],
        },
      });
    }

    return NextResponse.json({ log }, { status: existing ? 200 : 201 });
  } catch (err) {
    console.error("Mood POST error:", err);
    return NextResponse.json({ error: "Failed to save mood log" }, { status: 500 });
  }
}