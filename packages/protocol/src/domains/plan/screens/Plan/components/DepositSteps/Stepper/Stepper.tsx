import React from 'react';
import { Step, StepLabel, Stepper as MuiStepper } from '@material-ui/core';
import { DepositStep } from 'modules/auth/actions/fetchDepositStatus';

interface IStepperProps {
  step: DepositStep;
  className?: string;
}

export const Stepper = ({ step, className }: IStepperProps) => {
  return (
    <MuiStepper activeStep={step} nonLinear className={className}>
      <Step key={DepositStep.start} completed={step >= DepositStep.start}>
        <StepLabel />
      </Step>
      <Step
        key={DepositStep.publicKey}
        completed={step >= DepositStep.publicKey}
      >
        <StepLabel />
      </Step>
      <Step
        key={DepositStep.allowance}
        completed={step >= DepositStep.allowance}
      >
        <StepLabel />
      </Step>
      <Step key={DepositStep.deposit} completed={step >= DepositStep.deposit}>
        <StepLabel />
      </Step>
      <Step
        key={DepositStep.waitTransactionConfirming}
        completed={step >= DepositStep.waitTransactionConfirming}
      >
        <StepLabel />
      </Step>
      <Step key={DepositStep.login} completed={step >= DepositStep.login}>
        <StepLabel />
      </Step>
    </MuiStepper>
  );
};
