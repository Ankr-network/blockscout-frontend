import BigNumber from 'bignumber.js';

export const sumAmountsWithRoundUp = (
  num1: number,
  num2: number,
  decimals: number,
) => {
  const num1BN = new BigNumber(num1).decimalPlaces(
    decimals,
    BigNumber.ROUND_UP,
  );
  const num2BN = new BigNumber(num2).decimalPlaces(
    decimals,
    BigNumber.ROUND_UP,
  );

  return num1BN
    .plus(num2BN)
    .decimalPlaces(decimals, BigNumber.ROUND_UP)
    .toNumber();
};
