export interface ICountry {
  country: string;
  bytes: number;
  requests: number;
}

export interface IWorkerGlobalStatus {
  uniqueVisitors: number;
  uniqueVisitorsHistory: Record<string, number>;
  totalRequests: number;
  totalRequestsHistory: Record<string, number>;
  totalCached: number;
  totalCachedHistory: Record<string, number>;
  totalServed: number;
  totalServedHistory: Record<string, number>;
  dataCached: number;
  dataCachedHistory: Record<string, number>;
  countries: Record<string, ICountry>;
}

export interface IWorkerNodesWeight {
  id: string;
  weight: number;
  latency: number;
  timestamp: number;
  height: number;
  score: number;
}

export type Timeframe = '24h' | '7d' | '30d';
