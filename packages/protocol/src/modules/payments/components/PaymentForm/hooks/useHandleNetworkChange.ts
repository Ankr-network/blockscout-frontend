import { EBlockchain } from 'multirpc-sdk';
import { useEffect } from 'react';

import { ECurrency } from 'modules/payments/types';
import { defaultCryptoTx } from 'modules/payments/const';
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

  const { handleFetchNativeTokenPrice } = useNativeTokenPrice({
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
      dispatch(setNetwork({ network, id: txId }));

      handleFetchWalletbalance();
      handleFetchTokenPrice();
      handleFetchNativeTokenPrice();
      handleFetchAllowance();
      handleFetchEstimatedAllowanceFee();
      handleFetchEstimatedDepositFee();
    }
    // we should only track network
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);
};
