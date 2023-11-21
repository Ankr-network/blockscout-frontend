import { useCallback, useState } from 'react';
import { Button, Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { Dialog } from 'uiKit/Dialog';
import { ANKR_DOCS_PROJECTS_LINK } from 'modules/common/constants/const';

import {
  useProjectsOnboardingDialogStyles,
  ProjectsOnboardingStep,
} from './useProjectsOnboardingDialogStyles';

interface ProjectsOnboardingDialogProps {
  isOpened: boolean;
  onClose: () => void;
}

const stepsCount = Object.keys(ProjectsOnboardingStep).length / 2;
const initialStep = ProjectsOnboardingStep.step1;

export const ProjectsOnboardingDialog = ({
  isOpened,
  onClose,
}: ProjectsOnboardingDialogProps) => {
  const stepContent = {
    [ProjectsOnboardingStep.step1]: {
      title: t('projects.onboarding.step1.title'),
      description: t('projects.onboarding.step1.description'),
      link: t('projects.onboarding.step1.link'),
      href: ANKR_DOCS_PROJECTS_LINK,
    },
    [ProjectsOnboardingStep.step2]: {
      title: t('projects.onboarding.step2.title'),
      description: tHTML('projects.onboarding.step2.description'),
      link: t('projects.onboarding.step2.link'),
      href: ANKR_DOCS_PROJECTS_LINK,
    },
    [ProjectsOnboardingStep.step3]: {
      title: t('projects.onboarding.step3.title'),
      description: t('projects.onboarding.step3.description'),
      link: t('projects.onboarding.step3.link'),
      href: ANKR_DOCS_PROJECTS_LINK,
    },
  };

  const [currentStepIndex, setCurrentStepIndex] =
    useState<ProjectsOnboardingStep>(initialStep);

  const handleClose = useCallback(() => {
    onClose();

    // timeout for animation
    setTimeout(() => {
      setCurrentStepIndex(initialStep);
    }, 300);
  }, [onClose]);

  const { classes, cx } = useProjectsOnboardingDialogStyles();

  const currentStepNumber = currentStepIndex + 1;

  const isLastStep = currentStepNumber === stepsCount;
  const isFirstStep = currentStepIndex === initialStep;

  const nextStep = useCallback(() => {
    if (isLastStep) {
      return handleClose();
    }

    return setCurrentStepIndex(currentStepIndex + 1);
  }, [currentStepIndex, isLastStep, handleClose]);

  const previousStep = useCallback(() => {
    if (isFirstStep) {
      return () => {};
    }

    return setCurrentStepIndex(currentStepIndex - 1);
  }, [currentStepIndex, isFirstStep]);

  return (
    <Dialog
      onClose={handleClose}
      open={isOpened}
      paperClassName={cx(classes.root, classes[currentStepIndex])}
      closeButtonClassName={classes.closeButton}
    >
      <div className={cx(classes.stepWrapper)}>
        <div className={classes.content}>
          <Typography variant="h6" className={classes.title}>
            {stepContent[currentStepIndex].title}
          </Typography>
          <div className={classes.description}>
            {stepContent[currentStepIndex].description}
          </div>
          <Button
            className={classes.link}
            href={stepContent[currentStepIndex].href}
            target="_blank"
            variant="text"
          >
            {stepContent[currentStepIndex].link}
          </Button>
        </div>
        <div className={classes.footer}>
          <Button
            className={classes.backButton}
            onClick={previousStep}
            disabled={isFirstStep}
            variant="outlined"
          >
            {t('projects.onboarding.back')}
          </Button>
          {t('projects.onboarding.stepper', { currentStepNumber, stepsCount })}
          <Button className={classes.forwardButton} onClick={nextStep}>
            {isLastStep
              ? t('projects.onboarding.done')
              : t('projects.onboarding.next')}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
