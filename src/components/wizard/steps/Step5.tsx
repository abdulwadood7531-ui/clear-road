'use client';

import { useWizardStore } from '@/lib/store/wizard-store';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function Step5() {
  const { userAnswers, setUserAnswer, setIsFinished } = useWizardStore();

  const handleFinish = () => {
    setIsFinished(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">What's your budget for learning resources?</h2>
        <p className="text-muted-foreground">
          This helps us recommend resources within your budget.
        </p>
      </div>
      <RadioGroup
        value={userAnswers.budget}
        onValueChange={(value) => setUserAnswer('budget', value)}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="free" id="free" />
          <Label htmlFor="free">Free resources only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="paid-courses" id="paid-courses" />
          <Label htmlFor="paid-courses">Paid courses ($10-$100)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bootcamp" id="bootcamp" />
          <Label htmlFor="bootcamp">Bootcamp or intensive program ($1,000+)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no-limit" id="no-limit" />
          <Label htmlFor="no-limit">No budget limit</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
