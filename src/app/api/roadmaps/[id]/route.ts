import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/utils/supabase/server";

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const supabase = await getSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { error } = await supabase
      .from("roadmaps")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error deleting roadmap", error);
      return NextResponse.json({ error: "Failed to delete roadmap" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error deleting roadmap", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
