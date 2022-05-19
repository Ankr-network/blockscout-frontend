import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { TFtmSyntToken } from '../types/TFtmSyntToken';

export interface ICalcTotalAmountArgs {
  selectedToken: TFtmSyntToken;
  balance?: BigNumber;
  amount?: BigNumber;
  stakeGasFee?: BigNumber;
  relayerFee?: BigNumber;
  aFTMcRatio?: BigNumber;
}

export function calcTotalAmount({
  amount,
  selectedToken,
  balance = ZERO,
  stakeGasFee = ZERO,
  aFTMcRatio = ZERO,
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

  if (selectedToken === Token.aFTMc) {
    resultAmount = resultAmount.multipliedBy(aFTMcRatio);
  }

  return resultAmount;
}
