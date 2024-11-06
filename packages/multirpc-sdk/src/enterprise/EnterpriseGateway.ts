import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

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
  GetPrivateStatsByPremiumIdParams,
  GetPrivateStatsParams,
  GetStatsByRangeParams,
  IApiUserGroupParams,
  IUsageStats,
  IUsageStatsParams,
  PrivateStatsResponse,
  StatsByRangeResponse,
  Top10StatsParams,
  Top10StatsResponse,
  TotalStatsResponse,
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

  async getEnterpriseUsage(params: IUsageStatsParams): Promise<IUsageStats> {
    const { data: response } = await this.api.get<IUsageStats>(
      '/api/v1/auth/enterprise/usage',
      {
        params,
        paramsSerializer: (request: IUsageStatsParams) =>
          stringify(request, { indices: false }),
      },
    );

    return response;
  }

  /**
   * Some telemetry endpoints (auth/enterprise/stats...) are added with same naming as in accounting gateway
   * in order to save the backward compatibility
   * */

  async getPrivateStats({ group, interval }: GetPrivateStatsParams) {
    const { data: response } = await this.api.get<PrivateStatsResponse>(
      '/api/v1/auth/enterprise/stats',
      {
        params: { intervalType: interval, group },
      },
    );

    return response;
  }

  async getPrivateStatsByPremiumId({
    group,
    interval: intervalType,
    premiumID: apiKey,
  }: GetPrivateStatsByPremiumIdParams) {
    const { data } = await this.api.get<PrivateStatsResponse>(
      `/api/v1/auth/enterprise/stats/apiKey`,
      {
        params: { intervalType, apiKey, group },
      },
    );

    return data;
  }

  async getTop10Stats(params: Top10StatsParams): Promise<Top10StatsResponse> {
    const { data } = await this.api.get<Top10StatsResponse>(
      `/api/v1/auth/enterprise/stats/top10`,
      {
        params,
      },
    );

    return data;
  }

  /**
   * Returns total stats for each day between from and to
   * In case of empty params, to would be now, and from would be now - 180 days
   * Query Params (all are optional):
   * - from milliseconds
   * - to milliseconds
   * - monthly if set true returns aggregated stats by month
   * - token if set, returns only stats for specified premium-token */
  async getUserStatsByRange(params: GetStatsByRangeParams) {
    const { data: response } = await this.api.get<StatsByRangeResponse>(
      '/api/v1/auth/enterprise/stats/totals/range',
      {
        params,
      },
    );

    return response;
  }

  async getUserTotalStats(group?: Web3Address) {
    const { data: response } = await this.api.get<TotalStatsResponse>(
      '/api/v1/auth/enterprise/stats/totals',
      { params: { group } },
    );

    return response.blockchains_info;
  }
}
