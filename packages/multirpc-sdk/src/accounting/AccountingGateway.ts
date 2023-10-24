import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';

import {
  AXIOS_DEFAULT_CONFIG,
  Web3Address,
  createTOTPHeaders,
  BlockchainID,
} from '../common';
import {
  BundlePaymentPlan,
  GetMyBundlesStatusResponse,
  GetLinkForBundlePaymentRequest,
} from './bundles';
import {
  IGetLinkForCardPaymentRequest,
  IGetSubscriptionPricesResponse,
  IGetLinkForCardPaymentResponse,
  ISubscriptionsResponse,
  IApiCancelSubscriptionRequestParams,
  IGetLinkForRecurrentCardPaymentRequest,
  ICanPayByCardResponse,
} from './subscriptions';
import {
  IApiUserGroupParams,
  IUserGroupsResponse,
  IGetGroupJwtRequestParams,
  IGetGroupJwtResponse,
} from './userGroup';
import {
  IUpdateWhitelistModeParams,
  IGetWhitelistParams,
  IUpdateWhitelistModeRequestParams,
  IUpdateWhitelistModeResponse,
  IUpdateWhitelistParams,
  IUpdateWhitelistParamsResponse,
  IGetWhitelistParamsResponse,
  IWhitelistBlockchainsParams,
} from './whitelists';
import {
  NegativeBalanceTermsOfServicesStatusResponse,
  NegativeBalanceTermsOfServicesStatusParams,
} from './tos';
import { INotificationsSettings } from './notification';
import {
  InitTwoFAResponse,
  TwoFAStatusResponse,
  ConfirmTwoFARequestParams,
  ConfirmTwoFAResponse,
  DisableTwoFAResponse,
} from './totp';
import {
  ICheckInstantJwtParticipantResponse,
  IGetOrCreateInstantJwt,
} from './devDAO';
import {
  IJwtTokenRequestParams,
  IJwtTokenLimitResponse,
  IJwtTokenResponse,
  IJwtTokenCreateParams,
  IUpdateJwtTokenFreezeStatusParams,
  IUpdateJwtTokenFreezeStatusRequestParams,
  IJwtTokenRequestBody,
  GetUserEndpointTokenStatusRequest,
  GetUserEndpointTokenStatusResponse,
} from './JWT';
import {
  IGetLatestRequestsResponse,
  IGetLatestRequestsRequest,
  StatsByRangeRequest,
  StatsByRangeResponse,
  PrivateStats,
  PrivateStatsInterval,
  Top10StatsResponse,
  Top10StatsParams,
  UserRequestsResponse,
  TotalStatsResponse,
  IApiGetUserRequestsParams,
  IDailyChargingParams,
  IDailyChargingResponse,
} from './telemetry';
import {
  EmailConfirmationStatus,
  IEmailResponse,
  IGetEmailBindingsResponse,
  IGetActiveEmailBindingResponse,
  EmailBindingParams,
} from './email';
import {
  IAggregatedPaymentHistoryRequest,
  IAggregatedPaymentHistoryResponse,
  IPaymentHistoryRequest,
  IPaymentHistoryResponse,
} from './transactionsHistory';
import { IBalance } from './balance';
import {
  IGoogleLoginParamsResponse,
  IOauthLoginResponse,
  IETHAddressesResponse,
  IDecodeJwtTokenParams,
  IDecodeJwtTokenResponse,
  IGoogleSecretCodeParams,
  ISyntheticJwtTokenResponse,
} from './googleOauth';
import {
  IOauthLoginParams,
  ISecreteCodeLoginQueryParams,
  IOauthSecretCodeParams,
  AssociatedAccount,
} from './oauth';

export class AccountingGateway {
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

  public async getAnkrBalance(params: IApiUserGroupParams) {
    const { data: response } = await this.api.get<IBalance>(
      '/api/v1/auth/balance',
      { params },
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

  public async getSubscriptions(params: IApiUserGroupParams) {
    const { data: response } = await this.api.get<ISubscriptionsResponse>(
      '/api/v1/auth/payment/getMySubscriptions',
      { params },
    );

    return response;
  }

  async cancelSubscription(
    body: IApiCancelSubscriptionRequestParams,
    { totp, ...params }: IApiUserGroupParams,
  ): Promise<void> {
    const { data: response } = await this.api.post<void>(
      '/api/v1/auth/payment/cancelSubscription',
      body,
      {
        headers: createTOTPHeaders(totp),
        params,
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

  async getTop10Stats(params: Top10StatsParams): Promise<Top10StatsResponse> {
    const { data } = await this.api.get<Top10StatsResponse>(
      `/api/v1/auth/stats/top10`,
      {
        params,
      },
    );

    return data;
  }

  async getUserRequests({
    timeframe,
    userToken,
    group,
  }: IApiGetUserRequestsParams): Promise<UserRequestsResponse> {
    const { data } = await this.api.get<UserRequestsResponse>(
      `/api/v1/auth/stats/users/${userToken}/requests/${timeframe}`,
      {
        params: { group },
      },
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

  async getActiveEmailBinding() {
    const { data: response } =
      await this.api.get<IGetActiveEmailBindingResponse>(
        '/api/v1/auth/email/active',
      );

    return response;
  }

  async addNewEmailBinding({ email, totp }: EmailBindingParams) {
    const { data: response } = await this.api.post<IEmailResponse>(
      '/api/v1/auth/email/bind',
      null,
      {
        params: { email },
        headers: createTOTPHeaders(totp),
      },
    );

    return response;
  }

  async editEmailBinding({ email, totp }: EmailBindingParams) {
    const { data: response } = await this.api.patch<IEmailResponse>(
      '/api/v1/auth/email/bind',
      null,
      {
        params: { email },
        headers: createTOTPHeaders(totp),
      },
    );

    return response;
  }

  async confirmEmailBinding(email: string, code: string) {
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

  async editNotificationSettings(data: INotificationsSettings) {
    const { data: response } = await this.api.post<INotificationsSettings>(
      '/api/v1/auth/notification/configuration',
      data,
    );

    return response;
  }

  async getNotificationSettings() {
    const { data: response } = await this.api.get<INotificationsSettings>(
      '/api/v1/auth/notification/configuration',
    );

    return response;
  }

  public async canPayByCard(
    params: IApiUserGroupParams,
  ): Promise<ICanPayByCardResponse> {
    const { data: response } = await this.api.get<ICanPayByCardResponse>(
      '/api/v1/auth/payment/isEligibleForCardPayment',
      { params },
    );

    return response;
  }

  public async getLinkForCardPayment(
    body: IGetLinkForCardPaymentRequest,
    params: IApiUserGroupParams,
  ) {
    const { data: response } =
      await this.api.post<IGetLinkForCardPaymentResponse>(
        '/api/v1/auth/payment/depositWithCard',
        body,
        { params },
      );

    return response;
  }

  public async getLinkForRecurrentCardPayment(
    body: IGetLinkForRecurrentCardPaymentRequest,
    params: IApiUserGroupParams,
  ) {
    const { data: response } =
      await this.api.post<IGetLinkForCardPaymentResponse>(
        '/api/v1/auth/payment/subscribeOnRecurrentPayments',
        body,
        { params },
      );

    return response;
  }

  public async getUSDSubscriptionPrices(params: IApiUserGroupParams) {
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

  /**
   * Returns total stats for each day between from and to
   * In case of empty params, to would be now, and from would be now - 180 days
   * Query Params (all are optional):
   * - from milliseconds
   * - to milliseconds
   * - monthly if set true returns aggregated stats by month
   * - token if set, returns only stats for specified premium-token */
  async getUserStatsByRange(
    params: StatsByRangeRequest,
  ): Promise<StatsByRangeResponse> {
    const { data: response } = await this.api.get<StatsByRangeResponse>(
      '/api/v1/auth/stats/totals/range',
      {
        params,
      },
    );

    return response;
  }

  public async checkDevdaoInstantJwtParticipant() {
    const { data: response } =
      await this.api.get<ICheckInstantJwtParticipantResponse>(
        '/api/v1/auth/devdao/isParticipant',
      );

    return response;
  }

  public async getOrCreateDevdaoInstantJwt(totp?: string) {
    const { data: response } = await this.api.get<IGetOrCreateInstantJwt>(
      '/api/v1/auth/devdao/getOrCreateJwtForUserAddress',
      {
        headers: createTOTPHeaders(totp),
      },
    );

    return response;
  }

  public async getOrCreateInstantJwt(totp?: string) {
    const { data: response } = await this.api.get<IGetOrCreateInstantJwt>(
      '/api/v1/auth/getOrCreateJwtForUserAddress',
      {
        headers: createTOTPHeaders(totp),
      },
    );

    return response;
  }

  async getAllowedJwtTokensCount(params: IApiUserGroupParams): Promise<number> {
    const { data } = await this.api.get<IJwtTokenLimitResponse>(
      '/api/v1/auth/jwt/allowedCount',
      { params },
    );

    return data.jwtLimit;
  }

  async getAllJwtToken(
    params: IApiUserGroupParams,
  ): Promise<IJwtTokenResponse[]> {
    const { data } = await this.api.get<IJwtTokenResponse[]>(
      '/api/v1/auth/jwt/all',
      { params },
    );

    return data;
  }

  async createJwtToken(
    body: IJwtTokenRequestBody,
    params: IJwtTokenCreateParams,
  ): Promise<IJwtTokenResponse> {
    const { data } = await this.api.post<IJwtTokenResponse>(
      `/api/v1/auth/jwt/additional`,
      body,
      { params },
    );

    return data;
  }

  async updateJwtToken(
    body: IJwtTokenRequestBody,
    params: IJwtTokenRequestParams,
  ): Promise<IJwtTokenResponse> {
    const { data } = await this.api.patch<IJwtTokenResponse>(
      `/api/v1/auth/jwt/additional`,
      body,
      { params },
    );

    return data;
  }

  async updateJwtTokenFreezeStatus(
    params: IUpdateJwtTokenFreezeStatusParams,
    bodyParams: IUpdateJwtTokenFreezeStatusRequestParams,
  ) {
    const { data } = await this.api.patch<null>(
      '/api/v1/auth/jwt/additional/freeze',
      bodyParams,
      { params },
    );

    return data;
  }

  async getUserEndpointTokenStatus(
    params: GetUserEndpointTokenStatusRequest,
  ): Promise<GetUserEndpointTokenStatusResponse> {
    const { data } = await this.api.get<GetUserEndpointTokenStatusResponse>(
      `/api/v1/auth/jwt/additional/status`,
      { params },
    );

    return data;
  }

  async deleteJwtToken({ totp, ...params }: IJwtTokenRequestParams) {
    const { data: response } = await this.api.delete(`/api/v1/auth/jwt`, {
      headers: createTOTPHeaders(totp),
      params,
    });

    return response;
  }

  async getGroupJwtToken(
    params: IGetGroupJwtRequestParams,
  ): Promise<IGetGroupJwtResponse> {
    const { data } = await this.api.get<IGetGroupJwtResponse>(
      `/api/v1/auth/group/jwt`,
      { params },
    );

    return data;
  }

  public async getUserGroups() {
    const { data: response } = await this.api.get<IUserGroupsResponse>(
      '/api/v1/auth/group',
    );

    return response;
  }

  async initTwoFA() {
    const { data: response } = await this.api.post<InitTwoFAResponse>(
      '/api/v1/auth/2fa/init',
    );

    return response;
  }

  async getTwoFAStatus() {
    const { data: response } = await this.api.get<TwoFAStatusResponse>(
      '/api/v1/auth/2fa/status',
    );

    return response;
  }

  async confirmTwoFA(body: ConfirmTwoFARequestParams) {
    const { data: response } = await this.api.post<ConfirmTwoFAResponse>(
      '/api/v1/auth/2fa/confirm',
      body,
    );

    return response;
  }

  async disableTwoFA(totp: string) {
    const { data: response } = await this.api.post<DisableTwoFAResponse>(
      '/api/v1/auth/2fa/clear',
      null,
      {
        headers: createTOTPHeaders(totp),
      },
    );

    return response;
  }

  async getUserTotalStats(group?: Web3Address) {
    const { data: response } = await this.api.get<TotalStatsResponse>(
      '/api/v1/auth/stats/totals',
      { params: { group } },
    );

    return response.blockchains_info;
  }

  async getNegativeBalanceTermsOfServicesStatus(
    params?: NegativeBalanceTermsOfServicesStatusParams,
  ) {
    const { data: response } =
      await this.api.get<NegativeBalanceTermsOfServicesStatusResponse>(
        '/api/v1/auth/tos/status',
        { params },
      );

    return response;
  }

  async acceptNegativeBalanceTermsOfServices(params?: string): Promise<void> {
    const api = `/api/v1/auth/tos/accept`;
    const url = params ? `${api}?group=${params}` : api;
    const { data: response } = await this.api.post<void>(url, {
      tosAccepted: true,
    });

    return response;
  }

  async getWhitelist(queryParams: IGetWhitelistParams) {
    const { data } = await this.api.get<IGetWhitelistParamsResponse>(
      '/api/v1/auth/whitelist',
      { params: queryParams },
    );

    return data;
  }

  async getBundlePaymentPlans() {
    const { data } = await this.api.get<BundlePaymentPlan[]>(
      '/api/v1/auth/bundles',
    );

    return data;
  }

  async getLinkForBundlePayment(
    body: GetLinkForBundlePaymentRequest,
    params: IApiUserGroupParams,
  ) {
    const { data } = await this.api.post<IGetLinkForCardPaymentResponse>(
      '/api/v1/auth/myBundles/subscribe',
      body,
      { params },
    );

    return data;
  }

  async getMyBundles(group?: Web3Address) {
    const { data } = await this.api.get<ISubscriptionsResponse>(
      '/api/v1/auth/myBundles',
      { params: { group } },
    );

    return data.items;
  }

  async cancelBundleSubscription(
    subscription_id: string,
    { totp, ...params }: IApiUserGroupParams,
  ) {
    await this.api.post(
      '/api/v1/auth/myBundles/unsubscribe',
      { subscription_id },
      { headers: createTOTPHeaders(totp), params },
    );
  }

  async getMyBundlesStatus(group?: Web3Address) {
    const {
      data: { bundles },
    } = await this.api.get<GetMyBundlesStatusResponse>(
      '/api/v1/auth/myBundles/status',
      { params: { group } },
    );

    return bundles;
  }

  async updateWhitelistMode(
    bodyParams: IUpdateWhitelistModeRequestParams,
    queryParams: IUpdateWhitelistModeParams,
    totp?: string,
  ) {
    const { data } = await this.api.patch<IUpdateWhitelistModeResponse>(
      '/api/v1/auth/whitelist/mode',
      bodyParams,
      { headers: createTOTPHeaders(totp), params: queryParams },
    );

    return data;
  }

  async addAddressToWhitelist(
    item: string,
    queryParams: IUpdateWhitelistParams,
    totp?: string,
  ): Promise<IUpdateWhitelistParamsResponse> {
    const { data } = await this.api.post<IUpdateWhitelistParamsResponse>(
      '/api/v1/auth/whitelist',
      { item },
      { headers: createTOTPHeaders(totp), params: queryParams },
    );

    return data;
  }

  async updateWhitelist(
    bodyParams: string[],
    queryParams: IUpdateWhitelistParams,
    totp?: string,
  ): Promise<IUpdateWhitelistParamsResponse> {
    const { data } = await this.api.patch<IUpdateWhitelistParamsResponse>(
      '/api/v1/auth/whitelist',
      bodyParams,
      { headers: createTOTPHeaders(totp), params: queryParams },
    );

    return data;
  }

  async getWhitelistBlockchains(queryParams: IWhitelistBlockchainsParams) {
    const { data } = await this.api.get<BlockchainID[]>(
      '/api/v1/auth/whitelist/blockchains',
      { params: queryParams },
    );

    return data;
  }

  async addBlockchainsToWhitelist(
    bodyParams: BlockchainID[],
    queryParams: IWhitelistBlockchainsParams,
    totp?: string,
  ) {
    const { data } = await this.api.post<BlockchainID[]>(
      '/api/v1/auth/whitelist/blockchains',
      bodyParams,
      { headers: createTOTPHeaders(totp), params: queryParams },
    );

    return data;
  }

  async getGoogleLoginParams() {
    const { data } = await this.api.get<IGoogleLoginParamsResponse>(
      '/api/v1/googleOauth/getGoogleOauthParams',
    );

    return data;
  }

  async loginUserByGoogleSecretCode(
    body: IOauthSecretCodeParams,
    totp?: string,
  ): Promise<IOauthLoginResponse> {
    const { data } = await this.api.post<IOauthLoginResponse>(
      '/api/v1/googleOauth/loginUserByGoogleSecretCode',
      body,
      {
        headers: createTOTPHeaders(totp),
      },
    );

    return data;
  }

  async bindGoogleAccount(body: IGoogleSecretCodeParams, totp?: string) {
    const { data } = await this.api.post<IOauthLoginResponse>(
      '/api/v1/auth/googleOauth/bindEmail',
      body,
      {
        headers: createTOTPHeaders(totp),
      },
    );

    return data;
  }

  async bindOauthAccount(body: IOauthSecretCodeParams, totp?: string) {
    const { data } = await this.api.post<IOauthLoginResponse>(
      '/api/v1/auth/abstractBindings/bind',
      body,
      {
        headers: createTOTPHeaders(totp),
      },
    );

    return data;
  }

  async getETHAddresses(accessToken: string): Promise<IETHAddressesResponse> {
    const { data } = await this.api.get<IETHAddressesResponse>(
      '/api/v1/auth/googleOauth/getAllMyEthAddresses',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return data;
  }

  async decodeJwtToken(
    body: IDecodeJwtTokenParams,
  ): Promise<IDecodeJwtTokenResponse> {
    const { data } = await this.api.post<IDecodeJwtTokenResponse>(
      '/api/v1/auth/googleOauth/decodeJwtToken',
      body,
    );

    return data;
  }

  async getSyntheticJwtToken(totp?: string) {
    const { data } = await this.api.get<ISyntheticJwtTokenResponse>(
      '/api/v1/auth/jwt/getMySyntheticJwt',
      {
        headers: createTOTPHeaders(totp),
      },
    );

    return data;
  }

  async getAssociatedAccounts() {
    const { data } = await this.api.get<AssociatedAccount[]>(
      '/api/v1/auth/abstractBindings/list',
    );

    return data;
  }

  async loginBySecretCode(
    body: IOauthSecretCodeParams,
    params: ISecreteCodeLoginQueryParams,
    totp?: string,
  ) {
    const { data } = await this.api.post<IOauthLoginResponse>(
      '/api/v1/oauth2/loginBySecretCode',
      body,
      {
        params,
        headers: createTOTPHeaders(totp),
      },
    );

    return data;
  }

  async getOauthLoginParams({ provider }: IOauthLoginParams) {
    const { data } = await this.api.get<IGoogleLoginParamsResponse>(
      '/api/v1/oauth2/getProviderParams',
      { params: { provider } },
    );

    return data;
  }
}
