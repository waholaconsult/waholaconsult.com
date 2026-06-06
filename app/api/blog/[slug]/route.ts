import { NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    const { searchParams } = new URL(request.url);
    const isRead = searchParams.get("read") === "true";

    const db = readDb();
    const postIndex = db.posts.findIndex((p) => p.slug === slug);

    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (isRead) {
      db.posts[postIndex].reads = (db.posts[postIndex].reads || 0) + 1;
    } else {
      db.posts[postIndex].views = (db.posts[postIndex].views || 0) + 1;
    }

    writeDb(db);

    return NextResponse.json(db.posts[postIndex]);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
