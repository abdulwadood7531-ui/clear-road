import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteAccountSection } from "@/components/dashboard/DeleteAccountSection";

type RoadmapRow = {
  id: string;
  title: string;
  created_at: string | null;
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: roadmaps } = await supabase
    .from("roadmaps")
    .select("id, title, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 pb-16 pt-10 md:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Review and revisit the roadmaps you have generated with ClearRoad.
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/validate">New roadmap</Link>
        </Button>
      </div>

      {roadmaps && roadmaps.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map((r: RoadmapRow) => (
            <Link key={r.id} href={`/dashboard/${r.id}`} className="block">
              <Card className="flex h-full flex-col justify-between transition hover:-translate-y-0.5 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="line-clamp-2 text-sm font-semibold">{r.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {r.created_at ? new Date(r.created_at).toLocaleString() : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 text-xs text-muted-foreground">
                  Click to revisit this AI-generated roadmap.
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No roadmaps yet</CardTitle>
            <CardDescription className="text-sm">
              Run through the wizard to generate and save your first roadmap.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="mt-8">
        <DeleteAccountSection />
      </div>
    </main>
  );
}
