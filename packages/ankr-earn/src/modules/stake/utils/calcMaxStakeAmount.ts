import BigNumber from 'bignumber.js';

import { floor } from 'modules/common/utils/floor';

export interface ICalcMaxStakeAmountArgs {
  balance: BigNumber;
  maxAmount: BigNumber;
  maxAmountDecimals?: number;
  stakingAmountStep?: number;
}

export const calcMaxStakeAmount = ({
  balance,
  maxAmount,
  maxAmountDecimals,
  stakingAmountStep,
}: ICalcMaxStakeAmountArgs): string => {
  const balanceRoundedByStep = stakingAmountStep
    ? `${floor(balance.toNumber(), stakingAmountStep)}`
    : balance.toString();

  const maxRoundedAmount = balance.isLessThanOrEqualTo(maxAmount)
    ? balanceRoundedByStep
    : maxAmount.toString();

  return maxAmountDecimals
    ? new BigNumber(maxRoundedAmount)
        .decimalPlaces(maxAmountDecimals, BigNumber.ROUND_DOWN)
        .toString()
    : maxRoundedAmount;
};
