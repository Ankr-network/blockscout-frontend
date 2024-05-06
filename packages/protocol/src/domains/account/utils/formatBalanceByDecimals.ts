import BigNumber from 'bignumber.js';

export const formatBalanceByDecimals = (
  balance: string,
  tokenDecimals: number,
) => {
  return new BigNumber(balance).dividedBy(10 ** tokenDecimals).toString();
};
