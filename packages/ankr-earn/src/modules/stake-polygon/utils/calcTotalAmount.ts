import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';
import { Token } from 'modules/common/types/token';

import { TMaticSyntToken } from '../types';

export interface ICalcTotalAmountArgs {
  selectedToken: TMaticSyntToken;
  balance?: BigNumber;
  amount?: BigNumber;
  aMATICcRatio?: BigNumber;
}

export function calcTotalAmount({
  amount,
  selectedToken,
  balance = ZERO,
  aMATICcRatio = ZERO,
}: ICalcTotalAmountArgs): BigNumber {
  if (!amount || amount.isZero()) {
    return ZERO;
  }

  const shouldUseSafeAmount = amount.isGreaterThanOrEqualTo(balance);

  let resultAmount = amount;

  if (shouldUseSafeAmount) {
    resultAmount = balance;
  }

  if (selectedToken === Token.aMATICc) {
    resultAmount = resultAmount.multipliedBy(aMATICcRatio);
  }

  return resultAmount;
}
