import React from 'react';
import { Typography } from '@material-ui/core';

import { tHTML } from 'modules/i18n/utils/intl';
import { WithdrawStep } from 'domains/account/actions/withdraw/const';

interface IStepperTitleProps {
  step: WithdrawStep;
  className: string;
  hasError?: boolean;
}

export const StepperTitle = ({
  step,
  className,
  hasError,
}: IStepperTitleProps) => {
  return (
    <Typography
      variant={step === WithdrawStep.start ? 'body1' : 'h3'}
      className={className}
    >
      {hasError && step === WithdrawStep.waitTransactionConfirming
        ? tHTML(`withdraw-steps.step-content.${step}-error`)
        : tHTML(`withdraw-steps.step-content.${step}`)}
    </Typography>
  );
};
