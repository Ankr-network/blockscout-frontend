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
  skipFetching,
  txId,
}: IUseEstimatedAllowanceFeeProps) => {
  const isAnkr = currency === ECurrency.ANKR;
  const isUsdc = currency === ECurrency.USDC;
  const isUsdt = currency === ECurrency.USDT;

  const {
    allowanceFeeAnkr,
    handleFetchEstimatedAllowanceFeeAnkr,
    handleRefetchEstimatedAllowanceFeeAnkr,
    isLoading: isAnkrAllowanceFeeEstimating,
  } = useEstimatedAllowanceFeeAnkr({
    skipFetching: skipFetching || !isAnkr,
    txId,
  });

  const {
    allowanceFeeUsdc,
    handleFetchEstimatedAllowanceFeeUsdc,
    handleRefetchEstimatedAllowanceFeeUsdc,
    isLoading: isUsdcAllowanceFeeEstimating,
  } = useEstimatedAllowanceFeeUsdc({
    skipFetching: skipFetching || !isUsdc,
    txId,
  });

  const {
    allowanceFeeUsdt,
    handleFetchEstimatedAllowanceFeeUsdt,
    handleRefetchEstimatedAllowanceFeeUsdt,
    isLoading: isUsdtAllowanceFeeEstimating,
  } = useEstimatedAllowanceFeeUsdt({
    skipFetching: skipFetching || isUsdt,
    txId,
  });

  if (isUsdc) {
    return {
      allowanceFee: allowanceFeeUsdc,
      handleFetchEstimatedAllowanceFee: handleFetchEstimatedAllowanceFeeUsdc,
      handleRefetchEstimatedAllowanceFee:
        handleRefetchEstimatedAllowanceFeeUsdc,
      isEstimating: isUsdcAllowanceFeeEstimating,
    };
  }

  if (isUsdt) {
    return {
      allowanceFee: allowanceFeeUsdt,
      handleFetchEstimatedAllowanceFee: handleFetchEstimatedAllowanceFeeUsdt,
      handleRefetchEstimatedAllowanceFee:
        handleRefetchEstimatedAllowanceFeeUsdt,
      isEstimating: isUsdtAllowanceFeeEstimating,
    };
  }

  return {
    allowanceFee: allowanceFeeAnkr,
    handleFetchEstimatedAllowanceFee: handleFetchEstimatedAllowanceFeeAnkr,
    handleRefetchEstimatedAllowanceFee: handleRefetchEstimatedAllowanceFeeAnkr,
    isEstimating: isAnkrAllowanceFeeEstimating,
  };
};
