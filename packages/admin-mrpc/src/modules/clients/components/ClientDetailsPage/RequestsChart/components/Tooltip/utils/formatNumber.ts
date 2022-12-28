import BigNumber from 'bignumber.js';

export const formatNumber = (number: string | number) => {
  try {
    return new BigNumber(number).toFormat(0);
  } catch (e) {
    return number;
  }
};
