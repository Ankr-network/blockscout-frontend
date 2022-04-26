import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { AXIOS_DEFAULT_CONFIG } from '../common';
import {
  IBalance,
  IPaymentHistoryReponse,
  IPaymentHistoryRequest,
  IRequestsResponse,
  IRequestsRequest,
} from './types';
import { IAccountGateway } from './interfaces';
import { getRequestsMock } from '../mock/getRequestsMock';

export class AccountGateway implements IAccountGateway {
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
  ): Promise<IPaymentHistoryReponse> {
    const { data: response } = await this.api.get<IPaymentHistoryReponse>(
      '/api/v1/auth/transactionHistory',
      {
        params,
      },
    );

    return response;
  }

  public async getRequests(
    params: IRequestsRequest,
  ): Promise<IRequestsResponse> {
    const { data: response } = await this.api
      .get<IRequestsResponse>('/api/v1/auth/requests', {
        params,
      })
      .catch(() => ({
        data: {
          requests: getRequestsMock(params),
          cursor: params.cursor > 50 ? -1 : params.cursor,
        },
      }));

    return response;
  }
}
