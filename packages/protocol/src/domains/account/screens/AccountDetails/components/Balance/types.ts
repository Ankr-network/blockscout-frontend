import BigNumber from 'bignumber.js';

import { AccountStatus } from 'multirpc-sdk';

export type BalanceData = {
  ankrBalance: BigNumber;
  enoughTime: EnoughTime;
  isLoading?: boolean;
  premiumUntil?: Date;
  serviceType: ServiceType;
  status: AccountStatus;
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

export enum ServiceType {
  Premium,
  Served,
  Unserved,
}
