'use client';

import { useWizardStore } from '@/lib/store/wizard-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Step1() {
  const { userAnswers, setUserAnswer } = useWizardStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">What's your target profession?</h2>
        <p className="text-muted-foreground">
          Let us know what career path you're interested in.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="profession">Profession (e.g., Software Engineer, Data Scientist)</Label>
        <Input
          id="profession"
          value={userAnswers.profession}
          onChange={(e) => setUserAnswer('profession', e.target.value)}
          placeholder="Enter your target profession"
          className="max-w-md"
        />
      </div>
    </div>
  );
}
