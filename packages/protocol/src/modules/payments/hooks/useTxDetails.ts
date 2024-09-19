import BigNumber from 'bignumber.js';
import { EBlockchain } from 'multirpc-sdk';
import { useMemo } from 'react';

import { ECurrency } from 'modules/payments/types';
import { getDateFromUnixSeconds } from 'modules/common/utils/getDateFromUnixSeconds';

import { getTxFeeByTxReceipt } from '../utils/getTxFeeByTxReceipt';
import { useBlockchainTxData } from './useBlockchainTxData';
import { useBlockchainTxReceipt } from './useBlockchainTxReceipt';
import { useNativeTokenPrice } from './useNativeTokenPrice';
import { useTokenPrice } from './useTokenPrice';

export interface IUseTxDetailsProps {
  amount: number;
  currency: ECurrency;
  network: EBlockchain;
  skipFetching?: boolean;
  txHash: string;
}

export const useTxDetails = ({
  amount,
  currency,
  network,
  skipFetching,
  txHash,
}: IUseTxDetailsProps) => {
  const { blockchainTxData, isLoading: isBlockchainTxDataLoading } =
    useBlockchainTxData({ network, skipFetching, txHash });

  const { isLoading: isTxReceiptLoading, txReceipt } = useBlockchainTxReceipt({
    network,
    skipFetching,
    txHash,
  });

  const { isLoading: isNativeTokenPriceLoading, price: nativeTokenPrice } =
    useNativeTokenPrice({ network, requestId: txHash, skipFetching });

  const { isLoading: isTokenPriceLoading, price: tokenPrice } = useTokenPrice({
    currency,
    network,
    requestId: txHash,
    skipFetching,
  });

  const isLoading =
    isBlockchainTxDataLoading ||
    isTxReceiptLoading ||
    isNativeTokenPriceLoading ||
    isTokenPriceLoading;

  const fromAddress = blockchainTxData?.tx.from || '';
  const toAddress = blockchainTxData?.tx.to || '';
  const txDate = blockchainTxData?.timestamp
    ? getDateFromUnixSeconds(blockchainTxData.timestamp)
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
