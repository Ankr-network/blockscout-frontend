import React from 'react';
import { Typography } from '@material-ui/core';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { getBlocksCount } from './StepperNoticeUtils';

interface IStepperTitleProps {
  step: TopUpStep;
  className: string;
}

const blocksCount = getBlocksCount();

export const StepperNotice = ({ step, className }: IStepperTitleProps) => {
  if (step === TopUpStep.start) {
    return null;
  }

  return (
    <Typography variant="h4" color="textSecondary" className={className}>
      {tHTML(`top-up-steps.step-notice.${step}`, {
        blocksCount,
        plural: blocksCount > 1 ? t(`top-up-steps.step-notice.plural`) : '',
      })}
    </Typography>
  );
};
