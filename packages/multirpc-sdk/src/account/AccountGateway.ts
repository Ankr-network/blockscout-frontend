import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

import { AXIOS_DEFAULT_CONFIG } from '../common';
import {
  IAggregatedPaymentHistoryReponse,
  IAggregatedPaymentHistoryRequest,
  IBalance,
  IBalanceEndTimeResult,
  IDailyChargingParams,
  IDailyChargingReponse,
  IPaymentHistoryReponse,
  IPaymentHistoryRequest,
  IRequestsRequest,
  IRequestsResponse,
  IWithdrawalStatusResponse,
  PrivateStats,
  PrivateStatsInterval,
} from './types';
import { IAccountGateway } from './interfaces';
import { getRequestsMock } from '../mock/getRequestsMock';

export class AccountGateway implements IAccountGateway {
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

  removeToken() {
    this.api = axios.create({ ...this.config, ...AXIOS_DEFAULT_CONFIG });
  }

  public async getAnkrBalance(): Promise<IBalance> {
    const { data: response } = await this.api.get<IBalance>(
      '/api/v1/auth/balance',
    );

    return response;
  }

  public async getPaymentHistory(
    params: IPaymentHistoryRequest,
  ): Promise<IPaymentHistoryReponse> {
    const { data: response } = await this.api.get<IPaymentHistoryReponse>(
      '/api/v1/auth/transactionHistory',
      {
        params,
      },
    );

    return response;
  }

  public async getAggregatedPaymentHistory(
    params: IAggregatedPaymentHistoryRequest,
  ): Promise<IAggregatedPaymentHistoryReponse> {
    const { data: response } = await this.api.get<IPaymentHistoryReponse>(
      '/api/v1/auth/aggregatedTransactions',
      {
        params,
        paramsSerializer: (request: IAggregatedPaymentHistoryRequest) =>
          stringify(request, { indices: false }),
      },
    );

    return response;
  }

  public async getRequests(
    params: IRequestsRequest,
  ): Promise<IRequestsResponse> {
    const { data: response } = await this.api
      .get<IRequestsResponse>('/api/v1/auth/requests', {
        params,
      })
      .catch(() => ({
        data: {
          requests: getRequestsMock(params),
          cursor: params.cursor > 50 ? -1 : params.cursor,
        },
      }));

    return response;
  }

  public async getDailyCharging(
    params: IDailyChargingParams,
  ): Promise<IDailyChargingReponse> {
    const { data: response } = await this.api.get<IDailyChargingReponse>(
      '/api/v1/auth/oneDayUsageReport',
      {
        params,
      },
    );

    return response;
  }

  async getBalanceEndTime(blockchains?: string[]): Promise<number> {
    const {
      data: { NumberOfDaysEstimate },
    } = await this.api.get<IBalanceEndTimeResult>(
      '/api/v1/auth/numberOfDaysEstimate',
      {
        params: { blockchains },
      },
    );

    return NumberOfDaysEstimate;
  }

  async getPrivateStats(
    intervalType: PrivateStatsInterval,
  ): Promise<PrivateStats> {
    const { data } = await this.api.get<PrivateStats>(
      `/api/v1/auth/stats`,
      {
        params: { intervalType },
      }
    );

    return data;
  }
  
  async getWithdrawalStatus(
    transactionHash: string,
  ): Promise<IWithdrawalStatusResponse> {
    const { data: response } = await this.api.get<IWithdrawalStatusResponse>(
      `/api/v1/auth/withdraw/status`,
      { params: { tx_hash: transactionHash } },
    );

    return response;
  }
}
