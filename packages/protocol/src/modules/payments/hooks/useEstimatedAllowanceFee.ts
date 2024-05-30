import { IUseQueryProps } from 'store/queries/types';

import { ECurrency } from '../types';
import { useEstimatedAllowanceFeeAnkr } from './useEstimatedAllowanceFeeAnkr';
import { useEstimatedAllowanceFeeUsdc } from './useEstimatedAllowanceFeeUsdc';
import { useEstimatedAllowanceFeeUsdt } from './useEstimatedAllowanceFeeUsdt';

export interface IUseEstimatedAllowanceFeeProps extends IUseQueryProps {
  currency: ECurrency;
  txId: string;
}

export const useEstimatedAllowanceFee = ({
  currency,
  txId,
  skipFetching,
}: IUseEstimatedAllowanceFeeProps) => {
  const {
    allowanceFee: ankrAllowanceFee,
    handleFetchEstimatedAllowanceFeeAnkr,
    isLoading: isAnkrAllowanceFeeEstimating,
  } = useEstimatedAllowanceFeeAnkr({ skipFetching, txId });

  const {
    allowanceFee: usdcAllowanceFee,
    handleFetchEstimatedAllowanceFeeUsdc,
    isLoading: isUsdcAllowanceFeeEstimating,
  } = useEstimatedAllowanceFeeUsdc({ skipFetching, txId });

  const {
    allowanceFee: usdtAllowanceFee,
    handleFetchEstimatedAllowanceFeeUsdt,
    isLoading: isUsdtAllowanceFeeEstimating,
  } = useEstimatedAllowanceFeeUsdt({ skipFetching, txId });

  if (currency === ECurrency.USDC) {
    return {
      fee: usdcAllowanceFee,
      handleFetchEstimatedAllowanceFee: handleFetchEstimatedAllowanceFeeUsdc,
      isEstimating: isUsdcAllowanceFeeEstimating,
    };
  }

  if (currency === ECurrency.USDT) {
    return {
      fee: usdtAllowanceFee,
      handleFetchEstimatedAllowanceFee: handleFetchEstimatedAllowanceFeeUsdt,
      isEstimating: isUsdtAllowanceFeeEstimating,
    };
  }

  return {
    fee: ankrAllowanceFee,
    handleFetchEstimatedAllowanceFee: handleFetchEstimatedAllowanceFeeAnkr,
    isEstimating: isAnkrAllowanceFeeEstimating,
  };
};
