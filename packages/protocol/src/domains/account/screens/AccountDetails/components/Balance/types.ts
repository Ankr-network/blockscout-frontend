import BigNumber from 'bignumber.js';

import { AccountType, BalanceStatus, Currency } from 'domains/account/types';

export type BalanceData = {
  accountType: AccountType;
  balance: BigNumber;
  balanceEndTime: number;
  isLoading?: boolean;
  onCurrencySwitch: (currency: Currency) => void;
  premiumUntil?: Date;
  status: BalanceStatus;
  usdBalance: BigNumber;
};
