import { CREDIT_TYPE } from './getPaymentHistoryItemDirection';

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

export const getAmount = (
  type: string,
  creditAnkrAmount: string,
  creditUsdAmount: string,
  amountAnkr: string,
  amountUsd: string,
) => {
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
