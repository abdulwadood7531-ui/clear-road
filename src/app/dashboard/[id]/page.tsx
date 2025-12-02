import { notFound, redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoadmapActions } from "@/components/dashboard/RoadmapActions";
import { RoadmapProgressSection } from "@/components/dashboard/RoadmapProgressSection";

export const dynamic = "force-dynamic";

type RoadmapPhase = {
  phaseTitle: string;
  duration: string;
  description: string;
  topics: string[];
  resources: Array<{
    name: string;
    url: string;
    type: "Video" | "Article" | "Course";
  }>;
};

type RoadmapData = {
  isValid: boolean;
  feedback: string;
  roadmap: RoadmapPhase[];
};

export default async function RoadmapDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("roadmaps")
    .select("id, title, data, created_at, progress")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const roadmapData = data.data as RoadmapData;
  const progress = (data.progress as { completedPhases?: number[] } | null) ?? { completedPhases: [] };

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-16 pt-10 md:px-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{data.title}</h1>
          <p className="text-xs text-muted-foreground">
            Generated {data.created_at ? new Date(data.created_at).toLocaleString() : ""}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
          <RoadmapActions id={data.id} />
        </div>
      </div>

      {!roadmapData.isValid ? (
        <Card className="border-yellow-500/20 bg-yellow-50 dark:bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="text-yellow-900 dark:text-yellow-200">Reality check</CardTitle>
            <CardDescription className="text-yellow-800 dark:text-yellow-300">
              {roadmapData.feedback}
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your personalized roadmap</CardTitle>
            <CardDescription>{roadmapData.feedback}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RoadmapProgressSection
              roadmapId={data.id}
              phases={roadmapData.roadmap.map((p) => ({ phaseTitle: p.phaseTitle }))}
              initialCompleted={progress.completedPhases ?? []}
            />
            <Accordion type="single" collapsible className="w-full space-y-4">
              {roadmapData.roadmap.map((phase, index) => (
                <Card key={index} className="overflow-hidden">
                  <AccordionItem value={`phase-${index}`} className="border-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-semibold">{phase.phaseTitle}</h3>
                        <p className="text-sm text-muted-foreground">{phase.duration}</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-0">
                      <p className="mb-4 text-sm">{phase.description}</p>

                      <div className="mb-6">
                        <h4 className="text-sm font-medium mb-2">Key topics</h4>
                        <div className="flex flex-wrap gap-2">
                          {phase.topics.map((topic, i) => (
                            <Badge key={i} variant="secondary" className="font-normal">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Recommended resources</h4>
                        <div className="space-y-2 text-sm">
                          {phase.resources.map((resource, i) => (
                            <a
                              key={i}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-blue-600 hover:underline dark:text-blue-400"
                            >
                              <span className="mr-2">
                                {resource.type === "Video"
                                  ? "▶️"
                                  : resource.type === "Article"
                                  ? "📄"
                                  : "📚"}
                              </span>
                              {resource.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
