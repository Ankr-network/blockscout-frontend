import React from 'react';
import { Step, StepLabel, Stepper as MuiStepper } from '@material-ui/core';

import { TopUpStep } from 'domains/account/actions/topUp/const';

interface IStepperProps {
  step: TopUpStep;
  className?: string;
  hasCredentials: boolean;
}

export const Stepper = ({ step, className, hasCredentials }: IStepperProps) => {
  return (
    <MuiStepper activeStep={step - 1} nonLinear className={className}>
      <Step key={TopUpStep.allowance} completed={step >= TopUpStep.allowance}>
        <StepLabel />
      </Step>
      <Step key={TopUpStep.deposit} completed={step >= TopUpStep.deposit}>
        <StepLabel />
      </Step>
      <Step
        key={TopUpStep.waitTransactionConfirming}
        completed={step >= TopUpStep.waitTransactionConfirming}
      >
        <StepLabel />
      </Step>
      {!hasCredentials && (
        <Step key={TopUpStep.login} completed={step >= TopUpStep.login}>
          <StepLabel />
        </Step>
      )}
    </MuiStepper>
  );
};
