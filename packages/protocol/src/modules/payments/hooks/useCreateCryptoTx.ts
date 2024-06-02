import { EBlockchain } from 'multirpc-sdk';
import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useAppDispatch } from 'store/useAppDispatch';
import { useAppSelector } from 'store/useAppSelector';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';

import { ECurrency } from '../types';
import { createCryptoTx, removeCryptoTx } from '../store/paymentsSlice';
import { selectCryptoTxById } from '../store/selectors';
import { useAccountAddress } from './useAccountAddress';
import { useEstimatedAllowanceFee } from './useEstimatedAllowanceFee';
import { useEstimatedDepositFee } from './useEstimatedDepositFee';
import { useFetchAllowance } from './useFetchAllowance';
import { usePaygContractAddress } from './usePaygContractAddress';
import { useNativeTokenPrice } from './useNativeTokenPrice';

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

  const tx = useAppSelector(state => selectCryptoTxById(state, txId));

  const { accountAddress } = useAccountAddress();
  const { walletAddress } = useWalletAddress();
  const { paygContractAddress } = usePaygContractAddress({ currency, network });

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

  const handleRemoveCryptoTx = useCallback(() => {
    dispatch(removeCryptoTx({ id: txId }));
  }, [dispatch, txId]);

  const isCreating =
    isAllowanceFetching ||
    isNativeTokenPriceLoading ||
    isAllowanceFeeEstimating ||
    isDepositFeeEstimating;

  return { handleCreateCryptoTx, handleRemoveCryptoTx, isCreating, tx };
};
