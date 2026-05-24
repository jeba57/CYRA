// app/api/cycle/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/getSession";

export async function DELETE(req, { params }) {
  const { error, userId } = await requireAuth(req);
  if (error) return error;

  try {
    const cycle = await prisma.cycleLog.findUnique({ where: { id: params.id } });

    if (!cycle || cycle.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.cycleLog.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}