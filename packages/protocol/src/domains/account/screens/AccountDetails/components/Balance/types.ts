export type BalanceData = {
  ankrBalance: number;
  enoughMarker: EnoughMarker;
  enoughTime: EnoughTime;
  isLoading?: boolean;
  usdtBalance: number;
};

export interface EnoughTime {
  period: EnoughTimePeriod;
  value: number;
}

export enum EnoughMarker {
  GREEN,
  YELLOW,
  RED,
}

export enum EnoughTimePeriod {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}
