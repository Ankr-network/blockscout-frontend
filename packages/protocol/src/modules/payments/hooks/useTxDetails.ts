import BigNumber from 'bignumber.js';
import { EBlockchain } from 'multirpc-sdk';
import { useMemo } from 'react';

import { ECurrency } from 'modules/payments/types';
import { getDateFromUnixSeconds } from 'modules/common/utils/getDateFromUnixSeconds';

import { getTxFeeByTxReceipt } from '../utils/getTxFeeByTxReceipt';
import { useBlockchainTx } from './useBlockchainTx';
import { useNativeTokenPrice } from './useNativeTokenPrice';
import { useTokenPrice } from './useTokenPrice';
import { useTxReceipt } from './useTxReceipt';

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
  const { blockchainTx, isLoading: isTxDataLoading } = useBlockchainTx({
    network,
    skipFetching,
    txHash,
  });

  const { txReceipt, isLoading: isTxReceiptLoading } = useTxReceipt({
    network,
    skipFetching,
    txHash,
  });

  const { price: nativeTokenPrice, isLoading: isNativeTokenPriceLoading } =
    useNativeTokenPrice({ skipFetching, network });

  const { price: tokenPrice, isLoading: isTokenPriceLoading } = useTokenPrice({
    currency,
    network,
    skipFetching,
  });

  const isLoading =
    isTxDataLoading ||
    isTxReceiptLoading ||
    isNativeTokenPriceLoading ||
    isTokenPriceLoading;

  const fromAddress = blockchainTx?.tx.from ?? '';
  const toAddress = blockchainTx?.tx.to ?? '';
  const txDate = blockchainTx?.timestamp
    ? getDateFromUnixSeconds(blockchainTx.timestamp)
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
