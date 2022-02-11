import BigNumber from 'bignumber.js';

export interface IGetAmountData {
  amount: BigNumber;
  isLessThanOrEqualToZero: boolean;
}

export const getAmountData = (
  rawAmount: number,
  relayerFee: BigNumber,
): IGetAmountData => {
  const amount: BigNumber = new BigNumber(rawAmount).minus(relayerFee);
  const isLessThanOrEqualToZero: boolean = amount.isLessThanOrEqualTo(0);

  return {
    amount,
    isLessThanOrEqualToZero,
  };
};
