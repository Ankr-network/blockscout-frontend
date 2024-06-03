import { EBlockchain } from 'multirpc-sdk';
import { useMemo } from 'react';

import {
  ECryptoDepositStep,
  ECryptoDepositStepStatus,
  ECurrency,
  IFeeDetails,
} from 'modules/payments/types';
import { defaultFeeDetails } from 'modules/payments/const';
import { useNetworkGuard } from 'modules/common/hooks/useNetworkGuard';

import { ICryptoPaymentDepositDialogProps } from '../types';
import { getCompletedStep } from '../utils/getCompletedStep';
import { getErroredStep } from '../utils/getErroredStep';
import { getStatus } from '../utils/getStatus';
import { isPending } from '../utils/isPending';
import { useConfirmButtonClickHandler } from './useConfirmButtonClickHandler';

export interface IUseCryptoPaymentDepositDialogProps {
  allowance: number;
  allowanceError?: string;
  allowanceFeeDetails?: IFeeDetails;
  allowanceStepStatus: ECryptoDepositStepStatus;
  allowanceTxHash?: string;
  amount: number;
  amountUsd: number;
  currency: ECurrency;
  depositError?: string;
  depositFeeDetails?: IFeeDetails;
  depositStepStatus?: ECryptoDepositStepStatus;
  depositTxHash?: string;
  handleDeposit: () => Promise<void>;
  handleDiscardTx: () => void;
  handleResetAllowanceSending: () => void;
  handleSendAllowance: () => void;
  isAllowanceLoading: boolean;
  isAllowanceSent: boolean;
  isCryptoPaymentDepositDialogOpened: boolean;
  isOngoingTx: boolean;
  network: EBlockchain;
  onCheckAllowanceButtonClick: () => Promise<void>;
  onClose: () => void;
  step: ECryptoDepositStep;
}

export const useCryptoPaymentDepositDialog = ({
  allowance,
  allowanceError,
  allowanceFeeDetails = defaultFeeDetails,
  allowanceStepStatus,
  allowanceTxHash,
  amount,
  amountUsd,
  currency,
  depositError,
  depositFeeDetails = defaultFeeDetails,
  depositStepStatus,
  depositTxHash,
  handleDeposit,
  handleDiscardTx,
  handleSendAllowance,
  isAllowanceLoading,
  isAllowanceSent,
  isCryptoPaymentDepositDialogOpened,
  isOngoingTx,
  network,
  onCheckAllowanceButtonClick,
  onClose,
  step,
}: IUseCryptoPaymentDepositDialogProps): ICryptoPaymentDepositDialogProps => {
  const { isWrongNetwork, handleSwitchNetwork, isSwitchNetworkLoading } =
    useNetworkGuard(network);

  const { onConfirmButtonClick } = useConfirmButtonClickHandler({
    allowanceStepStatus,
    handleDeposit,
    handleSendAllowance,
    handleSwitchNetwork,
    isWrongNetwork,
    network,
  });

  return useMemo(
    (): ICryptoPaymentDepositDialogProps => ({
      activeStep: step,
      allowance,
      allowanceError,
      allowanceFeeDetails,
      allowanceStepStatus,
      allowanceTxHash,
      amount,
      amountUsd,
      completedStep: getCompletedStep({ allowanceStepStatus, step }),
      currency,
      depositError,
      depositFeeDetails,
      depositStepStatus,
      depositTxHash,
      erroredStep: getErroredStep({ allowanceStepStatus }),
      hasMinimizeIcon: isOngoingTx && !depositError,
      isAllowanceLoading,
      isAllowanceSent,
      isPending: isPending({
        allowanceStepStatus,
        depositStepStatus,
        isAllowanceLoading,
        isSwitchNetworkLoading,
        step,
      }),
      isWrongNetwork,
      network,
      onCheckAllowanceButtonClick,
      onClose,
      onConfirmButtonClick,
      onDiscardButtonClick: handleDiscardTx,
      open: isCryptoPaymentDepositDialogOpened,
      shouldRevokeAllowance:
        currency === ECurrency.USDT && allowance !== 0 && allowance < amount,
      status: getStatus({ allowanceStepStatus, depositStepStatus, step }),
    }),
    [
      allowance,
      allowanceError,
      allowanceFeeDetails,
      allowanceStepStatus,
      allowanceTxHash,
      amount,
      amountUsd,
      currency,
      depositError,
      depositFeeDetails,
      depositStepStatus,
      depositTxHash,
      handleDiscardTx,
      isAllowanceLoading,
      isAllowanceSent,
      isCryptoPaymentDepositDialogOpened,
      isOngoingTx,
      isSwitchNetworkLoading,
      isWrongNetwork,
      network,
      onCheckAllowanceButtonClick,
      onClose,
      onConfirmButtonClick,
      step,
    ],
  );
};
