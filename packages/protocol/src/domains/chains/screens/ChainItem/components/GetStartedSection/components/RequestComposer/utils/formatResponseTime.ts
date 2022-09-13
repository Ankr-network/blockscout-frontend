import BigNumber from 'bignumber.js';

export const formatResponseTime = (ms: number) => new BigNumber(ms).toFormat(2);
