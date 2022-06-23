import React from 'react';
import { Step, StepLabel, Stepper as MuiStepper } from '@material-ui/core';

import { WithdrawStep } from 'domains/account/actions/withdraw/const';

interface IStepperProps {
  step: WithdrawStep;
  className?: string;
}

export const Stepper = ({ step, className }: IStepperProps) => {
  return (
    <MuiStepper activeStep={step - 1} nonLinear className={className}>
      <Step
        key={WithdrawStep.withdraw}
        completed={step >= WithdrawStep.withdraw}
      >
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
