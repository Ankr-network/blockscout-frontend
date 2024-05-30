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
  const {
    ankrAllowance,
    handleFetchAllowanceAnkr,
    isLoading: isAnkrAllowanceLoading,
  } = useFetchAllowanceAnkr({ skipFetching });

  const {
    usdcAllowance,
    handleFetchAllowanceUsdc,
    isLoading: isUsdcAllowanceLoading,
  } = useFetchAllowanceUsdc({ network, skipFetching });

  const {
    usdtAllowance,
    handleFetchAllowanceUsdt,
    isLoading: isUsdtAllowanceLoading,
  } = useFetchAllowanceUsdt({ skipFetching, network });

  if (currency === ECurrency.USDC) {
    return {
      allowance: usdcAllowance,
      handleFetchAllowance: handleFetchAllowanceUsdc,
      isLoading: isUsdcAllowanceLoading,
    };
  }

  if (currency === ECurrency.USDT) {
    return {
      allowance: usdtAllowance,
      handleFetchAllowance: handleFetchAllowanceUsdt,
      isLoading: isUsdtAllowanceLoading,
    };
  }

  return {
    allowance: ankrAllowance,
    handleFetchAllowance: handleFetchAllowanceAnkr,
    isLoading: isAnkrAllowanceLoading,
  };
};
