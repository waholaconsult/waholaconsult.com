import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(posts || []);
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json({ error: "Failed to read database" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, excerpt, content, coverImageUrl } = body;

    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (!title || !category || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const { data: existing } = await supabase.from("posts").select("slug").eq("slug", slug).maybeSingle();
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const { data, error } = await supabase.from("posts").insert([{
      title,
      slug: finalSlug,
      category,
      excerpt: excerpt || (content.length > 150 ? content.substring(0, 150) + "..." : content),
      content,
      cover_image_url: coverImageUrl || null,
      views: 0,
      reads: 0,
    }]).select().single();

    if (error) throw error;

    return NextResponse.json({ success: true, post: data });
  } catch (error) {
    console.error("POST /api/blog error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
