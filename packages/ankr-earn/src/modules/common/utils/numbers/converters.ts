import BigNumber from 'bignumber.js';

export type BigNumberish = string | number | BigNumber;

export const convertNumberToHex = (
  value: BigNumberish,
  scale: BigNumberish = 1,
): string => {
  const hex = new BigNumber(value).multipliedBy(scale).toString(16);

  return `0x${hex}`;
};
