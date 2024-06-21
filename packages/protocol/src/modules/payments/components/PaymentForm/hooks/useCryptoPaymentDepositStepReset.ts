import { useCallback } from 'react';

import { ICryptoTransaction } from 'modules/payments/types';
import { removeCryptoTx } from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useFetchAllowance } from 'modules/payments/hooks/useFetchAllowance';

import { useCryptoPaymentDepositHandler } from './useCryptoPaymentDepositHandler';
import { useCryptoPaymentSendAllowanceHandler } from './useCryptoPaymentSendAllowanceHandler';

export interface IUseCryptoPaymentDepositStepResetProps {
  handleCryptoPaymentDepositDialogClose: () => void;
  handleNetworkReset?: () => void;
  handleResetTxId?: () => void;
  handleCryptoPaymentSuccessDialogOpen: () => void;
  tx: ICryptoTransaction;
}

export const useCryptoPaymentDepositStepReset = ({
  handleCryptoPaymentDepositDialogClose,
  handleCryptoPaymentSuccessDialogOpen,
  handleNetworkReset,
  handleResetTxId,
  tx,
}: IUseCryptoPaymentDepositStepResetProps) => {
  const { currency, from, id: txId, network } = tx;

  const { handleResetDeposit } = useCryptoPaymentDepositHandler({
    handleCryptoPaymentDepositDialogClose,
    handleCryptoPaymentSuccessDialogOpen,
    tx,
  });

  const { handleResetAllowanceSending } = useCryptoPaymentSendAllowanceHandler({
    tx,
  });

  const { handleResetAllowanceFetching } = useFetchAllowance({
    address: from,
    currency,
    network,
    skipFetching: true,
  });

  const dispatch = useAppDispatch();

  const handleResetDepositStep = useCallback(() => {
    handleResetAllowanceFetching();
    handleResetAllowanceSending();
    handleResetDeposit();

    handleNetworkReset?.();

    // to generate a new txId to unbind the payment form from current tx and
    // make it ready to create a new tx
    handleResetTxId?.();
  }, [
    handleNetworkReset,
    handleResetAllowanceFetching,
    handleResetAllowanceSending,
    handleResetDeposit,
    handleResetTxId,
  ]);

  const handleRemoveTx = useCallback(() => {
    dispatch(removeCryptoTx({ id: txId }));
  }, [dispatch, txId]);

  return { handleResetDepositStep, handleRemoveTx };
};
