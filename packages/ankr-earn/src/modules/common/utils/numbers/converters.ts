import BigNumber from 'bignumber.js';
import web3 from 'web3';

export type BigNumberish = string | number | BigNumber;

export const convertNumberToHex = (
  value: BigNumberish,
  scale: BigNumberish = 1,
): string => {
  const num = new BigNumber(value).multipliedBy(scale);

  return web3.utils.numberToHex(num.toString(10));
};
