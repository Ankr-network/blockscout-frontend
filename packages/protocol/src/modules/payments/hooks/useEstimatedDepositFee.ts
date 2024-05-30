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
  const {
    depositFee: ankrDepositFee,
    handleFetchEstimatedDepositFeeAnkr,
    isLoading: isAnkrDepositFeeEstimating,
  } = useEstimatedDepositFeeAnkr({ skipFetching, txId });

  const {
    depositFee: usdcDepositFee,
    handleFetchEstimatedDepositFeeUsdc,
    isLoading: isUsdcDepositFeeEstimating,
  } = useEstimatedDepositFeeUsdc({ skipFetching, txId });

  const {
    depositFee: usdtDepositFee,
    handleFetchEstimatedDepositFeeUsdt,
    isLoading: isUsdtDepositFeeEstimating,
  } = useEstimatedDepositFeeUsdt({ skipFetching, txId });

  if (currency === ECurrency.USDC) {
    return {
      fee: usdcDepositFee,
      handleFetchEstimatedDepositFee: handleFetchEstimatedDepositFeeUsdc,
      isEstimating: isUsdcDepositFeeEstimating,
    };
  }

  if (currency === ECurrency.USDT) {
    return {
      fee: usdtDepositFee,
      handleFetchEstimatedDepositFee: handleFetchEstimatedDepositFeeUsdt,
      isEstimating: isUsdtDepositFeeEstimating,
    };
  }

  return {
    fee: ankrDepositFee,
    handleFetchEstimatedDepositFee: handleFetchEstimatedDepositFeeAnkr,
    isEstimating: isAnkrDepositFeeEstimating,
  };
};
