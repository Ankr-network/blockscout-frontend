import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { AXIOS_DEFAULT_CONFIG, IJwtToken } from '../common';
import {
  IBlockchainEntity,
  IImportJWTTokenResult,
  INodeEntity,
  IPaymentHistoryReponse,
  IPaymentHistoryRequest,
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
import { IWorkerGateway } from './interfaces';
import { getPaymentHistoryMock } from '../mock/getPaymentHistoryMock';

export class WorkerGateway implements IWorkerGateway {
  public api: AxiosInstance;

  constructor(private readonly config: AxiosRequestConfig) {
    this.api = axios.create({ ...config, ...AXIOS_DEFAULT_CONFIG });
  }

  addJwtToken(jwtToken: IJwtToken) {
    this.api = axios.create({
      ...this.config,
      ...AXIOS_DEFAULT_CONFIG,
      headers: {
        Authorization: `Bearer ${jwtToken.signed_token}`,
      },
    });
  }

  removeJwtToken() {
    this.api = axios.create({ ...this.config, ...AXIOS_DEFAULT_CONFIG });
  }

  async getBlockchains(): Promise<IBlockchainEntity[]> {
    const { data } = await this.api.get<IBlockchainEntity[]>(
      '/api/v1/blockchain',
    );
    return data;
  }

  async getNodes(blockchain?: string): Promise<INodeEntity[]> {
    const { data } = await this.api.get<INodeEntity[]>('/api/v1/node', {
      params: { blockchain },
    });

    return data;
  }

  async importJwtToken(jwtToken?: string): Promise<IImportJWTTokenResult> {
    const { data } = await this.api.post('/api/v1/jwt', { jwtToken });

    return data;
  }

  async getGlobalStats(blockchain?: string): Promise<IWorkerGlobalStatus> {
    const { data } = await this.api.get<IWorkerGlobalStatus>(
      '/api/v1/stats/global',
      {
        params: { blockchain },
      },
    );

    return data;
  }

  async getTimeframeStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus> {
    const { data } = await this.api.get<IWorkerGlobalStatus>(
      `/api/v1/stats/${blockchain}/${timeframe}`,
    );

    return data;
  }

  async getTotalStats(blockchain?: string): Promise<IWorkerTotalStats[]> {
    const { data } = await this.api.get<IWorkerTotalStats[]>(
      '/api/v1/stats/total',
      {
        params: { blockchain },
      },
    );

    return data;
  }

  async getLegacyStats(blockchain?: string): Promise<IWorkerTotalStats[]> {
    const { data } = await this.api.get<IWorkerTotalStats[]>(
      '/api/v1/stats/legacy',
      {
        params: { blockchain },
      },
    );

    return data;
  }

  async getNodesWeight(): Promise<IWorkerNodesWeight[]> {
    const { data } = await this.api.get<IWorkerNodesWeight[]>('/api/v1/weight');

    return data;
  }

  async getUserLocation(): Promise<IWorkerUserLocation> {
    const { data } = await this.api.get<IWorkerUserLocation>(
      '/api/v1/datacenter',
    );

    return data;
  }

  async getProvider(): Promise<IProvider> {
    const { data } = await this.api.get<IProvider>('/api/v1/provider');

    return data;
  }

  async getEndpoints(): Promise<IWorkerEndpoint> {
    const { data } = await this.api.get<IWorkerEndpoint>(
      '/api/v1/private/node',
    );

    return data;
  }

  async addPrivateEndpoint(
    endpoint: IPrivateEndpoint,
  ): Promise<IWorkerEndpoint> {
    const { data } = await this.api.post('/api/v1/private/node', endpoint);

    return data;
  }

  async editPrivateEndpoint(
    endpoint: IPrivateEndpoint,
  ): Promise<IWorkerEndpoint> {
    const { data } = await this.api.post('/api/v1/private/node', endpoint);

    return data;
  }

  async deletePrivateEndpoint(id: string): Promise<void> {
    await this.api.delete<IPrivateEndpoint>('/api/v1/private/node', {
      params: { id },
    });
  }

  async getChainRestrictedDomains(chainId: string): Promise<RestrictedDomains> {
    const { data } = await this.api.get(
      `/api/v1/user/whitelist/${chainId}/referer`,
    );

    return data;
  }

  async getChainRestrictedIps(chainId: string): Promise<RestrictedIps> {
    const { data } = await this.api.get(`/api/v1/user/whitelist/${chainId}/ip`);

    return data;
  }

  async editChainRestrictedDomains(
    chainId: string,
    domains: RestrictedDomains,
  ): Promise<RestrictedDomains> {
    const { data } = await this.api.post(
      `/api/v1/user/whitelist/${chainId}/referer`,
      domains,
    );

    return data;
  }

  async editChainRestrictedIps(
    chainId: string,
    ips: RestrictedDomains,
  ): Promise<RestrictedIps> {
    const { data } = await this.api.post(
      `/api/v1/user/whitelist/${chainId}/ip`,
      ips,
    );

    return data;
  }

  public async getPaymentHistory(
    params: IPaymentHistoryRequest,
  ): Promise<IPaymentHistoryReponse> {
    await new Promise(r => setTimeout(r, 1300));

    const { data: response } = await this.api
      .get<IPaymentHistoryReponse>('/api/v1/payment-history', {
        params,
      })
      .catch(() => ({
        data: getPaymentHistoryMock(params),
      }));

    return response;
  }
}
