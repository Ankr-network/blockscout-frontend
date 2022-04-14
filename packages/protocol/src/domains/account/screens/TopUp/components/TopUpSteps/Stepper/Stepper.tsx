import React from 'react';
import { Step, StepLabel, Stepper as MuiStepper } from '@material-ui/core';
import { TopUpStep } from 'modules/auth/actions/fetchTopUpStatus';

interface IStepperProps {
  step: TopUpStep;
  className?: string;
}

export const Stepper = ({ step, className }: IStepperProps) => {
  return (
    <MuiStepper activeStep={step} nonLinear className={className}>
      <Step key={TopUpStep.start} completed={step >= TopUpStep.start}>
        <StepLabel />
      </Step>
      <Step key={TopUpStep.publicKey} completed={step >= TopUpStep.publicKey}>
        <StepLabel />
      </Step>
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
      <Step key={TopUpStep.done} completed={step >= TopUpStep.done}>
        <StepLabel />
      </Step>
    </MuiStepper>
  );
};
