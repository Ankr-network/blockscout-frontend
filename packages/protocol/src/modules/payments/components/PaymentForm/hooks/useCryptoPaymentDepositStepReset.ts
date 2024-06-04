import { useCallback } from 'react';

import { ICryptoTransaction } from 'modules/payments/types';
import { removeCryptoTx } from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useFetchAllowance } from 'modules/payments/hooks/useFetchAllowance';

import { useCryptoPaymentDepositHandler } from './useCryptoPaymentDepositHandler';
import { useCryptoPaymentSendAllowanceHandler } from './useCryptoPaymentSendAllowanceHandler';

export interface IUseCryptoPaymentDepositStepResetProps {
  handleCryptoPaymentDepositDialogClose: () => void;
  onDepositSuccess: () => void;
  tx: ICryptoTransaction;
}

export const useCryptoPaymentDepositStepReset = ({
  handleCryptoPaymentDepositDialogClose,
  onDepositSuccess,
  tx,
}: IUseCryptoPaymentDepositStepResetProps) => {
  const { currency, id: txId, network } = tx;

  const { handleResetDeposit } = useCryptoPaymentDepositHandler({
    handleCryptoPaymentDepositDialogClose,
    onDepositSuccess,
    tx,
  });

  const { handleResetAllowanceSending } = useCryptoPaymentSendAllowanceHandler({
    tx,
  });

  const { handleResetAllowanceFetching } = useFetchAllowance({
    currency,
    network,
    skipFetching: true,
  });

  const dispatch = useAppDispatch();

  const handleResetDepositStep = useCallback(() => {
    handleResetAllowanceFetching();
    handleResetAllowanceSending();
    handleResetDeposit();

    dispatch(removeCryptoTx({ id: txId }));
  }, [
    dispatch,
    handleResetAllowanceFetching,
    handleResetAllowanceSending,
    handleResetDeposit,
    txId,
  ]);

  return { handleResetDepositStep };
};
