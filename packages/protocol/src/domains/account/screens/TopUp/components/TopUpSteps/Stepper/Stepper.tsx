import React from 'react';
import { Step, StepLabel, Stepper as MuiStepper } from '@material-ui/core';

import { TopUpStep } from 'domains/account/actions/topUp/const';
import {
  Connector,
  useStyles,
} from 'domains/account/screens/Withdraw/components/WithdrawSteps/Stepper/StepperStyles';
import { ReactComponent as WarningIcon } from 'uiKit/Icons/warning-icon.svg';

interface IStepperProps {
  step: TopUpStep;
  className?: string;
  hasCredentials: boolean;
  hasError?: boolean;
}

export const Stepper = ({
  step,
  className,
  hasCredentials,
  hasError,
}: IStepperProps) => {
  const classes = useStyles();

  return (
    <MuiStepper
      activeStep={step - 1}
      nonLinear
      className={className}
      connector={hasError ? <Connector /> : undefined}
    >
      <Step key={TopUpStep.allowance} completed={step >= TopUpStep.allowance}>
        <StepLabel error={hasError} className={classes.root} />
      </Step>
      <Step key={TopUpStep.deposit} completed={step >= TopUpStep.deposit}>
        <StepLabel className={classes.root} error={hasError} />
      </Step>
      <Step
        key={TopUpStep.waitTransactionConfirming}
        completed={step >= TopUpStep.waitTransactionConfirming}
      >
        <StepLabel
          error={hasError}
          StepIconComponent={hasError ? WarningIcon : undefined}
          className={classes.root}
        />
      </Step>
      {!hasCredentials && (
        <Step key={TopUpStep.login} completed={step >= TopUpStep.login}>
          <StepLabel />
        </Step>
      )}
    </MuiStepper>
  );
};
