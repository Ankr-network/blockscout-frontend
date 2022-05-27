import React from 'react';
import { Typography } from '@material-ui/core';

import { tHTML } from 'modules/i18n/utils/intl';
import { TopUpStep } from 'domains/account/actions/topUp/const';

interface IStepperTitleProps {
  step: TopUpStep;
  className: string;
}

export const StepperNotice = ({ step, className }: IStepperTitleProps) => {
  if (step === TopUpStep.start) {
    return null;
  }

  return (
    <Typography variant="h4" color="textSecondary" className={className}>
      {tHTML(`top-up-steps.step-notice.${step}`)}
    </Typography>
  );
};
