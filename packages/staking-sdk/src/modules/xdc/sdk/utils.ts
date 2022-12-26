import BigNumber from 'bignumber.js';

interface IIsValidStakeAmountProps {
  amount: BigNumber;
  minStakeAmount: BigNumber;
}

/**
 * Get valid XDC address.
 *
 * @param {string} address - current user address
 * @returns {string | undefined}
 */
export const getValidXDCAddress = (address?: string): string | undefined => {
  if (typeof address !== 'string' || address.length < 42) {
    return undefined;
  }

  return address.startsWith('0x') ? `xdc${address.slice(2)}` : address;
};

/**
 * Checking stake amount on validity.
 *
 * @param {BigNumber} amount - amount for stake
 * @param {BigNumber} minStakeAmount - minimum stake amount
 * @returns {boolean}
 */
export const isValidStakeAmount = ({
  amount,
  minStakeAmount,
}: IIsValidStakeAmountProps): boolean => {
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
