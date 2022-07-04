export enum ChainType {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
}

export interface MethodRequest {
  method: string;
  calls: number;
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
