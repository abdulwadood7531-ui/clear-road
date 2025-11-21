'use client';

import React, { createContext, useContext, useState } from 'react';

type UserData = {
  profession: string;
  experience: string;
  hoursPerWeek: string;
  learningStyle: string;
  budget: string;
};

type WizardContextType = {
  currentStep: number;
  isFinished: boolean;
  userData: UserData;
  nextStep: () => void;
  prevStep: () => void;
  updateUserData: (data: Partial<UserData>) => void;
  completeWizard: () => void;
  resetWizard: () => void;
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

const INITIAL_STATE = {
  currentStep: 1,
  isFinished: false,
  userData: {
    profession: '',
    experience: '',
    hoursPerWeek: '',
    learningStyle: '',
    budget: ''
  }
};

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(INITIAL_STATE);

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

  return (
    <WizardContext.Provider
      value={{
        currentStep: state.currentStep,
        isFinished: state.isFinished,
        userData: state.userData,
        nextStep,
        prevStep,
        updateUserData,
        completeWizard,
        resetWizard
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
