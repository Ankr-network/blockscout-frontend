import { useEffect } from 'react';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
  ICryptoTransaction,
} from 'modules/payments/types';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';
import { useFetchAllowance } from 'modules/payments/hooks/useFetchAllowance';

export interface IUseAccountChangedHandlingOnDepositStep {
  depositStepStatus?: ECryptoDepositStepStatus;
  handleCryptoPaymentDepositDialogClose: () => void;
  handleCryptoPaymentSummaryDialogOpen: () => void;
  isCryptoPaymentDepositDialogOpened: boolean;
  setIsAccountChangedOnDepositStep: (isChanged: boolean) => void;
  step: ECryptoDepositStep;
  tx: ICryptoTransaction;
}

// This hook contains the logic for handling the case when a user switches
// to another account in wallet during the payment flow.
// In this case the user should be redirected to the summary step
export const useAccountChangedHandlingOnDepositStep = ({
  depositStepStatus,
  handleCryptoPaymentDepositDialogClose,
  handleCryptoPaymentSummaryDialogOpen,
  isCryptoPaymentDepositDialogOpened,
  setIsAccountChangedOnDepositStep,
  step,
  tx,
}: IUseAccountChangedHandlingOnDepositStep) => {
  const { currency, network } = tx;

  const { walletAddress: connectedAddress } = useWalletAddress();

  const { handleResetAllowanceFetching } = useFetchAllowance({
    currency,
    network,
    skipFetching: true,
  });

  useEffect(
    () => {
      const isAllowanceStep = step === ECryptoDepositStep.Allowance;

      const isDepositStep = step === ECryptoDepositStep.Deposit;

      const isDepositStepPending =
        depositStepStatus === ECryptoDepositStepStatus.Pending;

      // We should move the user to the summary step if the dialog is opened
      // and at any approval step status or at any deposit step status except pending
      const shouldMoveToSummaryStep =
        isCryptoPaymentDepositDialogOpened &&
        (isAllowanceStep || (isDepositStep && !isDepositStepPending));

      if (shouldMoveToSummaryStep) {
        setIsAccountChangedOnDepositStep(true);

        handleCryptoPaymentDepositDialogClose();

        handleResetAllowanceFetching();

        handleCryptoPaymentSummaryDialogOpen();
      }
    },
    // We should only track connectedAddress change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [connectedAddress],
  );
};
