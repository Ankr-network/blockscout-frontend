import { useMemo } from 'react';
import {
  Step,
  StepLabel,
  Stepper as MuiStepper,
  Typography,
} from '@mui/material';
import { Check } from '@ankr.com/ui';

import { NewProjectStep } from 'domains/projects/types';

import { Connector, useStepperStyles } from './useStepperStyles';
import { getSteps } from './StepperUtils';

interface StepperProps {
  step: NewProjectStep;
  className?: string;
}

export const Stepper = ({ step: activeStep, className }: StepperProps) => {
  const { classes, cx } = useStepperStyles();

  const steps = useMemo(() => getSteps(), []);

  return (
    <MuiStepper
      activeStep={activeStep - 1}
      className={cx(classes.root, className)}
      alternativeLabel
      connector={<Connector />}
    >
      {steps.map(({ step, label }) => {
        return (
          <Step
            key={step}
            completed={activeStep > step}
            active={activeStep === step}
          >
            <StepLabel
              classes={{
                iconContainer: classes.iconContainer,
                label: classes.label,
              }}
            >
              <Typography noWrap className={classes.text}>
                {activeStep > step && <Check className={classes.check} />}
                <span className={classes.step}>{step + 1}.</span>
                {label}
              </Typography>
            </StepLabel>
          </Step>
        );
      })}
    </MuiStepper>
  );
};
