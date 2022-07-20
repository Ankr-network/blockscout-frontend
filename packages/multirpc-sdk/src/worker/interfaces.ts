import { AxiosInstance } from 'axios';

import { IJwtToken } from '../common';
import {
  IImportJWTTokenResult,
  IPrivateEndpoint,
  IProvider,
  IWorkerEndpoint,
  IWorkerTotalStats,
  IWorkerUserLocation,
  RestrictedDomains,
  RestrictedIps,
} from './types';

export interface IWorkerGateway {
  api: AxiosInstance;

  addJwtToken(jwtToken: IJwtToken): void;

  addPrivateEndpoint(endpoint: IPrivateEndpoint): Promise<IWorkerEndpoint>;

  deletePrivateEndpoint(id: string): Promise<void>;

  editChainRestrictedDomains(
    chainId: string,
    domains: RestrictedDomains,
  ): Promise<RestrictedDomains>;
  editChainRestrictedIps(
    chainId: string,
    ips: RestrictedDomains,
  ): Promise<RestrictedIps>;
  editPrivateEndpoint(endpoint: IPrivateEndpoint): Promise<IWorkerEndpoint>;

  getChainRestrictedDomains(chainId: string): Promise<RestrictedDomains>;

  getChainRestrictedIps(chainId: string): Promise<RestrictedIps>;

  getEndpoints(): Promise<IWorkerEndpoint>;

  getLegacyStats(blockchain?: string): Promise<IWorkerTotalStats[]>;

  getProvider(): Promise<IProvider>;

  getTotalStats(blockchain?: string): Promise<IWorkerTotalStats[]>;

  getUserLocation(): Promise<IWorkerUserLocation>;

  importJwtToken(jwtToken?: string): Promise<IImportJWTTokenResult>;

  removeJwtToken(): void;
}
