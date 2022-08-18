import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';
import { AXIOS_DEFAULT_CONFIG, EmailConfirmationStatus } from '../common';
import { IAccountGateway } from './interfaces';
import {
  IAggregatedPaymentHistoryRequest,
  IAggregatedPaymentHistoryResponse,
  IBalance,
  IBalanceEndTimeResult,
  IDailyChargingParams,
  IDailyChargingResponse,
  IEmailResponse,
  IGetActiveEmailBindingResponse,
  IGetEmailBindingsResponse,
  INotificationsSettings,
  IPaymentHistoryRequest,
  IPaymentHistoryResponse,
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
  ): Promise<IPaymentHistoryResponse> {
    const { data: response } = await this.api.get<IPaymentHistoryResponse>(
      '/api/v1/auth/transactionHistory',
      {
        params,
        paramsSerializer: (request: IPaymentHistoryRequest) =>
          stringify(request, { indices: false }),
      },
    );

    return response;
  }

  public async getAggregatedPaymentHistory(
    params: IAggregatedPaymentHistoryRequest,
  ): Promise<IAggregatedPaymentHistoryResponse> {
    const { data: response } =
      await this.api.get<IAggregatedPaymentHistoryResponse>(
        '/api/v1/auth/aggregatedTransactions',
        {
          params,
          paramsSerializer: (request: IAggregatedPaymentHistoryRequest) =>
            stringify(request, { indices: false }),
        },
      );

    return response;
  }

  public async getDailyCharging(
    params: IDailyChargingParams,
  ): Promise<IDailyChargingResponse> {
    const { data: response } = await this.api.get<IDailyChargingResponse>(
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

  async getEmailBindings(
    filters?: EmailConfirmationStatus,
  ): Promise<IEmailResponse[]> {
    const {
      data: { bindings },
    } = await this.api.get<IGetEmailBindingsResponse>('/api/v1/auth/email', {
      params: {
        filters,
      },
    });

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
