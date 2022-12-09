import BigNumber from 'bignumber.js';

interface IIsValidAmountProps {
  amount: BigNumber;
  minStakeAmount: BigNumber;
}

export const getXDCAddress = (address?: string): string | undefined => {
  if (typeof address !== 'string' || address.length < 42) {
    return undefined;
  }

  return address.startsWith('0x') ? `xdc${address.slice(2)}` : address;
};

export const isValidAmount = ({
  amount,
  minStakeAmount,
}: IIsValidAmountProps): boolean => {
  if (amount.isLessThanOrEqualTo(0) || minStakeAmount.isLessThanOrEqualTo(0)) {
    return false;
  }

  // Note: amount >= minStakeAmount && amount % minStakeAmount === 0
  // Link: https://github.com/Ankr-network/ankr-contracts/blob/unstaking/contracts/earn/LiquidTokenStakingPool.sol#L132
  return (
    amount.isGreaterThanOrEqualTo(minStakeAmount) &&
    amount.modulo(minStakeAmount).isZero()
  );
};
