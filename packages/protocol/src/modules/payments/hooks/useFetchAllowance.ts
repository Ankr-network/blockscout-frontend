import { EBlockchain } from 'multirpc-sdk';

import { IUseQueryProps } from 'store/queries/types';

import { ECurrency } from '../types';
import { useFetchAllowanceAnkr } from './useFetchAllowanceAnkr';
import { useFetchAllowanceUsdc } from './useFetchAllowanceUsdc';
import { useFetchAllowanceUsdt } from './useFetchAllowanceUsdt';

export interface IUseFetchAllowanceParams extends IUseQueryProps {
  currency: ECurrency;
  network: EBlockchain;
}

export const useFetchAllowance = ({
  currency,
  network,
  skipFetching,
}: IUseFetchAllowanceParams) => {
  const isAnkr = currency === ECurrency.ANKR;
  const isUsdc = currency === ECurrency.USDC;
  const isUsdt = currency === ECurrency.USDT;

  const {
    allowanceAnkr,
    handleFetchAllowanceAnkr,
    isLoading: isAnkrAllowanceLoading,
    resetAlowanceFetchingAnkr,
  } = useFetchAllowanceAnkr({ skipFetching: skipFetching || !isAnkr });

  const {
    allowanceUsdc,
    handleFetchAllowanceUsdc,
    isLoading: isUsdcAllowanceLoading,
    resetAlowanceFetchingUsdc,
  } = useFetchAllowanceUsdc({ network, skipFetching: skipFetching || !isUsdc });

  const {
    allowanceUsdt,
    handleFetchAllowanceUsdt,
    isLoading: isUsdtAllowanceLoading,
    resetAlowanceFetchingUsdt,
  } = useFetchAllowanceUsdt({ network, skipFetching: skipFetching || !isUsdt });

  if (isUsdc) {
    return {
      allowance: allowanceUsdc,
      handleFetchAllowance: handleFetchAllowanceUsdc,
      handleResetAllowanceFetching: resetAlowanceFetchingUsdc,
      isLoading: isUsdcAllowanceLoading,
    };
  }

  if (isUsdt) {
    return {
      allowance: allowanceUsdt,
      handleFetchAllowance: handleFetchAllowanceUsdt,
      handleResetAllowanceFetching: resetAlowanceFetchingUsdt,
      isLoading: isUsdtAllowanceLoading,
    };
  }

  return {
    allowance: allowanceAnkr,
    handleFetchAllowance: handleFetchAllowanceAnkr,
    handleResetAllowanceFetching: resetAlowanceFetchingAnkr,
    isLoading: isAnkrAllowanceLoading,
  };
};
