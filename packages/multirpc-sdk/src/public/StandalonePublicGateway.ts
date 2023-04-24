import axios, { AxiosInstance } from 'axios';

import { IWorkerGlobalStatus, INodesDetailEntity } from './types';
import { convertStatsToNumber } from './utils';
import { Timeframe } from '../common';

export class StandalonePublicGateway {
  public api: AxiosInstance;

  constructor(private readonly baseURL: string) {
    this.api = axios.create({
      baseURL,
    });
  }

  async getTimeframeStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus<number>> {
    const { data } = await this.api.get<IWorkerGlobalStatus<string>>(
      `/api/v1/stats/${blockchain}/${timeframe}`,
    );

    return convertStatsToNumber(data);
  }

  async getNodesDetail(): Promise<INodesDetailEntity[]> {
    const { data } = await this.api.get<INodesDetailEntity[]>(
      '/api/v1/blockchain/detail',
    );

    return data;
  }
}
