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

export interface IWorkerNodesWeight {
  id: string;
  weight: number;
  latency: number;
  timestamp: number;
  height: number;
  score: number;
}

export type Timeframe = '1h' | '24h' | '7d' | '30d';

export interface Config {
  workerUrl: string;
  accountUrl: string;
}
