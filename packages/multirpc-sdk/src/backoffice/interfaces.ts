import {
  ICreateTestClientRequest,
  ICreateTestClientResponse,
  IAddVoucherCreditsRequest,
  IAddVoucherCreditsResponse,
  IBalancesRequest,
  IBalancesResponse,
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
  DeleteFromUserGroupRequest,
  DeleteFromUserGroupResponse,
  GetUserGroupsRequest,
  GetUserGroupsResponse,
  GetUserGroupRequest,
  GetUserGroupResponse,
  DeleteUserGroupRequest,
  DeleteUserGroupResponse,
  CreateUserGroupRequest,
  CreateUserGroupResponse,
} from './types';
import { IBlockchainEntity } from '../common';

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

  deleteFromUserGroup(
    params: DeleteFromUserGroupRequest,
  ): Promise<DeleteFromUserGroupResponse>;

  getUserGroups(
    params: GetUserGroupsRequest,
  ): Promise<GetUserGroupsResponse>;

  getUserGroup(
    params: GetUserGroupRequest,
  ): Promise<GetUserGroupResponse>;

  deleteUserGroup(
    params: DeleteUserGroupRequest,
  ): Promise<DeleteUserGroupResponse>;

  createUserGroup(
    params: CreateUserGroupRequest,
  ): Promise<CreateUserGroupResponse>;

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
