import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import { NewProjectStep } from 'domains/projects/types';
import { NewProjectType } from 'domains/projects/store';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { addToWhitelist } from 'domains/projects/actions/addToWhitelist';

import { NewProjectForm } from '../NewProjectForm';
import { useIsLoading } from './hooks/useIsLoading';

export const NewProject = () => {
  const { handleSetStepConfig, projectStep } = useProjectConfig();
  const isLoading = useIsLoading();
  const [, { isSuccess }] = useQueryEndpoint(addToWhitelist);

  const [currentStep, setCurrentStep] = useState<NewProjectStep>(
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
      setCurrentStep(oldStep => {
        const nextStep =
          step === NewProjectStep.Whitelist ? oldStep : ++oldStep;

        handleSetStepConfig(step, stepValues, nextStep);

        return nextStep;
      });
    },
    [handleSetStepConfig],
  );

  return (
    <NewProjectForm
      step={currentStep}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isSuccess={isSuccess}
      onBackClick={handleBackClick}
    />
  );
};
