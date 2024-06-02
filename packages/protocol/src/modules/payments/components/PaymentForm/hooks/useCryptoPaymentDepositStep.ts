import { Dispatch, SetStateAction, useCallback } from 'react';

import { ICryptoTransaction } from 'modules/payments/types';
import { defaultCryptoTx } from 'modules/payments/const';
import {
  removeCryptoTx,
  setAllowanceAmount,
} from 'modules/payments/store/paymentsSlice';
import { selectIsCryptoTxOngoing } from 'modules/payments/store/selectors';
import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';
import { useFetchAllowance } from 'modules/payments/hooks/useFetchAllowance';
import { useUSDAmountByCryptoAmount } from 'modules/payments/hooks/useUSDAmountByCryptoAmount';

import { useAccountChangedHandlingOnDepositStep } from './useAccountsChangedHandlingOnDepositStep';
import { useCryptoPaymentDepositDialog } from '../../CryptoPaymentDepositDialog';
import { useCryptoPaymentDepositHandler } from './useCryptoPaymentDepositHandler';
import { useCryptoPaymentDepositStepState } from './useCryptoPaymentDepositStepState';
import { useCryptoPaymentSendAllowanceHandler } from './useCryptoPaymentSendAllowanceHandler';

export interface IUseCryptoPaymentDepositStepProps {
  handleCryptoPaymentDepositDialogClose: () => void;
  handleCryptoPaymentDepositDialogOpen: () => void;
  handleCryptoPaymentSummaryDialogOpen: () => void;
  isCryptoPaymentDepositDialogOpened: boolean;
  onDepositSuccess: () => void;
  setIsAccountChangedOnDepositStep: Dispatch<SetStateAction<boolean>>;
  tx: ICryptoTransaction | undefined;
}

export const useCryptoPaymentDepositStep = ({
  handleCryptoPaymentDepositDialogClose,
  handleCryptoPaymentDepositDialogOpen,
  handleCryptoPaymentSummaryDialogOpen,
  isCryptoPaymentDepositDialogOpened,
  onDepositSuccess,
  setIsAccountChangedOnDepositStep,
  tx = defaultCryptoTx,
}: IUseCryptoPaymentDepositStepProps) => {
  const {
    allowanceAmount: allowance = 0,
    allowanceError,
    allowanceFeeDetailsEstimated,
    allowanceFeeDetailsPaid,
    amount,
    currency,
    depositError,
    depositFeeDetailsEstimated,
    depositFeeDetailsPaid,
    id: txId,
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

  const { handleSendAllowance, handleResetAllowanceSending, isAllowanceSent } =
    useCryptoPaymentSendAllowanceHandler({ tx });

  const { handleFetchAllowance, isLoading: isAllowanceLoading } =
    useFetchAllowance({ currency, network, skipFetching: true });

  const { amountUsd } = useUSDAmountByCryptoAmount({ amount, currency });

  // to handle the case when a user has switched his account in wallet
  // during the payment flow
  useAccountChangedHandlingOnDepositStep({
    depositStepStatus,
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentSummaryDialogOpen,
    isCryptoPaymentDepositDialogOpened,
    setIsAccountChangedOnDepositStep,
    step,
    tx,
  });

  const dispatch = useAppDispatch();

  const handleDiscardTx = useCallback(() => {
    dispatch(removeCryptoTx({ id: txId }));
    handleCryptoPaymentDepositDialogClose();
  }, [dispatch, handleCryptoPaymentDepositDialogClose, txId]);

  const onCheckAllowanceButtonClick = useCallback(async () => {
    const { data: allowanceAmount = 0 } = await handleFetchAllowance();

    dispatch(setAllowanceAmount({ allowanceAmount, id: txId }));
  }, [dispatch, handleFetchAllowance, txId]);

  const cryptoPaymentDepositDialogProps = useCryptoPaymentDepositDialog({
    allowanceError,
    allowanceFeeDetails:
      allowanceFeeDetailsPaid ?? allowanceFeeDetailsEstimated,
    allowance,
    allowanceStepStatus,
    amount,
    amountUsd,
    currency,
    depositError,
    depositFeeDetails: depositFeeDetailsPaid ?? depositFeeDetailsEstimated,
    depositStepStatus,
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentDepositDialogOpen,
    handleDeposit,
    handleDiscardTx,
    handleResetAllowanceSending,
    handleSendAllowance,
    isAllowanceLoading,
    isAllowanceSent,
    isCryptoPaymentDepositDialogOpened,
    isOngoingTx,
    network,
    onCheckAllowanceButtonClick,
    step,
  });

  return { cryptoPaymentDepositDialogProps };
};
