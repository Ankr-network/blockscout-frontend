import { AxiosInstance } from 'axios';

import { IJwtToken } from '../common';
import {
  IBlockchainEntity,
  ICountersEntity,
  IImportJWTTokenResult,
  INodeEntity,
  IPrivateEndpoint,
  IProvider,
  IWorkerEndpoint,
  IWorkerGlobalStatus,
  IWorkerNodesWeight,
  IWorkerTotalStats,
  IWorkerUserLocation,
  RestrictedDomains,
  RestrictedIps,
  Timeframe,
} from './types';

export interface IWorkerBackofficeGateway {
  api: AxiosInstance;

  addJwtToken(jwtToken: IJwtToken): void;

  createOrUpdateBlockchain(
    node: IBlockchainEntity,
  ): Promise<Record<string, any>>;

  createOrUpdateNode(node: INodeEntity): Promise<Record<string, any>>;

  deleteBlockchain(blockchain: IBlockchainEntity): Promise<IBlockchainEntity>;

  deleteNode(node: INodeEntity): Promise<INodeEntity>;

  getBlockchains(): Promise<IBlockchainEntity[]>;

  getCounters(limit?: number): Promise<ICountersEntity[]>;

  getNodes(blockchain?: string): Promise<INodeEntity[]>;

  migrateLegacy(): Promise<INodeEntity[]>;

  removeJwtToken(): void;
}

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

  getBlockchains(): Promise<IBlockchainEntity[]>;

  getChainRestrictedDomains(chainId: string): Promise<RestrictedDomains>;

  getChainRestrictedIps(chainId: string): Promise<RestrictedIps>;

  getEndpoints(): Promise<IWorkerEndpoint>;

  getGlobalStats(blockchain?: string): Promise<IWorkerGlobalStatus>;

  getLegacyStats(blockchain?: string): Promise<IWorkerTotalStats[]>;

  getNodes(blockchain?: string): Promise<INodeEntity[]>;

  getNodesWeight(): Promise<IWorkerNodesWeight[]>;

  getProvider(): Promise<IProvider>;

  getTimeframeStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus>;

  getTotalStats(blockchain?: string): Promise<IWorkerTotalStats[]>;

  getUserLocation(): Promise<IWorkerUserLocation>;

  importJwtToken(jwtToken?: string): Promise<IImportJWTTokenResult>;

  removeJwtToken(): void;
}
