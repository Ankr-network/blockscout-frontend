import BigNumber from 'bignumber.js';

export const COLOR_LIST = [
  '#356DF3',
  '#46E8FE',
  '#5AE07F',
  '#21C2A9',
  '#FEE046',
  '#FFAA6C',
  '#F33535',
  '#D134EA',
  '#7942E3',
  '#2C17A9',
  '#1D1647',
];

export const formatNumber = (number: number) => {
  return new BigNumber(number).toFormat();
};

export const calculateTotalRequests = (list: number[]) =>
  list.reduce((total, value) => value + total, 0);
