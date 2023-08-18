import BigNumber from 'bignumber.js';
import { IBalancesEntity } from 'multirpc-sdk';
import { secondsToMilliseconds } from 'date-fns';

import { ClientBalancesMapped } from '../types';

const CREDITS_TO_USD_RATE = 10000000;

const creditsToUsd = (creditsCount: BigNumber) => {
  return creditsCount.dividedBy(CREDITS_TO_USD_RATE);
};

export const mapBalances = (
  userBalances?: IBalancesEntity,
): ClientBalancesMapped => {
  return {
    amount: userBalances?.amount
      ? new BigNumber(userBalances.amount)
      : undefined,
    amountAnkr: userBalances?.amountAnkr
      ? new BigNumber(userBalances.amountAnkr)
      : undefined,
    amountUsd: userBalances?.amountUsd
      ? new BigNumber(userBalances.amountUsd)
      : undefined,
    creditVoucherAmount: userBalances?.creditVoucherAmount
      ? new BigNumber(userBalances.creditVoucherAmount)
      : undefined,
    creditAnkrAmount: userBalances?.creditAnkrAmount
      ? new BigNumber(userBalances.creditAnkrAmount)
      : undefined,

    // creditUsdAmount - this value holds information about balance of credits purchased by USD, not USD itself.
    // So if it is necessary to show USD, this value should be converted from credits to USD.
    creditUsdAmount: userBalances?.creditUsdAmount
      ? creditsToUsd(new BigNumber(userBalances.creditUsdAmount))
      : undefined,

    voucherExpiresDate:
      userBalances?.voucherExpiresAt && +userBalances?.voucherExpiresAt > 0
        ? new Date(secondsToMilliseconds(+userBalances.voucherExpiresAt))
        : undefined,
  };
};
