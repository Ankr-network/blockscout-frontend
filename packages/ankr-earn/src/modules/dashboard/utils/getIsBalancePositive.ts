import BigNumber from 'bignumber.js';

import { ZERO } from 'modules/common/const';

export const getIsBalancePositive = (balance?: BigNumber | null): boolean =>
  !(balance ?? ZERO).isZero();
