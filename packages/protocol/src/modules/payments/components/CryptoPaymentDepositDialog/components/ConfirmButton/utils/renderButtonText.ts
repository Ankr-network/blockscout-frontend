import { t } from '@ankr.com/common';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/payments/types';

export interface IRenderButtonTextProps {
  activeStep: ECryptoDepositStep;
  isDepositConfirming: boolean;
  isNetworkWrong?: boolean;
  isPending: boolean;
  status: ECryptoDepositStepStatus;
}

export const renderButtonText = ({
  activeStep,
  isDepositConfirming,
  isNetworkWrong,
  isPending,
  status,
}: IRenderButtonTextProps) => {
  if (isNetworkWrong) {
    return t(
      'account.crypto-payment-deposit-dialog.confirm-button.switch-network',
    );
  }

  if (isDepositConfirming) {
    return t('account.crypto-payment-deposit-dialog.confirm-button.waiting');
  }

  if (isPending) {
    return t('account.crypto-payment-deposit-dialog.confirm-button.pending');
  }

  const hasError = status === ECryptoDepositStepStatus.Error;

  if (hasError) {
    return t('account.crypto-payment-deposit-dialog.confirm-button.error');
  }

  const isAllowanceStep = activeStep === ECryptoDepositStep.Allowance;

  if (isAllowanceStep) {
    return t('account.crypto-payment-deposit-dialog.confirm-button.approval');
  }

  return t('account.crypto-payment-deposit-dialog.confirm-button.deposit');
};
