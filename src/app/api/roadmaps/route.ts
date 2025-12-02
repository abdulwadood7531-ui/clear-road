import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await getSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { title, data } = body as { title?: string; data: any };

    if (!data) {
      return NextResponse.json({ error: "Missing roadmap data" }, { status: 400 });
    }

    const finalTitle = title || data?.roadmap?.[0]?.phaseTitle || "Career roadmap";

    const { error } = await supabase.from("roadmaps").insert({
      user_id: user.id,
      title: finalTitle,
      data,
      progress: { completedPhases: [] },
    });

    if (error) {
      console.error("Failed to save roadmap", error);
      return NextResponse.json({ error: "Failed to save roadmap" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unexpected error saving roadmap", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
