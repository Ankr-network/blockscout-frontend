import React from 'react';
import { Typography } from '@material-ui/core';

import { tHTML } from 'modules/i18n/utils/intl';
import { WithdrawStep } from 'domains/auth/actions/fetchWithdrawStatus';

interface IStepperTitleProps {
  step: WithdrawStep;
  className: string;
}

export const StepperNotice = ({ step, className }: IStepperTitleProps) => {
  if (step === WithdrawStep.start || step === WithdrawStep.amount) {
    return null;
  }

  return (
    <Typography variant="h4" color="textSecondary" className={className}>
      {tHTML(`withdraw-steps.step-notice.${step}`)}
    </Typography>
  );
};
