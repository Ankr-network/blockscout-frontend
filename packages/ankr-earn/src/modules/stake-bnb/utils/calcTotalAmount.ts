import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';

export interface ICalcTotalAmountArgs {
  balance?: BigNumber;
  amount?: BigNumber;
  stakeGasFee?: BigNumber;
  relayerFee?: BigNumber;
}

export function calcTotalAmount({
  amount,
  balance = ZERO,
  stakeGasFee = ZERO,
  relayerFee = ZERO,
}: ICalcTotalAmountArgs): BigNumber {
  if (!amount) {
    return ZERO;
  }

  const maxStakingAmount = balance.minus(stakeGasFee);

  if (amount.isGreaterThanOrEqualTo(maxStakingAmount)) {
    return maxStakingAmount.minus(relayerFee);
  }

  return amount.minus(relayerFee);
}
