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
  INodeEntity,
  IStatementRequest,
  IStatementResponse,
  ITransactionsRequest,
  ITransactionsResponse,
  IUpdateVoucherCreditsRequest,
  IUpdateVoucherCreditsResponse,
  IUserStatsRequest,
  IUserStatsResponse,
  ICountersResponse,
  ICountersRequest,
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

  createTestPremiumUser(
    params: ICreateTestClientRequest,
  ): Promise<ICreateTestClientResponse>;

  getUserStats(
    params: IUserStatsRequest,
  ): Promise<IUserStatsResponse>;

  addVoucherCredits(
    body: IAddVoucherCreditsRequest,
  ): Promise<IAddVoucherCreditsResponse>;

  updateVoucherCredits(
    body: IUpdateVoucherCreditsRequest,
  ): Promise<IUpdateVoucherCreditsResponse>;

  createOrUpdateBlockchain(
    node: IBlockchainEntity,
  ): Promise<Record<string, any>>;

  createOrUpdateNode(node: INodeEntity): Promise<Record<string, any>>;

  deleteBlockchain(blockchain: IBlockchainEntity): Promise<IBlockchainEntity>;

  deleteNode(node: INodeEntity): Promise<INodeEntity>;

  getBlockchains(): Promise<IBlockchainEntity[]>;

  getCounters(params?: ICountersRequest): Promise<ICountersResponse>;

  getNodes(blockchain?: string): Promise<INodeEntity[]>;

  migrateLegacy(): Promise<INodeEntity[]>;
}
