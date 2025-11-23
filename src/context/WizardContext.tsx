'use client';

import React, { createContext, useContext, useState } from 'react';

type UserData = {
  profession: string;
  experience: string;
  hoursPerWeek: string;
  learningStyle: string;
  budget: string;
};

export type RoadmapPhase = {
  phaseTitle: string;
  duration: string;
  description: string;
  topics: string[];
  resources: Array<{
    name: string;
    url: string;
    type: 'Video' | 'Article' | 'Course';
  }>;
};

type RoadmapData = {
  isValid: boolean;
  feedback: string;
  roadmap: RoadmapPhase[];
};

type WizardContextType = {
  currentStep: number;
  isFinished: boolean;
  isLoading: boolean;
  userData: UserData;
  roadmapData: RoadmapData | null;
  nextStep: () => void;
  prevStep: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  completeWizard: () => void;
  resetWizard: () => void;
  generateRoadmap: () => Promise<void>;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

type WizardState = {
  currentStep: number;
  isFinished: boolean;
  isLoading: boolean;
  userData: UserData;
  roadmapData: RoadmapData | null;
};

const INITIAL_STATE: WizardState = {
  currentStep: 1,
  isFinished: false,
  isLoading: false,
  userData: {
    profession: '',
    experience: '',
    hoursPerWeek: '',
    learningStyle: '',
    budget: ''
  },
  roadmapData: null
};

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<WizardState>(INITIAL_STATE);

  const nextStep = () => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 5)
    }));
  };

  const prevStep = () => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1)
    }));
  };

  const updateUserData = (data: Partial<UserData>) => {
    setState(prev => ({
      ...prev,
      userData: { ...prev.userData, ...data }
    }));
  };

  const completeWizard = () => {
    setState(prev => ({ ...prev, isFinished: true }));
  };

  const resetWizard = () => {
    setState(INITIAL_STATE);
  };

  const generateRoadmap = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userData: state.userData }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate roadmap');
      }

      const data = await response.json();
      setState(prev => ({
        ...prev,
        roadmapData: data,
        isLoading: false
      }));
    } catch (error) {
      console.error('Error generating roadmap:', error);
      setState(prev => ({
        ...prev,
        roadmapData: {
          isValid: false,
          feedback: 'Failed to generate roadmap. Please try again.',
          roadmap: []
        },
        isLoading: false
      }));
    }
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep: state.currentStep,
        isFinished: state.isFinished,
        isLoading: state.isLoading,
        userData: state.userData,
        roadmapData: state.roadmapData,
        nextStep,
        prevStep,
        updateUserData,
        completeWizard,
        resetWizard,
        generateRoadmap
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};
