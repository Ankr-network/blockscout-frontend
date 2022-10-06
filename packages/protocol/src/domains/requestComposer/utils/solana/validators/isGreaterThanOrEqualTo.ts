import BigNumber from 'bignumber.js';

export const isGreaterThanOrEqualTo = (value: string, border: number) =>
  new BigNumber(value).gte(border);
