import React from 'react';
import { Typography } from '@material-ui/core';

import { tHTML } from 'modules/i18n/utils/intl';
import { WithdrawStep } from 'domains/auth/actions/fetchWithdrawStatus';

interface IStepperTitleProps {
  step: WithdrawStep;
  className: string;
}

export const StepperTitle = ({ step, className }: IStepperTitleProps) => {
  return (
    <Typography
      variant={step === WithdrawStep.start ? 'body1' : 'h3'}
      className={className}
    >
      {tHTML(`withdraw-steps.step-content.${step}`)}
    </Typography>
  );
};
