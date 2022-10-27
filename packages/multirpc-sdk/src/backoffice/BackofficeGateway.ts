import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { v4 } from 'uuid';
import { AXIOS_DEFAULT_CONFIG } from '../common';
import { IBackofficeGateway } from './interfaces';
import {
  ICreateTestClientRequest,
  ICreateTestClientResponse,
  IAddVoucherCreditsRequest,
  IAddVoucherCreditsResponse,
  IBalancesRequest,
  IBalancesResponse,
  IBlockchainEntity,
  ICountersResponse,
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
  ICountersRequest,
  IGetUserTotalRequest,
  IGetUserTotalResponse,
} from './types';

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

  async createTestPremiumUser(
    body: ICreateTestClientRequest,
  ): Promise<ICreateTestClientResponse> {
    const { data: response } = await this.api.post<ICreateTestClientResponse>(
      '/newTestPremiumUrl',
      body
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
      }
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

  async getNodes(blockchain?: string): Promise<INodeEntity[]> {
    const { data } = await this.api.get<INodeEntity[]>('/node', {
      params: { blockchain },
    });

    return data;
  }

  async createOrUpdateNode(node: INodeEntity): Promise<Record<string, any>> {
    if (!node.id) node.id = v4();

    const { data } = await this.api.post('/node', node);

    return data;
  }

  async deleteNode(node: INodeEntity): Promise<INodeEntity> {
    const { data } = await this.api.delete<INodeEntity>('/node', {
      params: { id: node.id, blockchain: node.blockchain },
    });

    return data;
  }
}
