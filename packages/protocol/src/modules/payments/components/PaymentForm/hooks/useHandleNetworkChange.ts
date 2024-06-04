import { EBlockchain } from 'multirpc-sdk';
import { useEffect } from 'react';

import { ECurrency } from 'modules/payments/types';
import { setNetwork } from 'modules/payments/store/paymentsSlice';
import { useAppDispatch } from 'store/useAppDispatch';
import { useEstimatedAllowanceFee } from 'modules/payments/hooks/useEstimatedAllowanceFee';
import { useEstimatedDepositFee } from 'modules/payments/hooks/useEstimatedDepositFee';
import { useFetchAllowance } from 'modules/payments/hooks/useFetchAllowance';
import { useNativeTokenPrice } from 'modules/payments/hooks/useNativeTokenPrice';
import { useTokenPrice } from 'modules/payments/hooks/useTokenPrice';
import { useTxByTxId } from 'modules/payments/hooks/useTxByTxId';
import { useWalletBalance } from 'modules/payments/hooks/useWalletBalance';

export interface IUseHandleNetworkChangeProps {
  currency: ECurrency;
  network: EBlockchain;
  txId: string;
}

const skipFetching = true;

export const useHandleNetworkChange = ({
  currency,
  network,
  txId,
}: IUseHandleNetworkChangeProps) => {
  const { hasTx } = useTxByTxId({ txId });

  const { handleRefetchEstimatedAllowanceFee } = useEstimatedAllowanceFee({
    currency,
    skipFetching,
    txId,
  });

  const { handleRefetchEstimatedDepositFee } = useEstimatedDepositFee({
    currency,
    skipFetching,
    txId,
  });

  const { handleFetchWalletbalance } = useWalletBalance({
    currency,
    network,
    skipFetching,
  });

  const { handleFetchTokenPrice } = useTokenPrice({
    currency,
    network,
    skipFetching,
  });

  const { handleFetchNativeTokenPrice } = useNativeTokenPrice({
    network,
    skipFetching,
  });

  const { handleFetchAllowance } = useFetchAllowance({
    currency,
    network,
    skipFetching,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasTx) {
      dispatch(setNetwork({ network, id: txId }));

      // using fetch since paramters of the qieries has changed
      // on network change
      handleFetchWalletbalance();
      handleFetchTokenPrice();
      handleFetchNativeTokenPrice();
      handleFetchAllowance();

      // using refetch since parameters of the queries remains the same
      // on network change
      handleRefetchEstimatedAllowanceFee();
      handleRefetchEstimatedDepositFee();
    }
    // we should only track network
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);
};
