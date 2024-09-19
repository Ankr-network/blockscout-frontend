import { IBlockchainEntity } from '@ankr.com/chains-list';

import { Timeframe } from '../common';
import {
  IRate,
  IWorkerGlobalStatus,
  IWorkerPublicStats,
  INodesDetailEntity,
} from './types';

export interface IPublicGateway {
  getBlockchains(): Promise<IBlockchainEntity[]>;

  getNodesDetail(): Promise<INodesDetailEntity[]>;

  getTimeframeStats(
    blockchain: string,
    timeframe: Timeframe,
  ): Promise<IWorkerGlobalStatus>;

  getPublicTimeframesStats(timeframe: Timeframe): Promise<IWorkerPublicStats>;

  getRate(): Promise<IRate>;
}
