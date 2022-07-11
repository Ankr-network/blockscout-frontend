import React from 'react';
import { Typography } from '@material-ui/core';

import { tHTML } from 'modules/i18n/utils/intl';
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
