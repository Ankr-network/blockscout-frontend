import { useCallback } from 'react';

import { ICryptoTransaction } from 'modules/payments/types';
import {
  setAllowanceAmount,
  setIsApproved,
} from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useFetchAllowance } from 'modules/payments/hooks/useFetchAllowance';

import { useCryptoPaymentSendAllowanceHandler } from './useCryptoPaymentSendAllowanceHandler';

export interface IUseCryptoPaymentDepositStepAllowanceProps {
  tx: ICryptoTransaction;
}

export const useCryptoPaymentDepositStepAllowance = ({
  tx,
}: IUseCryptoPaymentDepositStepAllowanceProps) => {
  const { amount, currency, from, id: txId, network } = tx;

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

  return {
    handleFetchAllowance,
    handleResetAllowanceSending,
    handleSendAllowance,
    isAllowanceLoading,
    isAllowanceSent,
  };
};
