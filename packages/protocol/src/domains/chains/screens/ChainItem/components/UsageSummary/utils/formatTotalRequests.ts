import BigNumber from 'bignumber.js';

export const formatTotalRequests = (total = new BigNumber(0)) =>
  total.toFormat();
