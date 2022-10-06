import BigNumber from 'bignumber.js';

export const isLessThanOrEqualTo = (value: string, border: number) =>
  new BigNumber(value).lte(border);
