import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { v4 } from 'uuid';

import { IBackofficeGateway } from './interfaces';
import {
  ICreateTestClientRequest,
  ICreateTestClientResponse,
  IAddVoucherCreditsRequest,
  IAddVoucherCreditsResponse,
  IBalancesRequest,
  IBalancesResponse,
  ICountersResponse,
  IEmailBindingsRequest,
  IEmailBindingsResponse,
  IUpdateUserEmailRequest,
  IUpdateUserEmailResponse,
  INodeEntity,
  IStatementRequest,
  IStatementResponse,
  ITransactionsRequest,
  ITransactionsResponse,
  IUpdateVoucherCreditsRequest,
  IUpdateVoucherCreditsResponse,
  IUserStatsRequest,
  IUserStatsResponse,
  IUserStatsByRangeRequest,
  IWebsocketStatsRequest,
  IWebsocketStatsResponse,
  IArchiveRequestsStatsRequest,
  IArchiveRequestsStatsResponse,
  ICountersRequest,
  IGetUserTotalRequest,
  IGetUserTotalResponse,
  IGetUserProfileRequest,
  IGetUserProfileResponse,
  IUpdateUserProfileRequest,
  IUpdateUserProfileResponse,
  IGetUserRevenueRequest,
  IGetUserRevenueResponse,
  GetUserAddressesRequest,
  GetUserAddressesResponse,
  IGetAdminRolesResponse,
  GetUsersRegistrationsRequest,
  GetUsersRegistrationsResponse,
  SetUserGroupRequest,
  SetUserGroupResponse,
  DeleteFromUserGroupRequest,
  DeleteFromUserGroupResponse,
  CreateUserGroupRequest,
  CreateUserGroupResponse,
  GetUserGroupsRequest,
  GetUserGroupsResponse,
  GetUserGroupRequest,
  GetUserGroupResponse,
  DeleteUserGroupRequest,
  DeleteUserGroupResponse,
  GetUserProjectsResponse,
  GetUserProjectsRequest,
  DeleteUserProjectParams,
  DeleteUserProjectResponse,
  SetUserProjectAllowedJwtNumberParams,
  SetUserProjectAllowedJwtNumberResponse,
  IAddressBindingsRequest,
  IAddressBindingsResponse,
  IUserByTokenRequest,
  IUserByTokenResponse,
  IUserTokensRequest,
  IUserTokensResponse,
  ICounterRequest,
  ICountersEntity,
  IGetExternalEmailResponse,
  ITwoFAStatusResponse,
  IBundlesResponse,
  IRevokeBundleResponseItem,
  IReferralCodeItem,
  INewReferralCodeRequest,
  INewReferralCodeResponse,
  IDeleteReferralCodeResponse,
  IBundlesStatusesResponse,
} from './types';
import { AXIOS_DEFAULT_CONFIG, IBlockchainEntity } from '../common';

export class BackofficeGateway implements IBackofficeGateway {
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

  async getBalances(params: IBalancesRequest): Promise<IBalancesResponse> {
    const { data: response } = await this.api.get<IBalancesResponse>(
      '/balances',
      {
        params,
      },
    );

    return response;
  }

  async getTransactions(
    params: ITransactionsRequest,
  ): Promise<ITransactionsResponse> {
    const { data: response } = await this.api.get<ITransactionsResponse>(
      '/transactions',
      {
        params,
      },
    );

    return response;
  }

  async getEmailBindings(
    params: IEmailBindingsRequest,
  ): Promise<IEmailBindingsResponse> {
    const { data: response } = await this.api.get<IEmailBindingsResponse>(
      '/users/emails',
      {
        params,
      },
    );

    return response;
  }

  async createUserEmail(
    params: IUpdateUserEmailRequest,
  ): Promise<IUpdateUserEmailResponse> {
    const { data: response } = await this.api.post<IUpdateUserEmailResponse>(
      '/users/emails',
      params,
      {
        params: {
          address: params.address,
          email: params.email,
        },
      },
    );

    return response;
  }

  async updateUserEmail(
    params: IUpdateUserEmailRequest,
  ): Promise<IUpdateUserEmailResponse> {
    const { data: response } = await this.api.put<IUpdateUserEmailResponse>(
      '/users/emails',
      params,
      {
        params: {
          address: params.address,
          email: params.email,
        },
      },
    );

    return response;
  }

  async getAdminRoles(): Promise<IGetAdminRolesResponse> {
    const { data } = await this.api.get<IGetAdminRolesResponse>('/roles');

    return data;
  }

  async getUserTotal(
    params: IGetUserTotalRequest,
  ): Promise<IGetUserTotalResponse> {
    const { data: response } = await this.api.get<IGetUserTotalResponse>(
      '/users/totals',
      {
        params,
      },
    );

    return response;
  }

  async getUserProfile(
    params: IGetUserProfileRequest,
  ): Promise<IGetUserProfileResponse> {
    const { data: response } = await this.api.get<IGetUserProfileResponse>(
      '/users/profile',
      {
        params,
      },
    );

    return response;
  }

  async updateUserProfile(
    params: IUpdateUserProfileRequest,
  ): Promise<IUpdateUserProfileResponse> {
    const { data: response } = await this.api.post<IUpdateUserProfileResponse>(
      '/users/profile',
      params,
      {
        params: {
          address: params.address,
        },
      },
    );

    return response;
  }

  async getUserByToken(
    params: IUserByTokenRequest,
  ): Promise<IUserByTokenResponse> {
    const { data: response } = await this.api.get<IUserByTokenResponse>(
      '/users/profile/token',
      {
        params,
      },
    );

    return response;
  }

  async getUserTokens(
    params: IUserTokensRequest,
  ): Promise<IUserTokensResponse> {
    const { data: response } = await this.api.get<IUserTokensResponse>(
      '/users/tokens',
      {
        params,
      },
    );

    return response;
  }

  async getUserRevenue(
    params: IGetUserRevenueRequest,
  ): Promise<IGetUserRevenueResponse> {
    const { data: response } = await this.api.get<IGetUserRevenueResponse>(
      '/users/revenue',
      {
        params,
      },
    );

    return response;
  }

  async getUserAddresses(
    params: GetUserAddressesRequest,
  ): Promise<GetUserAddressesResponse> {
    const { data: response } = await this.api.get<GetUserAddressesResponse>(
      '/users/addresses',
      {
        params,
      },
    );

    return response;
  }

  async getUsersRegistrations(
    params: GetUsersRegistrationsRequest,
  ): Promise<GetUsersRegistrationsResponse> {
    const { data: response } =
      await this.api.get<GetUsersRegistrationsResponse>(
        '/users/registrations',
        {
          params,
        },
      );

    return response;
  }

  async setUserGroup(body: SetUserGroupRequest): Promise<SetUserGroupResponse> {
    const { data: response } = await this.api.post<SetUserGroupResponse>(
      '/users/group/addUser',
      body,
    );

    return response;
  }

  async deleteFromUserGroup(
    params: DeleteFromUserGroupRequest,
  ): Promise<DeleteFromUserGroupResponse> {
    const { data } = await this.api.delete<DeleteFromUserGroupResponse>(
      '/users/group/user',
      {
        params,
      },
    );

    return data;
  }

  async createUserGroup(
    body: CreateUserGroupRequest,
  ): Promise<CreateUserGroupResponse> {
    const { data: response } = await this.api.post<SetUserGroupResponse>(
      '/users/group/new',
      body,
    );

    return response;
  }

  async getUserGroups(
    params: GetUserGroupsRequest,
  ): Promise<GetUserGroupsResponse> {
    const { data: response } = await this.api.get<GetUserGroupsResponse>(
      '/users/groups',
      {
        params,
      },
    );

    return response;
  }

  async getUserGroup(
    params: GetUserGroupRequest,
  ): Promise<GetUserGroupResponse> {
    const { data: response } = await this.api.get<GetUserGroupResponse>(
      '/users/group',
      {
        params,
      },
    );

    return response;
  }

  async deleteUserGroup(
    params: DeleteUserGroupRequest,
  ): Promise<DeleteUserGroupResponse> {
    const { data } = await this.api.delete<DeleteUserGroupResponse>(
      '/users/group',
      {
        params,
      },
    );

    return data;
  }

  async getUserProjects(
    params: GetUserProjectsRequest,
  ): Promise<GetUserProjectsResponse> {
    const { data: response } = await this.api.get<GetUserProjectsResponse>(
      '/users/projects',
      {
        params,
      },
    );

    return response;
  }

  async setUserProjectAllowedJwtNumber(
    params: SetUserProjectAllowedJwtNumberParams,
  ): Promise<SetUserProjectAllowedJwtNumberResponse> {
    const { data: response } =
      await this.api.post<SetUserProjectAllowedJwtNumberResponse>(
        '/users/setAllowedJwtNumber',
        params,
      );

    return response;
  }

  async deleteUserProject(
    params: DeleteUserProjectParams,
  ): Promise<DeleteUserProjectResponse> {
    const { data: response } = await this.api.delete<DeleteUserProjectResponse>(
      '/users/projects',
      {
        params,
      },
    );

    return response;
  }

  async createTestPremiumUser(
    body: ICreateTestClientRequest,
  ): Promise<ICreateTestClientResponse> {
    const { data: response } = await this.api.post<ICreateTestClientResponse>(
      '/newTestPremiumUrl',
      body,
    );

    return response;
  }

  async getStatement(params: IStatementRequest): Promise<IStatementResponse> {
    const { data: response } = await this.api.get<IStatementResponse>(
      '/statement',
      {
        params,
      },
    );

    return response;
  }

  async getUserStats(params: IUserStatsRequest): Promise<IUserStatsResponse> {
    const { data: response } = await this.api.get<IUserStatsResponse>(
      '/users/stats',
      {
        params,
      },
    );

    return response;
  }

  async getWebsocketStats(
    params: IWebsocketStatsRequest,
  ): Promise<IWebsocketStatsResponse> {
    const { data: response } = await this.api.get<IWebsocketStatsResponse>(
      '/stats/websockets',
      {
        params,
      },
    );

    return response;
  }

  async getArchiveRequestsStats(
    params: IArchiveRequestsStatsRequest,
  ): Promise<IArchiveRequestsStatsResponse> {
    const { data: response } =
      await this.api.get<IArchiveRequestsStatsResponse>('/stats/archives', {
        params,
      });

    return response;
  }

  // https://backoffice-gateway.staging.multirpc.ankr.com/api/v1/auth/users/stats/range?address=0x173ce89676fecd49c1d9e25f6671825723f72951&from=1666177193000&to=1668769193000&timeframe=d1
  async getUserStatsByRange(
    params: IUserStatsByRangeRequest,
  ): Promise<IUserStatsResponse> {
    const { data: response } = await this.api.get<IUserStatsResponse>(
      '/users/stats/range',
      {
        params,
      },
    );

    return response;
  }

  async addVoucherCredits(
    body: IAddVoucherCreditsRequest,
  ): Promise<IAddVoucherCreditsResponse> {
    const { data: response } = await this.api.post('/balance/voucher', body);

    return response;
  }

  async updateVoucherCredits(
    body: IUpdateVoucherCreditsRequest,
  ): Promise<IUpdateVoucherCreditsResponse> {
    const { data: response } = await this.api.post(
      '/balance/voucher/adjust',
      body,
    );

    return response;
  }

  async getBlockchains(): Promise<IBlockchainEntity[]> {
    const { data } = await this.api.get<IBlockchainEntity[]>('/blockchain');

    return data;
  }

  async getCounter(params: ICounterRequest): Promise<ICountersEntity> {
    const { data } = await this.api.get<ICountersEntity>(
      `/counter/${params.user}`,
    );

    return data;
  }

  async getCounters(params: ICountersRequest): Promise<ICountersResponse> {
    const { data } = await this.api.get<ICountersResponse>('/counters', {
      params,
    });

    return data;
  }

  async createOrUpdateBlockchain(
    node: IBlockchainEntity,
  ): Promise<Record<string, any>> {
    if (!node.id) node.id = v4();
    const { data } = await this.api.post('blockchain', node);

    return data;
  }

  async deleteBlockchain(
    blockchain: IBlockchainEntity,
  ): Promise<IBlockchainEntity> {
    const { data } = await this.api.delete<IBlockchainEntity>('/blockchain', {
      params: { id: blockchain.id },
    });

    return data;
  }

  async migrateLegacy(): Promise<any> {
    const { data } = await this.api.post<INodeEntity[]>('/legacy', {});

    return data;
  }

  async getAddressBindings(
    params: IAddressBindingsRequest,
  ): Promise<IAddressBindingsResponse> {
    const { data: response } = await this.api.get<IAddressBindingsResponse>(
      '/users/tokens',
      {
        params,
      },
    );

    return response;
  }

  async getUsetEmail(): Promise<IGetExternalEmailResponse> {
    const { data } = await this.api.get<IGetExternalEmailResponse>('/externalEmail');

    return data;
  }

  async disableTwoFA(address: string) {
    const { data: response } = await this.api.post<void>(
      '/2fa/clear',
      undefined,
      {
        params: {
          address,
        },
      },
    );

    return response;
  }

  async getTwoFAStatus(address: string): Promise<ITwoFAStatusResponse> {
    const { data } = await this.api.get<ITwoFAStatusResponse>(
      '/2fa/status',
      {
        params: {
          address,
        },
      }
    );

    return data;
  }

  async getUserBundles(address: string, statuses: string[]): Promise<IBundlesResponse> {
    const { data } = await this.api.get<IBundlesResponse>(
      '/bundles',
      {
        params: {
          address,
          statuses,
        },
      }
    );

    return data;
  }

  async revokeUserBundle(address: string, paymentId: string): Promise<IRevokeBundleResponseItem[]> {
    const { data: response } = await this.api.post<IRevokeBundleResponseItem[]>(
      '/users/bundles/revoke',
      {
        address,
        paymentId,
      },
    );

    return response;
  }

  async getUserBundlesStatuses(address: string): Promise<IBundlesStatusesResponse> {
    const { data } = await this.api.get<IBundlesStatusesResponse>(
      '/users/bundles/status',
      {
        params: {
          address,
        },
      }
    );

    return data;
  }

  async getUserReferralCodes(
    address?: string,
    include_bonus?: boolean,
    include_deleted?: boolean,
  ): Promise<IReferralCodeItem[]> {
    const { data } = await this.api.get<IReferralCodeItem[]>(
      '/referral/codes',
      {
        params: {
          address,
          include_bonus,
          include_deleted,
        },
      }
    );

    return data;
  }

  async createNewReferralCode(
    params?: INewReferralCodeRequest,
  ): Promise<INewReferralCodeResponse> {
    const { data: response } = await this.api.post<INewReferralCodeResponse>(
      '/referral/codes/new',
      {
        ...params,
      },
    );

    return response;
  }

  async deleteReferralCode(code: string): Promise<IDeleteReferralCodeResponse> {
    const { data } = await this.api.delete<IDeleteReferralCodeResponse>(
      '/referral/codes',
      {
        params: {
          code,
        },
      },
    );

    return data;
  }
}
