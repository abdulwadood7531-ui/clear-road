'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useWizard } from '@/context/WizardContext';
import { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { RoadmapView } from '../roadmap/RoadmapView';

const steps = [
  {
    id: 1,
    title: 'Target Profession',
    description: 'What career path are you interested in?',
    component: 'input',
    field: 'profession',
    placeholder: 'e.g., Software Engineer, Data Scientist, etc.'
  },
  {
    id: 2,
    title: 'Experience Level',
    description: 'What is your current experience level?',
    component: 'radio',
    field: 'experience',
    options: [
      { value: 'beginner', label: 'Beginner (0-1 years)' },
      { value: 'intermediate', label: 'Intermediate (1-3 years)' },
      { value: 'switcher', label: 'Career Switcher' }
    ]
  },
  {
    id: 3,
    title: 'Time Commitment',
    description: 'How many hours per week can you dedicate to learning?',
    component: 'radio',
    field: 'hoursPerWeek',
    options: [
      { value: '<5', label: 'Less than 5 hours' },
      { value: '5-10', label: '5-10 hours' },
      { value: '10-20', label: '10-20 hours' },
      { value: '40+', label: '40+ hours (full-time)' }
    ]
  },
  {
    id: 4,
    title: 'Learning Style',
    description: 'How do you prefer to learn?',
    component: 'radio',
    field: 'learningStyle',
    options: [
      { value: 'visual', label: 'Visual (videos, diagrams)' },
      { value: 'text', label: 'Text-based (docs, articles)' },
      { value: 'hands-on', label: 'Hands-on (projects, coding)' }
    ]
  },
  {
    id: 5,
    title: 'Budget',
    description: 'What is your budget for learning resources?',
    component: 'radio',
    field: 'budget',
    options: [
      { value: 'free', label: 'Free resources only' },
      { value: 'paid', label: 'Paid courses' },
      { value: 'bootcamp', label: 'Bootcamp/Intensive program' }
    ]
  }
];

export function WizardForm() {
  const {
    currentStep,
    isFinished,
    userData,
    roadmapData,
    isLoading,
    nextStep,
    prevStep,
    updateUserData,
    completeWizard,
    generateRoadmap
  } = useWizard();

  const [inputValue, setInputValue] = useState('');

  const currentStepData = steps.find(step => step.id === currentStep);
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length;

  useEffect(() => {
    if (currentStepData?.component === 'input') {
      setInputValue(userData[currentStepData.field as keyof typeof userData] || '');
    }
  }, [currentStep, currentStepData, userData]);

  const handleNext = () => {
    if (isLastStep) {
      completeWizard();
    } else {
      nextStep();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (currentStepData?.field) {
      updateUserData({ [currentStepData.field]: e.target.value } as any);
    }
  };

  const handleRadioChange = (value: string) => {
    if (currentStepData?.field) {
      updateUserData({ [currentStepData.field]: value } as any);
    }
  };

  const isNextDisabled = () => {
    if (!currentStepData) return true;
    return !userData[currentStepData.field as keyof typeof userData];
  };

  if (isFinished) {
    return (
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Validation Complete! 🎉</CardTitle>
            <CardDescription>
              We've analyzed your profile. {!roadmapData && 'Click the button below to generate your personalized roadmap.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                {steps.map(step => (
                  <div key={step.id} className="space-y-1">
                    <h4 className="text-sm font-medium text-muted-foreground">{step.title}</h4>
                    <p>
                      {userData[step.field as keyof typeof userData] || 'Not specified'}
                    </p>
                  </div>
                ))}
              </div>
              
              {!roadmapData && (
                <div className="pt-4">
                  <Button 
                    onClick={generateRoadmap} 
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate My Roadmap'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {roadmapData && <RoadmapView />}
      </div>
    );
  }

  if (!currentStepData) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <CardTitle>{currentStepData.title}</CardTitle>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{currentStepData.description}</p>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentStepData.component === 'input' ? (
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder={currentStepData.placeholder}
            className="max-w-md"
          />
        ) : (
          <RadioGroup
            value={userData[currentStepData.field as keyof typeof userData] || ''}
            onValueChange={handleRadioChange}
            className="space-y-3"
          >
            {currentStepData.options?.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )}

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep}
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={isNextDisabled()}
          >
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
