import React from 'react';
import { Typography } from '@material-ui/core';

import { t, tHTML } from 'modules/i18n/utils/intl';
import { TopUpStep } from 'domains/account/actions/topUp/const';
import { IWalletMeta } from '@ankr.com/provider';

interface IStepperTitleProps {
  step: TopUpStep;
  className: string;
  amount?: string;
  hasError?: boolean;
  walletMeta?: IWalletMeta;
}

export const StepperTitle = ({
  step,
  className,
  amount,
  hasError,
  walletMeta,
}: IStepperTitleProps) => {
  return (
    <Typography
      variant={step === TopUpStep.start ? 'body1' : 'h3'}
      className={className}
    >
      {hasError && step === TopUpStep.waitTransactionConfirming
        ? tHTML(`top-up-steps.step-content.${step}-error`)
        : tHTML(`top-up-steps.step-content.${step}`, {
            src: walletMeta?.icon,
            alt: walletMeta?.name,
            name: walletMeta?.name,
            content:
              walletMeta?.id === 'walletconnect'
                ? t(`top-up-steps.step-content.wallet-connect`)
                : '',
            amount,
          })}
    </Typography>
  );
};
