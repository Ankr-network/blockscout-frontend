import BigNumber from 'bignumber.js';

const SMALL_BALANCE_AMOUNT = 1;

export const isBalanceSmall = (balanceUsd: BigNumber | undefined): boolean => {
  return balanceUsd ? balanceUsd.isLessThan(SMALL_BALANCE_AMOUNT) : true;
};
