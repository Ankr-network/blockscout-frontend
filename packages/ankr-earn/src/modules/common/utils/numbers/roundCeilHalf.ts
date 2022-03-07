import BigNumber from 'bignumber.js';

export const roundCeilHalf = (v: BigNumber): BigNumber =>
  v.multipliedBy(2).integerValue(BigNumber.ROUND_CEIL).dividedBy(2);
