'use client';

import { WizardForm } from '@/components/wizard/WizardForm';
import { WizardProvider } from '@/context/WizardContext';

export default function ValidatePage() {
  return (
    <WizardProvider>
      <div className="container mx-auto py-12 px-4">
        <WizardForm />
      </div>
    </WizardProvider>
  );
}
