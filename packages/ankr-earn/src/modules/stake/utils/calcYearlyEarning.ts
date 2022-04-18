import BigNumber from 'bignumber.js';
import { ReactText } from 'react';

export const calcYearlyEarning = (
  amount: BigNumber,
  apy: ReactText,
): BigNumber => {
  return amount.multipliedBy(apy).dividedBy(100);
};
