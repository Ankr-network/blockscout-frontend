import { Tier, UUID, Web3Address } from '../common';

export interface IImportJWTTokenResult {
  address: Web3Address;
  id: UUID;
  roles: number[];
  tier: Tier;
  // use this token for private urls
  token: string;
}

export interface IPrivateEndpoint {
  blockchain: string;
  id?: string;
  requestUrl: string;
  scheme: string;
}

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
}

export type RestrictedDomains = string[];

export type RestrictedIps = string[];
