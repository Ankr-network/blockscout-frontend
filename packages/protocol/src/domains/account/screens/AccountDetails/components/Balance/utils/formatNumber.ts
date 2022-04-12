import BigNumber from 'bignumber.js';

export const formatNumber = (number = 0) => {
  return new BigNumber(number).toFormat();
};
