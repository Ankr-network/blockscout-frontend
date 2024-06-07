import { EBlockchain } from 'multirpc-sdk';

import { IUseQueryProps } from 'store/queries/types';

import { ECurrency } from '../types';
import { useWalletBalanceAnkr } from './useWalletBalanceAnkr';
import { useWalletBalanceUsdc } from './useWalletBalanceUsdc';
import { useWalletBalanceUsdt } from './useWalletBalanceUsdt';

export interface IUseWalletBalanceParams extends IUseQueryProps {
  accountAddress: string;
  currency: ECurrency;
  network: EBlockchain;
}

export const useWalletBalance = ({
  accountAddress,
  currency,
  network,
  skipFetching,
}: IUseWalletBalanceParams) => {
  const isAnkr = currency === ECurrency.ANKR;
  const isUsdc = currency === ECurrency.USDC;
  const isUsdt = currency === ECurrency.USDT;

  const {
    balanceAnkr,
    handleFetchWalletBalanceAnkr,
    handleRefetchWalletBalanceAnkr,
    isLoading: isWalletBalanceAnkrLoading,
  } = useWalletBalanceAnkr({
    accountAddress,
    skipFetching: skipFetching || !isAnkr,
  });

  const {
    balanceUsdc,
    handleFetchWalletBalanceUsdc,
    handleRefetchWalletBalanceUsdc,
    isLoading: isWalletBalanceUsdcLoading,
  } = useWalletBalanceUsdc({
    accountAddress,
    network,
    skipFetching: skipFetching || !isUsdc,
  });

  const {
    balanceUsdt,
    handleFetchWalletBalanceUsdt,
    handleRefetchWalletBalanceUsdt,
    isLoading: isWalletBalanceUsdtLoading,
  } = useWalletBalanceUsdt({
    accountAddress,
    network,
    skipFetching: skipFetching || !isUsdt,
  });

  if (isUsdc) {
    return {
      walletBalance: balanceUsdc,
      handleFetchWalletbalance: handleFetchWalletBalanceUsdc,
      handleRefetchWalletBalance: handleRefetchWalletBalanceUsdc,
      isLoading: isWalletBalanceUsdcLoading,
    };
  }

  if (isUsdt) {
    return {
      walletBalance: balanceUsdt,
      handleFetchWalletbalance: handleFetchWalletBalanceUsdt,
      handleRefetchWalletBalance: handleRefetchWalletBalanceUsdt,
      isLoading: isWalletBalanceUsdtLoading,
    };
  }

  return {
    walletBalance: balanceAnkr,
    handleFetchWalletbalance: handleFetchWalletBalanceAnkr,
    handleRefetchWalletBalance: handleRefetchWalletBalanceAnkr,
    isLoading: isWalletBalanceAnkrLoading,
  };
};
