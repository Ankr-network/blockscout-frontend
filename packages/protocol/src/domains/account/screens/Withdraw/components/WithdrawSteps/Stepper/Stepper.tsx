import React from 'react';
import { Step, StepLabel, Stepper as MuiStepper } from '@material-ui/core';

import { WithdrawStep } from 'modules/auth/actions/fetchWithdrawStatus';

interface IStepperProps {
  step: WithdrawStep;
  className?: string;
}

export const Stepper = ({ step, className }: IStepperProps) => {
  return (
    <MuiStepper activeStep={step} nonLinear className={className}>
      <Step key={WithdrawStep.start} completed={step >= WithdrawStep.start}>
        <StepLabel />
      </Step>
      <Step key={WithdrawStep.amount} completed={step >= WithdrawStep.amount}>
        <StepLabel />
      </Step>
      <Step
        key={WithdrawStep.waitTransactionConfirming}
        completed={step >= WithdrawStep.waitTransactionConfirming}
      >
        <StepLabel />
      </Step>
      <Step key={WithdrawStep.done} completed={step >= WithdrawStep.done}>
        <StepLabel />
      </Step>
    </MuiStepper>
  );
};
