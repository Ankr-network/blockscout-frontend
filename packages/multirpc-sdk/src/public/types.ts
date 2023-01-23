import { BlockchainID } from '../account';

export interface ICountry<T> {
  country: string;
  bytes: T;
  requests: T;
}

export type TotalRequestsHistoryTimestamp = string;

export type TotalRequestsHistory = Record<
  TotalRequestsHistoryTimestamp,
  number
>;

export interface IWorkerGlobalStatus<T = number> {
  uniqueVisitors: T;
  uniqueVisitorsHistory: Record<string, T>;
  totalRequests: T;
  totalRequestsHistory: TotalRequestsHistory;
  totalCached: T;
  totalCachedHistory: Record<string, T>;
  totalServed: T;
  totalServedHistory: Record<string, T>;
  dataCached: T;
  dataCachedHistory: Record<string, T>;
  countries: Record<string, ICountry<T>>;
}

export interface IWorkerPublicStats {
  totalRequests: Record<BlockchainID, string>;
}

export type Timeframe = '1h' | '24h' | '7d' | '30d';

export interface Config {
  workerUrl: string;
  accountUrl: string;
}

export enum CurrencyRateSymbol {
  'USD/ANKR' = 'USD/ANKR',
  'CREDIT/ANKR' = 'CREDIT/ANKR',
  'CREDIT/USD' = 'CREDIT/USD',
}

export interface CurrencyRate {
  decimals: number;
  rate: string;
  symbol: CurrencyRateSymbol;
}

export interface IRate {
  rates: CurrencyRate[];
}

export interface INodeDetailEntity {
  height: number;
  score: number;
  name: string;
  weight: number;
  scheme: string;
  location: {
    continent: string;
    country: string;
  };
}

export interface INodesDetailEntity {
  name: string;
  id: string;
  hasArchive: boolean;
  nodes: INodeDetailEntity[];
}

export interface IWorkerNodesWeight {
  id: string;
  weight: number;
  latency: number;
  timestamp: number;
  height: number;
  height_timestamp: number;
  score: number;
}