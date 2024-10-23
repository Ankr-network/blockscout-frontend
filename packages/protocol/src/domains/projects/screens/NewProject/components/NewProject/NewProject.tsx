import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import { NewProjectStep } from 'domains/projects/types';
import { NewProjectType } from 'domains/projects/store';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

import { NewProjectForm } from '../NewProjectForm';
import { useIsLoading } from './hooks/useIsLoading';

export const NewProject = () => {
  const { handleSetStepConfig, projectStep } = useProjectConfig();

  const isLoading = useIsLoading();

  const [currentStep, setCurrentStep] = useState(
    projectStep || NewProjectStep.General,
  );

  const { push } = useHistory();

  const handleBackClick = useCallback(() => {
    setCurrentStep(step => {
      if (step > NewProjectStep.General) {
        return --step;
      }

      push(ProjectsRoutesConfig.projects.generatePath());

      return step;
    });
  }, [push]);

  const handleSubmit = useCallback(
    (step: NewProjectStep, stepValues: NewProjectType[NewProjectStep]) => {
      const nextStep =
        step === NewProjectStep.Whitelist ? currentStep : currentStep + 1;

      setCurrentStep(nextStep);
      handleSetStepConfig(step, stepValues, nextStep);
    },
    [handleSetStepConfig, currentStep],
  );

  return (
    <NewProjectForm
      step={currentStep}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      onBackClick={handleBackClick}
    />
  );
};
