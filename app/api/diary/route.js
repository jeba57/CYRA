// app/api/diary/route.js
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { requireAuth } from "../../../lib/getSession";
import { uploadFile, deleteFile } from "../../../lib/supabase";

// GET — list all diary files for user
export async function GET(req) {
  const { error, userId } = await requireAuth(req);
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const files = await prisma.diaryFile.findMany({
      where: {
        userId,
        ...(category ? { category } : {}),
      },
      orderBy: { uploadedAt: "desc" },
    });

    // Group by category for the UI
    const grouped = files.reduce((acc, file) => {
      if (!acc[file.category]) acc[file.category] = [];
      acc[file.category].push(file);
      return acc;
    }, {});

    return NextResponse.json({ files, grouped });
  } catch (err) {
    console.error("Diary GET error:", err);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}

// POST — upload a new file
export async function POST(req) {
  const { error, userId } = await requireAuth(req);
  if (error) return error;

  try {
    const formData = await req.formData();
    const file     = formData.get("file");
    const category = formData.get("category") || "prescription";
    const notes    = formData.get("notes") || null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large. Max 10MB." }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg", "image/png", "image/webp",
      "image/heic", "image/heif",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Only PDF and image files are allowed" }, { status: 400 });
    }

    // Upload to Supabase Storage
    const { url, path } = await uploadFile(file, userId);

    // Save metadata to DB
    const diaryFile = await prisma.diaryFile.create({
      data: {
        userId,
        name:     file.name,
        category,
        fileUrl:  url,
        fileSize: file.size,
        mimeType: file.type,
        notes,
      },
    });

    return NextResponse.json({ file: diaryFile }, { status: 201 });
  } catch (err) {
    console.error("Diary POST error:", err);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}