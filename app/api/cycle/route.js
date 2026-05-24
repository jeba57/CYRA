// app/api/cycle/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAuth } from "../../../lib/getSession";

// GET — fetch all cycle logs for current user
export async function GET(req) {
  const { error, userId } = await requireAuth(req);
  if (error) return error;

  try {
    const cycles = await prisma.cycleLog.findMany({
      where:   { userId },
      orderBy: { periodStart: "desc" },
      take:    12, // last 12 cycles
    });

    return NextResponse.json({ cycles });
  } catch (err) {
    console.error("Cycle GET error:", err);
    return NextResponse.json({ error: "Failed to fetch cycles" }, { status: 500 });
  }
}

// POST — save a new cycle log
export async function POST(req) {
  const { error, userId } = await requireAuth(req);
  if (error) return error;

  try {
    const body = await req.json();
    const { periodStart, periodEnd, cycleLength, periodLength, flowLevel, notes, symptoms } = body;

    if (!periodStart) {
      return NextResponse.json({ error: "Period start date is required" }, { status: 400 });
    }

    // Check if a cycle for this start date already exists → update it
    const existing = await prisma.cycleLog.findFirst({
      where: {
        userId,
        periodStart: new Date(periodStart),
      },
    });

    let cycle;
    if (existing) {
      cycle = await prisma.cycleLog.update({
        where: { id: existing.id },
        data: {
          periodEnd:    periodEnd    ? new Date(periodEnd)    : undefined,
          cycleLength:  cycleLength  ?? undefined,
          periodLength: periodLength ?? undefined,
          flowLevel:    flowLevel    ?? undefined,
          notes:        notes        ?? undefined,
          symptoms:     symptoms     ?? [],
        },
      });
    } else {
      cycle = await prisma.cycleLog.create({
        data: {
          userId,
          periodStart:  new Date(periodStart),
          periodEnd:    periodEnd ? new Date(periodEnd) : null,
          cycleLength:  cycleLength  ?? null,
          periodLength: periodLength ?? null,
          flowLevel:    flowLevel    ?? null,
          notes:        notes        ?? null,
          symptoms:     symptoms     ?? [],
        },
      });
    }

    // Update user profile with recalculated averages
    const allCycles = await prisma.cycleLog.findMany({
      where:   { userId, cycleLength: { not: null } },
      orderBy: { periodStart: "desc" },
      take:    6,
    });

    if (allCycles.length >= 2) {
      const avgCycle  = Math.round(allCycles.reduce((s, c) => s + c.cycleLength,  0) / allCycles.length);
      const withPeriod = allCycles.filter(c => c.periodLength);
      const avgPeriod = withPeriod.length
        ? Math.round(withPeriod.reduce((s, c) => s + c.periodLength, 0) / withPeriod.length)
        : 5;

      await prisma.userProfile.upsert({
        where:  { userId },
        update: { avgCycleLength: avgCycle, avgPeriodLength: avgPeriod },
        create: { userId, avgCycleLength: avgCycle, avgPeriodLength: avgPeriod },
      });
    }

    return NextResponse.json({ cycle }, { status: existing ? 200 : 201 });
  } catch (err) {
    console.error("Cycle POST error:", err);
    return NextResponse.json({ error: "Failed to save cycle" }, { status: 500 });
  }
}