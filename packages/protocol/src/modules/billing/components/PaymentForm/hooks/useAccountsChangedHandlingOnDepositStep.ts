import { Dispatch, SetStateAction, useEffect } from 'react';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
  ECurrency,
} from 'modules/billing/types';
import { fetchMyAllowanceAnkr } from 'domains/account/actions/fetchMyAllowanceAnkr';
import { fetchMyAllowanceUsdc } from 'domains/account/actions/fetchMyAllowanceUsdc';
import { fetchMyAllowanceUsdt } from 'domains/account/actions/fetchMyAllowanceUsdt';
import { useQueryEndpoint } from 'hooks/useQueryEndpoint';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';

export interface IUseAccountChangedHandlingOnDepositStep {
  depositStatus?: ECryptoDepositStepStatus;
  handleCryptoPaymentSummaryDialogOpen: () => void;
  isCryptoPaymentDepositDialogOpened: boolean;
  onCryptoPaymentDepositDialogClose: () => void;
  setIsAccountChangedOnDepositStep: Dispatch<SetStateAction<boolean>>;
  step: ECryptoDepositStep;
  currency: ECurrency;
}

// This hook contains the logic for handling the case when a user switches
// to another account in wallet during the payment flow.
// In this case the user should be redirected to the summary step
export const useAccountChangedHandlingOnDepositStep = ({
  depositStatus,
  handleCryptoPaymentSummaryDialogOpen,
  isCryptoPaymentDepositDialogOpened,
  onCryptoPaymentDepositDialogClose,
  setIsAccountChangedOnDepositStep,
  step,
  currency,
}: IUseAccountChangedHandlingOnDepositStep) => {
  const [, , resetMyAllowanceAnkr] = useQueryEndpoint(fetchMyAllowanceAnkr);
  const [, , resetMyAllowanceUsdt] = useQueryEndpoint(fetchMyAllowanceUsdt);
  const [, , resetMyAllowanceUsdc] = useQueryEndpoint(fetchMyAllowanceUsdc);

  const { walletAddress: connectedAddress } = useWalletAddress();

  useEffect(
    () => {
      const isApprovalStep = step === ECryptoDepositStep.Approval;

      const isDepositStep = step === ECryptoDepositStep.Deposit;

      const isDepositStepPending =
        depositStatus === ECryptoDepositStepStatus.Pending;

      // We should move the user to the summary step if the dialog is opened
      // and at any approval step status or at any deposit step status except pending
      const shouldMoveToSummaryStep =
        isCryptoPaymentDepositDialogOpened &&
        (isApprovalStep || (isDepositStep && !isDepositStepPending));

      if (shouldMoveToSummaryStep) {
        setIsAccountChangedOnDepositStep(true);

        onCryptoPaymentDepositDialogClose();

        if (currency === ECurrency.USDT) {
          resetMyAllowanceUsdt();
        }

        if (currency === ECurrency.USDC) {
          resetMyAllowanceUsdc();
        }

        if (currency === ECurrency.ANKR) {
          resetMyAllowanceAnkr();
        }

        handleCryptoPaymentSummaryDialogOpen();
      }
    },
    // We should only track connectedAddress change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [connectedAddress],
  );
};
