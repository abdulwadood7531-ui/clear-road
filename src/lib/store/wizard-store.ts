import { create } from 'zustand';

type WizardState = {
  currentStep: number;
  userAnswers: {
    profession: string;
    experience: string;
    hoursPerWeek: string;
    learningStyle: string;
    budget: string;
  };
  isFinished: boolean;
  setCurrentStep: (step: number) => void;
  setUserAnswer: (key: keyof WizardState['userAnswers'], value: string) => void;
  setIsFinished: (value: boolean) => void;
  reset: () => void;
};

export const useWizardStore = create<WizardState>((set) => ({
  currentStep: 1,
  userAnswers: {
    profession: '',
    experience: '',
    hoursPerWeek: '',
    learningStyle: '',
    budget: ''
  },
  isFinished: false,
  setCurrentStep: (step) => set({ currentStep: step }),
  setUserAnswer: (key, value) =>
    set((state) => ({
      userAnswers: {
        ...state.userAnswers,
        [key]: value,
      },
    })),
  setIsFinished: (value) => set({ isFinished: value }),
  reset: () =>
    set({
      currentStep: 1,
      userAnswers: {
        profession: '',
        experience: '',
        hoursPerWeek: '',
        learningStyle: '',
        budget: ''
      },
      isFinished: false,
    }),
}));
