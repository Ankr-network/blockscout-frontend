import BigNumber from 'bignumber.js';
import { Token, getTokenAddress } from 'multirpc-sdk';

import { API_ENV } from 'modules/common/utils/environment';

import { useGasPrice } from './useGasPrice';
import { useNativeTokenPrice } from './useNativeTokenPrice';
import { useTokenPrice } from './useTokenPrice';
import { useTxData } from './useTxData';
import { useTxReceipt } from './useTxReceipt';
import { getDateFromUnixSeconds } from '../../../modules/common/utils/getDateFromUnixSeconds';

export interface IUseTxDetailsProps {
  amount: number;
  skipFetching?: boolean;
  txHash: string;
}

export const useTxDetails = ({
  amount,
  skipFetching,
  txHash,
}: IUseTxDetailsProps) => {
  const { txData, isLoading: isTxDataLoading } = useTxData({
    skipFetching,
    txHash,
  });

  const { txReceipt, isLoading: isTxReceiptLoading } = useTxReceipt({
    txHash,
    skipFetching,
  });

  const { price: nativeTokenPrice, isFetching: isNativeTokenPriceLoading } =
    useNativeTokenPrice({ skipFetching });

  const { price: tokenPrice, isFetching: isTokenPriceLoading } = useTokenPrice({
    tokenAddress: getTokenAddress(Token.ANKR, API_ENV),
    skipFetching,
  });

  const { gasPrice, isLoading: isGasPriceLoading } = useGasPrice({
    skipFetching,
  });

  const isLoading =
    isTxDataLoading ||
    isTxReceiptLoading ||
    isNativeTokenPriceLoading ||
    isTokenPriceLoading ||
    isGasPriceLoading;

  const fromAddress = txData?.tx.from ?? '';
  const toAddress = txData?.tx.to ?? '';
  const txDate = txData?.timestamp
    ? getDateFromUnixSeconds(txData.timestamp)
    : undefined;

  const gasUsed = txReceipt?.gasUsed ?? 0;
  const depositAmountUsd = new BigNumber(tokenPrice)
    .multipliedBy(amount)
    .toNumber();

  const depositFee = new BigNumber(gasPrice).multipliedBy(gasUsed);

  const depositFeeUsd = depositFee.multipliedBy(nativeTokenPrice).toNumber();

  return {
    depositAmountUsd,
    depositFee: depositFee.toNumber(),
    depositFeeUsd,
    fromAddress,
    isLoading,
    toAddress,
    txDate,
  };
};
