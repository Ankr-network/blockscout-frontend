import BigNumber from 'bignumber.js';

import { AccountStatus } from 'multirpc-sdk';
import { Currency } from 'domains/account/types';

export type BalanceData = {
  balance: BigNumber;
  isLoading?: boolean;
  onCurrencySwitch: (currency: Currency) => void;
  premiumUntil?: Date;
  status: AccountStatus;
  usdBalance: BigNumber;
};
