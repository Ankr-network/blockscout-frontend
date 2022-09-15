import axios, { AxiosInstance } from 'axios';

import { AXIOS_DEFAULT_CONFIG } from '../common';
import {
  IWorkerGlobalStatus,
  IWorkerNodesWeight,
  Timeframe,
  Config,
} from './types';
import { IPublicGateway } from './interfaces';
import { IBlockchainEntity, INodeEntity } from '../backoffice';
import { convertStatsToNumber } from './utils';

export class PublicGateway implements IPublicGateway {
  public api: AxiosInstance;

  public accountApi: AxiosInstance;

  constructor(private readonly config: Config) {
    const { workerUrl, accountUrl } = config;
    this.api = axios.create({
      ...config,
      ...AXIOS_DEFAULT_CONFIG,
      baseURL: workerUrl,
    });

    this.accountApi = axios.create({
      ...config,
      ...AXIOS_DEFAULT_CONFIG,
      baseURL: accountUrl,
    });
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
  ): Promise<IWorkerGlobalStatus<number>> {
    const { data } = await this.accountApi.get<IWorkerGlobalStatus<string>>(
      `/api/v1/stats/${blockchain}/${timeframe}`,
    );

    return convertStatsToNumber(data);
  }

  async getNodesWeight(): Promise<IWorkerNodesWeight[]> {
    const { data } = await this.api.get<IWorkerNodesWeight[]>('/api/v1/weight');

    return data;
  }
}
