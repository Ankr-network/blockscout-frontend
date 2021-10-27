import BigNumber from 'bignumber.js';

const fmt = {
  groupSeparator: ' ',
  groupSize: 3,
};

export const formatNumber = (number: BigNumber): string => {
  let formattedNumber;
  try {
    formattedNumber = number.toFormat(fmt);
  } catch (e) {
    /* got case with number caching with data mutation */
    formattedNumber = new BigNumber(number).toFormat(fmt);
  }

  return formattedNumber;
};
