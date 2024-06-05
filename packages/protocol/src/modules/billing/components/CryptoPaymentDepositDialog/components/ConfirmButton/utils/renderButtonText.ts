import { t } from '@ankr.com/common';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';

export interface IRenderButtonTextProps {
  activeStep: ECryptoDepositStep;
  isPending: boolean;
  isConfirmationBlocksWaiting: boolean;
  status: ECryptoDepositStepStatus;
  isWrongNetwork: boolean;
}

export const renderButtonText = ({
  activeStep,
  isPending,
  status,
  isConfirmationBlocksWaiting,
  isWrongNetwork,
}: IRenderButtonTextProps) => {
  if (isWrongNetwork) {
    return t(
      'account.crypto-payment-deposit-dialog.confirm-button.switch-network',
    );
  }

  if (isConfirmationBlocksWaiting) {
    return t('account.crypto-payment-deposit-dialog.confirm-button.waiting');
  }

  if (isPending) {
    return t('account.crypto-payment-deposit-dialog.confirm-button.pending');
  }

  const hasError = status === ECryptoDepositStepStatus.Error;

  if (hasError) {
    return t('account.crypto-payment-deposit-dialog.confirm-button.error');
  }

  const isApprovalStep = activeStep === ECryptoDepositStep.Approval;

  if (isApprovalStep) {
    return t('account.crypto-payment-deposit-dialog.confirm-button.approval');
  }

  return t('account.crypto-payment-deposit-dialog.confirm-button.deposit');
};
