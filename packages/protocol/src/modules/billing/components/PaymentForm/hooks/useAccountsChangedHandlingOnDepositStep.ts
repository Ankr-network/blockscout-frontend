import { useCallback } from 'react';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';
import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';

export interface IUseAccountChangedHandlingOnDepositStep {
  currentDepositStatus?: ECryptoDepositStepStatus;
  currentStep: ECryptoDepositStep;
  handleCryptoPaymentSummaryDialogOpen: () => void;
  isCryptoPaymentDepositDialogOpened: boolean;
  onCryptoPaymentDepositDialogClose: () => void;
  setIsAccountChangedOnDepositStep: (isChanged: boolean) => void;
}

// This hook contains the logic for handling the case when a user switches
// to another account in wallet during the payment flow.
// In this case the user should be redirected to the summary step
export const useAccountChangedHandlingOnDepositStep = ({
  currentDepositStatus,
  currentStep,
  handleCryptoPaymentSummaryDialogOpen,
  isCryptoPaymentDepositDialogOpened,
  onCryptoPaymentDepositDialogClose,
  setIsAccountChangedOnDepositStep,
}: IUseAccountChangedHandlingOnDepositStep) => {
  const onAccountsChanged = useCallback(() => {
    const isApprovalStep = currentStep === ECryptoDepositStep.Approval;

    const isDepositStep = currentStep === ECryptoDepositStep.Deposit;

    const isDepositStepPending =
      currentDepositStatus === ECryptoDepositStepStatus.Pending;

    // We should move the user to the summary step if the dialog is opened
    // and at any approval step status or at any deposit step status except pending
    const shouldMoveToSummaryStep =
      isCryptoPaymentDepositDialogOpened &&
      (isApprovalStep || (isDepositStep && !isDepositStepPending));

    if (shouldMoveToSummaryStep) {
      setIsAccountChangedOnDepositStep(true);
      onCryptoPaymentDepositDialogClose();

      handleCryptoPaymentSummaryDialogOpen();
    }
  }, [
    currentDepositStatus,
    currentStep,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentDepositDialogOpened,
    onCryptoPaymentDepositDialogClose,
    setIsAccountChangedOnDepositStep,
  ]);

  useConnectedAddress({ onAccountsChanged });
};
