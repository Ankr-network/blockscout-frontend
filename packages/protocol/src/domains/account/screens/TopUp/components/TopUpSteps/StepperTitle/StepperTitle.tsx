import React from 'react';
import { Typography } from '@material-ui/core';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import MetamaskIcon from './assets/metamask.svg';

interface IStepperTitleProps {
  step: TopUpStep;
  className: string;
  amount?: string;
  hasError?: boolean;
}

export const StepperTitle = ({
  step,
  className,
  amount,
  hasError,
}: IStepperTitleProps) => {
  return (
    <Typography
      variant={step === TopUpStep.start ? 'body1' : 'h3'}
      className={className}
    >
      {hasError && step === TopUpStep.waitTransactionConfirming
        ? tHTML(`top-up-steps.step-content.${step}-error`)
        : tHTML(`top-up-steps.step-content.${step}`, {
            src: MetamaskIcon,
            alt: t('top-up-steps.metamask'),
            amount,
          })}
    </Typography>
  );
};
