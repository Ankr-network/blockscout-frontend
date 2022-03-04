import BigNumber from 'bignumber.js';
import { ReactText } from 'react';

import { ZERO } from 'modules/common/const';

export const calcYearlyEarning = (
  amount: ReactText,
  apy: ReactText,
): BigNumber => {
  return amount ? new BigNumber(amount).multipliedBy(apy).dividedBy(100) : ZERO;
};
