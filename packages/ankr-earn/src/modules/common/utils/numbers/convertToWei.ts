import BigNumber from 'bignumber.js';

import { ETH_SCALE_FACTOR } from 'modules/common/const';

export const convertToWei = (amount: BigNumber.Value): BigNumber => {
  const bnAmount = new BigNumber(amount);

  return bnAmount.isZero() ? bnAmount : bnAmount.multipliedBy(ETH_SCALE_FACTOR);
};
