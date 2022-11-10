import BigNumber from 'bignumber.js';

const TARGET_AMOUNT = 100;

export const getPortfolioUSDAmount = (amount: BigNumber): string => {
  if (amount.isNaN() || !amount.isFinite() || amount.isLessThanOrEqualTo(0)) {
    return '0';
  }

  return amount.isGreaterThanOrEqualTo(TARGET_AMOUNT)
    ? amount.toFormat(0)
    : amount.toFormat();
};
