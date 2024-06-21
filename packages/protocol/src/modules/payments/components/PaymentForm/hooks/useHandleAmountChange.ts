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

  const { handleFetchEstimatedDepositFee } = useEstimatedDepositFee({
    currency,
    skipFetching,
    txId,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasTx) {
      dispatch(setAmount({ amount, id: txId }));

      handleFetchEstimatedDepositFee();
      handleFetchEstimatedAllowanceFee();
    }
    // we should only track currency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);
};
