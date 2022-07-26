import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

import { AXIOS_DEFAULT_CONFIG } from '../common';
import { getRequestsMock } from '../mock/getRequestsMock';
import { IAccountGateway } from './interfaces';
import {
  EmailConfirmationStatus,
  IAggregatedPaymentHistoryReponse,
  IAggregatedPaymentHistoryRequest,
  IBalance,
  IBalanceEndTimeResult,
  IDailyChargingParams,
  IDailyChargingReponse,
  IEmailResponse,
  IGetActiveEmailBindingResponse,
  IGetEmailBindingStatusesResponse,
  INotificationsSettings,
  IPaymentHistoryReponse,
  IPaymentHistoryRequest,
  IRequestsRequest,
  IRequestsResponse,
  IWithdrawalStatusResponse,
  PrivateStats,
  PrivateStatsInterval,
} from './types';

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
    const { data } = await this.api.get<PrivateStats>(`/api/v1/auth/stats`, {
      params: { intervalType },
    });

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

  async getEmailBindingStatuses(
    filters?: EmailConfirmationStatus,
  ): Promise<IEmailResponse[]> {
    const {
      data: { bindings },
    } = await this.api.get<IGetEmailBindingStatusesResponse>(
      '/api/v1/auth/email',
      {
        params: {
          filters,
        },
      },
    );

    return bindings;
  }

  async getActiveEmailBinding(): Promise<IGetActiveEmailBindingResponse> {
    const { data: response } = await this.api.get<IEmailResponse>(
      '/api/v1/auth/email/active',
    );

    return response;
  }

  async addNewEmailBinding(email: string): Promise<IEmailResponse> {
    const { data: response } = await this.api.post<IEmailResponse>(
      '/api/v1/auth/email/bind',
      null,
      {
        params: { email },
      },
    );

    return response;
  }

  async editEmailBinding(email: string): Promise<IEmailResponse> {
    const { data: response } = await this.api.patch<IEmailResponse>(
      '/api/v1/auth/email/bind',
      null,
      {
        params: { email },
      },
    );

    return response;
  }

  async confirmEmailBinding(
    email: string,
    code: string,
  ): Promise<IEmailResponse> {
    const { data: response } = await this.api.post<IEmailResponse>(
      '/api/v1/auth/email/confirm',
      null,
      {
        params: { email, code },
      },
    );

    return response;
  }

  async resendConfirmationCode(email: string): Promise<string> {
    const { data: response } = await this.api.post<string>(
      '/api/v1/auth/email/resendConfirmation',
      null,
      {
        params: { email },
      },
    );

    return response;
  }

  async editNotificationSettings(
    data: INotificationsSettings,
  ): Promise<INotificationsSettings> {
    const { data: response } = await this.api.post<INotificationsSettings>(
      '/api/v1/auth/notification/configuration',
      data,
    );

    return response;
  }

  async getNotificationSettings(): Promise<INotificationsSettings> {
    const { data: response } = await this.api.get(
      '/api/v1/auth/notification/configuration',
    );

    return response;
  }
}
