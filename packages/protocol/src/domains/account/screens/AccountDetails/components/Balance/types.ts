import { AccountStatus } from 'modules/account/types';

export type BalanceData = {
  ankrBalance: number;
  enoughTime: EnoughTime;
  isLoading?: boolean;
  status: AccountStatus;
  usdtBalance: number;
};

export interface EnoughTime {
  period: EnoughTimePeriod;
  value: number;
}

export enum EnoughTimePeriod {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}
