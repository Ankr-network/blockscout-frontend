import BigNumber from 'bignumber.js';

export const getTokenNativeAmount = (
  amount: BigNumber,
  ratio: BigNumber | undefined,
): BigNumber | undefined => {
  if (!ratio || ratio.isZero()) {
    return undefined
  };

  return amount.dividedBy(ratio);
};
