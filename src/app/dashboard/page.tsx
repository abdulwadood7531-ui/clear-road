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
        <div className="grid grid-cols-1 gap-4">
          {roadmaps.map((r: RoadmapRow) => (
            <Link key={r.id} href={`/dashboard/${r.id}`} className="block">
              <Card className="relative flex min-h-[180px] flex-col justify-between overflow-hidden rounded-xl border bg-white px-5 py-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600" aria-hidden />
                <CardHeader className="p-0 pb-2">
                  <CardTitle className="line-clamp-2 text-lg font-semibold">{r.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {r.created_at ? new Date(r.created_at).toLocaleString() : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-2 text-xs text-muted-foreground">
                  Click to revisit this AI-generated roadmap and track your progress.
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
