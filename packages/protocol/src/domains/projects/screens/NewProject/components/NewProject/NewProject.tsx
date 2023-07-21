import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { Paper } from '@mui/material';

import { NewProjectStep } from 'domains/projects/types';
import { NewProjectType } from 'domains/projects/store';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { ProjectsRoutesConfig } from 'domains/projects/routes/routesConfig';

import { Header } from '../Header';
import { NewProjectForm } from '../NewProjectForm';
import { useNewProjectStyles } from './useNewProjectStyles';
import { useIsLoading } from './hooks/useIsLoading';

export const NewProject = () => {
  const { classes } = useNewProjectStyles();
  const { handleSetStepConfig, projectStep, project } = useProjectConfig();
  const isLoading = useIsLoading();

  const [currentStep, setCurrentStep] = useState<NewProjectStep>(
    projectStep || NewProjectStep.Chain,
  );

  const { push } = useHistory();

  const handleBackClick = useCallback(() => {
    setCurrentStep(step => {
      if (step > NewProjectStep.Chain) {
        return --step;
      }

      push(ProjectsRoutesConfig.projects.generatePath());

      return step;
    });
  }, [push]);

  const handleSubmit = useCallback(
    (step: NewProjectStep, stepValues: NewProjectType[NewProjectStep]) => {
      setCurrentStep(oldStep => {
        const nextStep = step !== NewProjectStep.Checkout ? ++oldStep : oldStep;

        handleSetStepConfig(step, stepValues, nextStep);

        return nextStep;
      });
    },
    [handleSetStepConfig],
  );

  return (
    <Paper className={classes.root}>
      <Header
        step={currentStep}
        amount={project ? project[NewProjectStep.Plan]?.planPrice : ''}
      />
      <NewProjectForm
        step={currentStep}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        onBackClick={handleBackClick}
      />
    </Paper>
  );
};
