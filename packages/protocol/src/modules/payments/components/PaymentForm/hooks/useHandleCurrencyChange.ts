import { EBlockchain } from 'multirpc-sdk';
import { useEffect } from 'react';

import { ECurrency } from 'modules/payments/types';
import { defaultCryptoTx } from 'modules/payments/const';
import { setCurrency } from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useEstimatedAllowanceFee } from 'modules/payments/hooks/useEstimatedAllowanceFee';
import { useEstimatedDepositFee } from 'modules/payments/hooks/useEstimatedDepositFee';
import { useFetchAllowance } from 'modules/payments/hooks/useFetchAllowance';
import { useTokenPrice } from 'modules/payments/hooks/useTokenPrice';
import { useTxByTxId } from 'modules/payments/hooks/useTxByTxId';
import { useWalletBalance } from 'modules/payments/hooks/useWalletBalance';

export interface IUseHandleCurrencyChangeProps {
  currency: ECurrency;
  network: EBlockchain;
  txId: string;
}

const skipFetching = true;

export const useHandleCurrencyChange = ({
  currency,
  network,
  txId,
}: IUseHandleCurrencyChangeProps) => {
  const { hasTx, tx = defaultCryptoTx } = useTxByTxId({ txId });
  const { from } = tx;

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

  const { handleFetchWalletbalance } = useWalletBalance({
    address: from,
    currency,
    network,
    skipFetching,
  });

  const { handleFetchTokenPrice } = useTokenPrice({
    currency,
    network,
    skipFetching,
  });

  const { handleFetchAllowance } = useFetchAllowance({
    address: from,
    currency,
    network,
    skipFetching,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasTx) {
      dispatch(setCurrency({ currency, id: txId }));

      // using fetch since paramters of the qieries has changed
      // on currency change
      handleFetchWalletbalance();
      handleFetchTokenPrice();
      handleFetchAllowance();
      handleFetchEstimatedAllowanceFee();
      handleFetchEstimatedDepositFee();
    }
    // we should only track currency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
};
