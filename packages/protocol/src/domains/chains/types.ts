export enum ChainType {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export interface MethodRequest {
  method: string;
  calls: number;
}

export enum Period {
  Day = '24h',
  Week = '7d',
  Month = '30d',
}

export interface PreparedRequest extends MethodRequest {
  percent: number;
}

export enum SortType {
  Name = 'name',
  Usage = 'usage',
}

export enum StatsTimeframe {
  DAY,
  WEEK,
  MONTH,
}
