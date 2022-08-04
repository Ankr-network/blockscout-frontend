import BigNumber from 'bignumber.js';

export const COLOR_LIST = [
  '#F36335',
  '#F3B235',
  '#B6F335',
  '#2FE979',
  '#B6F335',
  '#356DF3',
  '#356DF3',
  '#5B35F3',
  '#CD35F3',
  '#F335A7',
  '#F335A7',
];

export const formatNumber = (number: number) => {
  return new BigNumber(number).toFormat();
};

export const calculateTotalRequests = (list: number[]) =>
  list.reduce((total, value) => value + total, 0);
