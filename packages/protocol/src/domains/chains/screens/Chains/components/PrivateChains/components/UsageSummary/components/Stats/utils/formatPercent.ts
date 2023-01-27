import BigNumber from 'bignumber.js';

const MAX_DECIMALS = 2;

export const formatPercent = (number: BigNumber): string => {
  const decimals = Math.min(number.dp(), MAX_DECIMALS);

  return `${number.multipliedBy(100).toFormat(decimals)}%`;
};
