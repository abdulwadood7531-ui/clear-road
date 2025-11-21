'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useWizardStore } from '@/lib/store/wizard-store';

interface SummaryProps {
  onRestart: () => void;
}

export function Summary({ onRestart }: SummaryProps) {
  const { userAnswers } = useWizardStore();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Validation Complete! 🎉</h2>
        <p className="text-muted-foreground">
          Here's a summary of your responses. We'll use this to create your personalized career roadmap.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Responses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-medium">Target Profession</h3>
              <p className="text-muted-foreground">{userAnswers.profession || 'Not specified'}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Experience Level</h3>
              <p className="text-muted-foreground">
                {userAnswers.experience === 'beginner' ? 'Beginner (0-1 years)' :
                 userAnswers.experience === 'intermediate' ? 'Intermediate (1-3 years)' :
                 userAnswers.experience === 'switcher' ? 'Career Switcher' : 'Not specified'}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Weekly Commitment</h3>
              <p className="text-muted-foreground">
                {userAnswers.hoursPerWeek === '<5' ? 'Less than 5 hours' :
                 userAnswers.hoursPerWeek === '5-10' ? '5-10 hours' :
                 userAnswers.hoursPerWeek === '10-20' ? '10-20 hours' :
                 userAnswers.hoursPerWeek === '40+' ? '40+ hours (full-time)' : 'Not specified'}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Learning Style</h3>
              <p className="text-muted-foreground">
                {userAnswers.learningStyle === 'visual' ? 'Visual (videos, diagrams)' :
                 userAnswers.learningStyle === 'text' ? 'Text-based (docs, articles)' :
                 userAnswers.learningStyle === 'project' ? 'Project-based' :
                 userAnswers.learningStyle === 'interactive' ? 'Interactive (coding challenges)' : 'Not specified'}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Budget</h3>
              <p className="text-muted-foreground">
                {userAnswers.budget === 'free' ? 'Free resources only' :
                 userAnswers.budget === 'paid-courses' ? 'Paid courses ($10-$100)' :
                 userAnswers.budget === 'bootcamp' ? 'Bootcamp or intensive program ($1,000+)' :
                 userAnswers.budget === 'no-limit' ? 'No budget limit' : 'Not specified'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={onRestart}>
          Start Over
        </Button>
      </div>
    </div>
  );
}
