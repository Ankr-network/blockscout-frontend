import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Timeframe } from '../public';
import { stringify } from 'qs';

import { AXIOS_DEFAULT_CONFIG, EmailConfirmationStatus } from '../common';
import {
  IAggregatedPaymentHistoryRequest,
  IAggregatedPaymentHistoryResponse,
  IBalance,
  IBalanceEndTimeResult,
  ICanPayByCardResponse,
  IDailyChargingParams,
  IDailyChargingResponse,
  IEmailResponse,
  IGetActiveEmailBindingResponse,
  IGetEmailBindingsResponse,
  IGetLinkForCardPaymentRequest,
  IGetLinkForCardPaymentResponse,
  IGetLinkForRecurrentCardPaymentRequest,
  IGetSubscriptionPricesResponse,
  ISubscriptionsResponse,
  INotificationsSettings,
  IPaymentHistoryRequest,
  IPaymentHistoryResponse,
  PrivateStats,
  PrivateStatsInterval,
  IGetLatestRequestsResponse,
  IGetLatestRequestsRequest,
  FreeRegisteredUserRequests,
  ICheckInstantJwtParticipantResponse,
  IGetOrCreateInstantJwt,
  IUserGroupsResponse,
} from './types';
import { IJwtTokenLimitResponse, IJwtTokenResponse } from '../oauth';

export class AccountGateway {
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

  public async getSubscriptions(): Promise<ISubscriptionsResponse> {
    const { data: response } = await this.api.get<ISubscriptionsResponse>(
      '/api/v1/auth/payment/getMySubscriptions',
    );

    return response;
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    const { data: response } = await this.api.post<void>(
      '/api/v1/auth/payment/cancelSubscription',
      { subscription_id: subscriptionId },
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

  async getPrivateStatsByPremiumId(
    intervalType: PrivateStatsInterval,
    premiumID: string,
  ): Promise<PrivateStats> {
    const { data } = await this.api.get<PrivateStats>(
      `/api/v1/auth/statsPremiumID`,
      {
        params: { intervalType, premiumID },
      },
    );

    return data;
  }

  async getFreeRegisteredUserRequests(
    timeframe: Timeframe,
    userToken: string,
  ): Promise<FreeRegisteredUserRequests> {
    const { data } = await this.api.get<FreeRegisteredUserRequests>(
      `/api/v1/auth/stats/users/${userToken}/requests/${timeframe}`,
    );

    return data;
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

  public async canPayByCard(): Promise<ICanPayByCardResponse> {
    const { data: response } = await this.api.get<ICanPayByCardResponse>(
      '/api/v1/auth/payment/isEligibleForCardPayment',
    );

    return response;
  }

  public async getLinkForCardPayment(
    params: IGetLinkForCardPaymentRequest,
  ): Promise<IGetLinkForCardPaymentResponse> {
    const { data: response } =
      await this.api.post<IGetLinkForCardPaymentResponse>(
        '/api/v1/auth/payment/depositWithCard',
        params,
      );

    return response;
  }

  public async getLinkForRecurrentCardPayment(
    params: IGetLinkForRecurrentCardPaymentRequest,
  ): Promise<IGetLinkForCardPaymentResponse> {
    const { data: response } =
      await this.api.post<IGetLinkForCardPaymentResponse>(
        '/api/v1/auth/payment/subscribeOnRecurrentPayments',
        params,
      );

    return response;
  }

  public async getUSDSubscriptionPrices() {
    const { data: response } =
      await this.api.get<IGetSubscriptionPricesResponse>(
        '/api/v1/auth/payment/getSubscriptionPrices',
      );

    return response;
  }

  public async getLatestRequests(params?: IGetLatestRequestsRequest) {
    const defaultParams: IGetLatestRequestsRequest = {
      limit: 10,
    };

    const { data: response } = await this.api.get<IGetLatestRequestsResponse>(
      '/api/v1/auth/telemetry/getMyLatestRequests',
      {
        params: params || defaultParams,
      },
    );

    return response;
  }

  public async checkInstantJwtParticipant() {
    const { data: response } =
      await this.api.get<ICheckInstantJwtParticipantResponse>(
        '/api/v1/auth/devdao/isParticipant',
      );

    return response;
  }

  public async getOrCreateInstantJwt() {
    const { data: response } = await this.api.get<IGetOrCreateInstantJwt>(
      '/api/v1/auth/devdao/getOrCreateJwtForUserAddress',
    );

    return response;
  }

  async getAllowedJwtTokensCount(): Promise<number> {
    const { data } = await this.api.get<IJwtTokenLimitResponse>(
      '/api/v1/auth/jwt/allowedCount',
    );

    return data.jwtLimit;
  }

  async getAllJwtToken(): Promise<IJwtTokenResponse[]> {
    const { data } = await this.api.get<IJwtTokenResponse[]>(
      '/api/v1/auth/jwt/all',
    );

    return data;
  }

  async createJwtToken(index: number): Promise<IJwtTokenResponse> {
    const { data } = await this.api.post<IJwtTokenResponse>(
      `/api/v1/auth/jwt/additional`,
      null,
      { params: { index } },
    );

    return data;
  }

  async deleteJwtToken(index: number) {
    const { data: response } = await this.api.delete(`/api/v1/auth/jwt`, {
      params: { index },
    });

    return response;
  }

  public async getUserGroups() {
    const { data: response } = await this.api.get<IUserGroupsResponse>(
      '/api/v1/auth/group',
    );

    return response;
  }
}
