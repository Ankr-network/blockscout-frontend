import BigNumber from 'bignumber.js';

import { AccountStatus } from 'multirpc-sdk';
import { Currency } from 'domains/account/types';

export type BalanceData = {
  balance: BigNumber;
  currency: Currency;
  isLoading?: boolean;
  premiumUntil?: Date;
  status: AccountStatus;
  switchCurrency: () => void;
  usdBalance: BigNumber;
};
