import BigNumber from 'bignumber.js';

import { Balance } from './types';

const zero = new BigNumber(0);

export const defaultBalance: Balance = {
  ankrBalance: zero,
  creditBalance: zero,
  usdBalance: zero,
  voucherBalance: zero,
  ankrBalanceWithoutVouchers: zero,
};
