import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pb-28 pt-14 md:px-8 md:pt-20">
      {/* Hero */}
      <section className="grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-center">
        <div className="space-y-6">
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
            A clear career plan —
            <span className="block">without the guesswork.</span>
          </h1>
          <p className="max-w-xl text-balance text-lg text-muted-foreground">
            ClearRoad turns vague ambition into a concrete roadmap you can follow. Validate your plan and let AI break it into actionable phases.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" asChild>
              <Link href="/validate">Start free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how">How it works</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">No credit card required.</p>
        </div>

        {/* Simple preview card */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg border bg-zinc-50 px-3 py-2 text-xs dark:border-zinc-800 dark:bg-zinc-900">
              <span className="font-medium">Target profession</span>
              <span className="text-muted-foreground">Product Manager</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border bg-zinc-50 px-3 py-2 text-xs dark:border-zinc-800 dark:bg-zinc-900">
              <span className="font-medium">Experience level</span>
              <span className="text-muted-foreground">Beginner</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border bg-zinc-50 px-3 py-2 text-xs dark:border-zinc-800 dark:bg-zinc-900">
              <span className="font-medium">Time / week</span>
              <span className="text-muted-foreground">8–12 hours</span>
            </div>
            <div className="mt-4 rounded-lg border border-dashed bg-gradient-to-br from-blue-50 to-purple-50 p-4 text-xs dark:border-zinc-800 dark:from-blue-950 dark:to-purple-950">
              <p className="mb-1 font-semibold">AI Roadmap Snapshot</p>
              <p className="text-muted-foreground">Phase 1: Foundations — core concepts and key tools. 4–6 weeks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="mb-2 text-base font-semibold">1. Validate</h3>
          <p className="text-sm text-muted-foreground">Answer 5 quick questions about your goal, time, and budget.</p>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="mb-2 text-base font-semibold">2. Generate</h3>
          <p className="text-sm text-muted-foreground">AI creates a phased roadmap with topics and tailored resources.</p>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="mb-2 text-base font-semibold">3. Track</h3>
          <p className="text-sm text-muted-foreground">Save, revisit from your dashboard, and mark phases complete.</p>
        </div>
      </section>

      {/* Templates */}
      <section className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Popular templates</h3>
        <div className="flex flex-wrap gap-2">
          {['Product Management', 'Data Science', 'Frontend', 'UI/UX', 'Marketing'].map((t) => (
            <Link key={t} href="/validate" className="rounded-full border px-3 py-1.5 text-xs text-foreground hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
              {t}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
