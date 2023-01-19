import { IBlockchainEntity } from '../backoffice';
import {
  IRate,
  IWorkerGlobalStatus,
  IWorkerPublicStats,
  Timeframe,
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
