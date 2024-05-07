import BigNumber from 'bignumber.js';

import { TEN } from '../common';

export const getBNAmountByTokenDecimals = ({
  value,
  tokenDecimals,
}: {
  value: BigNumber;
  tokenDecimals: number;
}) => value.multipliedBy(TEN.pow(tokenDecimals));
