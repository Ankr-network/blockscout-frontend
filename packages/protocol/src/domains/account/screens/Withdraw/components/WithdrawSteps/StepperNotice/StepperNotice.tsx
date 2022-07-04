import React from 'react';
import { Typography } from '@material-ui/core';

import { tHTML } from 'modules/i18n/utils/intl';
import { WithdrawStep } from 'domains/account/actions/withdraw/const';

interface IStepperTitleProps {
  step: WithdrawStep;
  className: string;
  hasError?: boolean;
}

export const StepperNotice = ({
  step,
  className,
  hasError,
}: IStepperTitleProps) => {
  if (step === WithdrawStep.start || step === WithdrawStep.withdraw) {
    return null;
  }

  return (
    <Typography variant="h4" color="textSecondary" className={className}>
      {hasError && step === WithdrawStep.waitTransactionConfirming
        ? tHTML(`withdraw-steps.step-notice.${step}-error`)
        : tHTML(`withdraw-steps.step-notice.${step}`)}
    </Typography>
  );
};
