import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Token, getTokenAddress } from 'multirpc-sdk';

import { useGetGasPriceQuery } from 'domains/account/actions/fetchGasPrice';
import { useGetNativeTokenPriceQuery } from 'domains/account/actions/fetchNativeTokenPrice';
import { useGetTokenPriceQuery } from 'domains/account/actions/fetchTokenPrice';
import { useGetTxDataQuery } from 'domains/account/actions/fetchTxData';
import { useGetTxReceiptQuery } from 'domains/account/actions/fetchTxReceipt';
import { getExplorerLink } from 'domains/account/screens/TopUp/components/TopUpSteps/TransactionButton/TransactionButtonUtils';
import { useSuccessCryptoPaymentDialog } from 'modules/billing/components/SuccessCryptoPaymentDialog';
import { ECurrency, ENetwork, EPaymentType } from 'modules/billing/types';
import { ZERO } from 'modules/common/constants/const';
import { API_ENV } from 'modules/common/utils/environment';

export interface IUseDetailsButtonProps {
  amount: string;
  token: Token;
  txHash: string;
  date: Date;
  isOpened: boolean;
}

export const useDetailsButton = ({
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
  const {
    data: nativeTokenPrice = ZERO,
    isFetching: isNativeTokenPriceLoading,
  } = useGetNativeTokenPriceQuery(undefined, {
    skip: !isOpened,
  });
  const { data: tokenPrice = ZERO, isFetching: isTokenPriceLoading } =
    useGetTokenPriceQuery(
      isOpened ? { tokenAddress: getTokenAddress(token, API_ENV) } : skipToken,
    );
  const { data: gasPrice = ZERO } = useGetGasPriceQuery(undefined, {
    skip: !isOpened,
  });

  const gasUsed = txReceipt?.gasUsed;
  const depositAmount = +amount;
  const depositAmountUsd = tokenPrice.multipliedBy(depositAmount);
  const depositFee = gasPrice.multipliedBy(gasUsed ?? 0);
  const depositFeeUsd = depositFee.multipliedBy(nativeTokenPrice);

  const {
    successCryptoPaymentDialogProps,
    handleSuccessCryptoPaymentDialogOpen,
  } = useSuccessCryptoPaymentDialog({
    amount: depositAmount,
    amountUSD: depositAmountUsd.toNumber(),
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
    isLoading:
      isTxDataLoading ||
      isTxReceiptLoading ||
      isNativeTokenPriceLoading ||
      isTokenPriceLoading,
    successCryptoPaymentDialogProps,
    handleSuccessCryptoPaymentDialogOpen,
  };
};
