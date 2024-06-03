import { EBlockchain } from 'multirpc-sdk';
import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useAppDispatch } from 'store/useAppDispatch';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';

import { ECurrency } from '../types';
import { createCryptoTx } from '../store/paymentsSlice';
import { useAccountAddress } from './useAccountAddress';
import { useEstimatedAllowanceFee } from './useEstimatedAllowanceFee';
import { useEstimatedDepositFee } from './useEstimatedDepositFee';
import { useFetchAllowance } from './useFetchAllowance';
import { useNativeTokenPrice } from './useNativeTokenPrice';
import { usePaygContractAddress } from './usePaygContractAddress';
import { useTxByTxId } from './useTxByTxId';

export interface IUseCryptoTxProps {
  amount: number;
  currency: ECurrency;
  network: EBlockchain;
}

export const useCryptoTx = ({
  amount,
  currency,
  network,
}: IUseCryptoTxProps) => {
  const [txId] = useState<string>(uuid());

  const { accountAddress } = useAccountAddress();
  const { paygContractAddress } = usePaygContractAddress({ currency, network });
  const { tx } = useTxByTxId({ txId });
  const { walletAddress } = useWalletAddress();

  const { handleFetchAllowance, isLoading: isAllowanceFetching } =
    useFetchAllowance({ currency, skipFetching: true, network });

  const { handleFetchNativeTokenPrice, isLoading: isNativeTokenPriceLoading } =
    useNativeTokenPrice({ network, skipFetching: true });

  const {
    handleFetchEstimatedAllowanceFee,
    isEstimating: isAllowanceFeeEstimating,
  } = useEstimatedAllowanceFee({ currency, skipFetching: true, txId });

  const {
    handleFetchEstimatedDepositFee,
    isEstimating: isDepositFeeEstimating,
  } = useEstimatedDepositFee({ currency, skipFetching: true, txId });

  const dispatch = useAppDispatch();

  const handleCreateCryptoTx = useCallback(async () => {
    if (walletAddress && paygContractAddress) {
      const { data: allowanceAmount = 0 } = await handleFetchAllowance();

      dispatch(
        createCryptoTx({
          accountAddress,
          allowanceAmount,
          amount,
          currency,
          from: walletAddress,
          hadAllowance: Boolean(allowanceAmount),
          id: txId,
          network,
          to: paygContractAddress,
        }),
      );

      await handleFetchNativeTokenPrice();
      await handleFetchEstimatedAllowanceFee();
      await handleFetchEstimatedDepositFee();
    }
  }, [
    accountAddress,
    amount,
    currency,
    dispatch,
    handleFetchAllowance,
    handleFetchEstimatedAllowanceFee,
    handleFetchEstimatedDepositFee,
    handleFetchNativeTokenPrice,
    network,
    paygContractAddress,
    txId,
    walletAddress,
  ]);

  const isCreating =
    isAllowanceFetching ||
    isNativeTokenPriceLoading ||
    isAllowanceFeeEstimating ||
    isDepositFeeEstimating;

  return { handleCreateCryptoTx, isCreating, tx };
};
