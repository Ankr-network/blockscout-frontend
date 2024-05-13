import BigNumber from 'bignumber.js';
import { EBlockchain, Token, getTokenAddress } from 'multirpc-sdk';
import { useMemo } from 'react';

import { API_ENV } from 'modules/common/utils/environment';
import { getDateFromUnixSeconds } from 'modules/common/utils/getDateFromUnixSeconds';
import { ECurrency } from 'modules/billing/types';

import { getTxFeeByTxReceipt } from '../utils/getTxFeeByTxReceipt';
import { useNativeTokenPrice } from './useNativeTokenPrice';
import { useTokenPrice } from './useTokenPrice';
import { useTxData } from './useTxData';
import { useTxReceipt } from './useTxReceipt';

export interface IUseTxDetailsProps {
  amount: number;
  skipFetching?: boolean;
  txHash: string;
  currency: ECurrency;
  network: EBlockchain;
}

export const useTxDetails = ({
  amount,
  skipFetching,
  txHash,
  currency,
  network,
}: IUseTxDetailsProps) => {
  const { txData, isLoading: isTxDataLoading } = useTxData({
    skipFetching,
    txHash,
    network,
  });

  const { txReceipt, isLoading: isTxReceiptLoading } = useTxReceipt({
    skipFetching,
    txHash,
    network,
  });

  const { price: nativeTokenPrice, isFetching: isNativeTokenPriceLoading } =
    useNativeTokenPrice({ skipFetching, network });

  const { price: tokenPrice, isFetching: isTokenPriceLoading } = useTokenPrice({
    currency,
    network,
    tokenAddress: getTokenAddress(currency as unknown as Token, API_ENV),
    skipFetching,
  });

  const isLoading =
    isTxDataLoading ||
    isTxReceiptLoading ||
    isNativeTokenPriceLoading ||
    isTokenPriceLoading;

  const fromAddress = txData?.tx.from ?? '';
  const toAddress = txData?.tx.to ?? '';
  const txDate = txData?.timestamp
    ? getDateFromUnixSeconds(txData.timestamp)
    : undefined;

  const fee = useMemo(() => getTxFeeByTxReceipt({ txReceipt }), [txReceipt]);

  const amountUsd = new BigNumber(tokenPrice).multipliedBy(amount).toNumber();
  const feeUsd = new BigNumber(fee).multipliedBy(nativeTokenPrice).toNumber();

  return {
    amountUsd,
    fee,
    feeUsd,
    fromAddress,
    isLoading,
    toAddress,
    txDate,
  };
};
