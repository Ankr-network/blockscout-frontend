import React from 'react';
import { Step, StepLabel, Stepper as MuiStepper } from '@material-ui/core';

import { WithdrawStep } from 'domains/account/actions/withdraw/const';
import { useStyles, Connector } from './StepperStyles';
import { ReactComponent as WarningIcon } from 'uiKit/Icons/warning-icon.svg';

interface IStepperProps {
  step: WithdrawStep;
  className?: string;
  hasError: boolean;
}

export const Stepper = ({ step, className, hasError }: IStepperProps) => {
  const classes = useStyles();

  return (
    <MuiStepper
      activeStep={step - 1}
      nonLinear
      className={className}
      connector={hasError ? <Connector /> : undefined}
    >
      <Step
        key={WithdrawStep.withdraw}
        completed={step >= WithdrawStep.withdraw}
      >
        <StepLabel className={classes.root} error={hasError} />
      </Step>
      <Step
        key={WithdrawStep.waitTransactionConfirming}
        completed={step >= WithdrawStep.waitTransactionConfirming}
      >
        <StepLabel
          className={classes.root}
          error={hasError}
          StepIconComponent={hasError ? WarningIcon : undefined}
        />
      </Step>
      <Step key={WithdrawStep.done} completed={step >= WithdrawStep.done}>
        <StepLabel />
      </Step>
    </MuiStepper>
  );
};
