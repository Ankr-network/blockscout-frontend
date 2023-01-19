import { Step, StepLabel, Stepper as MuiStepper } from '@mui/material';
import { StepError } from '@ankr.com/ui';

import { TopUpStep } from 'domains/account/actions/topUp/const';
import { Connector, NormalConnector } from './StepperStyles';

interface IStepperProps {
  step: TopUpStep;
  className?: string;
  hasPrivateAccess: boolean;
  hasError?: boolean;
}

export const Stepper = ({
  step,
  className,
  hasPrivateAccess,
  hasError,
}: IStepperProps) => {
  return (
    <MuiStepper
      activeStep={step - 1}
      nonLinear
      className={className}
      connector={hasError ? <Connector /> : <NormalConnector />}
    >
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
        <StepLabel
          error={hasError}
          StepIconComponent={hasError ? StepError : undefined}
        />
      </Step>
      {!hasPrivateAccess && (
        <Step key={TopUpStep.login} completed={step >= TopUpStep.login}>
          <StepLabel />
        </Step>
      )}
    </MuiStepper>
  );
};
