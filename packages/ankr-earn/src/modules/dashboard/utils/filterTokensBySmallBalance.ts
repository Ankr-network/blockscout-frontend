import BigNumber from 'bignumber.js';

import { ZERO } from '../../common/const';

import { isBalanceSmall } from './isBalanceSmall';

export const filterTokensBySmallBalance = (
  usdAmounts: Array<BigNumber | undefined>,
  isShown: boolean,
  isSmallBalancesVisible: boolean,
): boolean => {
  if (!isShown) {
    return false;
  }
  return (
    isSmallBalancesVisible ||
    usdAmounts.some(amount => !isBalanceSmall(amount ?? ZERO))
  );
};
