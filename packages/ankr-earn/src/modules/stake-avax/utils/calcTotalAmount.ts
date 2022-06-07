import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { TAvaxSyntToken } from '../types';

export interface ICalcTotalAmountArgs {
  selectedToken: TAvaxSyntToken;
  balance?: BigNumber;
  amount?: BigNumber;
  aAVAXcRatio?: BigNumber;
}

export function calcTotalAmount({
  amount,
  selectedToken,
  balance = ZERO,
  aAVAXcRatio = ZERO,
}: ICalcTotalAmountArgs): BigNumber {
  if (!amount || amount.isZero()) {
    return ZERO;
  }

  const shouldUseSafeAmount = amount.isGreaterThanOrEqualTo(balance);

  let resultAmount = amount;

  if (shouldUseSafeAmount) {
    resultAmount = balance;
  }

  if (selectedToken === Token.aAVAXc) {
    resultAmount = resultAmount.multipliedBy(aAVAXcRatio);
  }

  return resultAmount;
}
