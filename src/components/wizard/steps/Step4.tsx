'use client';

import { useWizardStore } from '@/lib/store/wizard-store';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function Step4() {
  const { userAnswers, setUserAnswer } = useWizardStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">What's your preferred learning style?</h2>
        <p className="text-muted-foreground">
          This helps us recommend the most effective resources for you.
        </p>
      </div>
      <RadioGroup
        value={userAnswers.learningStyle}
        onValueChange={(value) => setUserAnswer('learningStyle', value)}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="visual" id="visual" />
          <Label htmlFor="visual">Visual (videos, diagrams, infographics)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="text" id="text" />
          <Label htmlFor="text">Text-based (documentation, articles, books)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="project" id="project" />
          <Label htmlFor="project">Project-based (learn by building)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="interactive" id="interactive" />
          <Label htmlFor="interactive">Interactive (coding challenges, exercises)</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
