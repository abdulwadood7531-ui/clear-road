'use client';

import { useWizardStore } from '@/lib/store/wizard-store';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function Step3() {
  const { userAnswers, setUserAnswer } = useWizardStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">How many hours per week can you dedicate to learning?</h2>
        <p className="text-muted-foreground">
          This helps us estimate your timeline to reach your goals.
        </p>
      </div>
      <RadioGroup
        value={userAnswers.hoursPerWeek}
        onValueChange={(value) => setUserAnswer('hoursPerWeek', value)}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="<5" id="less-than-5" />
          <Label htmlFor="less-than-5">Less than 5 hours</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="5-10" id="5-10" />
          <Label htmlFor="5-10">5-10 hours</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="10-20" id="10-20" />
          <Label htmlFor="10-20">10-20 hours</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="40+" id="40-plus" />
          <Label htmlFor="40-plus">40+ hours (full-time)</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
