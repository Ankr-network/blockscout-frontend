import { IUseQueryProps } from 'store/queries/types';

import { ECurrency } from '../types';
import { useEstimatedDepositFeeAnkr } from './useEstimatedDepositFeeAnkr';
import { useEstimatedDepositFeeUsdc } from './useEstimatedDepositFeeUsdc';
import { useEstimatedDepositFeeUsdt } from './useEstimatedDepositFeeUsdt';

export interface IUseEstimatedDepositFeeProps extends IUseQueryProps {
  currency: ECurrency;
  txId: string;
}

export const useEstimatedDepositFee = ({
  currency,
  skipFetching,
  txId,
}: IUseEstimatedDepositFeeProps) => {
  const isAnkr = currency === ECurrency.ANKR;
  const isUsdc = currency === ECurrency.USDC;
  const isUsdt = currency === ECurrency.USDT;

  const {
    depositFeeAnkr,
    handleFetchEstimatedDepositFeeAnkr,
    handleRefetchEstimatedDepositFeeAnkr,
    isLoading: isAnkrDepositFeeEstimating,
  } = useEstimatedDepositFeeAnkr({
    skipFetching: skipFetching || !isAnkr,
    txId,
  });

  const {
    depositFeeUsdc,
    handleFetchEstimatedDepositFeeUsdc,
    handleRefetchEstimatedDepositFeeUsdc,
    isLoading: isUsdcDepositFeeEstimating,
  } = useEstimatedDepositFeeUsdc({
    skipFetching: skipFetching || !isUsdc,
    txId,
  });

  const {
    depositFeeUsdt,
    handleFetchEstimatedDepositFeeUsdt,
    handleRefetchEstimatedDepositFeeUsdt,
    isLoading: isUsdtDepositFeeEstimating,
  } = useEstimatedDepositFeeUsdt({
    skipFetching: skipFetching || !isUsdt,
    txId,
  });

  if (isUsdc) {
    return {
      depositFee: depositFeeUsdc,
      handleFetchEstimatedDepositFee: handleFetchEstimatedDepositFeeUsdc,
      handleRefetchEstimatedDepositFee: handleRefetchEstimatedDepositFeeUsdc,
      isEstimating: isUsdcDepositFeeEstimating,
    };
  }

  if (isUsdt) {
    return {
      depositFee: depositFeeUsdt,
      handleFetchEstimatedDepositFee: handleFetchEstimatedDepositFeeUsdt,
      handleRefetchEstimatedDepositFee: handleRefetchEstimatedDepositFeeUsdt,
      isEstimating: isUsdtDepositFeeEstimating,
    };
  }

  return {
    depositFee: depositFeeAnkr,
    handleFetchEstimatedDepositFee: handleFetchEstimatedDepositFeeAnkr,
    handleRefetchEstimatedDepositFee: handleRefetchEstimatedDepositFeeAnkr,
    isEstimating: isAnkrDepositFeeEstimating,
  };
};
