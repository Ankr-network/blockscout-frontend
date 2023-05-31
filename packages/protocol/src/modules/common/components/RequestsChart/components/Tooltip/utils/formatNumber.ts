import BigNumber from 'bignumber.js';

export const formatNumber = (number: string | number) =>
  new BigNumber(number).toFormat(0);
