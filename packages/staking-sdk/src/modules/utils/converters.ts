import BigNumber from 'bignumber.js';
import web3 from 'web3';

export type BigNumberish = string | number | BigNumber;

/**
 * Convert value to hex number
 * 
 * @param {(string | number | BigNumber)} value - value to convert to hex
 * @param {(string | number | BigNumber)} [scale = 1] - scale factor for value
 * @returns {string} - hex value
 */
export const convertNumberToHex = (
  value: BigNumberish,
  scale: BigNumberish = 1,
): string => {
  const num = new BigNumber(value).multipliedBy(scale);

  return web3.utils.numberToHex(num.toString(10));
};
