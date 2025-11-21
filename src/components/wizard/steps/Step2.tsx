'use client';

import { useWizardStore } from '@/lib/store/wizard-store';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function Step2() {
  const { userAnswers, setUserAnswer } = useWizardStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">What's your experience level?</h2>
        <p className="text-muted-foreground">
          This helps us tailor the roadmap to your current skill level.
        </p>
      </div>
      <RadioGroup
        value={userAnswers.experience}
        onValueChange={(value) => setUserAnswer('experience', value)}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="beginner" id="beginner" />
          <Label htmlFor="beginner">Beginner (0-1 years)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="intermediate" id="intermediate" />
          <Label htmlFor="intermediate">Intermediate (1-3 years)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="switcher" id="switcher" />
          <Label htmlFor="switcher">Career Switcher (3+ years in another field)</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
