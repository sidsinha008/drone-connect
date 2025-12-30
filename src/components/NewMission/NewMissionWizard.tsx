
import React, { useState } from 'react';
import { Step1SelectStadium } from './Step1SelectStadium';
import { Step2DefineMission } from './Step2DefineMission';
import { Step3PlanFlightPath } from './Step3PlanFlightPath';
import { Step4ReviewLaunch } from './Step4ReviewLaunch';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewMissionWizardProps {
  onBack: () => void;
}

const steps = [
  { id: 1, name: 'Select Stadium' },
  { id: 2, name: 'Define Mission' },
  { id: 3, name: 'Plan Flight Path' },
  { id: 4, name: 'Review & Launch' },
];

export const NewMissionWizard = ({ onBack }: NewMissionWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [missionData, setMissionData] = useState({
    stadium: '',
    missionArea: null,
    missionType: '',
    flightParams: {},
  });

  const handleNext = (data: any) => {
    setMissionData(prev => ({ ...prev, ...data }));
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    console.log('Final Mission Data:', missionData);
    onBack(); // Go back to dashboard
  };
  
  const ProgressBar = () => (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0 mb-8">
        {steps.map((step) => (
          <li key={step.name} className="md:flex-1">
            {currentStep > step.id ? (
              <div className="group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-primary transition-colors ">{`Step ${step.id}`}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : currentStep === step.id ? (
              <div
                className="flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                aria-current="step"
              >
                <span className="text-sm font-medium text-primary">{`Step ${step.id}`}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : (
              <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-gray-500 transition-colors">{`Step ${step.id}`}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );

  return (
    <div className="space-y-6 animate-fade-in p-4 md:p-8">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={currentStep === 1 ? onBack : handleBack}>
                <ArrowLeft />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">New Mission: Stadium Data Acquisition</h1>
        </div>
        
        <ProgressBar />

        <div className="mt-8">
            {currentStep === 1 && <Step1SelectStadium onNext={handleNext} onCancel={onBack} />}
            {currentStep === 2 && <Step2DefineMission onNext={handleNext} onBack={handleBack} missionData={missionData} />}
            {currentStep === 3 && <Step3PlanFlightPath onNext={handleNext} onBack={handleBack} missionData={missionData} />}
            {currentStep === 4 && <Step4ReviewLaunch onFinish={handleFinish} onBack={handleBack} missionData={missionData} />}
        </div>
    </div>
  );
};
