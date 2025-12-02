"use client";

import { useState, useTransition } from "react";

type RoadmapPhase = {
  phaseTitle: string;
};

export function RoadmapProgressSection({
  roadmapId,
  phases,
  initialCompleted,
}: {
  roadmapId: string;
  phases: RoadmapPhase[];
  initialCompleted: number[];
}) {
  const [completed, setCompleted] = useState<number[]>(initialCompleted);
  const [isPending, startTransition] = useTransition();

  const togglePhase = (index: number) => {
    const next = completed.includes(index)
      ? completed.filter((i) => i !== index)
      : [...completed, index];

    setCompleted(next);

    startTransition(async () => {
      try {
        await fetch(`/api/roadmaps/${roadmapId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completedPhases: next }),
        });
      } catch (err) {
        console.error('Failed to update progress', err);
      }
    });
  };

  if (!phases.length) return null;

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground">Progress by phase</p>
      <div className="grid gap-2 md:grid-cols-2">
        {phases.map((phase, index) => (
          <label
            key={index}
            className="flex cursor-pointer items-center gap-2 rounded-md border bg-background px-3 py-2 text-xs shadow-sm transition hover:bg-accent/40"
          >
            <input
              type="checkbox"
              className="h-3 w-3 rounded border"
              checked={completed.includes(index)}
              onChange={() => togglePhase(index)}
              disabled={isPending}
            />
            <span>{phase.phaseTitle}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
