import { EBlockchain } from 'multirpc-sdk';
import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useAppDispatch } from 'store/useAppDispatch';
import { useWalletAddress } from 'domains/wallet/hooks/useWalletAddress';

import { ECurrency } from '../types';
import { createCryptoTx } from '../store/paymentsSlice';
import { useAccountAddress } from './useAccountAddress';
import { useCryptoPaymentOptions } from './useCryptoPaymentOptions';
import { useEstimatedAllowanceFee } from './useEstimatedAllowanceFee';
import { useEstimatedDepositFee } from './useEstimatedDepositFee';
import { useFetchAllowance } from './useFetchAllowance';
import { useNativeTokenPrice } from './useNativeTokenPrice';
import { useTxByTxId } from './useTxByTxId';

export interface IUseCryptoTxProps {
  amount: number;
  currency: ECurrency;
  network: EBlockchain;
}

const skipFetching = true;

export const useCryptoTx = ({
  amount,
  currency,
  network,
}: IUseCryptoTxProps) => {
  const [txId, setTxId] = useState<string>(uuid());

  const { accountAddress } = useAccountAddress();
  const { depositContractAddress: paygContractAddress } =
    useCryptoPaymentOptions({ currency, network });
  const { tx } = useTxByTxId({ txId });
  const { walletAddress } = useWalletAddress();

  const { fetchAllowanceRef, isLoading: isAllowanceFetching } =
    useFetchAllowance({
      address: walletAddress!,
      currency,
      network,
      skipFetching,
    });

  const { fetchNativeTokenPriceRef, isLoading: isNativeTokenPriceLoading } =
    useNativeTokenPrice({ network, skipFetching });

  const {
    fetchEstimatedAllowanceFeeRef,
    isEstimating: isAllowanceFeeEstimating,
  } = useEstimatedAllowanceFee({ currency, skipFetching, txId });

  const { fetchEstimatedDepositFeeRef, isEstimating: isDepositFeeEstimating } =
    useEstimatedDepositFee({ currency, skipFetching, txId });

  const dispatch = useAppDispatch();

  const handleCreateCryptoTx = useCallback(async () => {
    if (walletAddress && paygContractAddress) {
      const { data: allowanceAmount = 0 } = await fetchAllowanceRef.current();

      dispatch(
        createCryptoTx({
          accountAddress,
          allowanceAmount,
          amount,
          currency,
          from: walletAddress,
          hadAllowance: allowanceAmount >= amount,
          id: txId,
          network,
          to: paygContractAddress,
        }),
      );

      // wrapped into a sefl executing function to ensure that native token
      // price will be fetched before fetching estimated fees. It's important
      (async () => {
        await fetchNativeTokenPriceRef.current();
        fetchEstimatedAllowanceFeeRef.current();
        fetchEstimatedDepositFeeRef.current();
      })();
    }
  }, [
    accountAddress,
    amount,
    currency,
    dispatch,
    fetchAllowanceRef,
    fetchEstimatedAllowanceFeeRef,
    fetchNativeTokenPriceRef,
    fetchEstimatedDepositFeeRef,
    network,
    paygContractAddress,
    txId,
    walletAddress,
  ]);

  const handleResetTxId = useCallback(() => {
    setTxId(uuid());
  }, []);

  const isCreating =
    isAllowanceFetching ||
    isNativeTokenPriceLoading ||
    isAllowanceFeeEstimating ||
    isDepositFeeEstimating;

  return {
    handleCreateCryptoTx,
    handleResetTxId,
    isAllowanceFeeEstimating,
    isAllowanceFetching,
    isCreating,
    isDepositFeeEstimating,
    isNativeTokenPriceLoading,
    tx,
  };
};
