import BigNumber from 'bignumber.js';

interface IIsValidAmountProps {
  amount: BigNumber;
  minStakeAmount: BigNumber;
}

export const isValidAmount = ({
  amount,
  minStakeAmount,
}: IIsValidAmountProps): boolean => {
  if (amount.isLessThanOrEqualTo(0) || minStakeAmount.isLessThanOrEqualTo(0)) {
    return false;
  }

  // Note: amount >= minStakeAmount && amount % minStakeAmount === 0
  // Link: https://github.com/Ankr-network/ankr-contracts/blob/devel/contracts/earn/LiquidTokenStakingPool.sol#L88
  return (
    amount.isGreaterThanOrEqualTo(minStakeAmount) &&
    amount.modulo(minStakeAmount).isZero()
  );
};
