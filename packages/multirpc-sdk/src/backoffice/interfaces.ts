import {
  ICreateTestClientRequest,
  ICreateTestClientResponse,
  IAddVoucherCreditsRequest,
  IAddVoucherCreditsResponse,
  IBalancesRequest,
  IBalancesResponse,
  IBlockchainEntity,
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
  IUserStatsByRangeRequest,
  IUserStatsResponse,
  IWebsocketStatsRequest,
  IWebsocketStatsResponse,
  IArchiveRequestsStatsRequest,
  IArchiveRequestsStatsResponse,
  ICountersResponse,
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
} from './types';

export interface IBackofficeGateway {
  addToken(token: string): void;

  removeToken(): void;

  getStatement(params: IStatementRequest): Promise<IStatementResponse>;

  getBalances(params: IBalancesRequest): Promise<IBalancesResponse>;

  getTransactions(params: ITransactionsRequest): Promise<ITransactionsResponse>;

  getEmailBindings(
    params: IEmailBindingsRequest,
  ): Promise<IEmailBindingsResponse>;

  createUserEmail(params: IUpdateUserEmailRequest): Promise<IUpdateUserEmailResponse>

  updateUserEmail(params: IUpdateUserEmailRequest): Promise<IUpdateUserEmailResponse>

  getAdminRoles(): Promise<IGetAdminRolesResponse>;

  getUserTotal(params: IGetUserTotalRequest): Promise<IGetUserTotalResponse>;

  getUserProfile(
    params: IGetUserProfileRequest,
  ): Promise<IGetUserProfileResponse>;

  updateUserProfile(
    params: IUpdateUserProfileRequest,
  ): Promise<IUpdateUserProfileResponse>;

  getUserRevenue(
    params: IGetUserRevenueRequest,
  ): Promise<IGetUserRevenueResponse>;

  createTestPremiumUser(
    params: ICreateTestClientRequest,
  ): Promise<ICreateTestClientResponse>;

  getUserStats(params: IUserStatsRequest): Promise<IUserStatsResponse>;

  getUserStatsByRange(
    params: IUserStatsByRangeRequest,
  ): Promise<IUserStatsResponse>;

  getWebsocketStats(params: IWebsocketStatsRequest): Promise<IWebsocketStatsResponse>

  getArchiveRequestsStats(params: IArchiveRequestsStatsRequest): Promise<IArchiveRequestsStatsResponse>

  getUserAddresses(
    params: GetUserAddressesRequest,
  ): Promise<GetUserAddressesResponse>;

  getUsersRegistrations(
    params: GetUsersRegistrationsRequest,
  ): Promise<GetUsersRegistrationsResponse>;

  setUserGroup(
    params: SetUserGroupRequest,
  ): Promise<SetUserGroupResponse>;

  addVoucherCredits(
    body: IAddVoucherCreditsRequest,
  ): Promise<IAddVoucherCreditsResponse>;

  updateVoucherCredits(
    body: IUpdateVoucherCreditsRequest,
  ): Promise<IUpdateVoucherCreditsResponse>;

  createOrUpdateBlockchain(
    node: IBlockchainEntity,
  ): Promise<Record<string, any>>;

  deleteBlockchain(blockchain: IBlockchainEntity): Promise<IBlockchainEntity>;

  getBlockchains(): Promise<IBlockchainEntity[]>;

  getCounters(params?: ICountersRequest): Promise<ICountersResponse>;

  migrateLegacy(): Promise<INodeEntity[]>;
}
