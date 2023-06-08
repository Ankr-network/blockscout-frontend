import BigNumber from 'bignumber.js';

import { AccountType, BalanceStatus, Currency } from 'domains/account/types';

export type BalanceData = {
  accountType: AccountType;
  balance: BigNumber;
  currency: Currency;
  balanceEndTime: number;
  isLoading?: boolean;
  premiumUntil?: Date;
  status: BalanceStatus;
  switchCurrency: () => void;
  usdBalance: BigNumber;
};
