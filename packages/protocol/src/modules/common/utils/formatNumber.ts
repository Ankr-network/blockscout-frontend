import BigNumber from 'bignumber.js';

export const formatNumber = (number: string | number) =>
  new BigNumber(number).toFormat(0);

const formatter = Intl.NumberFormat('en', { notation: 'compact' });

// 1000000->1M etc
export const formatLongNumber = (number: number) => formatter.format(number);
