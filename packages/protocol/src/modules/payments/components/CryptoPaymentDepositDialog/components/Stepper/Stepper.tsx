import {
  Stepper as MuiStepper,
  Step,
  StepLabel,
  Typography,
} from '@mui/material';
import { t } from '@ankr.com/common';

import { ECryptoDepositStep } from 'modules/payments/types';

import { Connector } from './components/Connector';
import { StepIcon } from './components/StepIcon';
import { steps } from './const';
import { useStepperStyles } from './useStepperStyles';

export interface IStepperProps {
  activeStep: ECryptoDepositStep;
  className?: string;
  completedSteps: ECryptoDepositStep[];
  erroredStep?: ECryptoDepositStep;
}

export const Stepper = ({
  activeStep,
  className,
  completedSteps,
  erroredStep,
}: IStepperProps) => {
  const { classes } = useStepperStyles();

  return (
    <MuiStepper
      activeStep={activeStep}
      alternativeLabel
      className={className}
      connector={<Connector />}
    >
      {steps.map(({ inlKey, step }) => (
        <Step
          active={step === activeStep}
          completed={completedSteps.includes(step)}
          key={step}
        >
          <StepLabel
            StepIconComponent={StepIcon}
            classes={classes}
            error={step === erroredStep}
          >
            <Typography variant="subtitle3">{t(inlKey)}</Typography>
          </StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
};
