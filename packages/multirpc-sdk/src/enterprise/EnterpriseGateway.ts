import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import {
  AXIOS_DEFAULT_CONFIG,
  createTOTPHeaders,
  Web3Address,
} from '../common';
import {
  EnterpriseIsClientResponse,
  GetEnterpriseEndpointsResponse,
} from './types';
import {
  IApiUserGroupParams,
  PrivateStats,
  PrivateStatsInterval,
} from '../accounting';

export class EnterpriseGateway {
  public api: AxiosInstance;

  constructor(private readonly config: AxiosRequestConfig) {
    this.api = axios.create({ ...config, ...AXIOS_DEFAULT_CONFIG });
  }

  addToken(token: string) {
    this.api = axios.create({
      ...this.config,
      ...AXIOS_DEFAULT_CONFIG,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public async checkIsClient(
    params?: IApiUserGroupParams,
  ): Promise<EnterpriseIsClientResponse> {
    const { data: response } = await this.api.get<EnterpriseIsClientResponse>(
      '/api/v1/auth/enterprise/isClient',
      { params },
    );

    return response;
  }

  async getEndpoints(
    params: IApiUserGroupParams,
    totp?: string,
  ): Promise<GetEnterpriseEndpointsResponse> {
    const { data: response } =
      await this.api.get<GetEnterpriseEndpointsResponse>(
        '/api/v1/auth/enterprise/endpoints',
        { headers: createTOTPHeaders(totp), params },
      );

    return response;
  }

  async getEnterpriseStats(
    intervalType: PrivateStatsInterval,
    group?: string,
  ): Promise<PrivateStats> {
    const { data: response } = await this.api.get<PrivateStats>(
      '/api/v1/auth/enterprise/stats',
      {
        params: { intervalType, group },
      },
    );

    return response;
  }

  async getEnterpriseStatsByPremiumId(
    intervalType: PrivateStatsInterval,
    apiKey: string,
    group?: Web3Address,
  ): Promise<PrivateStats> {
    const { data } = await this.api.get<PrivateStats>(
      `/api/v1/auth/enterprise/stats/apiKey`,
      {
        params: { intervalType, apiKey, group },
      },
    );

    return data;
  }
}
