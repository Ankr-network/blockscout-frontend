import BigNumber from 'bignumber.js';

import { SUI_MIN_STAKE_AMOUNT } from '../const';

export const getMinStake = async (): Promise<BigNumber> => {
  return SUI_MIN_STAKE_AMOUNT;
};
