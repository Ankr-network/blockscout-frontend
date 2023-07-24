import { Typography } from '@mui/material';
import { tHTML } from '@ankr.com/common';

import { TopUpStep } from 'domains/account/actions/topUp/const';

interface IStepperTitleProps {
  step: TopUpStep;
  className: string;
  hasError?: boolean;
}

export const StepperNotice = ({
  step,
  className,
  hasError,
}: IStepperTitleProps) => {
  if (step === TopUpStep.start) {
    return null;
  }

  return (
    <Typography variant="h4" color="textSecondary" className={className}>
      {hasError && step === TopUpStep.waitTransactionConfirming
        ? tHTML(`top-up-steps.step-notice.${step}-error`)
        : tHTML(`top-up-steps.step-notice.${step}`)}
    </Typography>
  );
};
