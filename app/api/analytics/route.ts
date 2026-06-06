import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch aggregates
    const { count: totalLeads } = await supabase.from("leads").select("*", { count: 'exact', head: true });
    const { count: totalSubscribers } = await supabase.from("subscribers").select("*", { count: 'exact', head: true });
    
    // Fetch analytics
    const { data: analyticsData } = await supabase.from("analytics").select("*");
    let totalViews = 0;
    const viewsByPage: Record<string, number> = {};
    if (analyticsData) {
      analyticsData.forEach(row => {
        totalViews += row.views;
        viewsByPage[row.route] = row.views;
      });
    }

    // Fetch blog stats
    const { data: blogStats } = await supabase.from("posts").select("title, slug, views, reads");

    return NextResponse.json({
      totalViews,
      totalLeads: totalLeads || 0,
      totalSubscribers: totalSubscribers || 0,
      viewsByPage,
      blogStats: blogStats || [],
    });
  } catch (error) {
    console.error("GET /api/analytics error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { route } = body;

    if (!route) {
      return NextResponse.json({ error: "Route is required" }, { status: 400 });
    }

    // Upsert the view count for the route
    // Since we don't know if it exists, we can use an RPC or just try to insert, and on conflict update.
    // Supabase JS allows upsert if we know the ID, but we only know the route.
    // Wait, route is UNIQUE. So we can upsert by route if we define it as unique.
    // In our schema: route VARCHAR(255) NOT NULL UNIQUE
    
    const { data: existing } = await supabase.from("analytics").select("id, views").eq("route", route).maybeSingle();

    if (existing) {
      const { data, error } = await supabase
        .from("analytics")
        .update({ views: existing.views + 1, last_updated: new Date().toISOString() })
        .eq("id", existing.id)
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json({ success: true, count: data.views });
    } else {
      const { data, error } = await supabase
        .from("analytics")
        .insert([{ route, views: 1 }])
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json({ success: true, count: data.views });
    }
  } catch (error) {
    console.error("POST /api/analytics error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
