import BigNumber from 'bignumber.js';

import { TEthToken } from 'modules/api/EthSDK';
import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

export interface ICalcTotalAmountArgs {
  selectedToken: TEthToken;
  ethBalance?: BigNumber;
  amount?: BigNumber;
  aETHcRatio?: BigNumber;
  stakeGasFee?: BigNumber;
}

export function calcTotalAmount({
  selectedToken,
  amount,
  ethBalance = ZERO,
  aETHcRatio = ZERO,
  stakeGasFee = ZERO,
}: ICalcTotalAmountArgs): BigNumber {
  if (!amount) {
    return ZERO;
  }
  const maxStakingAmount = ethBalance.minus(stakeGasFee);
  const isGreaterThanMax = amount.isGreaterThanOrEqualTo(maxStakingAmount);

  if (selectedToken === Token.aETHc) {
    if (isGreaterThanMax) {
      return maxStakingAmount.multipliedBy(aETHcRatio);
    }
    return amount.multipliedBy(aETHcRatio);
  }

  if (isGreaterThanMax) {
    return maxStakingAmount;
  }

  return amount;
}
