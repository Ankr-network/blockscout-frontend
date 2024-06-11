import { useCallback } from 'react';

import { ICryptoTransaction } from 'modules/payments/types';
import { defaultCryptoTx } from 'modules/payments/const';
import { selectIsCryptoTxOngoing } from 'modules/payments/store/selectors';
import {
  setAllowanceAmount,
  setIsApproved,
} from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';
import { useFetchAllowance } from 'modules/payments/hooks/useFetchAllowance';
import { useUsdAmountByCryptoAmount } from 'modules/payments/hooks/useUsdAmountByCryptoAmount';

import { useCryptoPaymentDepositDialog } from '../../CryptoPaymentDepositDialog';
import { useCryptoPaymentDepositHandler } from './useCryptoPaymentDepositHandler';
import { useCryptoPaymentDepositStepReset } from './useCryptoPaymentDepositStepReset';
import { useCryptoPaymentDepositStepState } from './useCryptoPaymentDepositStepState';
import { useCryptoPaymentSendAllowanceHandler } from './useCryptoPaymentSendAllowanceHandler';

export interface IUseCryptoPaymentDepositStepProps {
  handleCryptoPaymentDepositDialogClose: () => void;
  isCryptoPaymentDepositDialogOpened: boolean;
  onDepositSuccess: () => void;
  tx: ICryptoTransaction | undefined;
}

export const useCryptoPaymentDepositStep = ({
  handleCryptoPaymentDepositDialogClose,
  isCryptoPaymentDepositDialogOpened,
  onDepositSuccess,
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
    from,
    id: txId,
    isDepositConfirming,
    isDepositing,
    network,
  } = tx;

  const isOngoingTx = useAppSelector(state =>
    selectIsCryptoTxOngoing(state, txId),
  );

  const { allowanceStepStatus, depositStepStatus, step } =
    useCryptoPaymentDepositStepState({ tx });

  const { handleDeposit } = useCryptoPaymentDepositHandler({
    handleCryptoPaymentDepositDialogClose,
    onDepositSuccess,
    tx,
  });

  const { handleResetAllowanceSending, handleSendAllowance, isAllowanceSent } =
    useCryptoPaymentSendAllowanceHandler({ tx });

  const {
    handleFetchAllowance: fetchAllowance,
    isLoading: isAllowanceLoading,
  } = useFetchAllowance({
    address: from,
    currency,
    network,
    skipFetching: true,
  });

  const dispatch = useAppDispatch();
  const handleFetchAllowance = useCallback(async () => {
    const { data: allowanceAmount = 0 } = await fetchAllowance();
    const isApproved = amount <= allowanceAmount;
    const id = txId;

    dispatch(setAllowanceAmount({ allowanceAmount, id }));
    dispatch(setIsApproved({ isApproved, id }));
  }, [amount, dispatch, fetchAllowance, txId]);

  const { amountUsd } = useUsdAmountByCryptoAmount({ amount, currency });

  const { handleResetDepositStep } = useCryptoPaymentDepositStepReset({
    handleCryptoPaymentDepositDialogClose,
    onDepositSuccess,
    tx,
  });

  const onClose = useCallback(() => {
    if (!isDepositing && !isDepositConfirming) {
      handleResetDepositStep();
    }

    handleCryptoPaymentDepositDialogClose();
  }, [
    handleCryptoPaymentDepositDialogClose,
    handleResetDepositStep,
    isDepositConfirming,
    isDepositing,
  ]);

  const handleDiscardTx = useCallback(() => {
    handleResetDepositStep();

    handleCryptoPaymentDepositDialogClose();
  }, [handleResetDepositStep, handleCryptoPaymentDepositDialogClose]);

  const cryptoPaymentDepositDialogProps = useCryptoPaymentDepositDialog({
    allowance,
    allowanceError,
    allowanceFeeDetails:
      allowanceFeeDetailsPaid ?? allowanceFeeDetailsEstimated,
    allowanceStepStatus,
    allowanceTxHash,
    amount,
    amountUsd,
    currency,
    depositError,
    depositFeeDetails: depositFeeDetailsPaid ?? depositFeeDetailsEstimated,
    depositStepStatus,
    depositTxHash,
    handleDeposit,
    handleDiscardTx,
    handleFetchAllowance,
    handleResetAllowanceSending,
    handleSendAllowance,
    isAllowanceLoading,
    isAllowanceSent,
    isCryptoPaymentDepositDialogOpened,
    isOngoingTx,
    network,
    onClose,
    step,
  });

  return { cryptoPaymentDepositDialogProps };
};
