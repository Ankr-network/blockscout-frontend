import {
  Stepper as MuiStepper,
  Step,
  StepLabel,
  Typography,
} from '@mui/material';
import { t } from '@ankr.com/common';

import { ECryptoDepositStep } from 'modules/billing/types';

import { Connector } from './components/Connector';
import { StepIcon } from './components/StepIcon';
import { steps } from './const';
import { useStepperStyles } from './useStepperStyles';

export interface IStepperProps {
  activeStep: ECryptoDepositStep;
  className?: string;
  completedStep?: ECryptoDepositStep;
  erroredStep?: ECryptoDepositStep;
}

export const Stepper = ({
  activeStep,
  className,
  completedStep,
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
          completed={
            step === completedStep || (!!completedStep && step < completedStep)
          }
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
