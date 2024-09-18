import { useCallback } from 'react';

import { ICryptoTransaction } from 'modules/payments/types';
import { THandleNetworkSwitch } from 'modules/common/hooks/useNetworkGuard';
import { defaultCryptoTx } from 'modules/payments/const';
import { useCryptoPaymentOptions } from 'modules/payments/hooks/useCryptoPaymentOptions';
import { useUsdAmountByCryptoAmount } from 'modules/payments/hooks/useUsdAmountByCryptoAmount';

import { useCryptoPaymentDepositDialog } from '../../CryptoPaymentDepositDialog';
import { useCryptoPaymentDepositHandler } from './useCryptoPaymentDepositHandler';
import { useCryptoPaymentDepositStepAllowance } from './useCryptoPaymentDepositStepAllowance';
import { useCryptoPaymentDepositStepReset } from './useCryptoPaymentDepositStepReset';
import { useCryptoPaymentDepositStepState } from './useCryptoPaymentDepositStepState';

export interface IUseCryptoPaymentDepositStepProps {
  handleCryptoPaymentDepositDialogClose: () => void;
  handleCryptoPaymentSuccessDialogOpen: () => void;
  handleNetworkReset?: () => void;
  handleNetworkSwitch?: THandleNetworkSwitch;
  handleResetTxId?: () => void;
  isCryptoPaymentDepositDialogOpened: boolean;
  isNetworkSwitching?: boolean;
  isNetworkWrong?: boolean;
  tx: ICryptoTransaction | undefined;
}

export const useCryptoPaymentDepositStep = ({
  handleCryptoPaymentDepositDialogClose,
  handleCryptoPaymentSuccessDialogOpen,
  handleNetworkReset,
  handleNetworkSwitch,
  handleResetTxId,
  isCryptoPaymentDepositDialogOpened,
  isNetworkSwitching,
  isNetworkWrong,
  tx = defaultCryptoTx,
}: IUseCryptoPaymentDepositStepProps) => {
  const {
    allowanceAmount: allowance = 0,
    allowanceError,
    allowanceFeeDetailsEstimated,
    allowanceFeeDetailsPaid,
    allowanceTxHash,
    amount,
    currency,
    depositError,
    depositFeeDetailsEstimated,
    depositFeeDetailsPaid,
    depositTxHash,
    isDepositConfirming,
    isDepositing,
    network,
  } = tx;

  const { confirmationBlocksNumber: confirmationBlocks } =
    useCryptoPaymentOptions({ currency, network });

  const { allowanceStepStatus, depositStepStatus, isOngoingTx, step } =
    useCryptoPaymentDepositStepState({ tx });

  const { handleDeposit } = useCryptoPaymentDepositHandler({
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentSuccessDialogOpen,
    tx,
  });

  const {
    handleFetchAllowance,
    handleResetAllowanceSending,
    handleSendAllowance,
    isAllowanceLoading,
    isAllowanceSent,
  } = useCryptoPaymentDepositStepAllowance({ tx });

  const { amountUsd } = useUsdAmountByCryptoAmount({ amount, currency });

  const { handleRemoveTx, handleResetDepositStep } =
    useCryptoPaymentDepositStepReset({
      handleCryptoPaymentDepositDialogClose,
      handleCryptoPaymentSuccessDialogOpen,
      handleNetworkReset,
      handleResetTxId,
      tx,
    });

  const onClose = useCallback(() => {
    handleResetDepositStep();

    if (!isDepositing && !isDepositConfirming) {
      handleRemoveTx();
    }

    handleCryptoPaymentDepositDialogClose();
  }, [
    handleCryptoPaymentDepositDialogClose,
    handleRemoveTx,
    handleResetDepositStep,
    isDepositConfirming,
    isDepositing,
  ]);

  const handleDiscardTx = useCallback(() => {
    handleResetDepositStep();

    handleRemoveTx();

    handleCryptoPaymentDepositDialogClose();
  }, [
    handleCryptoPaymentDepositDialogClose,
    handleRemoveTx,
    handleResetDepositStep,
  ]);

  const cryptoPaymentDepositDialogProps = useCryptoPaymentDepositDialog({
    allowance,
    allowanceError,
    allowanceFeeDetails:
      allowanceFeeDetailsPaid || allowanceFeeDetailsEstimated,
    allowanceStepStatus,
    allowanceTxHash,
    amount,
    amountUsd,
    confirmationBlocks,
    currency,
    depositError,
    depositFeeDetails: depositFeeDetailsPaid || depositFeeDetailsEstimated,
    depositStepStatus,
    depositTxHash,
    handleDeposit,
    handleDiscardTx,
    handleFetchAllowance,
    handleNetworkSwitch,
    handleResetAllowanceSending,
    handleSendAllowance,
    isAllowanceLoading,
    isAllowanceSent,
    isCryptoPaymentDepositDialogOpened,
    isNetworkSwitching,
    isNetworkWrong,
    isOngoingTx,
    network,
    onClose,
    step,
  });

  return { cryptoPaymentDepositDialogProps };
};
