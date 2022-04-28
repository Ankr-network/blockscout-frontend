import BigNumber from 'bignumber.js';

import { Balances } from './types';

const zero = new BigNumber(0);
export const defaultBalances: Balances = {
  ankrBalance: zero,
  creditBalance: zero,
  usdBalance: zero,
};
