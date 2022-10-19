import { Web3KeyReadProvider } from '@ankr.com/provider-core';
import BigNumber from 'bignumber.js';

interface IGetReadableAmountFromWeiProps {
  amount: string;
  provider: Web3KeyReadProvider;
}

interface IIsValidAmountProps {
  amount: BigNumber;
  minStakeAmount: BigNumber;
}

export const getReadableAmountFromWei = ({
  amount,
  provider,
}: IGetReadableAmountFromWeiProps): BigNumber => {
  const web3 = provider.getWeb3();

  return new BigNumber(web3.utils.fromWei(amount));
};

export const isValidAmount = ({
  amount,
  minStakeAmount,
}: IIsValidAmountProps): boolean => {
  // Note: amount >= minStakeAmount && amount % minStakeAmount === 0
  // Link: https://github.com/Ankr-network/ankr-contracts/blob/devel/contracts/earn/LiquidTokenStakingPool.sol#L88
  return (
    amount.isGreaterThanOrEqualTo(minStakeAmount) &&
    amount.modulo(minStakeAmount).isZero()
  );
};
