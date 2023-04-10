import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

import { AXIOS_DEFAULT_CONFIG, EmailConfirmationStatus, Web3Address } from '../common';
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
  UserRequestsResponse,
  ICheckInstantJwtParticipantResponse,
  IGetOrCreateInstantJwt,
  IUserGroupsResponse,
  IApiUserGroupParams,
  IApiGetUserRequestsParams,
  IApiCancelSubscriptionRequestParams,
  IApiBalanceEndTimeRequestParams,
  IGetGroupJwtRequestParams,
  IGetGroupJwtResponse,
} from './types';
import {
  IJwtTokenRequestParams,
  IJwtTokenLimitResponse,
  IJwtTokenResponse
} from '../oauth';

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

  public async getAnkrBalance(
    params: IApiUserGroupParams
  ): Promise<IBalance> {
    const { data: response } = await this.api.get<IBalance>(
      '/api/v1/auth/balance',
      { params }
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

  public async getSubscriptions(
    params: IApiUserGroupParams
  ): Promise<ISubscriptionsResponse> {
    const { data: response } = await this.api.get<ISubscriptionsResponse>(
      '/api/v1/auth/payment/getMySubscriptions',
      { params }
    );

    return response;
  }

  async cancelSubscription(params: IApiCancelSubscriptionRequestParams): Promise<void> {
    const { data: response } = await this.api.post<void>(
      '/api/v1/auth/payment/cancelSubscription',
      params,
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

  async getBalanceEndTime(params: IApiBalanceEndTimeRequestParams): Promise<number> {
    const {
      data: { NumberOfDaysEstimate },
    } = await this.api.get<IBalanceEndTimeResult>(
      '/api/v1/auth/numberOfDaysEstimate',
      {
        params
      },
    );

    return NumberOfDaysEstimate;
  }

  async getPrivateStats(
    intervalType: PrivateStatsInterval,
    group?: string,
  ): Promise<PrivateStats> {
    const { data } = await this.api.get<PrivateStats>(`/api/v1/auth/stats`, {
      params: { intervalType, group },
    });

    return data;
  }

  async getPrivateStatsByPremiumId(
    intervalType: PrivateStatsInterval,
    premiumID: string,
    group?: Web3Address,
  ): Promise<PrivateStats> {
    const { data } = await this.api.get<PrivateStats>(
      `/api/v1/auth/statsPremiumID`,
      {
        params: { intervalType, premiumID, group },
      },
    );

    return data;
  }

  async getUserRequests(
    { timeframe, userToken }: IApiGetUserRequestsParams
  ): Promise<UserRequestsResponse> {
    const { data } = await this.api.get<UserRequestsResponse>(
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

  public async canPayByCard(
    params: IApiUserGroupParams
  ): Promise<ICanPayByCardResponse> {
    const { data: response } = await this.api.get<ICanPayByCardResponse>(
      '/api/v1/auth/payment/isEligibleForCardPayment',
      { params }
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

  public async getUSDSubscriptionPrices(
    params: IApiUserGroupParams
  ) {
    const { data: response } =
      await this.api.get<IGetSubscriptionPricesResponse>(
        '/api/v1/auth/payment/getSubscriptionPrices',
        { params },
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

  async getAllowedJwtTokensCount(params: IApiUserGroupParams): Promise<number> {
    const { data } = await this.api.get<IJwtTokenLimitResponse>(
      '/api/v1/auth/jwt/allowedCount',
      { params }
    );

    return data.jwtLimit;
  }

  async getAllJwtToken(params: IApiUserGroupParams): Promise<IJwtTokenResponse[]> {
    const { data } = await this.api.get<IJwtTokenResponse[]>(
      '/api/v1/auth/jwt/all',
      { params }
    );

    return data;
  }

  async createJwtToken(params: IJwtTokenRequestParams): Promise<IJwtTokenResponse> {
    const { data } = await this.api.post<IJwtTokenResponse>(
      `/api/v1/auth/jwt/additional`,
      null,
      { params },
    );

    return data;
  }

  async deleteJwtToken(params: IJwtTokenRequestParams) {
    const { data: response } = await this.api.delete(`/api/v1/auth/jwt`, {
      params,
    });

    return response;
  }

  async getGroupJwtToken(params: IGetGroupJwtRequestParams): Promise<IGetGroupJwtResponse> {
    const { data } = await this.api.get<IGetGroupJwtResponse>(
      `/api/v1/auth/group/jwt`,
      { params }
    );

    return data;
  }

  public async getUserGroups() {
    const { data: response } = await this.api.get<IUserGroupsResponse>(
      '/api/v1/auth/group',
    );

    return response;
  }
}
