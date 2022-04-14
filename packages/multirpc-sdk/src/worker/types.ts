import { UUID, Web3Address } from '../common';

export type BlockchainFeature = 'rpc' | 'ws';

export enum BlockchainType {
  Mainnet = 'mainnet',
  Extension = 'extension',
  Testnet = 'testnet',
}

export interface IBlockchainEntity {
  extends?: string;
  id: string;
  features: BlockchainFeature[];
  name: string;
  paths?: string[];
  stats?: {
    reqs: number;
  };
  type: BlockchainType;
}

export interface ICountry {
  country: string;
  bytes: number;
  requests: number;
}

export interface IImportJWTTokenResult {
  address: Web3Address;
  id: UUID;
  roles: number[];
  tier: number;
  token: string;
}

export interface INodeEntity {
  id: string;
  blockchain: string;
  scheme: string;
  requestUrl: string;
  websocketUrl?: string;
  weight: number;
  continent: string;
  country: string;
  organization: string;
  city: string;
  features: string[];
  isArchive: boolean;
}

export interface IPrivateEndpoint {
  blockchain: string;
  id?: string;
  requestUrl: string;
  scheme: string;
};

type ISO2CountryCode = string;

export type IProvider =
  | {
      address: string;
      blockchains: string[];
      id: string;
      limit: number;
    }
  | string;

export interface IWorkerEndpoint {
  blockchain: string;
  scheme: string;
  requestUrl: string;
  id: string;
  owner: string;
  user: string;
};

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
};

export interface IWorkerNodesWeight {
  id: string;
  weight: number;
  latency: number;
  timestamp: number;
  height: number;
  score: number;
};

export interface IWorkerTotalStats {
  count: number;
  sum: {
    edgeResponseBytes: number;
    visits: number;
  };
};

export interface IWorkerUserLocation {
  city: string;
  continent: string;
  country: ISO2CountryCode;
  id: string;
  name: string;
  timezone: string;
};

export type RestrictedDomains = string[];

export type RestrictedIps = string[];

export type Timeframe = '24h' | '7d' | '30d';