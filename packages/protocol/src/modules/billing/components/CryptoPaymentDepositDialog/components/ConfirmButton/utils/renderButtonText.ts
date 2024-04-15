import { t } from '@ankr.com/common';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';

export interface IRenderButtonTextProps {
  activeStep: ECryptoDepositStep;
  isPending: boolean;
  status: ECryptoDepositStepStatus;
}

export const renderButtonText = ({
  activeStep,
  isPending,
  status,
}: IRenderButtonTextProps) => {
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
