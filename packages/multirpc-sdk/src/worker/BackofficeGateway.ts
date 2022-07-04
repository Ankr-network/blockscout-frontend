import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { v4 } from 'uuid';

import { AXIOS_DEFAULT_CONFIG, IJwtToken } from '../common';
import { IWorkerBackofficeGateway } from './interfaces';
import {
  IBlockchainEntity,
  ICountersEntity,
  ICountersResponse,
  INodeEntity,
} from './types';

export class WorkerBackofficeGateway implements IWorkerBackofficeGateway {
  api: AxiosInstance;

  constructor(private readonly config: AxiosRequestConfig) {
    this.api = axios.create({ ...config, ...AXIOS_DEFAULT_CONFIG });
  }

  addJwtToken(jwtToken: IJwtToken) {
    this.api = axios.create({
      ...this.config,
      ...AXIOS_DEFAULT_CONFIG,
      headers: {
        Authorization: `Bearer ${jwtToken.signed_token}`,
      },
    });
  }

  removeJwtToken() {
    this.api = axios.create({ ...this.config, ...AXIOS_DEFAULT_CONFIG });
  }

  async getBlockchains(): Promise<IBlockchainEntity[]> {
    const { data } = await this.api.get<IBlockchainEntity[]>(
      '/backoffice/v1/blockchain',
    );
    return data;
  }

  async getCounters(limit: number): Promise<ICountersEntity[]> {
    const {
      data: { result = [] },
    } = await this.api.get<ICountersResponse>('/backoffice/v1/counters', {
      params: {
        limit,
      },
    });

    return result;
  }

  async createOrUpdateBlockchain(
    node: IBlockchainEntity,
  ): Promise<Record<string, any>> {
    if (!node.id) node.id = v4();
    const { data } = await this.api.post('/backoffice/v1/blockchain', node);
    return data;
  }

  async deleteBlockchain(
    blockchain: IBlockchainEntity,
  ): Promise<IBlockchainEntity> {
    const { data } = await this.api.delete<IBlockchainEntity>(
      '/backoffice/v1/blockchain',
      {
        params: { id: blockchain.id },
      },
    );

    return data;
  }

  async migrateLegacy(): Promise<any> {
    const { data } = await this.api.post<INodeEntity[]>(
      '/backoffice/v1/legacy',
      {},
    );

    return data;
  }

  async getNodes(blockchain?: string): Promise<INodeEntity[]> {
    const { data } = await this.api.get<INodeEntity[]>('/backoffice/v1/node', {
      params: { blockchain },
    });

    return data;
  }

  async createOrUpdateNode(node: INodeEntity): Promise<Record<string, any>> {
    if (!node.id) node.id = v4();

    const { data } = await this.api.post('/backoffice/v1/node', node);

    return data;
  }

  async deleteNode(node: INodeEntity): Promise<INodeEntity> {
    const { data } = await this.api.delete<INodeEntity>('/backoffice/v1/node', {
      params: { id: node.id },
    });

    return data;
  }
}
