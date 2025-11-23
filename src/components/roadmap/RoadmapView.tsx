'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useWizard } from '@/context/WizardContext';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function RoadmapView() {
  const { roadmapData, isLoading, resetWizard } = useWizard();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Analyzing your profile and generating a personalized roadmap...</p>
      </div>
    );
  }

  if (!roadmapData) return null;

  if (!roadmapData.isValid) {
    return (
      <Card className="border-yellow-500/20 bg-yellow-50 dark:bg-yellow-900/20">
        <CardHeader>
          <CardTitle className="text-yellow-900 dark:text-yellow-200">Reality Check</CardTitle>
          <CardDescription className="text-yellow-800 dark:text-yellow-300">
            {roadmapData.feedback}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            className="bg-white dark:bg-yellow-900/50"
            onClick={resetWizard}
          >
            Adjust My Plan
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Your Personalized Roadmap</h2>
        <p className="text-muted-foreground">
          Here's your customized learning path to become a {roadmapData.roadmap[0]?.phaseTitle.split(' ')[0] || 'desired role'}
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {roadmapData.roadmap.map((phase, index) => (
          <Card key={index} className="overflow-hidden">
            <AccordionItem value={`phase-${index}`} className="border-0">
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold">{phase.phaseTitle}</h3>
                  <p className="text-sm text-muted-foreground">{phase.duration}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-0">
                <p className="mb-4">{phase.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Key Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.topics.map((topic, i) => (
                      <Badge key={i} variant="secondary" className="font-normal">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Recommended Resources:</h4>
                  <div className="space-y-2">
                    {phase.resources.map((resource, i) => (
                      <a
                        key={i}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-blue-600 hover:underline dark:text-blue-400"
                      >
                        <span className="mr-2">
                          {resource.type === 'Video' ? '▶️' : resource.type === 'Article' ? '📄' : '📚'}
                        </span>
                        {resource.name}
                      </a>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Card>
        ))}
      </Accordion>

      <div className="flex justify-center pt-4">
        <Button onClick={resetWizard} variant="outline">
          Start Over
        </Button>
      </div>
    </div>
  );
}
