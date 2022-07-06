import BigNumber from 'bignumber.js';
import { ReactText } from 'react';

import { ZERO } from 'modules/common/const';

export function convertAmountToBN(amount?: ReactText): BigNumber {
  if (!amount) {
    return ZERO;
  }

  const currAmount = new BigNumber(amount);

  return currAmount.isGreaterThan(0) ? currAmount : ZERO;
}
