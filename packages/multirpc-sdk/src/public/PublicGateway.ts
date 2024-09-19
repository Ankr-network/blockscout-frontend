import axios, { AxiosInstance } from 'axios';
import { IBlockchainEntity } from '@ankr.com/chains-list';

import { AXIOS_DEFAULT_CONFIG, Timeframe } from '../common';
import {
  Config,
  INodesDetailEntity,
  IRate,
  IWorkerGlobalStatus,
  IWorkerPublicStats,
} from './types';
import { IPublicGateway } from './interfaces';
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

  async getNodesDetail(): Promise<INodesDetailEntity[]> {
    const { data } = await this.api.get<INodesDetailEntity[]>(
      '/api/v1/blockchain/detail',
    );

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

  async getPublicTimeframesStats(
    timeframe: Timeframe,
  ): Promise<IWorkerPublicStats> {
    const { data } = await this.accountApi.get<IWorkerPublicStats>(
      `/api/v1/stats/all/${timeframe}`,
    );

    return data;
  }

  async getRate(): Promise<IRate> {
    const { data } = await this.accountApi.get<IRate>('/api/v1/rate');

    return data;
  }
}
