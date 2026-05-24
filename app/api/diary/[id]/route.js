// app/api/diary/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { requireAuth } from "../../../../lib/getSession";
import { deleteFile } from "../../../../lib/supabase";

export async function DELETE(req, { params }) {
  const { error, userId } = await requireAuth(req);
  if (error) return error;

  try {
    const file = await prisma.diaryFile.findUnique({ where: { id: params.id } });

    if (!file || file.userId !== userId) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete from Supabase Storage
    const storagePath = file.fileUrl.split("/").slice(-2).join("/"); // userId/filename
    await deleteFile(storagePath).catch(() => {}); // don't fail if already deleted

    // Delete from DB
    await prisma.diaryFile.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "File deleted" });
  } catch (err) {
    console.error("Diary DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}