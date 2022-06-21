import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  IAddVoucherCreditsRequest,
  IAddVoucherCreditsResponse,
  IBalancesRequest,
  IBalancesResponse,
  IStatementRequest,
  IStatementResponse,
  ITransactionsRequest,
  ITransactionsResponse,
  IUpdateVoucherCreditsRequest,
  IUpdateVoucherCreditsResponse,
} from './types';

import { AXIOS_DEFAULT_CONFIG } from '../common';
import { IBackofficeGateway } from './interfaces';

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
      '/api/v1/auth/balances',
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
      '/api/v1/auth/transactions',
      {
        params,
      },
    );

    return response;
  }

  async getStatement(params: IStatementRequest): Promise<IStatementResponse> {
    const { data: response } = await this.api.get<IStatementResponse>(
      '/api/v1/auth/statement',
      {
        params,
      },
    );

    return response;
  }

  async addVoucherCredits(
    body: IAddVoucherCreditsRequest,
  ): Promise<IAddVoucherCreditsResponse> {
    const { data: response } = await this.api.post(
      '/api/v1/auth/balance/voucher',
      body,
    );

    return response;
  }

  async updateVoucherCredits(
    body: IUpdateVoucherCreditsRequest,
  ): Promise<IUpdateVoucherCreditsResponse> {
    const { data: response } = await this.api.post(
      '/api/v1/auth/balance/voucher/adjust',
      body,
    );

    return response;
  }
}
