import BigNumber from 'bignumber.js';

import { AccountStatus, Tier } from 'multirpc-sdk';

export type BalanceData = {
  ankrBalance: BigNumber;
  enoughTime: EnoughTime;
  isLoading?: boolean;
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
