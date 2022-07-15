import {
  IAddVoucherCreditsRequest,
  IAddVoucherCreditsResponse,
  IBalancesRequest,
  IBalancesResponse,
  IBlockchainEntity,
  ICountersEntity,
  INodeEntity,
  IStatementRequest,
  IStatementResponse,
  ITransactionsRequest,
  ITransactionsResponse,
  IUpdateVoucherCreditsRequest,
  IUpdateVoucherCreditsResponse,
} from './types';

export interface IBackofficeGateway {
  addToken(token: string): void;

  removeToken(): void;

  getStatement(params: IStatementRequest): Promise<IStatementResponse>;

  getBalances(params: IBalancesRequest): Promise<IBalancesResponse>;

  getTransactions(params: ITransactionsRequest): Promise<ITransactionsResponse>;

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

  getCounters(limit?: number): Promise<ICountersEntity[]>;

  getNodes(blockchain?: string): Promise<INodeEntity[]>;

  migrateLegacy(): Promise<INodeEntity[]>;
}
