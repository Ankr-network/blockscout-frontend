import { Dispatch, SetStateAction, useCallback } from 'react';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
} from 'modules/billing/types';
import { fetchMyAllowance } from 'domains/account/actions/fetchMyAllowance';
import { useConnectedAddress } from 'modules/billing/hooks/useConnectedAddress';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';

export interface IUseAccountChangedHandlingOnDepositStep {
  currentDepositStatus?: ECryptoDepositStepStatus;
  currentStep: ECryptoDepositStep;
  handleCryptoPaymentSummaryDialogOpen: () => void;
  isCryptoPaymentDepositDialogOpened: boolean;
  onCryptoPaymentDepositDialogClose: () => void;
  setIsAccountChangedOnDepositStep: Dispatch<SetStateAction<boolean>>;
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
  const [, , resetMyAllowance] = useQueryEndpoint(fetchMyAllowance);

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

      resetMyAllowance();

      handleCryptoPaymentSummaryDialogOpen();
    } else {
      setIsAccountChangedOnDepositStep(false);
    }
  }, [
    currentDepositStatus,
    currentStep,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentDepositDialogOpened,
    onCryptoPaymentDepositDialogClose,
    resetMyAllowance,
    setIsAccountChangedOnDepositStep,
  ]);

  useConnectedAddress({ onAccountsChanged });
};
