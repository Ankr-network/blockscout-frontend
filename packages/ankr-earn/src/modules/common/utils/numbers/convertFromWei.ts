import BigNumber from 'bignumber.js';
import { ReactText } from 'react';

import { ETH_SCALE_FACTOR } from 'modules/common/const';

export const convertFromWei = (amount: ReactText): BigNumber => {
  const bnAmount = new BigNumber(amount);

  return bnAmount.isZero() ? bnAmount : bnAmount.dividedBy(ETH_SCALE_FACTOR);
};
