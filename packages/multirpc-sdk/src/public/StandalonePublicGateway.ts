import axios, { AxiosInstance } from 'axios';

import { IWorkerGlobalStatus, Timeframe, IWorkerNodesWeight } from './types';
import { INodeEntity } from '../backoffice';
import { convertStatsToNumber } from './utils';

export class StandalonePublicGateway {
  public api: AxiosInstance;

  constructor(private readonly baseURL: string) {
    this.api = axios.create({
      baseURL,
    });
  }

  async getNodes(): Promise<INodeEntity[]> {
    const { data } = await this.api.get<INodeEntity[]>('/api/v1/node');

    return data;
  }

  async getNodesWeight(): Promise<IWorkerNodesWeight[]> {
    const { data } = await this.api.get<IWorkerNodesWeight[]>('/api/v1/weight');

    return data;
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
}
