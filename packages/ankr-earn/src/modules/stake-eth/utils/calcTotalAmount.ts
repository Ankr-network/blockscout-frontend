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
  if (!amount || amount.isZero()) {
    return ZERO;
  }

  const maxStakingAmount = ethBalance.minus(stakeGasFee);
  const shouldUseSafeAmount = amount.isGreaterThanOrEqualTo(maxStakingAmount);

  let resultAmount = amount;

  if (shouldUseSafeAmount) {
    resultAmount = maxStakingAmount;
  }

  if (selectedToken === Token.aETHc) {
    resultAmount = resultAmount.multipliedBy(aETHcRatio);
  }

  return resultAmount;
}
