import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { AXIOS_DEFAULT_CONFIG } from '../common';
import { IWorkerGlobalStatus, IWorkerNodesWeight, Timeframe } from './types';
import { IPublicGateway } from './interfaces';
import { IBlockchainEntity, INodeEntity } from '../backoffice';

export class PublicGateway implements IPublicGateway {
  public api: AxiosInstance;

  constructor(private readonly config: AxiosRequestConfig) {
    this.api = axios.create({ ...config, ...AXIOS_DEFAULT_CONFIG });
  }

  async getBlockchains(): Promise<IBlockchainEntity[]> {
    const { data } = await this.api.get<IBlockchainEntity[]>(
      '/api/v1/blockchain',
    );
    return data;
  }

  async getNodes(blockchain?: string): Promise<INodeEntity[]> {
    const { data } = await this.api.get<INodeEntity[]>('/api/v1/node', {
      params: { blockchain },
    });

    return data;
  }

  async getTimeframeStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus> {
    const { data } = await this.api.get<IWorkerGlobalStatus>(
      `/api/v1/stats/${blockchain}/${timeframe}`,
    );

    return data;
  }

  async getNodesWeight(): Promise<IWorkerNodesWeight[]> {
    const { data } = await this.api.get<IWorkerNodesWeight[]>('/api/v1/weight');

    return data;
  }
}
