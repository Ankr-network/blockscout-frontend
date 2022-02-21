import BigNumber from 'bignumber.js';

export interface IGetAmountData {
  amount: BigNumber;
  isLessThanOrEqualToZero: boolean;
}

export const getAmountData = (
  rawAmount: BigNumber,
  relayerFee: BigNumber,
): IGetAmountData => {
  const amount = rawAmount.minus(relayerFee);
  const isLessThanOrEqualToZero = amount.isLessThanOrEqualTo(0);

  return {
    amount,
    isLessThanOrEqualToZero,
  };
};
