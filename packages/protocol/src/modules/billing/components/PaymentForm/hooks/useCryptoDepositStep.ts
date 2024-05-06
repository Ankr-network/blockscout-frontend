import { Dispatch, SetStateAction, useCallback } from 'react';
import { EBlockchain } from 'multirpc-sdk';

import { ECurrency, IFeeDetails } from 'modules/billing/types';
import { useTopUp } from 'domains/account/hooks/useTopUp';
import { useUSDAmountByCryptoAmount } from 'modules/billing/hooks/useUSDAmountByCryptoAmount';

import { useAccountChangedHandlingOnDepositStep } from './useAccountsChangedHandlingOnDepositStep';
import { useCryptoPaymentDepositDialog } from '../../CryptoPaymentDepositDialog';
import { useOneTimeDepositHandler } from './useOneTimeDepositHandler';
import { useOneTimeDialogState } from './useOneTimeDialogState';
import { useSendAllowanceHandler } from './useSendAllowanceHandler';

export interface IUseCryptoDepositStepProps {
  approvalFeeDetails: IFeeDetails;
  currency: ECurrency;
  depositFeeDetails: IFeeDetails;
  network: EBlockchain;
  handleCryptoPaymentDepositDialogOpen: () => void;
  handleCryptoPaymentSummaryDialogOpen: () => void;
  isCryptoPaymentDepositDialogOpened: boolean;
  onCryptoPaymentDepositDialogClose: () => void;
  onDepositSuccess: () => void;
  setIsAccountChangedOnDepositStep: Dispatch<SetStateAction<boolean>>;
}

export const useCryptoDepositStep = ({
  approvalFeeDetails,
  currency,
  depositFeeDetails,
  network,
  handleCryptoPaymentDepositDialogOpen,
  handleCryptoPaymentSummaryDialogOpen,
  isCryptoPaymentDepositDialogOpened,
  onCryptoPaymentDepositDialogClose,
  onDepositSuccess,
  setIsAccountChangedOnDepositStep,
}: IUseCryptoDepositStepProps) => {
  const {
    amountToDeposit,
    depositErrorMessage: depositError,
    handleResetTopUpTransaction,
    sendAllowanceErrorMessage: sendAllowanceError,
  } = useTopUp();

  const {
    approvalStatus,
    depositStatus,
    moveToAwaitingDeposit,
    moveToDeposit,
    setApprovalStatus,
    setDepositStatus,
    setStartApproval,
    step,
  } = useOneTimeDialogState();

  const handleRejectAllowance = useCallback(() => {
    handleResetTopUpTransaction();
    onCryptoPaymentDepositDialogClose();
    setStartApproval();
  }, [
    handleResetTopUpTransaction,
    onCryptoPaymentDepositDialogClose,
    setStartApproval,
  ]);

  const { onDeposit } = useOneTimeDepositHandler({
    onCryptoPaymentDepositDialogClose,
    onDepositSuccess,
    setDepositStatus,
  });

  const { handleSendAllowance } = useSendAllowanceHandler({
    moveToAwaitingDeposit,
    moveToDeposit,
    setApprovalStatus,
    setStartApproval,
  });

  // to handle the case when a user has switched his account in wallet
  // during the payment flow
  useAccountChangedHandlingOnDepositStep({
    depositStatus,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentDepositDialogOpened,
    onCryptoPaymentDepositDialogClose,
    setIsAccountChangedOnDepositStep,
    step,
    currency,
  });

  const { amountUsd, isLoading: isLoadingRate } = useUSDAmountByCryptoAmount({
    amount: Number(amountToDeposit),
    currency,
  });

  const cryptoDepositDialogProps = useCryptoPaymentDepositDialog({
    amount: amountToDeposit.toNumber(),
    amountUsd,
    approvalFeeDetails,
    approvalStatus,
    currency,
    depositError,
    depositFeeDetails,
    network,
    depositStatus,
    handleCryptoPaymentDepositDialogOpen,
    handleRejectAllowance,
    handleSendAllowance,
    isCryptoPaymentDepositDialogOpened,
    onCryptoPaymentDepositDialogClose,
    onDeposit,
    sendAllowanceError,
    step,
  });

  return {
    isLoadingRate,
    cryptoDepositDialogProps,
    handleCryptoPaymentDepositDialogOpen,
  };
};
