import { useEffect } from 'react';

import { ECurrency } from 'modules/payments/types';
import { setAmount } from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useEstimatedAllowanceFee } from 'modules/payments/hooks/useEstimatedAllowanceFee';
import { useEstimatedDepositFee } from 'modules/payments/hooks/useEstimatedDepositFee';
import { useTxByTxId } from 'modules/payments/hooks/useTxByTxId';

export interface IUseHandleCurrencyChangeProps {
  amount: number;
  currency: ECurrency;
  txId: string;
}

const skipFetching = true;

export const useHandleAmountChange = ({
  amount,
  currency,
  txId,
}: IUseHandleCurrencyChangeProps) => {
  const { hasTx } = useTxByTxId({ txId });

  const { handleFetchEstimatedAllowanceFee } = useEstimatedAllowanceFee({
    currency,
    skipFetching,
    txId,
  });

  const { handleRefetchEstimatedDepositFee } = useEstimatedDepositFee({
    currency,
    skipFetching,
    txId,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasTx) {
      dispatch(setAmount({ amount, id: txId }));

      // using fetch since paramters of the qieries has changed
      // on amount change
      handleRefetchEstimatedDepositFee();

      // using refetch since parameters of the queries remains the same
      // on amount change
      handleFetchEstimatedAllowanceFee();
    }
    // we should only track currency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);
};
