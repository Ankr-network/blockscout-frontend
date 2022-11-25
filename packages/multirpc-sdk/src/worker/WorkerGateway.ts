import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { AXIOS_DEFAULT_CONFIG } from '../common';
import {
  IImportJWTTokenResult,
  IPrivateEndpoint,
  IProvider,
  IWorkerEndpoint,
  RestrictedDomains,
  RestrictedIps,
} from './types';

export class WorkerGateway {
  public api: AxiosInstance;

  constructor(private readonly config: AxiosRequestConfig) {
    this.api = axios.create({ ...config, ...AXIOS_DEFAULT_CONFIG });
  }

  public addJwtToken(signedToken: string) {
    this.api = axios.create({
      ...this.config,
      ...AXIOS_DEFAULT_CONFIG,
      headers: {
        Authorization: `Bearer ${signedToken}`,
      },
    });
  }

  public removeJwtToken() {
    this.api = axios.create({ ...this.config, ...AXIOS_DEFAULT_CONFIG });
  }

  async importJwtToken(jwtToken?: string): Promise<IImportJWTTokenResult> {
    const { data } = await this.api.post('/api/v1/jwt', { jwtToken });

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
}
