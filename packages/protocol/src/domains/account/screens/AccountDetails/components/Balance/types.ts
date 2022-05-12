import BigNumber from 'bignumber.js';

import { AccountStatus, Tier } from 'multirpc-sdk';
import { Currency } from 'domains/account/types';

export type BalanceData = {
  balance: BigNumber;
  enoughTime: EnoughTime;
  isLoading?: boolean;
  onCurrencySwitch: (currency: Currency) => void;
  premiumUntil?: Date;
  status: AccountStatus;
  tier?: Tier;
  usdBalance: BigNumber;
};

export enum DescriptionType {
  PREMIUM,
  STOPPED,
}

export interface EnoughTime {
  period: EnoughTimePeriod;
  value: number;
}

export enum EnoughTimePeriod {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}
