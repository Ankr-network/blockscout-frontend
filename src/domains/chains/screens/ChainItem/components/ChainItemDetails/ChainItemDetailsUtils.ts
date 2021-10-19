import BigNumber from 'bignumber.js';

const fmt = {
  groupSeparator: ' ',
  groupSize: 3,
};

export const formatNumber = (number: BigNumber): string => {
  return number.toFormat(fmt);
};
