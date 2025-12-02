import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/utils/supabase/server";
import { getSupabaseAdminClient } from "@/utils/supabase/admin";

export async function POST() {
  try {
    const supabase = await getSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const admin = getSupabaseAdminClient();

    // Delete all user data first (defensive, even though FKs are ON DELETE CASCADE)
    const userId = user.id;

    const { error: roadmapsError } = await admin
      .from("roadmaps")
      .delete()
      .eq("user_id", userId);

    if (roadmapsError) {
      console.error("Error deleting user roadmaps", roadmapsError);
    }

    const { error: profilesError } = await admin
      .from("profiles")
      .delete()
      .eq("id", userId);

    if (profilesError) {
      console.error("Error deleting user profile", profilesError);
    }

    const { error: deleteUserError } = await admin.auth.admin.deleteUser(userId);

    if (deleteUserError) {
      console.error("Error deleting auth user", deleteUserError);
      return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error deleting account", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
