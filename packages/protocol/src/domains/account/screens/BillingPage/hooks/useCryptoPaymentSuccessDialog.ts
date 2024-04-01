import BigNumber from 'bignumber.js';
import { Token, getTokenAddress } from 'multirpc-sdk';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { API_ENV } from 'modules/common/utils/environment';
import { ECurrency, ENetwork, EPaymentType } from 'modules/billing/types';
import { ZERO } from 'modules/common/constants/const';
import { getExplorerLink } from 'domains/account/screens/TopUp/components/TopUpSteps/TransactionButton/TransactionButtonUtils';
import { useCryptoPaymentSuccessDialog as useCryptoPaymentSuccessDialogBase } from 'modules/billing/components/CryptoPaymentSuccessDialog';
import { useGetGasPriceQuery } from 'domains/account/actions/fetchGasPrice';
import { useGetTxDataQuery } from 'domains/account/actions/fetchTxData';
import { useGetTxReceiptQuery } from 'domains/account/actions/fetchTxReceipt';
import { useNativeTokenPrice } from 'domains/account/hooks/useNativeTokenPrice';
import { useTokenPrice } from 'domains/account/hooks/useTokenPrice';

export interface IUseDetailsButtonProps {
  amount: string;
  token: Token;
  txHash: string;
  date: Date;
  isOpened: boolean;
}

export const useCryptoPaymentSuccessDialog = ({
  amount,
  token,
  txHash,
  date,
  isOpened,
}: IUseDetailsButtonProps) => {
  const { data: txData, isFetching: isTxDataLoading } = useGetTxDataQuery(
    isOpened ? { txHash } : skipToken,
  );
  const { data: txReceipt, isFetching: isTxReceiptLoading } =
    useGetTxReceiptQuery(isOpened ? { txHash } : skipToken);
  const { price: nativeTokenPrice, isFetching: isNativeTokenPriceLoading } =
    useNativeTokenPrice({ skipFetching: !isOpened });

  const { price: tokenPrice, isFetching: isTokenPriceLoading } = useTokenPrice({
    tokenAddress: getTokenAddress(token, API_ENV),
    skipFetching: !isOpened,
  });

  const { data: gasPrice = ZERO } = useGetGasPriceQuery(undefined, {
    skip: !isOpened,
  });

  const gasUsed = txReceipt?.gasUsed;
  const depositAmount = +amount;
  const depositAmountUsd = new BigNumber(tokenPrice).multipliedBy(
    depositAmount,
  );
  const depositFee = gasPrice.multipliedBy(gasUsed ?? 0);
  const depositFeeUsd = depositFee.multipliedBy(nativeTokenPrice);

  const {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
  } = useCryptoPaymentSuccessDialogBase({
    amount: depositAmount,
    amountUsd: depositAmountUsd.toNumber(),
    currency: ECurrency.ANKR,
    depositFee: depositFee.toNumber(),
    depositFeeUSD: depositFeeUsd.toNumber(),
    depositTxURL: getExplorerLink(txHash),
    fromAddress: txData?.from ?? '',
    network: ENetwork.ETH,
    paymentType: EPaymentType.OneTime,
    toAddress: txData?.to ?? '',
    txDate: date,
  });

  return {
    cryptoPaymentSuccessDialogProps,
    handleCryptoPaymentSuccessDialogOpen,
    isLoading:
      isTxDataLoading ||
      isTxReceiptLoading ||
      isNativeTokenPriceLoading ||
      isTokenPriceLoading,
  };
};
