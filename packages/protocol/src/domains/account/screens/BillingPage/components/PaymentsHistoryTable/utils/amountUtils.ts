import { CREDIT_TYPE } from './getPaymentHistoryItemDirection';
import { isRewardConversionReason } from './isRewardConversionReason';

export const hasCreditAmount = (
  creditAnkrAmount: string,
  creditUsdAmount: string,
) => !(Number(creditAnkrAmount) > 0 || Number(creditUsdAmount) > 0);

export const isCreditAmount = (
  type: string,
  creditAnkrAmount: string,
  creditUsdAmount: string,
) =>
  CREDIT_TYPE.includes(type) ||
  hasCreditAmount(creditAnkrAmount, creditUsdAmount);

interface GetAmountArguments {
  amountAnkr: string;
  amountUsd: string;
  creditAnkrAmount: string;
  creditUsdAmount: string;
  reason?: string;
  type: string;
}

export const getAmount = ({
  amountAnkr,
  amountUsd,
  creditAnkrAmount,
  creditUsdAmount,
  reason,
  type,
}: GetAmountArguments) => {
  if (isRewardConversionReason(reason)) {
    return '-';
  }

  if (isCreditAmount(type, creditAnkrAmount, creditUsdAmount)) {
    return '';
  }

  if (Number(creditAnkrAmount) > 0) {
    return amountAnkr;
  }

  if (Number(creditUsdAmount) > 0) {
    return amountUsd;
  }

  return amountAnkr;
};
