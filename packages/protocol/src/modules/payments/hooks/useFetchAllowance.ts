import { EBlockchain, Web3Address } from 'multirpc-sdk';

import { IUseQueryProps } from 'store/queries/types';

import { ECurrency } from '../types';
import { useFetchAllowanceAnkr } from './useFetchAllowanceAnkr';
import { useFetchAllowanceUsdc } from './useFetchAllowanceUsdc';
import { useFetchAllowanceUsdt } from './useFetchAllowanceUsdt';

export interface IUseFetchAllowanceParams extends IUseQueryProps {
  address: Web3Address;
  currency: ECurrency;
  network: EBlockchain;
}

export const useFetchAllowance = ({
  address,
  currency,
  network,
  skipFetching,
}: IUseFetchAllowanceParams) => {
  const isAnkr = currency === ECurrency.ANKR;
  const isUsdc = currency === ECurrency.USDC;
  const isUsdt = currency === ECurrency.USDT;

  const {
    allowanceAnkr,
    fetchAllowanceAnkrRef,
    handleFetchAllowanceAnkr,
    isLoading: isAnkrAllowanceLoading,
    resetAlowanceFetchingAnkr,
  } = useFetchAllowanceAnkr({
    address,
    skipFetching: skipFetching || !isAnkr,
  });

  const {
    allowanceUsdc,
    fetchAllowanceUsdcRef,
    handleFetchAllowanceUsdc,
    isLoading: isUsdcAllowanceLoading,
    resetAlowanceFetchingUsdc,
  } = useFetchAllowanceUsdc({
    address,
    network,
    skipFetching: skipFetching || !isUsdc,
  });

  const {
    allowanceUsdt,
    fetchAllowanceUsdtRef,
    handleFetchAllowanceUsdt,
    isLoading: isUsdtAllowanceLoading,
    resetAlowanceFetchingUsdt,
  } = useFetchAllowanceUsdt({
    address,
    network,
    skipFetching: skipFetching || !isUsdt,
  });

  if (isUsdc) {
    return {
      allowance: allowanceUsdc,
      fetchAllowanceRef: fetchAllowanceUsdcRef,
      handleFetchAllowance: handleFetchAllowanceUsdc,
      handleResetAllowanceFetching: resetAlowanceFetchingUsdc,
      isLoading: isUsdcAllowanceLoading,
    };
  }

  if (isUsdt) {
    return {
      allowance: allowanceUsdt,
      fetchAllowanceRef: fetchAllowanceUsdtRef,
      handleFetchAllowance: handleFetchAllowanceUsdt,
      handleResetAllowanceFetching: resetAlowanceFetchingUsdt,
      isLoading: isUsdtAllowanceLoading,
    };
  }

  return {
    allowance: allowanceAnkr,
    fetchAllowanceRef: fetchAllowanceAnkrRef,
    handleFetchAllowance: handleFetchAllowanceAnkr,
    handleResetAllowanceFetching: resetAlowanceFetchingAnkr,
    isLoading: isAnkrAllowanceLoading,
  };
};
