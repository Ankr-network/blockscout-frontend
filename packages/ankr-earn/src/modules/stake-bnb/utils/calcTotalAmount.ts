import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { TBnbSyntToken } from '../types';

export interface ICalcTotalAmountArgs {
  selectedToken: TBnbSyntToken;
  balance?: BigNumber;
  amount?: BigNumber;
  stakeGasFee?: BigNumber;
  relayerFee?: BigNumber;
  aBNBcRatio?: BigNumber;
}

export function calcTotalAmount({
  amount,
  selectedToken,
  balance = ZERO,
  stakeGasFee = ZERO,
  relayerFee = ZERO,
  aBNBcRatio = ZERO,
}: ICalcTotalAmountArgs): BigNumber {
  if (!amount || amount.isZero()) {
    return ZERO;
  }

  const maxStakingAmount = balance.minus(stakeGasFee);
  const shouldUseSafeAmount = amount.isGreaterThanOrEqualTo(maxStakingAmount);

  let resultAmount = amount;

  if (shouldUseSafeAmount) {
    resultAmount = maxStakingAmount;
  }

  resultAmount = resultAmount.minus(relayerFee);

  if (selectedToken === Token.aBNBc) {
    resultAmount = resultAmount.multipliedBy(aBNBcRatio);
  }

  return resultAmount;
}
