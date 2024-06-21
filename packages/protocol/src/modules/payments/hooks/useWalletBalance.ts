import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { IUseQueryProps } from 'store/queries/types';

import { ECurrency } from '../types';
import { useWalletBalanceAnkr } from './useWalletBalanceAnkr';
import { useWalletBalanceUsdc } from './useWalletBalanceUsdc';
import { useWalletBalanceUsdt } from './useWalletBalanceUsdt';

export interface IUseWalletBalanceParams extends IUseQueryProps {
  address: Web3Address;
  currency: ECurrency;
  network: EBlockchain;
}

export const useWalletBalance = ({
  address,
  currency,
  network,
  skipFetching,
}: IUseWalletBalanceParams) => {
  const isAnkr = currency === ECurrency.ANKR;
  const isUsdc = currency === ECurrency.USDC;
  const isUsdt = currency === ECurrency.USDT;

  const {
    balanceAnkr,
    fetchWalletBalanceAnkrRef,
    handleFetchWalletBalanceAnkr,
    handleRefetchWalletBalanceAnkr,
    isLoading: isWalletBalanceAnkrLoading,
  } = useWalletBalanceAnkr({
    address,
    skipFetching: skipFetching || !isAnkr,
  });

  const {
    balanceUsdc,
    fetchWalletBalanceUsdcRef,
    handleFetchWalletBalanceUsdc,
    handleRefetchWalletBalanceUsdc,
    isLoading: isWalletBalanceUsdcLoading,
  } = useWalletBalanceUsdc({
    address,
    network,
    skipFetching: skipFetching || !isUsdc,
  });

  const {
    balanceUsdt,
    fetchWalletBalanceUsdtRef,
    handleFetchWalletBalanceUsdt,
    handleRefetchWalletBalanceUsdt,
    isLoading: isWalletBalanceUsdtLoading,
  } = useWalletBalanceUsdt({
    address,
    network,
    skipFetching: skipFetching || !isUsdt,
  });

  if (isUsdc) {
    return {
      walletBalance: balanceUsdc,
      fetchWalletBalanceRef: fetchWalletBalanceUsdcRef,
      handleFetchWalletbalance: handleFetchWalletBalanceUsdc,
      handleRefetchWalletBalance: handleRefetchWalletBalanceUsdc,
      isLoading: isWalletBalanceUsdcLoading,
    };
  }

  if (isUsdt) {
    return {
      walletBalance: balanceUsdt,
      fetchWalletBalanceRef: fetchWalletBalanceUsdtRef,
      handleFetchWalletbalance: handleFetchWalletBalanceUsdt,
      handleRefetchWalletBalance: handleRefetchWalletBalanceUsdt,
      isLoading: isWalletBalanceUsdtLoading,
    };
  }

  return {
    walletBalance: balanceAnkr,
    fetchWalletBalanceRef: fetchWalletBalanceAnkrRef,
    handleFetchWalletbalance: handleFetchWalletBalanceAnkr,
    handleRefetchWalletBalance: handleRefetchWalletBalanceAnkr,
    isLoading: isWalletBalanceAnkrLoading,
  };
};
