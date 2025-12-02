import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      {/* Navbar */}
      <header className="border-b bg-white/80 backdrop-blur dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600" />
            <span className="text-lg font-semibold tracking-tight">ClearRoad</span>
          </Link>

          <nav className="flex items-center space-x-4 text-sm">
            <Link href="#features" className="hidden text-muted-foreground hover:text-foreground sm:inline-block">
              Features
            </Link>
            <Link href="/validate" className="hidden text-muted-foreground hover:text-foreground sm:inline-block">
              Wizard
            </Link>
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm" className="inline-flex">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-24 pt-16 md:px-8 md:pt-20">
        <section className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-center">
          <div className="space-y-6">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Your career,
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                clarified by AI.
              </span>
            </h1>
            <p className="max-w-xl text-balance text-lg text-muted-foreground">
              ClearRoad turns vague ambition into a concrete, phase-by-phase roadmap. Validate your plan,
              stress-test your assumptions, and get an AI-generated path you can actually follow.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" asChild>
                <Link href="/validate">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">See how it works</Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              No credit card required. Start with a single career question.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-blue-600">
              Live Preview
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg border bg-zinc-50 px-3 py-2 text-xs dark:border-zinc-800 dark:bg-zinc-900">
                <span className="font-medium">Target profession</span>
                <span className="text-muted-foreground">Frontend Engineer</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-zinc-50 px-3 py-2 text-xs dark:border-zinc-800 dark:bg-zinc-900">
                <span className="font-medium">Experience level</span>
                <span className="text-muted-foreground">Career switcher</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border bg-zinc-50 px-3 py-2 text-xs dark:border-zinc-800 dark:bg-zinc-900">
                <span className="font-medium">Time / week</span>
                <span className="text-muted-foreground">10–15 hours</span>
              </div>
              <div className="mt-4 rounded-lg border border-dashed bg-gradient-to-br from-blue-50 to-purple-50 p-4 text-xs dark:border-zinc-800 dark:from-blue-950 dark:to-purple-950">
                <p className="mb-1 font-semibold">AI Roadmap Snapshot</p>
                <p className="text-muted-foreground">
                  Phase 1: Fundamentals — HTML, CSS, modern JavaScript, and React basics. 6–8 weeks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="mb-2 text-base font-semibold">Validation</h3>
            <p className="text-sm text-muted-foreground">
              Test your career idea against your time, experience, and budget before you commit months of effort.
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="mb-2 text-base font-semibold">AI Generation</h3>
            <p className="text-sm text-muted-foreground">
              Gemini-powered roadmaps break your goal into clear phases, topics, and resources tailored to you.
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="mb-2 text-base font-semibold">Progress Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Save multiple roadmaps, revisit them in your dashboard, and adjust as your situation changes.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
