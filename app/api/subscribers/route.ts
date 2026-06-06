import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: subscribers, error } = await supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(subscribers || []);
  } catch (error) {
    console.error("GET /api/subscribers error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { data, error } = await supabase.from("subscribers").insert([{
      email,
      status: "active",
    }]).select().single();

    if (error) {
      if (error.code === '23505') { // Unique violation
        return NextResponse.json({ error: "Email already subscribed" }, { status: 400 });
      }
      throw error;
    }

    // Send welcome email to subscriber
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: "Welcome to the Wahola Newsletter!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
            <h2 style="color: #ff5f1f;">Welcome to Wahola!</h2>
            <p>Hi there,</p>
            <p>Thank you for subscribing to our newsletter! We're thrilled to have you on board.</p>
            <p>You'll now be the first to receive our latest insights, strategies, and updates from the digital marketing frontier.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>The Wahola Team</strong></p>
          </div>
        `
      });
    } catch (emailError) {
      console.error("Failed to send Resend welcome email:", emailError);
    }

    return NextResponse.json({ success: true, subscriber: data });
  } catch (error) {
    console.error("POST /api/subscribers error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { error } = await supabase.from("subscribers").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/subscribers error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
